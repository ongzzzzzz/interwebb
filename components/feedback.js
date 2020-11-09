import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import { Textarea, Input, Button } from '@geist-ui/react'
import styles from './feedback.module.css'
import utilStyles from '../styles/utils.module.css'

import Sparkles from './sparkle'

import firebase from '../lib/firebase'

import useSWR from 'swr'
const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
};

export default function Feedback(props) {
    const [state, setState] = useState({
        liked: false,
        comment: "",
        name: ""
    })
    const toggleLike = () => setState(prevState => ({ ...prevState, liked: !prevState.liked }))
    const commentHandler = (e) => setState(prevState => ({ ...prevState, comment: e.target.value }))
    const nameHandler = (e) => setState(prevState => ({ ...prevState, name: e.target.value }))
    
    const { data } = useSWR(`/api/stats/${props.post}`, fetcher);
    // if(data) console.log(data)

    const updateDoc = (doc, data) => {
        firebase.firestore().collection('blogs').doc(doc).update(data);
        return;
    }

    const submitComment = (doc, name, text) => {
        firebase.firestore().collection('blogs').doc(doc).update({ 
            comments: firebase.firestore.FieldValue.arrayUnion(
                {
                    name: name,
                    date: new Date().toString(),
                    text: text
                }
            )
        })
    } 

    return (
        <>
        <div className={styles.container}>
            <FontAwesomeIcon 
                icon={state.liked ? ['fas', 'heart'] : ['far', 'heart'] }
                className={styles.heart}
                onClick={() => {
                    if(!state.liked){
                        updateDoc(props.post, {likes: data.likes+1})
                    } else{
                        updateDoc(props.post, {likes: data.likes-1})
                    }
                    toggleLike();
                }}
                style={state.liked ? {color: 'red'} : {color: 'inherit'}}
            />
            <p className={styles.heartNums}>{!data ? "uwu" : data.likes}</p>



            <table className={styles.input} role="presentation">
                <tbody>
                    <tr>
                        <td rowSpan="2" className={styles.commentInput}>
                            <Textarea 
                                id="text" 
                                status="secondary" width="100%" 
                                placeholder="Comments!" 
                                onChange={commentHandler}
                            />
                        </td>
                        <td>
                            <Input 
                                id="name" 
                                className={styles.name} 
                                width="100%" height="100%" status="secondary" 
                                placeholder="Name" 
                                onChange={nameHandler}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Button size="auto" type="secondary" ghost 
                                onClick={() => submitComment(props.post, state.name, state.comment)}
                            >post!! ヾ(•ω•`)o</Button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <p>Comments &nbsp;
                <Sparkles>
                    <span>{!data ? (0) : `(${data.comments.length})`}</span>
                </Sparkles>
            </p>

            <div>
                {!data ? <div className={styles.comment}>loading...</div> 
                : data.comments.reverse().map(comment => (
                    <div className={styles.comment} key={comment.date}>
                        <div>
                            <h4>{comment.name}</h4>
                            <small>{comment.date}</small>
                        </div>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
            
        </div>
        </>
    )
}