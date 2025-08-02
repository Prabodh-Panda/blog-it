# frozen_string_literal: true

module MyPosts
  class BulkUpdateService
    attr_reader :scoped_posts, :slugs, :status

    def initialize(scoped_posts, params)
      @scoped_posts = scoped_posts
      @slugs = params[:slugs]
      @status = params[:status]
    end

    def process!
      posts_to_update = find_posts
      update_posts(posts_to_update)
    end

    private

      def find_posts
        scoped_posts.where(slug: slugs).where.not(status: status)
      end

      def update_posts(posts)
        if status == "published"
          posts.update_all(last_published_at: Time.current, status:)
        else
          posts.update_all(status:)
        end
      end
  end
end
