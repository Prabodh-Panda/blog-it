# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def test_factory_is_valid
    category = build(:category)
    assert category.valid?
  end

  def test_is_invalid_without_a_name
    category = build(:category, name: nil)
    assert_not category.valid?
    assert_includes category.errors[:name], "can't be blank"
  end

  def test_is_invalid_with_duplicate_name_in_same_organization
    org = create(:organization)
    name = "Tech"
    create(:category, name: name, organization: org)
    duplicate = build(:category, name: name, organization: org)

    assert_not duplicate.valid?
    assert_includes duplicate.errors[:name], "has already been taken"
  end

  def test_allows_same_category_name_for_different_organization
    name = "Finance"
    org1 = create(:organization)
    org2 = create(:organization)

    create(:category, name: name, organization: org1)
    category = build(:category, name: name, organization: org2)

    assert category.valid?
  end

  def test_capitalize_name_before_validation
    category = build(:category, name: "science")
    category.valid?
    assert_equal "Science", category.name
  end

  def test_generates_slug_before_creation
    category = create(:category, name: "Sports")
    assert_equal "sports", category.slug
  end

  def test_prevents_slug_from_being_modified_after_creation
    category = create(:category, name: "News")
    category.slug = "custom-slug"
    assert_not category.valid?
    assert_includes category.errors[:slug], I18n.t("category.slug.immutable")
  end
end
