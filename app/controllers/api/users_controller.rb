class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password'] #to include the password atrribute since it isnt a cloumn within the users table

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show 
      return 
    end 
    render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity 
  end


  private 
  def user_params 
    params.require(:user).permit(:email, :name, :password)
  end 
end
