class AddUserReferenceToForumComments < ActiveRecord::Migration[7.0]
  def change
    add_reference :forum_comments, :user, foreign_key: { on_delete: :cascade, on_update: :cascade }
  end
end
