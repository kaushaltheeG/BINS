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
        if @workarea.save!
            # @pod = Pod.create!({name: 'General Stage', description: 'General room for everyone', workarea_id: @workarea.id, admin_id: @workarea.owner_id })
            # @workarea.pods << @pod
            @workarea.members << @owner
            render :show 
            return 
        end 
        
        render json: { errors: [@workarea.errors.full_messages] }, status: :unauthorized
    end 

    def add_members 
        
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @user = User.find_by(id: params[:user_id])
        if @workarea && @user
            @workarea.members << @user unless @workarea.members.include?(@user)
            @workarea.add_new_user_to_all_general_pods(@user)
            
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
