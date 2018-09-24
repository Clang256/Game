// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var lose = false;
var currentScore = 0;
var winningScore = 50;
var losingScore = -10;

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(520, 280, 'fish');
    createItem(300, 130, 'fish');
    createItem(520, 540, 'fish');
    createItem(620, 290, 'dead');
    createItem(150, 390, 'dead');
	createItem(600, 150, 'ruby');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(140, 420, 'rock');
      platforms.create(280, 170, 'rock');
      platforms.create(500, 320, 'rock');
    platforms.create(0, 575, 'sand');
    platforms.create(140, 575, 'sand');
    platforms.create(280, 575, 'sand');
    platforms.create(420, 575, 'sand');
    platforms.create(550, 575, 'sand');
    platforms.create(640, 575, 'sand');
  platforms.setAll('body.immovable', true);
}



// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(10, 20, 'badge');
  badge.animations.add('shine');
  badge.animations.play('shine', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if (item.key === 'fish') {
     currentScore = currentScore + 20;
  }
  if (item.key === 'dead') {
     currentScore = currentScore - 10;
    }
	if (item.key === 'ruby') {
     game.stage.backgroundColor = '#f4429e';
    }
    if (currentScore >= winningScore) {
      createBadge();
    }
    
    if (currentScore <= losingScore) {
        lose = true;
    }
        
        
  }


// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#92f1fc';
    
    //Load images
    game.load.image('rock', 'rock.png');
    
    //Load spritesheets
    game.load.spritesheet('player', 'crabs.png', 80, 80);
    game.load.spritesheet('fish', 'fish1.png', 40, 40);
	game.load.spritesheet('badge', 'badge.png', 80, 80);
	game.load.spritesheet('sand', 'sand.png', 160, 26);
      game.load.spritesheet('dead', 'dfish.png', 40, 40);
	  game.load.spritesheet('ruby', 'ruby.png', 40, 40);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player win/lose the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
	  if (jumpButton.isDown)
           {
               document.location.reload(true);
           }
	  
     }
    
      if (lose) {
      winningMessage.text = "YOU LOSE";
	  if (jumpButton.isDown)
           {
               document.location.reload(true);
           }
     }
    }
      
    //reset game 
     
     
 

  function render() {

  }

};
