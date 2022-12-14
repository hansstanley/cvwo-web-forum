class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |tab|
      tab.string :username
      tab.string :password

      tab.timestamps
    end
  end
end
