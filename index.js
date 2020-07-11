
function viewCompleteArtistData () {
    var list = [];
for (var i = 0; i <= 510; i++) {
    list.push(i);
        }
    
for (i = 0; i < list.length; i++) {
 let listFull = list[i]
let fullArtistListData = "http://www.philart.net/api/artists/" + listFull + ".json"
    
    async function getArtTitleSpecific() {
    const response = await fetch(fullArtistListData);
    const data = await response.json();
    console.log(data);
}
    getArtTitleSpecific();
}
}




