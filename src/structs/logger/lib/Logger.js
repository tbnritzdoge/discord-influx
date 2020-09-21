const { markup, foreground } = require("./src/Escapes");

class Logger {
  constructor(options = {}) {
    this.options = options;
  }

  debug(text) {
    return console.log(
      `[${getCurrentTime()}] [${markup.bright}${foreground.yellow}DEBUG${markup.reset
      }] » ${text}`
    );
  }

  info(text) {
    return console.log(
      `[${getCurrentTime()}] [${markup.bright}${foreground.cyan}INFO${markup.reset
      }]  » ${text}`
    );
  }

  warn(text) {
    return console.log(
      `[${getCurrentTime()}] [${markup.bright}${foreground.magenta}WARN${markup.reset
      }]  » ${text}`
    );
  }
  log(text) {
    return console.log(
      `[${getCurrentTime()}] [${markup.bright}${foreground.green}LOG${markup.reset
      }]   » ${text}`
    );
  }
  error(text) {
    return console.log(
      `[${getCurrentTime()}] [${markup.bright}${foreground.red}ERROR${markup.reset
      }] » ${text}`
    );
  }
  wtf(text) {
    return console.log(
      `[${getCurrentTime()}] [${markup.bright}${foreground.red}WTF${markup.reset
      }]   » ${text}`
    );
  }
  verbose(text) {
    return console.log(
      `[${getCurrentTime()}] [${markup.bright}${foreground.red}VERBOSE${markup.reset
      }]   » ${text}`
    );
  }
}
function getCurrentTime() {
  const date = new Date();
  return (
    [
      (date.getMonth() + 1).padLeft(),
      date.getDate().padLeft(),
      date.getFullYear(),
    ].join("-") +
    " " +
    [
      date.getHours().padLeft(),
      date.getMinutes().padLeft(),
      date.getSeconds().padLeft(),
    ].join(":")
  );
}

Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};

module.exports = Logger;
