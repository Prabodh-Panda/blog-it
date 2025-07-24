# frozen_string_literal: true

class MyPostsController < ApplicationController
  def index
    @posts = policy_scope(Post)
  end
end
