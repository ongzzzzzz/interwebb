import firebase from './firebase'

var db = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

export function addLike(post){
    db.collection('blogs').doc(post).update(
        { reads: increment }
    )
}

export function removeLike(post){
    db.collection('blogs').doc(post).update(
        { reads: decrement}
    )
}

// export function getLikes(post){

// } 

// export function addComments(post){

// }

// export function getComments(post){

// }

//https://stackoverflow.com/questions/63360059/firebase-analytics-is-not-a-function
//https://firebase.google.com/docs/firestore/quickstart

//why trigger twice?
//https://react.geist-ui.dev/en-us/components/button