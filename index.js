
function getArt (){
        $.ajax({
            url: "https://raw.githubusercontent.com/Amberroseweeks/PublicArtAppJSII/emily/phlPublicArt.json",
            success: function(jsonMarkers) {
                //console.log(art)
                let markers = JSON.parse(jsonMarkers)
                console.log(markers)

            }
                
         })
    }
    
getArt()


// let artArray = []
// function createArray (art) {
//     artArray.push(art.body)
// }
// console.log(artArray)
// console.log(artArray[6].location) // why can't I target the location? I know this says JSON but it doesn't seems to return a string and I wasn't able to parse it

///////////////////

// markers array will be replaced with array mde from public art api
	// let markers = [
	// {
	// 	location: {
	// 	description: "example description 1",
	// 	latitude: "39.954750",
	// 	longitude: "-75.152000",
	// 	},
	// 	artists: "Artist Name 1",
	// 	title: "title 1",
	// 	type: "medical"

	// },

	// {
	// 	location: {
	// 	description: "example description 2",
	// 	latitude: "39.958320",
	// 	longitude: "-75.171800"
	// 	},
	// 	artists: "Artist Name 2",
	// 	title: "title 2",
	// 	type:"women"

	// },

	// {
	// 	location: {
	// 	description: "example description 2",
	// 	latitude: "39.958220",
	// 	longitude: "-75.101800"
	// 	},
	// 	artists: "Artist Name 3",
	// 	title: "title 3",
	// 	type:"women"

	// }
	// ];

function initMap() {
	//map options
	let options = {
		zoom: 13,
		center: {lat:39.9526, lng: -75.1652}, //map is centered around PHL
	}

	// let eastFalls = document.getElementById('EF');
	// eastFalls.addEventListener("click",function(){
	// 	options.center= {lat:40.0170, lng: -75.1884}
	// })
	// doesn't work but I like the idea of being able to reassign the center

    // new map
    let map = new google.maps.Map(document.getElementById('map'),options);

function addMarker (markers) {
		let a = parseFloat(markers.location.latitude);
		let b = parseFloat(markers.location.longitude)

		let marker = new google.maps.Marker ({
			position: {lat:a, lng:b},
			map: map//what map do we want to add it to?
			//icon: 'url for marker image we want to use'
		});

		 var infoWindow = new google.maps.InfoWindow ({
		 	content: markers.title
		 });

		 marker.addListener("click",function() {
		 	infoWindow.open(map,marker)
		 })
}


//adds markers for everything in array
for (let i=0;i<markers.length; i++) {
	addMarker(markers[i])
}


//Click button to add markers. 
//This might be good if there are too many markers? we could make only certain markets appear on click 
//Don't know how to get markers to go away though on click of  a new button
// let women = document.getElementById('women');
// women.addEventListener("click",function() {
// for (let i=0;i<markers.length; i++) {
// 	if (markers[i].type ==="women")
// 	addMarker(markers[i])
// }

// })


}
