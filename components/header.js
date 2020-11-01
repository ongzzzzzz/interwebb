import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import styles from './header.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Header({ children }) {

    return (
        <div className={styles.container}>
            <Link href="/">
                <FontAwesomeIcon className='icon' icon={['fas', 'home']}/>
            </Link>
            {children}
            
        </div>
    )
}