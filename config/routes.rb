Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json} do 
    resources :users, only: [:create] do 
      resources :workareas, only: [:create] 
      # resources :pods, only: [:index, :create]
    end 
    resource :session, only: [:create, :show, :destroy]
    resources :workareas, only: [:index, :show] do 
      # resources :messages, only: [:create, :index]
      resources :pods, only: [:index, :show, :create, :update, :destroy] do 
        post :addmembers, to: 'pods#add_members', as: 'add_members'
        post :demember, to: 'pods#demember', as: 'demember'
        resources :messages, only: [:create, :index]

      end 
    end 
  end
  mount ActionCable.server => '/cable'
end
