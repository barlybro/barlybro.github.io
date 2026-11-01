
function get1(loc) {
  fetch(loc).then(function(x) { return x.json() }).then(function(x) {
    p_j(x)
  })
}

function p_j(j1) {
  ii = "<ol>"
  key=j1.files
  for (let i = 0; i < key.length; i++) {
    ii = ii + '<li>' + '<a href="' + key[i]+ '">' + key[i].split("/")[0] + "</li>"
  }
  ii += "</ol>";
  $("#main").append(ii)
}

get1("main.json")

