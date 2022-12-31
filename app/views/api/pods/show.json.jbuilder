json.partial! 'pod', pod: @pod 
json.messages do 
    @pod.messages.each do |message|
        json.set! message.id do 
            json.extract! message, :id, :body, :author_id, :created_at, :updated_at
            json.author_name message.author.name
        end 
    end 

end 