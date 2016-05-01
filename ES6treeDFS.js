'use strict'

class Node {
  
  constructor(data){
    this.data = data;
    this.children = [];
  }

}

//depthFirst traversal goes to each node and invokes the callback on it 
//it depends on a recurse method, which is a method that conditionally calls itself
//based on some conditional logic
class Tree {

  constructor(data){
    this._root = new Node(data);
  }

  traverseDF(callback){
  
    function recurse(currentNode){
      
      for(let child of currentNode.children){
	
	recurse(child);
      
      }

      callback(currentNode)
    
    }

    recurse(this._root);
  
  }

  addNode(data){

    let newNode = new Node(data);

    function checkAndAdd(currentNode){
      
      if (currentNode.children && currentNode.children.length < 2){
        currentNode.children.push(newNode);
      }
    
    }

    this.traverseDF(checkAndAdd);
  
  }

}

const testNode = new Node({val:1});
const tree = new Tree({val:1});

tree._root.children.push(new Node({val:2}));
tree._root.children.push(new Node({val:3}));

tree.addNode({val:4});
tree.traverseDF(x => console.log(x));
