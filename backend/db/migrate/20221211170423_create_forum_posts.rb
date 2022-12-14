class CreateForumPosts < ActiveRecord::Migration[7.0]
  def change
    create_table :forum_posts do |tab|
      tab.string :title
      tab.string :description
      tab.text :tags
      tab.integer :user_id

      tab.timestamps
    end
  end
end
