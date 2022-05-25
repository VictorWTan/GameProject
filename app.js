// Define variables for everything I need


let canvasOne = document.getElementById('canvas-1')
let ctxOne = canvasOne.getContext('2d')
let canvasTwo = document.getElementById('canvas-2')
let ctxTwo = canvasTwo.getContext('2d')
// Creating images for each variable
let platformSmall = new Image()
let longPlatform = new Image()
let longFloor = new Image()
let lamp = new Image()
let playerChar = new Image()
let backgroundLayerTwo = new Image()
let backgroundLayerThree = new Image()
let tinyPlatform = new Image()
let imageObj = new Image()
let playerCharRunRight = new Image()
let playerCharRunLeft = new Image()
let playerCharLeft = new Image()
let lava = new Image()

// Linking each image to the relative path
tinyPlatform.src = 'stringstar fields/platformtiny.png'
backgroundLayerTwo.src = 'stringstar fields/background_1.png'
backgroundLayerThree.src = 'stringstar fields/background_2.png'
lamp.src = '/oak_woods_v1.0/decorations/lamp.png'
longFloor.src = 'stringstar fields/floor.png'
longPlatform.src = '/oak_woods_v1.0/longPlatform.png'
platformSmall.src = 'stringstar fields/smallPlatform.png'
playerChar.src = 'oak_woods_v1.0/herochar sprites(new)/herochar_idle_anim_strip_4.png'
playerCharRunRight.src = 'oak_woods_v1.0/herochar sprites(new)/herochar_run_anim_strip_6.png'
playerCharRunLeft.src = 'oak_woods_v1.0/herochar sprites(new)/herochar_run_anim_strip_6_left.png'
playerCharLeft.src = 'oak_woods_v1.0/herochar sprites(new)/herochar_idle_anim_strip_4_left.png'
lava.src = 'stringstar fields/Lava_64x32.png'

canvasOne.width = 900
canvasOne.height = 600
const gravity = .08
let onPlatform = false;
let frames = 0
let gameFrame = 0
const staggerFrames = 22
let scrollOffset = 0


