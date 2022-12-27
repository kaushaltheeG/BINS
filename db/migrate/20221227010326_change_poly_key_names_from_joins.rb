class ChangePolyKeyNamesFromJoins < ActiveRecord::Migration[7.0]
  def change
    remove_reference :memberships, :membership, polymorphic: true, index: {name: "membership_id_and_membership_type"}
    add_reference :memberships, :membershipable, polymorphic: true, index: {name: "membershipable_id_and_membershipable_type"}

  end
end
