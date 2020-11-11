import styles from './footer.module.css'
import utilStyles from '../styles/utils.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Spotify from './spotify'

export default function Footer() {

    return (
        <>
        <Spotify />

        <br />

        <div className={styles.container}>
            <FontAwesomeIcon 
                icon={['fas', 'arrow-up']} 
                className='icon' 
                onClick={
                    () => window.scroll({
                        top: 0, 
                        left: 0, 
                        behavior: 'smooth'
                    })
                }
            />
            <a href="https://l.ongzz.me/g" target="_blank">
                <FontAwesomeIcon icon={['fab', 'github']} className='icon'/>
            </a>
            <a href="https://l.ongzz.me/i" target="_blank">
                <FontAwesomeIcon icon={['fab', 'instagram']} className='icon'/>
            </a>
            <a href="mailto:hey@ongzz.me" target="_blank">
                <FontAwesomeIcon icon={['far', 'envelope']} className='icon'/>
            </a>
        </div>
        </>
    )
}