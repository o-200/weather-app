class WeatherTemperaturesController < ApplicationController
  def index
    gon.avg_temps_by_month = WeatherTemperature.get_avg_by_month_temps
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
