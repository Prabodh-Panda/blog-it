# frozen_string_literal: true

class PostsController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  before_action :load_post!, only: %i[show update destroy]

  def index
    @posts = policy_scope(Post)
    if params[:categories].present?
      @posts = @posts.joins(:categories)
        .where(categories: { slug: params[:categories] })
        .distinct
    end
    @posts = @posts.order(last_published_at: :desc).page(params[:page])
  end

  def create
    post = @current_user.posts.new(post_params.merge(organization: @current_user.organization))
    authorize post
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    authorize @post
    render
  end

  def update
    authorize @post
    @post.update(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quiet)
  end

  def destroy
    authorize @post
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post")) unless params.key?(:quiet)
  end

  private

    def load_post!
      @post = @current_user.organization.posts.find_by!(slug: params[:slug])
    end

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [])
    end
end
