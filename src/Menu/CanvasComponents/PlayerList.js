import MeowEngine from "../../Browser/GlobalTypeDefs";

export class PlayerListPanel {
  static initialize() {
    // Add CSS styles for the player list panel
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      .meow-players-overlay {
        position: absolute;
        bottom: 10px;
        left: 10px;
        background-color: rgba(0, 255, 170, 0.2);
        border: 1px solid rgba(0, 255, 170, 0.3);
        border-radius: 3px;
        color: #00ffaa;
        font-size: 12px;
        padding: 8px;
        min-width: 500px;
        max-height: 60vh;
        overflow-y: auto;
        font-family: 'Courier New', monospace;
        pointer-events: none;
        z-index: 9998;
        text-shadow: 0 0 8px rgba(0, 255, 170, 0.7);
      }
      
      .meow-players-title {
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        margin-bottom: 5px;
        color: #00ffaa;
      }
      
      .meow-players-table {
        width: 100%;
        border-collapse: collapse;
      }
      
      .meow-players-table th {
        text-align: left;
        padding: 3px 8px;
        border-bottom: 1px solid rgba(0, 255, 170, 0.5);
        color: #00ffdd;
      }
      
      .meow-players-table td {
        padding: 3px 8px;
        border-bottom: 1px solid rgba(0, 255, 170, 0.3);
      }
      
      .meow-team-0 {
        color: #d93c15;
      }
      
      .meow-team-1 {
        color: #1392c7;
      }
      
      .meow-team-10 {
        color: #ff00ff;
      }
      
      .meow-ping-good {
        color: #00ff00;
      }
      
      .meow-ping-medium {
        color: #ffff00;
      }
      
      .meow-ping-bad {
        color: #ff0000;
      }
      
      .meow-health-high {
        color: #00ff00;
      }
      
      .meow-health-medium {
        color: #ffff00;
      }
      
      .meow-health-low {
        color: #ff0000;
      }

      .meow-health-dead {
        color: #ff0000;
      }
    `;
    document.head.appendChild(styleElement);

    // Create player list container
    const overlay = document.createElement("div");
    overlay.className = "meow-players-overlay";

    // Create title
    const title = document.createElement("div");
    title.className = "meow-players-title";
    title.textContent = "Player List";
    overlay.appendChild(title);

    // Create table
    const table = document.createElement("table");
    table.className = "meow-players-table";

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    
    const headers = [
      "Actor", "Name", "Rank", "K/D", "Team", "Kills", "Platform", "Health", "Ping"
    ];
    
    headers.forEach(headerText => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    overlay.appendChild(table);
    document.body.appendChild(overlay);

    // Function to get ping status class
    function getPingStatusClass(ping) {
      if (ping < 100) return "meow-ping-good";
      if (ping < 200) return "meow-ping-medium";
      return "meow-ping-bad";
    }

    // Function to get health status class
    function getHealthStatusClass(health) {
      if (health === "Dead") return "meow-health-dead";
      if (health > 7000) return "meow-health-high";
      if (health > 3000) return "meow-health-medium";
      return "meow-health-low";
    }

    // Function to get team class
    function getTeamClass(team) {
      return `meow-team-${team}`;
    }

    // Function to format health value
    function formatHealth(health) {
      if (health === null) return "Dead";
      return Math.round(health).toString();
    }

    // Function to update player list
    function updatePlayerList() {
      try {
        const players = MeowEngine.RoomInstance.Players;
        if (!players) return;
        
        // Clear existing rows
        tbody.innerHTML = '';
        
        const flattenedPlayers = players.map(obj => {
            const [key, value] = Object.entries(obj)[0];
            return [key, value];
        });

        // Then sort it by team and actor number
        const sortedPlayers = flattenedPlayers.sort((a, b) => {
            const teamA = a[1].team;
            const teamB = b[1].team;
            if (teamA !== teamB) return teamA - teamB;

            return parseInt(a[0]) - parseInt(b[0]);
        });

        // Add player rows
        sortedPlayers.forEach(([actorKey, player]) => {
          if (player.name == "Unknown") return; // Skip invalid player
          if (player.name !== "" && player.actorNr === 0) return; // Skip invalid players
          
          const row = document.createElement("tr");
          
          // Actor number
          const actorCell = document.createElement("td");
          actorCell.textContent = player.actorNr.toString();
          row.appendChild(actorCell);
          
          // Name
          const nameCell = document.createElement("td");
          nameCell.textContent = player.name || "Unknown";
          nameCell.className = getTeamClass(player.team);
          row.appendChild(nameCell);
          
          // Rank
          const rankCell = document.createElement("td");
          rankCell.textContent = player.rank.toString();
          row.appendChild(rankCell);
          
          // K/D
          const kdCell = document.createElement("td");
          kdCell.textContent = player.kd.toFixed(2);
          row.appendChild(kdCell);
          
          // Team
          const teamCell = document.createElement("td");
          teamCell.textContent = player.team.toString();
          teamCell.className = getTeamClass(player.team);
          row.appendChild(teamCell);
          
          // Kills
          const killsCell = document.createElement("td");
          killsCell.textContent = player.kills.toString();
          row.appendChild(killsCell);
          
          // Platform
          const platformCell = document.createElement("td");
          platformCell.textContent = player.platform || "Unknown";
          row.appendChild(platformCell);
          
          // Health
          const healthCell = document.createElement("td");
          healthCell.textContent = formatHealth(player.health);
          healthCell.className = getHealthStatusClass(player.health);
          row.appendChild(healthCell);
          
          // Ping
          const pingCell = document.createElement("td");
          pingCell.textContent = player.ping.toString();
          pingCell.className = getPingStatusClass(player.ping);
          row.appendChild(pingCell);
          
          tbody.appendChild(row);
        });
      } catch (error) {
        console.error("Error updating player list:", error);
      }
      
      // Schedule next update
      setTimeout(updatePlayerList, 500);
    }

    // Start updating
    updatePlayerList();

    // Return control functions
    return {
      setVisible: function(visible) {
        overlay.style.display = visible ? "block" : "none";
      },
      setPosition: function(position) {
        if (position === "topRight") {
          overlay.style.top = "10px";
          overlay.style.right = "10px";
          overlay.style.bottom = "auto";
          overlay.style.left = "auto";
        } else if (position === "topLeft") {
          overlay.style.top = "10px";
          overlay.style.left = "10px";
          overlay.style.bottom = "auto";
          overlay.style.right = "auto";
        } else if (position === "bottomRight") {
          overlay.style.bottom = "10px";
          overlay.style.right = "10px";
          overlay.style.top = "auto";
          overlay.style.left = "auto";
        } else if (position === "bottomLeft") {
          overlay.style.bottom = "10px";
          overlay.style.left = "10px";
          overlay.style.top = "auto";
          overlay.style.right = "auto";
        }
      },
      updateTitle: function(text) {
        title.textContent = text;
      }
    };
  }
}

export default PlayerListPanel;