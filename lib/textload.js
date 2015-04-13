var loadFromFile = function(file, callback) {
  if(!file || file.trim().length == 0) {
    callback('file not found', null);
    return;
  }
  callback(null, ("" + require('fs').readFileSync(file)));
};

var loadFromPipe = function(callback) {
  var text = "";
  process.stdin.on('data', function(chunk) {text += chunk; });
  process.stdin.on('end', function(){ callback(null, text); });
};

module.exports = function(getFilePath /* optional */) {
  getFilePath = getFilePath || function() { return process.argv[2]; };
  return function(callback) {
    if (process.stdin.isTTY) loadFromFile(getFilePath(), callback); // ex) node index.js hoge.txt
    else loadFromPipe(callback); // ex) cat hoge.txt | node index.js
  };
};
