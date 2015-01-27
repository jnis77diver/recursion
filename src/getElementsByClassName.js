// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  //This solution looks a lot like Crockford's WalkTheDOM. I spent a long time studying this during my JS
  //J.C. course so it was stuck in my mind.
  var elemArray = [];
  //start DOM traversal at body
  var body = document.getElementsByTagName('body')[0];
  //inner function to do recursion, i.e. walking the DOM
  var inner = function(node) {
  	//check if node contains className and if so push to elemArray
  	if( node.classList.contains(className) ) {
  		elemArray.push(node);
  	}
  	node = node.firstChild;
  	//recurse over this child node and all siblings calling inner function if nodeType === 1
  	while( node ) {
  		if( node.nodeType === 1) {
  		  inner(node);
  		}
  		node = node.nextSibling;
  	}
  };
  inner(body);
  return elemArray;
};
