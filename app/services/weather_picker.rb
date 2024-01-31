require 'faraday'

class WeatherPicker
  attr_reader :conn

  API_KEY = Rails.application.credentials.weather_key

  def initialize
    @conn = Faraday.new(
      url: 'http://api.weatherapi.com/v1',
      headers: {'Content-Type' => 'application/json'}
    )
  end

  def current_weather(q='Moscow')
    response = @conn.get("current.json?key=#{API_KEY}&q=#{q}&")
    body = JSON.parse(response.body)

    {
      temp_c: body['current']['temp_c'],
      feelslike_c: body['current']['feelslike_c']
    }
  end

   def forecast_weather_week(q='Moscow')
    response = @conn.get("forecast.json?key=#{API_KEY}&q=#{q}&days=7")
    arr = JSON.parse(response.body).dig('forecast', 'forecastday')

    array = []
    arr.each do |n|
      hash = {
        date: n['date'],
        max_temp_c: n['day']['maxtemp_c'],
        avg_temp_c: n['day']['avgtemp_c'],
        min_temp_c: n['day']['mintemp_c'],
        condition:  n['day']['condition']
      }

      array << hash
    end

    array
  end
end
