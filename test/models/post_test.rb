# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @post = create(:post, title: "test post", user: @user)
  end

  def test_valid_factory
    assert @post.valid?
  end

  def test_post_should_not_be_valid_without_organization
    @post.organization = nil
    assert_not @post.save
    assert_includes @post.errors[:organization], "must exist"
  end

  def test_post_should_not_be_valid_without_user
    @post.user = nil
    assert_not @post.save
    assert_includes @post.errors[:user], "must exist"
  end

  def test_values_of_created_at_and_updated_at
    post = build(:post)
    assert_nil post.created_at
    assert_nil post.updated_at

    post.save!
    assert_not_nil post.created_at
    assert_equal post.updated_at, post.created_at

    post.update!(title: "This is a updated post")
    assert_not_equal post.updated_at, post.created_at
  end

  def test_title_presence
    @post.title = nil
    assert_not @post.valid?
    assert_includes @post.errors[:title], "can't be blank"
  end

  def test_title_length_limit
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert_not @post.valid?
    assert_includes @post.errors[:title], "is too long (maximum is 125 characters)"
  end

  def test_description_presence
    @post.description = nil
    assert_not @post.valid?
    assert_includes @post.errors[:description], "can't be blank"
  end

  def test_description_length_limit
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert_not @post.valid?
    assert_includes @post.errors[:description], "is too long (maximum is 10000 characters)"
  end

  def test_is_bloggable_inclusion
    @post.is_bloggable = nil
    assert_not @post.valid?
    assert_includes @post.errors[:is_bloggable], "is not included in the list"
  end

  def test_slug_is_generated_on_create
    post = create(:post, title: "My Custom Title")
    assert_equal "my-custom-title", post.slug
  end

  def test_slug_not_editable_after_creation
    post = create(:post, title: "Original Title")
    post.slug = "new-slug"
    assert_not post.valid?
    assert_includes post.errors[:slug], I18n.t("post.slug.immutable")
  end

  def test_slug_uniqueness
    create(:post, title: "Repeat Slug")
    post2 = create(:post, title: "Repeat Slug")
    refute_equal "repeat-slug", post2.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_two_worded_titles
    second_post = create(:post, title: "test post", user: @user)

    assert_equal "test-post", @post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_hyphenated_titles
    second_post = create(:post, title: "test-post", user: @user)

    assert_equal "test-post", @post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_slug_generation_for_posts_having_titles_one_being_prefix_of_the_other
    first_post = create(:post, title: "fishing", user: @user)
    second_post = create(:post, title: "fish", user: @user)

    assert_equal "fishing", first_post.slug
    assert_equal "fish", second_post.slug
  end

  def test_error_raised_for_duplicate_slug
    new_post = create(:post)

    assert_raises ActiveRecord::RecordInvalid do
      new_post.update!(slug: @post.slug)
    end

    error_msg = new_post.errors.full_messages.to_sentence
    assert_match I18n.t("post.slug.immutable"), error_msg
  end

  def test_last_published_at_is_set_when_status_is_published
    post = build(:post, status: :published)
    post.save!
    assert_not_nil post.last_published_at
  end

  def test_does_not_set_last_published_at_when_draft
    post = build(:post, status: :draft)
    post.save!
    assert_nil post.last_published_at
  end

  def test_post_count_increases_on_saving
    assert_difference ["Post.count"], 1 do
      create(:post)
    end
  end

  def test_post_count_decreases_on_deleting
    assert_difference ["Post.count"], -1 do
      @post.destroy!
    end
  end
end
