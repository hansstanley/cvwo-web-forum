class ForumComment < ApplicationRecord
  belongs_to :user
  belongs_to :forum_post, optional: true
  belongs_to :forum_comment, optional: true
  has_many :forum_comments, foreign_key: 'parent_id'
end
