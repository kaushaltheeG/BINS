# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  name            :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password

    validates :session_token, presence: true, uniqueness: true 
    validates :email, length: {minimum:3, maximum:255}, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
    validates :name, presence: true 
    validates :password, length: {in: 6..255}, allow_nil: true 

    

end
