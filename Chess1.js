function print(param) {
    console.log(param)
}
insert_board = false
tg = "b601"
lm = ""
if (localStorage.getItem("p_max") === null) {
    p_max = 47
    localStorage.setItem('p_max', p_max)
    
}
else {
    p_max = localStorage.getItem("p_max")
}
whitebot = 0
b1 = [
    ["Tking", "", "", "", "", "", "", ""],
    ["Wpawn", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
]

function input_board() {
    for (let i = 8; i > 0; i--) {
        for (let j = 1; j < 9; j++) {
            aa = b1[8 - i][j - 1]
            if (aa != "") {
                $("#b" + i + "0" + j).text(aa)
            }
        }
    }
}


function t_board() {
    tg = "b" + (Math.floor(Math.random() * 8) + 1) + 0 + (Math.floor(Math.random() * 8) + 1);
}

function win1() {
    if ($("#" + tg).text().trim() == "Tking".trim()) {
        setTimeout(location.reload(), 1000);
        
    }
    bl_move();
    $("#bt").attr("disabled", false)
}

function start_solve() {
    // setInterval(function(){wb()},1000)
    wb()
}
p_dist = [1, 1, 1, 1, 1]

function rand_ar() {
    ab = ar_sum(p_dist)
    
    for (let i = 0; i < (p_max - ab); i++) {
        p_dist[Math.floor(Math.random() * (p_dist.length - 1 + 1) + 0)] += 1;
    }
}

function wb() {
    find_tking()
}

function find_tking() {
    tg2 = ""
    $(".box").each(
        function() {
            if ($(this).text().trim() == "Tking") { tg2 = $(this).attr("id") }
        })
    //b505  607
    next1 = ""
    arr1 = [
        [Number(tg2[1]), Number(tg2[3])],
        [Number(tg[1]), Number(tg[3])]
    ]
    aa = Math.sign(arr1[1][0] - arr1[0][0]) * Math.ceil(Math.abs(arr1[1][0] - arr1[0][0]) / 8)
    bb1 = Math.sign(arr1[1][1] - arr1[0][1]) * Math.ceil(Math.abs(arr1[1][1] - arr1[0][1]) / 8)
    tg3 = "b" + (arr1[0][0] + aa) + "0" + (arr1[0][1] + bb1)
    
    if (is_empty(tg3)) {
        list_of_moves = []
        poss_pieces = []
        //$("#b701").trigger("click")
        $(".box").each(
            function() {
                if ($(this).text()[0] == "W") { poss_pieces.push($(this).attr("id")) }
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
                    
                    if (poss_to[j] != tg3) {
                        list_of_moves.push([poss_pieces[i], poss_to[j]])
                    }
                }
            }
            
        }
        chosen_move = list_of_moves[Math.floor(Math.random() * (list_of_moves.length - 0 + 1) + 0)]
        print(list_of_moves, 36852)
        print([chosen_move, 9999])
        move_piece_from_to_coords(chosen_move[0], chosen_move[1])
        
    }
    else {
        chosen_move = w_move([tg3], 1, tg2)
        print([chosen_move, 777])
        move_piece_from_to_coords(chosen_move[0], chosen_move[1])
    }
}

pos_m = gen_pos_m()

function gen_pos_m() {
    op = {}
    op["Wpawn"] = [
        [1, 0]
    ]
    op["Wknight"] = [
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
        [-2, 1]
    ]
    op["Wking"] = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1]
    ]
    op1 = []
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (y == 0 && x > 0) {
                op1.push([y, x])
                op1.push([y, -x])
            }
            if (x == 0 && y > 0) {
                op1.push([y, x])
                op1.push([-y, x])
            }
        }
    }
    op["Wrook"] = op1
    op1 = []
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (y == x && x > 0) {
                op1.push([y, x])
                op1.push([y, -x])
                op1.push([-y, x])
                op1.push([-y, -x])
            }
        }
    }
    op["Wbishop"] = op1
    op["Wqueen"] = op["Wrook"].concat(op["Wbishop"])
}

