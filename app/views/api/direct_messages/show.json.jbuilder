json.partial! 'direct_message', direct_message: @direct_message
json.messages do 
    @direct_message.messages.each do |message|
        json.set! message.id do 
            json.extract! message, :id, :body, :author_id, :created_at, :updated_at
            json.author_name message.author.name
        end 
    end 
end 