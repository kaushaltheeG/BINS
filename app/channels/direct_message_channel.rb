class DirectMessageChannel < ApplicationCable::Channel 

    def subscribed
        p params
        @workarea = Workarea.find_by(id: params[:workareaId])
        @direct_message = @workarea.direct_messages.find_by(id: params[:direct_message_id]);
        stream_for @direct_message
    end 


end 