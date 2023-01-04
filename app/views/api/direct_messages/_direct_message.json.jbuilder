json.extract! direct_message, :id, :name, :workarea_id, :creator_id, :created_at, :updated_at
json.members direct_message.members.map {|mem| mem.name } #retive all the names 