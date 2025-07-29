# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
  end

  def test_valid_factory
    organization = build(:organization)
    assert organization.valid?
  end

  def test_values_of_created_at_and_updated_at
    organization = build(:organization)
    assert_nil organization.created_at
    assert_nil organization.updated_at

    organization.save!
    assert_not_nil organization.created_at
    assert_equal organization.updated_at, organization.created_at

    organization.update!(name: "This is a updated organization")
    assert_not_equal organization.updated_at, organization.created_at
  end

  def test_is_invalid_without_a_name
    organization = build(:organization, name: nil)
    assert_not organization.valid?
    assert_includes organization.errors[:name], "can't be blank"
  end

  def test_is_invalid_with_a_duplicate_name
    name = "Same Name Inc."
    create(:organization, name: name)
    duplicate = build(:organization, name: name)

    assert_not duplicate.valid?
    assert_includes duplicate.errors[:name], "has already been taken"
  end

  def test_organization_count_increases_on_saving
    assert_difference ["Organization.count"], 1 do
      create(:organization)
    end
  end

  def test_organization_count_decreases_on_deleting
    assert_difference ["Organization.count"], -1 do
      @organization.destroy
    end
  end
end
