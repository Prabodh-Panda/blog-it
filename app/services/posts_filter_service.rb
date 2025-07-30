# frozen_string_literal: true

class PostsFilterService
  attr_reader :params

  def initialize(posts, params)
    @posts = posts
    @params = params
  end

  def process!
    filter_posts
  end

  private

    def filter_posts
      posts = filter_by_categories(@posts)
      posts = filter_by_status(posts)
      posts = filter_by_title(posts)
    end

    def filter_by_categories(posts)
      puts posts
      return posts unless params[:categories].present?

      posts.joins(:categories)
        .where(categories: { slug: params[:categories] })
        .distinct
    end

    def filter_by_status(posts)
      return posts unless params[:status].present?

      posts.where(status: params[:status])
    end

    def filter_by_title(posts)
      return posts unless params[:title].present?

      search_term = "%#{params[:title].downcase}%"
      posts.where("LOWER(title) LIKE ?", search_term)
    end
end
