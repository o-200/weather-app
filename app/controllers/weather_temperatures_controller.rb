class WeatherTemperaturesController < ApplicationController
  def index
  end

  def create
    temperature = WeatherPicker.new.current_weather
    weather = WeatherTemperature.new(temperature)

    if weather.save
      flash[:notice] = "Record was successfully created"
    else
      weather.errors.full_messages
    end
  end
end
