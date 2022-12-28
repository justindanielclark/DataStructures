import NumberData from '../Data/NumberData.js';
import BinarySearchTree from './BinarySearchTree.js';

const array = []
// for(let i = 1; i <= 25; i++){
//   array.push(new NumberData(i));
// }
const B_Tree = new BinarySearchTree(array);
B_Tree.insert(new NumberData(10));
B_Tree.insert(new NumberData(20));
B_Tree.print();
B_Tree.delete(10);
B_Tree.print();

// ISSUE REMOVING ROOT