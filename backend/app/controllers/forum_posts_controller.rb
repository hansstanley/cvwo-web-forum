# Controller for forum posts
class ForumPostsController < ApplicationController
  before_action :authenticate_user, except: %i[index create]
  before_action :user
  before_action :set_forum_post, only: %i[show update destroy]

  # GET /forum_posts
  # GET /users/:user_id/forum_posts
  def index
    @forum_posts = if @user
                     @user.forum_posts
                   else
                     ForumPost.all
                   end
    render json: @forum_posts
  end

  # GET /forum_posts/:id
  def show
    render json: @forum_post
  end

  # POST /users/:user_id/forum_posts
  def create
    @forum_post = @user.forum_posts.create(post_params)
    render json: @forum_post
  end

  # PATCH /forum_posts/:id
  def update
    if @current_user.id == @forum_post.user_id
      @forum_post.update(post_params)
      render json: @forum_post
    else
      render json: { error: 'Invalid user' }, status: :unauthorized
    end
  end

  # DELETE /forum_posts/:id
  def destroy
    if @current_user.id == @forum_post.user_id
      @forum_post.destroy
      render json: @forum_post
    else
      render json: { error: 'Invalid user' }, status: :unauthorized
    end
  end

  private

  def user
    return unless params.key?(:user_id)

    @user = User.find(params[:user_id])
  end

  def set_forum_post
    @forum_post = ForumPost.find(params[:id])
  end

  def post_params
    params.require(:forum_post).permit(:title, :description, tags: [])
  end
end
