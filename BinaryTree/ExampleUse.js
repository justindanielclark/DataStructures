import NumberData from '../Data/NumberData.js';
import BinaryTree from './BinaryTree.js';

const B_Tree = new BinaryTree([]);
B_Tree.insert(new NumberData(5));
B_Tree.insert(new NumberData(15));
B_Tree.insert(new NumberData(25));
B_Tree.insert(new NumberData(10));
B_Tree.insert(new NumberData(2));
B_Tree.insert(new NumberData(12));
B_Tree.insert(new NumberData(22));
B_Tree.print();





// const array = []
// for(let i = 0; i < 64; i++){
//   array.push(new NumberData(i));
// }
// const sortAscendingNumbers = (a,b) => a.compareTo(b);
// const B_Tree = new BinaryTree(array, sortAscendingNumbers);
// B_Tree.print();
// const preorder = B_Tree.preorder();
// const inorder = B_Tree.inorder();
// const postorder = B_Tree.postorder();
// const levelorder = B_Tree.levelorder();
// const height = B_Tree.height(B_Tree.getRoot());
// const foundNode = B_Tree.findNode(new NumberData(6));
// const foundNodeBool = B_Tree.contains(new NumberData(6));
// const notFoundNode = B_Tree.findNode(new NumberData(600));
// const notFoundNodeBool = B_Tree.contains(new NumberData(600));
// console.log(
//   {
//     inorder, 
//     preorder, 
//     postorder,
//     levelorder,
//     height, 
//     foundNode: foundNode.toString(), 
//     notFoundNode, 
//     foundNodeBool, 
//     notFoundNodeBool
//   }
// );