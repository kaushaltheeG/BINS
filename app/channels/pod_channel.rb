class PodChannel < ApplicationCable::Channel 

    def subscribed
        # @workarea = Workarea.find_by(id: params[:id])
        # @pod = @workarea.pods.find_by(id: params[:id]);
        # stream_for @pod
    end 

    


end 