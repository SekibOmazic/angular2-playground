System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/change_detection", "./directive_metadata_reader", "./view", "./pipeline/compile_pipeline", "./pipeline/compile_element", "./pipeline/default_steps", "./template_loader", "./template_resolver", "./directive_metadata", "../annotations/template", "./shadow_dom_strategy", "./pipeline/compile_step", "./component_url_mapper", "./url_resolver", "./css_processor"], function($__export) {
  "use strict";
  var assert,
      Type,
      isBlank,
      isPresent,
      BaseException,
      normalizeBlank,
      stringify,
      Promise,
      PromiseWrapper,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      ChangeDetection,
      Parser,
      DirectiveMetadataReader,
      ProtoView,
      CompilePipeline,
      CompileElement,
      createDefaultSteps,
      TemplateLoader,
      TemplateResolver,
      DirectiveMetadata,
      Template,
      ShadowDomStrategy,
      CompileStep,
      ComponentUrlMapper,
      UrlResolver,
      CssProcessor,
      CompilerCache,
      Compiler;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      normalizeBlank = $__m.normalizeBlank;
      stringify = $__m.stringify;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      ChangeDetection = $__m.ChangeDetection;
      Parser = $__m.Parser;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      createDefaultSteps = $__m.createDefaultSteps;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      CssProcessor = $__m.CssProcessor;
    }],
    execute: function() {
      CompilerCache = $__export("CompilerCache", (function() {
        var CompilerCache = function CompilerCache() {
          this._cache = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(CompilerCache, {
          set: function(component, protoView) {
            assert.argumentTypes(component, Type, protoView, ProtoView);
            MapWrapper.set(this._cache, component, protoView);
          },
          get: function(component) {
            assert.argumentTypes(component, Type);
            var result = MapWrapper.get(this._cache, component);
            return assert.returnType((normalizeBlank(result)), ProtoView);
          },
          clear: function() {
            MapWrapper.clear(this._cache);
          }
        }, {});
      }()));
      Object.defineProperty(CompilerCache.prototype.set, "parameters", {get: function() {
          return [[Type], [ProtoView]];
        }});
      Object.defineProperty(CompilerCache.prototype.get, "parameters", {get: function() {
          return [[Type]];
        }});
      Compiler = $__export("Compiler", (function() {
        var Compiler = function Compiler(changeDetection, templateLoader, reader, parser, cache, shadowDomStrategy, templateResolver, componentUrlMapper, urlResolver, cssProcessor) {
          assert.argumentTypes(changeDetection, ChangeDetection, templateLoader, TemplateLoader, reader, DirectiveMetadataReader, parser, Parser, cache, CompilerCache, shadowDomStrategy, ShadowDomStrategy, templateResolver, TemplateResolver, componentUrlMapper, ComponentUrlMapper, urlResolver, UrlResolver, cssProcessor, CssProcessor);
          this._changeDetection = changeDetection;
          this._reader = reader;
          this._parser = parser;
          this._compilerCache = cache;
          this._templateLoader = templateLoader;
          this._compiling = MapWrapper.create();
          this._shadowDomStrategy = shadowDomStrategy;
          this._shadowDomDirectives = [];
          var types = shadowDomStrategy.polyfillDirectives();
          for (var i = 0; i < types.length; i++) {
            ListWrapper.push(this._shadowDomDirectives, reader.read(types[i]));
          }
          this._templateResolver = templateResolver;
          this._componentUrlMapper = componentUrlMapper;
          this._urlResolver = urlResolver;
          this._appUrl = urlResolver.resolve(null, './');
          this._cssProcessor = cssProcessor;
        };
        return ($traceurRuntime.createClass)(Compiler, {
          createSteps: function(component, template) {
            var $__0 = this;
            var dirMetadata = [];
            var tplMetadata = ListWrapper.map(this._flattenDirectives(template), (function(d) {
              return $__0._reader.read(d);
            }));
            dirMetadata = ListWrapper.concat(dirMetadata, tplMetadata);
            dirMetadata = ListWrapper.concat(dirMetadata, this._shadowDomDirectives);
            var cmpMetadata = this._reader.read(component);
            var templateUrl = this._templateLoader.getTemplateUrl(template);
            return assert.returnType((createDefaultSteps(this._changeDetection, this._parser, cmpMetadata, dirMetadata, this._shadowDomStrategy, templateUrl, this._cssProcessor)), assert.genericType(List, CompileStep));
          },
          compile: function(component) {
            assert.argumentTypes(component, Type);
            var protoView = this._compile(component);
            return assert.returnType((PromiseWrapper.isPromise(protoView) ? protoView : PromiseWrapper.resolve(protoView)), assert.genericType(Promise, ProtoView));
          },
          _compile: function(component) {
            var $__0 = this;
            var protoView = this._compilerCache.get(component);
            if (isPresent(protoView)) {
              return protoView;
            }
            var pvPromise = MapWrapper.get(this._compiling, component);
            if (isPresent(pvPromise)) {
              return pvPromise;
            }
            var template = this._templateResolver.resolve(component);
            var componentUrl = this._componentUrlMapper.getUrl(component);
            var baseUrl = this._urlResolver.resolve(this._appUrl, componentUrl);
            this._templateLoader.setBaseUrl(template, baseUrl);
            var tplElement = this._templateLoader.load(template);
            if (PromiseWrapper.isPromise(tplElement)) {
              pvPromise = PromiseWrapper.then(tplElement, (function(el) {
                return $__0._compileTemplate(template, el, component);
              }), (function(_) {
                throw new BaseException(("Failed to load the template for " + stringify(component)));
              }));
              MapWrapper.set(this._compiling, component, pvPromise);
              return pvPromise;
            }
            return this._compileTemplate(template, tplElement, component);
          },
          _compileTemplate: function(template, tplElement, component) {
            var pipeline = new CompilePipeline(this.createSteps(component, template));
            var compileElements;
            try {
              compileElements = pipeline.process(tplElement, stringify(component));
            } catch (ex) {
              return PromiseWrapper.reject(ex);
            }
            var protoView = compileElements[0].inheritedProtoView;
            this._compilerCache.set(component, protoView);
            MapWrapper.delete(this._compiling, component);
            var nestedPVPromises = [];
            for (var i = 0; i < compileElements.length; i++) {
              var ce = compileElements[i];
              if (isPresent(ce.componentDirective)) {
                this._compileNestedProtoView(ce, nestedPVPromises);
              }
            }
            if (protoView.stylePromises.length > 0) {
              var syncProtoView = protoView;
              protoView = PromiseWrapper.all(syncProtoView.stylePromises).then((function(_) {
                return syncProtoView;
              }));
            }
            if (nestedPVPromises.length > 0) {
              return PromiseWrapper.then(PromiseWrapper.all(nestedPVPromises), (function(_) {
                return protoView;
              }), (function(e) {
                throw new BaseException((e.message + " -> Failed to compile " + stringify(component)));
              }));
            }
            return protoView;
          },
          _compileNestedProtoView: function(ce, promises) {
            assert.argumentTypes(ce, CompileElement, promises, assert.genericType(List, Promise));
            var protoView = this._compile(ce.componentDirective.type);
            if (PromiseWrapper.isPromise(protoView)) {
              ListWrapper.push(promises, protoView.then(function(pv) {
                ce.inheritedElementBinder.nestedProtoView = pv;
              }));
            } else {
              ce.inheritedElementBinder.nestedProtoView = protoView;
            }
          },
          _flattenDirectives: function(template) {
            assert.argumentTypes(template, Template);
            if (isBlank(template.directives))
              return assert.returnType(([]), assert.genericType(List, Type));
            var directives = [];
            this._flattenList(template.directives, directives);
            return assert.returnType((directives), assert.genericType(List, Type));
          },
          _flattenList: function(tree, out) {
            assert.argumentTypes(tree, assert.genericType(List, assert.type.any), out, assert.genericType(List, Type));
            for (var i = 0; i < tree.length; i++) {
              var item = tree[i];
              if (ListWrapper.isList(item)) {
                this._flattenList(item, out);
              } else {
                ListWrapper.push(out, item);
              }
            }
          }
        }, {});
      }()));
      Object.defineProperty(Compiler, "parameters", {get: function() {
          return [[ChangeDetection], [TemplateLoader], [DirectiveMetadataReader], [Parser], [CompilerCache], [ShadowDomStrategy], [TemplateResolver], [ComponentUrlMapper], [UrlResolver], [CssProcessor]];
        }});
      Object.defineProperty(Compiler.prototype.createSteps, "parameters", {get: function() {
          return [[Type], [Template]];
        }});
      Object.defineProperty(Compiler.prototype.compile, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(Compiler.prototype._compile, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(Compiler.prototype._compileTemplate, "parameters", {get: function() {
          return [[Template], [], [Type]];
        }});
      Object.defineProperty(Compiler.prototype._compileNestedProtoView, "parameters", {get: function() {
          return [[CompileElement], [assert.genericType(List, Promise)]];
        }});
      Object.defineProperty(Compiler.prototype._flattenDirectives, "parameters", {get: function() {
          return [[Template]];
        }});
      Object.defineProperty(Compiler.prototype._flattenList, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.any)], [assert.genericType(List, Type)]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/compiler.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/compiler.js.map