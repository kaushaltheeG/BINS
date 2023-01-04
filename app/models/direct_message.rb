# == Schema Information
#
# Table name: direct_messages
#
#  id          :bigint           not null, primary key
#  name        :string
#  workarea_id :bigint           not null
#  creator_id  :bigint           not null
#  is_group    :boolean          default(FALSE), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class DirectMessage < ApplicationRecord

    validates :is_group, inclusion: {in: [true, false]}

    has_many :messages, #this association with be removed and added into pods, direct_mssages, and group_chat 
        as: :messageable, 
        dependent: :destroy 

    has_many :memberships, 
        as: :membershipable,
        dependent: :destroy

    belongs_to :workarea,
        foreign_key: :workarea_id,
        class_name: :Workarea

end
