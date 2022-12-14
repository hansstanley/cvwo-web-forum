class ForumPost < ApplicationRecord
  belongs_to :user
  has_many :forum_comments
end
