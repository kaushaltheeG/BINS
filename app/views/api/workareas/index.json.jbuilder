json.workareas do  
    @workareas.each do |workarea|
        json.partial! 'workarea', workarea: workarea
        # json.set! workarea.id do 
        # end 
    end 
end 