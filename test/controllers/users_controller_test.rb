# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @headers = {
      Accept: "application/json",
      "Content_Type" => "application/json"
    }
  end

  def test_create_creates_user_with_valid_params
    user_params = {
      user: {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
        password_confirmation: "password123",
        organization_id: @organization.id
      }
    }

    assert_difference -> { User.count }, +1 do
      post users_path, params: user_params, headers: @headers
    end

    assert_response :success

    created_user = User.order(created_at: :desc).first
    assert_equal "Test User", created_user.name
    assert_equal "testuser@example.com", created_user.email
    assert_equal @organization.id, created_user.organization_id

    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "User"), response_json["notice"]
  end

  def test_create_fails_with_invalid_params
    invalid_params = {
      user: {
        name: "",
        email: "invalidemail",
        password: "short",
        password_confirmation: "mismatch",
        organization_id: nil
      }
    }

    assert_no_difference -> { User.count } do
      post users_path, params: invalid_params, headers: @headers
    end

    assert_response :unprocessable_entity
  end

  def test_create_ignores_unpermitted_params
    user_params = {
      user: {
        name: "Strong Params",
        email: "strong@example.com",
        password: "password123",
        password_confirmation: "password123",
        organization_id: @organization.id,
        id: 9999
      }
    }

    assert_difference -> { User.count }, +1 do
      post users_path, params: user_params, headers: @headers
    end

    assert_response :success

    created_user = User.order(created_at: :desc).first
    assert_equal "Strong Params", created_user.name
    assert_equal "strong@example.com", created_user.email
    assert_equal @organization.id, created_user.organization_id

    refute_equal 9999, created_user.id

    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "User"), response_json["notice"]
  end
end
