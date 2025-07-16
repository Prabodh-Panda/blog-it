# frozen_string_literal: true

class AddUniqueIndexToCategoriesSlug < ActiveRecord::Migration[7.1]
  def change
    add_index :categories, :slug, unique: true
  end
end
