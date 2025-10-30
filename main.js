// Creating Piece Power
//maxpower
maxpawn = 50
maxhorse = 60
maxbishop = 70
maxrook = 80
maxqueen = 90
maxbking = 99
maxwking = 100

piece_powers = []

for (let ii = 1; ii <= 32; ii++) {
    if ([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].includes(ii)) {
        piece_powers.push(Math.floor(Math.random() * maxpawn + 1))
    }
    if ([2, 7, 26, 31].includes(ii)) {
        piece_powers.push(Math.floor(Math.random() * maxhorse + 1))
    }
    if ([3, 6, 27, 30].includes(ii)) {
        piece_powers.push(Math.floor(Math.random() * maxbishop + 1))
    }
    if ([1, 8, 25, 32].includes(ii)) {
        piece_powers.push(Math.floor(Math.random() * maxrook + 1))
    }
    if ([4, 28].includes(ii)) {
        piece_powers.push(Math.floor(Math.random() * maxqueen + 1))
    }
    if ([29].includes(ii)) {
        piece_powers.push(maxbking)
    }
    if ([5].includes(ii)) {
        piece_powers.push(maxwking)
    }
}

//console.log(piece_powers)

function pn_to_pow(name1) {
    return piece_powers[(name1.replace(/[^0-9]/g, "")) - 1]
}

numOfKings = 0
isblackcomputer = true

// Inserting the Images
function insertImage() {
    
    document.querySelectorAll('.box').forEach(image => {
        
        if (image.getAttribute("data-piece") !== "") {
            t0img = image.getAttribute("data-piece")
            t1img = t0img.replace(/[0-9]/g, '')
            if (t1img == 'Wpawn' || t1img == 'Bpawn') {
                image.classList.add("occupied")
                image.innerHTML = `${pn_to_pow(t0img)} <img class='allimg allpawn' src="${t1img}.png" alt="">`
                image.style.cursor = 'pointer'
                
            }
            
            else {
                image.classList.add("occupied")
                image.innerHTML = `${pn_to_pow(t0img)} <img class='allimg' src="${t1img}.png" alt="">`
                image.style.cursor = 'pointer'
            }
        }
        else { image.innerHTML = "" }
    })
    $(".occupied")
}
insertImage()


//Coloring

function coloring() {
    const color = document.querySelectorAll('.box')
    
    color.forEach(color => {
        
        getId = color.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        aup = eval(arr.shift())
        a = aside + aup
        
        if (a % 2 == 0) {
            color.style.backgroundColor = 'rgb(240, 201, 150)'
        }
        if (a % 2 !== 0) {
            color.style.backgroundColor = 'rgb(100, 75, 43)'
        }
        // if (a % 2 == 0) {
        //     color.style.backgroundColor = 'seagreen'
        // }
        // if (a % 2 !== 0) {
        //     color.style.backgroundColor = 'lime'
        // }
        
    })
}
coloring()




//function to not remove the same team element

function reddish() {
    document.querySelectorAll('.box').forEach(i1 => {
        if (i1.style.backgroundColor == 'pink') {
            
            bpc = count_blacks()
            document.querySelectorAll('.box').forEach(i2 => {
                
                if (i2.style.backgroundColor == 'green' && i2.getAttribute("data-piece") !== "") {
                    
                    
                    greenText = i2.getAttribute("data-piece")
                    
                    pinkText = i1.getAttribute("data-piece")
                    
                    pinkColor = ((Array.from(pinkText)).shift()).toString()
                    greenColor = ((Array.from(greenText)).shift()).toString()
                    
                    getId = i2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    aup = eval(arr.shift())
                    a = aside + aup
                    
                    if (a % 2 == 0 && (pinkColor == greenColor || greenColor == 'W' || (greenText.includes("Bking") && bpc != 1))) {
                        i2.style.backgroundColor = 'rgb(240, 201, 150)'
                    }
                    if (a % 2 !== 0 && (pinkColor == greenColor || greenColor == 'W' || (greenText.includes("Bking") && bpc != 1))) {
                        i2.style.backgroundColor = 'rgb(100, 75, 43)'
                    }
                    
                    // if (pinkColor == greenColor) {
                    //     i2.style.backgroundColor = 'rgb(253, 60, 60)'
                    // }
                }
            })
        }
    })
}

