# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = @current_user.organization.categories
    render status: :ok, json: { categories: }
  end

  def create
    category = @current_user.organization.categories.new(category_params)
    category.save!
    render_notice(t("successfully_created", entity: "Category"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
