# frozen_string_literal: true

require "test_helper"

class MyPosts::FilterServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)

    @category_tech = create(:category, name: "Tech", slug: "tech", organization: @organization)
    @category_health = create(:category, name: "Health", slug: "health", organization: @organization)
    @category_sports = create(:category, name: "Sports", slug: "sports", organization: @organization)

    @post1 = create(:post, title: "Ruby on Rails Tips", status: "published", organization: @organization, user: @user)
    @post2 = create(:post, title: "Healthy Eating Habits", status: "draft", organization: @organization, user: @user)
    @post3 = create(:post, title: "Latest Tech Advances", status: "published", organization: @organization, user: @user)
    @post4 = create(:post, title: "Sports Nutrition", status: "published", organization: @organization, user: @user)

    @post1.categories << [@category_tech, @category_sports]
    @post2.categories << @category_health
    @post3.categories << @category_tech
    @post4.categories << [@category_sports, @category_health]

    @posts = Post.all
  end

  def test_returns_all_posts_when_no_filters_applied
    params = {}
    filtered_posts = MyPosts::FilterService.new(@posts, params).process!
    assert_equal [@post1, @post2, @post3, @post4].pluck(:id).sort, filtered_posts.pluck(:id).sort
  end

  def test_filters_posts_by_single_category_slug
    params = { categories: "tech" }
    filtered_posts = MyPosts::FilterService.new(@posts, params).process!
    assert_equal [@post1, @post3].pluck(:id).sort, filtered_posts.pluck(:id).sort
  end

  def test_filters_posts_by_category_slug_when_post_has_multiple_categories
    params = { categories: "sports" }
    filtered_posts = MyPosts::FilterService.new(@posts, params).process!
    assert_equal [@post1, @post4].pluck(:id).sort, filtered_posts.pluck(:id).sort
  end

  def test_returns_empty_when_category_slug_does_not_exist
    params = { categories: "nonexistent" }
    filtered_posts = MyPosts::FilterService.new(@posts, params).process!
    assert_empty filtered_posts
  end

  def test_filters_posts_by_status
    params = { status: "published" }
    filtered_posts = MyPosts::FilterService.new(@posts, params).process!
    assert_equal [@post1, @post3, @post4].pluck(:id).sort, filtered_posts.pluck(:id).sort
  end

  def test_filters_posts_by_title_case_insensitive
    params = { title: "nutri" }
    filtered_posts = MyPosts::FilterService.new(@posts, params).process!
    assert_equal [@post4].pluck(:id).sort, filtered_posts.pluck(:id).sort
  end

  def test_returns_empty_when_title_does_not_match_any_post
    params = { title: "Python" }
    filtered_posts = MyPosts::FilterService.new(@posts, params).process!
    assert_empty filtered_posts
  end

  def test_filters_posts_by_combined_categories_status_and_title
    params = { categories: "sports", status: "published", title: "Nutrition" }
    filtered_posts = MyPosts::FilterService.new(@posts, params).process!
    assert_equal [@post4].pluck(:id).sort, filtered_posts.pluck(:id).sort
  end

  def test_filters_posts_by_multiple_categories_with_array_param
    params = { categories: ["tech", "health"] }
    filtered_posts = MyPosts::FilterService.new(@posts, params).process!
    assert_equal [@post1, @post2, @post3, @post4].pluck(:id).sort, filtered_posts.pluck(:id).sort
  end
end
