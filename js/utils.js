// format to 00
const formatTime = (time) => {
  return time < 10 ? `0${time}` : time
}

// format date now to dd/mmmm/yyyy
const formatDate = (t, a, s) => {
  function format(m) {
    let f = new Intl.DateTimeFormat("en", m)
    return f.format(t)
  }
  return a.map(format).join(s)
}

// date to time
const toTimestamp = (strDate) => {
  var datum = Date.parse(strDate)
  return datum / 1000
}

// sort array
const sortData = (data) => {
  return data
    .sort((a, b) => {
      return new Date(a.releaseDate) - new Date(b.releaseDate)
    })
    .filter((m) => toTimestamp(m.releaseDate) >= toTimestamp(currDate) || m.releaseDate === "")
}