// Creating a player with all properties 
class Player {
    constructor(){
        // Setting the position of the player
        this.x = 100
        this.y = 100
        // Giving dimensions to the character
        this.width = 40
        this.height = 40
        this.image = playerChar
        this.sprites = {
            stand: {
                right: playerChar,
                left: playerCharLeft
            },
            run: {
                right: playerCharRunRight,
                left: playerCharRunLeft
            }
        }
        this.currentSprite = this.sprites.stand.right
        // Give the character velocity for moving directionally
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    // Create a function to render the player onto the canvas
    render(){
        // Fill a rectangle at the position x, y with width, height dimensions.
        ctxOne.drawImage(
            this.currentSprite, 
            16 * frames,
            0, 
            16, 
            16, 
            this.x,
            this.y,
            this.width, 
            this.height)
    }
    // Updating the player's movement over time
    update(){
        if (gameFrame %  staggerFrames == 0){
            if (frames < 3) frames++
            else frames = 0
        }
        gameFrame++
        // Invoking the render function to render character over time
        this.render()
        // Causing to move the player in a direction
        this.y += this.velocity.y
        this.x += this.velocity.x
        // Add gravity aka acceleration
        if (this.y + this.height + this.velocity.y <= canvasOne.height) this.velocity.y += gravity
        
    }
}

class Platform {
    // Taking in a position and image for each platform
    constructor(x, y, image) {
        this.x = x
        this.y = y
        this.width = image.width
        this.height = image.height
        this.image = image
    }
    // Render each platform at x, y with height and width equal to the image's dimensions
    render(){
        ctxOne.drawImage(this.image, this.x, this.y)
    }
}

class Scenery {
    // Take an image for background scenery
    constructor(x, y, image) {
        this.x = x
        this.y = y
        this.width = 900
        this.height = 600
        this.image = image
    }
    render(){
        ctxOne.drawImage(this.image, this.x, this.y)
    }
}

class Obstacle {
    constructor(x, y, width, height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    render(){
        ctxOne.fillStyle = 'red'
        ctxOne.fillRect(this.x, this.y, this.width, this.height)
    }
}

let myPlayer = new Player()
let newObstacle = new Obstacle(2060, 350, 20, 20)
let platforms = [
    new Platform(690, 450, platformSmall), 
    new Platform(1030, 400, platformSmall),
    new Platform(1350, 340, platformSmall),
    new Platform(300, 520, longFloor), 
    new Platform(156, 520, longFloor), 
    new Platform(12, 520, longFloor), 
    new Platform(-132, 520, longFloor), 
    new Platform(-276, 520, longFloor), 
    new Platform(1700, 400 , tinyPlatform), 
    new Platform(2060, 460 , tinyPlatform),
    new Platform(2400, 500 , tinyPlatform),
    new Platform(2650, 350 , tinyPlatform),
    new Platform(2960, 460 , tinyPlatform),
]
let newScenery = [
    new Scenery(0, 420, backgroundLayerTwo),
    new Scenery(288, 420, backgroundLayerTwo), 
    new Scenery(-288, 420, backgroundLayerTwo), 
    new Scenery(576, 420, backgroundLayerTwo), 
    new Scenery(864, 420, backgroundLayerTwo),
    new Scenery(1152, 420, backgroundLayerTwo)
]
let newSceneryTwo = [
    new Scenery(0, 420, backgroundLayerThree), 
    new Scenery(288, 420, backgroundLayerThree), 
    new Scenery(-288, 420, backgroundLayerThree), 
    new Scenery(576, 420, backgroundLayerThree), 
    new Scenery(864, 420, backgroundLayerThree),
    new Scenery(1440, 420, backgroundLayerThree),
    new Scenery(1152, 420, backgroundLayerThree),
    new Scenery(1684, 420, backgroundLayerThree),
    new Scenery(1928, 420, backgroundLayerThree),
    new Scenery(2172, 420, backgroundLayerThree),
]

let newLava = [
    new Scenery(440, 570, lava),
    new Scenery(952, 570, lava),
    new Scenery(1464, 570, lava),
    new Scenery(1976, 570, lava),
    new Scenery(2488, 570, lava),
    new Scenery(3000, 570, lava),
    new Scenery(3512, 570, lava)
]

// Storing values for the state of key presses
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },  
    up: {
        pressed: true
    }
}


// Create objects
function init() {
    myPlayer = new Player()
    newObstacle = new Obstacle(2060, 350, 20, 20)
    platforms = [
        new Platform(690, 450, platformSmall), 
        new Platform(1030, 400, platformSmall),
        new Platform(1350, 340, platformSmall),
        new Platform(300, 520, longFloor), 
        new Platform(156, 520, longFloor), 
        new Platform(12, 520, longFloor), 
        new Platform(-132, 520, longFloor), 
        new Platform(-276, 520, longFloor), 
        new Platform(1700, 400 , tinyPlatform), 
        new Platform(2060, 460 , tinyPlatform),
        new Platform(2400, 500 , tinyPlatform),
        new Platform(2650, 350 , tinyPlatform),
        new Platform(2960, 460 , tinyPlatform),
    ]
    newScenery = [
        new Scenery(0, 420, backgroundLayerTwo),
        new Scenery(288, 420, backgroundLayerTwo), 
        new Scenery(-288, 420, backgroundLayerTwo), 
        new Scenery(576, 420, backgroundLayerTwo), 
        new Scenery(864, 420, backgroundLayerTwo),
        new Scenery(1152, 420, backgroundLayerTwo)
    ]
    newSceneryTwo = [
        new Scenery(0, 420, backgroundLayerThree), 
        new Scenery(288, 420, backgroundLayerThree), 
        new Scenery(-288, 420, backgroundLayerThree), 
        new Scenery(576, 420, backgroundLayerThree), 
        new Scenery(864, 420, backgroundLayerThree),
        new Scenery(1440, 420, backgroundLayerThree),
        new Scenery(1152, 420, backgroundLayerThree),
        new Scenery(1684, 420, backgroundLayerThree),
        new Scenery(1928, 420, backgroundLayerThree),
        new Scenery(2172, 420, backgroundLayerThree),
    ]

    newLava = [
        new Scenery(440, 570, lava),
        new Scenery(952, 570, lava),
        new Scenery(1464, 570, lava),
        new Scenery(1976, 570, lava),
        new Scenery(2488, 570, lava),
        new Scenery(3000, 570, lava),
        new Scenery(3512, 570, lava)
    ]

}   

