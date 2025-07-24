# frozen_string_literal: true

class MyPostsController < ApplicationController
  def index
    @posts = policy_scope(Post, policy_scope_class: MyPostPolicy::Scope)
  end
end
