$(document).ready(function () {
  // grab the necessary tools to use ajax and weather api
  // create a var to store the queryURL
  // var for api key to weather app
  var APIKey = "a8bfa6adc6cea260ba1bbbb01147a568"

  $('#search-city').on('click', searchForCity)

  // FUNCTION FOR WHEN SEARCH BUTTON IS PRESSED
  function searchForCity() {
    console.log('button was clicked')
    // create a button variable 
    var textInputBtn = $('<button>')
    // create a var findCity access the textContent of the inputField/previous sibling element
    var findCity = $(this).siblings('#inputField').val()
    // input the url to query insert findCity
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${findCity}&appid=${APIKey}`
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .then(response => {
        //CURRENT WEATHER API CALL
        //FILL IN ALL CURRENT WEATHER HTML
        var name = response.name
        $('#name').text(name)
        //grab lat and lon variables
        const lat = response.coord.lat;
        const lon = response.coord.lon;
        // save the response temp to a var
        var temp = response.main.temp;
        // convert temp to fahrenheight
        var tempF = (temp - 273.15) * 1.80 + 32
        // log temp in console
        console.log(tempF)
        //  print temp to page
        $('#converted-temp').text(tempF)
        // DISPLAY HUMIDITY TO JUMBOTRON
        var humidity = response.main.humidity
        $('#humidity').text(humidity)
        console.log(humidity)
        // DISPLAY WIND SPEED
        var windSpeed = response.wind.speed
        $('#wind-speed').text(windSpeed)
        // DISPLAY WEATHER
        var weather = response.weather[0].description
        $('#weather').text(weather)

        console.log(response)

        return { lat, lon }

      })
      .then(coordinates => {
        var lat = coordinates.lat;
        var lon = coordinates.lon;
        var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`

        $.ajax({
          url: queryURL,
          method: 'GET'
        })
          .then(fiveDayForecast => {
            console.log('5Day-->', fiveDayForecast)
            // set the day after temp var to main.temp
            var dayAfterTemp = fiveDayForecast.list[0].main.temp
            // convert temp from kelvin to fahrenheight
            var dayAfterTempF = (dayAfterTemp - 273.15) * 1.80 + 32
            // select the id to append dayAfterTempF
            $('#day-after-temp').text(dayAfterTempF)
            console.log(dayAfterTempF)
            // set the dayAfter Humidity
            var dayAfterhumidity = fiveDayForecast.list[0].main.humidity
            $('#day-after-hum').append(dayAfterhumidity)
            console.log(dayAfterhumidity)

            // SECOND CARD DATA
            var day2Temp = fiveDayForecast.list[1].main.temp
            //console.log('We ARE HERE!!!!' + day2Temp)
            // convert temp from kelvin to fahrenheight
            var day2TempF = (day2Temp - 273.15) * 1.80 + 32
            // select the id that day2Temp text should go
            $('#day-two-temp').text(day2TempF)
            console.log('WE ARE HERE!!!!!!!!!' + day2TempF)
            // set the dayAfter Humidity
            var day2humidity = fiveDayForecast.list[1].main.humidity
            $('#day-two-hum').append(day2humidity)
            console.log(dayAfterhumidity)
            // THIS IS WHERE I AM CURRENTLY STOPPED!!!!
            // THIRD CARD DATA

            var day3Temp = fiveDayForecast.list[2].main.temp
            // //console.log('We ARE HERE!!!!' + day2Temp)
            // convert temp from kelvin to fahrenheight
            var day3TempF = (day3Temp - 273.15) * 1.80 + 32
            // select the id that day2Temp text should go
            $('#day-three-temp').text(day3TempF)
            // console.log('WE ARE HERE!!!!!!!!!' + day2TempF)
            // set the day3 Humidity
            var day3humidity = fiveDayForecast.list[2].main.humidity
            $('#day-three-hum').append(day3humidity)
            console.log('WE ARE AT THE END OF CARD 3')

          })
          .catch(err => console.log(err))

      })
      .catch(err => console.log(err))
    // give the button a style class 
    textInputBtn.addClass('.input-button')
    // give each button an attr
    textInputBtn.attr('class', 'input-text')
    console.log('t4estInput after adding class --> ', textInputBtn)
    // declare its value and append it to input-list/ Append textInputBtn to the Dom  
    textInputBtn.text(findCity)
    $('#input-list').append(textInputBtn)
    console.log('end of function')

  }
})