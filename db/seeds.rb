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
  Workarea.destroy_all
  Membership.destroy_all
  Pod.destroy_all
  Message.destroy_all
  DirectMessage.destroy_all 

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('workareas')
  ApplicationRecord.connection.reset_pk_sequence!('memberships')
  ApplicationRecord.connection.reset_pk_sequence!('direct_messages')
  ApplicationRecord.connection.reset_pk_sequence!('messages')
  ApplicationRecord.connection.reset_pk_sequence!('pods')


  puts "Creating Demo users..."
  # Create one user with an easy to remember username, email, and password:
  
  demo_user =  User.create!(
    name: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  puts "Creating Bot users"
  # 10.times do 
  #   User.create!({
  #     name: Faker::Name.name,
  #     email: Faker::Internet.unique.email,
  #     password: 'password'
  #   }) 
  # end
  
  bot_users = User.create!([
  { email: "bot1@gmail.com", password: "password", name: Faker::Name.name},
  { email: "bot2@gmail.com", password: "password", name: Faker::Name.name},
  { email: "bot3@gmail.com", password: "password", name: Faker::Name.name},
  { email: "bot4@gmail.com", password: "password", name: Faker::Name.name},
  { email: "bot5@gmail.com", password: "password", name: Faker::Name.name},
  { email: "bot6@gmail.com", password: "password", name: Faker::Name.name},
  { email: "bot7@gmail.com", password: "password", name: Faker::Name.name},
  { email: "bot8@gmail.com", password: "password", name: Faker::Name.name},
  { email: "bot9@gmail.com", password: "password", name: Faker::Name.name}
])

  puts "Creating Work Areas..."

  puts "Bot Takeover"
  bot_takeover_wa = Workarea.create!(
    name: "Bot Takeover",
    owner_id: bot_users.first.id,
    image_url: "k"
  )

  puts "Slack HQ"
  slack_wa = Workarea.create!(
    name: "Slack",
    owner_id: bot_users.last.id,
    image_url: "k"
  )

  puts "Future Leaders"
  future_leaders_wa = Workarea.create!(
    name: "Future Leaders",
    owner_id: bot_users[3].id,
    image_url: "k"
  )


  puts "Creating Pods for Bot Takeover"
  bot_takeover_pods = Pod.create!([
    {name: 'Bot Leaders', description: 'Executive Board' , workarea_id: bot_takeover_wa.id , admin_id: bot_users.first.id , private: true },
    {name: 'Next Steps', description: 'What to take over next' , workarea_id: bot_takeover_wa.id , admin_id: bot_users[2].id , private: false },
    {name: 'Bot News', description: 'What is new in the bot world' , workarea_id: bot_takeover_wa.id , admin_id: bot_users[1].id , private: false },
    {name: 'Overtake Exec', description: 'Need a new leadership' , workarea_id: bot_takeover_wa.id , admin_id: bot_users.last.id , private: true  }
  ])


  puts "Create Pods for Slack HQ"
  slack_pods = Pod.create([
    {name: 'React Dev Team', description: 'For our react devs', workarea_id: slack_wa.id, admin_id: bot_users.last.id, private: false},
    {name: 'Backend Dev Team', description: 'For our backend devs', workarea_id: slack_wa.id, admin_id: bot_users.last.id, private: false},
    {name: 'Database Team', description: 'For our database engineers', workarea_id: slack_wa.id, admin_id: bot_users.last.id, private: false},
    {name: 'How to bet BINS?', description: 'Ways to dust BINS', workarea_id: slack_wa.id, admin_id: bot_users.last.id, private: false}
  ])

  puts "Creating Pods for Future Leaders"
  future_leaders_pods = Pod.create([
    {name: 'Inspirational Quotes', description: "Send inspirational qutoes", workarea_id: future_leaders_wa.id, admin_id: bot_users[3].id, private: false},
    {name: 'Speech Delivery', description: "learn the power of words and how to convey them", workarea_id: future_leaders_wa.id, admin_id: bot_users[3].id, private: false},
    {name: 'Improving Daily Habits', description: "Learn how to improve your habbits", workarea_id: future_leaders_wa.id, admin_id: bot_users[3].id, private: false}
  ])

  puts "Creating Memberships..."
  # Membership.create!(
  #   user_id: 1,
  #   status: true,
  #   membershipable_type: "Workarea",
  #   membershipable_id: 1
  # )
  puts "Creating Memberships to Workarea: Bot Takeover"
  bot_takeover_wa.members << demo_user
  bot_users.each {|bot| bot_takeover_wa.members << bot}

  puts "Creating Memberships to Workarea: Slack Hq"
  slack_wa.members << demo_user
  bot_users.each {|bot| slack_wa.members << bot}

  puts "Creating Memberships to Workarea: Future Leaders"
  future_leaders_wa.members << demo_user
  bot_users.each {|bot| future_leaders_wa.members << bot}


  puts "Creating Memberships to Bot takeover Pods: General Stage, Next Steps, Bot News"
  bot_users.each do |bot|
   bot_takeover_wa.pods[0].members << bot unless bot_takeover_wa.pods[0].members.include?(bot)
   bot_takeover_pods[1].members << bot unless bot_takeover_pods[1].members.include?(bot)
   bot_takeover_pods[2].members << bot unless bot_takeover_pods[2].members.include?(bot)

   bot_takeover_wa.pods[0].members << demo_user unless bot_takeover_wa.pods[0].members.include?(demo_user)
   bot_takeover_pods[0].members << demo_user unless bot_takeover_pods[0].members.include?(demo_user)
   bot_takeover_pods[1].members << demo_user unless bot_takeover_pods[1].members.include?(demo_user)
   bot_takeover_pods[2].members << demo_user unless bot_takeover_pods[2].members.include?(demo_user)
  end 

  puts "Creating Memberships to Pod: Bot Leaders"
  bot_users[0..3].each do |bot|
    bot_takeover_pods[0].members << bot unless bot_takeover_pods[0].members.include?(bot)
  end 

  puts "Creating Memberships to Pod: Overtake Exec"
  bot_users[4..-1].each do |bot|
    bot_takeover_pods.last.members << bot unless bot_takeover_pods.last.members.include?(bot)
  end 

  puts "Creating Memberships to Slack Pod.."
  bot_users.each do |bot|
   slack_wa.pods[0].members << bot unless slack_wa.pods[0].members.include?(bot)
   slack_pods[0].members << bot unless slack_pods[0].members.include?(bot)
   slack_pods[1].members << bot unless slack_pods[1].members.include?(bot)
   slack_pods[2].members << bot unless slack_pods[2].members.include?(bot)
   slack_pods[3].members << bot unless slack_pods[3].members.include?(bot)


   slack_wa.pods[0].members << demo_user unless slack_wa.pods[0].members.include?(demo_user)
   slack_pods[0].members << demo_user unless slack_pods[0].members.include?(demo_user)
   slack_pods[1].members << demo_user unless slack_pods[1].members.include?(demo_user)
   slack_pods[2].members << demo_user unless slack_pods[2].members.include?(demo_user)
   slack_pods[3].members << bot unless slack_pods[3].members.include?(bot)
  end 

  puts "Creating Memberships to Future Leader Pods"
  bot_users.each do |bot|
   future_leaders_wa.pods[0].members << bot unless future_leaders_wa.pods[0].members.include?(bot)
   future_leaders_pods[0].members << bot unless future_leaders_pods[0].members.include?(bot)
   future_leaders_pods[1].members << bot unless future_leaders_pods[1].members.include?(bot)
   future_leaders_pods[2].members << bot unless future_leaders_pods[2].members.include?(bot)


   future_leaders_wa.pods[0].members << demo_user unless future_leaders_wa.pods[0].members.include?(demo_user)
   future_leaders_pods[0].members << demo_user unless future_leaders_pods[0].members.include?(demo_user)
   future_leaders_pods[1].members << demo_user unless future_leaders_pods[1].members.include?(demo_user)
   future_leaders_pods[2].members << demo_user unless future_leaders_pods[2].members.include?(demo_user)
  end


  puts "Creating Direct Messages..."
  bot_takeover_dm = DirectMessage.create!([
    {workarea_id: bot_takeover_wa.id, user_ids: [bot_users[0].id, bot_users[1].id], creator_id: bot_users[0].id },
    {workarea_id: bot_takeover_wa.id, user_ids: [bot_users[0].id], creator_id: bot_users[5].id },
    {workarea_id: bot_takeover_wa.id, user_ids: [bot_users[7].id, bot_users[6].id], creator_id: bot_users[0].id },
    {workarea_id: bot_takeover_wa.id, user_ids: [bot_users[0].id, bot_users[4].id, bot_users[3].id], creator_id: bot_users[2].id }
  ])

  puts "Creating Messages for DM: between bot 1 and bot 2"
  bot_takeover_dm.first.messages.create!([
    {body: "Hey there, #{bot_users[1].name}", author_id: bot_users[0].id},
    {body: "Hey there, #{bot_users[0].name}", author_id: bot_users[1].id},
    {body: "How are you doing?", author_id: bot_users[1].id},
    {body: "I am doing well; how are you?", author_id: bot_users[0].id},
    {body: "We need to take about #{bot_users.last.name}", author_id: bot_users[1].id},
    {body: "I was just about to say that", author_id: bot_users[0].id}
  ])

  puts "Creating Messages for DM: between bot 6 and bot 1"
  bot_takeover_dm[1].messages.create!([
    {body: "Hey there, Boss", author_id: bot_users[5].id},
    {body: "Hey there, #{bot_users[5].name}", author_id: bot_users[0].id},
    {body: "How are you doing?", author_id: bot_users[0].id},
    {body: "I am doing well; how are you?", author_id: bot_users[5].id},
    {body: "I don't think was can hold down BINS for that long", author_id: bot_users[5].id},
    {body: "...", author_id: bot_users[0].id}
  ])

  puts "Creating Messages for DM ~ GC: amoung bot 1, 7, and 8"
  bot_takeover_dm[2].messages.create!([
    {body: "Welcome squad, #{bot_users[7].name} and #{bot_users[6].name}", author_id: bot_users[0].id},
    {body: "squad squad squad", author_id: bot_users[7].id},
    {body: "squaaaaaddddd!!!", author_id: bot_users[6].id}
  ])

  puts "Creating Messages for DM ~ GC: amoung bot 1, 3, 4, and 5"
  bot_takeover_dm.last.messages.create!([
    {body: "Welcome yall", author_id: bot_users[2].id},
    {body: "Planning to make some changes to the news pod", author_id: bot_users[2].id},
    {body: "What do you have in mind,#{bot_users[2].name}?", author_id: bot_users[4].id},
    {body: "Yeah, what are your ideas,#{bot_users[2].name}?", author_id: bot_users[3].id}
  ])


  puts "Creating messages..."

  puts "Creating General Stage Pod Messages"
  bot_takeover_pods.first.messages.create!([
    {body: "Welcome my fellow bots", author_id: bot_users.first.id },
    {body: "Hellllo", author_id: bot_users[1].id },
    {body: "Hey yall", author_id: bot_users[2].id },
    {body: "We really made it through", author_id: bot_users[4].id },
    {body: "Sup bots", author_id: bot_users[3].id },
    {body: "Yoooooo!", author_id: bot_users[6].id },
    {body: "Hey guys", author_id: bot_users.last.id }
  ])

  puts "Creating Bot Leaders Pod Messages"
  bot_takeover_pods[1].messages.create!([
    {body: "Welcome my fellow exec board", author_id: bot_users.first.id },
    {body: "Hello, Boss", author_id: bot_users[1].id },
    {body: "Looking forward to the year", author_id: bot_users[2].id },
    {body: "Good work on taking over BINS, yall", author_id: bot_users[3].id }
    
  ])

  puts "Creating Next Steps Pod Messages"
  bot_takeover_pods[2].messages.create!([
    {body: "We need to take about next takeover", author_id: bot_users[2].id},
    {body: "Lets take over facebook", author_id: bot_users[7].id},
    {body: "No, lets take over uber", author_id: bot_users.last.id},
    {body: "No lets take over discord", author_id: bot_users[3].id},
    {body: "I agree with, #{bot_users[7].name}", author_id: bot_users[2].id}
  ])

  puts "Creating Bot News Pod Messages"
  bot_takeover_pods[3].messages.create!([
    {body: "Welcome to the new channel", author_id: bot_users[1].id},
    {body: "What was the lastest security leak? ", author_id: bot_users[5].id}
  ])

  puts "Creating Overtake Exec Pod Messages"
  bot_takeover_pods.last.messages.create!([
    {body: "I am over Bot 1" , author_id: bot_users.last.id },
    {body: "I think he is human!" , author_id: bot_users.last.id },
    {body: "Ok..." , author_id: bot_users[5].id },
    {body: "Are you alright, #{bot_users.last.name} " , author_id: bot_users[7].id }
  ])


  # test_stage_wa.messages.create!(body: "Welcome to my area, t2",author_id: 1)
  # test_stage_wa.messages.create!(body: "Hell, t1",author_id: 2)
  # test_stage_wa.messages.create!(body: "This is nice, t1",author_id: 2)
  # test_stage_wa.messages.create!(body: "Thanks, I hope it renders, t2",author_id: 1)

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