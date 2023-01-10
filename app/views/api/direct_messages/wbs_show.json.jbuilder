json.extract! @direct_message || direct_message, :id, :name, :workarea_id, :is_group, :creator_id, :created_at, :updated_at
json.members do 
    @direct_message || direct_message.members.each do |member|
        json.set! member.id do 
            json.id member.id 
            json.name member.name 
            json.email member.email
        end 
    end 
end 
json.messages do 
    @direct_message || direct_message.messages.each do |message|
        json.set! message.id do 
            json.extract! message, :id, :body, :author_id, :created_at, :updated_at
            json.author_email message.author.email
            json.author_name message.author.name
        end 
    end 
end 