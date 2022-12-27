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
end
