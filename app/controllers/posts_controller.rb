# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: :show

  def index
    @posts = @current_user.organization.posts
    if params[:categories].present?
      @posts = @posts.joins(:categories)
        .where(categories: { slug: params[:categories] })
        .distinct
    end
    @posts = @posts.order(created_at: :desc).page(params[:page])
    render
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created"))
  end

  def show
    render
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, category_ids: [])
    end
end
