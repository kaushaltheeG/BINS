class Api::PodsController < ApplicationController

    def index 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        if current_user.workareas.include?(@workarea)
            
            @pods = @workarea.pods.select {|pod| pod.workarea_id == @workarea.id && current_user.pods.include?(pod)}
            render :index 
            return 
        end 
        render json: {errors: ['Workarea does not exists for you']}, status: :unauthorized
    end 

    def show 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pod = @workarea.pods.find_by(id: params[:id]);
        render :show 
    end 

end 