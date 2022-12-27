# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  test_one = User.create!(
    name: 'test_one', 
    email: 'test1@gmail.com',  
    password: 'password'
  )
  test_two = User.create!(
    name: 'test_two', 
    email: 'test2@gamil.com', 
    password: 'password'
  )
   User.create!(
    name: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  # 10.times do 
  #   User.create!({
  #     name: Faker::Name.name,
  #     email: Faker::Internet.unique.email,
  #     password: 'password'
  #   }) 
  # end

  puts "Creating Work Areas..."
  test_stage_wa = Workarea.create!(
    name: "Test Stage",
    owner_id: 1,
    image_url: "k"
  )

  puts "Creating Memberships..."
  # Membership.create!(
  #   user_id: 1,
  #   status: true,
  #   membershipable_type: "Workarea",
  #   membershipable_id: 1
  # )

  test_stage_wa.members << test_one
  test_stage_wa.members << test_two 

  puts "Creating messages..."
  test_stage_wa.messages.create!(body: "Welcome to my area, t2",author_id: 1)
  test_stage_wa.messages.create!(body: "Hell, t1",author_id: 2)
  test_stage_wa.messages.create!(body: "This is nice, t1",author_id: 2)
  test_stage_wa.messages.create!(body: "Thanks, I hope it renders, t2",author_id: 1)

  # Message.create!(
  #   body: "Welcome to my area, t2",
  #   author_id: 1,
  #   messageable_type: "Workarea",
  #   messageable_id: 1,
  # )
  # Message.create!(
  #   body: "Hell, t1",
  #   author_id: 2,
  #   messageable_type: "Workarea",
  #   messageable_id: 1,
  # )
  # Message.create!(
  #   body: "This is nice, t1",
  #   author_id: 2,
  #   messageable_type: "Workarea",
  #   messageable_id: 1,
  # )
  # Message.create!(
  #   body:"Thanks, I hope it renders, t2",
  #   author_id: 1,
  #   messageable_type: "Workarea",
  #   messageable_id: 1,
  # )
  puts "Done!"
end