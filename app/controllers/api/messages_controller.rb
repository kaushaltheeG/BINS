class Api::MessagesController < ApplicationController

    def create 
        @workarea = Workarea.find_by(id: params[:workarea_id]);
        @pod = @workarea.pods.find_by(id: params[:pod_id]);
        #test create !!!!!
        # @message = Message.new(message_params)
        if @pod.messages.create!(message_params) 
            @message = @pod.messages.last 
            PodChannel.broadcast_to(@pod, 
            from_template('api/messages/show', message: @message))
            render json: nil, status: :ok 

            return 
        end 
        render json: { erorr: ["Failed to create message"] }, status: :unauthorized
    end 

    def index 
        @workarea = Workarea.find_by(id: params[:workarea_id]);
        @pod = @workarea.pods.find_by(id: params[:pod_id]);
        @messages = @pod.messages 
        render :index 
    end 

    private 
    def message_params
        params.require(:message).permit(:author_id, :body)
    end 
end