tog = 1
whiteCastleChance = false
blackCastleChance = false

document.querySelectorAll('.box').forEach(item => {
    
    
    
    item.addEventListener('click', function() {
        
        // To delete the opposite element
        
        if (item.style.backgroundColor == 'green' && item.getAttribute("data-piece") == "") {
            tog = tog + 1
        }
        
        else if (item.style.backgroundColor == 'green' && item.getAttribute("data-piece") !== "") {
            
            document.querySelectorAll('.box').forEach(i => {
                if (i.style.backgroundColor == 'pink') {
                    interact_board(i.id, item.id)
                    //pinkId = i.id
                    // pinkText = i.innerText
                    
                    // document.getElementById(pinkId).innerText = ''
                    // item.innerText = pinkText
                    //coloring()
                    //insertImage()
                    //tog = tog + 1
                    
                }
            })
        }
        
        
        
        getId = item.id
        // console.log(getId)
        arr = Array.from(getId)
        //  console.log(arr)
        arr.shift()
        //   console.log(arr)
        aside = eval(arr.pop())
        //    console.log(aside)
        arr.push('0')
        //    console.log(arr)
        aup = eval(arr.join(''))
        //     console.log(aup)
        a = aside + aup
        // console.log(a,aup)
        
        function whosTurn(toggle) {
            
            // KING
            
            if (item.getAttribute("data-piece").includes(`${toggle}`)) {
                
                if (aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor = 'green'
                    
                }
                if (aside > 1) {
                    
                    document.getElementById(`b${a - 1}`).style.backgroundColor = 'green'
                }
                if (aup < 800) {
                    
                    document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                }
                if (aup > 100) {
                    
                    document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                }
                
                if (aup > 100 && aside < 8) {
                    
                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                }
                if (aup > 100 && aside > 1) {
                    
                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'
                }
                if (aup < 800 && aside < 8) {
                    
                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                }
                if (aup < 800 && aside > 1) {
                    
                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'
                }
                
                
                item.style.backgroundColor = 'pink'
                
            }
            
        }
        
        
        
        // Toggling the turn
        
        if (tog % 2 !== 0) {
            document.getElementById('tog').innerText = "White's Turn"
            whosTurn('W')
        }
        if (tog % 2 == 0) {
            document.getElementById('tog').innerText = "Black's Turn"
            whosTurn('B')
        }
        
        reddish()
    })
    
})

function interact_board(wp, bp) {
    wpi = wp
    bpi = bp
    wv = pn_to_pow($("#" + wpi).attr("data-piece"))
    bv = pn_to_pow($("#" + bpi).attr("data-piece"))
    
    wcpt = 'Current White Power: <input type="number" min=1 max=' + wv + ' id="cwp" readonly/><input type="button" onclick="rollcwp(' + wv + ')"/ value="Roll">'
    bcpt = 'Current Black Power:<input type="number" min=1 max=' + bv + ' id="cbp" readonly/><input type="button" onclick="rollcbp(' + bv + ')" value="Roll"/>'
    
    if ($("#" + wpi).attr("data-piece").includes("king")) {
        wcpt = 'Current White Power: <input type="number" min=1 max=' + wv + ' value=' + wv + ' id="cwp" readonly/>'
    }
    if ($("#" + bpi).attr("data-piece").includes("king")) {
        bcpt = 'Current Black Power: <input type="number" min=1 max=' + bv + ' value=' + bv + ' id="cbp" readonly/>'
    }
    
    iscwp = true
    iscbp = true
    
    $('#info-box').css("display", "block")
    $('#info-box').html('Interaction<br>Max White Power: ' + wv + '<br>' + wcpt + '<br>Max Black Power: ' + bv + '<br>' + bcpt + '<br><input type="submit" onclick="piece_interact()"/>')
}
wpi = ""
bpi = ""
iscwp = true
iscbp = true

function rollcwp(num) {
    if (iscwp) {
        $("#cwp").attr("value", Math.floor(Math.random() * num + 1))
        iscwp = false
    }
}

function rollcbp(num) {
    if (iscbp)
    {
        $("#cbp").attr("value", Math.floor(Math.random() * num + 1))
        iscbp = false
    }
}

