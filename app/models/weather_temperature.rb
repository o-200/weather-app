class WeatherTemperature < ApplicationRecord
  def self.get_temps(limit)
    limit(limit).pluck(:temp_c)
  end

  def self.get_avg_by_month_temps
    WeatherTemperature.group(Arel.sql("DATE_TRUNC('month', created_at)"))
                      .order(Arel.sql("DATE_TRUNC('month', created_at)"))
                      .average(:temp_c)
                      .transform_keys { |key| key.strftime("%B") }
                      .transform_values { |value| value.to_i }
  end

  def self.get_week_temps
    WeatherPicker.new.forecast_weather_week[:temperatures]
  end

  def self.get_location
    WeatherPicker.new.forecast_weather_week[:location]
  end
end
