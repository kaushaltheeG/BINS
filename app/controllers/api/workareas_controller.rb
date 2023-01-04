class Api::WorkareasController < ApplicationController

    def index 
        @workareas = Workarea.all 
        render :index 
    end 

    def show 
        @workarea = Workarea.find_by(id: params[:id])
        
        if @workarea
            render :show
            return 
        end 
        render json: {errors: ['The provided credentials were invalid.']}, status: :unauthorized

    end 

    def create 
        
        @workarea = Workarea.new(workarea_params)
        @workarea.owner_id = params[:user_id]
        @workarea.image_url = "k"
        @owner = User.find_by(id: @workarea.owner_id)
        p @owner
        if @workarea.save!
            @workarea.members << @owner
            render :show 
            return 
        end 
        
        render json: { errors: [@workarea.errors.full_messages] }, status: :unauthorized
    end 

    def add_members 
        member_ids = params[:user_ids]
        @workarea = Workarea.find_by(id: params[:workarea_id])
        if @workarea
            member_ids.each do |id|
                @user = User.find_by(id: id)
                @workarea.members << @user unless @workarea.members.include?(@user)
            end 
            
            render :show 
        else 
            render json: {errors: ['Could not find workarea']}, status: :unauthorized
        end 
    end 

    def demember 
        @membership = current_user.memberships.where("membershipable_type = 'Workarea' and membershipable_id = :id", id: params[:workarea_id]).first

        if @membership
            @membership.destroy
            render json: { message: 'success'} 
            return 
        else 
            render json: {errors: ['Cannot find user membership to this work area']}
        end 
    end 



    private 

    def workarea_params 
        params.require(:workarea).permit(:name)
    end 
end
