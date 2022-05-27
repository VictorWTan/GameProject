// Define variables for the canvas

let canvasOne = document.getElementById('canvas-1')
let ctxOne = canvasOne.getContext('2d')
let myAudio = document.querySelector('#myAudio')
let startButton = document.getElementById('start-button')
let startScreen = document.getElementById('start-screen')
let startAudio = document.getElementById('start-audio')
let musicButton = document.getElementById('music-button')
let endScreen = document.getElementById('end-screen')
let restartButton = document.getElementById('restart-button')
myAudio.volume = 0.05
startAudio.volume = 0.05


const playMusic = () => {
    startAudio.play()
}

const startGame = () => {
    startScreen.style.display = 'none'
    canvasOne.style.display = 'flex'
    startAudio.pause()
    myAudio.play()
    gameStart = false;
}

startButton.addEventListener('click', startGame)
musicButton.addEventListener('click', playMusic)

const gameEnd = () => {
    canvasOne.style.display ='none'
    endScreen.style.display = 'flex'
    myAudio.pause()
    gameStart = false
    gameOver = true
}

const reloadGame = () => {
    location.reload()
}

restartButton.addEventListener('click', reloadGame)



// Creating images for each variable
let platformSmall = new Image()
let longFloor = new Image()
let playerChar = new Image()
let backgroundLayerTwo = new Image()
let backgroundLayerThree = new Image()
let tinyPlatform = new Image()
let imageObj = new Image()
let playerCharRunRight = new Image()
let playerCharRunLeft = new Image()
let playerCharLeft = new Image()
let lava = new Image()
let slope = new Image()
let slopeFloor = new Image()
let tallTower = new Image()
let stairSlopeRight = new Image()
let basePlatform = new Image()
let endHouse = new Image()
let door = new Image()
let flame = new Image()
let shield = new Image()
let miscObjects = new Image()

// Linking each image to the relative path
tinyPlatform.src = 'stringstar fields/platformtiny.png'
backgroundLayerTwo.src = 'stringstar fields/background_1.png'
backgroundLayerThree.src = 'stringstar fields/background_2.png'
longFloor.src = 'stringstar fields/floor.png'
platformSmall.src = 'stringstar fields/smallPlatform.png'
playerChar.src = 'oak_woods_v1.0/herochar sprites(new)/herochar_idle_anim_strip_4.png'
playerCharRunRight.src = 'oak_woods_v1.0/herochar sprites(new)/herochar_run_anim_strip_6.png'
playerCharRunLeft.src = 'oak_woods_v1.0/herochar sprites(new)/herochar_run_anim_strip_6_left.png'
playerCharLeft.src = 'oak_woods_v1.0/herochar sprites(new)/herochar_idle_anim_strip_4_left.png'
lava.src = 'stringstar fields/Lava_64x32.png'
slope.src = 'stringstar fields/slope.png'
slopeFloor.src = 'stringstar fields/slopeFloor.png'
tallTower.src = 'stringstar fields/tallTower.png'
stairSlopeRight.src = 'stringstar fields/stairSlopeRight.png'
basePlatform.src = 'stringstar fields/basePlatform.png'
endHouse.src = 'stringstar fields/endHouse.png'
door.src = 'stringstar fields/door.png'
flame.src = 'stringstar fields/flame.png'
shield.src = 'stringstar fields/shield.png'
miscObjects.src = 'stringstar fields/miscObjects.png'

// Setting Global Variables
canvasOne.width = 900
canvasOne.height = 600
const gravity = 1.2
let frames = 0
let gameFrame = 0
const staggerFrames = 8
let gameStart = true
let gameOver = false
let onPlatform = true


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
        else init()
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

