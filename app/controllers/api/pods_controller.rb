    class Api::PodsController < ApplicationController

    def create
        @workarea = Workarea.find_by(id: params[:workarea_id])
     
        members = params[:members]
        
        @pod = Pod.new(pod_params);
        @pod.workarea_id = @workarea.id 
        if @pod.save 
            members.each do |member_id|
                user = User.find_by(id: member_id)
                @pod.members << user unless @pod.members.include?(user)
            end 
            WorkareaChannel.broadcast_to(@workarea, 
                type: 'RECEIVE_POD',
                payload: @pod.members, 
                **from_template('api/pods/wbs_show', pod: @pod))

            render json: nil, status: :ok 
            return 
        end 
        render json: {errors: [@pod.errors.full_messages]}, status: :unauthorized
    end 

    def update 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pod = @workarea.pods.find_by(id: params[:id]);

        if @pod.update(pod_params)
            WorkareaChannel.broadcast_to(@workarea, 
                type: 'RECEIVE_POD',
                **from_template('api/pods/wbs_show', pod: @pod))
            render json: nil, status: :ok 
            # render :show 
            return 
        end 
        render json: {errors: [@pod.errors.full_messages]}, status: :unauthorized
    end 

    def destroy 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pod = @workarea.pods.find_by(id: params[:id]);
        if @pod.destroy
            pods = @workarea.pods.select {|pod| pod.workarea_id == @workarea.id && current_user.pods.include?(pod)}
            @pod = pods.first
            WorkareaChannel.broadcast_to(@workarea, 
                type: 'REMOVE_POD',
                **from_template('api/pods/wbs_show', pod: @pod))
            render json: nil, status: :ok 
           
            # render :show
            return 
        end 
            render json: {errors: [@pod.errors.full_messages]}, status: :unauthorized
    end 

    def index 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        if current_user.workareas.include?(@workarea)
            
            @pods = @workarea.pods.select {|pod| pod.workarea_id == @workarea.id && current_user.pods.include?(pod)}
            render :index 
            return 
        end 
        render json: {errors: ['Workarea does not exists for you']}, status: :unauthorized
    end 

    def show 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pod = @workarea.pods.find_by(id: params[:id]);
        # from_template('api/pods/show', pod: @pod)
        render :show 
    end 

    def add_members
        members = params[:members]
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pod = @workarea.pods.find_by(id: params[:pod][:id]);
        p @pod 
        members.each do |member|
            user = User.find_by(id: member[:id])
            @pod.members << user unless @pod.members.include?(user);
        end 

        if @pod.save 
            WorkareaChannel.broadcast_to(@workarea, 
                type: 'RECEIVE_POD',
                **from_template('api/pods/wbs_show', pod: @pod))
            render json: nil, status: :ok 
            # render :show 
            return 
        end 
        render json: {errors: [@pod.errors.full_messages]}, status: :unauthorized
    end 


    def demember
        @membership = current_user.memberships.where("membershipable_type = 'Pod' and membershipable_id = :id", id: params[:pod_id]).first
        if @membership
           if @membership.destroy
                @workarea = Workarea.find_by(id: params[:workarea_id])
                @pod = @workarea.pods.find_by(id: params[:pod_id])
                WorkareaChannel.broadcast_to(@workarea, 
                    type: 'REMOVE_POD',
                    **from_template('api/pods/wbs_show', pod: @pod))
            
                render json: { message: 'success'} 
                return 
           end 
           render json: ["failed to destroy membership"], status: :unauthorized
           return 
        end 
        render json: ["membership is not found"], status: :unauthorized
    end 

    def create_message 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pod = @workarea.pods.find_by(id: params[:pod_id]);
        @message = @pod.messages.new(message_params)
        @message.author_id ||= current_user.id 
        if @message.save! 
            PodChannel.broadcast_to(@pod,
                type: 'RECEIVE_MESSAGE',
                **from_template('api/messages/show', message: @message))
            # render 'api/messages/show'
            render json: nil, status: :ok 
        else 
            render json: { erorr: ["Failed to create message"] }, status: :unauthorized
        end 


    end 

    private 
    def pod_params 
        params.require(:pod).permit(:name, :description, :admin_id, :private)
    end 

    def message_params
        params.require(:pod).permit(:author_id, :body)
    end 

end 