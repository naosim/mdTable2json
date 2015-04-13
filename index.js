var marked = require('marked');
var htmlTable2json = require('./lib/htmlTable2json.js');
var fs = require('fs');
module.exports = function () {};

if (require.main === module) {
  // main
  require(__dirname + '/lib/textload.js')()(function(err, md) {
    if(err) {
      console.log('' + fs.readFileSync('usage.txt'));
      return;
    }
    var result = htmlTable2json(marked(md));
    console.log(JSON.stringify(result));
  });
} else {
  // module
  module.exports = function(md) {
    return htmlTable2json(marked(md));
  };
}
