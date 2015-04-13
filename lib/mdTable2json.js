var md2json = function(md) {
  var LineParse = function() {
    var outTableStateAction = function(line) {
      if(line.indexOf('|') != -1) {
        stateAction = tableHeaderAction;
        stateAction(line);
      }
    };

    var tableHeaderAction = function(line) {
      currentArray = [];
      result.push(currentArray);
      currentArray.push(getValues(line));

      stateAction = SeparatorStateAction;
    };

    var SeparatorStateAction = function(line) {
      stateAction = tableValueStateAction;
    };

    var tableValueStateAction = function(line) {
      if(line.indexOf('|') != -1) {
        currentArray.push(getValues(line));
      } else {
        stateAction = outTableStateAction;
      }
    };
    var stateAction = outTableStateAction;
    var tableCount = 0;
    var result = [];
    var currentArray;

    var getValues = function(line) {
      return line.split('|').slice(1, -1).map(function(v){ return v.trim(); });
    };
    return {
      parse: function(line) { stateAction(line); },
      result: function() { return result; }
    };
  };

  var lineParse = LineParse();
  md.split('\n').forEach(lineParse.parse);

  var result = lineParse.result().map(function(table) {
    var keys = table[0];
    var rows = table.slice(1);
    if(keys.length == 2 && keys[0] == 'key' && keys[1] == 'value') {
      //key-value
      return rows.reduce(function(memo, v){
        memo[v[0]] = v[1];
        return memo;
      }, {});
    } else {
      //table
      return rows.map(function(values) {
        var a = {};
        keys.forEach(function(key, index) {
          a[key] = values[index];
        });
        return a;
      });
    }

  });
  return result;
};
module.exports = md2json;
