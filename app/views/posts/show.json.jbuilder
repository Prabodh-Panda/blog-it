# frozen_string_literal: true

json.post do
  json.partial! "posts/post", post: @post
  json.status @post.status
end
