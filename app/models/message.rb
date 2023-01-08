# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  body             :text             not null
#  author_id        :bigint           not null
#  messageable_type :string
#  messageable_id   :bigint
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Message < ApplicationRecord
    validates :body, presence: true

    belongs_to :messageable, polymorphic: true 
    #test
    belongs_to :author, 
        foreign_key: :author_id, 
        class_name: :User 
end
