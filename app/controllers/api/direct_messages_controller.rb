class Api::DirectMessagesController < ApplicationController

    def index 
        #retrives all of current users direct messages within this workarea 
        @workarea = current_user.workareas.find_by(id: params[:workarea_id])

        if @workarea 
            @direct_messages = @workarea.direct_messages.select {|dm| dm.workarea_id == @workarea.id && current_user.direct_messages.include?(dm)}
            render :index 
        else 
            render json: {errors: ['Workarea does not exists for you']}, status: :unauthorized
        end 
    end 


    def show 
        #retives specific  direct messages and its messages 
        @workarea = current_user.workareas.find_by(id: params[:workarea_id])
        @direct_message = current_user.direct_messages.find_by(id: params[:id])
        isWithin = @workarea.direct_messages.include?(@direct_message)

        if isWithin 
            @direct_message
            render :show 
        else 
            render json: {errors: ['Could not dind direct message within work area']}, status: :unauthorized
        end 

    end 

    def create 
        #checks if there is an existing direct messages
            #if there is an existing one, will retive its and render show 
            #if there isn't one, will create and render show 
        user_ids = (params[:direct_message][:user_ids]).map(&:to_i) #retirivng all user_ids and converting it into integers
        workarea_id = params[:workarea_id]
        final_arr =  user_ids.push(current_user.id)
       
        @direct_message = DirectMessage.direct_message_exists(workarea_id, final_arr.uniq)
       
        #if chat has been found
        if @direct_message 
            #if user creates a new message 
            if (params[:direct_message][:body])
                message = @direct_message.messages.new(direct_message_new_message_params)
                message.author_id = current_user.id 
                message.save! 
            end 
            
            #action cable; to display the newly created message to the existing chat 

            render :show 
        else 
            #drect message has not been found 
            @direct_message = DirectMessage.new(user_ids: params[:direct_message][:user_ids]) # takes in workarea_id and user ids 
            @direct_message.creator_id = current_user.id #adding creator id 
            @direct_message.workarea_id = params[:workarea_id]

            #if user creates a new message while creating a new direct message  
            if (params[:direct_message][:body])
                message = @direct_message.messages.new(body: params[:direct_message][:body])
                message.author_id = current_user.id 
                message.save! 
            end 

            if @direct_message.save 
                #if saved, display message via action cable 
                    #action cable here 

                render :show 
            else 

                #direct message fails to be created 
                render json: { errors: [@direct_message.errors.full_messages]}, status: :unauthorized
            end 
        end 

    end 

    def add_members 
        #can add users to exsisting direct message; feature for only group chats 
        members = params[:members]
        @workarea = Workarea.find_by(id: params[:workarea_id]);
        @direct_message = @workarea.direct_messages.find_by(id: params[:direct_message_id])
        p @direct_message
        if !@direct_message.is_group
            #checks if the direct message is gorup chat or not; if it is, renders an error and exits function 
            render json: { errors: ['Can only add users if it is a group chat']}
            return 
        end 

        members.each do |member|
            #using retrived user-ids via params to find and add the user/s to the direct message 
         
            user = User.find_by(id: member[:id])
            @direct_message.members << user unless @direct_message.members.include?(user);
        end 

        if @direct_message.save 
            render :show 
            return 
        end 
        render json: {errors: [@direct_message.errors.full_messages]}, status: :unauthorized
    end 

    def demember 
        #user can leave a direct message if it is a group chat 
        @workarea = Workarea.find_by(id: params[:workarea_id]);
        @direct_message = @workarea.direct_messages.find_by(id: params[:direct_message_id])

        
        if @direct_message.is_group && @direct_message.members.length > 3 
            #checks if direct message is a group and if the memebrs list is greater than 3
            @membership = current_user.memberships.where("membershipable_type = 'DirectMessage' and membershipable_id = :id", id: params[:direct_message_id]).first
            if @membership
                #if membership exists
                @membership.destroy
                render json: { message: 'success'} 
            else 
                #if membership is not found 
                render json: ["membership is not found"], status: :unauthorized
            end 
        else 
            render json: { errors: ['Can only demember if it is a group chat or if there more than 3 members']}
        end 

    end 

    def create_message 
        #find workarea via current user 
        @workarea = current_user.workareas.find_by(id: params[:workarea_id])
        #find direct message via current user 
        @direct_message = current_user.direct_messages.find_by(id: params[:direct_message_id])
        p current_user.direct_messages
        #checks if the foudn workarea includes the direct message 
        if @workarea.direct_messages.include?(@direct_message)
            #creates a new message using the strong params and setting author id 
            @message = @direct_message.messages.new(body: params[:direct_message][:body])
            @message.author_id ||= current_user.id 

            if @message.save 
                #broad cast message via action cable 
                DirectMessageChannel.broadcast_to(@direct_message, from_template('api/messages/show', message: @message))
                # render 'api/messages/show'
                render json: nil, status: :ok 
            else 
                #render error message for failing to create a message 
                render json: { erorr: ["Failed to create message"] }, status: :unauthorized
            end 
        else 
            render json: { errors: ['Could not find direct message within current user work area']}, status: :unauthorized
        end 
    end 

    private 

    def direct_message_params 
        params.require(:direct_message).permit(:body, user_ids: [])
    end 

    def direct_message_new_message_params 
        params.require(:direct_message).permit(:body)
    end 

end