function piece_interact() {
    cwp = parseInt($("#cwp").val())
    cbp = parseInt($("#cbp").val())
    
    if (isNaN(cwp) || isNaN(cbp)) {
        $('#info-box').css("display", "none")
        
        coloring()
        insertImage()
        return false
    }
    
    if (cwp > cbp) {
        pt = $("#" + bpi).attr("data-piece")
        $("#" + bpi).attr("data-piece", "W" + pt.substring(1))
        
        $('#info-box').css("display", "none")
        
        coloring()
        insertImage()
        tog = tog + 1
        
        // winning()
        
        numOfKings = 0
        
        
        if (count_blacks() == 0) {
            numOfKings += 1
        }
        
        
        
        if (numOfKings == 1) {
            setTimeout(() => {
                // console.log(`${toggle}`) 
                if (tog % 2 == 0) {
                    alert('White Wins !!')
                    end_menu()
                }
                else if (tog % 2 !== 0) {
                    alert('Black Wins !!')
                    end_menu()
                }
            }, 100)
        }
        
        bl_move()
        
    }
    else {
        $('#info-box').css("display", "none")
        
        coloring()
        insertImage()
        tog = tog + 1
        
        bl_move()
    }
}
//del image.getAttribute("data-piece") 
function count_blacks() {
    blacks = 0
    $(".box").each(function() { if ($(this).attr("data-piece")[0] == "B") { blacks += 1 } })
    return blacks
}
// Moving the element
document.querySelectorAll('.box').forEach(item => {
    
    item.addEventListener('click', function() {
        
        
        if (item.style.backgroundColor == 'pink') {
            
            pinkId = item.id
            pinkText = item.getAttribute("data-piece")
            
            document.querySelectorAll('.box').forEach(item2 => {
                
                item2.addEventListener('click', function() {
                    
                    getId = item2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    arr.push('0')
                    aup = eval(arr.join(''))
                    a = aside + aup
                    
                    if (item2.style.backgroundColor == 'green' &&
                        item2.getAttribute("data-piece") == "") {
                        document.getElementById(pinkId).classList.remove("occupied")
                        document.getElementById(pinkId).setAttribute("data-piece", "")
                        item2.setAttribute("data-piece", pinkText)
                        coloring()
                        insertImage()
                        bl_move()
                        
                    }
                })
            })
            
        }
        
    })
    
})






// Prvents from selecting multiple elements
z = 0
document.querySelectorAll('.box').forEach(ee => {
    ee.addEventListener('click', function() {
        z = z + 1
        if (z % 2 == 0 && ee.style.backgroundColor !== 'green' && ee.style.backgroundColor !== 'aqua') {
            coloring()
        }
    })
})

function bl_move() {
    if (isblackcomputer && tog % 2 == 0) {
        choose_moves('B')
    }
}

function choose_moves(BorW) {
    list_of_moves = []
    poss_pieces = []
    //$("#b701").trigger("click")
    $(".box").each(
        function() {
            if ($(this).attr("data-piece")[0] == BorW) { poss_pieces.push($(this).attr("id")) }
        })
    //  console.log(poss_pieces2)
    for (i = 0; i < poss_pieces.length; i++) {
        poss_to = []
        $("#" + poss_pieces[i]).trigger("click")
        $(".box").each(function() {
            if ($(this).css("background-color") == "rgb(0, 128, 0)") {
                poss_to.push($(this).attr("id"))
            }
        })
        $("#" + poss_pieces[i]).trigger("click")
        if (poss_to.length > 0) {
            for (j = 0; j < poss_to.length; j++) {
                list_of_moves.push([poss_pieces[i], poss_to[j]])
            }
        }
        
    }
    if (list_of_moves.length == 0 && numOfKings != 1) {
        stalemate()
    }
    chosen_move = list_of_moves[Math.floor(Math.random() * list_of_moves.length)]
    move_piece_from_to_coords(chosen_move[0], chosen_move[1])
}

function move_piece_from_to_coords(co1, co2) {
    $("#" + co1).trigger("click")
    $("#" + co2).trigger("click")
}

function stalemate() {
    setTimeout(() => {
        // console.log(`${toggle}`)
        alert('Majority Win')
        end_menu()
    }, 100)
}

function end_menu() {
    $("#end_menu").css("display", "block")
}

function reset() {
    location.reload()
}