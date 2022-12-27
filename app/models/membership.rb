# == Schema Information
#
# Table name: memberships
#
#  id                  :bigint           not null, primary key
#  user_id             :bigint           not null
#  status              :boolean          default(TRUE), not null
#  membershipable_type :string
#  membershipable_id   :bigint
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
class Membership < ApplicationRecord
    validates :user_id, uniqueness: { scope: [:membershipable_id, :membershipable_type]}
    validates :status, inclusion: { in: [true, false]}
   

    belongs_to :membershipable, polymorphic: true 

    belongs_to :user,
        foreign_key: :user_id, 
        class_name: :User 
end
