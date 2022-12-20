class Node {
  #data;
  #next;
  constructor(data){
    this.#data = data;
    this.#next = null;
  }
  getData(){
    return this.#data
  }
  setData(data){
    this.#data = data;
  }
  getNext(){
    return this.#next;
  }
  setNext(node){
    this.#next = node;
  }
}
class SingleLinkList {
  #head;
  #tail;
  #size;
  /**
   * 
   * @param {Array} array (Optionally) Takes in an array and converts its contents into a Linked List.
   */
  constructor(array = []){
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
    if(array instanceof Array){
      array.forEach(value=>{
        this.append(value);
      })
    }
  }
  //Add Items
  append(data){
    const newNode = new Node(data);
    if(this.#tail){
      this.#tail.setNext(newNode)
      this.#tail = newNode;
    } else {
      this.#head = newNode;
      this.#tail = newNode;
    }
    this.#size++;
  }
  prepend(data){
    const newNode = new Node(data);
    if(this.#head){
      newNode.setNext(this.#head);
      this.#head = newNode;
    }
    else {
      this.#head = newNode;
      this.#tail = newNode;
    }
    this.#size++;
  }
  insertAt(index, data){
    if(index === 0){
      this.prepend(data);
      return;
    }
    if(index === this.#size-1){
      this.append(data);
      return;
    }
    if(!this.#atSafe(index-1)){
      throw new Error(`[LinkedList.js]: Unable to Add Element at Index:${index}, Out of Bounds`);
    } else {
      const prev = this.#at(index-1);
      const current = new Node(data);
      const post = prev.getNext();
      prev.setNext(current);
      current.setNext(post);
      this.#size++;
      return;
    }
  }
  //Remove Items
  pop(){
    if(this.#size === 0){
      return null;
    }
    if(this.#size === 1){
      const returnVal = this.#head.getData();
      this.#head = null;
      this.#tail = null;
      this.#size--;
      return returnVal;
    }
    let currentNode = this.#head;
    for(let i = 1; i < this.#size-1; i++){
      currentNode = currentNode.getNext();
    }
    const returnVal = currentNode.getNext().getData();
    currentNode.setNext(null);
    this.#tail = currentNode;
    this.#size--;
    return returnVal;
  }
  shift(){ 
    if(this.#size === 0){
      return null;
    }
    if(this.#size === 1){
      const returnVal = this.#head.getData();
      this.#head = null;
      this.#tail = null;
      this.#size--;
      return returnVal;
    }
    const returnVal = this.#head.getData();
    this.#head = this.#head.getNext()
    this.#size--;
    return returnVal;
  }
  removeAt(index){
    if(index === 0){
      return this.shift();
    }
    if(index === this.#size-1){
      return this.pop();
    }
    if(!this.#atSafe(index)){
      throw new Error(`[LinkedList.js]: Unable to Remove Element at Index:${index}, Out of Bounds`);
    } else {
      const prev = this.#at(index-1);
      const current = prev.getNext();
      const post = current.getNext();
      prev.setNext(post);
      this.#size--;
    }
    
  }
  empty(){
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }
  //Utility
  #at(index){
    let currentIndex = 0;
    let currentNode = this.#head;
    while(currentIndex !== index){
      currentNode = currentNode.getNext();
      currentIndex++;
    }
    return currentNode;
  }
  #atSafe(index){
    return (index < this.#size && index >= 0);
  }
  getSize(){
    return this.#size;
  }
  contains(data){
    let currentNode = this.#head;
    if(currentNode.getData().compareTo && data.compareTo){
      while(currentNode){
        if(currentNode.getData().compareTo(data) === 0){
          return true;
        }
        currentNode = currentNode.getNext();
      }
      return false;
    }
    else {
      while(currentNode){
        if(currentNode.getData() === data){
          return true;
        }
        currentNode = currentNode.getNext();
      }
      return false;
    }
  }
  toString(){
    let message = '[';
    let currentNode = this.#head;
    while(currentNode){
      message += currentNode.getData().toString();
      currentNode = currentNode.getNext();
      if(currentNode){
        message += ', '
      }
    }
    message += ']';
    return message;
  }
  getHead(){
    return this.#head;
  }
  getTail(){
    return this.#tail;
  }
  
}
export default SingleLinkList;