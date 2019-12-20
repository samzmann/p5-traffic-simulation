let modules = []

let buildMode = 'road'
let grid
let cars = []

setup = () => {
  const canvas = createCanvas(500, 500)

  const buildRoadBtn = createButton('Build road');
  buildRoadBtn.position(0, canvas.height + 20);
  buildRoadBtn.mousePressed(() => { buildMode = 'road'});

  const destroyRoadBtn = createButton('Destroy road');
  destroyRoadBtn.position(0, canvas.height + 40);
  destroyRoadBtn.mousePressed(() => { buildMode = 'road-destroy'});

  const buildCarBtn = createButton('Build car');
  buildCarBtn.position(buildRoadBtn.x + buildRoadBtn.width + 20, canvas.height + 20);
  buildCarBtn.mousePressed(() => { buildMode = 'car'});

  grid = new Grid(0,0, 50, width)
  fill(255,0,55)
  grid.forEachBlock((i) => {
    const b = grid.blocks[i]
    // if (random() > .1) {
    //   b.isRoad = true
    // }
    // if (random() > .99) {
    //   b.isRoad = true
    //   cars.push(new Car(b))
    // }
    rect(b.x, b.y, b.s, b.s)
  })
  console.log(grid)

  frameRate(10)
}

draw = () => {
  background(0, 150)

  const mouse = createVector(mouseX, mouseY)

  grid.forEachBlock((i) => {
    const b = grid.blocks[i]

    if (b.isRoad) {
      noFill()
    } else {
      fill(255,0,55)
    }

    rect(b.x, b.y, b.s, b.s)
  })

  cars.forEach(car => {
    car.show()
    // if (!car.isMoving) {
      car.update()
    // }
  })
}

let debounce = false
function clickBlock(e) { // e is click event
  if (debounce) {
    return
  }

  debounce = true
  const clickedBlock = grid.blocks.find(b => {
    return b.x <= e.x
      && b.x + b.s >= e.x
      && b.y <= e.y
      && b.y + b.s >= e.y
  })
  if (clickedBlock) {
    if (buildMode === 'road') {
      clickedBlock.isRoad = true
    } else if (buildMode === 'road-destroy') {
      clickedBlock.isRoad = false
    } else if (buildMode === 'car' && clickedBlock.isRoad ) {
      cars.push(new Car(clickedBlock))
      console.log(`Number of cars on the road: ${cars.length}`)
    }
  }
  setTimeout(() => {
    debounce = false
  }, 100)
}

function mousePressed(e) {
  clickBlock(e)
}

function mouseDragged(e) {
  clickBlock(e)
}

// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}
function strokeHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}
