class Api::PodsController < ApplicationController

    def create
        @workarea = Workarea.find_by(id: params[:workarea_id])
        # name = params[:pod][:name]
        # description = params[:pod][:description]
        # admin_id = params[:pod][:admin_id]
        # is_private = params[:pod][:private]
        members = params[:members]
        
        @pod = Pod.new(pod_params);
        @pod.workarea_id = @workarea.id 
        if @pod.save 
            members.each do |member_id|
                user = User.find_by(id: member_id)
                @pod.members << user unless @pod.members.include?(user)
            end 
            render :show 
            return 
        end 
        render json: {errors: [@pod.errors.full_messages]}, status: :unauthorized

    end 

    def update 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pod = @workarea.pods.find_by(id: params[:id]);

        if @pod.update(pod_params)
            render :show 
            return 
        end 
        render json: {errors: [@pod.errors.full_messages]}, status: :unauthorized
    end 

    def destroy 
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pod = @workarea.pods.find_by(id: params[:id]);
        if @pod.destroy
            render :show
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
        render :show 
    end 


    def demember
        @workarea = Workarea.find_by(id: params[:workarea_id])
        @pod = @workarea.pods.find_by(id: params[:id]);
        p current_user
        @membership = current_user.memberships.where("membershipable_type = 'Pod' and membershipable_id = :id", id: params[:pod_id]).first

        if @membership
            @membership.destroy
            render json: { message: 'success'} 
            return 
        end 
        p @membership
        render json: ["membership is not found"], status: :unauthorized

    end 

    private 
    def pod_params 
        params.require(:pod).permit(:name, :description, :admin_id, :private)
    end 

end 