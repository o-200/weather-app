Rails.application.routes.draw do
  root to: 'weather_temperatures#index'
  get '/prediction', to: 'weather_temperatures#weather_prediction'

  resources :weather_temperatures
end
