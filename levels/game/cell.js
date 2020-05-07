class cell{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.w = 18*z;
    this.l = 18*z;
    if(Math.random(1)>0.9){
          this.bomb = true;
          ++bombs;
    } else {
          this.bomb = false;
    }
    this.state = false;
    this.n = 0;
    this.flag = false;
  }

  is_inside(x,y){
    return ((x>this.x)&&(x<this.x+this.w)) && ((y>this.y)&&(y<this.y+this.w))
  }

  number(other){
    if(other.bomb == true){
        ++this.n;
       }
  }

  sketch(){
    if(this.state){
      if(this.bomb){
        Image_(this.x,this.y)
      } else {
        ctx.beginPath ();
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.w, this.l);
        ctx.closePath ();
        if(this.n != 0){
        //print this.n
        ctx.beginPath ();
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.w, this.l);
        ctx.font = "17px Impact";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(this.n, this.x+5, this.y+15);
        ctx.closePath ();
        }
      }
    } else if(this.flag){
       //print flag
       ctx.beginPath ();
       ctx.fillStyle = "#000000";
       ctx.fillRect(this.x, this.y, this.w, this.l);
       ctx.closePath ();
       Image(this.x,this.y)
    } else{
      ctx.beginPath ();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(this.x, this.y, this.w, this.l);
      ctx.closePath ();
    }
  }
}
