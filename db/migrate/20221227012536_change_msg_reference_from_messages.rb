class ChangeMsgReferenceFromMessages < ActiveRecord::Migration[7.0]
  def change
    remove_reference :messages, :message, polymorphic: true, index: {name: "message_id_and_message_type"}
    add_reference :messages, :messageable, polymorphic: true, index: {name: "messageable_id_and_messageable_type"}

    
  end
end
