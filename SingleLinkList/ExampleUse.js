import SingleLinkedList from "./SingleLinkedList.js";
import NumberData from "../Data/NumberData.js";
const List = new SingleLinkedList(
  [
    new NumberData(1),
    new NumberData(2),
    new NumberData(3),
    new NumberData(4),
    new NumberData(5),
  ]
);
List.append(new NumberData(6));
List.removeAt(2);
List.insertAt(2, new NumberData(3));
List.insertAt(0, new NumberData(-10));
List.insertAt(0, new NumberData(-10));
List.insertAt(0, new NumberData(-10));
List.insertAt(0, new NumberData(-10));
console.log(List.contains(new NumberData(6)))
logList(List);

function logList(List){
  console.log({
    List: List.toString(), 
    Head: List.getHead().toString(), 
    Tail: List.getTail().toString(), 
    Size: List.getSize()
  })
}