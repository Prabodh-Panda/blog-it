# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    association :organization
    title { Faker::Book.unique.title }
    description { Faker::Lorem.paragraph_by_chars(number: 200) }
    is_bloggable { true }
    status { "draft" }

    user { build(:user, organization: organization) }

    after(:create) do |post|
      categories = create_list(:category, 2, organization: post.organization)
      post.categories << categories
    end
  end
end
