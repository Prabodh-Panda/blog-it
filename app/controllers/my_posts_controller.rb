# frozen_string_literal: true

class MyPostsController < ApplicationController
  MY_POSTS_DEFAULT_PAGE_SIZE = 10

  after_action :verify_policy_scoped, only: :index

  before_action :load_scoped_posts!

  def index
    @posts = MyPosts::FilterService.new(@scoped_posts, params).process!
      .order(created_at: :desc)
      .page(params[:page]).per(MY_POSTS_DEFAULT_PAGE_SIZE)
  end

  def bulk_delete
    posts = @scoped_posts.where(slug: bulk_delete_params[:slugs])
    posts.destroy_all
    render_notice(t("successfully_deleted_bulk", entity: "Posts"))
  end

  def bulk_update
    MyPosts::BulkUpdateService.new(@scoped_posts, bulk_update_params).process!
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
