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

   def forecast_weather_week(q)
    q = 'Moscow' if q.nil?

    response = @conn.get("forecast.json?key=#{API_KEY}&q=#{q}&days=7")
    response_body = JSON.parse(response.body)
    arr = response_body.dig('forecast', 'forecastday')

    array = []

    location_hash = {
      name:     response_body.dig('location', 'name'),
      country:  response_body.dig('location', 'country')
    }

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

    arr = array * 3
    {
      location: location_hash,
      temperatures: arr.shift(7)
    }
  end
end
