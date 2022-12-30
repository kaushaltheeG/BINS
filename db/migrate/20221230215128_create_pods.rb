class CreatePods < ActiveRecord::Migration[7.0]
  def change
    create_table :pods do |t|
      t.string :name, index: true, null: false 
      t.string :description, null: false 
      t.references :workarea, null: false, foreign_key: true 
      t.references :admin, null: false, foreign_key: {to_table: :users}
      t.boolean :private, null: false, default: false 

      t.timestamps
    end
    add_index :pods, [:workarea_id, :name], unique: true 
    #Ex:- add_index("admin_users", "username")
  end
end
