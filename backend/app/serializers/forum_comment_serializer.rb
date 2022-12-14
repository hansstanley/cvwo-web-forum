class ForumCommentSerializer < ActiveModel::Serializer
  attributes :id, :parent_id, :forum_post_id, :content, :deleted, :updated_at
  belongs_to :user
  has_many :forum_comments
end
