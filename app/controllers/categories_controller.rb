# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.select(:id, :name)
    render status: :ok, json: { categories: }
  end
end