// Creating all the objects
let platforms = [
    new Platform(690, 430, platformSmall), 
    new Platform(1050, 340, tallTower),
    new Platform(2600, 200, platformSmall),
    new Platform(1355, 560, stairSlopeRight),
    new Platform(-900, 520, basePlatform), 
    new Platform(4250, 576, basePlatform), 

    new Platform(910, 190 , tinyPlatform),
    new Platform(1240, 110 , tinyPlatform),
    new Platform(1635, 170 , tinyPlatform),
    new Platform(1800, 550, slopeFloor),
    new Platform(2110, 460 , tinyPlatform),
    new Platform(2210, 420 , tinyPlatform),
    new Platform(2310, 380 , tinyPlatform),
    new Platform(2700, 230 , tinyPlatform),
    new Platform(2750, 260 , tinyPlatform),
    new Platform(2800, 290 , tinyPlatform),
    new Platform(3020, 460 , longFloor),
    new Platform(3395, 253 , tinyPlatform),
    
    new Platform(3795, 300, platformSmall),
    new Platform(3891, 300, platformSmall),
]
let newScenery = [
    new Scenery(-576, 420, backgroundLayerTwo),
    new Scenery(0, 420, backgroundLayerTwo),
    new Scenery(288, 420, backgroundLayerTwo), 
    new Scenery(-288, 420, backgroundLayerTwo), 
    new Scenery(576, 420, backgroundLayerTwo), 
    new Scenery(864, 420, backgroundLayerTwo),
    new Scenery(1152, 420, backgroundLayerTwo),
    new Scenery(1440, 420, backgroundLayerTwo)
]
let newSceneryTwo = [
    new Scenery(-864, 420, backgroundLayerThree),
    new Scenery(-576, 420, backgroundLayerThree),
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
    new Scenery(2416, 420, backgroundLayerThree),
    new Scenery(2660, 420, backgroundLayerThree),
]

let newLava = [
    new Scenery(-1297, 570, lava),
    new Scenery(-785, 570, lava),
    new Scenery(-273, 570, lava),
    new Scenery(239, 570, lava),
    new Scenery(440, 570, lava),
    new Scenery(952, 570, lava),
    new Scenery(1464, 570, lava),
    new Scenery(1976, 570, lava),
    new Scenery(2488, 570, lava),
    new Scenery(3000, 570, lava),
    new Scenery(3512, 570, lava),
    new Scenery(4024, 570, lava),
    new Scenery(4536, 570, lava),
    new Scenery(4250, 0, endHouse),
    new Scenery(4400, 220, flame),
    new Scenery(4600, 506, door),
    new Scenery(4630, 306, flame),
    new Scenery(4800, 406, flame),
    new Scenery(5060, 250, flame),
    new Scenery(4400, 460, shield),

]

let myPlayer = new Player()

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

let scrollOffset = 0


