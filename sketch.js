/**
 * Resources to check out:
 * https://forum.processing.org/two/discussion/15667/traffic-light-simulation
 * https://forum.processing.org/two/discussion/23784/simulating-traffic-movement-pedestrian-movement
 * */

let modules = []
const gridSize = 10

let buildMode = 'road'
let grid
let cars = []

const generateRoads = (blocks) => {
  // pick random blocks
  // for selected blocks:
  //    pick a direction up, down, left, right
  //    find the blocks extensions for the direction (blocks that are up, down, left, right)
  //    set block and extensions to isRoad

  // // maybe reduce is not usable in this JS version
  // const selectedBlocks = [...blocks].reduce((val, acc) => {
  //   const select = random() > 0.9 // 10% chance
  //   if (select) {
  //     return [...acc, val]
  //   }
  //   return acc
  // }, [])

  const selectedBlocks = []
  for(let i = 0; i < blocks.length; i++) {
    const select = random() > 0.95 // 5% chance
      if (select) {
        selectedBlocks.push(blocks[i])
      }
  }
  console.log('selectedBlocks', selectedBlocks)

  selectedBlocks.forEach(block => {
    // pick a random direction (up, down, left, right)
    const direction = directions[floor(random(directions.length))]
    console.log('direction', direction)
    const extensions = blocks.filter(b => {
      switch (direction) {
        case 'up':
          // row (x) smaller or equal, column (y) equal
          return b.coords.x <= block.coords.x && b.coords.y === block.coords.y
        case 'down':
          // row (x) greater or equal, column (y) equal
          return b.coords.x >= block.coords.x && b.coords.y === block.coords.y
        case 'left':
          // row (x) equal, column (y) smaller or equal
          return b.coords.x === block.coords.x && b.coords.y <= block.coords.y
        case 'right':
          // row (x) equal, column (y) greater or equal
          return b.coords.x === block.coords.x && b.coords.y >= block.coords.y
      }
    })

    console.log(extensions)

    extensions.forEach(block => block.isRoad = true)
  })
}

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

  grid = new Grid(0,0, gridSize, width)
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

  // generateRoads(grid.blocks)
  //
  // // place random cars
  // grid.blocks.forEach(block => {
  //   if (block.isRoad && random() > 0.9) {
  //     cars.push(new Car(block))
  //   }
  // })

  frameRate(10)
}

draw = () => {
  background(0, 200)

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
    car.update()
  })
}

function clickBlock(e) { // e is click event
  const clickedBlock = grid.blocks.find(b => {
    return b.x <= e.x
      && b.x + b.s >= e.x
      && b.y <= e.y
      && b.y + b.s >= e.y
  })
  if (clickedBlock) {
    switch (buildMode) {
      case 'road':
        clickedBlock.isRoad = true;
        break;
      case 'road-destroy':
        clickedBlock.isRoad = false;
        break;
      case 'car':
        if (clickedBlock.isRoad ) {
          cars.push(new Car(clickedBlock));
          console.log(`Number of cars on the road: ${cars.length}`)
        }
        break
    }
  }
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
