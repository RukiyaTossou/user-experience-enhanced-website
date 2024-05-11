// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates inx
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorgt dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))


//endpoints
const storiesAPI = await fetchJson('https://fdnd-agency.directus.app/items/tm_story');
const playlistsAPI = await fetchJson('https://fdnd-agency.directus.app/items/tm_playlist');
const audioAPI = await fetchJson('https://fdnd-agency.directus.app/items/tm_audio');

let likedItems = []; 


//home
app.get('/', function(request, response) {
    // Render index.ejs uit de views map
	fetchJson( storiesAPI).then((storiesData) => {
		response.render('home')
    
	});
});

//Lessons 
app.get('/lessons', function(request, response) {
    // Render index.ejs uit de views map
response.render('index', {
    stories: storiesAPI.data, 
    playlist: playlistsAPI.data,
    likedItems  : likedItems
    });
})


//playlsit/id
app.get('/playlist/:id', function(request, response) {
    response.render('playlist', {
        playlist: playlistsAPI.data,
        stories: storiesAPI.data
    });
})

//Lessons 
app.get('/lessons/allStories', function(request, response) {
    // Render index.ejs uit de views map
response.render('stories', {
    stories: storiesAPI.data, 
    playlist: playlistsAPI.data
    });
})



// // Post
app.post('/lessons', function(request, response) {
    // Handle the toggle like functionality
     // Extract the item from the request body
     const newItem = request.body.item;
     // Assuming `playlistItems` is your array of  playlist items
     likedItems.push(newItem);
 
     // Assuming `playlistItems` is the updated list of playlist items
     response.render('index', {
         stories: storiesAPI.data,
         playlist: playlistsAPI.data,
         // Pass the updated list of playlist items to the view
         likedItems: likedItems
     });
});

// // POST route for liking or unliking a playlist
// app.post("/lessons", (request, response) => {
//     const playlistId = request.body.playlist; // Veronderstel dat de ID van de geselecteerde afspeellijst wordt verzonden via het formulier
    
//     // Zoek de geselecteerde afspeellijst op basis van de ID
//     const selectedPlaylist = playlistsAPI.data.find((playlist) => playlist.id === playlistId);

//     // Controleer of de afspeellijst is gevonden
//     if (selectedPlaylist) {
//         // Zoek of de afspeellijst al in de likedItems-array staat
//         const index = likedItems.findIndex((item) => item.id === selectedPlaylist.id);
//         // Als de afspeellijst niet in de array zit, voeg deze toe
//         if (index === -1) {
//             likedItems.push(selectedPlaylist);
//         } else {
//             // Als de afspeellijst al in de array zit, verwijder deze
//             likedItems.splice(index, 1);
//         }
//     } else {
//         console.log("Selected playlist not found:", playlistId);
//     }

//   
//     } else {
//         response.redirect(303, '/lessons');
//     }
// });
 


// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})