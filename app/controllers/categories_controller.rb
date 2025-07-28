# frozen_string_literal: true

class CategoriesController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @categories = policy_scope(Category)
  end

  def create
    category = @current_user.organization.categories.new(category_params)
    authorize category
    category.save!
    render_notice(t("successfully_created", entity: "Category"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
