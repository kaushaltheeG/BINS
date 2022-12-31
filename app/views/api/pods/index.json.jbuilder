json.array! @pods do |pod| 
    json.partial! 'pod', pod: pod 
end 