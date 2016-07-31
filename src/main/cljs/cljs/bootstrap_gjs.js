/**
 * @nocompile
 */
var CLJS_ROOT = ".";

window.goog = {}

window.CLOSURE_IMPORT_SCRIPT = function(src) {
  var mod = imports;
  src.substring(0, src.length-3).split('/').forEach(function(submod) {
    mod = mod[submod];
  });
  return true;
};

var _googBase = imports.goog.base;
