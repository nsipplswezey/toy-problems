function palindrome(str){
  var len = str.length;
  var finish = Math.floor(len/2);
  var back, front, match;
  var result = true;

  for(var i = 0; i < finish; i++){
    front = str[i];
    back = str[len - i - 1];
    console.log(front + ' ' + back);
    match = (front === back);

    console.log(match);

    if(!match){
      result = false;
      return result;
    }
  }

  return result;

}

console.log(palindrome('bob'));
console.log(palindrome('dob'));