function w_move(coor_arr, c1, tg2) {
    list_of_moves = []
    print([coor_arr, 7525])
    if (coor_arr[0] == tg2) {
        list_of_moves22 = []
        poss_pieces22 = []
        //$("#b701").trigger("click")
        $(".box").each(
            function() {
                if ($(this).text()[0] == "W") { poss_pieces22.push($(this).attr("id")) }
            })
        //  console.log(poss_pieces2)
        for (i = 0; i < poss_pieces22.length; i++) {
            poss_to22 = []
            $("#" + poss_pieces22[i]).trigger("click")
            $(".box").each(function() {
                if ($(this).css("background-color") == "rgb(0, 128, 0)") {
                    poss_to22.push($(this).attr("id"))
                }
            })
            $("#" + poss_pieces22[i]).trigger("click")
            if (poss_to22.length > 0) {
                for (j = 0; j < poss_to22.length; j++) {
                    
                    if (poss_to22[j] != tg2) {
                        list_of_moves22.push([poss_pieces22[i], poss_to22[j]])
                    }
                }
            }
            
            
        }
        return list_of_moves22[Math.floor(Math.random() * (list_of_moves22.length - 1))]
    }
    for (i = 0; i < coor_arr.length; i++) {
        poss_to = []
        $("#" + coor_arr[i]).trigger("click")
        $(".box").each(function() {
            if ($(this).css("background-color") == "rgb(0, 128, 0)") {
                poss_to.push($(this).attr("id"))
            }
        })
        $("#" + coor_arr[i]).trigger("click")
        if (poss_to.length > 0) {
            for (j = 0; j < poss_to.length; j++) {
                
                if (poss_to[j] != tg3) {
                    list_of_moves.push([coor_arr[i], poss_to[j]])
                }
            }
        }
        
    }
    if (list_of_moves.length > 0) {
        print([list_of_moves, 8394])
        return list_of_moves[Math.floor(Math.random() * (list_of_moves.length - 1))]
    }
    else {
        if (c1 < 500) {
            cb = c1 + 1
            return w_move(find_invalids([coor_arr]), cb, tg2)
        }
        
    }
}


p_i = {
    "Wking": [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1]
    ],
    "Wqueen": [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1]
    ],
    "Wbishop": [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1]
    ],
    "Wknight": [
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
        [-2, 1]
    ],
    "Wrook": [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ],
    "Wpawn": [
        [1, 0]
    ]
    
}

