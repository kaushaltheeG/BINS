Rails.application.routes.draw do
  namespace :api do
    get 'direct/messages'
  end
  get 'direct/messages'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json} do 
    resources :users, only: [:create] do 
      resources :workareas, only: [:create] #added 
      # resources :pods, only: [:index, :create]
    end 

    resource :session, only: [:create, :show, :destroy] #added 

    resources :messages, only: [:update, :destroy] #!!!!!!!!!not there 

    resources :workareas, only: [:index, :show] do #added both 
      post :addmembers, to: 'workareas#add_members', as: 'add_members' #added 
      post :demember, to: 'workareas#demember', as: 'demember' #added 

      resources :pods, only: [:index, :show, :create, :update, :destroy] do #added 
        post :addmembers, to: 'pods#add_members', as: 'add_members' #added 
        post :demember, to: 'pods#demember', as: 'demember' #added 
        post :newmessage, to: 'pods#create_message', as: 'new_message'#added 
        # get :allmessages, to: 'pods#all_messages', as: 'all_messages' | show fecthes all messages 
      end 

      resources :direct_messages, only: [:index, :show, :create] do #added 
        post :addmembers, to: 'direct_messages#add_members', as: 'add_members' #added 
        post :demember, to: 'direct_messages#demember', as: 'demember' #added 
        post :newmessage, to: 'direct_messages#create_message', as: 'new_message' #added 
        # get :allmessages, to: 'direct_messages#all_messages', as: 'all_messages' | show fecthes all messages 
      end 
    end 

    
  end
  mount ActionCable.server => '/cable'
end
