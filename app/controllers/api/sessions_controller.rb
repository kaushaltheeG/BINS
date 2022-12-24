class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:destory]

  def show
    if current_user 
      @user = current_user
      render 'api/users/show'
      return  
    end 
    render json: { user: nil }
  end

  def create
    email = params[:email]
    password = params[:password]
    @user = User.find_by_credentials(email, password)
    if @user 
      login!(@user)
      render 'api/users/show'
      return 
    end 
    render json: { errors: ['The provided credentials were invalid.']}, status: :unauthorized
  end

  def destroy
    logout!
    render json: { message: 'success'}
  end
end
