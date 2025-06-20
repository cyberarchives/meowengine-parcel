import MeowEngine from "../../Browser/GlobalTypeDefs";

export class PlayerListPanel {
  static initialize() {
    // Add CSS styles for clean IMGUI-style player list
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      .meow-players-overlay {
        position: absolute;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%);
        border: 1px solid #ff6b35;
        border-radius: 12px;
        color: #00d4ff;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 12px;
        min-width: 600px;
        max-height: 70vh;
        overflow: hidden;
        pointer-events: none;
        z-index: 9998;
        box-shadow: 
          0 0 20px rgba(255, 107, 53, 0.3),
          0 0 40px rgba(0, 212, 255, 0.1),
          inset 0 1px 0 rgba(255, 107, 53, 0.2);
      }
      
      .meow-players-header {
        background: linear-gradient(90deg, rgba(255, 107, 53, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%);
        border-bottom: 1px solid rgba(255, 107, 53, 0.3);
        border-radius: 12px 12px 0 0;
        padding: 8px 12px;
        position: relative;
      }
      
      .meow-players-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #ff6b35, transparent);
        border-radius: 12px 12px 0 0;
      }
      
      .meow-players-title {
        font-weight: normal;
        font-size: 13px;
        margin: 0;
        color: #00d4ff;
        text-align: left;
        text-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
      }
      
      .meow-players-content {
        max-height: calc(70vh - 35px);
        overflow-y: auto;
        overflow-x: hidden;
      }
      
      .meow-players-content::-webkit-scrollbar {
        width: 12px;
      }
      
      .meow-players-content::-webkit-scrollbar-track {
        background: #0f0f0f;
        border-radius: 6px;
      }
      
