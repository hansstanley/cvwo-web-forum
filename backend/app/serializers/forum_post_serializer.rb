class ForumPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :tags, :updated_at
  belongs_to :user
end
