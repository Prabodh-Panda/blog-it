# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :organization
  has_and_belongs_to_many :posts

  validates :name, presence: true, uniqueness: { scope: :organization_id }
  validate :slug_not_changed

  before_create :set_slug
  before_validation :capitalize_name

  private

    def capitalize_name
      self.name = name.to_s.capitalize
    end

    def set_slug
      name_slug = name.parameterize
      self.slug = name_slug
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("category.slug.immutable"))
      end
    end
end
