// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(inputObj) {
  // text for type of obj
  var counter = 0;
  var inner = function(obj) {
    var holder;
    counter += 1;
    console.log("counter is ", counter);
    //if counter = 0, first time inner is called, stringify primitives, otherwise check type to see whether to
    //stringify
    if( typeof obj === "boolean") return counter === 1?  '' + obj + '':  obj;
    else if( typeof obj === "number") return isFinite(obj) ? String(obj) : 'null';
    else if( typeof obj === "undefined" ) return '';
    else if( obj === null ) return counter === 1?  'null': null;
    else if ( typeof obj === "string" ) return '"' + obj + '"';
    else if ( typeof obj === "object" ) {
      holder = [];
    	if ( Array.isArray(obj) ) {
    		//do stuff if it's an array
        obj.forEach(function(item, index) {
          holder.push(inner(item));
        });
        holder = "[" + holder.join(",") + "]";
        return '' + holder + '';
    	} else if( obj.constructor === Object ) {
    		//do stuff if it's an object
        //var holder;
        if( Object.keys(obj).length === 0 ) {
          //console.log("got here ");
          holder = ["{}"].join("");
          //console.log("holder for empty object is ", holder);
          return holder;
        } 

        else { 
          _.each(obj, function(item, index) {
            //skip if value is function
            if(typeof item === "function") {}
            else if( typeof item === "undefined") {}
            else {
              holder.push( '"' + index + '"' + ':' + inner(item));
            }
          });

/*
          for( var key in obj ) {
            //console.log("key is ", key);
            //console.log("obj is ", obj);
            if( obj.hasOwnProperty(key) ) {
              //key = key.toString("");
              //console.log("key is ", key);
              holder.push( '"' + key + '"' + ':' + inner(obj[key]));
              
            }
          //holder[key] = inner(obj[key]);
          //holder = "'{" + key.toStrig() + ":" + inner(obj[key]).toString() + "}'"; 
          }
          */
          holder = '{' + holder.join(',') + '}';
          //console.log("holder inside is ", holder);
          
         
          console.log("holder during iter is ", holder);

          //console.log("String(holder) is ", String(holder));
          //console.log("holder at end is ", holder); 
          return holder;
        }
        
    	}
    }
  };
  
					

  return inner(inputObj);
};
