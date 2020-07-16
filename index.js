let artArray = [];

function getArt (){
    for (let i=1; i<1089;i++){
        $.ajax({
            url: "http://www.philart.net/api/art/" + i + ".json",
            success: function(art) {
                // console.log(art)
                //console.log(art.body[i].location)
                artArray.push(art)
             //   console.log(artArray.body.location)
             //   console.log(art.body.location)
             console.log(artArray)
            }
                
            })
    }
    
}
getArt()

   // console.log(artArray)
    //console.log(artArray[99].body.location)  // Trying to target location to get longitude and latitude but this is not working, tried parsing the data but it doesn't work.. it is a JSON doc but it doesn't look like console.log(art) returns a JSON object?
   
function initMap() {
    // The location of Uluru
    let a = 39.5434;
    let b = 39.9965;
    var uluru = {lat: a, lng: b};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }

  /////////////////


function initMap(data) {
    // The location of Uluru
    // let a = data.body.location.latitude;
    // let b = data.body.location.longitude;
    var uluru = {lat: 17.5, lng: 28.9};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
  }



