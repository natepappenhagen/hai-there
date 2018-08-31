/****************************************
    This file holds all of our helper
    utilities like formatting user info/
    each haiku/timestamp aswell as
    handling how long our browser
    should hold a peice of data.
*****************************************/

import { usersHaikusExpirationLength, userExpirationLength } from 'config/constants'

// Formats the users information
export const formatUserInfo  = (name, avatar, uid)  => ({
  name,
  avatar,
  uid
})

// Formats each haiku
export const formatHaiku = (haikuText, user) => ({
  haikuText,
  name: user.name,
  avatar: user.avatar,
  uid: user.uid,
  timestamp: Date.now()
})

// Formats the timestamp
export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

// Gets miliseconds from the time so we can hold onto data for certain amount of time
function getMilliseconds (timestamp) {
  let newDate = new Date()
  return newDate.getTime() - new Date(timestamp).getTime()
}

// Handles how long we hold onto a single haiku when we click to view more
export function staleHaikus (timestamp) {
  return getMilliseconds(timestamp) > usersHaikusExpirationLength
}

// How long to hold onto each user when we click thier profile so multiple requests arent sent
export function staleUser (timestamp) {
  return getMilliseconds(timestamp) > userExpirationLength
}

// Format the reply text area text
export function formatReply ({ name, uid, avatar }, replyText) {
  return {
    name,
    uid,
    avatar,
    replyText,
    timestamp: Date.now()
  }
}
