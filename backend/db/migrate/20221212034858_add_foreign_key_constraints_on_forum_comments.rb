# Adds foreign key constraints to ForumPost and User
class AddForeignKeyConstraintsOnForumComments < ActiveRecord::Migration[7.0]
  def change
    add_reference :forum_comments, :user, foreign_key: { on_delete: :cascade, on_update: :cascade }
    add_reference :forum_comments, :forum_post, foreign_key: { on_delete: :cascade, on_update: :cascade }
  end
end
