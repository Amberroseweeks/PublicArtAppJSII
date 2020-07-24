let artArray = [];

window.addEventListener('load', initMap) 

function getartData (){
    $.ajax({
        url: "https://raw.githubusercontent.com/Amberroseweeks/PublicArtAppJSII/emily/phlPublicArt.json",
        success: function(artDataUnparsed) {
           let artData = JSON.parse(artDataUnparsed)
             for(let i=0;i<artData.length; i++) {
                  artArray.push(artData[i])
              }
        }
            
     })
 }
 getartData()

function initMap() {
    //map options
    let options = {
        zoom: 13,
        center: {lat:39.9526, lng: -75.1652}, //map is centered around PHL
    }
    
    // new map
    let map = new google.maps.Map(document.getElementById('map'),options);
     
    
    function addMarker (artArray) {
     //   console.log(artArray)
        let a = parseFloat(artArray.location.latitude);
        let b = parseFloat(artArray.location.longitude);
    
        let marker = new google.maps.Marker({
            position: {lat:a, lng:b},
            map: map//what map do we want to add it to?
            //icon: 'url for marker image we want to use'
        });

        let infoWindow = new google.maps.InfoWindow({
            content:
            "Title:" + artArray.title.display 
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
    }

    //artArray()
    
    //adds markers for everything in array
    // for (let i=0;i<artArray.length; i++) {
    //                 addMarker(artArray[i])
    // }




// adds markers for medical only //need to make it so the 0 represents the button that was clicked
let buttonType = document.getElementsByClassName('category-button')

for (let k=0; k<buttonType.length; k++){
buttonType[k].addEventListener("click", function () {
let exhibitName = event.target.innerText

    for (let i=0;i<artArray.length; i++) {
        if (artArray[i].exhibits) {
            for (let j=0; j<artArray[i].exhibits.length; j++) {
                if (artArray[i].exhibits[j].name === exhibitName){
                    addMarker(artArray[i]) 
                }
            }
        }
        
    }
})
}




}// closes initMap
        
        
    




