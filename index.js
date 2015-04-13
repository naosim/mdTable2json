require('textload')()(function(err, md) {
  if(err) {
    console.log('[usage]');
    console.log('  file');
    console.log('    md2json tables.md');
    console.log('  pipe');
    console.log('    cat tables.md | md2json');
    return;
  }
  var result = require('./lib/mdTable2json.js')(md);
  console.log(JSON.stringify(result));
});
