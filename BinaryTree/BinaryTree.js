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
  getHeight(){
    return Math.max(this.heightLeft, this.heightRight);
  }
  recalculateHeight(){
    if(this.left){
      this.heightLeft = this.left.getHeight()+1;
    } else {
      this.heightLeft = 0;
    }
    if(this.right){
      this.heightRight = this.right.getHeight()+1;
    } else {
      this.heightRight = 0;
    }
  }
  recalculateBalanceFactor(){
    this.balanceFactor = this.heightRight - this.heightLeft
  }
}
class BinaryTree {
  #root;
  #size;
  /**
   * Expects a sorted array on creation, will work without a sorted array but will cause unnecessary rotations. Can add items via insert in random order as tree is self-balancing
   * @param {Array} sortedArray
   */
  constructor(sortedArray = []){
    this.#root = null;
    this.#size = 0;
    this.#buildTree(array);
  }
  #buildTree(array){
    if(array.length < 1){
      return;
    }
    let placeInQue = 0;
    const que = [{start: 0, end: array.length-1}];
    const queToBuild = [];
    while(placeInQue < que.length){
      const {start, end} = que[placeInQue];
      if(start <= end){
        if(start === end){
          queToBuild.push(array[start]);
          placeInQue++;
        }
        else {
          const middle = Math.floor((start+end)/2);
          queToBuild.push(array[middle]);
          que.push({start, end: middle-1});
          que.push({start: middle+1, end});
          placeInQue++;
        }
      } else {
        placeInQue++;
      }
    }
  
    queToBuild.forEach(item => {
      console.log(item.toString())
      this.insert(item)
    })
    
  }
  insert(data){
    if(this.#root){
      const path = [];
      let duplicate = false;
      let foundSpot = false;
      let current = this.#root;
      while(!foundSpot){
        const compareResult = current.data.compareTo(data);
        if(compareResult === 0){
          duplicate = true;
          break;
        }
        else if(compareResult > 0){
          path.push({
            node: current, 
            dir: -1
          });
          if(current.left){
            current = current.left;
          } else {
            const newNode = new BinaryTreeNode(data);
            current.left = newNode;
            path.push({
              node: newNode,
              dir: 0
            });
            this.#size++;
            foundSpot = true;
          }
        }
        else {
          path.push({
            node: current, 
            dir: 1
          })
          if(current.right){
            current = current.right;
          } else {
            const newNode = new BinaryTreeNode(data);
            current.right = newNode;
            path.push({
              node: newNode, 
              dir: 0
            });
            this.#size++;
            foundSpot = true;
          }
        }
      }
      if(!duplicate){ 
        for(let [i, height] = [path.length-1, 1]; i > 0; i--){
          const parentNodePath = path[i-1];
          const childNodePath = path[i];
          const {node: parentNode, dir} = parentNodePath;
          if(dir === 1){
            if(height !== parentNode.heightRight){
              parentNode.heightRight = height;
              parentNode.recalculateBalanceFactor();
            }
          } else {
            if(height !== parentNode.heightLeft){
              parentNode.heightLeft = height;
              parentNode.recalculateBalanceFactor();
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
            this.#rotate(nodeA.balanceFactor, nodeB.balanceFactor, parentNodeConnection, nodeA, nodeB, nodeC);
            break;
          }
          height++;
        }
        for(let i = path.length-1; i < 0; i--){
          path[i].node.recalculateHeight();
        }
      }
    }
    else {
      this.#root = new BinaryTreeNode(data);
      this.#size++;
    }
  }
  delete(data){
    const path = [];
    let current = this.#root;
    let foundNode = false;
    while(current && !foundNode){
      const compareResult = current.data.compareTo(data);
      if(compareResult === 0){
        foundNode = true;
      } else if (compareResult > 0) {
        path.push({
          node: current,
          dir: -1,

        })
      }
      else {}
    }
  }
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
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '} D:${node.data}, BF:${node.balanceFactor}, H:[${node.heightLeft},${node.heightRight}]`);
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
  #rotate(parentBalanceFactor, childBalanceFactor, nodeAParentConnection, nodeA, nodeB, nodeC){
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
      nodeA.heightLeft = nodeA.left ? nodeA.left.getHeight() + 1 : 0
      nodeB.heightRight += 1;
      nodeA.recalculateBalanceFactor();
      nodeB.recalculateBalanceFactor();
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
      const nodes = [nodeA, nodeB, nodeC];
      const CL = nodeC.left;
      const CR = nodeC.right;
      nodeC.left = nodeB;
      nodeC.right = nodeA;
      nodeA.left = CR;
      nodeB.right = CL;
      nodes.forEach(node=>{
        node.recalculateHeight();
        node.recalculateBalanceFactor();
      })
      
    }
    function RL_Rotation(nodeAParentConnection, nodeA, nodeB, nodeC){
      console.log('RL_Rotation')
      //Done when with a RL Imbalance (+2) at parent with a (-1) at the child
      nodeAParentConnection(nodeC);
      const nodes = [nodeA, nodeB, nodeC];
      const CL = nodeC.left;
      const CR = nodeC.right;
      nodeC.left = nodeA;
      nodeC.right = nodeB;
      nodeA.right = CL;
      nodeB.left = CR;
      nodes.forEach(node=>{
        node.recalculateHeight();
        node.recalculateBalanceFactor();
      })
    }
  }
}

export default BinaryTree;