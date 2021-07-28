import movies from "../data/movie.js"
import { formatTime, join, sortData, toTimestamp } from "../js/utils.js"

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => console.log("Success: ", reg.scope))
      .catch((err) => console.log("Failure: ", err))
  })
}

const row = document.querySelector(".row")

// format UNIX epoch of current date to dd/MMM/yyyy
let optionDate = [{ day: "numeric" }, { month: "short" }, { year: "numeric" }]
const currDate = join(new Date(), optionDate, " ")

// sort and filter movies
const moviesSort = sortData(movies).filter(
  (m) => toTimestamp(m.realeaseDate) >= toTimestamp(currDate) || m.realeaseDate === ""
)

// looping movieSort and send to dom
moviesSort.forEach((movie) => {
  const { title, type, image, realeaseDate, year, details } = movie

  const rowContents = `
    <div class="card" data-date="${realeaseDate}">
      <div class="card-image">
        <img src="./${image}" alt="${title}" loading="lazy" />
      </div>
      <div class="card-body">
        <div class="card-content">
          <h2 class="card-title">${title}</h2>
          <div class="card-texts">
            <p class="card-text">${realeaseDate ? realeaseDate : year}</p>
            <p class="card-text type ${type === "Series" ? "series" : "movie"}">${type}</p>
          </div>
          <div class="countdown">
            ${
              toTimestamp(realeaseDate) === toTimestamp(currDate)
                ? `<p class="md-text">Showing today ${
                    type === "Series" ? "on Disney+" : "in Cinemas"
                  }</p>`
                : realeaseDate
                ? `
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
                : `<p class="big-text">TBA ${year}</p>`
            }
        </div>
      </div>
      <div class="card-actions">
        <a href="${details}" class="card-btn" target="_blank" rel="noopener">Details</a>
      </div>
    </div>
  `
  // to dom
  row.innerHTML += rowContents
})

const cards = document.getElementsByClassName("card")
// looping card from dom
let countDownDate = []
for (let i = 0; i < cards.length; i++) {
  countDownDate[i] = []
  countDownDate[i]["el"] = cards[i]
  countDownDate[i]["time"] = cards[i].getAttribute("data-date")
    ? new Date(cards[i].getAttribute("data-date")).getTime()
    : 0
  countDownDate[i]["days"] = 0
  countDownDate[i]["hours"] = 0
  countDownDate[i]["seconds"] = 0
  countDownDate[i]["minutes"] = 0

  if (countDownDate[i]["time"] < "22 apr 2040") {
    countDownDate[i]["el"].remove()
  }
}

setInterval(() => {
  for (let i = 0; i < countDownDate.length; i++) {
    const currentDate = new Date().getTime()
    const distance = countDownDate[i]["time"] - currentDate
    const totalSeconds = distance / 1000

    const daysEl = countDownDate[i]["el"].querySelector(".days")
    const hoursEl = countDownDate[i]["el"].querySelector(".hours")
    const minutesEl = countDownDate[i]["el"].querySelector(".minutes")
    const secondsEl = countDownDate[i]["el"].querySelector(".seconds")

    const days = Math.floor(totalSeconds / 3600 / 24)
    const hours = Math.floor(totalSeconds / 3600) % 24
    const minutes = Math.floor(totalSeconds / 60) % 60
    const seconds = Math.floor(totalSeconds) % 60

    if (distance > 0) {
      daysEl.innerHTML = formatTime(days)
      hoursEl.innerHTML = formatTime(hours)
      minutesEl.innerHTML = formatTime(minutes)
      secondsEl.innerHTML = formatTime(seconds)
    }
  }
}, 1000)

const updateVisitCount = () => {
  fetch("https://api.countapi.xyz/update/upcomming-marvel-movies/movies/?amount=1")
}
updateVisitCount()
