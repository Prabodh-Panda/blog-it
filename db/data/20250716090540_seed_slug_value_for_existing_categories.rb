# frozen_string_literal: true

class SeedSlugValueForExistingCategories < ActiveRecord::Migration[7.1]
  def up
    Category.find_each do |category|
      category.send(:set_slug)
      category.save!(validate: false)
    end
  end

  def down
    Category.find_each do |category|
      category.slug = nil
      category.save!(validate: false)
    end
  end
end
