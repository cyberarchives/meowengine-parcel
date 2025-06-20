import MeowEngine from "../../Browser/GlobalTypeDefs";

export class CanvasConsole {
  static createConsole() {
    const existing = document.getElementById("meow-log-container");
    if (existing) existing.remove();

    const logContainer = document.createElement("div");
    logContainer.id = "meow-log-container";
    logContainer.style.position = "fixed";
    logContainer.style.bottom = "20px";
    logContainer.style.left = "20px";
    logContainer.style.width = "500px";
    logContainer.style.height = "180px";
    logContainer.style.background = "linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 100%)";
    logContainer.style.backdropFilter = "blur(20px)";
    logContainer.style.border = "1px solid #ff6b35";
    logContainer.style.borderRadius = "12px";
    logContainer.style.boxShadow = "0 0 20px rgba(255, 107, 53, 0.3), 0 0 40px rgba(0, 212, 255, 0.1), inset 0 1px 0 rgba(255, 107, 53, 0.2)";
    logContainer.style.padding = "0";
    logContainer.style.overflow = "hidden";
    logContainer.style.fontFamily = "'Consolas', 'Monaco', 'Courier New', monospace";
    logContainer.style.fontSize = "13px";
    logContainer.style.zIndex = "9999";
    logContainer.style.transition = "opacity 0.3s ease";
    logContainer.style.pointerEvents = "none";
    document.body.appendChild(logContainer);

    const header = document.createElement("div");
    header.style.background = "linear-gradient(90deg, rgba(255, 107, 53, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)";
    header.style.padding = "8px 15px";
    header.style.borderBottom = "1px solid rgba(255, 107, 53, 0.3)";
    header.style.borderRadius = "12px 12px 0 0";
    header.style.fontWeight = "bold";
    header.style.color = "#00d4ff";
    header.style.display = "flex";
    header.style.alignItems = "center";
    header.style.justifyContent = "space-between";
    header.style.position = "relative";
    logContainer.appendChild(header);

    // Add glow line at top
    const glowLine = document.createElement("div");
    glowLine.style.position = "absolute";
    glowLine.style.top = "0";
    glowLine.style.left = "0";
    glowLine.style.right = "0";
    glowLine.style.height = "1px";
    glowLine.style.background = "linear-gradient(90deg, transparent, #ff6b35, transparent)";
    glowLine.style.borderRadius = "12px 12px 0 0";
    header.appendChild(glowLine);

    const title = document.createElement("div");
    title.innerHTML = '⚡ MeowLog <span style="font-size:11px;opacity:0.7;color:#ff6b35;">v2.0</span>';
    title.style.textShadow = "0 0 8px rgba(0, 212, 255, 0.5)";
    title.style.color = "#00d4ff";
    header.appendChild(title);

    const timestamp = document.createElement("div");
    timestamp.style.fontSize = "11px";
    timestamp.style.opacity = "0.7";
    timestamp.style.color = "#ff6b35";
    timestamp.style.textShadow = "0 0 4px rgba(255, 107, 53, 0.3)";
    header.appendChild(timestamp);

    function updateTimestamp() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      timestamp.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateTimestamp();
    setInterval(updateTimestamp, 1000);

    const content = document.createElement("div");
    content.id = "meow-log-content";
    content.style.height = "calc(100% - 38px)";
    content.style.overflowY = "auto";
    content.style.padding = "10px 15px";
    content.style.color = "#00d4ff";
    content.style.scrollBehavior = "smooth";
    content.style.background = "rgba(0, 0, 0, 0.2)";

    // Add custom scrollbar styling
    const scrollbarStyle = document.createElement("style");
    scrollbarStyle.textContent = `
      #meow-log-content::-webkit-scrollbar {
        width: 12px;
      }
      #meow-log-content::-webkit-scrollbar-track {
        background: #0f0f0f;
        border-radius: 6px;
      }
      #meow-log-content::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #ff6b35, #ff8c42);
        border: 1px solid #ff6b35;
        border-radius: 6px;
        box-shadow: 0 0 6px rgba(255, 107, 53, 0.3);
      }
      #meow-log-content::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #ff8c42, #ffad73);
        box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
      }
    `;
    document.head.appendChild(scrollbarStyle);

    logContainer.appendChild(content);

    MeowEngine.CanvasConsole.Log = function (message) {
      const line = document.createElement("div");
      line.style.marginBottom = "4px";
      line.style.lineHeight = "1.4";
      line.style.opacity = "0";
      line.style.transform = "translateX(-10px)";
      line.style.transition = "all 0.2s ease";
      line.style.color = "#00d4ff";

      // Support original <color=...>text</color>
      let formattedMessage = message.replace(
        /<color=(.*?)>(.*?)<\/color>/g,
        (_, color, text) => {
          return `<span style="color:${color}; text-shadow: 0 0 4px ${color}40;">${text}</span>`;
        }
      );

      // Additional syntax: <bold>text</bold> for bold text
      formattedMessage = formattedMessage.replace(
        /<bold>(.*?)<\/bold>/g,
        (_, text) => {
          return `<span style="font-weight:bold; color:#ff6b35; text-shadow: 0 0 4px rgba(255, 107, 53, 0.3);">${text}</span>`;
        }
      );

      // Additional syntax: <italic>text</italic> for italic text
      formattedMessage = formattedMessage.replace(
        /<italic>(.*?)<\/italic>/g,
        (_, text) => {
          return `<span style="font-style:italic; color:#ffb347; text-shadow: 0 0 4px rgba(255, 179, 71, 0.3);">${text}</span>`;
        }
      );

      // Additional syntax: <glow>text</glow> for text with glow effect
      formattedMessage = formattedMessage.replace(
        /<glow>(.*?)<\/glow>/g,
        (_, text) => {
          return `<span style="color:#00ff88; text-shadow: 0 0 8px rgba(0, 255, 136, 0.5);">${text}</span>`;
        }
      );

      // Additional syntax: <error>text</error> for error messages
      formattedMessage = formattedMessage.replace(
        /<error>(.*?)<\/error>/g,
        (_, text) => {
          return `<span style="color:#ff4757; text-shadow: 0 0 6px rgba(255, 71, 87, 0.4);">${text}</span>`;
        }
      );

      // Additional syntax: <success>text</success> for success messages
      formattedMessage = formattedMessage.replace(
        /<success>(.*?)<\/success>/g,
        (_, text) => {
          return `<span style="color:#00ff88; text-shadow: 0 0 6px rgba(0, 255, 136, 0.4);">${text}</span>`;
        }
      );

      // Additional syntax: <warning>text</warning> for warning messages
      formattedMessage = formattedMessage.replace(
        /<warning>(.*?)<\/warning>/g,
        (_, text) => {
          return `<span style="color:#ffb347; text-shadow: 0 0 6px rgba(255, 179, 71, 0.4);">${text}</span>`;
        }
      );

      // Automatically prefix with timestamp
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now
        .getMilliseconds()
        .toString()
        .padStart(3, "0")}`;

      line.innerHTML = `<span style="color:#ff6b35;opacity:0.7;font-size:11px;text-shadow: 0 0 3px rgba(255, 107, 53, 0.3);">[${timeStr}]</span> ${formattedMessage}`;
      content.appendChild(line);

      // Add entrance animation
      setTimeout(() => {
        line.style.opacity = "1";
        line.style.transform = "translateX(0)";
      }, 10);

      // Auto-scroll to bottom
      content.scrollTop = content.scrollHeight;

      // Optional: Fade out old entries (keep last 50)
      const entries = content.children;
      if (entries.length > 50) {
        entries[0].style.opacity = "0";
        entries[0].style.transform = "translateX(-10px)";
        setTimeout(() => {
          if (entries[0]) entries[0].remove();
        }, 300);
      }
    };

    // Add demo message
    setTimeout(() => {
        MeowEngine.CanvasConsole.Log(
        "<success>✓</success> MeowLog console <bold>initialized</bold> <glow>successfully</glow>"
      );
    }, 100);

    // Automatic opacity management (fade when not logging)
    let fadeTimeout;
    const originalLog = MeowEngine.CanvasConsole.Log;
    MeowEngine.CanvasConsole.Log = function (message) {
      logContainer.style.opacity = "1";
      clearTimeout(fadeTimeout);
      originalLog(message);
      fadeTimeout = setTimeout(() => {
        logContainer.style.opacity = "0.8";
      }, 3000);
    };

    // Add some example log messages to show off the styling
    setTimeout(() => {
      MeowEngine.CanvasConsole.Log("<warning>⚠</warning> System <italic>status</italic> check <bold>complete</bold>");
    }, 500);

    setTimeout(() => {
      MeowEngine.CanvasConsole.Log("<color=#c471ed>🎮</color> Game engine <glow>ready</glow> for <bold>operation</bold>");
    }, 1000);

    setTimeout(() => {
      MeowEngine.CanvasConsole.Log("<success>◉</success> All systems <bold>online</bold> - <italic>welcome to the matrix</italic>");
    }, 1500);
  }
}

export default CanvasConsole;