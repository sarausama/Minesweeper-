var w = 20;
var z = 1;
var rows = 20;
var cols = 20;
var bombs = 0;
var state = 1;// 1: regular | 2:lost | 3: won

window.onload = function () {
   canvas = document.getElementById ("myCanvas");
   ctx = canvas.getContext ("2d");
   b = new board(rows,cols);
   for(var i=0; i<cols; ++i){
       for(var j=0; j<rows; ++j){
         b.array[i][j] = new cell(1+i*w, 1+j*w, z);
     }
   }
   for(var a=0; a<cols; ++a){
       for(var c=0; c<rows; ++c){
         for(var o=a-1; o<=a+1; ++o){
           for(var k=c-1; k<=c+1; ++k){
             if(o>=0 && o<cols && k>=0 && k<rows){
               b.array[a][c].number(b.array[o][k]);
             }
         }
       }
     }
   }
   time = 100;
   setInterval (Fixed_Update, time);
   canvas.addEventListener ("mousedown", function (evt) {
       var e = evt.which;
       // console.log(e);
       var rect = canvas.getBoundingClientRect ();
       var root = document.documentElement;
       mouse_pos_x = evt.clientX - rect.left - root.scrollLeft;
       mouse_pos_y = evt.clientY - rect.top - root.scrollTop;
       // console.log ("MousePos: " + mouse_pos_x + ", " + mouse_pos_x);
       if(e == 1){
           i = Math.floor (mouse_pos_x/w);
           j = Math.floor (mouse_pos_y/w);
            (b.array[i][j]).state=true;
             if(b.array[i][j].bomb == true) {
               state=2;
               for(var d=0; d<cols; ++d){
                 for(var e=0; e<rows; ++e){
                   b.array[d][e].state = true;
                   b.array[d][e].flag = false;
                 }
               }
             } else if(b.array[i][j].n == 0){
              reveal(i,j);
            }
       } else if (e == 3){
           i = Math.floor (mouse_pos_x/w);
           j = Math.floor (mouse_pos_y/w);
           if(!b.array[i][j].state){
             (b.array[i][j]).flag = !(b.array[i][j].flag) ;
             if(b.array[i][j].flag){
               --bombs;
             } else {
               ++bombs;
             }
           }

           // console.log(bombs);
       }
   });
   canvas.addEventListener ("contextmenu", function (p) {
       p.preventDefault();
   });
   document.addEventListener ("keydown", function(evt) {
 		var key = evt.keyCode;
    if(key == 82){
      state = 1;
      bombs=0;
      b = new board(rows,cols);
      for(var i=0; i<cols; ++i){
           for(var j=0; j<rows; ++j){
             b.array[i][j] = new cell(1+i*w, 1+j*w, z);
         }
       }
       for(var a=0; a<cols; ++a){
           for(var c=0; c<rows; ++c){
             for(var o=a-1; o<=a+1; ++o){
               for(var k=c-1; k<=c+1; ++k){
                 if(o>=0 && o<cols && k>=0 && k<rows){
                   b.array[a][c].number(b.array[o][k]);
                 }
             }
           }
         }
       }
     }
 	})
}

function Fixed_Update () {
  ctx.clearRect (0, 0, 600, 400);
  ctx.fillStyle = "#7fffd4";
  ctx.fillRect(400, 0, 200, 400);
  ctx.font = "30px Impact";
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillText("Bombs"+": "+bombs, 410, 50);
  instructions();
  for(var i=0; i<cols; ++i){
    for(var j=0; j<rows; ++j){
      b.array[i][j].sketch();
      if(b.array[i][j].flag && b.array[i][j].state){
        b.array[i][j].flag = false;
        ++bombs;
      }
    }
  }
  if(state==1){
    var img = document.getElementById("regular");
    ctx.drawImage(img, 460, 270);
    check();
  } else if(state==2){
    var img = document.getElementById("lost");
    ctx.drawImage(img, 460, 270);
    ctx.font = "20px Impact";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("You lost!?", 465, 380);
  } else if(state==3){
    var img = document.getElementById("won");
    ctx.drawImage(img, 460, 270);
    ctx.font = "20px Impact";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("You won!", 465, 380);
  }

}

function Image(x,y) {
    var img = document.getElementById("image");
    ctx.drawImage(img, x, y);
}

function Image_(x,y) {
    var img = document.getElementById("image_");
    ctx.drawImage(img, x, y);
}

function reveal(i,j){
  for(var o=i-1; o<=i+1; ++o){
    for(var k=j-1; k<=j+1; ++k){
      if(o>=0 && o<cols && k>=0 && k<rows){
        if(b.array[o][k].n == 0 && !(b.array[o][k].state)){
          b.array[o][k].state = true;
          reveal(o,k);
        } else if (!(b.array[o][k].state)){
          b.array[o][k].state = true;
        }
      }
    }
  }
}

function instructions(){
  // ctx.font = "25px Impact";
  ctx.fillStyle = "#000000";
  // ctx.fillText("Instructions"+": ", 410, 75);
  ctx.font = "18px Impact";
  ctx.fillText("-Level: Easy", 410, 85);
  ctx.font = "26px Impact";
  ctx.fillText("-Instructions:", 410, 125);
  ctx.font = "18px Impact";
  ctx.fillText("-Left click: reveal", 410, 165);
  ctx.fillText("-Right click: flag", 410, 205);
  ctx.fillText("-r: restart", 410, 245);
}

function check(){
  state=3;
  for(var i=0; i<cols; ++i){
    for(var j=0; j<rows; ++j){
      if(!b.array[i][j].bomb && !b.array[i][j].state){
        state = 1;
      }
    }
  }
}
