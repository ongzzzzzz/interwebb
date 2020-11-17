import firebase from '../../../lib/firebase'

export default (req, res) => {
    let response = {}
    firebase.firestore().collection('blogs').get()
    .then((snapshot) => {
        snapshot.forEach(doc => {
            response[doc.id] = (doc.data());
        })
        res.json({ "blogs" : response });
    })
    .catch((error) => {
        res.json({ error });
    });
}