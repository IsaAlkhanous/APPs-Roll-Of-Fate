// Entity Class
class Entity {
    constructor(health, name) {
        this.health = health;
        this.max_health = health;
        this.name = name;
    }
    toString() {
        return `${this.name}`;
    }
    attack(diceRoll, target) {
        target.health -= diceRoll;

        console.log(`${this.toString()} attacked ${target.toString()} for damage amount ${diceRoll}`);
        console.log(`Before HP: ${target.health + diceRoll} | HP after: ${target.health}`);
        
        updateHealth(target);
    }
    defend(diceRoll) {
        this.health += diceRoll;
        if (this.health > this.max_health) this.health = this.max_health;
        console.log(`${this.toString()} Defended for amount ${diceRoll}`);
        console.log(`Before HP: ${this.health - diceRoll} | HP after: ${this.health}`);

        updateHealth(this);
    }
}

// Function to update health display
function updateHealth(entity) {
    const hpElement = document.getElementById(`${entity.toString()}HP`);
    if (hpElement) {
        hpElement.innerHTML = entity.health;
    }
}

function MainMenu(){
    console.log("MainMenu() called");
    const load = document.getElementById('loading'); // Corrected ID
    var song = document.getElementById("mainmenu_music");
    var click = document.getElementById("hover");
    var buttons = document.getElementsByClassName("button");

    document.getElementById('openthegame').style.display = 'none';
    document.getElementById("mainmenu").style.display = 'none';
    load.style.display = "block";
    setTimeout(() => {
        load.style.display = "none";
        document.getElementById("mainmenu").style.display = 'flex';
        if(song){
            song.currentTime = 0;
            song.volume = 0.25; // Keep consistent volume
            song.play().catch(error => {
                console.error("Main Menu music playback failed:", error);
            });
        }
    },1500);

    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mouseenter", hoverEffect);
    }
}

function hoverEffect() {
    const hoverAudio = document.getElementById("hover");
    if (hoverAudio) {
        hoverAudio.currentTime = 0; // Reset to start
        hoverAudio.play().catch(error => {
            console.error("Hover sound playback failed:", error);
        });
    }
}
// PlayerAction Class
class PlayerAction {
    constructor(attackBtn, defendBtn, diceBtn) {
        this.attack = attackBtn;
        this.defend = defendBtn;
        this.dice = diceBtn;
        this.currentRollNumber = 0;

        // Bind methods to ensure 'this' context
        this.handleRollDice = this.handleRollDice.bind(this);
        this.handleAttack = this.handleAttack.bind(this);
        this.handleDefend = this.handleDefend.bind(this);
    }

    waitForPlayerAction() {
        // Hide action buttons initially
        this.attack.style.display = "none";
        this.defend.style.display = "none";

        // Remove any existing event listeners to prevent duplication
        this.dice.removeEventListener("click", this.handleRollDice);
        this.attack.removeEventListener("click", this.handleAttack);
        this.defend.removeEventListener("click", this.handleDefend);

        // Add event listener for rolling the dice
        this.dice.style.boxShadow = "yellow 0px 0px 50px";
        this.dice.addEventListener("click", this.handleRollDice, { once: true });
    }

    handleRollDice() {
        console.log("Rolling the dice...");
        this.dice.disabled = true;
        this.dice.style.boxShadow = "0px 0px 0px";

        this.currentRollNumber = rollDice("player",6);
        console.log(`Player rolled a ${this.currentRollNumber}`);

        // Show action buttons after rolling
        this.attack.style.display = "block";
        this.defend.style.display = "block";

        // Enable action buttons
        this.attack.disabled = false;
        this.defend.disabled = false;

        // Add event listeners for attack and defend
        this.attack.addEventListener("click", this.handleAttack, { once: true });
        this.defend.addEventListener("click", this.handleDefend, { once: true });
    }

    handleAttack() {
        console.log("Player chose to attack.");
        const hit = document.getElementById("hit");
        const hit_animation = document.getElementById('entity');
        const heal_amount = document.getElementById("healAmountMonster");
        const heal_animation = document.getElementById("healAmountMonster");

        hit_animation.style.animation = "entity_hit 0.3s";
        heal_amount.innerHTML = '-' + this.currentRollNumber;
        heal_animation.style.animation = "heal 1s";
        if(hit){
            hit.currentTime = 0;
            hit.play().catch(error => {
                console.error("Hit sound playback failed:", error);
            });
        }
        console.log('ATTACKED');
        setTimeout(() =>{
            heal_animation.style.animation = 'none';
            hit_animation.style.animation = 'none';
            player.attack(this.currentRollNumber, monster); 
            check_winner(); // Check after attack
            if (monster.health > 0 && player.health > 0){
                turn++;
                nextturn();
            }
        },1000);

        // Disable and hide action buttons
        this.disableActionButtons();
    }

