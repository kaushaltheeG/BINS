# == Schema Information
#
# Table name: pods
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :string           not null
#  workarea_id :bigint           not null
#  admin_id    :bigint           not null
#  private     :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Pod < ApplicationRecord
    validates :name, presence: true, uniqueness: {scope: :workarea_id}
    validates :description, presence: true, allow_blank: true 
    validates :private, inclusion: { in: [true, false]}

    #test 
    belongs_to :admin,
        foreign_key: :admin_id,
        class_name: :User 

    belongs_to :workarea,
        foreign_key: :workarea_id,
        class_name: :Workarea

    has_many :memberships, 
        as: :membershipable,
        dependent: :destroy

    has_many :members, 
        through: :memberships,
        source: :user 

    has_many :messages, #this association with be removed and added into pods, direct_mssages, and group_chat 
        as: :messageable, 
        dependent: :destroy 
end
