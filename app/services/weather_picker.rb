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
end
