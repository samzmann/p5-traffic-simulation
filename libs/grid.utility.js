/** ** ** ** ** ** ** ** ** ** ** ** ** ** **

Utility for a square grid (1x1, 2x2, etc...)

Parameters:
   - x: x position of the grid (top left corner)
   - y: y position of the grid (top left corner)
   - rc: number of rows, number of columns
   - size: width and height of the grid

Access blocks (or cells) in this.blocks array.

** Samuel Mann, 16/01/2018 **

** ** ** ** ** ** ** ** ** ** ** ** ** ** **/


function Grid(x, y, rc, size){
   this.x = x;
   this.y = y;
   this.rc = rc;
   this.blocks = [];

   // loops over each element in this.blocks, calls the callback with `i` each time.
   this.forEachBlock = (callback) => {
      for (let i = 0; i < this.blocks.length; i++) {
         callback(i)
      }
   }

   for (let i = 0; i < rc; i++) {
      const posY = i * (size / rc);
      for (let j = 0; j < rc; j++) {
         const posX = j * (size/rc);
         console.log('---------')
         console.log(posX, posY)
         console.log(i + 1, j + 1)
         this.blocks.push(new Block(posX, posY, size/rc, i + 1, j + 1));
      }
   }

   this.forEachBlock((i) => {
      this.blocks[i].computeNeighbors(this.blocks)
   })
}

function Block(x, y, s, row, column){
   this.x = x;
   this.y = y;
   this.s = s;
   this.coords = createVector(row, column);

   this.neighbors = {}

   this.computeNeighbors = function(array){
      this.neighbors.up = array.find(e => (e.coords.y == this.coords.y) && (e.coords.x == this.coords.x-1))
      this.neighbors.down = array.find(e => (e.coords.y == this.coords.y) && (e.coords.x == this.coords.x+1))
      this.neighbors.left = array.find(e => (e.coords.x == this.coords.x) && (e.coords.y == this.coords.y-1))
      this.neighbors.right = array.find(e => (e.coords.x == this.coords.x) && (e.coords.y == this.coords.y+1))
   }
}
