time_now = Time.now

12.times do |n|
  10.times do
    rand_value = rand(-30.0..50).ceil(1)
    rand_value2 = rand(-5.0..5.0).ceil(1)

    WeatherTemperature.create!(
      temp_c: rand_value,
      feelslike_c: rand_value + n,
      created_at: time_now - n.month
    )
  end
end

puts "All data created!"