    handleDefend() {
        console.log("Player chose to defend.");
        const heal = document.getElementById("healchar");
        const heal_amount = document.getElementById("healAmountChar");
        const heal_animation = document.getElementById("healAmountChar");

        heal_amount.innerHTML = '+' + this.currentRollNumber;
        heal_animation.style.animation = "heal 1s";
        player.defend(this.currentRollNumber);
        
        if(heal){
            heal.currentTime = 0;
            heal.volume = 0.2;
            heal.play().catch(error => {
                console.error("Heal sound playback failed:", error);
            });
        }

        // Disable and hide action buttons
        this.disableActionButtons();

        setTimeout(()=>{
            heal_animation.style.animation = 'none';
            check_winner(); // Check after defend
            if (monster.health > 0 && player.health > 0){
                turn++;
                nextturn();
            }
        },1000);
    }

    disableActionButtons() {
        this.attack.disabled = true;
        this.defend.disabled = true;

        this.attack.style.display = "none";
        this.defend.style.display = "none";
    }
}

// Function to handle spacebar press
function handleSpacebar(e) {
    if (e.code === 'Space') {
        console.log("Spacebar pressed. Skipping story.");
        e.preventDefault(); // Prevent default spacebar behavior
        endStory();
    }
}

// Function to display How to Play Modal
function display_howtoplay(){
    var howtoplay = document.getElementById("howtoplay");
    if(howtoplay.style.display === "none" || howtoplay.style.display === ""){
        howtoplay.style.display = "block";
    }
    else {
        howtoplay.style.display = "none";
    }
}

// Function to handle click sound effect
function clickmouse_soundeffect(){
    const clickAudio = document.getElementById('click');
    clickAudio.play().catch(error => {
        console.error("Click sound playback failed:", error);
    });
}

// Function to start the game
function startGame() {
    startStory();
}

// Function to start the story sequence
function startStory() {
    console.log("startStory() initiated");
    document.getElementById("mainmenu").style.display = 'none';
    document.getElementById("story").style.display = 'flex';
    window.currentScene = 1;
    updateVideoSource();

    // Pause main menu music
    const mainMenuMusic = document.getElementById("mainmenu_music");
    if(mainMenuMusic){
        mainMenuMusic.pause();
        mainMenuMusic.currentTime = 0;
    }
}

// Function to end the story and start the game
function endStory() {
    console.log("Ending story and transitioning to game.");
    document.getElementById("story").style.display = 'none';
    const storyVideo = document.getElementById("storyVideo");
    storyVideo.pause();
    storyVideo.currentTime = 0;
    document.getElementById("playgame").style.display = 'flex';
    var gameMusic = document.getElementById("ingame_music");

    gameMusic.currentTime = 0;
    gameMusic.volume = 0.5;
    gameMusic.play().catch(error => {
        console.error("In-game music playback failed:", error);
    });
    // Update HP displays
    updateHealth(player);
    updateHealth(monster);
    // Start the first turn
    nextturn();
    // Remove spacebar listener to prevent skipping during game
    window.removeEventListener('keydown', handleSpacebar);
}

// Function to reset the game
function resetGame() {
    const menu = document.getElementById("mainmenu");
    const playGame = document.getElementById("playgame");

    // Reset player and monster health
    player.health = 30;
    monster.health = 40;

    // Update HP displays
    updateHealth(player);
    updateHealth(monster);

    // Reset turn counter
    turn = 0;

    MainMenu();

    // Stop any ongoing animations or effects
    document.getElementById("playerdice").style.animation = "none";
    document.getElementById("monsterdice").style.animation = "none";

    // Reset any visible effects (optional, if you have others)
    document.getElementById("healAmountChar").style.animation = "none";
    document.getElementById("healAmountMonster").style.animation = "none";
}

// Function to handle You Win scenario
function youWin() {
    displayEndScreen("YOU WIN");
}

// Function to handle You Lose scenario
function youLose() {
    const lose = document.getElementById("you_lose");
    if(lose){
        lose.currentTime = 0;
        lose.play().catch(error => {
            console.error("You Lose sound playback failed:", error);
        });
    }
    displayEndScreen("YOU LOSE");
}

