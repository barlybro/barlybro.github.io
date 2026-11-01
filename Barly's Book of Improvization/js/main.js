id_list = []

function gri(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ril() {
  aa = gri(0, 9 + 26 + 26)
  bb = aa.toString()
  if (aa > 9 && aa < 9 + 26 + 1) {
    bb = String.fromCharCode(65 - 1 + (aa - 9))
  }
  if (aa > 9 + 26) {
    bb = String.fromCharCode(97 - 1 + (aa - 9 - 26))
  }
  return bb
}

function id_gen() {
  gen = ""
  for (let i = 0; i < 6; i++) {
    gen += ril()
  }
  if (!id_list.includes(gen)) {
    id_list.push(gen)
    return gen
  }
  else {
    id_gen()
  }
}

$(document).ready(function() {
  var toc = $("#toc");
  $("h2, h3, h4, h5, h6").each(function(i, heading) {
    $(this).attr("id", id_gen())
    $(this).html('<a href="#toc">' + $(this).html() + "</a>");
    var level = $(heading).get(0).tagName.substring(1); // Get heading level (H2, H3, etc.)
    var anchor = $(heading).attr("id") || "toc-link-" + i; // Create anchor if missing
    $(heading).attr("id", anchor); // Set anchor ID for linking
    
    toc.append(
      $('<li class="toc-level-' + level + '">').append(
        $("<a>")
        .text($(heading).text())
        .attr("href", "#" + anchor)
      )
    );
  });
});