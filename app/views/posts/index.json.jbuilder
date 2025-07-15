# frozen_string_literal: true

json.posts @posts do |post|
  json.id post.id
  json.slug post.slug
  json.title post.title
  json.description post.description
  json.created_at post.created_at

  json.author do
    json.id post.user.id
    json.name post.user.name
  end
end
