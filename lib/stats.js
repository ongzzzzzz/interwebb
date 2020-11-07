import firebase from './firebase'

var db = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

const sleep = m => new Promise(r => setTimeout(r, m))

export function addLike(post){
    db.collection('blogs').doc(post)
    .update(
        { likes: increment }
    )
}

export function removeLike(post){
    db.collection('blogs').doc(post)
    .update(
        { likes: decrement}
    )
}

export async function getStats(post){

    // return await db.collection('blogs').doc(post).onSnapshot(doc => doc.data());
    await sleep(100);
    var data = await db.collection('blogs').doc(post).get();
    var stats = await data.data();

    return stats
} 

// make viewcount

// export function addComments(post){

// }

// export function getComments(post){

// }

//https://stackoverflow.com/questions/63360059/firebase-analytics-is-not-a-function
//https://firebase.google.com/docs/firestore/quickstart

//why trigger twice?
//https://react.geist-ui.dev/en-us/components/button