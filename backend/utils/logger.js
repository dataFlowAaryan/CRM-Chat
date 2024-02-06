function log(level, message) {
    const timestamp = new Date().toISOString();
    const callerInfo = getCaller();
    const cwd = process.cwd();

    const logMessage = `${new Date(Date.parse(timestamp)).toLocaleString()} [${callerInfo.fileName.split(cwd)[ 1 ]}:${callerInfo.lineNumber}] - ${level} - ${message}`;

    console.log(logMessage);
}

function error(message) {
    log("error", message);
}

function warning(message) {
    log("warning", message);
}

function info(message) {
    log("info", message);
}

function debug(message) {
    log("debug", message);
}

function getCaller() {
    const originalStackTrace = Error.prepareStackTrace;
    let caller;

    try {
        const err = new Error();
        Error.prepareStackTrace = (err, stack) => stack;
        const currentStack = err.stack;

        if (currentStack && currentStack.length > 3) {
            caller = currentStack[ 3 ];
        }
    } finally {
        Error.prepareStackTrace = originalStackTrace;
    }

    if (caller) {
        return {
            fileName: caller.getFileName(),
            lineNumber: caller.getLineNumber(),
            functionName: caller.getFunctionName(),
        };
    }

    return {};
}

const logger = {
    log,
    info,
    error,
    warning,
    debug
};

module.exports = logger;