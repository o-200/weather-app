class WeatherTemperature < ApplicationRecord
  def temperatures
    self.map { |n| n.temp_c }
  end

  def dates
    self.map { |n| n.created_at.to_date }
  end
end
