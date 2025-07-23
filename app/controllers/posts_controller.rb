# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: :show

  def index
    @posts = @current_user.organization.posts.published
    if params[:categories].present?
      @posts = @posts.joins(:categories)
        .where(categories: { slug: params[:categories] })
        .distinct
    end
    @posts = @posts.order(created_at: :desc).page(params[:page])
  end

  def create
    post = @current_user.posts.new(post_params.merge(organization: @current_user.organization))
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    render
  end

  private

    def load_post!
      @post = @current_user.organization.posts.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end
end
