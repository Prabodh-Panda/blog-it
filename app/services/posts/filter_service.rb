# frozen_string_literal: true

module Posts
  class FilterService
    attr_reader :scoped_posts, :params

    def initialize(scoped_posts, params)
      @scoped_posts = scoped_posts
      @params = params
    end

    def process!
      filter_by_categories
    end

    private

      def filter_by_categories
        return scoped_posts unless params[:categories].present?

        scoped_posts.joins(:categories)
          .where(categories: { slug: params[:categories] })
          .distinct
      end
  end
end
