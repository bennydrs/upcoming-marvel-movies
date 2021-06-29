// format to 00
export const formatTime = (time) => {
  return time < 10 ? (`0${time}`) : time
}

// format date now to dd/mmmm/yyyy
export const join = (t, a, s) => {
  function format(m) {
    let f = new Intl.DateTimeFormat('en', m);
    return f.format(t);
  }
  return a.map(format).join(s);
}

// date to time
export const toTimestamp = (strDate) => {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

// sort array
export const sortData = (data) => {
  const sortedData = [...data]
  return sortedData.sort((a, b) => a.realeaseDate ? (new Date(a.realeaseDate) > new Date(b.realeaseDate) ? 1 : -1) : '')
}