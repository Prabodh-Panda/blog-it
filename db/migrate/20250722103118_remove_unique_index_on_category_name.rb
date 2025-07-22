# frozen_string_literal: true

class RemoveUniqueIndexOnCategoryName < ActiveRecord::Migration[7.1]
  def change
    remove_index :categories, :name
  end
end
