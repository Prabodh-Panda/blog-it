# frozen_string_literal: true

class VotesController < ApplicationController
  before_action :load_post

  def vote
    vote_type = vote_params[:vote_type]

    vote = @post.votes.find_or_initialize_by(user: @current_user)
    if vote.vote_type == vote_type
      vote.destroy
    else
      vote.vote_type = vote_type
      vote.save!
    end
  end

  private

    def load_post
      @post = @current_user.posts.find_by(slug: params[:slug])
    end

    def vote_params
      params.require(:vote).permit(:vote_type)
    end
end
