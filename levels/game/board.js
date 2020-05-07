class board{
    constructor(rows, cols){
        this.array = new Array (cols);
        for(var i=0; i<cols; ++i){
          this.array[i] = new Array(rows);
        }
    }
}
