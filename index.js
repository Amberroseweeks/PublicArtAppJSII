
let artArray = [];
let athleticArtArray = [];
let medicalArtArray = [];
let warArtArray = [];
let exhibitArray = [];

//
// AW-EMPTY ARRAY FOR THE FILTERED CATEGORY 

let athleticArtArrayLocation = [];
let medicalArtArrayLocation = [];
let warArtArrayLocation = [];

// AW-BUTTONS FOR THE CATEGORY 

let athleticButton = document.getElementById("athletic")
let medicalButton = document.getElementById("medical")
let warButton = document.getElementById("war")

athleticButton.addEventListener ("click", thisWorks)
medicalButton.addEventListener ("click", thisWorks)
warButton.addEventListener ("click", thisWorks)

// AW-TEST

function thisWorks() {
    console.log("This works!")
}


window.addEventListener('load', initMap) 


    
        function viewCompleteArtistData () {
//            made a for loop for all the listed artists within the database, i used the artits's id numbers
            var list = [];
            for (var i = 1; i <= 2; i++) {
            list.push(i);
            }
//    using the artist id numbers I added that to the url to find the rest of the corresponding data
            for (i = 0; i < list.length; i++) {
            let listFull = list[i]
            let fullArtistListData = "http://www.philart.net/api/tours/" + listFull + ".json"
//    the function that retireves the data
            async function getArtTitleSpecific() {
            const response = await fetch(fullArtistListData);
            const data = await response.json();
            console.log(data.body.art)
            console.log(data.body.art[0].tours)

//        i created an empty aray to push the data through
            let artistNameListing = [] 
            let n = (data.body.art[0].artists.length)
            var arrayLength = n;
                for (var i = 0; i < arrayLength; i++) {

                artistNameListing.push(n);
                    
//            console logged the information to check to see if it displays
//              artist name:
                console.log(data.body.art[0].artists[i].name)
//              artist information in array
                console.log(data.body.art[0])
//              artwork picture
                console.log(data.body.art[0].pictures[i].large.url)
//              artwork title
                console.log(data.body.art[0].title.display)
//              artwork location description 
                console.log(data.body.art[0].location.description)
//              artwork comments or information
                console.log(data.body.art[0].comments)
//              artwork year(s) created
                console.log(data.body.art[0].years[i].year)
//              artwork location with lat and long
                console.log(data.body.art[0].location.latitude + " , " + data.body.art[0].location.latitude)
                    
                    
                    
//              printing the information above into the page
//                let mainTitle = document.getElementById("Artist-Title-h1");
//                mainTitle.innerHTML = data.body.art[0].title.display
//                    
//                let mainDate = document.getElementById("Artist-Date-h1");
//                mainDate.innerHTML = "(" + data.body.art[0].years[i].year + ")"
                    
                let artTitles = document.getElementById("artTitle");
                artTitles.innerHTML = data.body.art[0].title.display
                
                let artistNames = document.getElementById("artistname");
                artistNames.innerHTML = data.body.art[0].artists[0].name
                    
                let artYear = document.getElementById("artyear");
                artYear.innerHTML = data.body.art[0].years[i].year
                    
                let artLocation = document.getElementById("artlocation");
                artLocation.innerHTML = data.body.art[0].location.description
                    
                let artPicture = document.getElementsByClassName("image-container")[1];
                document.getElementsByClassName("image-container").style.backgroundImage = "url('" + data.body.art[0].pictures[i].large.url + "')";
                    
                let artComments = document.getElementById("artdescription");
                artComments.innerHTML = data.body.art[0].title.display
                    
                
                }         
                
    
                }
            
    getArtTitleSpecific();
            }
        }


