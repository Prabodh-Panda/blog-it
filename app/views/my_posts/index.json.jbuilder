# frozen_string_literal: true

json.posts @posts do |post|
  json.partial! "posts/post", post: post
  json.status post.status
end

json.total_count @posts.total_count
