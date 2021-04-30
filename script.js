import movies from './data/movie.js'
import { formatTime, join, toTimestamp, sortData } from './utis.js'

const row = document.querySelector('.row')

let a = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];
let s = join(new Date, a, ' ')

const moviesSort = sortData(movies)

// looping movieSort and send to dom
moviesSort.forEach(movie => {
  const { title, image, realeaseDate, year } = movie

  const rowContents = `
    <div class="card" data-date="${realeaseDate}">
      <img src="./${image}" alt="" />
      <div class="card-content">
        <h2 class="card-title">${title}</h2>
        <p class="card-text">${realeaseDate ? realeaseDate : year}</p>
        <div class="countdown">
          ${realeaseDate ? `
            <div class="c-element">
              <p class="big-text days" id="days">0</p>
              <span>days</span>
            </div>
            <div class="c-element">
              <p class="big-text hours" id="hours">0</p>
              <span>hours</span>
            </div>
            <div class="c-element mins">
              <p class="big-text minutes" id="mins">0</p>
              <span>mins</span>
            </div>
            <div class="c-element">
              <p class="big-text seconds" id="seconds">0</p>
              <span>seconds</span>
            </div>`
      : `<p class="big-text hours">TBA ${year}</p>`}
      </div>
    </div>
  `
  // to dom
  row.innerHTML += (toTimestamp(realeaseDate) > toTimestamp(s)) ?
    rowContents : '' ? realeaseDate : rowContents
})

const cards = document.getElementsByClassName("card")
// looping card from dom
let countDownDate = []
for (let i = 0; i < cards.length; i++) {
  countDownDate[i] = []
  countDownDate[i]['el'] = cards[i]
  countDownDate[i]['time'] = cards[i].getAttribute('data-date') ? new Date(cards[i].getAttribute('data-date')).getTime() : 0
  countDownDate[i]['days'] = 0
  countDownDate[i]['hours'] = 0
  countDownDate[i]['seconds'] = 0
  countDownDate[i]['minutes'] = 0

  if (countDownDate[i]['time'] < "22 apr 2040") {
    countDownDate[i]['el'].remove()
  }
}

setInterval(() => {
  for (let i = 0; i < countDownDate.length; i++) {
    const currentDate = new Date().getTime()
    const distance = countDownDate[i]['time'] - currentDate
    const totalSeconds = distance / 1000

    const daysEl = countDownDate[i]['el'].querySelector('.days')
    const hoursEl = countDownDate[i]['el'].querySelector('.hours')
    const minutesEl = countDownDate[i]['el'].querySelector('.minutes')
    const secondsEl = countDownDate[i]['el'].querySelector('.seconds')

    const days = Math.floor(totalSeconds / 3600 / 24)
    const hours = Math.floor(totalSeconds / 3600) % 24
    const minutes = Math.floor(totalSeconds / 60) % 60
    const seconds = Math.floor(totalSeconds) % 60

    if (distance < 0) {
      // daysEl.innerHTML = 0
      // hoursEl.innerHTML = 0
      // minutesEl.innerHTML = 0
      // secondsEl.innerHTML = 0
    } else {
      daysEl.innerHTML = formatTime(days)
      hoursEl.innerHTML = formatTime(hours)
      minutesEl.innerHTML = formatTime(minutes)
      secondsEl.innerHTML = formatTime(seconds)
    }
  }
}, 1000)


