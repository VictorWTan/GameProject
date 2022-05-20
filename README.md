# Game Project
### <ins>**Game Project Inspiration**</ins>

Welcome to my game! My game is inspired by the games Maplestory and Jump King, which are platformers. One aspect of Maplestory are their jump quests, where your character would jump from small platform to platform trying not to fall down. There are obstacles like spikes and that hurt the player and push them off. The game is meant to be grueling and a time sink where the player tries their hardest to jump passed all obstacles and finally reach the trophy only to fall down over and over again! Neat!



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
