// var displayTree = tree => console.log(JSON.stringify(tree, null, 2));

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;

  this.levelOrder = function() {
    var queue = [];
    var itemsTraversed = []
    if (this.root === null) {
      return; // Empty tree, nothing to traverse
    }
    queue.push(this.root);
    itemsTraversed.push(this.root.value)

    while (queue.length !== 0) {
      var tempNode = queue.shift();

      if (tempNode.left !== null) {
        itemsTraversed.push(tempNode.left.value)
        queue.push(tempNode.left);
      }

      if (tempNode.right !== null) {
        itemsTraversed.push(tempNode.right.value)
        queue.push(tempNode.right);
      }
    }

    return itemsTraversed
  };

  this.reverseLevelOrder = function() {
    // create a node queue & item array
    var queue = []
    var itemsTraversed = []

    if (this.root === null) {
        return; // Empty tree, nothing to traverse
    }

    // init the queue & items traversed
    queue.push(this.root)
    itemsTraversed.push(this.root.value)

    // iterate over the queue until we hit the end
    while (queue.length !== 0) {
        var tempNode = queue.shift()

        // check the right first since it is reversed
        if (tempNode.right !== null) {
            // store the value & push the next node to traverse
            itemsTraversed.push(tempNode.right.value)
            queue.push(tempNode.right)
        }

        if (tempNode.left !== null) {
            // store the value & push the next node to traverse
            itemsTraversed.push(tempNode.left.value)
            queue.push(tempNode.left)
        }
    }

    return itemsTraversed
  }
}

// Create an instance of BinarySearchTree
var tree = new BinarySearchTree();

// Insert nodes into the tree
tree.root = new Node(1);
tree.root.left = new Node(2);
tree.root.right = new Node(3);
tree.root.left.left = new Node(4);
tree.root.left.right = new Node(5);

// Invoke levelOrder to traverse the tree
const leftToRight = tree.levelOrder();
console.log(leftToRight)

const rightToLeft = tree.reverseLevelOrder();
console.log(rightToLeft)
// Display the tree
// displayTree(tree);
