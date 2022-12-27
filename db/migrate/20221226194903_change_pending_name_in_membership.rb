class ChangePendingNameInMembership < ActiveRecord::Migration[7.0]
  def change
    rename_column :memberships, :pending, :status 
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
