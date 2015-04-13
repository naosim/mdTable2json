var htmlTable2json = function(html) {
  var getInTag = function(str, tagName) {
    return str.split('<' + tagName + '>')
    .slice(1)
    .map(function(e) { return '<' + tagName + '>' + e; })
    .map(function(e) { return e.slice(0, e.indexOf('</' + tagName + '>')) + '</' + tagName + '>'; });
  };

  var getValue = function(str) {
    return str.split('>')[1].split('<')[0].trim();
  };

  var getHeaderValues = function(table) {
    var a = getInTag(table, 'thead')[0];
    return getInTag(a, 'th').map(getValue);
  };

  var getRows = function(table) {
    var contents = getInTag(table, 'tbody')[0];
    return getInTag(contents, 'tr')
      .map(function(row) { return getInTag(row, 'td').map(getValue); });
  };

  var mapJSON = function(table) {
    var header = getHeaderValues(table);
    var rows = getRows(table);

    if(header[0] == 'key' && header[1] == 'value') {
      // key-vakue table
      return rows.reduce(function(memo, row) {
        memo[row[0]] = row[1];
        return memo;
      }, {});
    } else {
      return rows.map(function(row) {
        return row.reduce(function(memo, value, index){
          memo[header[index]] = value;
          return memo;
        }, {});
      });
    }

  };

  return getInTag(html, 'table').map(mapJSON);
};
module.exports = htmlTable2json;
