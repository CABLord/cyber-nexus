
// Game state
let gameState = {
    player: {
        skills: {
            hacking: 1,
            stealth: 1,
            networking: 1
        },
        reputation: 0,
        money: 1000
    },
    currentMission: null
};

// Initialize the game
function initGame() {
    updateDisplay();
    document.getElementById('game-area').innerHTML += '<button onclick="startMission()">Start New Mission</button>';
}

// Update the game display
function updateDisplay() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Player Stats</h2>
        <p>Hacking Skill: ${gameState.player.skills.hacking}</p>
        <p>Stealth Skill: ${gameState.player.skills.stealth}</p>
        <p>Networking Skill: ${gameState.player.skills.networking}</p>
        <p>Reputation: ${gameState.player.reputation}</p>
        <p>Money: $${gameState.player.money}</p>
    `;
}

// Start a new mission
function startMission() {
    gameState.currentMission = {
        type: 'Data Theft',
        difficulty: Math.floor(Math.random() * 3) + 1,
        reward: Math.floor(Math.random() * 1000) + 500
    };
    
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML += `
        <h3>New Mission: ${gameState.currentMission.type}</h3>
        <p>Difficulty: ${gameState.currentMission.difficulty}</p>
        <p>Reward: $${gameState.currentMission.reward}</p>
        <button onclick="completeMission()">Complete Mission</button>
    `;
}

// Complete the current mission
function completeMission() {
    if (gameState.currentMission) {
        const success = Math.random() < 0.7; // 70% success rate for now
        if (success) {
            gameState.player.money += gameState.currentMission.reward;
            gameState.player.reputation += gameState.currentMission.difficulty;
            gameState.player.skills.hacking += 1;
            alert('Mission completed successfully!');
        } else {
            gameState.player.reputation -= 1;
            alert('Mission failed.');
        }
        gameState.currentMission = null;
        updateDisplay();
    }
}

// Initialize the game when the page loads
window.onload = initGame;
