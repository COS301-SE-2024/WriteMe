/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/@ducanh2912/next-pwa/dist/sw-entry-worker.js":
/*!***********************************************************************!*\
  !*** ../../node_modules/@ducanh2912/next-pwa/dist/sw-entry-worker.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\nself.onmessage = async (e)=>{\n    switch(e.data.type){\n        case \"__START_URL_CACHE__\":\n            {\n                let t = e.data.url, a = await fetch(t);\n                if (!a.redirected) return (await caches.open(\"start-url\")).put(t, a);\n                return Promise.resolve();\n            }\n        case \"__FRONTEND_NAV_CACHE__\":\n            {\n                let t = e.data.url, a = await caches.open(\"pages\");\n                if (await a.match(t, {\n                    ignoreSearch: !0\n                })) return;\n                let s = await fetch(t);\n                if (!s.ok) return;\n                if (a.put(t, s.clone()), e.data.shouldCacheAggressively && s.headers.get(\"Content-Type\")?.includes(\"text/html\")) try {\n                    let e = await s.text(), t = [], a = await caches.open(\"static-style-assets\"), r = await caches.open(\"next-static-js-assets\"), c = await caches.open(\"static-js-assets\");\n                    for (let [s, r] of e.matchAll(/<link.*?href=['\"](.*?)['\"].*?>/g))/rel=['\"]stylesheet['\"]/.test(s) && t.push(a.match(r).then((e)=>e ? Promise.resolve() : a.add(r)));\n                    for (let [, a] of e.matchAll(/<script.*?src=['\"](.*?)['\"].*?>/g)){\n                        let e = /\\/_next\\/static.+\\.js$/i.test(a) ? r : c;\n                        t.push(e.match(a).then((t)=>t ? Promise.resolve() : e.add(a)));\n                    }\n                    return await Promise.all(t);\n                } catch  {}\n                return Promise.resolve();\n            }\n        default:\n            return Promise.resolve();\n    }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vbm9kZV9tb2R1bGVzL0BkdWNhbmgyOTEyL25leHQtcHdhL2Rpc3Qvc3ctZW50cnktd29ya2VyLmpzIiwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4uLy4uL25vZGVfbW9kdWxlcy9AZHVjYW5oMjkxMi9uZXh0LXB3YS9kaXN0L3N3LWVudHJ5LXdvcmtlci5qcz9jZTIzIl0sInNvdXJjZXNDb250ZW50IjpbInNlbGYub25tZXNzYWdlID0gYXN5bmMgKGUpPT57XG4gICAgc3dpdGNoKGUuZGF0YS50eXBlKXtcbiAgICAgICAgY2FzZSBcIl9fU1RBUlRfVVJMX0NBQ0hFX19cIjpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGUuZGF0YS51cmwsIGEgPSBhd2FpdCBmZXRjaCh0KTtcbiAgICAgICAgICAgICAgICBpZiAoIWEucmVkaXJlY3RlZCkgcmV0dXJuIChhd2FpdCBjYWNoZXMub3BlbihcInN0YXJ0LXVybFwiKSkucHV0KHQsIGEpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSBcIl9fRlJPTlRFTkRfTkFWX0NBQ0hFX19cIjpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgdCA9IGUuZGF0YS51cmwsIGEgPSBhd2FpdCBjYWNoZXMub3BlbihcInBhZ2VzXCIpO1xuICAgICAgICAgICAgICAgIGlmIChhd2FpdCBhLm1hdGNoKHQsIHtcbiAgICAgICAgICAgICAgICAgICAgaWdub3JlU2VhcmNoOiAhMFxuICAgICAgICAgICAgICAgIH0pKSByZXR1cm47XG4gICAgICAgICAgICAgICAgbGV0IHMgPSBhd2FpdCBmZXRjaCh0KTtcbiAgICAgICAgICAgICAgICBpZiAoIXMub2spIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoYS5wdXQodCwgcy5jbG9uZSgpKSwgZS5kYXRhLnNob3VsZENhY2hlQWdncmVzc2l2ZWx5ICYmIHMuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/LmluY2x1ZGVzKFwidGV4dC9odG1sXCIpKSB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZSA9IGF3YWl0IHMudGV4dCgpLCB0ID0gW10sIGEgPSBhd2FpdCBjYWNoZXMub3BlbihcInN0YXRpYy1zdHlsZS1hc3NldHNcIiksIHIgPSBhd2FpdCBjYWNoZXMub3BlbihcIm5leHQtc3RhdGljLWpzLWFzc2V0c1wiKSwgYyA9IGF3YWl0IGNhY2hlcy5vcGVuKFwic3RhdGljLWpzLWFzc2V0c1wiKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgW3MsIHJdIG9mIGUubWF0Y2hBbGwoLzxsaW5rLio/aHJlZj1bJ1wiXSguKj8pWydcIl0uKj8+L2cpKS9yZWw9WydcIl1zdHlsZXNoZWV0WydcIl0vLnRlc3QocykgJiYgdC5wdXNoKGEubWF0Y2gocikudGhlbigoZSk9PmUgPyBQcm9taXNlLnJlc29sdmUoKSA6IGEuYWRkKHIpKSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IFssIGFdIG9mIGUubWF0Y2hBbGwoLzxzY3JpcHQuKj9zcmM9WydcIl0oLio/KVsnXCJdLio/Pi9nKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZSA9IC9cXC9fbmV4dFxcL3N0YXRpYy4rXFwuanMkL2kudGVzdChhKSA/IHIgOiBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgdC5wdXNoKGUubWF0Y2goYSkudGhlbigodCk9PnQgPyBQcm9taXNlLnJlc29sdmUoKSA6IGUuYWRkKGEpKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKHQpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggIHt9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbn07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../../node_modules/@ducanh2912/next-pwa/dist/sw-entry-worker.js\n"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	!function() {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = function() {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScript: function(script) { return script; }
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script */
/******/ 	!function() {
/******/ 		__webpack_require__.ts = function(script) { return __webpack_require__.tt().createScript(script); };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	!function() {
/******/ 		if (__webpack_require__.i) {
/******/ 		__webpack_require__.i.push(function(options) {
/******/ 			var originalFactory = options.factory;
/******/ 			options.factory = function(moduleObject, moduleExports, webpackRequire) {
/******/ 				var hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
/******/ 				var cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : function() {};
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					cleanup();
/******/ 				}
/******/ 			}
/******/ 		})
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	
/******/ 	// noop fns to prevent runtime errors during initialization
/******/ 	if (typeof self !== "undefined") {
/******/ 		self.$RefreshReg$ = function () {};
/******/ 		self.$RefreshSig$ = function () {
/******/ 			return function (type) {
/******/ 				return type;
/******/ 			};
/******/ 		};
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../../node_modules/@ducanh2912/next-pwa/dist/sw-entry-worker.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;