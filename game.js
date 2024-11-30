

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
    document.getElementById('game-area').innerHTML += '<button onclick="showUpgradeMenu()">Upgrade Skills</button>';
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
    const missionTypes = ['Data Theft', 'System Infiltration', 'Cyber Espionage'];
    gameState.currentMission = {
        type: missionTypes[Math.floor(Math.random() * missionTypes.length)],
        difficulty: Math.floor(Math.random() * 5) + 1,
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
        const skillCheck = gameState.player.skills.hacking + gameState.player.skills.stealth + gameState.player.skills.networking;
        const success = Math.random() < (skillCheck / (gameState.currentMission.difficulty * 5));
        if (success) {
            gameState.player.money += gameState.currentMission.reward;
            gameState.player.reputation += gameState.currentMission.difficulty;
            const skillGain = Math.floor(Math.random() * 2) + 1;
            gameState.player.skills.hacking += skillGain;
            alert(`Mission completed successfully! You gained ${skillGain} Hacking skill.`);
        } else {
            gameState.player.reputation -= 1;
            alert('Mission failed.');
        }
        gameState.currentMission = null;
        updateDisplay();
    }
}

// Show upgrade menu
function showUpgradeMenu() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML += `
        <h3>Upgrade Skills</h3>
        <button onclick="upgradeSkill('hacking')">Upgrade Hacking ($${getUpgradeCost('hacking')})</button>
        <button onclick="upgradeSkill('stealth')">Upgrade Stealth ($${getUpgradeCost('stealth')})</button>
        <button onclick="upgradeSkill('networking')">Upgrade Networking ($${getUpgradeCost('networking')})</button>
    `;
}

// Upgrade a skill
function upgradeSkill(skill) {
    const cost = getUpgradeCost(skill);
    if (gameState.player.money >= cost) {
        gameState.player.money -= cost;
        gameState.player.skills[skill]++;
        updateDisplay();
        alert(`${skill.charAt(0).toUpperCase() + skill.slice(1)} skill upgraded!`);
    } else {
        alert('Not enough money to upgrade this skill.');
    }
}

// Get the cost of upgrading a skill
function getUpgradeCost(skill) {
    return gameState.player.skills[skill] * 100;
}

// Initialize the game when the page loads
window.onload = initGame;

