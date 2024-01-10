class WeatherTemperaturesController < ApplicationController
  def index
    gon.temps = WeatherTemperature.get_temps(5)
    gon.dates = WeatherTemperature.get_dates(5)
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
