// Define variables for everything I need
let canvasOne = document.getElementById('canvas-1')
let ctxOne = canvasOne.getContext('2d')
canvasOne.width = innerWidth
canvasOne.height = innerHeight
const gravity = 1.5

// Creating a player with all properties 
class Player {
    constructor(width, height){
        // Setting the position of the player
        this.x = 100
        this.y = 100
        // Giving dimensions to the character
        this.width = width
        this.height = height
        // Give the character velocity for moving directionally
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    // Create a function to render the player onto the canvas
    render(){
        // Fill a rectangle at the position x, y with width, height dimensions.
        ctxOne.fillStyle = 'lavender'
        ctxOne.fillRect(this.x, this.y, this.width, this.height)
    }
    // Updating the player's movement over time
    update(){
        // Invoking the render function to render character over time
        this.render()
        // Causing to move the player in a direction
        this.y += this.velocity.y
        this.x += this.velocity.x
        // Add gravity aka acceleration
        if (this.y + this.height + this.velocity.y <= canvasOne.height) this.velocity.y += gravity
        // If this player's position goes to the bottom of the canvas, the player stops moving
        else this.velocity.y = 0

    }
}

class Platform {
    constructor() {
        this.x = 200
        this.y = 200
        this.width = 200
        this.height = 10
    }
    
    render(){
        ctxOne.fillStyle = 'red'
        ctxOne.fillRect(this.x, this.y, this.width, this.height)
    }
}

// Create objects
const aPlatform = new Platform()
const myPlayer = new Player(30, 60)


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }  
}

const animate = () => {
    // Calls on itself to constantly animate the player
    requestAnimationFrame(animate)
    // Clear the canvas that was previously rendered on
    ctxOne.clearRect(0, 0, canvasOne.width, canvasOne.height)
    myPlayer.update()
    aPlatform.render()
    // If the right key is held, the player moves to the right
    if (keys.right.pressed) myPlayer.velocity.x = 5
    // If the left key is held, the player moves to the left
    else if (keys.left.pressed) myPlayer.velocity.x = -5
    // Otherwise, the character is not moving
    else myPlayer.velocity.x = 0
    
    // If the bottom of player hits the platform, the player stops moving
    if (myPlayer.y + myPlayer.height <= aPlatform.y && myPlayer.y + myPlayer.height + myPlayer.velocity.y >= aPlatform.y && myPlayer.x + myPlayer.width >= aPlatform.x && myPlayer.x <= aPlatform.x + aPlatform.width ) myPlayer.velocity.y = 0
}


animate()

// Add event listeners
// Add event listener for movement direction
addEventListener('keydown', ({keyCode}) => {
    //console.log(keyCode)
    switch(keyCode){
        case 65: case 37:
        console.log('left')
        keys.left.pressed = true
        break
        case 83: case 40:
        console.log('down')
        break
        case 68: case 39:
        console.log('right')
        keys.right.pressed = true
        myPlayer.velocity.x += 1
        break
        case 38: case 87:
        myPlayer.velocity.y += -20
        console.log('up')
        break
    }
})
// Add event listener for when keys are let go
addEventListener('keyup', ({keyCode}) => {
    //console.log(keyCode)
    switch(keyCode){
        case 65: case 37:
        console.log('left')
        keys.left.pressed = false
        break
        case 83: case 40:
        console.log('down')
        break
        case 68: case 39:
        console.log('right')
        keys.right.pressed = false
        myPlayer.velocity.x = 0
        break
        case 38: case 87:
        myPlayer.velocity.y += -20
        console.log('up')
        break
    }
})