      .meow-players-content::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #ff6b35, #ff8c42);
        border: 1px solid #ff6b35;
        border-radius: 6px;
        box-shadow: 0 0 6px rgba(255, 107, 53, 0.3);
      }
      
      .meow-players-content::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #ff8c42, #ffad73);
        box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
      }
      
      .meow-players-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11px;
      }
      
      .meow-players-table th {
        text-align: left;
        padding: 6px 12px;
        font-weight: normal;
        color: #ff6b35;
        background: rgba(255, 107, 53, 0.05);
        border-bottom: 1px solid rgba(255, 107, 53, 0.2);
        position: sticky;
        top: 0;
        z-index: 10;
        text-shadow: 0 0 4px rgba(255, 107, 53, 0.3);
      }
      
      .meow-players-table td {
        padding: 4px 12px;
        border-bottom: 1px solid rgba(255, 107, 53, 0.1);
        vertical-align: middle;
      }
      
      .meow-players-table tr:nth-child(even) {
        background: rgba(0, 212, 255, 0.02);
      }
      
      .meow-players-table tr:hover {
        background: rgba(255, 107, 53, 0.05);
        box-shadow: inset 0 0 10px rgba(255, 107, 53, 0.1);
      }
      
      /* Team colors - cyberpunk themed */
      .meow-team-0 {
        color: #ff6b35;
        text-shadow: 0 0 6px rgba(255, 107, 53, 0.4);
      }
      
      .meow-team-1 {
        color: #00d4ff;
        text-shadow: 0 0 6px rgba(0, 212, 255, 0.4);
      }
      
      .meow-team-10 {
        color: #c471ed;
        text-shadow: 0 0 6px rgba(196, 113, 237, 0.4);
      }
      
      /* Cyberpunk status indicators */
      .meow-ping-good {
        color: #00ff88;
        text-shadow: 0 0 4px rgba(0, 255, 136, 0.3);
      }
      
      .meow-ping-medium {
        color: #ffb347;
        text-shadow: 0 0 4px rgba(255, 179, 71, 0.3);
      }
      
      .meow-ping-bad {
        color: #ff4757;
        text-shadow: 0 0 4px rgba(255, 71, 87, 0.3);
      }
      
      .meow-health-high {
        color: #00ff88;
        text-shadow: 0 0 6px rgba(0, 255, 136, 0.4);
      }
      
      .meow-health-medium {
        color: #ffb347;
        text-shadow: 0 0 6px rgba(255, 179, 71, 0.4);
      }
      
      .meow-health-low {
        color: #ff4757;
        text-shadow: 0 0 6px rgba(255, 71, 87, 0.4);
      }

      .meow-health-dead {
        color: #666666;
        text-decoration: line-through;
        text-shadow: none;
      }
      
      /* Cyberpunk badges */
      .meow-stat-badge {
        display: inline-block;
        padding: 1px 4px;
        border-radius: 4px;
        font-size: 10px;
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(255, 107, 53, 0.3);
        min-width: 32px;
        text-align: center;
        box-shadow: 0 0 6px rgba(255, 107, 53, 0.2);
      }
      
      .meow-kd-excellent {
        background: rgba(0, 255, 136, 0.1);
        border-color: #00ff88;
        color: #00ff88;
        box-shadow: 0 0 8px rgba(0, 255, 136, 0.3);
      }
      
      .meow-kd-good {
        background: rgba(0, 212, 255, 0.1);
        border-color: #00d4ff;
        color: #00d4ff;
        box-shadow: 0 0 8px rgba(0, 212, 255, 0.3);
      }
      
      .meow-kd-average {
        background: rgba(255, 179, 71, 0.1);
        border-color: #ffb347;
        color: #ffb347;
        box-shadow: 0 0 8px rgba(255, 179, 71, 0.3);
      }
      
      .meow-kd-poor {
        background: rgba(255, 71, 87, 0.1);
        border-color: #ff4757;
        color: #ff4757;
        box-shadow: 0 0 8px rgba(255, 71, 87, 0.3);
      }
      
      .meow-platform-badge {
        font-size: 9px;
        padding: 1px 3px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.6);
        color: #00d4ff;
        text-transform: uppercase;
        border: 1px solid rgba(0, 212, 255, 0.3);
        box-shadow: 0 0 4px rgba(0, 212, 255, 0.2);
      }
      
      .meow-actor-number {
        color: #ff6b35;
        font-weight: normal;
        text-shadow: 0 0 4px rgba(255, 107, 53, 0.3);
      }
      
      .meow-health-bar {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      
      .meow-health-progress {
        width: 32px;
        height: 8px;
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(255, 107, 53, 0.3);
        border-radius: 4px;
        overflow: hidden;
        box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.5);
      }
      
      .meow-health-fill {
        height: 100%;
        transition: width 0.1s linear;
        box-shadow: 0 0 6px currentColor;
      }
      
      .meow-rank-display {
        color: #ffb347;
        text-shadow: 0 0 6px rgba(255, 179, 71, 0.4);
      }
      
      .meow-kills-display {
        color: #00d4ff;
        font-weight: normal;
        text-shadow: 0 0 4px rgba(0, 212, 255, 0.3);
      }
    `;
    document.head.appendChild(styleElement);

    // Create player list container
    const overlay = document.createElement("div");
    overlay.className = "meow-players-overlay";

    // Create header section
    const header = document.createElement("div");
    header.className = "meow-players-header";
    
    const title = document.createElement("div");
    title.className = "meow-players-title";
    title.textContent = "Players (0)";
    header.appendChild(title);
    overlay.appendChild(header);

    // Create content wrapper
    const content = document.createElement("div");
    content.className = "meow-players-content";

    // Create table
    const table = document.createElement("table");
    table.className = "meow-players-table";

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    
    const headers = [
      "ID", "Name", "Rank", "K/D", "Team", "Kills", "Platform", "Health", "Ping"
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

    content.appendChild(table);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Clean utility functions
    function getPingStatusClass(ping) {
      if (ping < 100) return "meow-ping-good";
      if (ping < 200) return "meow-ping-medium";
      return "meow-ping-bad";
    }

    function getHealthStatusClass(health) {
      if (health === "Dead" || health === null) return "meow-health-dead";
      if (health > 7000) return "meow-health-high";
      if (health > 3000) return "meow-health-medium";
      return "meow-health-low";
    }

    function getKDClass(kd) {
      if (kd >= 3.0) return "meow-kd-excellent";
      if (kd >= 2.0) return "meow-kd-good";
      if (kd >= 1.0) return "meow-kd-average";
      return "meow-kd-poor";
    }

    function getTeamClass(team) {
      return `meow-team-${team}`;
    }

    function formatHealth(health) {
      if (health === null || health === "Dead") return "Dead";
      return Math.round(health).toString();
    }

    function getHealthPercentage(health) {
      if (health === null || health === "Dead") return 0;
      return Math.min(100, (health / 10000) * 100);
    }

    function createHealthBar(health) {
      const container = document.createElement("div");
      container.className = "meow-health-bar";
      
      const text = document.createElement("span");
      text.textContent = formatHealth(health);
      text.className = getHealthStatusClass(health);
      
      const progressContainer = document.createElement("div");
      progressContainer.className = "meow-health-progress";
      
      const progressFill = document.createElement("div");
      progressFill.className = "meow-health-fill";
      progressFill.style.width = `${getHealthPercentage(health)}%`;
      
      const healthClass = getHealthStatusClass(health);
      if (healthClass === "meow-health-high") {
        progressFill.style.background = "#00ff88";
      } else if (healthClass === "meow-health-medium") {
        progressFill.style.background = "#ffb347";
      } else if (healthClass === "meow-health-low") {
        progressFill.style.background = "#ff4757";
      } else {
        progressFill.style.background = "#666666";
      }
      
      progressContainer.appendChild(progressFill);
      container.appendChild(text);
      container.appendChild(progressContainer);
      
      return container;
    }

    // Clean update function
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

        const sortedPlayers = flattenedPlayers.sort((a, b) => {
            const teamA = a[1].team;
            const teamB = b[1].team;
            if (teamA !== teamB) return teamA - teamB;
            return parseInt(a[0]) - parseInt(b[0]);
        });

        // Update title with player count
        title.textContent = `Players (${sortedPlayers.length})`;

        // Add player rows with clean styling
        sortedPlayers.forEach(([actorKey, player]) => {
          if (player.name.toLowerCase().includes("unknown")) return;
          if (player.name !== "" && player.actorNr === 0) return;
          
          const row = document.createElement("tr");
          
          // Actor number
          const actorCell = document.createElement("td");
          actorCell.textContent = player.actorNr.toString();
          actorCell.className = "meow-actor-number";
          row.appendChild(actorCell);
          
          // Name with team color
          const nameCell = document.createElement("td");
          nameCell.textContent = player.name || "Unknown";
          nameCell.className = getTeamClass(player.team);
          row.appendChild(nameCell);
          
          // Rank
          const rankCell = document.createElement("td");
          rankCell.textContent = player.rank.toString();
          rankCell.className = "meow-rank-display";
          row.appendChild(rankCell);
          
          // K/D with badge
          const kdCell = document.createElement("td");
          const kdBadge = document.createElement("span");
          kdBadge.className = `meow-stat-badge ${getKDClass(player.kd)}`;
          kdBadge.textContent = player.kd.toFixed(2);
          kdCell.appendChild(kdBadge);
          row.appendChild(kdCell);
          
          // Team
          const teamCell = document.createElement("td");
          teamCell.textContent = player.team.toString();
          teamCell.className = getTeamClass(player.team);
          row.appendChild(teamCell);
          
          // Kills
          const killsCell = document.createElement("td");
          killsCell.textContent = player.kills.toString();
          killsCell.className = "meow-kills-display";
          row.appendChild(killsCell);
          
          // Platform
          const platformCell = document.createElement("td");
          const platformBadge = document.createElement("span");
          platformBadge.className = "meow-platform-badge";
          platformBadge.textContent = player.platform || "UNK";
          platformCell.appendChild(platformBadge);
          row.appendChild(platformCell);
          
          // Health with progress bar
          const healthCell = document.createElement("td");
          healthCell.appendChild(createHealthBar(player.health));
          row.appendChild(healthCell);
          
          // Ping
          const pingCell = document.createElement("td");
          pingCell.textContent = `${player.ping}ms`;
          pingCell.className = getPingStatusClass(player.ping);
          row.appendChild(pingCell);
          
          tbody.appendChild(row);
        });
      } catch (error) {
        console.error("Error updating player list:", error);
      }
      
      setTimeout(updatePlayerList, 500);
    }

    // Start updating
    updatePlayerList();

    // Return clean control functions
    return {
      setVisible: function(visible) {
        overlay.style.display = visible ? "block" : "none";
      },
      setPosition: function(position) {
        const positions = {
          topRight: { top: "20px", right: "20px", bottom: "auto", left: "auto" },
          topLeft: { top: "20px", left: "20px", bottom: "auto", right: "auto" },
          bottomRight: { bottom: "20px", right: "20px", top: "auto", left: "auto" },
          bottomLeft: { bottom: "20px", left: "20px", top: "auto", right: "auto" }
        };
        
        const pos = positions[position] || positions.bottomLeft;
        Object.assign(overlay.style, pos);
      },
      updateTitle: function(text) {
        title.textContent = text;
      }
    };
  }
}

export default PlayerListPanel;