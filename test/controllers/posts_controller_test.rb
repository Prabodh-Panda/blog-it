# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @organization = @user.organization
    @headers = headers(@user)
    @user_posts = create_list(:post, 2, user: @user, organization: @organization)
    @category_one = create(:category)
  end

  def test_index_should_return_only_published_posts_from_users_organization
    other_users = create_list(:user, 3, organization: @organization)
    other_posts = []

    5.times do |i|
      user = other_users[i % other_users.size]
      other_posts << create(:post, user: user, organization: @organization, status: "published")
    end

    get posts_path, headers: @headers
    assert_response :success

    returned_post_ids = response.parsed_body["posts"].pluck(:id)
    expected_ids = @user.organization.posts.published.pluck(:id)

    assert_equal returned_post_ids.sort, expected_ids.sort
  end

  def test_index_should_not_return_unpublished_or_other_organizations_posts
    other_organization = create(:organization)
    other_org_users = create_list(:user, 2, organization: other_organization)

    other_org_posts = []
    5.times do |i|
      user = other_org_users[i % other_org_users.size]
      other_org_posts << create(:post, user: user, organization: other_organization, status: "published")
    end

    unpublished_posts = create_list(:post, 3, organization: @organization, status: "draft", user: @user)
    published_posts = create_list(:post, 2, organization: @organization, status: "published", user: @user)

    get posts_path, headers: @headers
    assert_response :success

    returned_post_ids = response.parsed_body["posts"].pluck(:id)
    expected_ids = @user.organization.posts.where(status: "published").pluck(:id)

    assert_equal expected_ids.sort, returned_post_ids.sort

    (other_org_posts + unpublished_posts).each do |post|
      refute_includes returned_post_ids, post.id
    end
  end

  def test_create_creates_post_for_current_user_organization
    post_params = {
      post: {
        title: "New Post Title",
        description: "A description for the new post",
        status: "draft",
        category_ids: create_list(:category, 2, organization: @organization).pluck(:id)
      }
    }

    assert_difference -> { @user.organization.posts.count }, +1 do
      post posts_path, params: post_params, headers: @headers
    end

    assert_response :success

    created_post = @user.organization.posts.order(created_at: :desc).first

    assert_equal @user.organization, created_post.organization
    assert_equal @user.id, created_post.user_id

    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Post"), response_json["notice"]
  end

  def test_create_fails_with_invalid_title
    invalid_post_params = {
      post: {
        title: "",
        description: "Desc",
        status: "draft",
        category_ids: [@category_one.id]
      }
    }

    assert_no_difference -> { @user.organization.posts.count } do
      post posts_path, params: invalid_post_params, headers: @headers
    end

    assert_response :unprocessable_entity
  end

  def test_create_ignores_unpermitted_params_and_is_bloggable_set_internally
    post_params = {
      post: {
        title: "Strong Params Test",
        description: "Testing strong parameters",
        status: "draft",
        category_ids: create_list(:category, 1, organization: @organization).pluck(:id),
        user_id: 9999,
        organization_id: 9999
      }
    }

    assert_difference -> { @user.organization.posts.count }, +1 do
      post posts_path, params: post_params, headers: @headers
    end

    assert_response :success

    created_post = @user.organization.posts.order(created_at: :desc).first

    assert_equal "Strong Params Test", created_post.title
    assert_equal "Testing strong parameters", created_post.description
    assert_equal "draft", created_post.status

    assert_equal @user.id, created_post.user_id
    assert_equal @user.organization.id, created_post.organization_id
  end

  def test_index_filters_posts_by_categories
    category1 = create(:category, name: "Tech", organization: @organization)
    category2 = create(:category, name: "Health", organization: @organization)

    post_in_category1 = create(
      :post, user: @user, organization: @organization, status: "published",
      categories: [category1])
    post_in_category2 = create(
      :post, user: @user, organization: @organization, status: "published",
      categories: [category2])
    post_in_both = create(
      :post, user: @user, organization: @organization, status: "published",
      categories: [category1, category2])

    get posts_path, headers: @headers, params: { categories: "tech" }
    assert_response :success

    response_posts = response.parsed_body["posts"].pluck(:id)

    assert_includes response_posts, post_in_category1.id
    assert_includes response_posts, post_in_both.id
    refute_includes response_posts, post_in_category2.id
  end

  def test_show_allows_owner
    post = @user_posts.first

    get post_path(post.slug), headers: @headers
    assert_response :success
  end

  def test_show_allows_published_post_in_same_org
    other_user = create(:user, organization: @organization)
    published_post = create(:post, user: other_user, organization: @organization, status: "published")

    get post_path(published_post.slug), headers: @headers
    assert_response :success
  end

  def test_show_denies_draft_post_of_other_user_in_same_org
    other_user = create(:user, organization: @organization)
    draft_post = create(:post, user: other_user, organization: @organization, status: "draft")

    get post_path(draft_post.slug), headers: @headers
    assert_response :forbidden
  end

  def test_show_denies_post_in_other_organization
    other_org = create(:organization)
    other_user = create(:user, organization: other_org)
    other_post = create(:post, user: other_user, organization: other_org, status: "published")

    get post_path(other_post.slug), headers: @headers
    assert_response :not_found
  end

  def test_update_allows_owner
    post_record = @user_posts.first
    update_params = { post: { title: "Updated Title" } }

    patch post_path(post_record.slug), params: update_params, headers: @headers

    assert_response :success

    post_record.reload
    assert_equal "Updated Title", post_record.title
  end

  def test_update_denies_non_owner_in_same_org
    other_user = create(:user, organization: @organization)
    other_post = create(:post, user: other_user, organization: @organization, status: "published")

    update_params = { post: { title: "Updated Title" } }

    patch post_path(other_post.slug), params: update_params, headers: @headers

    assert_response :forbidden

    other_post.reload
    refute_equal "Updated Title", other_post.title
  end

  def test_update_denies_post_in_other_org
    other_org = create(:organization)
    other_user = create(:user, organization: other_org)
    other_post = create(:post, user: other_user, organization: other_org, status: "published")

    update_params = { post: { title: "Updated Title" } }

    patch post_path(other_post.slug), params: update_params, headers: @headers

    assert_response :not_found

    other_post.reload
    refute_equal "Updated Title", other_post.title
  end

  def test_destroy_allows_owner
    post = @user_posts.first

    assert_difference -> { @user.organization.posts.count }, -1 do
      delete post_path(post.slug), headers: @headers
    end

    assert_response :success
  end

  def test_destroy_denies_non_owner_in_same_org
    other_user = create(:user, organization: @organization)
    other_post = create(:post, user: other_user, organization: @organization, status: "published")

    assert_no_difference -> { @user.organization.posts.count } do
      delete post_path(other_post.slug), headers: @headers
    end

    assert_response :forbidden
  end

  def test_destroy_denies_post_in_other_org
    other_org = create(:organization)
    other_user = create(:user, organization: other_org)
    other_post = create(:post, user: other_user, organization: other_org, status: "published")

    assert_no_difference -> { Post.count } do
      delete post_path(other_post.slug), headers: @headers
    end

    assert_response :not_found
  end
end
