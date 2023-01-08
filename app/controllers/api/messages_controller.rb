class Api::MessagesController < ApplicationController

    def update 
        @message = Message.find_by(id: params[:id])
        # debugger  
        if @message.author_id == current_user.id 
            # debugger
            if @message.update(body: message_params[:body])
                # debugger
                if @message.messageable_type == 'Pod'
                    @pod = Pod.find_by(id: message_params[:platform_id])
                    # debugger 
                    PodChannel.broadcast_to(@pod,
                        type: 'UPDATE_MESSAGE',
                        **from_template('api/messages/show', message: @message))

                elsif @message.messageable_type == 'DirectMessage'
                    @direct_message = DirectMessage.find_by(id: message_params[:platform_id])
                    DirectMessageChannel.broadcast_to(@direct_message, 
                        type: 'UPDATE_MESSAGE',
                        **from_template('api/messages/show', message: @message))
                end

                render json: nil, status: :ok 
            else 
                render json: {errors: ['failed to update message']}, status: :unauthorized
            end 
        else 
            render json: {errors: ['author id does not match current user']}, status: :unauthorized
        end 
    end 

    def destroy 
        @message = Message.find_by(id: params[:id])
        p @message
        if @message.author_id == current_user.id 
            if @message.destroy 
                if @message.messageable_type == 'Pod'
                    @pod = Pod.find_by(id: message_params[:platform_id])
                    PodChannel.broadcast_to(@pod,
                    type: 'DELETE_MESSAGE',
                    **from_template('api/messages/show', message: @message))
                elsif @message.messageable_type == 'DirectMessage'
                    @direct_message = DirectMessage.find_by(id: message_params[:platform_id])
                    DirectMessageChannel.broadcast_to(@direct_message,
                    type: 'DELETE_MESSAGE',
                    **from_template('api/messages/show', message: @message))
                end
                render json: nil, status: :ok 
            else 
                render json: {errors: ['failed to destory message']}, status: :unauthorized
            end 

        else 
            render json: {errors: ['author id does not match current user']}, status: :unauthorized
        end 

    end 

    
    private 
    def message_params
        params.require(:message).permit(:body, :platform_id)
    end 
end

# old controller action 
# def create 
#     @workarea = Workarea.find_by(id: params[:workarea_id]);
#     @pod = @workarea.pods.find_by(id: params[:pod_id]);
#     #test create !!!!!
#     # @message = Message.new(message_params)
#     if @pod.messages.create!(message_params) 
#         @message = @pod.messages.last 
#         PodChannel.broadcast_to(@pod, 
#         from_template('api/messages/show', message: @message))
#         render json: nil, status: :ok 

#         return 
#     end 
#     render json: { erorr: ["Failed to create message"] }, status: :unauthorized
# end 

# def index 
#     @workarea = Workarea.find_by(id: params[:workarea_id]);
#     @pod = @workarea.pods.find_by(id: params[:pod_id]);
#     @messages = @pod.messages 
#     render :index 
# end 