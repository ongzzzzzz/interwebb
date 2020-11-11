import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import { Textarea, Input, Button } from '@geist-ui/react'
import styles from './feedback.module.css'
import utilStyles from '../styles/utils.module.css'

import Sparkles from './sparkle'

import firebase from '../lib/firebase'
import ReCAPTCHA from "react-google-recaptcha";

import useSWR from 'swr'
const fetcher = async (...args) => {
    const res = await fetch(...args);
    return res.json();
};

export default function Feedback(props) {
    const [state, setState] = useState({
        liked: false,
        comment: "",
        name: "",
        email: "",
        error: false,
        captcha: false
    })
    const toggleLike = () => setState(prevState => ({ ...prevState, liked: !prevState.liked }))

    const commentHandler = (e) => {
        setState(prevState => ({ ...prevState, comment: e.target.value }));
        if(state.error) toggleError();
    }
    const nameHandler = (e) => {
        setState(prevState => ({ ...prevState, name: e.target.value }));
        if(state.error) toggleError();
    }
    const emailHandler = (e) => {
        setState(prevState => ({ ...prevState, email: e.target.value }));
        if(state.error) toggleError();
    }

    const clearState = () => {
        setState(prevState => ({ ...prevState, name: '', comment: '', email: '' }))
        console.log("cleared")
    }

    const captchaHandler = (val) => {
        setState(prevState => ({ ...prevState, captcha: true }));
        console.log(val);
    }
    const captchaErrorHandler = (val) => {
        setState(prevState => ({ ...prevState, captcha: false }));
        console.log(val);
    }

    const toggleError = () => setState(prevState => ({ ...prevState, error: !prevState.error }))

    const validateEmail = (email) => {
        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            return true;
        } else { return false; }
    }
    
    const { data } = useSWR(`/api/stats/${props.post}`, fetcher, { refreshInterval: 100 });

    const updateDoc = (doc, data) => {
        firebase.firestore().collection('blogs').doc(doc).update(data);
        return;
    }

    const submitComment = (doc, name, text, email) => {
        if(name && text && email && validateEmail(email) && state.captcha) {
            if(state.error) toggleError();

            firebase.firestore().collection('blogs').doc(doc).update({ 
                comments: firebase.firestore.FieldValue.arrayUnion(
                    {
                        name: name,
                        date: new Date().toString(),
                        text: text,
                        email: email
                    }
                )
            })
            clearState();
        } else{ toggleError() }
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

            {/* TODO: toast popup error */}

            <table className={styles.input} role="presentation">
                <tbody>
                    <tr>
                        <td colSpan="2" style={{ width: "150%", height: "150%" }}>
                            <Textarea 
                                id="text" 
                                width="100%" 
                                status={state.error ? "error" : "secondary"} 
                                placeholder="Comments!" 
                                onChange={commentHandler}
                                value={state.comment}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan="3" style={{}}>
                            <ReCAPTCHA 
                                theme="dark"
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                onChange={captchaHandler}
                                onExpired={captchaErrorHandler}
                                onErrored={captchaErrorHandler}
                            />
                        </td>
                        <td style={{}}>
                            <Input 
                                id="name" 
                                width="100%"
                                status={state.error ? "error" : "secondary"} 
                                placeholder="Name" 
                                onChange={nameHandler}
                                value={state.name}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}>    
                            <Input 
                                id="email" 
                                width="100%"
                                status={state.error ? "error" : "secondary"} 
                                placeholder="Email" 
                                onChange={emailHandler}
                                value={state.email}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}>
                            <Button size="large" type="secondary" ghost 
                                onClick={() => submitComment(
                                    props.post, 
                                    state.name, 
                                    state.comment, 
                                    state.email
                                )}
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
                : data.comments.slice().reverse().map(comment => (
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