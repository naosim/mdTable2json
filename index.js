var mdTable2json = require('./lib/mdTable2json.js');
var fs = require('fs');

module.exports = mdTable2json;
module.exports = function () {};

if (require.main === module) {
  // main
  require('textload')()(function(err, md) {
    if(err) {
      console.log('' + fs.readFileSync('usage.txt'));
      return;
    }
    var result = mdTable2json(md);
    console.log(JSON.stringify(result));
  });
} else {
  // module
  module.exports = mdTable2json
}
