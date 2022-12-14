# Controller for forum comments
class ForumCommentsController < ApplicationController
  before_action :user
  before_action :forum_post, :parent_comment
  before_action :set_forum_comment, only: %i[show update destroy]

  # GET /users/:id/forum_comments
  # GET /forum_posts/:id/forum_comments
  # GET /forum_comments/:id/forum_comments
  def index
    if @user
      @forum_comments = @user.forum_comments
    elsif @forum_post
      @forum_comments = @forum_post.forum_comments
    elsif @parent_comment
      @forum_comments = @parent_comment.forum_comments
    end
    render json: @forum_comments
  end

  # GET /forum_comments/:id
  def show
    render json: @forum_comment
  end

  # POST /users/:user_id/forum_comments
  def create
    @forum_comment = @user.forum_comments.create(comment_params)
    render json: @forum_comment
  end

  # PATCH /forum_comments/:id
  def update
    @forum_comment.update(comment_params)
    render json: @forum_comment
  end

  # DELETE /forum_comments/:id
  def destroy
    @forum_comment.destroy
    render json: @forum_comment
  end

  private

  def user
    return unless params.key?(:user_id)

    @user = User.find(params[:user_id])
  end

  def forum_post
    return unless params.key?(:forum_post_id)

    @forum_post = ForumPost.find(params[:forum_post_id])
  end

  def parent_comment
    return unless params.key?(:forum_comment_id)

    @parent_comment = ForumComment.find(params[:forum_comment_id])
  end

  def set_forum_comment
    @forum_comment = ForumComment.find(params[:id])
  end

  def comment_params
    params.require(:forum_comment).permit(:content, :forum_post_id, :parent_id)
  end
end