function flatten(ary) {
    var ret = [];
    for (var i = 0; i < ary.length; i++) {
        if (Array.isArray(ary[i])) {
            ret = ret.concat(flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
}

function find_invalids(coor_arr1) {
    invalids = []
    coor_arr = flatten(coor_arr1)
    print([coor_arr, 545])
    for (let i = 0; i < coor_arr.length; i++) {
        name1 = $("#" + coor_arr[i]).text().trim()
        invalids = invalids.concat(find_possible(coor_arr[i], p_i[name1]))
        
    }
    return invalids
}

function find_possible(cor, moves) {
    moves1 = []
    n = [Number(cor[1]), Number(cor[3])]
    print([n, 555])
    print([cor, moves, 676])
    for (let i = 0; i < moves.length; i++) {
        if (((n[0] + moves[i][0]) >= 1) && ((n[0] + moves[i][0]) <= 8) && ((n[1] + moves[i][1]) >= 1) && ((n[0] + moves[i][1]) <= 8)) {
            print([cor, moves[i], 899])
            moves1.push("b" + (n[0] + moves[i][0]) + "0" + (n[1] + moves[i][1]))
        }
    }
    print([moves1, 62957])
    return moves1
}

function is_empty(coor) {
    if ($("#" + coor).text() == "") {
        return true
    }
}

function ar_sum(ar1) {
    return ar1.reduce((a, b) => a + b, 0)
}

pieces = [
    ["Tking", 1],
    ["Wqueen", p_dist[0]],
    ["Wbishop", p_dist[1]],
    ["Wknight", p_dist[2]],
    ["Wrook", p_dist[3]],
    ["Wpawn", p_dist[4]]
]

function add_pieces() {
    poss1 = []
    for (let i = 1; i < 9; i++) {
        for (let j = 1; j < 9; j++) {
            poss1.push("b" + i + "0" + j);
        }
    }
    poss1.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < pieces.length; i++) {
        for (let j = 0; j < pieces[i][1]; j++) {
            pp1 = pieces[i][0];
            if (pp1 == "Wpawn" && poss1[0][1] == "8") {
                pp1 = "Wqueen";
            }
            $("#" + poss1[0]).text(pp1);
            poss1.splice(0, 1);
        }
    }
}

// Inserting the Images
function insertImage() {
    
    document.querySelectorAll('.box').forEach(image => {
        
        if (image.innerText.length !== 0) {
            if (image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText} <img class='allimg allpawn' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'
                
            }
            
            else {
                
                image.innerHTML = `${image.innerText} <img class='allimg' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'
            }
        }
    })
}
if (insert_board) {
    input_board()
}
else {
    t_board()
    rand_ar()
    pieces = [
        ["Tking", 1],
        ["Wqueen", p_dist[0]],
        ["Wbishop", p_dist[1]],
        ["Wknight", p_dist[2]],
        ["Wrook", p_dist[3]],
        ["Wpawn", p_dist[4]]
    ]
    add_pieces()
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
        if (getId == tg || $("#" + getId).text().trim() == "Tking" || (lm != "" && getId == lm)) {
            color.style.backgroundColor = "orange"
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
            
            document.querySelectorAll('.box').forEach(i2 => {
                
                if (i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {
                    
                    
                    greenText = i2.innerText
                    
                    pinkText = i1.innerText
                    
                    pinkColor = ((Array.from(pinkText)).shift()).toString()
                    greenColor = ((Array.from(greenText)).shift()).toString()
                    
                    getId = i2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    aup = eval(arr.shift())
                    a = aside + aup
                    
                    if (a % 2 == 0) {
                        i2.style.backgroundColor = 'rgb(240, 201, 150)'
                    }
                    if (a % 2 !== 0) {
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
whiteCastleChance = true
blackCastleChance = true

document.querySelectorAll('.box').forEach(item => {
    
    
    
    item.addEventListener('click', function() {
        
        // To delete the opposite element
        
        if (item.style.backgroundColor == 'green' && item.innerText.length == 0) {
            tog = tog + 1
        }
        else if (item.style.backgroundColor == 'aqua' && item.innerText.length == 0) {
            tog = tog + 1
        }
        
        else if (item.style.backgroundColor == 'green' && item.innerText.length !== 0) {
            
            document.querySelectorAll('.box').forEach(i => {
                if (i.style.backgroundColor == 'pink') {
                    pinkId = i.id
                    pinkText = i.innerText
                    
                    document.getElementById(pinkId).innerText = ''
                    item.innerText = pinkText
                    coloring()
                    insertImage()
                    tog = tog + 1
                    
                }
            })
        }
        
        
        
        getId = item.id
        arr = Array.from(getId)
        arr.shift()
        aside = eval(arr.pop())
        arr.push('0')
        aup = eval(arr.join(''))
        a = aside + aup
        
        
        
        // Function to display the available paths for all pieces
        
        function whosTurn(toggle) {
            
            // PAWN
            
            if (item.innerText == `${toggle}pawn`) {
                item.style.backgroundColor = 'pink'
                
                if (tog % 2 !== 0 && aup < 800) {
                    
                    if (aup == 200 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                        if (aup == 200 && document.getElementById(`b${a + 200}`).innerText.length == 0) {
                            document.getElementById(`b${a + 200}`).style.backgroundColor = 'green'
                        }
                    }
                    
                    if (aup !== 200 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                    }
                    
                    if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green'
                    }
                    
                    if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green'
                        
                    }
                    // if (aup == 800) {
                    //     document.getElementById(`b${a}`).innerText = 'Wqueen'
                    //     coloring()
                    //     insertImage()
                    // }
                    // if (aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length == 0 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                    //     document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                    // }
                    
                    // if (aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length == 0 && document.getElementById(`b${a + 100}`).innerText.length == 0) {
                    //     document.getElementById(`b${a + 100}`).style.backgroundColor = 'green'
                    
                    // }
                }
                
                if (tog % 2 == 0 && aup > 100) {
                    
                    if (aup == 700 && document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                        if (aup == 700 && document.getElementById(`b${a - 200}`).innerText.length == 0) {
                            document.getElementById(`b${a - 200}`).style.backgroundColor = 'green'
                        }
                    }
                    
                    if (aup !== 700 && document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green'
                    }
                    if (aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green'
                    }
                    if (aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green'
                        
                    }
                }
                
                
            }
            
            // KING
            if (item.innerText == `${toggle}king`) {
                
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
                
                if (whiteCastleChance == true && a == 105 && document.getElementById('b106').innerText == '' && document.getElementById('b107').innerText == '' && document.getElementById('b108').innerText == 'Wrook') {
                    document.getElementById(`b107`).style.backgroundColor = 'aqua'
                    
                }
                if (whiteCastleChance == true && a == 105 && document.getElementById('b104').innerText == '' && document.getElementById('b103').innerText == '' && document.getElementById('b102').innerText == '' && document.getElementById('b101').innerText == 'Wrook') {
                    document.getElementById(`b103`).style.backgroundColor = 'aqua'
                    
                }
                if (blackCastleChance == true && a == 805 && document.getElementById('b806').innerText == '' && document.getElementById('b807').innerText == '' && document.getElementById('b808').innerText == 'Brook') {
                    document.getElementById(`b807`).style.backgroundColor = 'aqua'
                    
                }
                if (blackCastleChance == true && a == 805 && document.getElementById('b804').innerText == '' && document.getElementById('b803').innerText == '' && document.getElementById('b802').innerText == '' && document.getElementById('b801').innerText == 'Brook') {
                    document.getElementById(`b803`).style.backgroundColor = 'aqua'
                    
                }
                
                item.style.backgroundColor = 'pink'
                
            }
            
            
            // ROOK
            
            if (item.innerText == `${toggle}rook`) {
                
                for (let i = 1; i < 9; i++) {
                    
                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                for (let i = 1; i < 9; i++) {
                    
                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                for (let i = 1; i < 9; i++) {
                    
                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                for (let i = 1; i < 9; i++) {
                    
                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                item.style.backgroundColor = 'pink'
            }
            
            
            
            // BISHOP
            
            if (item.innerText == `${toggle}bishop`) {
                
                
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                
                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                    
                }
                
                
                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                
                
                item.style.backgroundColor = 'pink'
                
            }
            
            
            
            // QUEEN
            
            if (item.innerText == `${toggle}queen`) {
                
                
                for (let i = 1; i < 9; i++) {
                    
                    if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                for (let i = 1; i < 9; i++) {
                    
                    if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                for (let i = 1; i < 9; i++) {
                    
                    if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                    }
                    else if ((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                for (let i = 1; i < 9; i++) {
                    
                    if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                    }
                    else if ((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                
                
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                
                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                
                for (let i = 1; i < 9; i++) {
                    if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                    
                }
                
                
                for (let i = 1; i < 9; i++) {
                    if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                    }
                    else if (i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green'
                        break
                    }
                }
                
                
                
                item.style.backgroundColor = 'pink'
                
            }
            
            // KNIGHT
            
            if (item.innerText == `${toggle}knight`) {
                
                
                if (aside < 7 && aup < 800) {
                    document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = 'green'
                }
                if (aside < 7 && aup > 100) {
                    document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = 'green'
                }
                if (aside < 8 && aup < 700) {
                    document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = 'green'
                }
                if (aside > 1 && aup < 700) {
                    document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = 'green'
                }
                if (aside > 2 && aup < 800) {
                    document.getElementById(`b${a - 2 + 100}`).style.backgroundColor = 'green'
                }
                if (aside > 2 && aup > 100) {
                    document.getElementById(`b${a - 2 - 100}`).style.backgroundColor = 'green'
                }
                if (aside < 8 && aup > 200) {
                    document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = 'green'
                }
                if (aside > 1 && aup > 200) {
                    document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = 'green'
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
            document.getElementById('tog').innerText = "King's Turn"
            whosTurn('T')
        }
        
        reddish()
        
        
        // winning()
        
        numOfKings = 0
        
        
        document.querySelectorAll('.box').forEach(win => {
            if (win.innerText == 'Wking' || win.innerText == 'Bking') {
                numOfKings += 1
            }
            
        })
        
        if (false) {
            setTimeout(() => {
                // console.log(`${toggle}`) 
                if (tog % 2 == 0) {
                    alert('White Wins !!')
                    location.reload()
                }
                else if (tog % 2 !== 0) {
                    alert('Black Wins !!')
                    location.reload()
                }
            }, 100)
        }
        
        
        
    })
    
})





// Moving the element
document.querySelectorAll('.box').forEach(item => {
    
    item.addEventListener('click', function() {
        
        
        if (item.style.backgroundColor == 'pink') {
            
            pinkId = item.id
            pinkText = item.innerText
            
            document.querySelectorAll('.box').forEach(item2 => {
                
                item2.addEventListener('click', function() {
                    
                    getId = item2.id
                    arr = Array.from(getId)
                    arr.shift()
                    aside = eval(arr.pop())
                    arr.push('0')
                    aup = eval(arr.join(''))
                    a = aside + aup
                    
                    if (item2.style.backgroundColor == 'green' && item2.innerText.length == 0) {
                        
                        
                        if (pinkText == `Wpawn` && aup == 800) {
                            
                            document.getElementById(`b${a}`).innerText = 'Wqueen'
                            document.getElementById(pinkId).innerText = ''
                            coloring()
                            insertImage()
                            win1()
                            
                        }
                        else if (pinkText == `Bpawn` && aup == 100) {
                            
                            document.getElementById(`b${a}`).innerText = 'Bqueen'
                            document.getElementById(pinkId).innerText = ''
                            coloring()
                            insertImage()
                            win1()
                            
                        }
                        else {
                            
                            
                            
                            document.getElementById(pinkId).innerText = ''
                            item2.innerText = pinkText
                            coloring()
                            insertImage()
                            win1()
                        }
                        
                    }
                    
                    else if (item2.style.backgroundColor == 'aqua') {
                        if (item2.id == 'b103') {
                            document.getElementById('b101').innerText = ''
                            document.getElementById('b102').innerText = ''
                            document.getElementById('b103').innerText = 'Wking'
                            document.getElementById('b104').innerText = 'Wrook'
                            document.getElementById('b105').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            whiteCastleChance = false
                            coloring()
                            insertImage()
                            win1()
                            
                        }
                        else if (item2.id == 'b107') {
                            document.getElementById('b105').innerText = ''
                            document.getElementById('b106').innerText = 'Wrook'
                            document.getElementById('b107').innerText = 'Wking'
                            document.getElementById('b108').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            whiteCastleChance = false
                            coloring()
                            insertImage()
                            win1()
                            
                        }
                        else if (item2.id == 'b803') {
                            document.getElementById('b801').innerText = ''
                            document.getElementById('b802').innerText = ''
                            document.getElementById('b803').innerText = 'Bking'
                            document.getElementById('b804').innerText = 'Brook'
                            document.getElementById('b805').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            blackCastleChance = false
                            coloring()
                            insertImage()
                            win1()
                            
                        }
                        else if (item2.id == 'b807') {
                            document.getElementById('b805').innerText = ''
                            document.getElementById('b806').innerText = 'Brook'
                            document.getElementById('b807').innerText = 'Bking'
                            document.getElementById('b808').innerText = ''
                            document.getElementById(pinkId).innerText = ''
                            blackCastleChance = false
                            coloring()
                            
                            insertImage()
                            win1()
                            
                        }
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
    if (tog % 2 == 0) {
        choose_moves('T')
    }
}

function choose_moves(BorW) {
    list_of_moves = []
    poss_pieces = []
    //$("#b701").trigger("click")
    $(".box").each(
        function() {
            if ($(this).text()[0] == BorW) { poss_pieces.push($(this).attr("id")) }
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
        tog = 1;
        return 0;
    }
    chosen_move = best_move(list_of_moves)
    if (chosen_move[1] == tg) {
        lm = chosen_move[0]
    }
    move_piece_from_to_coords(chosen_move[0], chosen_move[1])
}

const indexOfMin = arr => arr.reduce((prev, curr, i, a) => curr < a[prev] ? i : prev, 0);

function best_move(l1) {
    l2 = [];
    for (let i = 0; i < l1.length; i++) {
        l2.push(mov_dist(l1[i][1], tg));
    }
    return l1[indexOfMin(l2)];
}

function mov_dist(c1, c2) {
    return Math.sqrt(Math.pow(Number(c1[1]) - Number(c2[1]), 2) + Math.pow(Number(c1[3]) - Number(c2[3]), 2))
}

function move_piece_from_to_coords(co1, co2) {
    $("#" + co1).trigger("click")
    
    
    setTimeout(function() { $("#" + co2).trigger("click") }, 250)
    print([co1, co2, 999]);
}

if (whitebot == 1) {
    wb()
}