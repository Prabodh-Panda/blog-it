# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.select(:id, :name)
    render status: :ok, json: { categories: }
  end

  def create
    category = Category.new(category_params)
    category.save!
    render_notice(t("category_successfully_created"))
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
