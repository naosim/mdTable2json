var assert = require('assert');
var mdTable2json = require('../lib/mdTable2json.js');

describe('mdTable2json', function () {
  it('single table', function () {
    var ip = '';
    ip += 'table\n';
    ip += '| name | age |\n';
    ip += '|------|-----|\n';
    ip += '| mike | 20  |\n';
    ip += '| kate | 30  |\n';
    ip += '\n';
    ip += 'hoge\n';
    var act = mdTable2json(ip);
    var exp = [ [ { name: 'mike', age: '20' }, { name: 'kate', age: '30' } ] ];
    assert.deepEqual(act, exp);
  });

  it('テーブル複数', function () {
    var ip = '';
    ip += 'table\n';
    ip += '| name | age |\n';
    ip += '|------|-----|\n';
    ip += '| mike | 20  |\n';
    ip += '| kate | 30  |\n';
    ip += '\n';
    ip += 'hoge\n';
    ip += '| item | value |\n';
    ip += '|------|-------|\n';
    ip += '| hoge | 5     |\n';
    ip += '| foo  | 8     |\n';
    var act = mdTable2json(ip);
    var exp = [
      [{ name: 'mike', age: '20' }, { name: 'kate', age: '30' }],
      [{ item: 'hoge', value: '5' }, { item: 'foo', value: '8' }],
    ];
    assert.deepEqual(act, exp);
  });

  it('key-value table', function () {
    var ip = '';
    ip += 'table\n';
    ip += '| key | value |\n';
    ip += '|------|-----|\n';
    ip += '| name | mike  |\n';
    ip += '| age | 20  |\n';
    ip += '\n';
    ip += 'hoge\n';
    var act = mdTable2json(ip);
    var exp = [ { name: 'mike', age: '20' } ];
    assert.deepEqual(act, exp);
  });
});
