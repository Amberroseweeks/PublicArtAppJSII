async function getArt () {
    const response = await fetch ('https://www.philart.net/api.json');
    const data = await response.json();
    console.log(data)
    console.log(data.links)
}
getArt();


async function getArt () {
    const response = await fetch ('https://www.philart.net/api.json');
    const data = await response.json();
    console.log(data)
    console.log(data.links)
}
getArt();


const artists_url = "http://www.philart.net/api/artists.json"


async function getArtists() {
    const response = await fetch(artists_url);
    const data = await response.json();
    console.log(data);
}

getArtists();




const artTitle_url = "http://www.philart.net/api/art.json"


async function getArtTitle() {
    const response = await fetch(artTitle_url);
    const data = await response.json();
    console.log(data);
}

getArtTitle();
//http://www.philart.net/api/art.json






//$(document).ready(function() {
//function countries (){
    $.ajax({
        url: "http://www.philart.net/api/content/88.json",
        success: function(countryData) {
            console.log(countryData)
//            displayCountryData(countryData)
        }
    })
//}
//
//})



    $.ajax({
        url: "http://www.philart.net/api/artists/1.json",
        success: function(countryData) {
            console.log(countryData)
//            displayCountryData(countryData)
        }
    })

    $.ajax({
        url: "http://www.philart.net/api/artists.json",
        success: function(countryData) {
            console.log(countryData)
//            displayCountryData(countryData)
        }
    })


    $.ajax({
        url: "http://www.philart.net/api/artists/423.json",
        success: function(countryData) {
            console.log(countryData)
//            displayCountryData(countryData)
        }
    })

    $.ajax({
        url: "http://www.philart.net/api/artists/423.json",
        success: function(artistData) {
            console.log(artistData.body)
            console.log(artistData.body.art[0].artists[0].name)
            console.log(artistData.body.art[0].title.display)
            console.log(artistData.body.art[0].location)
            console.log(artistData.body.art[0].pictures[0].large.url)
        }
    })


