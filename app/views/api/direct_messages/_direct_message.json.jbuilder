json.extract! direct_message, :id, :name, :workarea_id, :creator_id, :created_at, :updated_at
json.members do 
    direct_message.members.each do |member|
        json.set! member.id do 
            json.extract! member, :id, :email, :name, :created_at, :updated_at
        end 
    end 
end 