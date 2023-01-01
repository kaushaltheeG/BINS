json.pods do 
    @pods.each do |pod| 
        json.set! pod.id do 
            json.partial! 'pod', pod: pod 
        end 
    end 
end 