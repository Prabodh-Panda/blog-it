# frozen_string_literal: true

class User < ApplicationRecord
  belongs_to :organization

  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, confirmation: true, length: { minimum: 6 }, if: -> {
 new_record? || !password.nil? }
end
