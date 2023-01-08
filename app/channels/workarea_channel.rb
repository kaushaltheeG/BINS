class WorkareaChannel < ApplicationCable::Channel 

    def subscribed
        p params
        @workarea = Workarea.find_by(id: params[:id])
        stream_for @workarea
    end 


end 