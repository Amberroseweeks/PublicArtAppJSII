let artArray = [];

function getArt (){
    for (let i=1; i<1100;i++){
        $.ajax({
            url: "http://www.philart.net/api/art/" + i + ".json",
            success: function(art) {
                console.log(art.body.location)
                artArray.push(art)
            }
        })
        console.log(artArray.body.location)
    }
    
}

getArt()

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



