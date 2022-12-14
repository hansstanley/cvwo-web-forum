class RemoveUserIdFromForumComments < ActiveRecord::Migration[7.0]
  def up
    remove_column :forum_comments, :user_id
  end
end
