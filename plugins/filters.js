import Vue from 'vue'
import { formatDistanceToNow, parseISO, intervalToDuration, formatDuration } from 'date-fns'

Vue.filter('dateSince', (isoDate) => {
  return formatDistanceToNow(parseISO(isoDate), { addSuffix: true })
})

Vue.filter('timeSince', (timestamp) => {
  const time = Number(timestamp) * 1000
  return formatDistanceToNow(time, { addSuffix: true })
})

Vue.filter('countDown', (now, timestamp) => {
  const duration = intervalToDuration({
    start: now,
    end: timestamp * 1000
  })
  return formatDuration(duration, {
    delimiter: ' : ',
    zero: true,
    format: ['months', 'days', 'hours', 'minutes']
  })
})

Vue.filter('countUp', (now, timestamp) => {
  const duration = intervalToDuration({
    start: timestamp * 1000,
    end: now
  })
  return formatDuration(duration, {
    delimiter: ' : ',
    zero: true,
    format: ['months', 'days', 'hours', 'minutes']
  })
})
