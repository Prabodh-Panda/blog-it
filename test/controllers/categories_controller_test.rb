# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @organization = @user.organization
    @headers = headers(@user)
    @user_categories = create_list(:category, 3, organization: @organization)
  end

  def test_index_should_return_only_the_categories_of_the_current_users_organization
    get categories_path, headers: @headers
    assert_response :success

    returned_ids = response.parsed_body["categories"].pluck(:id)

    expected_ids = @user.organization.categories.pluck(:id)

    assert_equal expected_ids.sort, returned_ids.sort

    @other_categories = create_list(:category, 2)
    @other_categories.each do |category|
      refute_includes returned_ids, category.id
    end
  end

  def test_should_create_valid_category
    post categories_path,
      params: {
        category: { name: "Test Category" }
      },
      headers: @headers

    assert_response :success
    response_json = response.parsed_body

    assert_equal I18n.t("successfully_created", entity: "Category"), response_json["notice"]
  end

  def test_shouldnt_create_category_without_title
    post categories_path,
      params: {
        category: { name: "" }
      },
      headers: @headers

    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal "Name can't be blank", response_json["error"]
  end

  def test_create_should_permit_only_name_param
    extra_params = {
      category: {
        name: "Allowed name",
        organization_id: 9999,
        created_at: "2020-01-01"
      }
    }

    post categories_path, params: extra_params, headers: @headers
    assert_response :success

    created_category = Category.order(:created_at).last

    assert_equal "Allowed name", created_category.name

    assert_equal @user.organization_id, created_category.organization_id

    refute_equal "2020-01-01", created_category.created_at.to_date.to_s
  end
end
