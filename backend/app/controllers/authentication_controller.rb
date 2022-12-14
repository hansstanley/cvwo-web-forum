class AuthenticationController < ApplicationController
  before_action :authenticate_user, except: :login

  # POST /auth/login
  def login
    @user = User.find_by(username: params[:username])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: {
        token:,
        exp: time.strftime('%Y-%m-%d %H:%M'),
        username: @user.username
      }, status: :ok
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:username, :password)
  end
end
