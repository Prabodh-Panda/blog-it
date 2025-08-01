# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000

  enum :status, { draft: "draft", published: "published" }, default: :draft

  belongs_to :user
  belongs_to :organization

  has_many :votes

  has_and_belongs_to_many :categories

  validates :title,
    presence: true,
    length: { maximum: MAX_TITLE_LENGTH }

  validates :description,
    presence: true,
    length: { maximum: MAX_DESCRIPTION_LENGTH }

  validates :status, presence: true

  validates_inclusion_of :is_bloggable, in: [true, false]

  validates :slug, uniqueness: true

  validate :slug_not_changed

  before_create :set_slug
  before_save :set_last_published_if_published, if: -> { new_record? || will_save_change_to_status? }

  def net_votes
    votes.upvote.count - votes.downvote.count
  end

  def user_vote(user)
    votes.find_by(user_id: user.id)&.vote_type
  end

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_post_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("post.slug.immutable"))
      end
    end

    def set_last_published_if_published
      self.last_published_at = Time.current if published?
    end
end
