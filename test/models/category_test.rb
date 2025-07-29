# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = create(:category)
  end

  def test_factory_is_valid
    category = build(:category)
    assert category.valid?
  end

  def test_category_should_not_be_valid_without_organization
    @category.organization = nil
    assert_not @category.save
    assert_includes @category.errors["organization"], "must exist"
  end

  def test_values_of_created_at_and_updated_at
    category = build(:category)
    assert_nil category.created_at
    assert_nil category.updated_at

    category.save!
    assert_not_nil category.created_at
    assert_equal category.updated_at, category.created_at

    category.update!(name: "This is a updated category")
    assert_not_equal category.updated_at, category.created_at
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

  def test_category_count_increases_on_saving
    assert_difference ["Category.count"], 1 do
      create(:category)
    end
  end

  def test_category_count_decreases_on_deleting
    assert_difference ["Category.count"], -1 do
      @category.destroy
    end
  end
end
