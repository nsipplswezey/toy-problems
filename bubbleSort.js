//Bubble sort compares each element in the array to the prior element
//Swaps them if the prior element is greater than the current element

var testArray =[5,4,3,2,1];

function bubbleSort(array){
  //we know it's sorted when we didn't touch it

  var touched = true;

  function sort(array){
    touched = false;
    for(var i = 0; i < array.length; i++){
    
      var current = array[i];
      var next = array[i + 1];

      if (next < current){
        array[i] = next;
        array[i+1] = current;
        touched = true;
      }

    }

    if(!touched){
      return array;
    }
  
  }

  while(touched){
    sort(array);
  } 
  
  return sort(array);

}



console.log(bubbleSort(testArray));
