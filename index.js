let artArray = [];
let map;
let googleMarkers = [];
let categoryMarkers;
let infoWindow;
let markerLink;
let marker;
let buttonType = document.getElementsByClassName('category-button')
let activeButton = document.getElementsByClassName('category-button-active')

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
    map = new google.maps.Map(document.getElementById('map'),options);
}
 
  
// when clicking category button this changes the color & creates the category array
function clickCategory () {
   let listContainer = document.getElementById('listContainer') //container for all the list results 
    for (let k=0; k<buttonType.length; k++){
        buttonType[k].addEventListener("click", function () {
            clearMarkers(); //clears current markers 
            googleMarkers = [];

            listContainer.innerHTML = ""; //clears the previous list results on click
            categoryMarkers = []; //clears array on each click allowing list view to change
            let exhibitName = event.target.innerText //get the text of the clicked button

//loops through all button types and find the button that was clicked, makes it the active button, it also remove active button class from all 
//buttons that were not clicked.
    for (let l =0; l < buttonType.length; l++) {
        if (buttonType[l].innerText === exhibitName) {
            buttonType[l].classList.add("category-button-active") // if the button text matches the clicked button, turn red
        }
        else if (buttonType[l].innerText !== exhibitName) {
            buttonType[l].classList.remove("category-button-active") //if the button text does not match the clicked button remove the red (turn grey)
            }
        }

//loops through the art array looking for pieces of art in the category that was clicked and adds the to the map
        for (let i=0;i<artArray.length; i++) {
            if (artArray[i].exhibits) {
                for (let j=0; j<artArray[i].exhibits.length; j++) {
                    if (artArray[i].exhibits[j].name === exhibitName){
                        categoryMarkers.push(artArray[i])
                    }
                }
            }
        }
        addMarker () //adds categoryArray markers to the map on click
        createResultsList()
        })//closes event listener   
    }                    
} // closes click category
clickCategory()

//add markers to map
function addMarker () {
    infoWindow = new google.maps.InfoWindow();
    for (let i=0; i<categoryMarkers.length; i++){
        let a = parseFloat(categoryMarkers[i].location.latitude);
        let b = parseFloat(categoryMarkers[i].location.longitude);
        let marker = new google.maps.Marker({
            position: {lat:a, lng:b}, 
            map: map//what map do we want to add it to?
            //icon: 'url for marker image we want to use' 
        });
        googleMarkers.push(marker);

      marker.addListener('click', function(){
        infoWindow.setOptions({
            //issue: if any of these are undefined the window wont open at all
            content:
            "<div style='float:left'> <img style='height: 100px' src='" + 
            categoryMarkers[i].pictures[0].large.url + 
            "'/> </div><div style='float:right; padding: 10px;'><b>" 
            + categoryMarkers[i].title.display + "</b><br/>" 
            + categoryMarkers[i].artists[0].name
          });

        infoWindow.open(map, marker);
      });

    }
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (let i = 0; i < googleMarkers.length; i++) {
        googleMarkers[i].setMap(map);
    }
  }
  
  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

//creates results list
function createResultsList (){
    for (let i=0; i<categoryMarkers.length; i++) {
        let artCard = document.createElement('div')
            artCard.classList.add('artCard')
            artCard.classList.add('col-md-4')
            artCard.classList.add('description-container')
            artCard.classList.add('image-container-photos')
            artCard.classList.add('text')
            listContainer.appendChild(artCard)
        
//opens info window on map for marker clicked
        markerLink = document.createElement('div') 
        markerLink.innerHTML = "<center><i class='fas fa-map-marker-alt'></i></center>"
        markerLink.setAttribute("class", "map-marker-bg")
        artCard.appendChild(markerLink);

// click marker link and it will scroll up to map and show info window
        markerLink.addEventListener("click", function(){
            window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#map";
            infoWindow.setOptions({
                content:
                '<div id="infoWindow">' +
                "Title:" + categoryMarkers[i].title.display + 
                '<br>' +
                '<img src="' + categoryMarkers[i].pictures[0].large.url + '"">' +
                '</div>'
              });
                 infoWindow.open(map,googleMarkers[i])
        })

        let artImage = document.createElement('div')
            artImage.style.width = '250px';
            artImage.style.height = '300px';
            artCard.appendChild(artImage)
            artImage.style.backgroundSize = "100% 100%";
            artImage.setAttribute("class", "image-container-photos")
            artImage.style.backgroundImage = "url('" + categoryMarkers[i].pictures[0].large.url +"')"

         artTitle = document.createElement('div')
            artTitle.classList.add('artTitle')
            artTitle.innerHTML = categoryMarkers[i].title.display
            artTitle.setAttribute("class", "Artist-Title-h1")
            artCard.appendChild(artTitle)
        
         artYear = document.createElement('SPAN')
            artYear.classList.add('artYear')
            artYear.setAttribute("class", "Artist-Date-h1")
            if (!("years" in categoryMarkers[i])) {
                artYear.innerHTML = ""
            }

            else {
                artYear.innerHTML = " (" + categoryMarkers[i].years[0].year + ")"
            }
            artTitle.appendChild(artYear)

         artist = document.createElement('div')
            artist.classList.add('artist')
            artist.setAttribute("class", "Artist-Date-h1")
            if (!("artists" in categoryMarkers[i])) {
                artist.innerHTML = "Artist: Unknown"
            }
            else if (categoryMarkers[i].artists.length > 1) {
                artist.innerHTML = "Artist: " + categoryMarkers[i].artists[0].name + " and others"
            }

            else if (categoryMarkers[i].artists.length = 1) {
                artist.innerHTML = "Artist: " + categoryMarkers[i].artists[0].name
            }
            artCard.appendChild(artist)

        let artLocation = document.createElement('div')
            artLocation.classList.add('artLocation')
            artLocation.setAttribute("class", "Artist-Date-h1")

            if (!("description" in categoryMarkers[i].location)) {
                artLocation.innerHTML = "Location: Unknown"
            }

            else {
                artLocation.innerHTML = "Location: " + categoryMarkers[i].location.description
            }
            artCard.appendChild(artLocation)
    }
}


// fullscreen button - just a test
// function fullScreen (){
//     let test= document.getElementById('testButton')
//     test.addEventListener('click', function(){
//         let mapPlaceholder = document.getElementById("map-placeholder")

//         if (mapPlaceholder.style.height = "350px") {
//             mapPlaceholder.style.height = "80vh"
//         }

//         else {
//             mapPlaceholder.style.height = "350px"
//         }
        
//     })
// }
// fullScreen()

