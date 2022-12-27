json.workareas do  
    @workareas.each do |workarea|
        json.set! workarea.id do 
            json.partial! 'workarea', workarea: workarea
        end 
    end 
end 