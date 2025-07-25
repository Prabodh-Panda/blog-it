# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :slug, :title, :description, :created_at, :status, :last_published_at

  json.author do
    json.extract! post.user, :id, :name
  end

  json.categories post.categories do |category|
    json.extract! category, :id, :name, :slug
  end
end

json.total_count @posts.total_count
