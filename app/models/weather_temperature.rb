class WeatherTemperature < ApplicationRecord
  def self.get_temps(limit)
    limit(limit).pluck(:temp_c)
  end

  def self.get_dates(limit)
    limit(limit).pluck(:created_at)
  end
end
