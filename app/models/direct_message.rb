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

    has_many :members, 
        through: :memberships,
        source: :user 

    belongs_to :workarea,
        foreign_key: :workarea_id,
        class_name: :Workarea

    belongs_to :creator, 
        foreign_key: :creator_id, 
        class_name: :User 




    before_save :add_creator_as_member, :add_members, :check_if_group, if: :new_record?
    attr_reader :user_ids 

    def user_ids=(user_ids)
        @user_ids = user_ids.instance_of?(String) ? JSON.parse(user_ids) : user_ids
    end 

    def add_creator 
        self.members << self.creator unless self.members.include?(self.creator)
    end 


    def add_members 
        @user_ids.each do |user_id| 
            user = User.find_by(id: user_id)
            self.members << user unless self.members.include?(user)
        end 
    end 

    def check_if_group 
        if self.members.length > 2 
            self.is_group = true 
        end 
    end 

    def self.direct_message_exists(workarea_id, ids) #take in workarea and and array of user ids
        query = self.joins(:memberships)
            .where(memberships: {user_id: ids})
            .where(workarea_id: workarea_id)
            .group(:id)
            .having('count(direct_messages.id) = :ids_length', ids_length: ids.length)
            .select('direct_messages.*')

        sorted_ids = ids.sort 
        query.each do |dm| 
            dmIds = dm.members.map { |member| member.id }.sort 
            return dm if dmIds == sorted_ids
        end 
        nil 
    end 

end
