var test = require('tape')
var Heap = require('..')

test('create and siftDown', function (t) {
  var start = [5, 2, 4, 1, 3, 0, 2, 9, 0, 0]
  var heap = Heap.create(start)
  t.deepEqual(heap.arr, [9, 5, 4, 2, 3, 0, 2, 1, 0, 0])
  t.end()
})

test('insert and siftUp', function (t) {
  var start = [5, 2, 4, 1, 3, 0, 2]
  var heap = Heap.create(start)
  heap.insert(3)
  t.deepEqual(heap.arr, [5, 3, 4, 3, 2, 0, 2, 1])
  heap.insert(6)
  t.deepEqual(heap.arr, [6, 5, 4, 3, 2, 0, 2, 1, 3])
  heap.insert(0)
  t.deepEqual(heap.arr, [6, 5, 4, 3, 2, 0, 2, 1, 3, 0])
  t.end()
})

test('indentFormat', function (t) {
  t.strictEqual(Heap.create([6, 5, 4, 4, 3, 3, 2, 1]).indentFormat(), '6\n  5\n    4\n      1\n    3\n  4\n    3\n    2')
  t.end()
})

test('findMax', function (t) {
  t.strictEqual(Heap.create([3, 2, 1]).findMax(), 3)
  t.end()
})

test('merge', function (t) {
  var h1 = Heap.create([1, 5, 2, 3, 4])
  var h2 = Heap.create([0, 4, -2, 9])
  var h3 = h1.merge(h2)
  t.deepEqual(h3.arr, [ 9, 4, 5, 3, 1, 2, 4, -2, 0 ])
  t.end()
})

test('custom key & compare functions', function (t) {
  function compare (x, y) {
    if (x < y) return 1
    if (x > y) return -1
    if (x === y) return 0
  }
  function key (elem) {
    return Number(elem.id)
  }
  function Elem (id, name) {
    if (!(this instanceof Elem)) return new Elem(id, name)
    this.id = id
    this.name = name
    return this
  }
  Elem.prototype.toString = function () {
    return this.id + ' - ' + this.name
  }
  var h1 = Heap.create([Elem('0', 'a'), Elem('3', 'b'), Elem('1', 'c'), Elem('2', 'd')], {compare, key})
  var names = h1.arr.map(e => e.name)
  t.deepEqual(names, [ 'a', 'd', 'c', 'b' ])
  t.end()
})

test('replace', function (t) {
  var h1 = Heap.create([1, 5, 2, 3, 4])
  h1.replace(0)
  t.deepEqual(h1.arr, [4, 3, 2, 0, 1])
  h1.replace(-1)
  t.deepEqual(h1.arr, [3, 1, 2, 0, -1])
  t.end()
})

test('pop', function (t) {
  var h1 = Heap.create([1, 5, 2, 3, 4])
  var root = h1.pop()
  t.strictEqual(root, 5)
  t.deepEqual(h1.arr, [4, 2, 3, 1])
  root = h1.pop()
  t.strictEqual(root, 4)
  t.deepEqual(h1.arr, [3, 2, 1])
  t.end()
})

test('min heap', function (t) {
  var h1 = Heap.create([1, 5, 2, 3, 4], {type: 'min'})
  t.deepEqual(h1.arr, [1, 3, 2, 5, 4])
  t.end()
})

// Edge cases

test('all zeroes', function (t) {
  t.deepEqual(Heap.create([0, 0, 0, 0]).arr, [0, 0, 0, 0])
  t.end()
})

test('Infinity', function (t) {
  t.deepEqual(Heap.create([2, 1, Infinity]).arr, [Infinity, 1, 2])
  t.end()
})

test('wonky vals throw errs', function (t) {
  t.throws(() => Heap.create([null, undefined, 'x', [], {}]).arr, [null, undefined, 'x', [], {}])
  t.throws(() => Heap.create([['hi'], 1, 3, 2]).arr, [3, 2, null, 1])
  t.end()
})
