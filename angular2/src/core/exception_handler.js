System.register(["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var isPresent,
      print,
      ListWrapper,
      isListLikeIterable,
      ExceptionHandler;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      print = $__m.print;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      isListLikeIterable = $__m.isListLikeIterable;
    }],
    execute: function() {
      ExceptionHandler = $__export("ExceptionHandler", (function() {
        var ExceptionHandler = function ExceptionHandler() {};
        return ($traceurRuntime.createClass)(ExceptionHandler, {call: function(error) {
            var stackTrace = arguments[1] !== (void 0) ? arguments[1] : null;
            var reason = arguments[2] !== (void 0) ? arguments[2] : null;
            var longStackTrace = isListLikeIterable(stackTrace) ? ListWrapper.join(stackTrace, "\n\n") : stackTrace;
            var reasonStr = isPresent(reason) ? ("\n" + reason) : '';
            print(("" + error + reasonStr + "\nSTACKTRACE:\n" + longStackTrace));
          }}, {});
      }()));
    }
  };
});

//# sourceMappingURL=angular2/src/core/exception_handler.map

//# sourceMappingURL=../../../angular2/src/core/exception_handler.js.map