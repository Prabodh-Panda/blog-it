# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @headers = headers(@user)
    @organizations = create_list(:organization, 3)
  end

  def test_index_returns_all_organizations
    get organizations_path, headers: @headers
    assert_response :success

    response_organization_ids = response.parsed_body["organizations"].pluck(:id)
    expected_organization_ids = Organization.all.pluck(:id)
    assert_equal response_organization_ids.sort, expected_organization_ids.sort
  end

  def test_create_creates_new_organization
    org_params = { organization: { name: "New Organization" } }

    assert_difference -> { Organization.count }, +1 do
      post organizations_path, params: org_params, headers: @headers
    end

    assert_response :success

    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Organization"), response_json["notice"]
  end

  def test_create_fails_with_blank_name
    org_params = { organization: { name: "" } }

    assert_no_difference -> { Organization.count } do
      post organizations_path, params: org_params, headers: @headers
    end

    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal "Name can't be blank", response_json["error"]
  end

  def test_create_ignores_unpermitted_params
    organization_params = {
      organization: {
        name: "Strong Params Organization",
        id: 1234
      }
    }

    assert_difference -> { Organization.count }, +1 do
      post organizations_path, params: organization_params, headers: @headers
    end

    assert_response :success

    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Organization"), response_json["notice"]

    created_organization = Organization.order(created_at: :desc).first
    assert_equal "Strong Params Organization", created_organization.name
    refute_equal 1234, created_organization.id
  end
end
