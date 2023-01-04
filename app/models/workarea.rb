# == Schema Information
#
# Table name: workareas
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  owner_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image_url  :string           default(""), not null
#
class Workarea < ApplicationRecord
    validates :name, :owner_id, :image_url, presence: true
    # validates :owner_id, uniqueness: true #was preventing from creating a new workarea


    belongs_to :owner,
        foreign_key: :owner_id,
        class_name: :User 

    has_many :pods, 
        foreign_key: :workarea_id,
        class_name: :Pod,
        dependent: :destroy

    has_many :direct_messages,
        foreign_key: :workarea_id,
        class_name: :DirectMessage,
        dependent: :destroy

    

    has_many :memberships, 
        as: :membershipable,
        dependent: :destroy

    # has_many :messages, #this association with be removed and added into pods, direct_mssages, and group_chat 
    #     as: :messageable, 
    #     dependent: :destroy 


    has_many :members, 
        through: :memberships, 
        source: :user 

    #any user can join a workarea but channels can be made private or public 
end
