
    json.array! @workareas do |workarea|
        json.partial! 'workarea', workarea: workarea
        json.first_pod workarea.pods.first 
        # json.first_pod workarea.pods
        # json.set! workarea.id do 
        # end 
    end 
