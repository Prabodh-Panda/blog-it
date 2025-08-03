# frozen_string_literal: true

require "test_helper"

class VotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    category = create(:category)
    @user = create(:user, organization: @organization)
    @post = create(:post, user: @user, category_ids: [category.id], organization: @organization)
    @vote_params = { vote: { vote_type: "upvote" } }
    @headers = headers(@user)
  end

  def test_create_new_vote
    assert_difference "@post.votes.count", 1 do
      post vote_post_path(@post.slug), params: @vote_params, headers: @headers
    end
    assert_response :success
    assert_equal "upvote", @post.votes.last.vote_type
  end

  def test_toggle_vote_off
    @post.votes.create!(user: @user, vote_type: "upvote")
    assert_difference "@post.votes.count", -1 do
      post vote_post_path(@post.slug), params: @vote_params, headers: @headers
    end
    assert_response :success
  end

  def test_switch_vote_type
    @post.votes.create!(user: @user, vote_type: "downvote")
    switch_params = { vote: { vote_type: "upvote" } }
    assert_no_difference "@post.votes.count" do
      post vote_post_path(@post.slug), params: switch_params, headers: @headers
    end
    assert_response :success
    assert_equal "upvote", @post.votes.last.vote_type
  end

  def test_vote_on_other_users_post
    other_user = create(:user, organization: @organization)
    other_user_headers = headers(other_user)
    assert_no_difference "Vote.count" do
      post vote_post_path(@post.slug), params: @vote_params, headers: other_user_headers
    end
    assert_response :not_found
  end
end
