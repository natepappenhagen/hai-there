/****************************************
    This file includes all of the
    api requests to our firebase
    database, including, adding new
    users, adding new haikus, creating
    new replies and also like count
    for each haiku and user.
*****************************************/


import { ref } from 'config/constants'

// Helper functions for saveHaiku Function
function saveToHaikus (haiku) {
  const haikuId = ref.child('haikus').push().key
  const haikuPromise = ref.child(`haikus/${haikuId}`).set({...haiku, haikuId})

  return {
    haikuId,
    haikuPromise
  }
}
// Helper functions for saveHaiku Function
function saveToUsersHaikus (haiku, haikuId) {
  return ref.child(`usersHaikus/${haiku.uid}/${haikuId}`).set({...haiku, haikuId})
}
// Helper functions for saveHaiku Function
function saveLikeCount (haikuId) {
  return ref.child(`likeCount/${haikuId}`).set(0)
}

// Saves a haiku to haikus
export function saveHaiku (haiku) {
  const { haikuId, haikuPromise } = saveToHaikus(haiku)


  return Promise.all([
    haikuPromise,
    saveToUsersHaikus(haiku, haikuId),
    saveLikeCount(haikuId),
  ]).then(() => ({...haiku, haikuId}))
}

// Initial request to get all the haikus upon feed component rendering
export function listenToFeed (cb) {
  ref.child('haikus').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a,b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    cb({feed, sortedIds})
  })
}



//  Get all the haikus a users has liked
export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then(snapshot => snapshot.val() || {})
}

// Like a haiku(star will be highlighted blue)
export function saveToUsersLikes (uid, haikuId) {
  return ref.child(`usersLikes/${uid}/${haikuId}`).set(true)
}

// Unlike a haiku(star will be un-highlighted)
export function deleteFromUsersLikes (uid, haikuId) {
  return ref.child(`usersLikes/${uid}/${haikuId}`).set(null)
}


// Increases a certain haikus like count
export function incrementNumberOfLikes (haikuId) {
  return ref.child(`likeCount/${haikuId}`)
    .transaction((currentVal = 0) => currentVal + 1)
}

// Decreases a certain haikus like count
export function decrementNumberOfLikes (haikuId) {
  return ref.child(`likeCount/${haikuId}`)
    .transaction((currentVal = 0) => currentVal - 1)
}

// Fetches user
export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then(snapshot => snapshot.val())
}

// Fetches users haikus when you go onto a users page
export function fetchUsersHaikus (uid) {
  return ref.child(`usersHaikus/${uid}`).once('value')
    .then(snapshot => {
      return snapshot.val() || {}
    })
}

// Fetches single haiku upon request
export function fetchHaiku (haikuId) {
  return ref.child(`haikus/${haikuId}`).once('value')
    .then(snapshot => snapshot.val())
}


// Get total haiku likes when on a haiku reply page
export function fetchLikeCount (haikuId) {
  return ref.child(`likeCount/${haikuId}`).once('value')
    .then(snapshot => snapshot.val() || 0)
}

// Save replies to firebase
export function postReply (haikuId, reply) {
  const replyId = ref.child(`replies/${haikuId}`).push().key
  const replyWithId = {...reply, replyId}
  const replyPromise = ref.child(`replies/${haikuId}/${replyId}`).set(replyWithId)

  return {
    replyWithId,
    replyPromise
  }
}

// Get Replies from firebase
export function fetchReplies (haikuId) {
  return ref.child(`replies/${haikuId}`).once('value')
    .then(snapshot => snapshot.val() || {})
}
