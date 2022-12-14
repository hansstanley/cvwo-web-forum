# Constrains ForumPost to User
class AddForeignKeyConstraintOnUserIdInForumPosts < ActiveRecord::Migration[7.0]
  def change
    add_reference :forum_posts, :user, foreign_key: { on_delete: :cascade, on_update: :cascade }
  end
end
