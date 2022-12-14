class User < ApplicationRecord
  has_many :forum_posts
  has_many :forum_comments
end
