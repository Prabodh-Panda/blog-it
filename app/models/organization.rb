# frozen_string_literal: true

class Organization < ApplicationRecord
  with_options dependent: :destroy do |organization|
    organization.has_many :users
    organization.has_many :posts
    organization.has_many :categories
  end

  validates :name, presence: true, uniqueness: true
end
