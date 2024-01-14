class GetTemperaturesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    temp = WeatherPicker.new.current_weather
    WeatherTemperature.create(temp)
  end
end
