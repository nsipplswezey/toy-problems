
//A tree is a set of nodes where each node has at most two children
//Each node has a value, and an array of children.
//Each node has at most two children.
//Any new tree always has a root
//This tree uses functional instatiation, returning an object

//We need a node constructor to turn data into default node

function Node(data){
 
  this.data = data;
  this.parent = null;
  this.children = [];

}

//We can use our node constructor to create a tree, which is just an object with a root node.

function Tree(data){
  var node = new Node(data);

  this._root = node;

}


Tree.prototype.traverseDF = function(callback){

  function recurse(currentNode){
    for (var i = 0; i < currentNode.children.length; i++){
      recurse(currentNode.children[i]);
    }

    callback(currentNode);

  }

  callback(this._root);
  recurse(this._root);

}

//This add node method just adds a new node to the first empty parent found in a DFS.
//First we create a new node
//Second we find the target parent
//Third we push the new node to the target parent

Tree.prototype.addNode = function(data){
  
  //create new node
  var newNode = new Node(data);

  //find target parent
  var parent = null;

  function findParent(currentNode){
    if (currentNode.children.length < 2){
      parent = currentNode;
      return;
    }
  }

  this.traverseDF(findParent);

  parent.children.push(newNode);

}


var newTree = new Tree({val:1});

newTree.addNode({val:2});

newTree.addNode({val:3});
newTree.addNode({val:4});
newTree.addNode({val:5});
newTree.addNode({val:6});
newTree.traverseDF((node) => {console.log(node)});
