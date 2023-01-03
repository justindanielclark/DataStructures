import NumberData from '../Data/NumberData.js';
import BinarySearchTree from './BinarySearchTree.js';

const array = []
// for(let i = 1; i <= 25; i++){
//   array.push(new NumberData(i))
// }
const B_Tree = new BinarySearchTree(array);
insertIntoTree(16)
insertIntoTree(13)
insertIntoTree(19)
insertIntoTree(6)
insertIntoTree(14)
insertIntoTree(17)
insertIntoTree(22)
insertIntoTree(3)
insertIntoTree(9)
insertIntoTree(15)
insertIntoTree(16.5)
insertIntoTree(18)
insertIntoTree(20)
insertIntoTree(24)
insertIntoTree(1)
insertIntoTree(4)
insertIntoTree(7)
insertIntoTree(11)
insertIntoTree(17.5)
insertIntoTree(21)
insertIntoTree(23)
insertIntoTree(25)

deleteFromTree(16)



function insertIntoTree(num){
  console.log(`Inserting ${num} into tree...`)
  B_Tree.insert(new NumberData(num));
  B_Tree.print();
  console.log('\n\n');
}
function deleteFromTree(num){
  console.log(`Deleting ${num} from tree...`)
  B_Tree.delete(new NumberData(num))
  B_Tree.print();
  console.log('\n\n');
}
