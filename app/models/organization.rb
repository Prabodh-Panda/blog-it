# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :users
  has_many :posts
  has_many :categories, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end
