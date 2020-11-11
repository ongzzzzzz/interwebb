import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './spotify.module.css'
import utilStyles from '../styles/utils.module.css'

import Link from 'next/link'
import useSWR from 'swr'
const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
};

export default function Spotify({ children }) {

    const { data } = useSWR(`/api/spotify`, fetcher, { refreshInterval: 1000 });

    if(data){
        console.log(data)

        return (
            <div className={styles.container}>
                <img className={styles.albumCover} 
                    alt="Spotify Album Cover" 
                    src={data.playing? data.image : "https://images.unsplash.com/photo-1583988989386-f0e2797e424b"}
                />

                <div className={styles.songInfo}>

                    {data.playing?
                    <a className={styles.songName}
                        target="_blank" href={data.link}>
                        <h3>{data.song}</h3>
                    </a>
                    :
                    <h3>Not Playing</h3>
                    }

                    <p className={styles.songArtists}>{data.playing? data.artists : ""}</p>

                </div>

                <FontAwesomeIcon icon={['fab', 'spotify']} className={styles.spotifyIcon} />
            </div>
        )

    } else { return <div></div> }
}

// spotify = {
//     playing: false,
//     song: '',
//     artists: '',
//     album: '',
//     image: '',
//     link: '',
// }