function getartData (){
    $.ajax({
        url: "https://raw.githubusercontent.com/Amberroseweeks/PublicArtAppJSII/emily/phlPublicArt.json",
        success: function(artDataUnparsed) {
           let artData = JSON.parse(artDataUnparsed)
           console.log(artData)
        
             for(let i = 0; i < artData.length; i++) {
                 
                artArray.push(artData[i]) 
    // AW-THIS VERY COMPLICATED LOOP FILTERS THROUGH THE ELEMENTS THAT DON'T HAVE DATA AND MAKES SURE THEY ARE WAR, ATHLETIC, OR //MEDICAL             
                 
                if (artData[i].exhibits === undefined || artData[i].exhibits == null || artData[i].exhibits <= 0 || artData[i].artists === undefined || artData[i].artists == null || artData[i].artists <= 0 || artData[i].tours === undefined || artData[i].tours == null || artData[i].tours <= 0 || artData[i].years === undefined || artData[i].years == null || artData[i].years <= 0) {
                console.log("n/a");
                } else if (artData[i].exhibits[0].name === "Athletic"){
                        console.log(artData[i].exhibits[0].name + " " + artData[i].artists[0].name + " " + artData[i].pictures[0].large.url + " " + artData[i].title.display + " " + artData[i].location.latitude + " " + artData[i].location.longitude + " " + artData[i].tours[0].name + " " + artData[i].years[0].year);
                        
                    exhibitArray.push(artData[i].exhibits[0].name + " " + artData[i].artists[0].name + " " + artData[i].pictures[0].large.url + " " + artData[i].title.display + " " + artData[i].location.latitude + " " + artData[i].location.longitude + " " + artData[i].tours[0].name + " " + artData[i].years[0].year);
                    
                    } 
                 else if (artData[i].exhibits[0].name === "Medical"){
                        console.log(artData[i].exhibits[0].name + " " + artData[i].artists[0].name + " " + artData[i].pictures[0].large.url + " " + artData[i].title.display + " " + artData[i].location.latitude + " " + artData[i].location.longitude + " " + artData[i].tours[0].name + " " + artData[i].years[0].year);
                     
                        medicalExhibit = artData[i].exhibits[0].name
                        medicalArtistName = artData[i].artists[0].name
                        medicalArtistsPictures = artData[i].pictures[0].large.url
                        medicalArtistsTitle = artData[i].title.display
                        medicalLat = artData[i].location.latitude
                        medicalLong = artData[i].location.longitude
                        medicalHood = artData[i].tours[0].name
                     
                        medicalArtArray.push(artData[i].exhibits[0].name + " " + artData[i].artists[0].name + " " + artData[i].pictures[0].large.url + " " + artData[i].title.display + " " + artData[i].location.latitude + " " + artData[i].location.longitude + " " + artData[i].tours[0].name + " " + artData[i].years[0].year);
                     
                    }
                                  else if (artData[i].exhibits[0].name === "War"){
                        console.log(artData[i].exhibits[0].name + " " + artData[i].artists[0].name + " " + artData[i].pictures[0].large.url + " " + artData[i].title.display + " " + artData[i].location.latitude + " " + artData[i].location.longitude + " " + artData[i].tours[0].name + " " + artData[i].years[0].year);
                        warArtArray.push(artData[i].exhibits[0].name + " " + artData[i].artists[0].name + " " + artData[i].pictures[0].large.url + " " + artData[i].title.display + " " + artData[i].location.latitude + " " + artData[i].location.longitude + " " + artData[i].tours[0].name + " " + artData[i].years[0].year)
                    }
                  
                 
                
              }
        }
            
     })
 }
 getartData()

//just testing to see how i can print items in the array seperately
var fruits = ["Apple", "Banana","Pineapple"];
fruits.forEach(function(fruit){ console.log(fruit) });




//test



function athleticfilter(afilter) {
  return afilter === "Athletic";
    
}

let submit = document.getElementById("submit")


submit.addEventListener ("click", countries)


console.log(exhibitArray)
console.log(medicalArtArray)
console.log(warArtArray)



exhibitArray.forEach(function(element) {
  console.log(element)
})

var athleticArts = exhibitArray.filter(name => name.includes('Athletic'))
exhibitArray.forEach(element => console.log(element));


function initMap() {
    //map options
    let options = {
        zoom: 18,
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
    }
    
        function addAthleticMarker (athleticArtArray) {
        console.log(athleticArtArray)
            
          if (athleticArtArray.name === "Athletic") {
        console.log("Button Works");
        } else {
        console.log("Not Athletic Category");
        };
    
//        let a = parseFloat(artArray.location.latitude);
//        let b = parseFloat(artArray.location.longitude);
    
//        let marker = new google.maps.Marker({
//            position: {lat:a, lng:b},
//            map: map//what map do we want to add it to?
//            //icon: 'url for marker image we want to use'
//        });
    }
    

    //artArray()
    
    //adds markers for everything in array
    for (let i=0;i<artArray.length; i++) {
//        console.log(artArray[i])
        addMarker(artArray[i])
    }
    
    }




function countries (){
    $.ajax({
        url: "https://www.philart.net/search.html?q=" + input.value,
        success: function(countryData) {
            console.log(countryData)
            displayCountryData(countryData)
        }
    })
}
