document.addEventListener('DOMContentLoaded', () => {
    // Inject Basic Config Data
    document.querySelectorAll('.serverName').forEach(el => el.textContent = CONFIG.serverName);
    document.querySelectorAll('.serverIP').forEach(el => el.textContent = CONFIG.serverIP);
    document.querySelectorAll('.discordLink').forEach(el => el.href = CONFIG.discord);
    const copyYear = document.getElementById('copyright');
    if(copyYear) copyYear.textContent = CONFIG.copyright;

    // Server Status API Logic
    const fetchStatus = async () => {
        const statusBox = document.getElementById('status-box');
        if(!statusBox) return;

        try {
            const response = await fetch(`https://api.mcsrvstat.us/2/${CONFIG.serverIP}`);
            const data = await response.json();
            
            if(data.online) {
                statusBox.innerHTML = `
                    <span class="status-online bungee">● ONLINE</span> 
                    <span style="margin: 0 15px; opacity: 0.5">|</span>
                    <span class="bungee">${data.players.online} / ${data.players.max} PLAYERS</span>
                `;
            } else {
                statusBox.innerHTML = `<span class="status-offline bungee">● SERVER OFFLINE</span>`;
            }
        } catch (error) {
            statusBox.innerHTML = `<span style="color: grey">STATUS UNAVAILABLE</span>`;
        }
    };

    fetchStatus();

    // Populate Features Grid
    const featuresGrid = document.getElementById('features-list');
    if(featuresGrid) {
        CONFIG.features.forEach(f => {
            featuresGrid.innerHTML += `
                <div class="card">
                    <h2 style="color: var(--primary); margin-bottom: 1rem;">${f.title}</h2>
                    <p style="color: var(--text-dim); font-size: 1.2rem;">${f.description}</p>
                </div>`;
        });
    }

    // Populate Team Grid
    const teamGrid = document.getElementById('team-list');
    if(teamGrid) {
        CONFIG.team.forEach(t => {
            teamGrid.innerHTML += `
                <div class="card" style="text-align: center">
                    <div style="width: 80px; height: 80px; background: #222; border-radius: 50%; margin: 0 auto 1.5rem; border: 2px solid var(--primary)"></div>
                    <h2 style="color: var(--primary)">${t.name}</h2>
                    <p class="bungee" style="font-size: 0.9rem; letter-spacing: 1px; color: var(--text-dim)">${t.role}</p>
                </div>`;
        });
    }
});

// Clipboard Function
function copyIP() {
    navigator.clipboard.writeText(CONFIG.serverIP);
    const btn = document.querySelector('.btn-yellow');
    const originalText = btn.textContent;
    btn.textContent = "COPIED!";
    setTimeout(() => { btn.textContent = originalText; }, 2000);
}
