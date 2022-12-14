class MakeArrayColumnTagsInForumPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :forum_posts, :user_id, :integer
    remove_column :forum_posts, :tags, :text
    add_column :forum_posts, :tags, :text, after: :description, array: true, default: []
  end
end
