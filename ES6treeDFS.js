'use strict'

class Node {
  
  constructor(data){
    this.data = data;
    this.children = [];
  }

}

//depthFirst traversal goes to each node, starting with deepest nodes, and invokes callback on it 

class Tree {

  constructor(data){
    this._root = new Node(data);
  }

  traverseDF(callback){
  
    function recurse(currentNode){
      
      for(let child of currentNode.children){
	
	recurse(child);
      
      }

      callback(currentNode);
    
    }

    recurse(this._root);
  
  }


  /*
   * Uses depth first traversal to invoke a callback that returns true or false
   *
   */
  contains(data){
    let result = null;

    function findNode(currentNode){

      if(!result && currentNode.data.val === data){
        result = true;
      }

    }

    this.traverseDF(findNode);

    return result;
  }

  addNode(data, target){

    let newNode = new Node(data);
    let parentNode = null;

    function findParent(currentNode){

      let openParent = currentNode.children.length < 2;
      
        if(!parentNode && openParent){
	  parentNode = currentNode;
	  return;

	}
	  
      }

    this.traverseDF(findParent);

    parentNode.children.push(newNode);
  
  }

}

const tree = new Tree({val:1});

tree._root.children.push(new Node({val:2}));
tree._root.children.push(new Node({val:3}));

console.log(tree.contains(2));

tree.addNode({val:4});
console.log(tree.contains(4));
tree.traverseDF(x => console.log(x.data.val));
