function Car(initialBlock){

  this.block = initialBlock
  this.blockHistory = [initialBlock]

  this.heading = 'up' // up, down, left, right
  this.isMoving = false

  const fillHue = random(360)

  const headingFrom = (heading) => {
    switch (heading) {
      case 'up':
        return 'down'
      case 'down':
        return 'up'
      case 'left':
        return 'right'
      case 'right':
        return 'left'
      default:
        return 'down'
    }
  }

  this.update = () => {
    let foundNextBlock = false
    this.isMoving = true

    this.block.isOccupied = false

    const previousBlock = this.blockHistory[this.blockHistory.length - 1]
    this.blockHistory.push(this.block)

    const switchDirection = random() > 0.8 // 20% chance of randomly changing direction

    if (switchDirection) {
      const randomIndex = floor(random(directions.length))
      this.heading = directions[randomIndex]
    }

    if (this.block.neighbors[this.heading] && this.block.neighbors[this.heading].isRoad && !this.block.neighbors[this.heading].isOccupied) {
      this.block = this.block.neighbors[this.heading]
      foundNextBlock = true
    } else {
      const neighbors = Object.keys(this.block.neighbors).filter(e => this.block.neighbors[e] !== undefined)

      for (let i = 0; i < neighbors.length; i++) {
        const block = this.block.neighbors[neighbors[i]]
        if (block) {

          const isPreviousBlock = !!previousBlock && (block.coords.x === previousBlock.coords.x && block.coords.y === previousBlock.coords.y)

          if (!isPreviousBlock && block.isRoad && !foundNextBlock) {
            this.block = block
            this.heading = neighbors[i] // string: up, down, etc...
            foundNextBlock = true
            break;
          }
        }
      }

      if (!foundNextBlock && previousBlock) {

        this.block = previousBlock
        this.heading = headingFrom(this.heading) // reverse direction
      }


    }

    this.block.isOccupied = true

    // setTimeout(() => {
    //   this.update()
    // }, 100)
  }

  this.show = (lineCoordinates) => {
    fillHsluv(fillHue,100,100)
    const b = this.block
    rect(b.x, b.y, b.s, b.s)
  }
}
