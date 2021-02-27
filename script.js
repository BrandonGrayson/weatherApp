console.log(moment())
$(document).ready(function () {

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

  function loadSearchHistory() {
    var searchHistory = JSON.parse(window.localStorage.getItem('history')) || [];
    var inputList = $('#input-list')
    for (i = 0; i < searchHistory.length; i++) {
      // create a button for each element in search history
      var cityName = searchHistory[i]
      var newLi = $('<li>')
      var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
      newLi.attr('class', 'input-text')
      newLi.text(cityName) 
      newLi.on('click', function (event) {
        console.log(event)
        let btnClicked = event.target.firstChild.data
        let queryURL2 = `https://api.openweathermap.org/data/2.5/weather?q=${btnClicked}&appid=${APIKey}`
        //event.stopPropagation()
        //event.stopImmediatePropagation()
        $.ajax({
          url: queryURL2,
          method: 'GET'
        }).then(response => {
          forecast(response)
  
        })
        
      })
      inputList.append(newLi)    
    }
     
  }

  function forecast (response) {
    let today = moment().format('dddd, MMMM Do YYYY')
        $('#current-date').text(today)
        console.log(`Should be todays date----> ${today.toString()}`);
        // ==================================================================================================
        //FILL IN ALL CURRENT WEATHER HTML
        var name = response.name
        // a var to store the result from getItem. 
        // get item will either return history 
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
  }

//this is the repetitive code
function fiveDayForecast (response) {
    console.log('5Day-->', fiveDayForecast)
    const list = response.list

    const days = [list[8], list[16], list[24], list[32], list[40]]

    
   
    function addDay(currentDay,index) {
      let dayDate = moment().add(index+1, 'days').format('dddd, MMMM Do YYYY')
      console.log(`This is where TOMORROWS date -----> ${dayDate}`)
      $(`#day-${index + 1}-date`).text(dayDate)
      // date info=================================
      var dayTemp = currentDay.main.temp
      // //console.log('We ARE HERE!!!!' + day5Temp)
      // convert temp from kelvin to fahrenheight
      var dayTempF = Math.floor((dayTemp - 273.15) * 1.80 + 32)
      // select the id that day4Temp text should go
      $(`#day-${index+1}-temp`).text(dayTempF)
      // // console.log('WE ARE HERE!!!!!!!!!' + day5TempF)
      // set the day3 Humidity
      var dayHumidity = currentDay.main.humidity
      console.log(`DAY HUMIDITY HERE ----> ${dayHumidity}`)
      $(`#day-${index +1 }-hum`).append(dayHumidity)
      // // console.log('WE ARE AT THE END OF CARD 3')
    }


      days.forEach((day, index) => {
        addDay(day,index)
      })
  }


// functions ================================================================



  // grab the necessary tools to use ajax and weather api
  // create a var to store the queryURL

  // SET UP LOCAL STORAGE!!!
  // 1. Create global array to store each city user is searching data for
  // 2. Once you have an array push each city user is searching into that array(this will be within click event of submit button where you're getting user input)
  // 3. Once you pushed into an array within same click event write localStorage.setItem to set that array into localStorage(make sure to JSON.stringify for an array you're setting up)
  // 4. And then you can retrieve array data back using localstorage.getItem

  // var for api key to weather app
  $('#search-city').on('click', searchForCity)
  $('.input-text').on('click', function (event) {
    console.log(event)
    console.log('btn clicked')
    var btnCity = $('.input-text').text()
    console.log(`This is where the btn clicked text should be ---> ${btnCity}`)
  })
  // FUNCTION FOR WHEN SEARCH BUTTON IS PRESSED

  //two functions
    //on that searchesForCity(name)
    //oging to add info for the current weather and the 5 day

  function searchForCity() {
    clearHistory()
    console.log('button was clicked')
    // create a button variable 
    var textInputBtn = $('<button>')
    // create a var findCity access the textContent of the inputField/previous sibling element
    var findCity = $(this).siblings('#inputField').val()
    // input the url to query insert findCity
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${findCity}&appid=${APIKey}`

    var testSearch = searchCity('miami') // this should be the VALUE INSIDE findCity

    console.log('TEST SEARCH-->', testSearch)

    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .then(response => {
        const {lat, lon} = response.coord;
        forecast(response)
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
          .then(response => {
            console.log('calling5dayforecast function')
            fiveDayForecast(response)
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

  
  // =============================================================================== culry ^^^
  function clearHistory () {
    let clearme = '';
    $('#day-after-hum').text(clearme)
    $('#day-two-hum').text(clearme)
    $('#day-three-hum').text(clearme)
    $('#day-four-hum').text(clearme)
    $('#day-five-hum').text(clearme)
    console.log(`THIS IS THE DAY AFTER HUMIDITY DATA!!!! ----> ${clearme}`)
    // $('#day-after-hum').text() = "";
    // clearme.text() = "";
  }

  loadSearchHistory()


})

