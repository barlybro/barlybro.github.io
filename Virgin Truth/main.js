card_tot = []
card_hand = []
deck = []
rank = ["j", "q", "k"]
suit = ["c", "h", "s", "d"]

for (let j = 0; j < rank.length; j++) {
  for (let k = 0; k < suit.length; k++) {
    deck.push(rank[j] + suit[k])
  }
}

function gen_deck() {
  card_tot = []
  for (let i = 0; i < 3; i++) {
    card_tot = card_tot.concat(deck)
  }
}
gen_deck()

function gri(min, max) {
  //includes min and max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get1() {
  id1 = gri(0, card_tot.length - 1)
  cc = card_tot[id1]
  card_tot.splice(id1, 1)
  return cc
}

function display() {
  g1 = ""
  w1 = "<div class='row'>"
  cl = card_hand.length
  for (let i = 0; i < cl; i++) {
    if (i % 4 == 0) {
      g1 += w1
    }
    g1 += "<img src='" + card_hand[i] + ".png'>"
    if (i % 4 == 3 || i == cl - 1) {
      g1 += "</div>"
    }
  }
  $(".pics").html(g1)
}

function draw() {
  gen_deck()
  card_hand = []
  nums = gri(2, 3)
  for (let i = 0; i < nums; i++) {
    card_hand = card_hand.concat(get1())
  }
  display()
}

function add1() {
  if (card_tot.length > 0) {
    card_hand = card_hand.concat(get1())
  }
  display()
}

function draw1() {
  gen_deck()
  card_hand = []
  card_hand = card_hand.concat(get1())
  display()
}