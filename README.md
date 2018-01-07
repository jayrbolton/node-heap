# node-heap

> Heap data structures for node & javascript

Heaps are useful for heap sort, priority queues, and other basic things. This supports min heaps, max heaps, and custom comparison functions.

This implementation uses a binary heap with a single flat array to store the tree.

## Usage

```js
var nodeHeap = require('node-heap')

var h = Heap.create([8, 0, 2, 6, 2, 9, 1, 5, 0])
h.findMax() // -> 9
h.insert(3)
h.isEmpty() // -> false
h.size() // -> 10
var root = h.pop() // -> 9
h.replace(10) // replace the root val with 10

console.log(h.indentFormat()) // -> prints an indentation-formatted tree of the heap
```

## API

### Heap.create(array, config)

Create a new heap from an unordered array. You can pass in custom compare and key functions with the config object. With custom key/compare functions, your array can contain any objects. With the default key and compare functions, it should be an array of numbers.

The config object can have these properties:

* `compare`: custom comparison function -- defaults to number comparison (<, >, ===)
* `key`: custom key function -- defaults to identity function
* `type`: 'min' or 'max' -- defaults to 'max'

The compare function should take (x, y) and return 1 if x is greater, -1 if x is less, and 0 if they are equal.

The key function should take an element in the array as an arg and return the key for that elem -- eg. an 'id' property in an object.
 
Performance: O(n log n)

### heap.findMax() or Heap.findMax(heap)

Get the maximum element (also the root element) in the heap. Does not affect the heap.

Can be either called as a method or a regular function.

### heap.insert(val) or Heap.insert(val, heap)

Insert a new element into the heap. The heap will maintain its heap ordering.

Can be either called as a method or a regular function.

Performance is O(log n)

### heap.merge(otherHeap) or Heap.merge(heap1, heap2)

Merge two heaps together into a single ordered heap.

Performance is O(n log n) -- this will be improved soon

### heap.pop() or Heap.pop(heap)

Remove the root element of the heap. 

Performance is O(n log n) -- this will be improved soon

### heap.replace(val) or Heap.replace(val, heap)

Replace the root element of the heap.

Performance is O(log n)

### heap.indentFormat(width) or Heap.indentFormat(heap, width)

Pretty print the heap tree as an indentation tree. Width is the optional number of spaces to indent -- deafults to 2

## Misc functions

These are behind-the-scenes functions that are mostly useful for inserting or popping, but they are exposed in the API in case they are found useful for some reason.

### heapify(heap)

Given a heap that might be totally unordered, order all the elements to obey the heap property. This is the main function used by Heap.create

Performance is O(n log n)

### heap.siftUp(index) or Heap.siftUp(index, heap)

Given the index of the element in the heap array, put it in its correct place by traversing up the tree. This is used in heap.insert.

Can be either called as a method or a regular function.

### heap.siftDown(index) or Heap.siftDown(index, heap)

Given the index of the element in the heap array, put it in its correct place by traversing down the tree. This is used in heapify.

Can be either called as a method or a regular function.

### Heap.ileft(index), Heap.iright(index), Heap.iparent(index)

Given the heap array index of some element, get the left child index, right child index, or parent index for that element. O(1)

### heap.left(index), Heap.left(index, heap), heap.right(index), Heap.right(index, heap), heap.parent(index), Heap.parent(index, heap)

Get the left-child value, right-child value, or the parent value for a given heap array elem index .

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install node-heap
```

## License

MIT
