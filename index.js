let artArray = [];

//    let viewOptions = document.getElementById("viewOptions");
//    viewOptions.style.display = "none";


window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


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
    
let buttonType = document.getElementsByClassName('category-button')
let activeButton = document.getElementsByClassName('category-button-active')


    //map options
    let options = {
        zoom: 13,
        center: {lat:39.9526, lng: -75.1652}, //map is centered around PHL
    }
    
    // new map
    let map = new google.maps.Map(document.getElementById('map'),options);
     
   //add markers 
    
    function addMarker (artArray) {
        var image = artArray.pictures[0].large.url
        let a = parseFloat(artArray.location.latitude);
        let b = parseFloat(artArray.location.longitude);
    
        let marker = new google.maps.Marker({
            position: {lat:a, lng:b},
            map: map,//what map do we want to add it to?
            //icon: 'url for marker image we want to use'
            //image for map marker
            html: '<image width="80px" height="80px" style="background-image: url(' + artArray.pictures[0].large.url + ')"></image>',
        });

        let infoWindow = new google.maps.InfoWindow({
            content:
            "Title:" + artArray.title.display + " " + "image:" + '<br><img src="'+artArray.pictures[0].large.url+'" style="width:250px;" style="height: 350px;">',
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });

    }
    

    //create new infowindow function for selected artwork
    function addMarkerSelection (categoryMarkers) {
            
            selectedmarker = new google.maps.Marker({
            position: {lat:markerLinklat, lng:markerLinklong},
            map: map//what map do we want to add it to?
            //icon: 'url for marker image we want to use'
        });
            
            selectinfoWindow = new google.maps.InfoWindow({
            content:
            "Title:" + selectedArtTitle + " " + "image:" +'<br><img src="'+selectedArtImage+'" style="width:250px;" style="height: 350px;">',
                
          });
            
    }
    
    
