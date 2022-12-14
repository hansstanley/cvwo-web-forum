# Controller for users
class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

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

  # DELETE /users/:id
  def delete
    @user.destroy
    render json: @user
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def set_user_by_username
    @user = User.find_by(username: params[:username])
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
