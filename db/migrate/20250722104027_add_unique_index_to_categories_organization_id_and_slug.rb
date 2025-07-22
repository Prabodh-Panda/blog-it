# frozen_string_literal: true

class AddUniqueIndexToCategoriesOrganizationIdAndSlug < ActiveRecord::Migration[7.1]
  def change
    add_index :categories, [:organization_id, :slug], unique: true
  end
end
