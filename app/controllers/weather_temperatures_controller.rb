class WeatherTemperaturesController < ApplicationController
  def index
    weathers = WeatherTemperature.last(5)

    gon.temps = weathers.map { |n| n.temp_c }
    gon.dates = weathers.map { |n| n.created_at.to_date }
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
