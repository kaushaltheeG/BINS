class PodChannel < ApplicationCable::Channel 

    def subscribed
        p params
        @workarea = Workarea.find_by(id: params[:workareaId])
        @pod = @workarea.pods.find_by(id: params[:podId]);
        stream_for @pod
    end 

    


end 