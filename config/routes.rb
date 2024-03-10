Rails.application.routes.draw do
  root to: 'weather_temperatures#index'
  get '/prediction', to: 'weather_temperatures#weather_prediction', as: 'weather_predictions'

  resources :weather_temperatures
end
