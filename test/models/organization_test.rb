# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def test_valid_factory
    organization = build(:organization)
    assert organization.valid?, "Expected factory-built organization to be valid"
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
end
