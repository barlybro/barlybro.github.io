loc1 = "https://api.github.com/repos/barlybro/barlybro.github.io/git/trees/main?recursive=2"
copy = false

function get1(loc) {
  fetch(loc).then(function(x) { return x.json() }).then(function(x) {
    if (copy) {
      window.prompt(1, JSON.stringify(x));
    }
    p_j(x)
  })
}

function p_j(j1) {
  ii = "<ol>"
  const key = j1["tree"].filter(o => o["path"].includes('/index.html'));
  
  for (let i = 0; i < key.length; i++) {
    ii = ii + '<li>' + '<a href="' + key[i]['path'] + '">' + key[i].path.split("/")[0] + "</li>"
  }
  ii += "</ol>";
  $("#main").append(ii)
}
function show_page(val1){
  
}
try {
  get1(loc)
}
catch (e) {
  get1("main.json")
}
