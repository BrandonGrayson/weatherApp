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
        // create a var userText access the textContent of the inputField/previous sibling element
        var findCity = $(this).siblings('#inputField').val()
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${findCity}&appid=${APIKey}`
        
        $.ajax({
           url: queryURL,
           method: 'GET'
          })
          .then(response => {
                const temp = 'Temperature: ' + response.main.temp;
                $('#current-temp').text(temp)

              console.log(response)
            })
          .catch(err => console.log(err))



        
        // give the button a style class 
        textInputBtn.addClass('input-button')
        // give each button an attr
        textInputBtn.attr('class','input-text')
        console.log('t4estInput after adding class --> ', textInputBtn)
        // declare its value and append it to input-list/ Append textInputBtn to the Dom  
        textInputBtn.text(findCity)
        $('#input-list').append(textInputBtn)     
        console.log('end of function')
    }




})