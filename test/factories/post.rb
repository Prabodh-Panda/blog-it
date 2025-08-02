# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    association :organization
    title { Faker::Book.unique.title }
    description { Faker::Lorem.paragraph_by_chars(number: 200) }
    status { "draft" }

    user { build(:user, organization: organization) }
  end
end
