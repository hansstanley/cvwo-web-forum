class User < ApplicationRecord
  has_many :forum_posts
  has_many :forum_comments

  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }
end
