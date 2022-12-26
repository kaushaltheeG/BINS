class CreateWorkareas < ActiveRecord::Migration[7.0]
  def change
    create_table :workareas do |t|

      t.timestamps
    end
  end
end
