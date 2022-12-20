class Data {
  constructor(){
    if(this.constructor === Data){
      throw new Error('Cannot Instantiate an Abstract Class');
    }
  }
  toString(){
    throw new Error('Class Must Implement Its Own -toString()-');
  }
  compareTo(otherData){
    throw new Error('Class Must Implement Its Own -compareTo()-');
  }
  get(){
    throw new Error('Class Must Implement Its Own -get()-');
  }
  set(datum){
    throw new Error('Class Must Implement Its Own -set()-');
  }
  shallowCopy(){
    throw new Error('Class Must Implement Its Own -shallowCopy()-');
  }
  deepCopy(){
    throw new Error('Class Must Implement Its Own -deepCopy()-');
  }
}

export default Data;