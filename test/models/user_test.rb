# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  include FactoryBot::Syntax::Methods

  def setup
    @user = build(:user)
  end

  def test_valid_factory
    assert @user.valid?, "Expected factory-built user to be valid"
  end

  def test_name_presence
    @user.name = nil
    assert_not @user.valid?
    assert_includes @user.errors[:name], "can't be blank"
  end

  def test_name_length_limit
    @user.name = "a" * 36
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
    @user.email = "a" * 250 + "@a.com"
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

  def test_authentication_token_generated
    @user.save!
    refute_nil @user.authentication_token, "Expected authentication_token to be present after save"
  end
end
