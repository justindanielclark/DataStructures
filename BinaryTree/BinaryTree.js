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
          path.push({
            node: current, 
            data: current.data.toString(),
            dir: -1
          });
          if(current.left){
            current = current.left;
          } else {
            const newNode = new BinaryTreeNode(data);
            current.left = newNode;
            path.push({
              node: newNode, 
              data: newNode.data.toString(),
              dir: 0
            });
            this.#size++;
            foundSpot = true;
          }
        }
        if(current.data.compareTo(data) < 0){
          path.push({
            node: current, 
            data: current.data.toString(),
            dir: 1
          })
          if(current.right){
            current = current.right;
          } else {
            const newNode = new BinaryTreeNode(data);
            current.right = newNode;
            path.push({
              node: newNode, 
              data: newNode.data.toString(),
              dir: 0
            });
            this.#size++;
            foundSpot = true;
          }
        }
      }

      for(let [i, height] = [path.length-1, 1]; i > 0; i--){
        const parentNodePath = path[i-1];
        const childNodePath = path[i];
        const {node: parentNode, dir} = parentNodePath;
        if(dir === 1){
          if(height !== parentNode.heightRight){
            parentNode.heightRight = height;
            parentNode.balanceFactor = parentNode.heightRight-parentNode.heightLeft;
          }
        } else {
          if(height !== parentNode.heightLeft){
            parentNode.heightLeft = height;
            parentNode.balanceFactor = parentNode.heightRight-parentNode.heightLeft;
          }
        }
        if(Math.abs(parentNode.balanceFactor) === 2){
          let parentNodeConnection;
          const nodeA = path[i-1].node;
          const nodeB = path[i].node;
          const nodeC = path[i+1].node;
          if(i-1 === 0){
            parentNodeConnection = (node) => this.#root = node;
          } else {
            const parentNodeForRebalacing = path[i-2].node;
            parentNodeConnection = path[i-2].dir === 1 ? node => parentNodeForRebalacing.right = node : node => parentNodeForRebalacing.left = node;
          }
          rotate(nodeA.balanceFactor, nodeB.balanceFactor, parentNodeConnection, nodeA, nodeB, nodeC);
          break;
        }
        height++;
      }
    }
    else{
      this.#root = new BinaryTreeNode(data);
      this.#size++;
    }
    function rotate(parentBalanceFactor, childBalanceFactor, nodeAParentConnection, nodeA, nodeB, nodeC){
      if(parentBalanceFactor === 2){
        childBalanceFactor === 1 ? RR_Rotation(nodeAParentConnection, nodeA, nodeB) : RL_Rotation(nodeAParentConnection, nodeA, nodeB, nodeC);
      }
      else if(parentBalanceFactor === -2){
        childBalanceFactor === -1 ? LL_Rotation(nodeAParentConnection, nodeA, nodeB) : LR_Rotation(nodeAParentConnection, nodeA, nodeB, nodeC);
      }
      function LL_Rotation(nodeAParentConnection, nodeA, nodeB){
        console.log('LL_Rotation')
        //Done when with a LL Imbalance (-2) at parent with (-1) at direct left child
        const {right: BRight} = nodeB;
        nodeAParentConnection(nodeB);
        nodeA.left = BRight;
        nodeB.right = nodeA;
        nodeA.heightLeft -= 2;
        nodeB.heightRight += 1;
        nodeA.balanceFactor = nodeA.heightRight - nodeA.heightLeft;
        nodeB.balanceFactor = nodeB.heightRight - nodeB.heightLeft;
      }
      function RR_Rotation(nodeAParentConnection, nodeA, nodeB){
        console.log('RR_Rotation')
        //Done when with a LL Imbalance (+2) at parent with (+1) at direct right child
        const {left: BLeft} = nodeB;
        nodeAParentConnection(nodeB);
        nodeA.right = BLeft;
        nodeB.left = nodeA;
        nodeA.heightRight -= 2;
        nodeB.heightLeft += 1;
        nodeA.balanceFactor = nodeA.heightLeft - nodeA.heightRight;
        nodeB.balanceFactor = nodeB.heightLeft - nodeB.heightRight;
      }
      function LR_Rotation(nodeAParentConnection, nodeA, nodeB, nodeC){
        console.log('LR_Rotation')
        //Done when with a LR Imbalance (-2) at parent with a (+1) at the child
        nodeAParentConnection(nodeC);
        nodeA.left = null;
        nodeB.right = null;
        nodeC.right = nodeA;
        nodeC.left = nodeB;
      }
      function RL_Rotation(nodeAParentConnection, nodeA, nodeB, nodeC){
        console.log('RL_Rotation')
        //Done when with a RL Imbalance (+2) at parent with a (-1) at the child
        nodeAParentConnection(nodeC);
        nodeC.left = nodeA;
        nodeC.right = nodeB;
        nodeA.right = null;
        nodeB.left = null;
      }
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
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}(${node.data},${node.balanceFactor})`);
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