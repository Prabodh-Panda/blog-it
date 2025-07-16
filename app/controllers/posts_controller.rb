# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: :show

  def index
    if params[:categories].present?
      @posts = Post.joins(:categories)
        .where(categories: { slug: params[:categories] })
        .distinct
        .order(created_at: :desc)
    else
      @posts = Post.order(created_at: :desc)
    end
    render
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created"))
  end

  def show
    render_json({ post: @post })
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, :user_id, :organization_id, category_ids: [])
    end
end
