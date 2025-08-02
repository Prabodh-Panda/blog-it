# frozen_string_literal: true

json.extract! post, :id, :slug, :title, :description, :created_at, :last_published_at, :is_bloggable

json.author do
  json.extract! post.user, :id, :name
end

json.categories post.categories do |category|
  json.extract! category, :id, :name, :slug
end

json.net_votes post.net_votes
json.user_vote post.user_vote(@current_user)
