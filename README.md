# Game Project
### <ins>**Game Project Inspiration**</ins>

Welcome to my game! My game is inspired by the games Maplestory and Jump King, which are platformers. One aspect of Maplestory are their jump quests, where your character would jump from small platform to platform trying not to fall down. There are obstacles like spikes and that hurt the player and push them off. The game is meant to be grueling and a time sink where the player tries their hardest to jump passed all obstacles and finally reach the trophy only to fall down over and over again! Neat!

![Maplestory Jump Quest](https://preview.redd.it/fb52pq65m8qx.png?width=1024&auto=webp&s=7682809818d8681f266e727c22bb61c923f7d337)
![Jump King](https://nexile.se/wp-content/uploads/2019/04/Jump_King_screenshot_6.png)



### <ins>**Initial Game Approach**</ins>
 My start screen will need a normal character starting behind a start screen div
 Instructions will be posted into the background as text
 Text will stay with the background container as to not move as the character moves

 Pressing any key will cause the start container to fade and player can put in inputs
I will need to implement some system for gravity
 Player will be able to move left and right
As the player moves right the playing screen div moves according to character position
Create rectangle object to register as the character

 Platforms will need to be created as rectangles and when the player jumps and touches the top of the platform, it will register them as on top and not let them fall
If the player jumps and does not have the bottom border of the rectangle touching the platform the block does not interfere

If a block has an element of an obstacle, the character will flash in color indicating that it's hurt and it's movement will be affected (bounced to the side)
 If a block has an element of a ladder, gravity function will be suspended and side inputs will be disabled. Once player inputs jump with side directional key, they will jump off the ladder
 When the trophy is picked up, they will conclude the game

 For each block with id of platform, ladder, trophy, obstacle or player match the pixel width and height to images of assets
 Instead of score system, have blocks designated as NPC's that just exist and occasionally say things about how the player will not reach the top

### <ins>**Pseudo Code**</ins>
 <ins>HTML Portion</ins>
 
 Create a start title container
 
 Fill text for the start title
 
 Create a the game container

 Create platform, player, obstacle, ladder, trophy, and NPC Divs with corresponding classes
 
 Create a game over screen and a restart button after the game is over

 <ins>CSS Portion</ins>
 
 Set background to url
 
 Center the start screen div and have the display for start screen to become display: none on start
 
 Set portions of divs = the image url

 <ins>JS Portion</ins>

1. Define variables for each element we have we need to access.

1a. Define divs of trophy, player, platforms, obstacles, and NPC's.

1b. Get context on the canvas for the background. Contain background images that pan less than the foreground canvas. Put the NPC's within that canvas so when the player goes up, the NPC's fade out of view.

1c. Create a foreground canvas for the player to move in and scroll screen

2. Create a class called Player and give it the properties of position, width, height, and velocity for gravity. 

2a. Create functions to render and update the characters positions.

3. Create player movement. WASD or Arrow Keys

4. Create all the platforms, trophies, and other elements as blocks on the screen.

5. Create scroll function for the background so that camera can pan directionally.

6. Give blocks image assets according to their respective properties.

7. Generate interaction for all the blocks when player collides with objects.

8. Fine tunings
