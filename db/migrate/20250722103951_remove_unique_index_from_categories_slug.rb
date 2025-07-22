# frozen_string_literal: true

class RemoveUniqueIndexFromCategoriesSlug < ActiveRecord::Migration[7.1]
  def change
    remove_index :categories, :slug
  end
end
