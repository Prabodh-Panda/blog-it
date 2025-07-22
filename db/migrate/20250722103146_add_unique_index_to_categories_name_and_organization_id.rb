# frozen_string_literal: true

class AddUniqueIndexToCategoriesNameAndOrganizationId < ActiveRecord::Migration[7.1]
  def change
    add_index :categories, [:organization_id, :name], unique: true
  end
end
