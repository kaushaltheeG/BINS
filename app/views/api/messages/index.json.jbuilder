json.messages do 
    json.array! @messages do |message|
        json.extract! message, :id, :body, :author_id, :created_at, :updated_at
        json.author_email message.author.email
        json.author_name message.author.name
        # json.set! message.id do 
        # end 
    end 
end 