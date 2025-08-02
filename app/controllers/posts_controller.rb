# frozen_string_literal: true

class PostsController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  before_action :load_post!, only: %i[show update destroy]
  before_action :authorize_post, only: %i[show update destroy]

  def index
    @posts = policy_scope(Post)
    @posts = Posts::FilterService.new(@posts, params).process!
    @posts = @posts.order(last_published_at: :desc).page(params[:page])
  end

  def create
    post = @current_user.posts.new(post_params.merge(organization: @current_user.organization))
    authorize post
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
  end

  def update
    @post.update(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quiet)
  end

  def destroy
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

    def authorize_post
      authorize @post
    end
end
