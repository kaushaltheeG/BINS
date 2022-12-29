class WorkareaChannel < ApplicationCable::Channel 

    def subscribed
        @workarea = Workarea.find_by(id: params[:id])
        stream_for @workarea
    end 

    


end 