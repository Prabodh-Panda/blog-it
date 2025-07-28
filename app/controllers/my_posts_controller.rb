# frozen_string_literal: true

class MyPostsController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  MY_POSTS_DEFAULT_PAGE_SIZE = 10

  def index
    @posts = policy_scope(Post, policy_scope_class: MyPostPolicy::Scope)
      .page(params[:page])
      .per(MY_POSTS_DEFAULT_PAGE_SIZE)
  end
end
