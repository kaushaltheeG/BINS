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

    #S.P.I.R.E, has_secure_password gives us a password=

  before_validation :ensure_session_token 

  def self.find_by_credentials(email, password)
    if email.include?('@') 
      user = User.find_by(email: email )
      return user if user && user.authenticate(password)
    end 
    nil 
  end 

  def reset_session_token! 
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end 

  private 

  def ensure_session_token 
    self.session_token ||= generate_unique_session_token
  end 

  def generate_unique_session_token  
    while true 
      token = SecureRandom::urlsafe_base64 
      return token unless User.exists?(session_token: token)
    end 
  end 

end
