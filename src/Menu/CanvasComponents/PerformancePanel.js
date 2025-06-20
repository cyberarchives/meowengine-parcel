import MeowEngine from "../../Browser/GlobalTypeDefs";

export class PerformancePanel {
  static initialize() {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
          .meow-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
          }
          
          .meow-console-header {
            position: absolute;
            top: 10px;
            right: 10px;
            background: linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%);
            backdropFilter: blur(20px);
            border: 1px solid #ff6b35;
            borderRadius: 8px;
            color: #00d4ff;
            font-size: 14px;
            padding: 8px 15px;
            font-weight: bold;
            min-width: 300px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-shadow: 0 0 8px rgba(0, 255, 170, 0.7);
            font-family: 'Courier New', monospace;
          }
          
          .meow-stats {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          
          .meow-separator {
            margin: 0 8px;
            opacity: 0.7;
          }
        `;
    document.head.appendChild(styleElement);

    const overlay = document.createElement("div");
    overlay.className = "meow-overlay";

    const header = document.createElement("div");
    header.className = "meow-console-header";

    const stats = document.createElement("div");
    stats.className = "meow-stats";

    const engineName = document.createElement("span");
    engineName.textContent = "MeowEngine";

    const separator1 = document.createElement("span");
    separator1.className = "meow-separator";
    separator1.textContent = "|";

    const fpsContainer = document.createElement("span");
    fpsContainer.textContent = "FPS: ";
    const fpsValue = document.createElement("span");
    fpsValue.textContent = "0";
    fpsContainer.appendChild(fpsValue);

    const separator2 = document.createElement("span");
    separator2.className = "meow-separator";
    separator2.textContent = "|";

    const pingContainer = document.createElement("span");
    pingContainer.textContent = "PING: ";
    const pingValue = document.createElement("span");
    pingValue.textContent = "0";
    pingContainer.appendChild(pingValue);

    stats.appendChild(engineName);
    stats.appendChild(separator1);
    stats.appendChild(fpsContainer);
    stats.appendChild(separator2);
    stats.appendChild(pingContainer);
    header.appendChild(stats);
    overlay.appendChild(header);

    document.body.appendChild(overlay);

    let frameCount = 0;
    let lastTime = performance.now();
    const fpsUpdateInterval = 500;

    function updateFPS(currentTime) {
      frameCount++;

      const elapsed = currentTime - lastTime;

      if (elapsed >= fpsUpdateInterval) {
        const fps = Math.round((frameCount / elapsed) * 1000);
        fpsValue.textContent = fps;

        if (fps >= 60) {
          fpsValue.style.color = "#00ff00";
        } else if (fps >= 30) {
          fpsValue.style.color = "#ffff00";
        } else {
          fpsValue.style.color = "#ff0000";
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(updateFPS);
    }

    function updatePing() {
      let ping = MeowEngine.LocalPlayer.Ping;
      pingValue.textContent = ping;

      if (ping < 100) {
        pingValue.style.color = "#00ff00";
      } else if (ping < 200) {
        pingValue.style.color = "#ffff00";
      } else {
        pingValue.style.color = "#ff0000";
      }

      setTimeout(updatePing, 3000);
    }

    requestAnimationFrame(updateFPS);
    updatePing();

    return {
      setVisible: function (visible) {
        overlay.style.display = visible ? "block" : "none";
      },
      setPosition: function (position) {
        if (position === "topRight") {
          header.style.top = "10px";
          header.style.right = "10px";
          header.style.bottom = "auto";
          header.style.left = "auto";
        } else if (position === "topLeft") {
          header.style.top = "10px";
          header.style.left = "10px";
          header.style.bottom = "auto";
          header.style.right = "auto";
        } else if (position === "bottomRight") {
          header.style.bottom = "10px";
          header.style.right = "10px";
          header.style.top = "auto";
          header.style.left = "auto";
        } else if (position === "bottomLeft") {
          header.style.bottom = "10px";
          header.style.left = "10px";
          header.style.top = "auto";
          header.style.right = "auto";
        }
      },
      updateGameName: function (name) {
        engineName.textContent = name;
      },
    };
  }
}

export default PerformancePanel;
