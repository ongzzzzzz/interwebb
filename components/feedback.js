import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import { Textarea, Input, Button } from '@geist-ui/react'
import styles from './feedback.module.css'
import utilStyles from '../styles/utils.module.css'

import firebase from '../lib/firebase'
import { addLike, removeLike, getStats } from '../lib/stats'
import Sparkles from './sparkle'

export default function Feedback(props) {
    //https://stackoverflow.com/questions/53574614/multiple-calls-to-state-updater-from-usestate-in-component-causes-multiple-re-re
    const [liked, setLike] = useState(false);
    const toggleLike = () => setLike(!liked);
    
    var stats = getStats(props.post).then(data => {
        document.getElementById("likes").innerHTML = data.likes;
        document.getElementById("commentsCount").innerHTML = `(${data.comments.length-1})`;

        // var comments = data.comments.map(comment => {
        //     <div></div>
        // })
        var comments = [];

        document.getElementById("comments").innerHTML = comments;
    });
    console.log(stats)

    return (
        <>
        <div className={styles.container}>
            {/* 
            TODO: style likes count
            TODO: add comments mapping arr
            TODO: add comments submission functionality
            TODO: beautify and spice up main page
            TODO: add viewcount
             */}
            <p id="likes">0</p>
            {/* <p>{likes}</p> */}
            {/* <p>leave a like? 👀</p> */}
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
                <tbody>
                    <tr>
                        <td rowSpan="2"><Textarea status="secondary" width="100%" placeholder="Comments!" /></td>
                        <td><Input width="100%" status="secondary" placeholder="Name" /></td>
                    </tr>
                    <tr>
                        <td><Button width="100%" type="secondary" ghost>Post!!</Button></td>
                    </tr>
                </tbody>
            </table>

            <p>Comments &nbsp;<Sparkles><span id="commentsCount">(0)</span></Sparkles></p>
            <div id="comments">
                
            </div>
            
        </div>
        </>
    )
}