json.extract! workarea, :id, :name, :owner_id, :created_at
json.owner_name workarea.owner.name 
json.owner_email workarea.owner.email 