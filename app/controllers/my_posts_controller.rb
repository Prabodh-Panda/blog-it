# frozen_string_literal: true

class MyPostsController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @posts = policy_scope(Post, policy_scope_class: MyPostPolicy::Scope)
  end
end
