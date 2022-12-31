class Api::PodsController < ApplicationController

    def index 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pods = @workarea.pods 
        render :index 
    end 

    def show 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pod = @workarea.pods.find_by(id: params[:id]);
        render :show 
    end 

end 