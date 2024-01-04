class CreateWeatherTemperatures < ActiveRecord::Migration[7.1]
  def change
    create_table :weather_temperatures do |t|
      t.decimal :temp_c
      t.decimal :feelslike_c
      
      t.timestamps
    end
  end
end
