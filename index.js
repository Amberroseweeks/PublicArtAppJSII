let artArray = [];
let map;
let googleMarkers = [];
let categoryMarkers;
let infoWindow;
let markerLink;
let marker;
let buttonType = document.getElementsByClassName('category-button')
let activeButton = document.getElementsByClassName('category-button-active')
let phl = {lat:39.9526, lng: -75.1652}

let paginationSection = document.getElementById("paginationSection")
let paginationPageNumbers = document.getElementById("showmore")
let paginationPageNumbersList = document.getElementById("showmorelist")
let listviewoption = document.getElementById("listview");





//creates sticky navbar on scroll
window.onscroll = function() {stickyNav()};
function stickyNav() {
  var navbar = document.getElementById("navbar");
  var sticky = navbar.offsetTop;  
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } 
  else {
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
    //map options
    let options = {
        zoom: 13,
        center: phl, //map is centered around PHL
    }

    // new map
    map = new google.maps.Map(document.getElementById('map'),options);
}
 

// when clicking category button this changes the color & creates the category array of markers 
function clickCategory () {
   let gridContainer = document.getElementById('gridContainer') //container for all the list results 
   let listContainer = document.getElementById('listContainer') //container for all the list results 
    for (let k=0; k<buttonType.length; k++){
        buttonType[k].addEventListener("click", function () {
        document.getElementById("showmorelist").innerHTML = "";
        document.getElementById("showmore").innerHTML = "";
            //if on list view switch back to grid view when clicking new category
            if (listContainer.style.display = "block") {
//                document.getElementById("showmorelist").innerHTML = "";
                listContainer.style.display = "none";
                gridContainer.style.display = "block";
            }
            let backToArt = document.getElementById('back-to-art')
            backToArt.style.display="block"
            clearMarkers(); //clears current markers 
            googleMarkers = [];
            map.panTo(phl); //re centers the map when a new category is clicked
            gridContainer.innerHTML = ""; //clears the previous list results on click
            listContainer.innerHTML = ""; //clears the previous list results on click

            
            categoryMarkers = []; //clears array on each click allowing list view to change
            let exhibitName = event.target.dataset.button //get the text of the clicked button
            

            //shows grid and list view when search results are displayed on the page
            let viewOptions = document.getElementById("viewOptions");
            viewOptions.style.display = "block"
            if(viewOptions.className ="hidden"){
                viewOptions.className ="show";
            }

//loops through all button types and find the button that was clicked, makes it the active button, it also remove active button class from all 
//buttons that were not clicked.
    for (let l =0; l < buttonType.length; l++) {
        if (buttonType[l].dataset.button === exhibitName) {
            buttonType[l].classList.add("category-button-active") // if the button text matches the clicked button, turn red
        }
        else if (buttonType[l].dataset.button !== exhibitName) {
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
//clear pagination div
            paginationPageNumbers.innerHTML = "";
            paginationPageNumbersList.innerHTML = "";  
            
////pagination
$(document).ready( function pagination() {
    //    document.getElementById("showmore").style.display = "block"
      $('.t1').after('<div id="nav" class="text-center"></div>');
      var rowsShown = 6;
      var rowsTotal = $('.col-md-4').length;
      var numPages = rowsTotal / rowsShown;
      for (i = 0; i < numPages; i++) {
        var pageNum = i +1;
          
        document.getElementById("showmore").innerHTML += '<span id="nav" class="text-center"><a href="#" class="btn-outline-info" rel="' + i + '">&emsp;' + pageNum + '&emsp;</a> </span>';
        
      }
      $('.col-md-4').hide();
      $('.col-md-4').slice(0, rowsShown).show();
      $('#nav a:first').addClass('active');
                            
      $('#nav a').bind('click', function(e) {
          e.preventDefault();
        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('.col-md-4').css('opacity', '0').hide().slice(startItem, endItem).
        css('display', 'block').animate({
          opacity: 1
        }, 300);
    
          
          
      });
                  
    });             
////end pagination

            
        addMarker () //adds categoryArray markers to the map on click
        createResultsGrid()
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
            "<div style='float:left'> <img style='height: 145px' src='" + 
            categoryMarkers[i].pictures[0].large.url + 
            "'/> </div><div style='float:right; padding: 10px;'><b>" 
            + categoryMarkers[i].title.display + "</b><br/>" +
            (categoryMarkers[i].artists ? categoryMarkers[i].artists[0].name : 'Artist: Unknown') +"</b><br/>"+
            (categoryMarkers[i].location ?  "Location: " + categoryMarkers[i].location.description : '')
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

//creates results grid - this is the default view
function createResultsGrid (){
    for (let i=0; i<categoryMarkers.length; i++) {
        let artCard = document.createElement('div')
            artCard.classList.add('artCard')
            artCard.classList.add('col-md-4')
            artCard.classList.add('description-container')
            artCard.classList.add('image-container-photos')
            artCard.classList.add('text')
            gridContainer.appendChild(artCard)
        
//opens info window on map for marker clicked
        markerLink = document.createElement('div') 
        markerLink.innerHTML = "<center><i class='fas fa-map-marker-alt'></i></center>"
        markerLink.setAttribute("class", "map-marker-bg")
        artCard.appendChild(markerLink);

// click marker link and it will scroll up to map and show info window
        markerLink.addEventListener("click", function(){
            let mapContainer = document.getElementById('map-placeholder')
            mapContainer.scrollIntoView({behavior:'smooth'})
            infoWindow.setOptions({
                content:
                "<div style='float:left'> <img style='height: 145px' src='" + 
                categoryMarkers[i].pictures[0].large.url + 
                "'/> </div><div style='float:right; padding: 10px;'><b>" 
                + categoryMarkers[i].title.display + "</b><br/>" +
                (categoryMarkers[i].artists ? categoryMarkers[i].artists[0].name : 'Artist:Unknown') +"</b><br/>"+
                (categoryMarkers[i].location ?  "Location: " + categoryMarkers[i].location.description : '')
              });
                 infoWindow.open(map,googleMarkers[i])
        })

        let artImage = document.createElement('div')
            artCard.appendChild(artImage)
            artImage.style.backgroundSize = "cover";
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
                artLocation.innerHTML = ""
            }

            else {
                artLocation.innerHTML = "Location: " + categoryMarkers[i].location.description
            }
            artCard.appendChild(artLocation)
    }
}


    listviewoption.addEventListener("click", function (){

        document.getElementById("listContainer").style.display ="block";
        document.getElementById("gridContainer").style.display ="none";

})


//when you click List View this is what happens
function createResultsList () {
    


        for (let j = 0; j < categoryMarkers.length; j++) {
            //list view button function
            let artListViewContainer = document.createElement('div')
            //create style and size for list item
    //        artListViewContainer.style.width = "100%";
            artListViewContainer.style.height = "120px";
            artListViewContainer.style.backgroundColor = "#f2f2f2";
    
            artListViewContainer.classList.add('text')
            artListViewContainer.classList.add('row')
            artListViewContainer.classList.add('listviewcontainer')
            artListViewContainer.classList.add('artlistview')
                
            //add marker
            let markerLinklist = document.createElement('div') 
            markerLinklist.innerHTML = "<center><i class='fas fa-map-marker-alt'></i></center>"
            markerLinklist.setAttribute("class", "map-marker-bg-list")
            markerLinklist.classList.add('row')
            artListViewContainer.appendChild(markerLinklist);
            
            //this function takes user to the map and opens a new window in the artwork location
            markerLinklist.addEventListener("click", function(){
                let mapContainer = document.getElementById('map-placeholder')
                mapContainer.scrollIntoView({behavior:'smooth'})
                infoWindow.setOptions({
                    content:
                "<div style='float:left'> <img style='height: 145px' src='" + 
                categoryMarkers[j].pictures[0].large.url + 
                "'/> </div><div style='float:right; padding: 10px;'><b>" 
                + categoryMarkers[j].title.display + "</b><br/>" 
                + categoryMarkers[j].artists[0].name
                  });
                     infoWindow.open(map,googleMarkers[j])
            })

            //add pic
            let artImageList = document.createElement('div')
                artImageList.style.backgroundSize = "cover";
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
                    artLocationListview.innerHTML = ""
                }
    
                else {
                    artLocationListview.innerHTML = "Location: " + categoryMarkers[j].location.description
                }
    
                artListViewContainer.appendChild(artLocationListview)

                listContainer.appendChild(artListViewContainer)
            
            
            
    }
        
        
        
        

}


function returnToGrid () {
    let gridviewoption = document.getElementById("gridview")
    gridviewoption.addEventListener("click", function () {

        document.getElementById("listContainer").style.display ="none";
        document.getElementById("gridContainer").style.display ="block";
        
        //clear pagination div
            paginationPageNumbers.innerHTML = "";
            paginationPageNumbersList.innerHTML = ""; 
        
        ////pagination
$(document).ready( function pagination() {
    //    document.getElementById("showmore").style.display = "block"
      $('.t1').after('<div id="nav" class="text-center"></div>');
      var rowsShown = 6;
      var rowsTotal = $('.col-md-4').length;
      var numPages = rowsTotal / rowsShown;
      for (i = 0; i < numPages; i++) {
        var pageNum = i +1;
          
        document.getElementById("showmore").innerHTML += '<span id="nav" class="text-center"><a href="#" class="btn-outline-info" rel="' + i + '">&emsp;' + pageNum + '&emsp;</a> </span>';
        
      }
      $('.col-md-4').hide();
      $('.col-md-4').slice(0, rowsShown).show();
      $('#nav a:first').addClass('active');
                            
      $('#nav a').bind('click', function(e) {
          e.preventDefault();
        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('.col-md-4').css('opacity', '0').hide().slice(startItem, endItem).
        css('display', 'block').animate({
          opacity: 1
        }, 300);
    
          
          
      });
                  
    });             
////end pagination

    })
}


returnToGrid()

function returnToList () {
    let listviewoption = document.getElementById("listview")
    listviewoption.addEventListener("click", function () {
        
        document.getElementById("gridContainer").style.display ="none";
        document.getElementById("listContainer").style.display ="block";
//        paginationPageNumbers.style.display = "none";

        document.getElementById("showmorelist").innerHTML = "";
        document.getElementById("showmore").innerHTML = "";
        
        
        //listview pagination
$(document).ready(function paginationList() {
    //divide content by class list name
  $('.t1').after('<div id="nav" class="text-center"></div>');
  var rowsShownList = 8;
  var rowsTotalList = $('.artlistview').length;
  var numPagesList = rowsTotalList / rowsShownList;
    //for loop to loop through total content in class list
  for (i = 0; i < numPagesList; i++) {
    var pageNumList = i + 1;
      //make the link with numbers of items in the above class list
//    $('#nav').append('<a href="#" class="btn-outline-info" rel="' + i + '">&emsp;' + pageNumList + '&emsp;</a> ');
//        document.getElementById("showmore").innerHTML = "";   
document.getElementById("showmore").innerHTML += '<span id="nav" class="text-center"><a href="#" class="btn-outline-info" rel="' + i + '">&emsp;' + pageNumList + '&emsp;</a> </span>';
  }
    //hide classlist content
  $('.artlistview').hide();
    //dividing the class list content by the row number and showing it divided by specified number
  $('.artlistview').slice(0, rowsShownList).show();
    
//  $('#nav a:first').addClass('active');
  $('#nav a').bind('click', function(e) {
      //remove and add selected page number highlight and remove default link action
  	e.preventDefault();
    $('#nav a').removeClass('active');
    $(this).addClass('active');
      
    var currPageList = $(this).attr('rel');
    //first number of new list
    var startItemList = currPageList * rowsShownList;
    //last number of new list
    var endItemList = startItemList + rowsShownList;

      //animate transition and display content as block
    $('.artlistview').css('opacity', '0').hide().slice(startItemList, endItemList).
    css('display', 'block').animate({
      opacity: 1
    }, 300);
  });

});
        
        ////pagination
    })
}
returnToList()

// only works after button is clicked the second time?
function fullMap (){
    let fullMapBtn = document.getElementById('view-full-map')
    let mapContainer = document.getElementById('map-placeholder');
        mapContainer.style.height = '350px';

    fullMapBtn.addEventListener('click',function(){
        if (mapContainer.style.height  != '350px') {
        mapContainer.scrollIntoView({top:0,behavior:'smooth'})
        mapContainer.style.height = "350px";
        fullMapBtn.innerHTML =  "<i class='fa fa-map' ></i>" + " View Full Map"
        }
        else if (mapContainer.style.height = "350px") {
            mapContainer.scrollIntoView({top:0,behavior:'smooth'})
            mapContainer.style.height = "80vh";
            fullMapBtn.innerHTML = "<i class='fa fa-map' ></i>" + ' Minimize Map'
        }
    })
}
fullMap()

function scrollFeatures () {
    let list = document.getElementById("listContainer")
    let grid = document.getElementById("gridContainer")
    let backToArt = document.getElementById('back-to-art')
    let backToTop = document.getElementById('back-to-top')
    let top = document.getElementById('top-nav-hero')

    backToArt.addEventListener('click', function (){

        grid.scrollIntoView({behavior:"smooth"}); 
        list.scrollIntoView({behavior:"smooth"}); 
    })

    backToTop.addEventListener('click', function (){
        top.scrollIntoView({behavior:'smooth'}); 
    })
}
scrollFeatures()
