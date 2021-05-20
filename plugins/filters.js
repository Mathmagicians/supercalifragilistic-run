import Vue from 'vue'
import { formatDistanceToNow, parseISO } from 'date-fns'

Vue.filter('dateSince', (isoDate) => {
  return formatDistanceToNow(parseISO(isoDate), { addSuffix: true })
})

Vue.filter('timeSince', (timestamp) => {
  const time = Number(timestamp) * 1000
  return formatDistanceToNow(time, { addSuffix: true })
})
