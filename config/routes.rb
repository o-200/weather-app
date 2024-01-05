Rails.application.routes.draw do
  root to: 'weather_temperatures#index'
  resources :weather_temperatures
end
