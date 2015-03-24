System.register(["angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/core/compiler/selector", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      el,
      DOM,
      SelectorMatcher,
      CssSelector,
      List,
      ListWrapper,
      MapWrapper;
  function main() {
    describe('SelectorMatcher', (function() {
      var matcher,
          matched,
          selectableCollector,
          s1,
          s2,
          s3,
          s4;
      function reset() {
        matched = ListWrapper.create();
      }
      beforeEach((function() {
        reset();
        s1 = s2 = s3 = s4 = null;
        selectableCollector = (function(selector, context) {
          ListWrapper.push(matched, selector);
          ListWrapper.push(matched, context);
        });
        matcher = new SelectorMatcher();
      }));
      it('should select by element name case insensitive', (function() {
        matcher.addSelectable(s1 = CssSelector.parse('someTag'), 1);
        expect(matcher.match(CssSelector.parse('SOMEOTHERTAG'), selectableCollector)).toEqual(false);
        expect(matched).toEqual([]);
        expect(matcher.match(CssSelector.parse('SOMETAG'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1]);
      }));
      it('should select by class name case insensitive', (function() {
        matcher.addSelectable(s1 = CssSelector.parse('.someClass'), 1);
        matcher.addSelectable(s2 = CssSelector.parse('.someClass.class2'), 2);
        expect(matcher.match(CssSelector.parse('.SOMEOTHERCLASS'), selectableCollector)).toEqual(false);
        expect(matched).toEqual([]);
        expect(matcher.match(CssSelector.parse('.SOMECLASS'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1]);
        reset();
        expect(matcher.match(CssSelector.parse('.someClass.class2'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1, s2, 2]);
      }));
      it('should select by attr name case insensitive independent of the value', (function() {
        matcher.addSelectable(s1 = CssSelector.parse('[someAttr]'), 1);
        matcher.addSelectable(s2 = CssSelector.parse('[someAttr][someAttr2]'), 2);
        expect(matcher.match(CssSelector.parse('[SOMEOTHERATTR]'), selectableCollector)).toEqual(false);
        expect(matched).toEqual([]);
        expect(matcher.match(CssSelector.parse('[SOMEATTR]'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1]);
        reset();
        expect(matcher.match(CssSelector.parse('[SOMEATTR=someValue]'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1]);
        reset();
        expect(matcher.match(CssSelector.parse('[someAttr][someAttr2]'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1, s2, 2]);
      }));
      it('should select by attr name only once if the value is from the DOM', (function() {
        matcher.addSelectable(s1 = CssSelector.parse('[some-decor]'), 1);
        var elementSelector = new CssSelector();
        var element = el('<div attr></div>');
        var empty = DOM.getAttribute(element, 'attr');
        elementSelector.addAttribute('some-decor', empty);
        matcher.match(elementSelector, selectableCollector);
        expect(matched).toEqual([s1, 1]);
      }));
      it('should select by attr name and value case insensitive', (function() {
        matcher.addSelectable(s1 = CssSelector.parse('[someAttr=someValue]'), 1);
        expect(matcher.match(CssSelector.parse('[SOMEATTR=SOMEOTHERATTR]'), selectableCollector)).toEqual(false);
        expect(matched).toEqual([]);
        expect(matcher.match(CssSelector.parse('[SOMEATTR=SOMEVALUE]'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1]);
      }));
      it('should select by element name, class name and attribute name with value', (function() {
        matcher.addSelectable(s1 = CssSelector.parse('someTag.someClass[someAttr=someValue]'), 1);
        expect(matcher.match(CssSelector.parse('someOtherTag.someOtherClass[someOtherAttr]'), selectableCollector)).toEqual(false);
        expect(matched).toEqual([]);
        expect(matcher.match(CssSelector.parse('someTag.someOtherClass[someOtherAttr]'), selectableCollector)).toEqual(false);
        expect(matched).toEqual([]);
        expect(matcher.match(CssSelector.parse('someTag.someClass[someOtherAttr]'), selectableCollector)).toEqual(false);
        expect(matched).toEqual([]);
        expect(matcher.match(CssSelector.parse('someTag.someClass[someAttr]'), selectableCollector)).toEqual(false);
        expect(matched).toEqual([]);
        expect(matcher.match(CssSelector.parse('someTag.someClass[someAttr=someValue]'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1]);
      }));
      it('should select independent of the order in the css selector', (function() {
        matcher.addSelectable(s1 = CssSelector.parse('[someAttr].someClass'), 1);
        matcher.addSelectable(s2 = CssSelector.parse('.someClass[someAttr]'), 2);
        matcher.addSelectable(s3 = CssSelector.parse('.class1.class2'), 3);
        matcher.addSelectable(s4 = CssSelector.parse('.class2.class1'), 4);
        expect(matcher.match(CssSelector.parse('[someAttr].someClass'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1, s2, 2]);
        reset();
        expect(matcher.match(CssSelector.parse('.someClass[someAttr]'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1, s2, 2]);
        reset();
        expect(matcher.match(CssSelector.parse('.class1.class2'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s3, 3, s4, 4]);
        reset();
        expect(matcher.match(CssSelector.parse('.class2.class1'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s4, 4, s3, 3]);
      }));
      it('should not select with a matching :not selector', (function() {
        matcher.addSelectable(CssSelector.parse('p:not(.someClass)'), 1);
        matcher.addSelectable(CssSelector.parse('p:not([someAttr])'), 2);
        matcher.addSelectable(CssSelector.parse(':not(.someClass)'), 3);
        matcher.addSelectable(CssSelector.parse(':not(p)'), 4);
        matcher.addSelectable(CssSelector.parse(':not(p[someAttr])'), 5);
        expect(matcher.match(CssSelector.parse('p.someClass[someAttr]'), selectableCollector)).toEqual(false);
        expect(matched).toEqual([]);
      }));
      it('should select with a non matching :not selector', (function() {
        matcher.addSelectable(s1 = CssSelector.parse('p:not(.someClass)'), 1);
        matcher.addSelectable(s2 = CssSelector.parse('p:not(.someOtherClass[someAttr])'), 2);
        matcher.addSelectable(s3 = CssSelector.parse(':not(.someClass)'), 3);
        matcher.addSelectable(s4 = CssSelector.parse(':not(.someOtherClass[someAttr])'), 4);
        expect(matcher.match(CssSelector.parse('p[someOtherAttr].someOtherClass'), selectableCollector)).toEqual(true);
        expect(matched).toEqual([s1, 1, s2, 2, s3, 3, s4, 4]);
      }));
    }));
    describe('CssSelector.parse', (function() {
      it('should detect element names', (function() {
        var cssSelector = CssSelector.parse('sometag');
        expect(cssSelector.element).toEqual('sometag');
        expect(cssSelector.toString()).toEqual('sometag');
      }));
      it('should detect class names', (function() {
        var cssSelector = CssSelector.parse('.someClass');
        expect(cssSelector.classNames).toEqual(['someclass']);
        expect(cssSelector.toString()).toEqual('.someclass');
      }));
      it('should detect attr names', (function() {
        var cssSelector = CssSelector.parse('[attrname]');
        expect(cssSelector.attrs).toEqual(['attrname', '']);
        expect(cssSelector.toString()).toEqual('[attrname]');
      }));
      it('should detect attr values', (function() {
        var cssSelector = CssSelector.parse('[attrname=attrvalue]');
        expect(cssSelector.attrs).toEqual(['attrname', 'attrvalue']);
        expect(cssSelector.toString()).toEqual('[attrname=attrvalue]');
      }));
      it('should detect multiple parts', (function() {
        var cssSelector = CssSelector.parse('sometag[attrname=attrvalue].someclass');
        expect(cssSelector.element).toEqual('sometag');
        expect(cssSelector.attrs).toEqual(['attrname', 'attrvalue']);
        expect(cssSelector.classNames).toEqual(['someclass']);
        expect(cssSelector.toString()).toEqual('sometag.someclass[attrname=attrvalue]');
      }));
      it('should detect :not', (function() {
        var cssSelector = CssSelector.parse('sometag:not([attrname=attrvalue].someclass)');
        expect(cssSelector.element).toEqual('sometag');
        expect(cssSelector.attrs.length).toEqual(0);
        expect(cssSelector.classNames.length).toEqual(0);
        var notSelector = cssSelector.notSelector;
        expect(notSelector.element).toEqual(null);
        expect(notSelector.attrs).toEqual(['attrname', 'attrvalue']);
        expect(notSelector.classNames).toEqual(['someclass']);
        expect(cssSelector.toString()).toEqual('sometag:not(.someclass[attrname=attrvalue])');
      }));
      it('should detect :not without truthy', (function() {
        var cssSelector = CssSelector.parse(':not([attrname=attrvalue].someclass)');
        expect(cssSelector.element).toEqual("*");
        var notSelector = cssSelector.notSelector;
        expect(notSelector.attrs).toEqual(['attrname', 'attrvalue']);
        expect(notSelector.classNames).toEqual(['someclass']);
        expect(cssSelector.toString()).toEqual('*:not(.someclass[attrname=attrvalue])');
      }));
      it('should throw when nested :not', (function() {
        expect((function() {
          CssSelector.parse('sometag:not(:not([attrname=attrvalue].someclass))');
        })).toThrowError('Nesting :not is not allowed in a selector');
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      xit = $__m.xit;
      el = $__m.el;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      SelectorMatcher = $__m.SelectorMatcher;
      CssSelector = $__m.CssSelector;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/selector_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/selector_spec.js.map