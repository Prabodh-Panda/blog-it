# frozen_string_literal: true

require "test_helper"

class MyPostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @headers = headers(@user)
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
end