// Function to display end screen
function displayEndScreen(message) {
    console.log(`Displaying end screen: ${message}`);
    const menu = document.getElementById("mainmenu");
    const playGame = document.getElementById("playgame");
    const ingame_music = document.getElementById("ingame_music");

    if(ingame_music){
        ingame_music.pause();
        ingame_music.currentTime = 0;
    }

    menu.style.display = 'none';
    playGame.style.display = 'none';
    // Create a full-screen black overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "black";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column"; /* Added for vertical alignment */
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "10000";

    // Add the message
    const text = document.createElement("h1");
    text.style.color = "white";
    text.style.fontSize = "5rem";
    text.style.textAlign = "center";
    text.style.fontFamily = "Pixelify Sans";
    text.textContent = message;

    // Add the overlay to the body
    overlay.appendChild(text);
    document.body.appendChild(overlay);

    // Optionally add a "Restart" button
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart";
    restartButton.style.marginTop = "20px";
    restartButton.style.padding = "10px 20px";
    restartButton.style.fontSize = "1.5rem";
    restartButton.style.cursor = "pointer";
    restartButton.style.border = "none";
    restartButton.style.borderRadius = "5px";
    restartButton.style.backgroundColor = "red";
    restartButton.style.color = "white";
    restartButton.style.fontFamily = "Pixelify Sans";

    restartButton.onclick = () => {
        console.log("Restarting game...");
        overlay.remove(); // Remove the overlay
        resetGame(); // Call the reset function to restart the game
    };

    overlay.appendChild(restartButton);
}

// Check Winner Function
function check_winner() {
    console.log("Checking for winner...");
    if (player.health <= 0) {
        console.log("Player has lost.");
        youLose();
    } else if (monster.health <= 0) {
        console.log("Monster has lost.");
        youWin();
    } else {
        console.log("No winner yet.");
        return false;
    }
}

// Roll Dice Function
function rollDice(playerType, diceNumber){
    const roll_effect = document.getElementById("roll_effect");
    const dice = document.querySelector(`#${playerType}dice`);
    var rollResult = Math.floor((Math.random() * diceNumber)) + 1;
    
    if(playerType.toString() === 'player' && window.turn % 10 === 0){
        rollResult = Math.floor((Math.random() * 10)) + 1;
    }
    console.log(`${playerType} rolled a ${rollResult}`);
    dice.style.animation = "rollingDice 0.5s";
    if(roll_effect){
        roll_effect.currentTime = 0;
        roll_effect.play().catch(error => {
            console.error("Roll effect sound playback failed:", error);
        });
    }
    setTimeout(()=>{
        dice.style.animation = "none";
        dice.setAttribute("src", "images/dice/" + rollResult + ".svg");
    },500);
    return rollResult;
}
    
