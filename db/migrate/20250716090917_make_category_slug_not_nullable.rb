# frozen_string_literal: true

class MakeCategorySlugNotNullable < ActiveRecord::Migration[7.1]
  def change
    change_column_null :categories, :slug, false
  end
end
