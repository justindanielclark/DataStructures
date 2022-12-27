import NumberData from '../Data/NumberData.js';
import BinaryTree from './BinaryTree.js';

const array = []
for(let i = 1; i <= 25; i++){
  array.push(new NumberData(Math.floor(Math.random()*100)));
}

const B_Tree = new BinaryTree(array);

B_Tree.print();

// for(let i = 0; i < 20; i++){
//   logInsert(Math.floor(Math.random()*100));
// }


// function logInsert(num){
//   console.log(`Inserting ${num}`)
//   B_Tree.insert(new NumberData(num));
//   B_Tree.print();
//   console.log(`\n`);
// }