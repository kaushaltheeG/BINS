class CreateMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships do |t|
      t.references :user, null: false, foreign_key: true, index: false 
      t.boolean :pending, null: false, default: true  
      t.references :membership, polymorphic: true, index: {name: "membership_id_and_membership_type"}
      
      t.timestamps
    end
    add_index :memberships, [:user_id, :membership_id, :membership_type], unique: true, name: 'unique_user_membership'
  end
end
