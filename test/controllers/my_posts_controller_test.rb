# frozen_string_literal: true

require "test_helper"

class MyPostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @headers = headers(@user)

    @other_user = create(:user, organization: @organization)
    @other_user_headers = headers(@other_user)

    @category = create(:category, organization: @organization)
  end

  def test_index_should_return_only_users_posts
    user_published_posts = create_list(:post, 3, user: @user, organization: @organization, status: "published")
    user_draft_posts = create_list(:post, 3, user: @user, organization: @organization, status: "draft")

    other_users = create_list(:user, 3, organization: @organization)
    other_posts = []

    5.times do |i|
      user = other_users[i % other_users.size]
      other_posts << create(:post, user: user, organization: @organization, status: "published")
    end

    get my_posts_path, headers: @headers
    assert_response :success

    returned_post_ids = response.parsed_body["posts"].pluck(:id)
    expected_post_ids = (user_published_posts + user_draft_posts).pluck(:id)

    assert_equal expected_post_ids.sort, returned_post_ids.sort

    other_posts.each do |post|
      refute_includes returned_post_ids, post.id
    end
  end

  def test_bulk_delete_should_delete_specified_posts
    posts = create_list(:post, 3, category_ids: [@category.id], user: @user, organization: @organization)
    slugs = posts.map(&:slug)

    assert_difference("Post.count", -3) do
      delete bulk_delete_my_posts_path, params: { slugs: slugs }, headers: @headers
    end

    assert_response :success

    posts.each do |post|
      assert_raises(ActiveRecord::RecordNotFound) { Post.find(post.id) }
    end
  end

  def test_bulk_delete_should_not_delete_other_users_posts
    other_posts = create_list(:post, 3, user: @other_user, organization: @organization)
    slugs = other_posts.map(&:slug)

    assert_no_difference("Post.count") do
      delete bulk_delete_my_posts_path, params: { slugs: slugs }, headers: @headers
    end
  end

  def test_bulk_update_should_update_status_of_specified_posts
    posts = create_list(:post, 3, user: @user, organization: @organization, status: "draft")
    slugs = posts.map(&:slug)

    patch bulk_update_my_posts_path, params: { posts: { status: "published", slugs: slugs } }, headers: @headers
    assert_response :success

    posts.each do |post|
      assert_equal "published", post.reload.status
    end
  end

  def test_bulk_update_should_not_update_other_users_posts
    other_posts = create_list(:post, 3, user: @other_user, organization: @organization, status: "draft")
    slugs = other_posts.map(&:slug)

    patch bulk_update_my_posts_path, params: { posts: { status: "published", slugs: slugs } }, headers: @headers

    other_posts.each do |post|
      assert_equal "draft", post.reload.status
    end
  end
end
