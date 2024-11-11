const { exclusionList } = require('metro-config');

module.exports = {
  resolver: {
    blacklistRE: exclusionList([
    ]),
  },
};
