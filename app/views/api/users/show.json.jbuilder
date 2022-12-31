json.user do 
    json.extract! @user, :id, :email, :name, :created_at, :updated_at
    json.memberships do 
        json.workareas do 
            @user.workareas.each do |workarea|
                json.set! workarea.id do 
                    json.extract! workarea, :id, :name, :owner_id, :created_at
                end 
            end
        end
        json.pods do 
            @user.pods.each do |pod| 
                json.set! pod.id do 
                    json.extract! pod, :id, :name, :workarea_id, :admin_id, :created_at
                end 
            end 
        end 
    end 
end 