# frozen_string_literal: true

class MyPostsController < ApplicationController
  MY_POSTS_DEFAULT_PAGE_SIZE = 10

  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  before_action :load_scoped_posts!

  def index
    @posts = PostsFilterService.new(@scoped_posts, params).process!
      .page(params[:page]).per(MY_POSTS_DEFAULT_PAGE_SIZE)
  end

  def bulk_delete
    posts = @scoped_posts.where(slug: bulk_delete_params[:slugs])
    authorize posts, policy_class: MyPostPolicy
    posts.destroy_all
    render_notice(t("successfully_deleted_bulk", entity: "Posts"))
  end

  def bulk_update
    status = bulk_update_params[:status]
    posts = @scoped_posts.where(slug: bulk_update_params[:slugs]).where.not(status:)
    authorize posts, policy_class: MyPostPolicy
    if status == "published"
      posts.update_all(last_published_at: Time.current, status:)
    else
      posts.update_all(status:)
    end
    render_notice(t("successfully_updated_bulk", entity: "Posts"))
  end

  private

    def load_scoped_posts!
      @scoped_posts = policy_scope(Post, policy_scope_class: MyPostPolicy::Scope)
    end

    def bulk_delete_params
      params.permit(slugs: [])
    end

    def bulk_update_params
      params.require(:posts).permit(:status, slugs: [])
    end
end
