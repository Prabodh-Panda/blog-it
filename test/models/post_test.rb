# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @post = build(:post)
  end

  def test_valid_factory
    assert @post.valid?, "Expected post factory to be valid"
  end

  def test_title_presence
    @post.title = nil
    assert_not @post.valid?
    assert_includes @post.errors[:title], "can't be blank"
  end

  def test_title_length_limit
    @post.title = "a" * 126
    assert_not @post.valid?
    assert_includes @post.errors[:title], "is too long (maximum is 125 characters)"
  end

  def test_description_presence
    @post.description = nil
    assert_not @post.valid?
    assert_includes @post.errors[:description], "can't be blank"
  end

  def test_description_length_limit
    @post.description = "a" * 10_001
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
    assert_match(/repeat-slug-\d+/, post2.slug)
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

  def test_created_with_categories
    post = create(:post)
    assert_operator post.categories.length, :>=, 1, "Post should be associated with at least one category"
  end

  def test_user_and_post_share_same_organization
    post = create(:post)
    assert_equal post.organization, post.user.organization
  end
end
