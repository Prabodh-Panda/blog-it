# frozen_string_literal: true

class Vote < ApplicationRecord
  enum vote_type: { upvote: "upvote", downvote: "downvote" }

  belongs_to :user
  belongs_to :post

  validates :user_id, uniqueness: { scope: :post_id }
  validates :vote_type, presence: true, inclusion: { in: vote_types.keys }

  after_commit :update_post_is_bloggable, on: [:create, :update, :destroy]

  private

    def update_post_is_bloggable
      return if post.nil? || post.destroyed?

      new_status = post.net_votes > Constants::BLOG_IT_THRESHOLD
      if post.is_bloggable != new_status
        post.update_column(:is_bloggable, new_status)
      end
    end
end
