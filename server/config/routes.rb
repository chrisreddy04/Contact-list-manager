Rails.application.routes.draw do
  namespace :api do
    resources :contacts, only: [:index, :create, :update, :destroy]
  end

  # Catch-all route to serve the React app
  get '*path', to: 'static#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
