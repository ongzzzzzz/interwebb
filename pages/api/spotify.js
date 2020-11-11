//https://github.com/rishiosaur/w/blob/master/src/functions/fetch.ts
//https://github.com/rishiosaur/w/blob/master/pages/api/spotify.ts

import fetch from 'node-fetch'
import querystring from 'querystring'

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: querystring.stringify({
			grant_type: 'refresh_token',
			refresh_token,
		}),
	})

	return response.json()
}

export const getNowPlaying = async () => {
    const access_token = await getAccessToken()
    
    // console.log(access_token)

	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token.access_token}`,
		},
	})
}

export default async (req, res) => {
    const response = await getNowPlaying()

    let spotify = {
        playing: false,
        song: '',
        artists: '',
        album: '',
        image: '',
        link: '',
    }

	if (!(response.status === 204 || response.status >= 400)) {

        const data = await response.json();

        if( (data.is_playing) && (data.currently_playing_type != 'ad') ){

            // let songName = data.item.name contains the weird (feat.) thing? remove it : let it be
            spotify.playing = data.is_playing;
            spotify.song = data.item.name;
            spotify.artists = data.item.artists.map(artist => artist.name).join(', ');

            spotify.album = data.item.album.name;
            spotify.image = data.item.album.images[0].url;
            spotify.link = data.item.external_urls.spotify;

        }
    }

    res.json(spotify)
}



// sample json data from `https://api.spotify.com/v1/me/player/currently-playing`
/*

{
   "timestamp":1605087126797,
   "context":{
      "external_urls":{
         "spotify":"https://open.spotify.com/playlist/37i9dQZF1E35UIPYqeG1Y6"
      },
      "href":"https://api.spotify.com/v1/playlists/37i9dQZF1E35UIPYqeG1Y6",
      "type":"playlist",
      "uri":"spotify:user:spotify:playlist:37i9dQZF1E35UIPYqeG1Y6"
   },
   "progress_ms":5573,
   "item":{
      "album":{
         "album_type":"album",
         "artists":[
            {
               "external_urls":{
                  "spotify":"https://open.spotify.com/artist/1vCWHaC5f2uS3yhpwWbIA6"
               },
               "href":"https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6",
               "id":"1vCWHaC5f2uS3yhpwWbIA6",
               "name":"Avicii",
               "type":"artist",
               "uri":"spotify:artist:1vCWHaC5f2uS3yhpwWbIA6"
            }
         ],
         "available_markets":[
            "AD",
            "ZA"
         ],
         "external_urls":{
            "spotify":"https://open.spotify.com/album/6Ad1E9vl75ZB3Ir87zwXIJ"
         },
         "href":"https://api.spotify.com/v1/albums/6Ad1E9vl75ZB3Ir87zwXIJ",
         "id":"6Ad1E9vl75ZB3Ir87zwXIJ",
         "images":[
            {
               "height":640,
               "url":"https://i.scdn.co/image/ab67616d0000b273660ee24281a547103f466ff5",
               "width":640
            },
            {
               "height":300,
               "url":"https://i.scdn.co/image/ab67616d00001e02660ee24281a547103f466ff5",
               "width":300
            },
            {
               "height":64,
               "url":"https://i.scdn.co/image/ab67616d00004851660ee24281a547103f466ff5",
               "width":64
            }
         ],
         "name":"TIM",
         "release_date":"2019-06-06",
         "release_date_precision":"day",
         "total_tracks":12,
         "type":"album",
         "uri":"spotify:album:6Ad1E9vl75ZB3Ir87zwXIJ"
      },
      "artists":[
         {
            "external_urls":{
               "spotify":"https://open.spotify.com/artist/1vCWHaC5f2uS3yhpwWbIA6"
            },
            "href":"https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6",
            "id":"1vCWHaC5f2uS3yhpwWbIA6",
            "name":"Avicii",
            "type":"artist",
            "uri":"spotify:artist:1vCWHaC5f2uS3yhpwWbIA6"
         },
         {
            "external_urls":{
               "spotify":"https://open.spotify.com/artist/6SsTlCsuCYleNza6xGwynu"
            },
            "href":"https://api.spotify.com/v1/artists/6SsTlCsuCYleNza6xGwynu",
            "id":"6SsTlCsuCYleNza6xGwynu",
            "name":"Agnes",
            "type":"artist",
            "uri":"spotify:artist:6SsTlCsuCYleNza6xGwynu"
         },
         {
            "external_urls":{
               "spotify":"https://open.spotify.com/artist/2fVW2ix4ANKiofDZIsy1XR"
            },
            "href":"https://api.spotify.com/v1/artists/2fVW2ix4ANKiofDZIsy1XR",
            "id":"2fVW2ix4ANKiofDZIsy1XR",
            "name":"Vargas & Lagola",
            "type":"artist",
            "uri":"spotify:artist:2fVW2ix4ANKiofDZIsy1XR"
         }
      ],
      "available_markets":[
         
      ],
      "disc_number":1,
      "duration_ms":191248,
      "explicit":false,
      "external_ids":{
         "isrc":"SE5R71900204"
      },
      "external_urls":{
         "spotify":"https://open.spotify.com/track/1yfyIdEw5U2bD5I6gxQCxW"
      },
      "href":"https://api.spotify.com/v1/tracks/1yfyIdEw5U2bD5I6gxQCxW",
      "id":"1yfyIdEw5U2bD5I6gxQCxW",
      "is_local":false,
      "is_playable":true,
      "name":"Tough Love (feat. Agnes, Vargas & Lagola)",
      "popularity":66,
      "preview_url":null,
      "track_number":4,
      "type":"track",
      "uri":"spotify:track:1yfyIdEw5U2bD5I6gxQCxW"
   },
   "currently_playing_type":"track",
   "actions":{
      "disallows":{
         "resuming":true,
         "seeking":true,
         "skipping_prev":true,
         "toggling_repeat_track":true,
         "toggling_shuffle":true
      }
   },
   "is_playing":true
}

*/