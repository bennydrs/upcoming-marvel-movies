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
  const sortedData = [...data]
  return sortedData.sort((a, b) =>
    a.realeaseDate ? (new Date(a.realeaseDate) > new Date(b.realeaseDate) ? 1 : -1) : ""
  )
}
