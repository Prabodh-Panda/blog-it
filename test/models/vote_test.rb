# frozen_string_literal: true

require "test_helper"

class VoteTest < ActiveSupport::TestCase
  def setup
    organization = create(:organization)
    @user = create(:user, organization:)
    @post = create(:post, user: @user, organization:)
  end

  def test_valid_vote_creation_with_valid_attributes
    vote = Vote.new(user: @user, post: @post, vote_type: "upvote")
    assert vote.valid?
  end

  def test_user_cannot_vote_twice_on_same_post
    Vote.create!(user: @user, post: @post, vote_type: "upvote")
    duplicate_vote = Vote.new(user: @user, post: @post, vote_type: "downvote")

    refute duplicate_vote.valid?
    assert_includes duplicate_vote.errors[:user_id], "has already been taken"
  end

  def test_vote_type_must_be_present
    vote = Vote.new(user: @user, post: @post)
    refute vote.valid?
    assert_includes vote.errors[:vote_type], "can't be blank"
  end

  def test_vote_must_belong_to_user
    vote = Vote.new(post: @post, vote_type: "upvote")
    refute vote.valid?
    assert_includes vote.errors[:user], "must exist"
  end

  def test_vote_must_belong_to_post
    vote = Vote.new(user: @user, vote_type: "upvote")
    refute vote.valid?
    assert_includes vote.errors[:post], "must exist"
  end
end
