System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/core/annotations/template", "angular2/src/core/compiler/template_resolver"], function($__export) {
  "use strict";
  var assert,
      Map,
      MapWrapper,
      ListWrapper,
      Type,
      isPresent,
      Template,
      TemplateResolver,
      MockTemplateResolver;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }],
    execute: function() {
      MockTemplateResolver = $__export("MockTemplateResolver", (function($__super) {
        var MockTemplateResolver = function MockTemplateResolver() {
          $traceurRuntime.superConstructor(MockTemplateResolver).call(this);
          this._cmpTemplates = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(MockTemplateResolver, {
          setTemplate: function(component, template) {
            assert.argumentTypes(component, Type, template, Template);
            MapWrapper.set(this._cmpTemplates, component, template);
          },
          resolve: function(component) {
            assert.argumentTypes(component, Type);
            var override = MapWrapper.get(this._cmpTemplates, component);
            if (isPresent(override)) {
              return assert.returnType((override), Template);
            }
            return assert.returnType(($traceurRuntime.superGet(this, MockTemplateResolver.prototype, "resolve").call(this, component)), Template);
          }
        }, {}, $__super);
      }(TemplateResolver)));
      Object.defineProperty(MockTemplateResolver.prototype.setTemplate, "parameters", {get: function() {
          return [[Type], [Template]];
        }});
      Object.defineProperty(MockTemplateResolver.prototype.resolve, "parameters", {get: function() {
          return [[Type]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/mock/template_resolver_mock.map

//# sourceMappingURL=../../../angular2/src/mock/template_resolver_mock.js.map