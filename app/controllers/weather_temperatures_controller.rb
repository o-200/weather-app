class WeatherTemperaturesController < ApplicationController
  def index
    gon.avg_temps_by_month = WeatherTemperature.get_avg_by_month_temps
  end

  def weather_prediction
    gon.temps_by_day = WeatherTemperature.get_week_temps
  end
end
