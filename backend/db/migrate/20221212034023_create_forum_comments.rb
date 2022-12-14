# Creates table for ForumComment
class CreateForumComments < ActiveRecord::Migration[7.0]
  def change
    create_table :forum_comments do |t|
      t.string :content
      t.boolean :deleted, default: false
      t.references :parent, foreign_key: { to_table: :forum_comments }

      t.timestamps
    end
  end
end
