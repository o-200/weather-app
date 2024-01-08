class WeatherTemperaturesController < ApplicationController
  def index
    weathers = WeatherTemperature.last(5)

    gon.temps = weathers.temperatures
    gon.dates = weathers.dates
  end

  def create
    temperature = WeatherPicker.new.current_weather
    weather = WeatherTemperature.new(temperature)

    if weather.save
      flash[:notice] = "Record was successfully created"
    else
      flash[:alert] = weather.errors.full_messages
    end
  end
end
