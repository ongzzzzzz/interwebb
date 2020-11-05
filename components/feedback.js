import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import { Textarea, Input, Button } from '@geist-ui/react'
import styles from './feedback.module.css'
import utilStyles from '../styles/utils.module.css'

import firebase from '../lib/firebase'
import { addLike, removeLike, getStats } from '../lib/stats'
import Sparkles from './sparkle'

export default function Feedback(props) {
    const [liked, setLike] = useState(false);
    const toggleLike = () => setLike(!liked);

    var stats = getStats(props.post);

    return (
        <>
        <div className={styles.container}>
            <p>leave a like? 👀</p>
            <FontAwesomeIcon 
                icon={liked ? ['fas', 'heart'] : ['far', 'heart'] }
                className={styles.heart}
                onClick={() => {
                    if(!liked){
                        addLike(props.post);
                    } else{
                        removeLike(props.post);
                    }
                    toggleLike();
                }}
                style={liked ? {color: 'red'} 
                            : {color: 'inherit'}}
            />

            <table className={styles.input} role="presentation">
            {/* https://css-tricks.com/complete-guide-table-element */}
                <tr>
                    <td rowspan="2"><Textarea status="secondary" width="100%" placeholder="Comments!"></Textarea></td>
                    <td><Input status="secondary" className={styles.cell} placeholder="Name"></Input></td>
                </tr>
                <tr>
                    <td><Button type="secondary" className={styles.cell} ghost>Post!!</Button></td>
                </tr>
            </table>

            {/* <Sparkles>{`Comments (${stats.comments.length})`}</Sparkles> */}
            {/* {stats.comments.map((comment) => {

            })} */}
            
        </div>
        </>
    )
}