window.onload = () => {         
    console.log("Window loaded. Initializing game elements.");

    // Initialize Entities
    window.player = new Entity(30, 'player'); // Changed from 1 to 30
    window.monster = new Entity(40, 'monster');
    window.turn = 0;

    // Initialize PlayerAction with DOM elements
    const attackBtn = document.getElementById('attack');
    const defendBtn = document.getElementById('defend');
    const diceBtn = document.getElementById("Rolldice");

    window.action = new PlayerAction(attackBtn, defendBtn, diceBtn);
    const buttons = document.querySelectorAll(".button");
    const click = document.getElementById("click");

    // Add click sound effect
    buttons.forEach(button => {
        button.addEventListener('click', ()=>{
            if(click){
                click.currentTime = 0.05;
                click.play().catch(error => {
                    console.error("Click sound playback failed:", error);
                });
            }
        });
    });
    
    // Initialize Story Management Elements
    const storyDiv = document.getElementById('story');
    const storyVideo = document.getElementById('storyVideo');
    const prevSceneBtn = document.getElementById('prevScene');
    const nextSceneBtn = document.getElementById('nextScene');
    const totalScenes = 10; // Total number of scenes
    window.currentScene = 1;
    
    // Initialize Scenes Array
    const scenes = [];
    for (let i = 1; i <= totalScenes; i++) {
        scenes.push(`video/scene${i}.mp4`); // Ensure these files exist
    }

    // Function to update the video source and play
    window.updateVideoSource = function() {
        console.log(`Loading scene ${window.currentScene}: ${scenes[window.currentScene - 1]}`);
        storyVideo.src = scenes[window.currentScene - 1];
        storyVideo.load();
        storyVideo.play().then(() => {
            console.log(`Playing scene ${window.currentScene}`);
        }).catch(error => {
            console.error(`Error playing scene ${window.currentScene}:`, error);
        });
        window.updateButtonStates();
    }

    // Function to update button states
    window.updateButtonStates = function() {
        prevSceneBtn.disabled = window.currentScene === 1;
        nextSceneBtn.disabled = window.currentScene === scenes.length;
        // Optionally hide buttons when disabled
        prevSceneBtn.style.display = window.currentScene === 1 ? 'none' : 'block';
        nextSceneBtn.style.display = window.currentScene === scenes.length ? 'none' : 'block';
    }

    // Add Event Listeners to Story Navigation Buttons
    prevSceneBtn.addEventListener('click', () => {
        if (window.currentScene > 1) {
            window.currentScene--;
            console.log(`Navigated to previous scene: ${window.currentScene}`);
            window.updateVideoSource();
        }
    });

    nextSceneBtn.addEventListener('click', () => {
        if (window.currentScene < scenes.length) {
            window.currentScene++;
            console.log(`Navigated to next scene: ${window.currentScene}`);
            window.updateVideoSource();
        } else {
            console.log("Last scene reached. Ending story.");
            endStory();
        }
    });

    // Add Event Listener to Video End
    storyVideo.addEventListener('ended', () => {
        if (window.currentScene < scenes.length) {
            window.currentScene++;
            console.log(`Auto-navigating to next scene: ${window.currentScene}`);
            window.updateVideoSource();
        } else {
            console.log("Last scene ended. Ending story.");
            endStory();
        }
    });

    // Ensure buttons are in correct state initially
    window.updateButtonStates();

    // Initialize HP Displays
    updateHealth(player);
    updateHealth(monster);

    // Attach Spacebar Handler
    window.addEventListener('keydown', handleSpacebar);
};

// Next Turn Function
function nextturn(){
    console.log(`Starting turn ${window.turn + 1}`);
    document.getElementById('Rolldice').disabled = true;

    if(window.turn % 2 === 0){    
        console.log("Player's turn");
        document.getElementById('Rolldice').disabled = false;
        window.action.waitForPlayerAction();
        // Removed check_winner() from here
    }
    else{
        console.log("Monster's Turn");
        setTimeout(() => {
            const roll_number = rollDice("monster",8);
            const chance = Math.floor(Math.random() * 10) + 1;

            setTimeout(()=>{

                if (chance > 7) {
                    // Monster Defends
                    const heal_animation = document.getElementById("healAmountMonster");
                    const heal_amount = document.getElementById("healAmountMonster");
                    const heal_monster = document.getElementById("healMonster");

                    if(heal_monster){
                        heal_monster.currentTime = 0;
                        heal_monster.play().catch(error => {
                            console.error("Heal Monster sound playback failed:", error);
                        });
                    }
                    monster.defend(roll_number);
                    heal_amount.innerHTML = '+' + roll_number; 
                    heal_animation.style.animation = "heal 1s";                            
                    setTimeout(()=>{
                        heal_animation.style.animation = "none";
                        check_winner(); // Check after defend
                        if (monster.health > 0 && player.health > 0){
                            window.turn++;
                            nextturn();
                        }
                    },1000);
                } else {
                    // Monster Attacks
                    const heal_animation = document.getElementById("healAmountChar");
                    const heal_amount = document.getElementById("healAmountChar");
                    const hit_animation = document.getElementById('playerchar');
                    const hit_sound_char = document.getElementById('hitchar');
                    const hit = document.getElementById("hit_effect");

                    heal_amount.innerHTML = '-' + roll_number; 
                    heal_animation.style.animation = "heal 1s";
                    hit.style.animation = "hit 1s";
                    if(hit_sound_char){
                        hit_sound_char.currentTime = 0.4;
                        hit_sound_char.play().catch(error => {
                            console.error("Hit Character sound playback failed:", error);
                        });
                    }
                    if(hit_animation){
                        hit_animation.style.animation = "entity_hit 0.3s";
                    }

                    setTimeout(()=>{
                        hit.style.animation = "none";
                        heal_animation.style.animation = 'none';
                        if(hit_animation){
                            hit_animation.style.animation = 'none';
                        }
                        monster.attack(roll_number, player);
                        check_winner(); // Check after attack
                        if (monster.health > 0 && player.health > 0){
                            window.turn++;
                            nextturn();
                        }
                    },1000);
                }
            },1000);
        }, 2000);
    }
}