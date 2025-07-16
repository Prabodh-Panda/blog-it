# frozen_string_literal: true

class Category < ApplicationRecord
  has_and_belongs_to_many :posts

  validates :name, presence: true, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  private

    def set_slug
      name_slug = name.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_task_slug = Category.where(
        regex_pattern,
        "^#{name_slug}$|^#{name_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_task_slug.present?
        slug_count = latest_task_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{name_slug}-#{slug_count + 1}" : name_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("category.slug.immutable"))
      end
    end
end
