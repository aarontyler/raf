/**
 * Expose `requestAnimationFrame()`.
 */

// Only export if we're in a browser environment
// This is a hack to make the phenomic build work - terrible!

if(typeof window !== 'undefined') {
  exports = module.exports = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || fallback;

  /**
   * Fallback implementation.
   */

  var prev = new Date().getTime();
  function fallback(fn) {
    var curr = new Date().getTime();
    var ms = Math.max(0, 16 - (curr - prev));
    var req = setTimeout(fn, ms);
    prev = curr;
    return req;
  }

  /**
   * Cancel.
   */

  var cancel = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.mozCancelAnimationFrame
    || window.clearTimeout;

  exports.cancel = function(id){
    cancel.call(window, id);
  };
}
