# Make username column unique in User
class MakeUsernameUniqueInUsers < ActiveRecord::Migration[7.0]
  def change
    add_index :users, :username, unique: true
  end
end