const animate = () => {
    // Calls on itself to constantly animate the player
    requestAnimationFrame(animate)
    // Clear the canvas that was previously rendered on
    ctxOne.clearRect(0, 0, canvasOne.width, canvasOne.height)
    newScenery.forEach(scenery => {
        scenery.render()
    })
    newSceneryTwo.forEach(scenery => {
        scenery.render()
    })
    
    platforms.forEach(platform => {
        platform.render()
    })
    newLava.forEach(lava => {
        lava.render()
    })
    myPlayer.update()
    newObstacle.render()
    // If the right key is held, the player moves to the right
    if (keys.right.pressed && myPlayer.x < 400) myPlayer.velocity.x = 2
    // If the left key is held, the player moves to the left
    else if (keys.left.pressed && myPlayer.x > 100) myPlayer.velocity.x = -2
    // Otherwise, the character is not moving
    else {
        myPlayer.velocity.x = 0
        // If the player presses the right key, we simulate scrolling by moving platforms and scenery
        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform =>  platform.x -= 2)
            newLava.forEach(lava => lava.x -= 2)
            newScenery.forEach(scenery => scenery.x -= .5 )    
            newSceneryTwo.forEach(scenery => scenery.x -= 1 ) 
            
        }
        // If the player presses left key, we simulate scrolling by moving platforms and scenery to the left
        else if (keys.left.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => platform.x += 2)
            newLava.forEach(lava => lava.x += 2)
            newScenery.forEach(scenery => scenery.x += .5 )
            newSceneryTwo.forEach(scenery => scenery.x += 1 ) 
            
        }
    }
    
    
    // If the bottom of player hits the platform, the player stops moving. If they go to the edge, they fall off.
    platforms.forEach(platform =>  {
        if (myPlayer.y + myPlayer.height <= platform.y && 
            myPlayer.y + myPlayer.height + myPlayer.velocity.y >= platform.y && 
            myPlayer.x + myPlayer.width >= platform.x && 
            myPlayer.x <= platform.x + platform.width) 
            {
            myPlayer.velocity.y = 0
        }

    })
    if(myPlayer.velocity.y === 0) keys.up.pressed = true

    // Lose condtion
    if(myPlayer.y > canvasOne.height) init()
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
        myPlayer.currentSprite = myPlayer.sprites.run.left
        break
        case 83: case 40:
        console.log('down')
        break
        case 68: case 39:
        console.log('right')
        keys.right.pressed = true
        myPlayer.currentSprite = myPlayer.sprites.run.right
        break
        case 38: case 87:
        if(keys.up.pressed) {
            myPlayer.velocity.y += -6 
            keys.up.pressed = false
        }
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
        myPlayer.currentSprite = myPlayer.sprites.stand.left
        break
        case 83: case 40:
        console.log('down')
        break
        case 68: case 39:
        console.log('right')
        keys.right.pressed = false
        myPlayer.currentSprite = myPlayer.sprites.stand.right
        myPlayer.velocity.x = 0
        break
        case 38: case 87:
        myPlayer.velocity.y = 0
        console.log('up')
        break
    }
})