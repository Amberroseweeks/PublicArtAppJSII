let artArray = [];
let map;
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

//add markers 
function addMarker (artArray) {
        let a = parseFloat(artArray.location.latitude);
        let b = parseFloat(artArray.location.longitude);
        marker = new google.maps.Marker({
            position: {lat:a, lng:b},
            map: map//what map do we want to add it to?
            //icon: 'url for marker image we want to use'
        });
        let infoWindow = new google.maps.InfoWindow({
            content:
            "Title:" + artArray.title.display + 
            '<br>' +
            '<img src="' + artArray.pictures[0].large.url + '"">'
          });
          
          google.maps.event.addListener(marker, 'click', function(){
            infoWindow.open(map, marker);
          });
}

// function that creates info windows based on markers clicked from the list
function addMarkerSelection (categoryMarkers) {    
        selectedmarker = new google.maps.Marker({
        position: {lat:markerLinklat, lng:markerLinklong},
        map: map//what map do we want to add it to?
        //icon: 'url for marker image we want to use'
        });
            
        selectinfoWindow = new google.maps.InfoWindow({
        content:
        "Title:" + selectedArtTitle + " " + "image:" +'<br><img src="'+selectedArtImage+'" style="width:250px;">',      
        });     
}
    
function clickCategory () {
    
    for (let k=0; k<buttonType.length; k++){
        buttonType[k].addEventListener("click", function () {
            let listContainer = document.getElementById('listContainer') //container for all the list results
            listContainer.innerHTML = ""; //clears the previous list results on click
            let categoryMarkers = [];
            let exhibitName = event.target.innerText

//loops through all button types and find the button that was clicked, makes it the active button, it also remove active button class from all 
//buttons that were not clicked.

        for (let l =0; l < buttonType.length; l++) {
        if (buttonType[l].innerText === exhibitName) {
            buttonType[l].classList.add("category-button-active")
        }

        else if (buttonType[l].innerText !== exhibitName) {
            buttonType[l].classList.remove("category-button-active")
            }
        }

//loops through the art array looking for pieces of art in the category that was clicked and adds the to the map
        for (let i=0;i<artArray.length; i++) {
                        if (artArray[i].exhibits) {
                            for (let j=0; j<artArray[i].exhibits.length; j++) {
                                if (artArray[i].exhibits[j].name === exhibitName){
                                categoryMarkers.push(artArray[i])
            
                                    for (let i=0; i<categoryMarkers.length; i++){ 
                                    addMarker(categoryMarkers[i])
                                    } 
                                }
                            }
                        }        
            }

    for (let i=0; i<categoryMarkers.length; i++) {
        let artCard = document.createElement('div')
            artCard.classList.add('artCard')
            artCard.classList.add('col-md-4')
            artCard.classList.add('description-container')
            artCard.classList.add('image-container-photos')
            artCard.classList.add('text')
            listContainer.appendChild(artCard)
        
//opens info window on map for marker clicked
        let markerLink = document.createElement('div') 
        markerLink.innerHTML = "<center><i class='fas fa-map-marker-alt'></i></center>"
        markerLink.setAttribute("class", "map-marker-bg")
        artCard.appendChild(markerLink);
        
//this function takes user to the map and opens a new window in the artwork location
        markerLink.addEventListener("click", function(map){
        markerLinklat = parseFloat(categoryMarkers[i].location.latitude);
        markerLinklong = parseFloat(categoryMarkers[i].location.longitude);
        selectedArtTitle = categoryMarkers[i].title.display
        selectedArtImage = categoryMarkers[i].pictures[0].large.url
        window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#map";
        addMarkerSelection (categoryMarkers);
        selectinfoWindow.open(map, selectedmarker);
        })
 
        let artImage = document.createElement('div')
            artImage.style.width = '250px';
            artImage.style.height = '300px';
            artCard.appendChild(artImage)
            artImage.style.backgroundSize = "100% 100%";
            artImage.setAttribute("class", "image-container-photos")
            artImage.style.backgroundImage = "url('" + categoryMarkers[i].pictures[0].large.url +"')"

        let artTitle = document.createElement('div')
            artTitle.classList.add('artTitle')
            artTitle.innerHTML = categoryMarkers[i].title.display
            artTitle.setAttribute("class", "Artist-Title-h1")
            artCard.appendChild(artTitle)
        
        let artYear = document.createElement('SPAN')
            artYear.classList.add('artYear')
            artYear.setAttribute("class", "Artist-Date-h1")
            if (!("years" in categoryMarkers[i])) {
                artYear.innerHTML = ""
            }

            else {
                artYear.innerHTML = " (" + categoryMarkers[i].years[0].year + ")"
            }
            artTitle.appendChild(artYear)

        let artist = document.createElement('div')
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

    })//closes event listener
    
    }

} // closes click category
clickCategory()



