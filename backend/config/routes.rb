Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :users, only: %i[index show create delete]

  resources :forum_posts, only: [:index]

  resources :users do
    resources :forum_posts, shallow: true
  end

  resources :users do
    resources :forum_comments, shallow: true
  end

  resources :forum_posts do
    resources :forum_comments, only: [:index]
  end

  resources :forum_comments do
    resources :forum_comments, only: %i[index]
  end
end
