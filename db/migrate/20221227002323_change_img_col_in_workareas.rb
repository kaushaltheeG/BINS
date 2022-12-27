class ChangeImgColInWorkareas < ActiveRecord::Migration[7.0]
  def change
    remove_column :workareas, :image_url
    add_column :workareas, :image_url, :string, null: false, default: ""
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
