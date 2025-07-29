# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    association :organization
    name { Faker::Commerce.unique.department }
  end
end
