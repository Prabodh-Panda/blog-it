# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    association :organization
    name { Faker::Lorem.unique.word.capitalize }
  end
end
