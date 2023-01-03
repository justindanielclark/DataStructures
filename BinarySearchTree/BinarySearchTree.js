import SingleLinkList from "../SingleLinkList/SingleLinkedList.js";
class BinarySearchTreeNode {
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
class BinarySearchTree {
  #root;
  #length;
  /**
   * Expects a sorted array on creation, will work without a sorted array but will cause unnecessary rotations. Can add items via insert in random order as tree is self-balancing
   * @param {Array} sortedArray
   */
  constructor(sortedArray = []){
    this.#root = null;
    this.#length = 0;
    this.#buildTree(sortedArray);
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
            const newNode = new BinarySearchTreeNode(data);
            current.left = newNode;
            path.push({
              node: newNode,
              dir: 0
            });
            this.#length++;
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
            const newNode = new BinarySearchTreeNode(data);
            current.right = newNode;
            path.push({
              node: newNode, 
              dir: 0
            });
            this.#length++;
            foundSpot = true;
          }
        }
      }
      if(!duplicate){ 
        for(let i = path.length-1; i >= 0; i--){
          const {node} = path[i];
          node.recalculateHeight();
          node.recalculateBalanceFactor();
          if(Math.abs(node.balanceFactor) === 2){
            let parentFunc;
            if(i === 0){
              parentFunc = (node) => {this.#root = node}
            }
            else {
              const {node: parentNode, dir} = path[i-1];
              if(dir === 1){
                parentFunc = (node) => {parentNode.right = node}
              }
              else {
                parentFunc = (node) => {parentNode.left = node}
              }
            }
            if(node.balanceFactor === 2){
              if(node.right.balanceFactor < 0){
                this.#RL_Rotation(parentFunc, node, node.right, node.right.left);
              } 
              else {
                this.#RR_Rotation(parentFunc, node, node.right);
              }
            }
            else {
              if(node.left.balanceFactor > 0){
                this.#LR_Rotation(parentFunc, node, node.left, node.left.right);
              } 
              else {
                this.#LL_Rotation(parentFunc, node, node.left);
              }
            }
            i--;
          }
        }
      }
    }
    else {
      this.#root = new BinarySearchTreeNode(data);
      this.#length++;
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
        path.push({
          node: current,
          dir: 0,
        })
      } else if (compareResult > 0) {
        path.push({
          node: current,
          dir: -1,
        });
        current = current.left;
      }
      else {
        path.push({
          node: current,
          dir: 1,
        });
        current = current.right;
      }
    }
    if(foundNode){
      if(this.#root === current){
        if(current.left && current.right){ //todo
          let replacementNode = current.left;
          path[0].dir = -1;
          path.push({node: replacementNode, dir: 1});
          while(replacementNode.right){
            replacementNode = replacementNode.right;
            path.push({node: replacementNode, dir: 1})
          }

          // Assign Replacement Right to Current Right and Link Replacements Left with it's parents right
          if(current.left !== replacementNode) {
            const {node: replacementNodeParent} = path[path.length-2];
            replacementNodeParent.right = replacementNode.left;
            replacementNode.left = current.left; 
          }
          replacementNode.right = current.right
          this.#root = replacementNode;
          //Swap Current and Replacement in the Path
          path[0].node = replacementNode;
        }
        else if(current.left){
          this.#root = current.left;
        }
        else if(current.right){
          this.#root = current.right
        }
        else {
          this.#root = null;
        }
      }
      else {
        const {node: parentNode, dir} = path[path.length-2]
        if(current.left && current.right){
          const currentIndex = path.length-1;
          let replacementNode = current.left;
          path[currentIndex].dir = -1;
          path.push({node: replacementNode, dir: 1})
          while(replacementNode.right){
            replacementNode = replacementNode.right;
            path.push({node: replacementNode, dir: 1})
          }
          // Assign Replacement Right to Current Right and Link Replacements Left with it's parents right
          if(current.left !== replacementNode) {
            const {node: replacementNodeParent} = path[path.length-2];
            replacementNodeParent.right = replacementNode.left;
            replacementNode.left = current.left; 
          }
          replacementNode.right = current.right
          //Swap Parent Link From Current -> ReplacementNode
          if(dir === 1){
            parentNode.right = replacementNode;
          }
          else {
            parentNode.left = replacementNode;
          }
          //Swap Current and Replacement in the Path
          path[currentIndex].node = replacementNode;
        }
        else if(current.left){
          if(dir === 1){
            parentNode.right = current.left;
          }
          else {
            parentNode.left = current.left;
          }
        }
        else if(current.right){
          if(dir === 1){
            parentNode.right = current.right;
          }
          else {
            parentNode.left = current.right;
          }
        }
        else {
          if(dir === 1){
            parentNode.right = null;
          }
          else {
            parentNode.left = null;
          }
        }
      }
      for(let i = path.length-2; i >= 0; i--){
        const {node} = path[i];
        node.recalculateHeight();
        node.recalculateBalanceFactor();
        if(node.balanceFactor >= 2 || node.balanceFactor <= -2){
          let parentFunc;
          if(i === 0){
            parentFunc = (node) => {this.#root = node}
          }
          else {
            const {node: parentNode, dir} = path[i-1];
            if(dir === 1){
              parentFunc = (node) => {parentNode.right = node}
            }
            else {
              parentFunc = (node) => {parentNode.left = node}
            }
          }
          if(node.balanceFactor === 2){
            if(node.right.balanceFactor === -1){
              this.#RL_Rotation(parentFunc, node, node.right, node.right.left);
            }
            else {
              this.#RR_Rotation(parentFunc, node, node.right);
            }
          }
          else {
            if(node.left.balanceFactor === 1){
              this.#LR_Rotation(parentFunc, node, node.left, node.left.right);
            }
            else {
              this.#LL_Rotation(parentFunc, node, node.left);
            }
          }
          
        }
      }
      this.#length--;
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
  length(){
    return this.#length;
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
  #RR_Rotation(nodeAParentConnection, nodeA, nodeB){
    nodeAParentConnection(nodeB);
    const {left: BLeft} = nodeB;
    nodeA.right = BLeft;
    nodeB.left = nodeA;
    nodeA.recalculateHeight();
    nodeB.recalculateHeight();
    nodeA.recalculateBalanceFactor();
    nodeB.recalculateBalanceFactor();
  }
  #RL_Rotation(nodeAParentConnection, nodeA, nodeB, nodeC){
    nodeAParentConnection(nodeC);
    const {left: CLeft, right: CRight} = nodeC;
    nodeC.left = nodeA;
    nodeC.right = nodeB;
    nodeA.right = CLeft;
    nodeB.left = CRight;
    nodeA.recalculateHeight();
    nodeB.recalculateHeight();
    nodeC.recalculateHeight();
    nodeA.recalculateBalanceFactor();
    nodeB.recalculateBalanceFactor();
    nodeC.recalculateBalanceFactor();
  }
  #LL_Rotation(nodeAParentConnection, nodeA, nodeB){
    nodeAParentConnection(nodeB);
    const {right: BRight} = nodeB;
    nodeA.left = BRight;
    nodeB.right = nodeA;
    nodeA.recalculateHeight();
    nodeB.recalculateHeight();
    nodeA.recalculateBalanceFactor();
    nodeB.recalculateBalanceFactor();
  }
  #LR_Rotation(nodeAParentConnection, nodeA, nodeB, nodeC){
    nodeAParentConnection(nodeC);
    const {left: CLeft, right: CRight} = nodeC;
    nodeC.left = nodeB;
    nodeC.right = nodeA;
    nodeA.left = CRight;
    nodeB.right = CLeft;
    nodeA.recalculateHeight();
    nodeB.recalculateHeight();
    nodeC.recalculateHeight();
    nodeA.recalculateBalanceFactor();
    nodeB.recalculateBalanceFactor();
    nodeC.recalculateBalanceFactor();
  }
}

export default BinarySearchTree;