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
        p @workarea
        render json: { errors: [@workarea.errors.full_messages] }, status: :unauthorized
    end 

    private 

    def workarea_params 
        params.require(:workarea).permit(:name)
    end 
end
