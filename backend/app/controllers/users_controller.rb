# Controller for users
class UsersController < ApplicationController
  before_action :authenticate_user, except: :create
  before_action :set_user, only: %i[show update destroy]

  # GET /users
  # GET /users?username
  def index
    if params.key?(:username)
      set_user_by_username
      raise ActiveRecord::RecordNotFound, "Couldn't find User with username=#{params[:username]}" unless @user

      show
    else
      @users = User.all
      render json: @users
    end
  end

  # GET /users/:id
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.create(user_params)
    render json: @user
  end

  # PATCH /users/:id
  def update
    if @current_user[:id] == @user[:id]
      @user.update(user_params)
      render json: @user
    else
      render json: { error: 'Invalid user' }, status: :unauthorized
    end
  end

  # DELETE /users/:id
  def delete
    if @current_user[:id] == @user[:id]
      @user.update({ deleted: true })
      render json: @user
    else
      render json: { error: 'Invalid user' }, status: :unauthorized
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def set_user_by_username
    @user = User.find_by(username: params[:username])
  end

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
