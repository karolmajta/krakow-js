let Remote;
if (process.env.TARGET === 'web') {
    Remote = require('./target/web').Remote;
} else if (process.env.TARGET === 'webos') {
    Remote = require('./target/webos').Remote;
} else {
    throw new Error(`Unknown TARGET ${process.env.TARGET}`);
}

module.exports = {
    Remote,
};