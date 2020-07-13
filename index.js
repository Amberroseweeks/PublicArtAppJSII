
    
        function viewCompleteArtistData () {
//            made a for loop for all the listed artists within the database, i used the artist is numbers
            var list = [];
            for (var i = 1; i <= 510; i++) {
            list.push(i);
            }
//    using the artist id numbers I added that to the url to find the rest of the corresponding data
            for (i = 0; i < list.length; i++) {
            let listFull = list[i]
            let fullArtistListData = "http://www.philart.net/api/artists/" + listFull + ".json"
//    the function that retireves the data
            async function getArtTitleSpecific() {
            const response = await fetch(fullArtistListData);
            const data = await response.json();
//            console.log(data.body.art)

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
                    
                let artPicture = document.getElementById("photo-container");
                document.getElementById("photo-container").style.backgroundImage = "url('" + data.body.art[0].pictures[i].large.url + "')";
                    
                let artComments = document.getElementById("artdescription");
                artComments.innerHTML = data.body.art[0].title.display
                    
                
                }         
                
    
                }
            
    getArtTitleSpecific();
            }
        }

//just testing to see how i can print items in the array seperately
var fruits = ["Apple", "Banana","Pineapple"];
fruits.forEach(function(fruit){ console.log(fruit) });
