// Define variables for everything I need
let canvasOne = document.getElementById('canvas-1')
let ctxOne = canvasOne.getContext('2d')

// Creating a player with all properties 
class Player {
    constructor(width, height){
        // Setting the position of the player
        this.x = 100
        this.y = 100
        // Giving dimensions to the character
        this.width = width
        this.height = height
    }
    // Create a function to render the player onto the canvas
    render(){
        // Fill a rectangle at the position x, y with width, height dimensions.
        ctxOne.fillRect(this.x, this.y, this.width, this.height)
    }
}

const myPlayer = new Player(100, 100)
myPlayer.render()
