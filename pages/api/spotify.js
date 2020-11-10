//https://github.com/rishiosaur/w/blob/master/src/functions/fetch.ts
//https://github.com/rishiosaur/w/blob/master/pages/api/spotify.ts
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
	const { access_token } = await getAccessToken()

	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
}

export default (req, res) => {
    // curl -X "GET" "https://api.spotify.com/v1/me/player/currently-playing?market=ES&additional_types=episode" 
    //      -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer abcdefghijklmnop"
}


// import { getNowPlaying } from '../../src/functions/fetch'

// export default async (req: NextApiRequest, res: NextApiResponse) => {
// 	const response = await getNowPlaying()

// 	let spotify = {
// 		artists: 'none',
// 		album: 'none',
// 		name: 'none',
// 		playing: false,
// 		url: 'none',
// 	}

// 	if (!(response.status === 204 || response.status > 400)) {
// 		const { item: song, is_playing: playing, ...other } = await response.json()

// 		if (playing && !(other.currently_playing_type === 'ad')) {
// 			const { album, artists: sptfyArtists, external_urls, name } = song

// 			const artists = sptfyArtists.map((artist) => artist.name).join(' + ')

// 			console.log(album)

// 			spotify = {
// 				artists,
// 				album: album.name,
// 				name,
// 				url: external_urls.spotify,
// 				playing: true,
// 			}
// 		}
// 	}

// 	res.json(spotify)
// }

// 1stday hack
// homework
// bm karangan
// eng writer craft
// chem speedrun
