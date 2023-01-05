json.extract! direct_message, :id, :name, :workarea_id, :is_group, :creator_id, :created_at, :updated_at
json.members do 
    direct_message.members.each do |member|
        json.set! member.id do 
            json.id member.id 
            json.name member.name 
        end 
    end 
end 