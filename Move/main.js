aa = ($(".bd").width() - 2-16) / 8
$(".bd ul li div").attr("style", "width: " + aa + "px").attr("style", "height: " + aa + "px")

// Pieces are K, Q, R, B, N and p
board = [
  ["", "", "", "", "", "", "", ""],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["R", "N", "B", "Q", "Q", "B", "N", "R"],
  ["R", "N", "B", "Q", "Q", "B", "N", "R"],
  ["", "", "", "", "", "", "", ""],
  ["R", "N", "B", "Q", "Q", "B", "N", "R"],
  ["R", "N", "B", "Q", "Q", "B", "N", "R"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"]
]

//inputs the board
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    val1 = board[i][j]
    op1 = ""
    if (val1 != "") {
      op1 = "<img src='" + val1 + ".png'>" + val1
    }
    $("#" + (8 - i) + "0" + (1 + j)).html(op1)
  }
}

function eval_move() {
  $(".bd ul li div").filter(function() { return $(this).html() != "" }).after(function() { $(this).attr("onClick", "cl(this)") })
}

eval_move()

function green(ci1) {
  $("#" + ci1).css("background-color", "#32cd32")
  $("#" + ci1).attr("onClick", "move(this.id)")
}
pc_orig = ""
pn_orig = ""

function cl(d1) {
  normal()
  pn = $(d1).text()
  pc = $(d1).attr("id")
  pc_orig = pc
  pn_orig = pn
  gen_g()
}

function i_m(ci1, mov) {
  //moves by int the ci1
  return (parseInt(ci1[0]) + mov[0]) + "0" + (parseInt(ci1[2]) + mov[1])
}

function gen_g() {
  if (pn_orig == "p") {
    ni = i_m(pc_orig, [1, 0])
    if (valid(ni)) {
      if ($("#" + ni).text() == "") {
        green(ni)
      }
    }
  }
  if (pn_orig == "N") {
    n1 = [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2]
    ]
    for (let i = 0; i < 8; i++) {
      ni = i_m(pc_orig, n1[i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
      }
    }
  }
  if (pn_orig == "B") {
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [i, i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [i, -i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [-i, -i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [-i, i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
  }
  if (pn_orig == "R") {
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [0, i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [i, 0])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [0, -i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [-i, 0])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
  }
  if (pn_orig == "Q") {
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [i, i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [i, -i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [-i, -i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [-i, i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [0, i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [i, 0])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [0, -i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
    for (let i = 1; i <= 7; i++) {
      ni = i_m(pc_orig, [-i, 0])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
        else {
          break
        }
      }
    }
  }
    if (pn_orig == "K") {
    n1 = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1]
    ]
    for (let i = 0; i < 8; i++) {
      ni = i_m(pc_orig, n1[i])
      if (valid(ni)) {
        if ($("#" + ni).text() == "") {
          green(ni)
        }
      }
    }
  }

}

function valid(ci1) {
  ci2 = parseInt(ci1)
  y1 = parseInt(Math.floor(ci2 / 100) % 10)
  x1 = ci2 % 10
  if (y1 <= 8 && y1 >= 1 && x1 <= 8 && x1 >= 1) {
    return true
  }
  return false
}

function move(ci1) {
  
  if (pn_orig == "p" && parseInt(Math.floor(ci1 / 100) % 10) == 8) {
    pn_orig = "Q"
  }
  
  $("#" + ci1).html("<img src='" + pn_orig + ".png'>" + pn_orig)
  $("#" + pc_orig).html("")
  normal()
  eval_move()
}

function normal() {
  $(".bd ul li div").after(function() {
    normalc($(this).attr("id"))
  })
}

function normalc(ci1) {
  op1 = "orange"
  if ($("#" + ci1).attr("class").includes("b2")) {
    op1 = "#FFCB82"
  }
  $("#" + ci1).css("background-color", op1)
  $("#" + ci1).attr("onClick", "")
}