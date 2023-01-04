class Api::DirectMessagesController < ApplicationController

    def index 
        #retrives all of current users direct messages within this workarea 
        @workarea = current_user.workareas.find_by(id: params[:workarea_id])

        if @workarea 
            @direct_messages = @workarea.direct_messages.select {|dm| dm.workarea_id == @workarea.id && current_user.direct_messages.include?(dm)}
            render :index 
        else 
            render json: {errors: ['Workarea does not exists for you']}, status: :unauthorized
        end 
    end 


    def show 
        #retives specific  direct messages and its messages 
        @workarea = current_user.workareas.find_by(id: params[:workarea_id])
        @direct_message = current_user.direct_messages.find_by(id : params[:id])
        isWithin = @workarea.direct_messages.include?(@direct_message)

        if isWithin 
            @direct_message
            render :show 
        else 
            render json: {errors: ['Could not dind direct message within work area']}, status: :unauthorized
        end 

    end 

    def create 
        #checks if there is an existing direct messages
            #if there is an existing one, will retive its and render show 
            #if there isn't one, will create and render show 

    end 

    def add_members 

    end 

    def demember 

    end 

    def new_message 

    end 

    private 

    def direct_message_params 
        params.require(:direct_message).permit(:workarea_id, :user_ids: [])
    end 



end
