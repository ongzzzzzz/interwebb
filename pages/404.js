import styles from '../styles/404.module.css'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Custom404() {
    return (
        <div className={styles.container}>
            <h1 className={styles.text}>404 - Page Not Found</h1>
            <br />
            <h2 className={styles.text}>
                (｡･∀･)ﾉﾞ =={'>'}
                <Link href="/" >
                    <FontAwesomeIcon icon={['fas', 'home']} className='icon'/>
                </Link>
            </h2>
        </div>
    )
}