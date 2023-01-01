json.partial! 'workarea', workarea: @workarea
json.users do 
    @workarea.members.each do |user|
        json.set! user.id do 
            json.extract! user, :id, :email, :name, :created_at, :updated_at
        end 
    end 
end 
# json.pods do 
#     @workarea.pods.each do |pod|
#         json.set! pod.id do 
#             json.partial! 'api/pods/pod', pod: pod 
#             json.admin pod.admin.name 
#             # json.extract! message, :id, :body, :author_id, :created_at, :updated_at
#             # json.author_email message.author.email
#             # json.author_name message.author.name
#         end 
#     end 
# end 