// On death, reset the position of everything
function init() {

platforms = [
    new Platform(690, 430, platformSmall), 
    new Platform(1050, 340, tallTower),
    new Platform(2600, 200, platformSmall),
    new Platform(1355, 560, stairSlopeRight),
    new Platform(-900, 520, basePlatform), 
    new Platform(4250, 576, basePlatform), 

    new Platform(910, 190 , tinyPlatform),
    new Platform(1240, 110 , tinyPlatform),
    new Platform(1635, 170 , tinyPlatform),
    new Platform(1800, 550, slopeFloor),
    new Platform(2110, 460 , tinyPlatform),
    new Platform(2210, 420 , tinyPlatform),
    new Platform(2310, 380 , tinyPlatform),
    new Platform(2700, 230 , tinyPlatform),
    new Platform(2750, 260 , tinyPlatform),
    new Platform(2800, 290 , tinyPlatform),
    new Platform(3020, 460 , longFloor),
    new Platform(3395, 253 , tinyPlatform),
    
    new Platform(3795, 300, platformSmall),
    new Platform(3891, 300, platformSmall),
]
newScenery = [
    new Scenery(-576, 420, backgroundLayerTwo),
    new Scenery(0, 420, backgroundLayerTwo),
    new Scenery(288, 420, backgroundLayerTwo), 
    new Scenery(-288, 420, backgroundLayerTwo), 
    new Scenery(576, 420, backgroundLayerTwo), 
    new Scenery(864, 420, backgroundLayerTwo),
    new Scenery(1152, 420, backgroundLayerTwo),
    new Scenery(1440, 420, backgroundLayerTwo)
]
newSceneryTwo = [
    new Scenery(-864, 420, backgroundLayerThree),
    new Scenery(-576, 420, backgroundLayerThree),
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
    new Scenery(2416, 420, backgroundLayerThree),
    new Scenery(2660, 420, backgroundLayerThree),
]

newLava = [
    new Scenery(-1297, 570, lava),
    new Scenery(-785, 570, lava),
    new Scenery(-273, 570, lava),
    new Scenery(239, 570, lava),
    new Scenery(440, 570, lava),
    new Scenery(952, 570, lava),
    new Scenery(1464, 570, lava),
    new Scenery(1976, 570, lava),
    new Scenery(2488, 570, lava),
    new Scenery(3000, 570, lava),
    new Scenery(3512, 570, lava),
    new Scenery(4024, 570, lava),
    new Scenery(4536, 570, lava),
    new Scenery(4250, 0, endHouse),
    new Scenery(4400, 220, flame),
    new Scenery(4600, 506, door),
    new Scenery(4630, 306, flame),
    new Scenery(4800, 406, flame),
    new Scenery(5060, 250, flame),
    new Scenery(4400, 460, shield),
]
    myPlayer = new Player()
    scrollOffset = 0

}   

let fps = 60

const animate = () => {
    // Calls on itself to constantly animate the player
    setTimeout(function(){
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
    if(gameStart === false)myPlayer.update()
    
    // If the right key is held, the player moves to the right
    if (keys.right.pressed && myPlayer.x < 450) myPlayer.velocity.x = 8
    // If the left key is held, the player moves to the left
    else if (keys.left.pressed && myPlayer.x > 200) myPlayer.velocity.x = -8
    // Otherwise, the character is not moving
    else {
        myPlayer.velocity.x = 0
        // If the player presses the right key, we simulate scrolling by moving platforms and scenery
        if (keys.right.pressed) {
            scrollOffset += 8
            platforms.forEach(platform =>  platform.x -= 8)
            newLava.forEach(lava => lava.x -= 8)
            newScenery.forEach(scenery => scenery.x -= 2 )    
            newSceneryTwo.forEach(scenery => scenery.x -= 4 ) 
            
        }
        // If the player presses left key, we simulate scrolling by moving platforms and scenery to the left
        else if (keys.left.pressed) {
            scrollOffset -= 8
            platforms.forEach(platform => platform.x += 8)
            newLava.forEach(lava => lava.x += 8)
            newScenery.forEach(scenery => scenery.x += 2 )
            newSceneryTwo.forEach(scenery => scenery.x += 4 ) 
            
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
            onPlatform = true
        }

    })
    if(myPlayer.velocity.y === 0) keys.up.pressed = true

    //Win Condition
    if (scrollOffset > 16400) {}

    

    // Lose condtion
    //if(myPlayer.y > canvasOne.height) init()
}, 1000/fps)
}

let changeInterval = null;

// Add event listeners
// Add event listener for movement direction
addEventListener('keydown', ({keyCode}) => {
    //console.log(keyCode)
    switch(keyCode){
        // If the a button is pressed, the running animation gets set 
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
        if(keys.up.pressed && onPlatform) {
            myPlayer.velocity.y += -25 
            keys.up.pressed = false
            onPlatform = false
        }
        console.log('up')
        break
    }
})
// Add event listener for when keys are let go
addEventListener('keyup', ({keyCode}) => {
    // console.log(keyCode)
    // When the key is let go, the player by default is standing left or right
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

animate()