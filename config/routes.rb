Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    #Auth
    resources :users, only: [:show, :index, :new, :create, :destroy]
    resource :session, only: [:new, :create, :destroy]

    #Music
    resources :tracks, only: [:create, :update, :show, :index]
    resources :albums, only: [:create, :update, :show, :index]
    resources :artists, only: [:create, :update, :show, :index]
    resources :annotations, only: [:create, :update, :show, :index, :destroy]
  end

end
