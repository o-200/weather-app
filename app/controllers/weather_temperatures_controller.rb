class WeatherTemperaturesController < ApplicationController
  def index
    gon.avg_temps_by_month = WeatherTemperature.get_avg_by_month_temps
  end

  def weather_prediction
    gon.temps = WeatherTemperature.get_week_temps(params[:location])
    gon.location = WeatherTemperature.get_location(params[:location])
  end
end
