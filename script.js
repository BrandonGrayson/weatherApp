$(document).ready(function () {
    // grab the necessary tools to use ajax and weather api
    // create a var to store the queryURL
    // var for api key to weather app
    var APIKey = "a8bfa6adc6cea260ba1bbbb01147a568"
    
    
    $('#search-city').on('click', searchForCity)
    
    // FUNCTION FOR WHEN SEARCH BUTTON IS PRESSED
    function searchForCity () {
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
                var queryURL =  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`

                $.ajax({
                    url: queryURL,
                    method: 'GET'
                })
                .then(fiveDayForecast => console.log('5Day-->', fiveDayForecast))
                .catch(err => console.log(err))

            })
          .catch(err => console.log(err))     
        // give the button a style class 
        textInputBtn.addClass('.input-button')
        // give each button an attr
        textInputBtn.attr('class','input-text')
        console.log('t4estInput after adding class --> ', textInputBtn)
        // declare its value and append it to input-list/ Append textInputBtn to the Dom  
        textInputBtn.text(findCity)
        $('#input-list').append(textInputBtn)     
        console.log('end of function')

    }




})