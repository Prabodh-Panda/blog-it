# frozen_string_literal: true

class AddUniqueIndexToVotesUserIdAndPostId < ActiveRecord::Migration[7.1]
  def change
    add_index :votes, [:user_id, :post_id], unique: true
  end
end
