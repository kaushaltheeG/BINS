class CreateDirectMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :direct_messages do |t|
      t.string :name, null: true
      t.references :workarea, null: false, foreign_key: true 
      t.references :creator, null: false, foreign_key: {to_table: :users} 
      t.boolean :is_group, null: false, default: false 
      
      


      t.timestamps
    end
  end
end
