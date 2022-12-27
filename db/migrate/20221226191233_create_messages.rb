class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :body, null: false 
      t.references :author, null: false, foreign_key: {to_table: :users}
      t.references :message, polymorphic: true, index: { name: 'message_id_and_message_type' }

      t.timestamps
    end
  end
end
