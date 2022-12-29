class Api::MessagesController < ApplicationController

    def create 
        @workarea = Workarea.find_by(id: params[:workarea_id]);
        #test create !!!!!
        # @message = Message.new(message_params)
        if @workarea.messages.create!(message_params) 
            @message = @workarea.messages.last 
            WorkareaChannel.broadcast_to(@workarea, 
            from_template('api/messages/show', message: @message))
            render json: nil, status: :ok 

            return 
        end 
        render json: { erorr: ["Failed to create message"] }, status: :unauthorized
    end 

    def index 
        @workarea = Workarea.find_by(id: params[:workarea_id]);
        @messages = @workarea.messages 
        render :index 
    end 

    private 
    def message_params
        params.require(:message).permit(:author_id, :body)
    end 
end