function clickCategory () {
    
    

    
    
    for (let k=0; k<buttonType.length; k++){
        
    buttonType[k].addEventListener("click", function () {
        
            let viewOptions = document.getElementById("viewOptions");
    viewOptions.style.display = "block"
    if(viewOptions.className ="hidden"){
        viewOptions.className ="show";
    }
        
        //toggle the active button and content-this is still buggy
        if(this.className ="category-button") {
            this.className ="category-button-active";
            for (let l = 0; l<activeButton.length; l++ ){
                activeButton[l].addEventListener("click", function(){
                    if(this.className ="category-button-active") {
                    this.className ="category-button";
                    } 
                    else if (this.className="category-button"){
                    this.className ="category-button-active"
                    console.log(this.className)
                    }
                })
            } 
        }
        

   let listContainer = document.getElementById('listContainer') 
   //container for all the list results
   listContainer.innerHTML = ""; 
    //clears the previous list results on click
    listContainer.style.display = "inline-block"
        
    let listContainertwo = document.getElementById('listContainertwo') 
   //container for all the list results
   listContainertwo.innerHTML = ""; 
    //clears the previous list results on click
    listContainertwo.style.display = "inline-block"
    let categoryMarkers = [];
    let exhibitName = event.target.innerText
    
    function catMapMarkers(){
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
    }
        

        if (this.className === "category-button-active"){
            console.log(this.className)
            console.log(event)   
            catMapMarkers()
        }else {
            removeMapMarkers()
        }
        //show more function
        let showAllArtLink = document.getElementById("showmore");
        showAllArtLink.onclick = function(){
        console.log("this click function is now working")
             
        }
        
    for (let i=0; i<categoryMarkers.length; i++) {
         

            let artCard = document.createElement('div')
        
            artCard.classList.add('artCard')
            artCard.classList.add('col-md-4')
            artCard.classList.add('description-container')
            artCard.classList.add('image-container-photos')
            artCard.classList.add('text')
        
            listContainer.appendChild(artCard)
        
        //testing js media querie
        //want to make this more responsive using a two column layout
//        function myFunction(x) {
//  if (x.matches) { // If media query matches
//    document.body.style.backgroundColor = "yellow";
//  } else {
//   document.body.style.backgroundColor = "pink";
//  }
//}
//
//var x = window.matchMedia("(max-width: 700px)")
//myFunction(x) // Call listener function at run time
//x.addListener(myFunction) // Attach listener function on state changes
        
        
        //end
            
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
        console.log(selectedArtImage)
        window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#map";
        addMarkerSelection (categoryMarkers);
        selectinfoWindow.open(map, selectedmarker);    

        })
            
        let artImage = document.createElement('div')
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
                artYear.innerHTML = "Year: Unknown"
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
               
        
        
        if (i === 6){
                break;
            }

        
    }
        
        
        //another forloop for the list view
        let listviewoption = document.getElementById("listview"); 
        let gridviewoption = document.getElementById("gridview");
        
        gridviewoption.onclick = function() {
            document.getElementById("listContainertwo").style.display ="none";
            document.getElementById("listContainer").style.display ="block";
        }
        

                
        //I see the issue with the function below now...I should not have added the click function within the for loop actually. I will need to seperate this later
        
        listviewoption.onclick = function(artCard) {
            
        document.getElementById("listContainer").style.display ="none";
            
        for (let j = 0; j < categoryMarkers.length; j++) {
        console.log(categoryMarkers[j])
        //list view button function

        let artListViewContainer = document.createElement('div')
        //create style and size for list item
//        artListViewContainer.style.width = "100%";
        artListViewContainer.style.height = "120px";
        artListViewContainer.style.backgroundColor = "#f2f2f2";

        artListViewContainer.classList.add('text')
        artListViewContainer.classList.add('row')
        artListViewContainer.classList.add('listviewcontainer')
            
        //add marker
        let markerLinklist = document.createElement('div') 

        markerLinklist.innerHTML = "<center><i class='fas fa-map-marker-alt'></i></center>"
        markerLinklist.setAttribute("class", "map-marker-bg-list")
        markerLinklist.classList.add('row')
        artListViewContainer.appendChild(markerLinklist);
            
            
        //link marker to map
        
        //this function takes user to the map and opens a new window in the artwork location
        
        markerLinklist.addEventListener("click", function(map){
        markerLinklat = parseFloat(categoryMarkers[j].location.latitude);
        markerLinklong = parseFloat(categoryMarkers[j].location.longitude);
        selectedArtTitle = categoryMarkers[j].title.display
        selectedArtImage = categoryMarkers[j].pictures[0].large.url
        console.log(selectedArtImage)
        window.location = (""+window.location).replace(/#[A-Za-z0-9_]*$/,'')+"#map";
        addMarkerSelection (categoryMarkers);
        selectinfoWindow.open(map, selectedmarker);    

        })

        //add pic
        let artImageList = document.createElement('div')
            artImageList.style.backgroundSize = "100% 100%";
            artImageList.setAttribute("class", "image-container-list")
            artImageList.style.backgroundImage = "url('" + categoryMarkers[j].pictures[0].large.url +"')"
            artListViewContainer.appendChild(artImageList)
            artImageList.classList.add('col')
            
        //add content
        let artListTitle = document.createElement('SPAN')
            artListTitle.innerHTML = categoryMarkers[j].title.display
            artListTitle.setAttribute("class", "Artist-Title-h1-list");
          artListTitle.style.flexWrap = "wrap";
            artListTitle.style.ccFloat = "right";
            artListViewContainer.appendChild(artListTitle)
            artListTitle.classList.add('col')
            
            //art year
            let artYearlist = document.createElement('SPAN')
            artYearlist.classList.add('artYear')
            artYearlist.setAttribute("class", "Artist-Date-h1-list")
            if (!("years" in categoryMarkers[j])) {
                artYearlist.innerHTML = "Year: Unknown"
            }

            else {
                artYearlist.innerHTML = " (" + categoryMarkers[j].years[0].year + ")"
            }
        artListTitle.appendChild(artYearlist)

        let artistListview = document.createElement('div')
            artistListview.classList.add('artist')
            artistListview.setAttribute("class", "Artist-Date-h1-list")
            if (!("artists" in categoryMarkers[j])) {
                artistListview.innerHTML = "Artist: Unknown"
            }
            else if (categoryMarkers[j].artists.length > 1) {
                artistListview.innerHTML = "Artist: " + categoryMarkers[j].artists[0].name + " and others"
            }

            else if (categoryMarkers[j].artists.length = 1) {
                artistListview.innerHTML = "Artist: " + categoryMarkers[j].artists[0].name
            }
            artListViewContainer.appendChild(artistListview)


        let artLocationListview = document.createElement('div')
            artLocationListview.classList.add('artLocation')
            artLocationListview.setAttribute("class", "Artist-Date-h1-list")

            if (!("description" in categoryMarkers[j].location)) {
                artLocationListview.innerHTML = "Location: Unknown"
            }

            else {
                artLocationListview.innerHTML = "Location: " + categoryMarkers[j].location.description
            }

            artListViewContainer.appendChild(artLocationListview)
        
            //replace grid with list
//            artListViewContainer.style.display = artListViewContainer;
        
            listContainertwo.appendChild(artListViewContainer)
            
            //if more than 6 don't display
                if (j === 6){
                break;
            }
                    listviewoption.onclick = function() {
            document.getElementById("listContainertwo").style.display ="block";
            document.getElementById("listContainer").style.display ="none";
        }
        }
    }
        //show more link
        var a = "View More"
//        var result = a.link("");
        a.href = "https://www.geeksforgeeks.org";
        document.getElementById("showmore").innerHTML = a;
        

    })
    
    }
    
    

        //show more link


}
clickCategory()
  
    
    

}// closes initMap




