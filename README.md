# <img src="logo.jpeg" alt="logo" width="50px" height="50px"> APP_DUEL


## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [How to Play](#how-to-play)
- [Game Mechanics](#game-mechanics)
- [Assets](#assets)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

**APP_DUEL** is a web-based interactive game where players engage in strategic battles against entities using dice rolls to attack or defend. Immerse yourself in a captivating story, make critical decisions, and aim to emerge victorious by outsmarting your opponents.

## Features

- **Interactive Main Menu:** Navigate easily with options to play, learn how to play, or quit.
- **Engaging Storyline:** Experience a sequence of story scenes that set the stage for intense duels.
- **Dynamic Gameplay:** Utilize attack and defend actions with dice rolls determining the outcome.
- **Visual and Audio Effects:** Enjoy animated dice rolls, hit effects, and immersive background music.
- **Health Tracking:** Monitor player and monster health in real-time to strategize your moves.
- **Responsive Design:** Play seamlessly on various screen sizes with optimized layouts.

## Getting Started

Follow these instructions to set up and run **APP_DUEL** on your local machine.

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge, Safari)
- Internet connection to load external assets (if any)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/IsaAlkhanous/APP_DUEL.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd APP_DUEL
   ```

3. **Ensure All Assets Are Present**
   - Verify that the following folders and files exist:
     - `Pixelify_Sans/pixelfont.ttf`
     - `static.gif`, `loading.gif`, `mainmenu_background.png`, `Ingame_background.png`
     - `dice/1.svg` to `dice/10.svg` (ensure all dice face images are present)
     - `video/scene1.mp4` to `video/scene10.mp4`
     - `BottomPatternPanel_119x17.png`, `hpcontainer.png`, `entity.gif`, `Idle_Animation.gif`, `hit.gif`
     - Audio files in the `audio/` directory:
       - `click.mp3`, `mouseclick.mp3`, `Title-Disasterpeace.mp3`, `Pressure.mp3`
       - `aq_hit.mp3`, `mc_hitsound.mp3`, `rollingDice.mp3`, `tf2_healing.mp3`
       - `healMonster.mp3`, `youlose.wav`

4. **Open the Game in Browser**
   - Locate the `index.html` file in the project directory.
   - Double-click the file to open it in your default web browser.
   - Alternatively, right-click the file and select your preferred browser.

## How to Play

1. **Load the Game**
   - Press Fullscreen(f11) prefferably for full screen.
   - Wear headphones for best experience
   - Click the **"Load the Game"** button on the initial screen.

2. **Main Menu**
   - **PLAY:** Start the game and embark on the story.
   - **How to play:** View instructions and gameplay mechanics.
   - **QUIT:** Exit the game and return to the homepage.

3. **Gameplay**
   - **Story Section:** Watch the story scenes. You can navigate between scenes using the **Previous** and **Next** buttons or press the **Spacebar** to skip the story.
   - **Play Area:**
     - **Attack:** Use to inflict damage on the monster.
     - **Defend:** Use to heal yourself and increase your health.
     - **Roll Dice:** Click the dice to determine your action's effectiveness.
   - **Health Indicators:** Monitor your health (`playerHP`) and the monster's health (`monsterHP`).

4. **Winning the Game**
   - Defeat the monster by reducing its health to zero before it defeats you.
   - If you win or lose, an end screen will display the result with an option to restart the game.

## Game Mechanics

- **Dice Rolling:**
  - **Player:** Uses a 6-sided dice. Every 5 rolls, gains access to a 10-sided dice for increased attack power.
  - **Monster:** Uses an 8-sided dice with a chance to defend or attack based on a random chance.

- **Actions:**
  - **Attack:** Subtracts the rolled dice number from the monster's health.
  - **Defend:** Adds the rolled dice number to the player's health, up to the maximum health limit.

- **Turn-Based System:**
  - Players and monsters take turns to perform actions. The game alternates turns until one party's health reaches zero.

## Assets

Ensure all the necessary assets are correctly placed in their respective directories:

- **Fonts:**
  - `Pixelify_Sans/pixelfont.ttf`

- **Images:**
  - Static backgrounds, dice faces, character animations, health containers, etc.

- **Videos:**
  - Story scenes (`scene1.mp4` to `scene10.mp4`)

- **Audio:**
  - Sound effects for clicks, attacks, healing, and background music.

## Contributing

Contributions are welcome! If you'd like to enhance **APP_DUEL**, follow these steps:

1. **Fork the Repository**
2. **Create a New Branch**
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m "Add your feature"
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request**

Please ensure your contributions adhere to the project's coding standards and include appropriate comments and documentation.

## Acknowledgments

- Inspired by classic turn-based dice games.
- Special thanks to the creators of the Pixelify Sans font and all asset contributors.
- Audio and visual assets are either created by the developer or sourced from royalty-free libraries.
