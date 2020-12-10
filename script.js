var APIKey = "a8bfa6adc6cea260ba1bbbb01147a568"

  function searchCity(name) {

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${APIKey}`
    var cityInfo
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(response => {
        console.log('RESPPONSE_________________>', response)
        cityInfo = response
        return
      }).catch(error => console.log(error))
      return cityInfo
  }
$(document).ready(function () {
  // grab the necessary tools to use ajax and weather api
  // create a var to store the queryURL

  // SET UP LOCAL STORAGE!!!
  // 1. Create global array to store each city user is searching data for
  // 2. Once you have an array push each city user is searching into that array(this will be within click event of submit button where you're getting user input)
  // 3. Once you pushed into an array within same click event write localStorage.setItem to set that array into localStorage(make sure to JSON.stringify for an array you're setting up)
  // 4. And then you can retrieve array data back using localstorage.getItem

  // var for api key to weather app
  $('#search-city').on('click', searchForCity)

  // FUNCTION FOR WHEN SEARCH BUTTON IS PRESSED

  //two functions
    //on that searchesForCity(name)
    //oging to add info for the current weather and the 5 day

  function searchForCity() {
    console.log('button was clicked')
    // create a button variable 
    var textInputBtn = $('<button>')
    // create a var findCity access the textContent of the inputField/previous sibling element
    var findCity = $(this).siblings('#inputField').val()
    // input the url to query insert findCity
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${findCity}&appid=${APIKey}`

    var testSearch = searchCity('miami')

    console.log('TEST SEARCH-->', testSearch)

    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .then(response => {
        //CURRENT WEATHER API CALL
        //FILL IN ALL CURRENT WEATHER HTML
        var name = response.name
        var searchHistory = JSON.parse(localStorage.getItem('history')) || []
        searchHistory.push(name)
        localStorage.setItem('history', JSON.stringify(searchHistory))
        $('#name').text(name)
        //grab lat and lon variables
        const lat = response.coord.lat;
        const lon = response.coord.lon;
        // save the response temp to a var
        var temp = response.main.temp;
        // convert temp to fahrenheight
        var tempF = Math.floor((temp - 273.15) * 1.80 + 32)
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
            var dayAfterTempF = Math.floor((dayAfterTemp - 273.15) * 1.80 + 32)
            // select the id to append dayAfterTempF
            $('#day-after-temp').text(dayAfterTempF)
            console.log(dayAfterTempF)
            // set the dayAfter Humidity
            var dayAfterhumidity = fiveDayForecast.list[0].main.humidity
            $('#day-after-hum').append(dayAfterhumidity)
            console.log(dayAfterhumidity)

            // CARD 2 ================================================
            // SECOND CARD DATA
            var day2Temp = fiveDayForecast.list[1].main.temp
            //console.log('We ARE HERE!!!!' + day2Temp)
            // convert temp from kelvin to fahrenheight
            var day2TempF = Math.floor((day2Temp - 273.15) * 1.80 + 32)
            // select the id that day2Temp text should go
            $('#day-two-temp').text(day2TempF)
            console.log('WE ARE HERE!!!!!!!!!' + day2TempF)
            // set the dayAfter Humidity
            var day2humidity = fiveDayForecast.list[1].main.humidity
            $('#day-two-hum').append(day2humidity)
            console.log(dayAfterhumidity)
            // THIS IS WHERE I AM CURRENTLY STOPPED!!!!
            // THIRD CARD DATA
            // CARD 3 ================================================
            var day3Temp = fiveDayForecast.list[2].main.temp
            // //console.log('We ARE HERE!!!!' + day3Temp)
            // convert temp from kelvin to fahrenheight
            var day3TempF = Math.floor((day3Temp - 273.15) * 1.80 + 32)
            // select the id that day2Temp text should go
            $('#day-three-temp').text(day3TempF)
            // console.log('WE ARE HERE!!!!!!!!!' + day3TempF)
            // set the day3 Humidity
            var day3humidity = fiveDayForecast.list[2].main.humidity
            $('#day-three-hum').append(day3humidity)
            console.log('WE ARE AT THE END OF CARD 3')

            // CARD 4 ================================

            var day4Temp = fiveDayForecast.list[3].main.temp
            //console.log('We ARE HERE!!!!' + day4Temp)
            // convert temp from kelvin to fahrenheight
            var day4TempF = Math.floor((day4Temp - 273.15) * 1.80 + 32)
            // // select the id that day4Temp text should go
            $('#day-four-temp').text(day4TempF)
            // console.log('WE ARE HERE!!!!!!!!!' + day4TempF)
            // // set the day3 Humidity
            var day4humidity = fiveDayForecast.list[3].main.humidity
            $('#day-four-hum').append(day4humidity)
            // console.log('WE ARE AT THE END OF CARD 3')

            // CARD 5 =================================
            var day5Temp = fiveDayForecast.list[4].main.temp
            // //console.log('We ARE HERE!!!!' + day5Temp)
            // convert temp from kelvin to fahrenheight
            var day5TempF = Math.floor((day5Temp - 273.15) * 1.80 + 32)
            // select the id that day4Temp text should go
            $('#day-five-temp').text(day5TempF)
            // // console.log('WE ARE HERE!!!!!!!!!' + day5TempF)
            // set the day3 Humidity
            var day5humidity = fiveDayForecast.list[4].main.humidity
            $('#day-five-hum').append(day5humidity)
            // // console.log('WE ARE AT THE END OF CARD 3')
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

    // on click event for input-button class


  }
  //$('.input-button').on('click', searchForCity)
  // console.log('INPUT BUTTON CLASS CLICKED')

  function loadSearchHistory() {
    var searchHistory = JSON.parse(window.localStorage.getItem('history')) || [];
    var inputList = $('#input-list')
    for (i = 0; i < searchHistory.length; i++) {
      var cityName = searchHistory[i]
      var newLi = $('<li>')
      var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${newLi}&appid=${APIKey}`
      newLi.attr('class', 'input-text')
      newLi.text(cityName)
  
      newLi.on('click', function(){
        // extract code needed to pass in a argument to searchForCity function
        $.ajax({
          url: queryURL,
          method: 'GET'
        }).then(res=> {
          console.log('HEY LOOK AT THIS RESPONSE' + res)
        })
        // access this button that was clicked 
        // call function
        // need a function that takes in a name of a city. Access the queryURL / 
      })
      inputList.append(newLi)    
    }  
  }
  loadSearchHistory()
})

