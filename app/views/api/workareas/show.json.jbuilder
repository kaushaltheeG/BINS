json.set! @workarea.id do 
    json.partial! 'workarea', workarea: @workarea
    json.messages do 
        @workarea.messages.each do |message|
            json.set! message.id do 
                json.extract! message, :id, :body, :author_id
                json.author_email message.author.email
            end 
        end 
    end 
end 