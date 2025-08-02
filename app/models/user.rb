# frozen_string_literal: true

class User < ApplicationRecord
  MAX_NAME_LENGTH = 35
  MAX_EMAIL_LENGTH = 255
  MIN_PASSWORD_LENGTH = 6
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

  belongs_to :organization
  has_many :posts
  has_many :votes, dependent: :destroy

  has_secure_password
  has_secure_token :authentication_token

  validates :name, presence: true, length: { maximum: MAX_NAME_LENGTH }
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }
  validates :password, length: { minimum: MIN_PASSWORD_LENGTH }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create

  before_save :to_lowercase
  after_commit :update_is_bloggable_status

  private

    def to_lowercase
      email.downcase!
    end

    def upvotes_count
      votes.upvote.count
    end

    def downvotes_count
      votes.downvote.count
    end

    def net_votes
      upvotes_count - downvotes_count
    end

    def update_is_bloggable_status
      threshold = 10
      new_status = net_votes >= threshold
      if is_bloggable != new_status
        update_column(:is_bloggable, new_status)
      end
    end
end
