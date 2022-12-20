import Data from './Data.js';
class NumberData extends Data {
  #datum;
  constructor(datum){
    super();
    this.#datum = datum;
  }
  compareTo(otherData){
    if(this.#datum === otherData.get()){
      return 0;
    }
    else if(this.#datum > otherData.get()){
      return 1;
    }
    else{
      return -1;
    }
  }
  toString(){
    return this.#datum;
  }
  get(){
    return this.#datum;
  }
  set(datum){
    this.#datum = datum;
  }
  shallowCopy(){
    return this.#datum;
  }
  deepCopy(){
    return this.#datum;
  }
}
export default NumberData;