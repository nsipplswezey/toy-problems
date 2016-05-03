module.exports.palindrome = function(str){
  var len = str.length;
  var finish = Math.floor(len/2);
  var back, front, match;
  var result = true;

  for(var i = 0; i < finish; i++){
    front = str[i];
    back = str[len - i - 1];
    match = (front === back)
    if(!match){
      result = false;
      return result;
    }
  }

  return result;

}
