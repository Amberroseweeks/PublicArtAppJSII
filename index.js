
function getArt (){
    for (let i=1; i<1089;i++){
        $.ajax({
            url: "http://www.philart.net/api/art/" + i + ".json",
            success: function(art) {
                //console.log(art)
                createArray(art)
            }
                
         })
    }
    
}
getArt()


let artArray = []
function createArray (art) {
    artArray.push(art)
}
console.log(artArray)
console.log(artArray[6].body.location) // why can't I target the location? I know this says JSON but it doesn't seems to return a string and I wasn't able to parse it

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



