const countEl = document.getElementById("count")

const getVisitCount = () => {
  fetch("https://api.countapi.xyz/get/upcomming-marvel-movies/movies")
    .then((res) => res.json())
    .then((res) => {
      countEl.innerHTML = new Intl.NumberFormat("en-US", { maximumSignificantDigits: 3 }).format(
        res.value
      )
    })
}
getVisitCount()
