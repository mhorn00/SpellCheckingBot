
function getCurTime() {
    const date = new Date();
    return (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
}

const logInfo = function (msg) {
    console.log('[' + getCurTime() + '] ' + '[Info] ' + msg);
}

const logWarn = function (msg) {
    console.log('\x1b[31m[' + getCurTime() + '] ' + '[Warn] ' + msg +'\x1b[0m');
}

const logFatal = function (msg) {
    console.error('\x1b[31m[' + getCurTime() + '] ' + '[Fatal] ' + msg +'\x1b[0m');
    throw new Error('Fatal');
}

const logDebug = function (msg) {
    console.log('[' + getCurTime() + '] ' + '[Debug] ' + msg);
}

module.exports = { logInfo, logWarn, logFatal, logDebug  };