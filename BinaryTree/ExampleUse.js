import NumberData from '../Data/NumberData.js';
import BinaryTree from './BinaryTree.js';

const B_Tree = new BinaryTree([]);

logInsert(19);
logInsert(12);
logInsert(49);
logInsert(9);
logInsert(15);
logInsert(31);
logInsert(54);
logInsert(0);
logInsert(13);
logInsert(17);
logInsert(28);
logInsert(43);
logInsert(51);
logInsert(56);
logInsert(29);
logInsert(40);
logInsert(48);
logInsert(53);
logInsert(57);
logInsert(38);

function logInsert(num){
  console.log(`Inserting ${num}`)
  B_Tree.insert(new NumberData(num));
  B_Tree.print();
  console.log(`\n`);
}