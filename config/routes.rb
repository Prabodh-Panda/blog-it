# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, except: %i[new edit], param: :slug
    resources :my_posts, only: :index, path: "my-posts" do
      collection do
        delete "bulk_delete"
        patch "bulk_update"
      end
    end
    resources :categories, only: %i[index create]
    resources :organizations, only: %i[index create]
    resources :users, only: :create
    resource :session, only: %i[create destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
