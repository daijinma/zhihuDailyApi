//utils.js

module.exports = {
	extend:function extend(a, b) {
	  for (var key in b)
	    a[key] = b[key];

	  return a;
	}
}