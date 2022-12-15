class ForumPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :tags, :created_at, :updated_at
  belongs_to :user
end
