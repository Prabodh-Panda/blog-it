# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = build(:user)
  end

  def test_valid_factory
    assert @user.valid?
  end

  def test_user_should_not_be_valid_without_organization
    @user.organization = nil
    assert_not @user.save
    assert_includes @user.errors[:organization], "must exist"
  end

  def test_values_of_created_at_and_updated_at
    user = build(:user)
    assert_nil user.created_at
    assert_nil user.updated_at

    user.save!
    assert_not_nil user.created_at
    assert_equal user.updated_at, user.created_at

    user.update!(name: "This is a updated user")
    assert_not_equal user.updated_at, user.created_at
  end

  def test_name_presence
    @user.name = nil
    assert_not @user.valid?
    assert_includes @user.errors[:name], "can't be blank"
  end

  def test_name_length_limit
    @user.name = "a" * (User::MAX_NAME_LENGTH + 1)
    assert_not @user.valid?
    assert_includes @user.errors[:name], "is too long (maximum is 35 characters)"
  end

  def test_email_presence
    @user.email = nil
    assert_not @user.valid?
    assert_includes @user.errors[:email], "can't be blank"
  end

  def test_email_uniqueness
    create(:user, email: "test@example.com")
    duplicate = build(:user, email: "TEST@example.com") # Case insensitive check
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:email], "has already been taken"
  end

  def test_email_format_validation
    invalid_emails = ["plainaddress", "@missingusername.com", "user@.com", "user@site..com"]
    invalid_emails.each do |bad_email|
      @user.email = bad_email
      assert_not @user.valid?, "#{bad_email.inspect} should be invalid email"
    end
  end

  def test_email_downcased_on_save
    @user.email = "UPPERCASE@EXAMPLE.COM"
    @user.save!
    assert_equal "uppercase@example.com", @user.reload.email
  end

  def test_email_length_limit
    @user.email = "a" * User::MAX_EMAIL_LENGTH + "@a.com"
    assert_not @user.valid?
    assert_includes @user.errors[:email], "is too long (maximum is 255 characters)"
  end

  def test_password_presence
    user = build(:user, password: nil, password_confirmation: nil)
    assert_not user.valid?
    assert_includes user.errors[:password], "can't be blank"
  end

  def test_password_minimum_length
    @user.password = "123"
    @user.password_confirmation = "123"
    assert_not @user.valid?
    assert_includes @user.errors[:password], "is too short (minimum is 6 characters)"
  end

  def test_password_confirmation_presence_on_create
    user = build(:user, password_confirmation: nil)
    assert_not user.valid?
    assert_includes user.errors[:password_confirmation], "can't be blank"
  end

  def test_password_must_match_confirmation_password
    user = build(:user, password: "welcome", password_confirmation: "welcome1")
    assert_not user.valid?
    assert_includes user.errors[:password_confirmation], "doesn't match Password"
  end

  def test_authentication_token_generated
    @user.save!
    refute_nil @user.authentication_token, "Expected authentication_token to be present after save"
  end
end
