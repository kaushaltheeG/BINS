class CreateWorkareas < ActiveRecord::Migration[7.0]
  def change
    create_table :workareas do |t|
      t.string :name, null: false 
      t.references :owner, null: false, foreign_key: {to_table: :users}
      t.string :image_url

      t.timestamps
    end
  end
end
