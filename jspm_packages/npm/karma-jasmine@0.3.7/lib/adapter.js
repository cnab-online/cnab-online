/* */ 
(function(process) {
  (function(window) {
    'use strict';
    function isExternalStackEntry(entry) {
      return (entry ? true : false) && !/\/(jasmine-core|karma-jasmine)\//.test(entry) && !/\/(karma.js|context.html):/.test(entry);
    }
    function getRelevantStackFrom(stack) {
      var filteredStack = [],
          relevantStack = [];
      stack = stack.split('\n');
      for (var i = 0; i < stack.length; i += 1) {
        if (isExternalStackEntry(stack[i])) {
          filteredStack.push(stack[i]);
        }
      }
      if (filteredStack.length === 0) {
        filteredStack = stack;
      }
      for (i = 0; i < filteredStack.length; i += 1) {
        if (filteredStack[i]) {
          relevantStack.push(filteredStack[i]);
        }
      }
      return relevantStack;
    }
    function formatFailedStep(step) {
      if (!step.stack) {
        return step.message;
      }
      var relevantMessage = [];
      var relevantStack = [];
      var stack = step.stack.replace('Error: ' + step.message, '');
      var dirtyRelevantStack = getRelevantStackFrom(stack);
      for (var i = 0; i < dirtyRelevantStack.length; i += 1) {
        if (step.message && step.message.indexOf(dirtyRelevantStack[i]) === -1) {
          relevantStack.push(dirtyRelevantStack[i]);
        } else {
          relevantMessage.push(dirtyRelevantStack[i]);
        }
      }
      if (relevantMessage.length === 0) {
        relevantMessage.push(step.message);
        if (relevantStack.length && relevantStack[0].indexOf(step.message) !== -1) {
          relevantStack.shift();
        }
      }
      return relevantMessage.concat(relevantStack).join('\n');
    }
    function SuiteNode(name, parent) {
      this.name = name;
      this.parent = parent;
      this.children = [];
      this.addChild = function(name) {
        var suite = new SuiteNode(name, this);
        this.children.push(suite);
        return suite;
      };
    }
    function processSuite(suite, pointer) {
      var child;
      var childPointer;
      for (var i = 0; i < suite.children.length; i++) {
        child = suite.children[i];
        if (child.children) {
          childPointer = pointer[child.description] = {_: []};
          processSuite(child, childPointer);
        } else {
          if (!pointer._) {
            pointer._ = [];
          }
          pointer._.push(child.description);
        }
      }
    }
    function getAllSpecNames(topSuite) {
      var specNames = {};
      processSuite(topSuite, specNames);
      return specNames;
    }
    function KarmaReporter(tc, jasmineEnv) {
      var currentSuite = new SuiteNode();
      function isTopLevelSuite(suite) {
        return suite.description === 'Jasmine_TopLevel_Suite';
      }
      this.jasmineStarted = function(data) {
        tc.info({
          total: data.totalSpecsDefined,
          specs: getAllSpecNames(jasmineEnv.topSuite())
        });
      };
      this.jasmineDone = function() {
        tc.complete({coverage: window.__coverage__});
      };
      this.suiteStarted = function(result) {
        if (!isTopLevelSuite(result)) {
          currentSuite = currentSuite.addChild(result.description);
        }
      };
      this.suiteDone = function(result) {
        if (result.description !== currentSuite.name) {
          return;
        }
        currentSuite = currentSuite.parent;
      };
      this.specStarted = function(specResult) {
        specResult.startTime = new Date().getTime();
      };
      this.specDone = function(specResult) {
        var skipped = specResult.status === 'disabled' || specResult.status === 'pending';
        var result = {
          description: specResult.description,
          id: specResult.id,
          log: [],
          skipped: skipped,
          success: specResult.failedExpectations.length === 0,
          suite: [],
          time: skipped ? 0 : new Date().getTime() - specResult.startTime
        };
        var suitePointer = currentSuite;
        while (suitePointer.parent) {
          result.suite.unshift(suitePointer.name);
          suitePointer = suitePointer.parent;
        }
        if (!result.success) {
          var steps = specResult.failedExpectations;
          for (var i = 0,
              l = steps.length; i < l; i++) {
            result.log.push(formatFailedStep(steps[i]));
          }
        }
        tc.result(result);
        delete specResult.startTime;
      };
    }
    var getGrepOption = function(clientArguments) {
      var grepRegex = /^--grep=(.*)$/;
      if (Object.prototype.toString.call(clientArguments) === '[object Array]') {
        var indexOfGrep = clientArguments.indexOf('--grep');
        if (indexOfGrep !== -1) {
          return clientArguments[indexOfGrep + 1];
        }
        return clientArguments.filter(function(arg) {
          return grepRegex.test(arg);
        }).map(function(arg) {
          return arg.replace(grepRegex, '$1');
        })[0] || '';
      } else if (typeof clientArguments === 'string') {
        var match = /--grep=([^=]+)/.exec(clientArguments);
        return match ? match[1] : '';
      }
    };
    var KarmaSpecFilter = function(options) {
      var filterString = options && options.filterString() && options.filterString().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      var filterPattern = new RegExp(filterString);
      this.matches = function(specName) {
        return filterPattern.test(specName);
      };
    };
    var createSpecFilter = function(config, jasmineEnv) {
      var specFilter = new KarmaSpecFilter({filterString: function() {
          return getGrepOption(config.args);
        }});
      jasmineEnv.specFilter = function(spec) {
        return specFilter.matches(spec.getFullName());
      };
    };
    function createStartFn(karma, jasmineEnv) {
      return function() {
        jasmineEnv = jasmineEnv || window.jasmine.getEnv();
        jasmineEnv.addReporter(new KarmaReporter(karma, jasmineEnv));
        jasmineEnv.execute();
      };
    }
    createSpecFilter(window.__karma__.config, jasmine.getEnv());
    window.__karma__.start = createStartFn(window.__karma__);
  })(typeof window !== 'undefined' ? window : global);
})(require('process'));
