/* Create a new heap from an unordered array
 * You can pass in custom compare and key functions
 * The compare function should take (x, y) and return 1, 0, or -1 if it's >, ===, or <
 * The key function should take a val in the array and return the key for that elem
 * O(n log n)
 * (arr, func, func) -> heap
 */
function Heap (arr, compare, key) {
  if (!(this instanceof Heap)) return new Heap(arr)
  if (arr === undefined) arr = []
  if (compare === undefined) compare = defaultComparison
  if (key === undefined) key = defaultKey
  this.compare = compare
  this.key = key
  this.arr = arr
  return heapify(this)
}

/* Default comparison function is num compare
 * O(1)
 * (x, y) -> num
 */
function defaultComparison (x, y) {
  if (x === y) return 0
  if (x > y) return 1
  if (x < y) return -1
  throw new TypeError('Invalid value -- cant compare "' + x + '" and "' + y + '"')
}

/* Default key function -- identity
 */
function defaultKey (elem) { return elem }

/* Get the max elem
 * O(1)
 * heap(a) -> a
 */
Heap.prototype.findMax = function () { return findMax(this) }
function findMax (heap) {
  return heap.arr[0]
}

/* Insert new element
 * Inserts the element at the end and repairs heap with siftUp
 * O(log n)
 * (a, heap(a)) -> heap(a)
 */
Heap.prototype.insert = function (val) { return insert(val, this) }
function insert (val, heap) {
  heap.arr.push(val)
  return siftUp(heap.size() - 1, heap)
}

/* Repair a full heap by using siftDown
 * O(n log n)
 * (heap) -> heap
 */
function heapify (heap) {
  // Get the parent idx of the last node
  var start = iparent(heap.arr.length - 1)
  while (start >= 0) {
    siftDown(start, heap)
    start -= 1
  }
  return heap
}

/* Put an element in correct order by traversing up the tree, comparing with parent elems
 * O(log n)
 * (number, heap) -> heap
 */
Heap.prototype.siftUp = function (i) { return siftUp(i, this) }
function siftUp (i, heap) {
  var comp = heap.compare
  var key = heap.key
  while (i > 0) {
    var idxParent = iparent(i)
    var valParent = key(heap.arr[idxParent])
    var valSelf = key(heap.arr[i])
    if (comp(valParent, valSelf) === -1) {
      swap(heap.arr, idxParent, i)
      i = idxParent
    } else {
      return heap
    }
  }
  return heap
}

/* Put an element in correct order in the heap by traversing downwards
 * O(log n)
 * (number, heap) -> heap
 */
Heap.prototype.siftDown = function (i) { return siftUp(i, this) }
function siftDown (idx, heap) {
  var comp = heap.compare
  var key = heap.key
  while (ileft(idx) < heap.size()) {
    var idxLeft = ileft(idx)
    var idxRight = iright(idx)
    var valLeft = key(heap.arr[idxLeft])
    var valRight = key(heap.arr[idxRight])
    var valParent = key(heap.arr[idx])
    var max = idx // which child idx to swap with
    if (valRight !== undefined && comp(valParent, valRight) === -1 && comp(valRight, valLeft) === 1) {
      max = idxRight
    } else if (comp(valParent, valLeft) === -1) {
      max = idxLeft
    }
    if (max === idx) {
      // the root is greater than both children; we are done
      return heap
    } else {
      swap(heap.arr, idx, max)
      idx = max
    }
  }
  return heap
}

/* Merge two heaps, without altering the originals, returning a new heap
 * O(n log n)
 * (heap, heap) -> heap
 */
Heap.prototype.merge = function (other) { return merge(this, other) }
function merge (heap1, heap2) {
  var arr = heap1.arr.concat(heap2.arr)
  if (heap1.compare !== heap2.compare) throw new Error('Comparison functions do not match')
  return Heap(arr, heap2.compare)
}

/* Pop the root val from the heap
 * O(n log n)
 * (heap(a)) -> a
 */
Heap.prototype.pop = function () { return pop(this) }
function pop (heap) {
  var root = heap.arr.shift()
  heapify(heap)
  return root
}

/* Replace the root val on the heap
 * O(log n)
 * (heap(a)) -> a
 */
Heap.prototype.replace = function (val) { return replace(val, this) }
function replace (val, heap) {
  heap.arr[0] = val
  return siftDown(0, heap)
}

/* Pretty-print a heap using indentation formatting
 * O(n)
 * (heap, number) -> string
 */
Heap.prototype.indentFormat = function () { return indentFormat(this) }
Heap.prototype.toString = Heap.prototype.indentFormat
function indentFormat (heap, width) {
  if (width === undefined) width = 2
  function printBranches (root, level) {
    if (root > heap.size() - 1) return ''
    var str = ' '.repeat(level * width)
    str += heap.arr[root] + '\n'
    str += printBranches(ileft(root), level + 1)
    str += printBranches(iright(root), level + 1)
    return str
  }
  return printBranches(0, 0).trim() // remove last linebreak
}

// Functions to get the left, right or parent indexes from a given idx
function ileft (i) { return 2 * i + 1 }
function iright (i) { return 2 * i + 2 }
function iparent (i) { return Math.floor((i - 1) / 2) }

// Functions to get the left, right, or parent values form a given idx

Heap.prototype.left = function (i) { return left(i, this) }
function left (i, heap) { return heap.arr[ileft(i)] }

Heap.prototype.right = function (i) { return right(i, this) }
function right (i, heap) { return heap.arr[iright(i)] }

Heap.prototype.parent = function (i) { return parent(i, this) }
function parent (i, heap) { return heap.arr[iparent(i)] }

/* Get the total number of nodes in the tree
 * O(1)
 * (heap) -> number
 */
Heap.prototype.size = function () { return size(this) }
function size (heap) { return heap.arr.length }

/* Is the tree empty?
 * O(1)
 * (heap) -> boolean
 */
Heap.prototype.isEmpty = function () { return isEmpty(this) }
function isEmpty (heap) { return heap.length === 0 }

/* Swap two elements in an array
 */
function swap (arr, i1, i2) {
  var tmp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = tmp
  return arr
}

module.exports = {
  create: Heap,
  left: left,
  ileft: ileft,
  right: right,
  iright: iright,
  parent: parent,
  iparent: iparent,
  isEmpty: isEmpty,
  size: size,
  siftDown: siftDown,
  siftUp: siftUp,
  indentFormat: indentFormat,
  heapify: heapify,
  merge: merge
}
