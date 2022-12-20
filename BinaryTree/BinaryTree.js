import SingleLinkList from "../SingleLinkList/SingleLinkedList.js";
class BinaryTreeNode {
  constructor(data){
    this.data = data;
    this.balanceFactor = 0;
    this.heightLeft = 0;
    this.heightRight = 0;
    this.left = null;
    this.right = null;
  }
  toString(){
    return this.data.toString();
  }
}
class BinaryTree {
  #root;
  #size;
  #sortingFunc;
  constructor(array){
    this.#root = null;
    this.#size = 0;
    // this.#buildTree(array, sortFunc);
  }
  // #buildTree(array, sortFunc){
  //   if(array.length < 1){
  //     return;
  //   }
  //   const sortedArray = array.sort(sortFunc);
  //   const sortedArrayWithoutDuplicates = [];
  //   if(sortedArray.length > 0){
  //     sortedArrayWithoutDuplicates.push[sortedArray[0]]
  //   }
  //   for(let i = 1; i < sortedArray.length; i++){
  //     if(sortedArray[i].compareTo(sortedArray[i-1]) !== 0){
  //       sortedArrayWithoutDuplicates.push(sortedArray[i]);
  //     }
  //   }
  //   this.#size = sortedArrayWithoutDuplicates.length;
  //   let start = 0;
  //   let end = sortedArrayWithoutDuplicates.length-1;
  //   let middle = Math.floor((start+end)/2);
  //   this.#root = new BinaryTreeNode(sortedArrayWithoutDuplicates[middle]);  
  //   this.#root.left = addNode(start, middle-1);
  //   this.#root.right = addNode(middle+1, end);
  //   function addNode(start, end){
  //     if(start === end){
  //       return new BinaryTreeNode(sortedArrayWithoutDuplicates[start]);
  //     } else if (start > end){
  //       return null;
  //     }
  //     else {
  //       const middle = Math.floor((start+end)/2);
  //       const newNode = new BinaryTreeNode(sortedArrayWithoutDuplicates[middle]);
  //       newNode.left = addNode(start, middle-1)
  //       newNode.right = addNode(middle+1, end);
  //       return newNode;
  //     }
  //   }
  // }
  insert(data){
    if(this.#root){
      const path = [];
      let foundSpot = false;
      let current = this.#root;
      while(!foundSpot){
        if(current.data.compareTo(data) === 0){
          break;
        }
        if(current.data.compareTo(data) > 0){
          path.push({node: current, dir: -1});
          if(current.left){
            current = current.left;
          } else {
            const newNode = new BinaryTreeNode(data);
            current.left = newNode;
            path.push({node: newNode, dir: 0});
            this.#size++;
            foundSpot = true;
          }
        }
        if(current.data.compareTo(data) < 0){
          path.push({node: current, dir: 1})
          if(current.right){
            current = current.right;
          } else {
            const newNode = new BinaryTreeNode(data);
            current.right = newNode;
            path.push({node: newNode, dir: 0});
            this.#size++;
            foundSpot = true;
          }
        }
      }
      //Iterate Thru Path;
      console.log(path);
    }
    else{
      this.#root = new BinaryTreeNode(data);
      this.#size++;
    }
  }
  delete(data){} //todo
  contains(data){
    return this.findNode(data) ? true : false;
  }
  findNode(data){
    let current = this.#root;
    while(current){
      const compareResult = current.data.compareTo(data);
      if(compareResult === 0){
        return current;
      }
      else if(compareResult > 0){
        current = current.left;
      }
      else if(compareResult < 0){
        current = current.right;
      }
    }
    return null;
  }
  levelorder(func){
    if(this.#root){
      const que = new SingleLinkList([this.#root]);
      let current = que.getHead();
      if(func){
       while(current){
        const currentData = current.getData();
        if(currentData.left){
          que.append(currentData.left);
        }
        if(currentData.right){
          que.append(currentData.right);
        }
        func(current.getData());
        current = current.getNext();
       }
      }
      else {
        const returnArray = [];
        while(current){
          const currentData = current.getData();
          if(currentData.left){
            que.append(currentData.left);
          }
          if(currentData.right){
            que.append(currentData.right);
          }
          returnArray.push(currentData);
          current = current.getNext();
        }
        return returnArray;
      }
    } 
    else {
      if(!func){
        return [];
      }
    }
  }
  inorder(func){
    const que = [];
    if(this.#root){
      traverse(this.#root);
    }
    if(!func){
      return que;
    }
    function traverse(node){
      if(node.left){
        traverse(node.left);
      }
      if(func){
        func(node.data);
      }
      else {
        que.push(node.data);
      }
      if(node.right){
        traverse(node.right);
      }
    }
  } 
  preorder(func){
    const que = [];
    if(this.#root){
      traverse(this.#root);
    }
    if(!func){
      return que;
    }
    function traverse(node){
      if(func){
        func(node.data);
      }
      else {
        que.push(node.data);
      }
      if(node.left){
        traverse(node.left);
      }
      if(node.right){
        traverse(node.right);
      }
    }
  }
  postorder(func){
    const que = [];
    if(this.#root){
      traverse(this.#root);
    }
    if(!func){
      return que;
    }
    
    function traverse(node){
      if(node.left){
        traverse(node.left);
      }
      if(node.right){
        traverse(node.right);
      }
      if(func){
        func(node.data);
      }
      else {
        que.push(node.data);
      }
    }
  }
  getRoot(){
    return this.#root;
  }
  height(node){
    if(node === null){
      return 0;
    } else {
      return 1 + Math.max(this.height(node.left), this.height(node.right))
    }
  }
  depth(node){

  }
  #prettyPrint(node, prefix = '', isLeft = true){
    if (node.right !== null) {
      this.#prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.#prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
  print(){
    this.#prettyPrint(this.#root);
  }
  printFromValue(data){
    const foundNode = this.findNode(data);
    if(foundNode){
      this.printFromNode(foundNode);
    } else {
      console.log('Unable to Find Node with That Data Value');
    }
  }
  printFromNode(node){
    this.#prettyPrint(node);
  }
}

export default BinaryTree;