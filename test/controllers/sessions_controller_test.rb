# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user_password = "welcome"
    @user_email = "testuser@example.com"
    @user = create(:user, email: @user_email, password: @user_password, password_confirmation: @user_password)
    @json_headers = {
      Accept: "application/json",
      "Content_Type" => "application/json"
    }
    @user_header = headers(@user)
  end

  def test_login_successfully_with_correct_credentials
    post session_path, params: {
      login: {
        email: @user.email.upcase,
        password: @user_password
      }
    }, headers: @json_headers

    assert_response :success
  end

  def test_fail_login_with_wrong_password
    post session_path, params: {
      login: {
        email: @user.email,
        password: "wrong_password"
      }
    }, headers: @json_headers

    assert_response :unauthorized
  end

  def test_fail_login_with_unknown_email
    post session_path, params: {
      login: {
        email: "nonexistent@example.com",
        password: "any_password"
      }
    }, headers: @json_headers

    assert_response :not_found
  end

  def test_destroy_session_or_logout
    delete session_path, headers: @user_header

    assert_response :success
  end
end
