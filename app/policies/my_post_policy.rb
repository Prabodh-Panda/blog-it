# frozen_string_literal: true

class MyPostPolicy
  attr_reader :user, :posts

  def initialize(user, posts)
    @user = user
    @posts = posts
  end

  def bulk_delete?
    posts.all? { |post| post.user_id == user.id }
  end

  def bulk_update?
    bulk_delete?
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(user_id: user.id)
    end
  end
end
