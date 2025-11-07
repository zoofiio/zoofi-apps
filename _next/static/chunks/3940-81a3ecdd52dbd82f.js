(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3940],{43771:function(e,t,o){"use strict";function vanilla_extract_private_esm_getVarName(e){var t=e.match(/^var\((.*)\)$/);return t?t[1]:e}function assignInlineVars(e,t){var o={};if("object"==typeof t)!function vanilla_extract_private_esm_walkObject(e,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n={};for(var i in e){var a=e[i],s=[...o,i];"string"==typeof a||"number"==typeof a||null==a?n[i]=t(a,s):"object"!=typeof a||Array.isArray(a)?console.warn('Skipping invalid key "'.concat(s.join("."),'". Should be a string, number, null or object. Received: "').concat(Array.isArray(a)?"Array":typeof a,'"')):n[i]=vanilla_extract_private_esm_walkObject(a,t,s)}return n}(t,(t,n)=>{null!=t&&(o[vanilla_extract_private_esm_getVarName(function(e,t){var o=e;for(var n of t){if(!(n in o))throw Error("Path ".concat(t.join(" -> ")," does not exist in object"));o=o[n]}return o}(e,n))]=String(t))});else for(var n in e){var i=e[n];null!=i&&(o[vanilla_extract_private_esm_getVarName(n)]=i)}return Object.defineProperty(o,"toString",{value:function(){return Object.keys(this).map(e=>"".concat(e,":").concat(this[e])).join(";")},writable:!1}),o}o.d(t,{L:function(){return assignInlineVars}})},34516:function(e,t,o){"use strict";function ownKeys(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),o.push.apply(o,n)}return o}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach(function(t){!function(e,t,o){var n;(t="symbol"==typeof(n=function(e,t){if("object"!=typeof e||!e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var n=o.call(e,t||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?n:String(n))in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o}(e,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))})}return e}o.d(t,{$:function(){return createSprinkles}});var createSprinkles_74286718_esm_createSprinkles=e=>function(){for(var t=arguments.length,o=Array(t),n=0;n<t;n++)o[n]=arguments[n];var i=Object.assign({},...o.map(e=>e.styles)),a=Object.keys(i),s=a.filter(e=>"mappings"in i[e]);return Object.assign(t=>{var o=[],n={},a=_objectSpread2({},t),l=!1;for(var c of s){var u=t[c];if(null!=u)for(var p of(l=!0,i[c].mappings))n[p]=u,null==a[p]&&delete a[p]}var d=l?_objectSpread2(_objectSpread2({},n),a):t;for(var f in d)if(function(){var e=d[f],t=i[f];try{if(t.mappings)return 1;if("string"==typeof e||"number"==typeof e)o.push(t.values[e].defaultClass);else if(Array.isArray(e))for(var n=0;n<e.length;n++){var a=e[n];if(null!=a){var s=t.responsiveArray[n];o.push(t.values[a].conditions[s])}}else for(var l in e){var c=e[l];null!=c&&o.push(t.values[c].conditions[l])}}catch(e){throw e}}())continue;return e(o.join(" "))},{properties:new Set(a)})},composeStyles=e=>e,createSprinkles=function(){return createSprinkles_74286718_esm_createSprinkles(composeStyles)(...arguments)}},62151:function(e,t,o){"use strict";o.d(t,{d:function(){return createMapValueFn},M:function(){return createNormalizeValueFn}});var addRecipe=function(e,t){return Object.defineProperty(e,"__recipe__",{value:t,writable:!1}),e};function createNormalizeValueFn(e){var{conditions:t}=e;if(!t)throw Error("Styles have no conditions");return addRecipe(function(e){if("string"==typeof e||"number"==typeof e||"boolean"==typeof e){if(!t.defaultCondition)throw Error("No default condition");return{[t.defaultCondition]:e}}if(Array.isArray(e)){if(!("responsiveArray"in t))throw Error("Responsive arrays are not supported");var o={};for(var n in t.responsiveArray)null!=e[n]&&(o[t.responsiveArray[n]]=e[n]);return o}return e},{importPath:"@vanilla-extract/sprinkles/createUtils",importName:"createNormalizeValueFn",args:[{conditions:e.conditions}]})}function createMapValueFn(e){var{conditions:t}=e;if(!t)throw Error("Styles have no conditions");var o=createNormalizeValueFn(e);return addRecipe(function(e,n){if("string"==typeof e||"number"==typeof e||"boolean"==typeof e){if(!t.defaultCondition)throw Error("No default condition");return n(e,t.defaultCondition)}var i=Array.isArray(e)?o(e):e,a={};for(var s in i)null!=i[s]&&(a[s]=n(i[s],s));return a},{importPath:"@vanilla-extract/sprinkles/createUtils",importName:"createMapValueFn",args:[{conditions:e.conditions}]})}},13526:function(e){"use strict";var t={single_source_shortest_paths:function(e,o,n){var i,a,s,l,c,u,p,d={},f={};f[o]=0;var h=t.PriorityQueue.make();for(h.push(o,0);!h.empty();)for(s in a=(i=h.pop()).value,l=i.cost,c=e[a]||{})c.hasOwnProperty(s)&&(u=l+c[s],p=f[s],(void 0===f[s]||p>u)&&(f[s]=u,h.push(s,u),d[s]=a));if(void 0!==n&&void 0===f[n])throw Error(["Could not find a path from ",o," to ",n,"."].join(""));return d},extract_shortest_path_from_predecessor_list:function(e,t){for(var o=[],n=t;n;)o.push(n),e[n],n=e[n];return o.reverse(),o},find_path:function(e,o,n){var i=t.single_source_shortest_paths(e,o,n);return t.extract_shortest_path_from_predecessor_list(i,n)},PriorityQueue:{make:function(e){var o,n=t.PriorityQueue,i={};for(o in e=e||{},n)n.hasOwnProperty(o)&&(i[o]=n[o]);return i.queue=[],i.sorter=e.sorter||n.default_sorter,i},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){this.queue.push({value:e,cost:t}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};e.exports=t},13318:function(e,t,o){let n=o(80792),i=o(12235),a=o(53113),s=o(70835);function renderCanvas(e,t,o,a,s){let l=[].slice.call(arguments,1),c=l.length,u="function"==typeof l[c-1];if(!u&&!n())throw Error("Callback required as last argument");if(u){if(c<2)throw Error("Too few arguments provided");2===c?(s=o,o=t,t=a=void 0):3===c&&(t.getContext&&void 0===s?(s=a,a=void 0):(s=a,a=o,o=t,t=void 0))}else{if(c<1)throw Error("Too few arguments provided");return 1===c?(o=t,t=a=void 0):2!==c||t.getContext||(a=o,o=t,t=void 0),new Promise(function(n,s){try{let s=i.create(o,a);n(e(s,t,a))}catch(e){s(e)}})}try{let n=i.create(o,a);s(null,e(n,t,a))}catch(e){s(e)}}t.create=i.create,t.toCanvas=renderCanvas.bind(null,a.render),t.toDataURL=renderCanvas.bind(null,a.renderToDataURL),t.toString=renderCanvas.bind(null,function(e,t,o){return s.render(e,o)})},80792:function(e){e.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},41167:function(e,t,o){let n=o(75919).getSymbolSize;t.getRowColCoords=function(e){if(1===e)return[];let t=Math.floor(e/7)+2,o=n(e),i=145===o?26:2*Math.ceil((o-13)/(2*t-2)),a=[o-7];for(let e=1;e<t-1;e++)a[e]=a[e-1]-i;return a.push(6),a.reverse()},t.getPositions=function(e){let o=[],n=t.getRowColCoords(e),i=n.length;for(let e=0;e<i;e++)for(let t=0;t<i;t++)(0!==e||0!==t)&&(0!==e||t!==i-1)&&(e!==i-1||0!==t)&&o.push([n[e],n[t]]);return o}},1983:function(e,t,o){let n=o(34672),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function AlphanumericData(e){this.mode=n.ALPHANUMERIC,this.data=e}AlphanumericData.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)},AlphanumericData.prototype.getLength=function(){return this.data.length},AlphanumericData.prototype.getBitsLength=function(){return AlphanumericData.getBitsLength(this.data.length)},AlphanumericData.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let o=45*i.indexOf(this.data[t]);o+=i.indexOf(this.data[t+1]),e.put(o,11)}this.data.length%2&&e.put(i.indexOf(this.data[t]),6)},e.exports=AlphanumericData},50943:function(e){function BitBuffer(){this.buffer=[],this.length=0}BitBuffer.prototype={get:function(e){return(this.buffer[Math.floor(e/8)]>>>7-e%8&1)==1},put:function(e,t){for(let o=0;o<t;o++)this.putBit((e>>>t-o-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},e.exports=BitBuffer},49281:function(e){function BitMatrix(e){if(!e||e<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}BitMatrix.prototype.set=function(e,t,o,n){let i=e*this.size+t;this.data[i]=o,n&&(this.reservedBit[i]=!0)},BitMatrix.prototype.get=function(e,t){return this.data[e*this.size+t]},BitMatrix.prototype.xor=function(e,t,o){this.data[e*this.size+t]^=o},BitMatrix.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},e.exports=BitMatrix},57537:function(e,t,o){let n=o(34672);function ByteData(e){this.mode=n.BYTE,"string"==typeof e?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}ByteData.getBitsLength=function(e){return 8*e},ByteData.prototype.getLength=function(){return this.data.length},ByteData.prototype.getBitsLength=function(){return ByteData.getBitsLength(this.data.length)},ByteData.prototype.write=function(e){for(let t=0,o=this.data.length;t<o;t++)e.put(this.data[t],8)},e.exports=ByteData},15835:function(e,t,o){let n=o(51141),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],a=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];t.getBlocksCount=function(e,t){switch(t){case n.L:return i[(e-1)*4+0];case n.M:return i[(e-1)*4+1];case n.Q:return i[(e-1)*4+2];case n.H:return i[(e-1)*4+3];default:return}},t.getTotalCodewordsCount=function(e,t){switch(t){case n.L:return a[(e-1)*4+0];case n.M:return a[(e-1)*4+1];case n.Q:return a[(e-1)*4+2];case n.H:return a[(e-1)*4+3];default:return}}},51141:function(e,t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2},t.isValid=function(e){return e&&void 0!==e.bit&&e.bit>=0&&e.bit<4},t.from=function(e,o){if(t.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw Error("Param is not a string");let o=e.toLowerCase();switch(o){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw Error("Unknown EC Level: "+e)}}(e)}catch(e){return o}}},87922:function(e,t,o){let n=o(75919).getSymbolSize;t.getPositions=function(e){let t=n(e);return[[0,0],[t-7,0],[0,t-7]]}},1020:function(e,t,o){let n=o(75919),i=n.getBCHDigit(1335);t.getEncodedBits=function(e,t){let o=e.bit<<3|t,a=o<<10;for(;n.getBCHDigit(a)-i>=0;)a^=1335<<n.getBCHDigit(a)-i;return(o<<10|a)^21522}},20239:function(e,t){let o=new Uint8Array(512),n=new Uint8Array(256);!function(){let e=1;for(let t=0;t<255;t++)o[t]=e,n[e]=t,256&(e<<=1)&&(e^=285);for(let e=255;e<512;e++)o[e]=o[e-255]}(),t.log=function(e){if(e<1)throw Error("log("+e+")");return n[e]},t.exp=function(e){return o[e]},t.mul=function(e,t){return 0===e||0===t?0:o[n[e]+n[t]]}},31806:function(e,t,o){let n=o(34672),i=o(75919);function KanjiData(e){this.mode=n.KANJI,this.data=e}KanjiData.getBitsLength=function(e){return 13*e},KanjiData.prototype.getLength=function(){return this.data.length},KanjiData.prototype.getBitsLength=function(){return KanjiData.getBitsLength(this.data.length)},KanjiData.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let o=i.toSJIS(this.data[t]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw Error("Invalid SJIS character: "+this.data[t]+"\nMake sure your charset is UTF-8");o=(o>>>8&255)*192+(255&o),e.put(o,13)}},e.exports=KanjiData},97760:function(e,t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};let o={N1:3,N2:3,N3:40,N4:10};t.isValid=function(e){return null!=e&&""!==e&&!isNaN(e)&&e>=0&&e<=7},t.from=function(e){return t.isValid(e)?parseInt(e,10):void 0},t.getPenaltyN1=function(e){let t=e.size,n=0,i=0,a=0,s=null,l=null;for(let c=0;c<t;c++){i=a=0,s=l=null;for(let u=0;u<t;u++){let t=e.get(c,u);t===s?i++:(i>=5&&(n+=o.N1+(i-5)),s=t,i=1),(t=e.get(u,c))===l?a++:(a>=5&&(n+=o.N1+(a-5)),l=t,a=1)}i>=5&&(n+=o.N1+(i-5)),a>=5&&(n+=o.N1+(a-5))}return n},t.getPenaltyN2=function(e){let t=e.size,n=0;for(let o=0;o<t-1;o++)for(let i=0;i<t-1;i++){let t=e.get(o,i)+e.get(o,i+1)+e.get(o+1,i)+e.get(o+1,i+1);(4===t||0===t)&&n++}return n*o.N2},t.getPenaltyN3=function(e){let t=e.size,n=0,i=0,a=0;for(let o=0;o<t;o++){i=a=0;for(let s=0;s<t;s++)i=i<<1&2047|e.get(o,s),s>=10&&(1488===i||93===i)&&n++,a=a<<1&2047|e.get(s,o),s>=10&&(1488===a||93===a)&&n++}return n*o.N3},t.getPenaltyN4=function(e){let t=0,n=e.data.length;for(let o=0;o<n;o++)t+=e.data[o];let i=Math.abs(Math.ceil(100*t/n/5)-10);return i*o.N4},t.applyMask=function(e,o){let n=o.size;for(let i=0;i<n;i++)for(let a=0;a<n;a++)o.isReserved(a,i)||o.xor(a,i,function(e,o,n){switch(e){case t.Patterns.PATTERN000:return(o+n)%2==0;case t.Patterns.PATTERN001:return o%2==0;case t.Patterns.PATTERN010:return n%3==0;case t.Patterns.PATTERN011:return(o+n)%3==0;case t.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(n/3))%2==0;case t.Patterns.PATTERN101:return o*n%2+o*n%3==0;case t.Patterns.PATTERN110:return(o*n%2+o*n%3)%2==0;case t.Patterns.PATTERN111:return(o*n%3+(o+n)%2)%2==0;default:throw Error("bad maskPattern:"+e)}}(e,a,i))},t.getBestMask=function(e,o){let n=Object.keys(t.Patterns).length,i=0,a=1/0;for(let s=0;s<n;s++){o(s),t.applyMask(s,e);let n=t.getPenaltyN1(e)+t.getPenaltyN2(e)+t.getPenaltyN3(e)+t.getPenaltyN4(e);t.applyMask(s,e),n<a&&(a=n,i=s)}return i}},34672:function(e,t,o){let n=o(40662),i=o(29537);t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(e,t){if(!e.ccBits)throw Error("Invalid mode: "+e);if(!n.isValid(t))throw Error("Invalid version: "+t);return t>=1&&t<10?e.ccBits[0]:t<27?e.ccBits[1]:e.ccBits[2]},t.getBestModeForData=function(e){return i.testNumeric(e)?t.NUMERIC:i.testAlphanumeric(e)?t.ALPHANUMERIC:i.testKanji(e)?t.KANJI:t.BYTE},t.toString=function(e){if(e&&e.id)return e.id;throw Error("Invalid mode")},t.isValid=function(e){return e&&e.bit&&e.ccBits},t.from=function(e,o){if(t.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw Error("Param is not a string");let o=e.toLowerCase();switch(o){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw Error("Unknown mode: "+e)}}(e)}catch(e){return o}}},37524:function(e,t,o){let n=o(34672);function NumericData(e){this.mode=n.NUMERIC,this.data=e.toString()}NumericData.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},NumericData.prototype.getLength=function(){return this.data.length},NumericData.prototype.getBitsLength=function(){return NumericData.getBitsLength(this.data.length)},NumericData.prototype.write=function(e){let t,o;for(t=0;t+3<=this.data.length;t+=3)o=parseInt(this.data.substr(t,3),10),e.put(o,10);let n=this.data.length-t;n>0&&(o=parseInt(this.data.substr(t),10),e.put(o,3*n+1))},e.exports=NumericData},63752:function(e,t,o){let n=o(20239);t.mul=function(e,t){let o=new Uint8Array(e.length+t.length-1);for(let i=0;i<e.length;i++)for(let a=0;a<t.length;a++)o[i+a]^=n.mul(e[i],t[a]);return o},t.mod=function(e,t){let o=new Uint8Array(e);for(;o.length-t.length>=0;){let e=o[0];for(let i=0;i<t.length;i++)o[i]^=n.mul(t[i],e);let i=0;for(;i<o.length&&0===o[i];)i++;o=o.slice(i)}return o},t.generateECPolynomial=function(e){let o=new Uint8Array([1]);for(let i=0;i<e;i++)o=t.mul(o,new Uint8Array([1,n.exp(i)]));return o}},12235:function(e,t,o){let n=o(75919),i=o(51141),a=o(50943),s=o(49281),l=o(41167),c=o(87922),u=o(97760),p=o(15835),d=o(89776),f=o(1621),h=o(1020),w=o(34672),A=o(17821);function setupFormatInfo(e,t,o){let n,i;let a=e.size,s=h.getEncodedBits(t,o);for(n=0;n<15;n++)i=(s>>n&1)==1,n<6?e.set(n,8,i,!0):n<8?e.set(n+1,8,i,!0):e.set(a-15+n,8,i,!0),n<8?e.set(8,a-n-1,i,!0):n<9?e.set(8,15-n-1+1,i,!0):e.set(8,15-n-1,i,!0);e.set(a-8,8,1,!0)}t.create=function(e,t){let o,h;if(void 0===e||""===e)throw Error("No input text");let g=i.M;return void 0!==t&&(g=i.from(t.errorCorrectionLevel,i.M),o=f.from(t.version),h=u.from(t.maskPattern),t.toSJISFunc&&n.setToSJISFunction(t.toSJISFunc)),function(e,t,o,i){let h;if(Array.isArray(e))h=A.fromArray(e);else if("string"==typeof e){let n=t;if(!n){let t=A.rawSplit(e);n=f.getBestVersionForData(t,o)}h=A.fromString(e,n||40)}else throw Error("Invalid data");let g=f.getBestVersionForData(h,o);if(!g)throw Error("The amount of data is too big to be stored in a QR Code");if(t){if(t<g)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+g+".\n")}else t=g;let m=function(e,t,o){let i=new a;o.forEach(function(t){i.put(t.mode.bit,4),i.put(t.getLength(),w.getCharCountIndicator(t.mode,e)),t.write(i)});let s=n.getSymbolTotalCodewords(e),l=p.getTotalCodewordsCount(e,t),c=(s-l)*8;for(i.getLengthInBits()+4<=c&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(0);let u=(c-i.getLengthInBits())/8;for(let e=0;e<u;e++)i.put(e%2?17:236,8);return function(e,t,o){let i,a;let s=n.getSymbolTotalCodewords(t),l=p.getTotalCodewordsCount(t,o),c=s-l,u=p.getBlocksCount(t,o),f=s%u,h=u-f,w=Math.floor(s/u),A=Math.floor(c/u),g=A+1,m=w-A,y=new d(m),b=0,C=Array(u),B=Array(u),v=0,k=new Uint8Array(e.buffer);for(let e=0;e<u;e++){let t=e<h?A:g;C[e]=k.slice(b,b+t),B[e]=y.encode(C[e]),b+=t,v=Math.max(v,t)}let E=new Uint8Array(s),x=0;for(i=0;i<v;i++)for(a=0;a<u;a++)i<C[a].length&&(E[x++]=C[a][i]);for(i=0;i<m;i++)for(a=0;a<u;a++)E[x++]=B[a][i];return E}(i,e,t)}(t,o,h),y=n.getSymbolSize(t),b=new s(y);return function(e,t){let o=e.size,n=c.getPositions(t);for(let t=0;t<n.length;t++){let i=n[t][0],a=n[t][1];for(let t=-1;t<=7;t++)if(!(i+t<=-1)&&!(o<=i+t))for(let n=-1;n<=7;n++)a+n<=-1||o<=a+n||(t>=0&&t<=6&&(0===n||6===n)||n>=0&&n<=6&&(0===t||6===t)||t>=2&&t<=4&&n>=2&&n<=4?e.set(i+t,a+n,!0,!0):e.set(i+t,a+n,!1,!0))}}(b,t),function(e){let t=e.size;for(let o=8;o<t-8;o++){let t=o%2==0;e.set(o,6,t,!0),e.set(6,o,t,!0)}}(b),function(e,t){let o=l.getPositions(t);for(let t=0;t<o.length;t++){let n=o[t][0],i=o[t][1];for(let t=-2;t<=2;t++)for(let o=-2;o<=2;o++)-2===t||2===t||-2===o||2===o||0===t&&0===o?e.set(n+t,i+o,!0,!0):e.set(n+t,i+o,!1,!0)}}(b,t),setupFormatInfo(b,o,0),t>=7&&function(e,t){let o,n,i;let a=e.size,s=f.getEncodedBits(t);for(let t=0;t<18;t++)o=Math.floor(t/3),n=t%3+a-8-3,i=(s>>t&1)==1,e.set(o,n,i,!0),e.set(n,o,i,!0)}(b,t),function(e,t){let o=e.size,n=-1,i=o-1,a=7,s=0;for(let l=o-1;l>0;l-=2)for(6===l&&l--;;){for(let o=0;o<2;o++)if(!e.isReserved(i,l-o)){let n=!1;s<t.length&&(n=(t[s]>>>a&1)==1),e.set(i,l-o,n),-1==--a&&(s++,a=7)}if((i+=n)<0||o<=i){i-=n,n=-n;break}}}(b,m),isNaN(i)&&(i=u.getBestMask(b,setupFormatInfo.bind(null,b,o))),u.applyMask(i,b),setupFormatInfo(b,o,i),{modules:b,version:t,errorCorrectionLevel:o,maskPattern:i,segments:h}}(e,o,g,h)}},89776:function(e,t,o){let n=o(63752);function ReedSolomonEncoder(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}ReedSolomonEncoder.prototype.initialize=function(e){this.degree=e,this.genPoly=n.generateECPolynomial(this.degree)},ReedSolomonEncoder.prototype.encode=function(e){if(!this.genPoly)throw Error("Encoder not initialized");let t=new Uint8Array(e.length+this.degree);t.set(e);let o=n.mod(t,this.genPoly),i=this.degree-o.length;if(i>0){let e=new Uint8Array(this.degree);return e.set(o,i),e}return o},e.exports=ReedSolomonEncoder},29537:function(e,t){let o="[0-9]+",n="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";n=n.replace(/u/g,"\\u");let i="(?:(?![A-Z0-9 $%*+\\-./:]|"+n+")(?:.|[\r\n]))+";t.KANJI=RegExp(n,"g"),t.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),t.BYTE=RegExp(i,"g"),t.NUMERIC=RegExp(o,"g"),t.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let a=RegExp("^"+n+"$"),s=RegExp("^"+o+"$"),l=RegExp("^[A-Z0-9 $%*+\\-./:]+$");t.testKanji=function(e){return a.test(e)},t.testNumeric=function(e){return s.test(e)},t.testAlphanumeric=function(e){return l.test(e)}},17821:function(e,t,o){let n=o(34672),i=o(37524),a=o(1983),s=o(57537),l=o(31806),c=o(29537),u=o(75919),p=o(13526);function getStringByteLength(e){return unescape(encodeURIComponent(e)).length}function getSegments(e,t,o){let n;let i=[];for(;null!==(n=e.exec(o));)i.push({data:n[0],index:n.index,mode:t,length:n[0].length});return i}function getSegmentsFromString(e){let t,o;let i=getSegments(c.NUMERIC,n.NUMERIC,e),a=getSegments(c.ALPHANUMERIC,n.ALPHANUMERIC,e);u.isKanjiModeEnabled()?(t=getSegments(c.BYTE,n.BYTE,e),o=getSegments(c.KANJI,n.KANJI,e)):(t=getSegments(c.BYTE_KANJI,n.BYTE,e),o=[]);let s=i.concat(a,t,o);return s.sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function getSegmentBitsLength(e,t){switch(t){case n.NUMERIC:return i.getBitsLength(e);case n.ALPHANUMERIC:return a.getBitsLength(e);case n.KANJI:return l.getBitsLength(e);case n.BYTE:return s.getBitsLength(e)}}function buildSingleSegment(e,t){let o;let c=n.getBestModeForData(e);if((o=n.from(t,c))!==n.BYTE&&o.bit<c.bit)throw Error('"'+e+'" cannot be encoded with mode '+n.toString(o)+".\n Suggested mode is: "+n.toString(c));switch(o!==n.KANJI||u.isKanjiModeEnabled()||(o=n.BYTE),o){case n.NUMERIC:return new i(e);case n.ALPHANUMERIC:return new a(e);case n.KANJI:return new l(e);case n.BYTE:return new s(e)}}t.fromArray=function(e){return e.reduce(function(e,t){return"string"==typeof t?e.push(buildSingleSegment(t,null)):t.data&&e.push(buildSingleSegment(t.data,t.mode)),e},[])},t.fromString=function(e,o){let i=getSegmentsFromString(e,u.isKanjiModeEnabled()),a=function(e){let t=[];for(let o=0;o<e.length;o++){let i=e[o];switch(i.mode){case n.NUMERIC:t.push([i,{data:i.data,mode:n.ALPHANUMERIC,length:i.length},{data:i.data,mode:n.BYTE,length:i.length}]);break;case n.ALPHANUMERIC:t.push([i,{data:i.data,mode:n.BYTE,length:i.length}]);break;case n.KANJI:t.push([i,{data:i.data,mode:n.BYTE,length:getStringByteLength(i.data)}]);break;case n.BYTE:t.push([{data:i.data,mode:n.BYTE,length:getStringByteLength(i.data)}])}}return t}(i),s=function(e,t){let o={},i={start:{}},a=["start"];for(let s=0;s<e.length;s++){let l=e[s],c=[];for(let e=0;e<l.length;e++){let u=l[e],p=""+s+e;c.push(p),o[p]={node:u,lastCount:0},i[p]={};for(let e=0;e<a.length;e++){let s=a[e];o[s]&&o[s].node.mode===u.mode?(i[s][p]=getSegmentBitsLength(o[s].lastCount+u.length,u.mode)-getSegmentBitsLength(o[s].lastCount,u.mode),o[s].lastCount+=u.length):(o[s]&&(o[s].lastCount=u.length),i[s][p]=getSegmentBitsLength(u.length,u.mode)+4+n.getCharCountIndicator(u.mode,t))}}a=c}for(let e=0;e<a.length;e++)i[a[e]].end=0;return{map:i,table:o}}(a,o),l=p.find_path(s.map,"start","end"),c=[];for(let e=1;e<l.length-1;e++)c.push(s.table[l[e]].node);return t.fromArray(c.reduce(function(e,t){let o=e.length-1>=0?e[e.length-1]:null;return o&&o.mode===t.mode?e[e.length-1].data+=t.data:e.push(t),e},[]))},t.rawSplit=function(e){return t.fromArray(getSegmentsFromString(e,u.isKanjiModeEnabled()))}},75919:function(e,t){let o;let n=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];t.getSymbolSize=function(e){if(!e)throw Error('"version" cannot be null or undefined');if(e<1||e>40)throw Error('"version" should be in range from 1 to 40');return 4*e+17},t.getSymbolTotalCodewords=function(e){return n[e]},t.getBCHDigit=function(e){let t=0;for(;0!==e;)t++,e>>>=1;return t},t.setToSJISFunction=function(e){if("function"!=typeof e)throw Error('"toSJISFunc" is not a valid function.');o=e},t.isKanjiModeEnabled=function(){return void 0!==o},t.toSJIS=function(e){return o(e)}},40662:function(e,t){t.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}},1621:function(e,t,o){let n=o(75919),i=o(15835),a=o(51141),s=o(34672),l=o(40662),c=n.getBCHDigit(7973);function getReservedBitsCount(e,t){return s.getCharCountIndicator(e,t)+4}t.from=function(e,t){return l.isValid(e)?parseInt(e,10):t},t.getCapacity=function(e,t,o){if(!l.isValid(e))throw Error("Invalid QR Code version");void 0===o&&(o=s.BYTE);let a=n.getSymbolTotalCodewords(e),c=i.getTotalCodewordsCount(e,t),u=(a-c)*8;if(o===s.MIXED)return u;let p=u-getReservedBitsCount(o,e);switch(o){case s.NUMERIC:return Math.floor(p/10*3);case s.ALPHANUMERIC:return Math.floor(p/11*2);case s.KANJI:return Math.floor(p/13);case s.BYTE:default:return Math.floor(p/8)}},t.getBestVersionForData=function(e,o){let n;let i=a.from(o,a.M);if(Array.isArray(e)){if(e.length>1)return function(e,o){for(let n=1;n<=40;n++){let i=function(e,t){let o=0;return e.forEach(function(e){let n=getReservedBitsCount(e.mode,t);o+=n+e.getBitsLength()}),o}(e,n);if(i<=t.getCapacity(n,o,s.MIXED))return n}}(e,i);if(0===e.length)return 1;n=e[0]}else n=e;return function(e,o,n){for(let i=1;i<=40;i++)if(o<=t.getCapacity(i,n,e))return i}(n.mode,n.getLength(),i)},t.getEncodedBits=function(e){if(!l.isValid(e)||e<7)throw Error("Invalid QR Code version");let t=e<<12;for(;n.getBCHDigit(t)-c>=0;)t^=7973<<n.getBCHDigit(t)-c;return e<<12|t}},53113:function(e,t,o){let n=o(68375);t.render=function(e,t,o){var i;let a=o,s=t;void 0!==a||t&&t.getContext||(a=t,t=void 0),t||(s=function(){try{return document.createElement("canvas")}catch(e){throw Error("You need to specify a canvas element")}}()),a=n.getOptions(a);let l=n.getImageWidth(e.modules.size,a),c=s.getContext("2d"),u=c.createImageData(l,l);return n.qrToImageData(u.data,e,a),i=s,c.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=l,i.width=l,i.style.height=l+"px",i.style.width=l+"px",c.putImageData(u,0,0),s},t.renderToDataURL=function(e,o,n){let i=n;void 0!==i||o&&o.getContext||(i=o,o=void 0),i||(i={});let a=t.render(e,o,i),s=i.type||"image/png",l=i.rendererOpts||{};return a.toDataURL(s,l.quality)}},70835:function(e,t,o){let n=o(68375);function getColorAttrib(e,t){let o=e.a/255,n=t+'="'+e.hex+'"';return o<1?n+" "+t+'-opacity="'+o.toFixed(2).slice(1)+'"':n}function svgCmd(e,t,o){let n=e+t;return void 0!==o&&(n+=" "+o),n}t.render=function(e,t,o){let i=n.getOptions(t),a=e.modules.size,s=e.modules.data,l=a+2*i.margin,c=i.color.light.a?"<path "+getColorAttrib(i.color.light,"fill")+' d="M0 0h'+l+"v"+l+'H0z"/>':"",u="<path "+getColorAttrib(i.color.dark,"stroke")+' d="'+function(e,t,o){let n="",i=0,a=!1,s=0;for(let l=0;l<e.length;l++){let c=Math.floor(l%t),u=Math.floor(l/t);c||a||(a=!0),e[l]?(s++,l>0&&c>0&&e[l-1]||(n+=a?svgCmd("M",c+o,.5+u+o):svgCmd("m",i,0),i=0,a=!1),c+1<t&&e[l+1]||(n+=svgCmd("h",s),s=0)):i++}return n}(s,a,i.margin)+'"/>',p=i.width?'width="'+i.width+'" height="'+i.width+'" ':"",d='<svg xmlns="http://www.w3.org/2000/svg" '+p+('viewBox="0 0 '+l)+" "+l+'" shape-rendering="crispEdges">'+c+u+"</svg>\n";return"function"==typeof o&&o(null,d),d}},68375:function(e,t){function hex2rgba(e){if("number"==typeof e&&(e=e.toString()),"string"!=typeof e)throw Error("Color should be defined as hex string");let t=e.slice().replace("#","").split("");if(t.length<3||5===t.length||t.length>8)throw Error("Invalid hex color: "+e);(3===t.length||4===t.length)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),6===t.length&&t.push("F","F");let o=parseInt(t.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:255&o,hex:"#"+t.slice(0,6).join("")}}t.getOptions=function(e){e||(e={}),e.color||(e.color={});let t=void 0===e.margin||null===e.margin||e.margin<0?4:e.margin,o=e.width&&e.width>=21?e.width:void 0,n=e.scale||4;return{width:o,scale:o?4:n,margin:t,color:{dark:hex2rgba(e.color.dark||"#000000ff"),light:hex2rgba(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}},t.getScale=function(e,t){return t.width&&t.width>=e+2*t.margin?t.width/(e+2*t.margin):t.scale},t.getImageWidth=function(e,o){let n=t.getScale(e,o);return Math.floor((e+2*o.margin)*n)},t.qrToImageData=function(e,o,n){let i=o.modules.size,a=o.modules.data,s=t.getScale(i,n),l=Math.floor((i+2*n.margin)*s),c=n.margin*s,u=[n.color.light,n.color.dark];for(let t=0;t<l;t++)for(let o=0;o<l;o++){let p=(t*l+o)*4,d=n.color.light;if(t>=c&&o>=c&&t<l-c&&o<l-c){let e=Math.floor((t-c)/s),n=Math.floor((o-c)/s);d=u[a[e*i+n]?1:0]}e[p++]=d.r,e[p++]=d.g,e[p++]=d.b,e[p]=d.a}}},71092:function(e,t,o){"use strict";o.d(t,{Z:function(){return Q}});var n,i,a,s,l=o(74158),c=o(77317),u="right-scroll-bar-position",p="width-before-scroll-bar";function assignRef(e,t){return"function"==typeof e?e(t):e&&(e.current=t),e}var d="undefined"!=typeof window?c.useLayoutEffect:c.useEffect,f=new WeakMap,h=(0,o(22132)._)(),nothing=function(){},w=c.forwardRef(function(e,t){var o,n,i,a,s=c.useRef(null),u=c.useState({onScrollCapture:nothing,onWheelCapture:nothing,onTouchMoveCapture:nothing}),p=u[0],w=u[1],A=e.forwardProps,g=e.children,m=e.className,y=e.removeScrollBar,b=e.enabled,C=e.shards,B=e.sideCar,v=e.noIsolation,k=e.inert,E=e.allowPinchZoom,x=e.as,I=void 0===x?"div":x,D=e.gapMode,Q=(0,l.__rest)(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),M=(o=[s,t],n=function(e){return o.forEach(function(t){return assignRef(t,e)})},(i=(0,c.useState)(function(){return{value:null,callback:n,facade:{get current(){return i.value},set current(value){var e=i.value;e!==value&&(i.value=value,i.callback(value,e))}}}})[0]).callback=n,a=i.facade,d(function(){var e=f.get(a);if(e){var t=new Set(e),n=new Set(o),i=a.current;t.forEach(function(e){n.has(e)||assignRef(e,null)}),n.forEach(function(e){t.has(e)||assignRef(e,i)})}f.set(a,o)},[o]),a),N=(0,l.__assign)((0,l.__assign)({},Q),p);return c.createElement(c.Fragment,null,b&&c.createElement(B,{sideCar:h,removeScrollBar:y,shards:C,noIsolation:v,inert:k,setCallbacks:w,allowPinchZoom:!!E,lockRef:s,gapMode:D}),A?c.cloneElement(c.Children.only(g),(0,l.__assign)((0,l.__assign)({},N),{ref:M})):c.createElement(I,(0,l.__assign)({},N,{className:m,ref:M}),g))});w.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1},w.classNames={fullWidth:p,zeroRight:u};var A=o(94345),g=o(82145),m={left:0,top:0,right:0,gap:0},parse=function(e){return parseInt(e||"",10)||0},getOffset=function(e){var t=window.getComputedStyle(document.body),o=t["padding"===e?"paddingLeft":"marginLeft"],n=t["padding"===e?"paddingTop":"marginTop"],i=t["padding"===e?"paddingRight":"marginRight"];return[parse(o),parse(n),parse(i)]},getGapWidth=function(e){if(void 0===e&&(e="margin"),"undefined"==typeof window)return m;var t=getOffset(e),o=document.documentElement.clientWidth,n=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,n-o+t[2]-t[0])}},y=(n=0,i=null,a={add:function(e){if(0==n&&(i=function(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=(0,g.V)();return t&&e.setAttribute("nonce",t),e}())){var t,o;(t=i).styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),o=i,(document.head||document.getElementsByTagName("head")[0]).appendChild(o)}n++},remove:function(){--n||!i||(i.parentNode&&i.parentNode.removeChild(i),i=null)}},s=function(e,t){c.useEffect(function(){return a.add(e),function(){a.remove()}},[e&&t])},function(e){return s(e.styles,e.dynamic),null}),b="data-scroll-locked",getStyles=function(e,t,o,n){var i=e.left,a=e.top,s=e.right,l=e.gap;return void 0===o&&(o="margin"),"\n  .".concat("with-scroll-bars-hidden"," {\n   overflow: hidden ").concat(n,";\n   padding-right: ").concat(l,"px ").concat(n,";\n  }\n  body[").concat(b,"] {\n    overflow: hidden ").concat(n,";\n    overscroll-behavior: contain;\n    ").concat([t&&"position: relative ".concat(n,";"),"margin"===o&&"\n    padding-left: ".concat(i,"px;\n    padding-top: ").concat(a,"px;\n    padding-right: ").concat(s,"px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(l,"px ").concat(n,";\n    "),"padding"===o&&"padding-right: ".concat(l,"px ").concat(n,";")].filter(Boolean).join(""),"\n  }\n  \n  .").concat(u," {\n    right: ").concat(l,"px ").concat(n,";\n  }\n  \n  .").concat(p," {\n    margin-right: ").concat(l,"px ").concat(n,";\n  }\n  \n  .").concat(u," .").concat(u," {\n    right: 0 ").concat(n,";\n  }\n  \n  .").concat(p," .").concat(p," {\n    margin-right: 0 ").concat(n,";\n  }\n  \n  body[").concat(b,"] {\n    ").concat("--removed-body-scroll-bar-size",": ").concat(l,"px;\n  }\n")},getCurrentUseCounter=function(){var e=parseInt(document.body.getAttribute(b)||"0",10);return isFinite(e)?e:0},useLockAttribute=function(){c.useEffect(function(){return document.body.setAttribute(b,(getCurrentUseCounter()+1).toString()),function(){var e=getCurrentUseCounter()-1;e<=0?document.body.removeAttribute(b):document.body.setAttribute(b,e.toString())}},[])},RemoveScrollBar=function(e){var t=e.noRelative,o=e.noImportant,n=e.gapMode,i=void 0===n?"margin":n;useLockAttribute();var a=c.useMemo(function(){return getGapWidth(i)},[i]);return c.createElement(y,{styles:getStyles(a,!t,i,o?"":"!important")})},C=o(71691),B=!1;if("undefined"!=typeof window)try{var v=Object.defineProperty({},"passive",{get:function(){return B=!0,!0}});window.addEventListener("test",v,v),window.removeEventListener("test",v,v)}catch(e){B=!1}var k=!!B&&{passive:!1},elementCanBeScrolled=function(e,t){if(!(e instanceof Element))return!1;var o=window.getComputedStyle(e);return"hidden"!==o[t]&&!(o.overflowY===o.overflowX&&"TEXTAREA"!==e.tagName&&"visible"===o[t])},locationCouldBeScrolled=function(e,t){var o=t.ownerDocument,n=t;do{if("undefined"!=typeof ShadowRoot&&n instanceof ShadowRoot&&(n=n.host),elementCouldBeScrolled(e,n)){var i=getScrollVariables(e,n);if(i[1]>i[2])return!0}n=n.parentNode}while(n&&n!==o.body);return!1},elementCouldBeScrolled=function(e,t){return"v"===e?elementCanBeScrolled(t,"overflowY"):elementCanBeScrolled(t,"overflowX")},getScrollVariables=function(e,t){return"v"===e?[t.scrollTop,t.scrollHeight,t.clientHeight]:[t.scrollLeft,t.scrollWidth,t.clientWidth]},handleScroll=function(e,t,o,n,i){var a,s=(a=window.getComputedStyle(t).direction,"h"===e&&"rtl"===a?-1:1),l=s*n,c=o.target,u=t.contains(c),p=!1,d=l>0,f=0,h=0;do{var w=getScrollVariables(e,c),A=w[0],g=w[1]-w[2]-s*A;(A||g)&&elementCouldBeScrolled(e,c)&&(f+=g,h+=A),c=c instanceof ShadowRoot?c.host:c.parentNode}while(!u&&c!==document.body||u&&(t.contains(c)||t===c));return d&&(i&&1>Math.abs(f)||!i&&l>f)?p=!0:!d&&(i&&1>Math.abs(h)||!i&&-l>h)&&(p=!0),p},getTouchXY=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},getDeltaXY=function(e){return[e.deltaX,e.deltaY]},extractRef=function(e){return e&&"current"in e?e.current:e},E=0,x=[],I=(0,A.L)(h,function(e){var t=c.useRef([]),o=c.useRef([0,0]),n=c.useRef(),i=c.useState(E++)[0],a=c.useState(C.Ws)[0],s=c.useRef(e);c.useEffect(function(){s.current=e},[e]),c.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(i));var t=(0,l.__spreadArray)([e.lockRef.current],(e.shards||[]).map(extractRef),!0).filter(Boolean);return t.forEach(function(e){return e.classList.add("allow-interactivity-".concat(i))}),function(){document.body.classList.remove("block-interactivity-".concat(i)),t.forEach(function(e){return e.classList.remove("allow-interactivity-".concat(i))})}}},[e.inert,e.lockRef.current,e.shards]);var u=c.useCallback(function(e,t){if("touches"in e&&2===e.touches.length||"wheel"===e.type&&e.ctrlKey)return!s.current.allowPinchZoom;var i,a=getTouchXY(e),l=o.current,c="deltaX"in e?e.deltaX:l[0]-a[0],u="deltaY"in e?e.deltaY:l[1]-a[1],p=e.target,d=Math.abs(c)>Math.abs(u)?"h":"v";if("touches"in e&&"h"===d&&"range"===p.type)return!1;var f=locationCouldBeScrolled(d,p);if(!f)return!0;if(f?i=d:(i="v"===d?"h":"v",f=locationCouldBeScrolled(d,p)),!f)return!1;if(!n.current&&"changedTouches"in e&&(c||u)&&(n.current=i),!i)return!0;var h=n.current||i;return handleScroll(h,t,e,"h"===h?c:u,!0)},[]),p=c.useCallback(function(e){if(x.length&&x[x.length-1]===a){var o="deltaY"in e?getDeltaXY(e):getTouchXY(e),n=t.current.filter(function(t){var n;return t.name===e.type&&(t.target===e.target||e.target===t.shadowParent)&&(n=t.delta)[0]===o[0]&&n[1]===o[1]})[0];if(n&&n.should){e.cancelable&&e.preventDefault();return}if(!n){var i=(s.current.shards||[]).map(extractRef).filter(Boolean).filter(function(t){return t.contains(e.target)});(i.length>0?u(e,i[0]):!s.current.noIsolation)&&e.cancelable&&e.preventDefault()}}},[]),d=c.useCallback(function(e,o,n,i){var a={name:e,delta:o,target:n,should:i,shadowParent:function(e){for(var t=null;null!==e;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}(n)};t.current.push(a),setTimeout(function(){t.current=t.current.filter(function(e){return e!==a})},1)},[]),f=c.useCallback(function(e){o.current=getTouchXY(e),n.current=void 0},[]),h=c.useCallback(function(t){d(t.type,getDeltaXY(t),t.target,u(t,e.lockRef.current))},[]),w=c.useCallback(function(t){d(t.type,getTouchXY(t),t.target,u(t,e.lockRef.current))},[]);c.useEffect(function(){return x.push(a),e.setCallbacks({onScrollCapture:h,onWheelCapture:h,onTouchMoveCapture:w}),document.addEventListener("wheel",p,k),document.addEventListener("touchmove",p,k),document.addEventListener("touchstart",f,k),function(){x=x.filter(function(e){return e!==a}),document.removeEventListener("wheel",p,k),document.removeEventListener("touchmove",p,k),document.removeEventListener("touchstart",f,k)}},[]);var A=e.removeScrollBar,g=e.inert;return c.createElement(c.Fragment,null,g?c.createElement(a,{styles:"\n  .block-interactivity-".concat(i," {pointer-events: none;}\n  .allow-interactivity-").concat(i," {pointer-events: all;}\n")}):null,A?c.createElement(RemoveScrollBar,{gapMode:e.gapMode}):null)}),D=c.forwardRef(function(e,t){return c.createElement(w,(0,l.__assign)({},e,{ref:t,sideCar:I}))});D.classNames=w.classNames;var Q=D},39856:function(e,t,o){var n;!function(i,a){"use strict";var s="function",l="undefined",c="object",u="string",p="major",d="model",f="name",h="type",w="vendor",A="version",g="architecture",m="console",y="mobile",b="tablet",C="smarttv",B="wearable",v="embedded",k="Amazon",E="Apple",x="ASUS",I="BlackBerry",D="Browser",Q="Chrome",M="Firefox",N="Google",S="Huawei",T="Microsoft",R="Motorola",F="Opera",W="Samsung",U="Sharp",L="Sony",O="Xiaomi",P="Zebra",q="Facebook",K="Chromium OS",J="Mac OS",extend=function(e,t){var o={};for(var n in e)t[n]&&t[n].length%2==0?o[n]=t[n].concat(e[n]):o[n]=e[n];return o},enumerize=function(e){for(var t={},o=0;o<e.length;o++)t[e[o].toUpperCase()]=e[o];return t},has=function(e,t){return typeof e===u&&-1!==lowerize(t).indexOf(lowerize(e))},lowerize=function(e){return e.toLowerCase()},trim=function(e,t){if(typeof e===u)return e=e.replace(/^\s\s*/,""),typeof t===l?e:e.substring(0,500)},rgxMapper=function(e,t){for(var o,n,i,l,u,p,d=0;d<t.length&&!u;){var f=t[d],h=t[d+1];for(o=n=0;o<f.length&&!u&&f[o];)if(u=f[o++].exec(e))for(i=0;i<h.length;i++)p=u[++n],typeof(l=h[i])===c&&l.length>0?2===l.length?typeof l[1]==s?this[l[0]]=l[1].call(this,p):this[l[0]]=l[1]:3===l.length?typeof l[1]!==s||l[1].exec&&l[1].test?this[l[0]]=p?p.replace(l[1],l[2]):a:this[l[0]]=p?l[1].call(this,p,l[2]):a:4===l.length&&(this[l[0]]=p?l[3].call(this,p.replace(l[1],l[2])):a):this[l]=p||a;d+=2}},strMapper=function(e,t){for(var o in t)if(typeof t[o]===c&&t[o].length>0){for(var n=0;n<t[o].length;n++)if(has(t[o][n],e))return"?"===o?a:o}else if(has(t[o],e))return"?"===o?a:o;return e},H={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2","8.1":"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},Y={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[A,[f,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[A,[f,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[f,A],[/opios[\/ ]+([\w\.]+)/i],[A,[f,F+" Mini"]],[/\bopr\/([\w\.]+)/i],[A,[f,F]],[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],[A,[f,"Baidu"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[f,A],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[A,[f,"UC"+D]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i,/micromessenger\/([\w\.]+)/i],[A,[f,"WeChat"]],[/konqueror\/([\w\.]+)/i],[A,[f,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[A,[f,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[A,[f,"Yandex"]],[/slbrowser\/([\w\.]+)/i],[A,[f,"Smart Lenovo "+D]],[/(avast|avg)\/([\w\.]+)/i],[[f,/(.+)/,"$1 Secure "+D],A],[/\bfocus\/([\w\.]+)/i],[A,[f,M+" Focus"]],[/\bopt\/([\w\.]+)/i],[A,[f,F+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[A,[f,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[A,[f,"Dolphin"]],[/coast\/([\w\.]+)/i],[A,[f,F+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[A,[f,"MIUI "+D]],[/fxios\/([-\w\.]+)/i],[A,[f,M]],[/\bqihu|(qi?ho?o?|360)browser/i],[[f,"360 "+D]],[/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i],[[f,/(.+)/,"$1 "+D],A],[/samsungbrowser\/([\w\.]+)/i],[A,[f,W+" Internet"]],[/(comodo_dragon)\/([\w\.]+)/i],[[f,/_/g," "],A],[/metasr[\/ ]?([\d\.]+)/i],[A,[f,"Sogou Explorer"]],[/(sogou)mo\w+\/([\d\.]+)/i],[[f,"Sogou Mobile"],A],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i],[f,A],[/(lbbrowser)/i,/\[(linkedin)app\]/i],[f],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[f,q],A],[/(Klarna)\/([\w\.]+)/i,/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(alipay)client\/([\w\.]+)/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[f,A],[/\bgsa\/([\w\.]+) .*safari\//i],[A,[f,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[A,[f,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[A,[f,Q+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[f,Q+" WebView"],A],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[A,[f,"Android "+D]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[f,A],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[A,[f,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[A,f],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[f,[A,strMapper,{"1.0":"/8","1.2":"/1","1.3":"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[f,A],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[f,"Netscape"],A],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[A,[f,M+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[f,A],[/(cobalt)\/([\w\.]+)/i],[f,[A,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[g,"amd64"]],[/(ia32(?=;))/i],[[g,lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[g,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[g,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[g,"armhf"]],[/windows (ce|mobile); ppc;/i],[[g,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[g,/ower/,"",lowerize]],[/(sun4\w)[;\)]/i],[[g,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[g,lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[d,[w,W],[h,b]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[d,[w,W],[h,y]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[d,[w,E],[h,y]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[d,[w,E],[h,b]],[/(macintosh);/i],[d,[w,E]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[d,[w,U],[h,y]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[d,[w,S],[h,b]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[d,[w,S],[h,y]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[d,/_/g," "],[w,O],[h,y]],[/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[d,/_/g," "],[w,O],[h,b]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[d,[w,"OPPO"],[h,y]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[d,[w,"Vivo"],[h,y]],[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],[d,[w,"Realme"],[h,y]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[d,[w,R],[h,y]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[d,[w,R],[h,b]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[d,[w,"LG"],[h,b]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[d,[w,"LG"],[h,y]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[d,[w,"Lenovo"],[h,b]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[d,/_/g," "],[w,"Nokia"],[h,y]],[/(pixel c)\b/i],[d,[w,N],[h,b]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[d,[w,N],[h,y]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[d,[w,L],[h,y]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[d,"Xperia Tablet"],[w,L],[h,b]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[d,[w,"OnePlus"],[h,y]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[d,[w,k],[h,b]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[d,/(.+)/g,"Fire Phone $1"],[w,k],[h,y]],[/(playbook);[-\w\),; ]+(rim)/i],[d,w,[h,b]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[d,[w,I],[h,y]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[d,[w,x],[h,b]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[d,[w,x],[h,y]],[/(nexus 9)/i],[d,[w,"HTC"],[h,b]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[w,[d,/_/g," "],[h,y]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[d,[w,"Acer"],[h,b]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[d,[w,"Meizu"],[h,y]],[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],[d,[w,"Ulefone"],[h,y]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[w,d,[h,y]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[w,d,[h,b]],[/(surface duo)/i],[d,[w,T],[h,b]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[d,[w,"Fairphone"],[h,y]],[/(u304aa)/i],[d,[w,"AT&T"],[h,y]],[/\bsie-(\w*)/i],[d,[w,"Siemens"],[h,y]],[/\b(rct\w+) b/i],[d,[w,"RCA"],[h,b]],[/\b(venue[\d ]{2,7}) b/i],[d,[w,"Dell"],[h,b]],[/\b(q(?:mv|ta)\w+) b/i],[d,[w,"Verizon"],[h,b]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[d,[w,"Barnes & Noble"],[h,b]],[/\b(tm\d{3}\w+) b/i],[d,[w,"NuVision"],[h,b]],[/\b(k88) b/i],[d,[w,"ZTE"],[h,b]],[/\b(nx\d{3}j) b/i],[d,[w,"ZTE"],[h,y]],[/\b(gen\d{3}) b.+49h/i],[d,[w,"Swiss"],[h,y]],[/\b(zur\d{3}) b/i],[d,[w,"Swiss"],[h,b]],[/\b((zeki)?tb.*\b) b/i],[d,[w,"Zeki"],[h,b]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[w,"Dragon Touch"],d,[h,b]],[/\b(ns-?\w{0,9}) b/i],[d,[w,"Insignia"],[h,b]],[/\b((nxa|next)-?\w{0,9}) b/i],[d,[w,"NextBook"],[h,b]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[w,"Voice"],d,[h,y]],[/\b(lvtel\-)?(v1[12]) b/i],[[w,"LvTel"],d,[h,y]],[/\b(ph-1) /i],[d,[w,"Essential"],[h,y]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[d,[w,"Envizen"],[h,b]],[/\b(trio[-\w\. ]+) b/i],[d,[w,"MachSpeed"],[h,b]],[/\btu_(1491) b/i],[d,[w,"Rotor"],[h,b]],[/(shield[\w ]+) b/i],[d,[w,"Nvidia"],[h,b]],[/(sprint) (\w+)/i],[w,d,[h,y]],[/(kin\.[onetw]{3})/i],[[d,/\./g," "],[w,T],[h,y]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[d,[w,P],[h,b]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[d,[w,P],[h,y]],[/smart-tv.+(samsung)/i],[w,[h,C]],[/hbbtv.+maple;(\d+)/i],[[d,/^/,"SmartTV"],[w,W],[h,C]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[w,"LG"],[h,C]],[/(apple) ?tv/i],[w,[d,E+" TV"],[h,C]],[/crkey/i],[[d,Q+"cast"],[w,N],[h,C]],[/droid.+aft(\w+)( bui|\))/i],[d,[w,k],[h,C]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[d,[w,U],[h,C]],[/(bravia[\w ]+)( bui|\))/i],[d,[w,L],[h,C]],[/(mitv-\w{5}) bui/i],[d,[w,O],[h,C]],[/Hbbtv.*(technisat) (.*);/i],[w,d,[h,C]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[w,trim],[d,trim],[h,C]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[h,C]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[w,d,[h,m]],[/droid.+; (shield) bui/i],[d,[w,"Nvidia"],[h,m]],[/(playstation [345portablevi]+)/i],[d,[w,L],[h,m]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[d,[w,T],[h,m]],[/((pebble))app/i],[w,d,[h,B]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[d,[w,E],[h,B]],[/droid.+; (glass) \d/i],[d,[w,N],[h,B]],[/droid.+; (wt63?0{2,3})\)/i],[d,[w,P],[h,B]],[/(quest( 2| pro)?)/i],[d,[w,q],[h,B]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[w,[h,v]],[/(aeobc)\b/i],[d,[w,k],[h,v]],[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],[d,[h,y]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[d,[h,b]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[h,b]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[h,y]],[/(android[-\w\. ]{0,9});.+buil/i],[d,[w,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[A,[f,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[A,[f,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[f,A],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[A,f]],os:[[/microsoft (windows) (vista|xp)/i],[f,A],[/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],[f,[A,strMapper,H]],[/windows nt 6\.2; (arm)/i,/windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,/(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[A,strMapper,H],[f,"Windows"]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[A,/_/g,"."],[f,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[f,J],[A,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[A,f],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[f,A],[/\(bb(10);/i],[A,[f,I]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[A,[f,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[A,[f,M+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[A,[f,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[A,[f,"watchOS"]],[/crkey\/([\d\.]+)/i],[A,[f,Q+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[f,K],A],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[f,A],[/(sunos) ?([\w\.\d]*)/i],[[f,"Solaris"],A],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[f,A]]},UAParser=function(e,t){if(typeof e===c&&(t=e,e=a),!(this instanceof UAParser))return new UAParser(e,t).getResult();var o=typeof i!==l&&i.navigator?i.navigator:a,n=e||(o&&o.userAgent?o.userAgent:""),m=o&&o.userAgentData?o.userAgentData:a,C=t?extend(Y,t):Y,B=o&&o.userAgent==n;return this.getBrowser=function(){var e,t={};return t[f]=a,t[A]=a,rgxMapper.call(t,n,C.browser),t[p]=typeof(e=t[A])===u?e.replace(/[^\d\.]/g,"").split(".")[0]:a,B&&o&&o.brave&&typeof o.brave.isBrave==s&&(t[f]="Brave"),t},this.getCPU=function(){var e={};return e[g]=a,rgxMapper.call(e,n,C.cpu),e},this.getDevice=function(){var e={};return e[w]=a,e[d]=a,e[h]=a,rgxMapper.call(e,n,C.device),B&&!e[h]&&m&&m.mobile&&(e[h]=y),B&&"Macintosh"==e[d]&&o&&typeof o.standalone!==l&&o.maxTouchPoints&&o.maxTouchPoints>2&&(e[d]="iPad",e[h]=b),e},this.getEngine=function(){var e={};return e[f]=a,e[A]=a,rgxMapper.call(e,n,C.engine),e},this.getOS=function(){var e={};return e[f]=a,e[A]=a,rgxMapper.call(e,n,C.os),B&&!e[f]&&m&&"Unknown"!=m.platform&&(e[f]=m.platform.replace(/chrome os/i,K).replace(/macos/i,J)),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return n},this.setUA=function(e){return n=typeof e===u&&e.length>500?trim(e,500):e,this},this.setUA(n),this};UAParser.VERSION="1.0.37",UAParser.BROWSER=enumerize([f,A,p]),UAParser.CPU=enumerize([g]),UAParser.DEVICE=enumerize([d,w,h,m,y,C,b,B,v]),UAParser.ENGINE=UAParser.OS=enumerize([f,A]),typeof t!==l?(e.exports&&(t=e.exports=UAParser),t.UAParser=UAParser):o.amdO?a!==(n=(function(){return UAParser}).call(t,o,t,e))&&(e.exports=n):typeof i!==l&&(i.UAParser=UAParser);var G=typeof i!==l&&(i.jQuery||i.Zepto);if(G&&!G.ua){var V=new UAParser;G.ua=V.getResult(),G.ua.get=function(){return V.getUA()},G.ua.set=function(e){V.setUA(e);var t=V.getResult();for(var o in t)G.ua[o]=t[o]}}}("object"==typeof window?window:this)},17214:function(e,t,o){"use strict";o.d(t,{W:function(){return lightTheme}});var n=o(65404),i={blue:{accentColor:"#0E76FD",accentColorForeground:"#FFF"},green:{accentColor:"#1DB847",accentColorForeground:"#FFF"},orange:{accentColor:"#FF801F",accentColorForeground:"#FFF"},pink:{accentColor:"#FF5CA0",accentColorForeground:"#FFF"},purple:{accentColor:"#5F5AFA",accentColorForeground:"#FFF"},red:{accentColor:"#FA423C",accentColorForeground:"#FFF"}},a=i.blue,lightTheme=({accentColor:e=a.accentColor,accentColorForeground:t=a.accentColorForeground,...o}={})=>({...(0,n.w)(o),colors:{accentColor:e,accentColorForeground:t,actionButtonBorder:"rgba(0, 0, 0, 0.04)",actionButtonBorderMobile:"rgba(0, 0, 0, 0.06)",actionButtonSecondaryBackground:"rgba(0, 0, 0, 0.06)",closeButton:"rgba(60, 66, 66, 0.8)",closeButtonBackground:"rgba(0, 0, 0, 0.06)",connectButtonBackground:"#FFF",connectButtonBackgroundError:"#FF494A",connectButtonInnerBackground:"linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))",connectButtonText:"#25292E",connectButtonTextError:"#FFF",connectionIndicator:"#30E000",downloadBottomCardBackground:"linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF",downloadTopCardBackground:"linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF",error:"#FF494A",generalBorder:"rgba(0, 0, 0, 0.06)",generalBorderDim:"rgba(0, 0, 0, 0.03)",menuItemBackground:"rgba(60, 66, 66, 0.1)",modalBackdrop:"rgba(0, 0, 0, 0.3)",modalBackground:"#FFF",modalBorder:"transparent",modalText:"#25292E",modalTextDim:"rgba(60, 66, 66, 0.3)",modalTextSecondary:"rgba(60, 66, 66, 0.6)",profileAction:"#FFF",profileActionHover:"rgba(255, 255, 255, 0.5)",profileForeground:"rgba(60, 66, 66, 0.06)",selectedOptionBorder:"rgba(60, 66, 66, 0.1)",standby:"#FFD641"},shadows:{connectButton:"0px 4px 12px rgba(0, 0, 0, 0.1)",dialog:"0px 8px 32px rgba(0, 0, 0, 0.32)",profileDetailsAction:"0px 2px 6px rgba(37, 41, 46, 0.04)",selectedOption:"0px 2px 6px rgba(0, 0, 0, 0.24)",selectedWallet:"0px 2px 6px rgba(0, 0, 0, 0.12)",walletLogo:"0px 2px 16px rgba(0, 0, 0, 0.16)"}});lightTheme.accentColors=i},65404:function(e,t,o){"use strict";o.d(t,{w:function(){return baseTheme}});var n='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',i={rounded:`SFRounded, ui-rounded, "SF Pro Rounded", ${n}`,system:n},a={large:{actionButton:"9999px",connectButton:"12px",modal:"24px",modalMobile:"28px"},medium:{actionButton:"10px",connectButton:"8px",modal:"16px",modalMobile:"18px"},none:{actionButton:"0px",connectButton:"0px",modal:"0px",modalMobile:"0px"},small:{actionButton:"4px",connectButton:"4px",modal:"8px",modalMobile:"8px"}},s={large:{modalOverlay:"blur(20px)"},none:{modalOverlay:"blur(0px)"},small:{modalOverlay:"blur(4px)"}},baseTheme=({borderRadius:e="large",fontStack:t="rounded",overlayBlur:o="none"})=>({blurs:{modalOverlay:s[o].modalOverlay},fonts:{body:i[t]},radii:{actionButton:a[e].actionButton,connectButton:a[e].connectButton,menuButton:a[e].connectButton,modal:a[e].modal,modalMobile:a[e].modalMobile}})},64332:function(e,t,o){"use strict";o.d(t,{I:function(){return n}});var n=`{
  "connect_wallet": {
    "label": "Connect Wallet",
    "wrong_network": {
      "label": "Wrong network"
    }
  },

  "intro": {
    "title": "What is a Wallet?",
    "description": "A wallet is used to send, receive, store, and display digital assets. It's also a new way to log in, without needing to create new accounts and passwords on every website.",
    "digital_asset": {
      "title": "A Home for your Digital Assets",
      "description": "Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs."
    },
    "login": {
      "title": "A New Way to Log In",
      "description": "Instead of creating new accounts and passwords on every website, just connect your wallet."
    },
    "get": {
      "label": "Get a Wallet"
    },
    "learn_more": {
      "label": "Learn More"
    }
  },

  "sign_in": {
    "label": "Verify your account",
    "description": "To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account.",
    "message": {
      "send": "Sign message",
      "preparing": "Preparing message...",
      "cancel": "Cancel",
      "preparing_error": "Error preparing message, please retry!"
    },
    "signature": {
      "waiting": "Waiting for signature...",
      "verifying": "Verifying signature...",
      "signing_error": "Error signing message, please retry!",
      "verifying_error": "Error verifying signature, please retry!",
      "oops_error": "Oops, something went wrong!"
    }
  },

  "connect": {
    "label": "Connect",
    "title": "Connect a Wallet",
    "new_to_ethereum": {
      "description": "New to Ethereum wallets?",
      "learn_more": {
        "label": "Learn More"
      }
    },
    "learn_more": {
      "label": "Learn more"
    },
    "recent": "Recent",
    "status": {
      "opening": "Opening %{wallet}...",
      "connecting": "Connecting",
      "connect_mobile": "Continue in %{wallet}",
      "not_installed": "%{wallet} is not installed",
      "not_available": "%{wallet} is not available",
      "confirm": "Confirm connection in the extension",
      "confirm_mobile": "Accept connection request in the wallet"
    },
    "secondary_action": {
      "get": {
        "description": "Don't have %{wallet}?",
        "label": "GET"
      },
      "install": {
        "label": "INSTALL"
      },
      "retry": {
        "label": "RETRY"
      }
    },
    "walletconnect": {
      "description": {
        "full": "Need the official WalletConnect modal?",
        "compact": "Need the WalletConnect modal?"
      },
      "open": {
        "label": "OPEN"
      }
    }
  },

  "connect_scan": {
    "title": "Scan with %{wallet}",
    "fallback_title": "Scan with your phone"
  },

  "connector_group": {
    "installed": "Installed",
    "recommended": "Recommended",
    "other": "Other",
    "popular": "Popular",
    "more": "More",
    "others": "Others"
  },

  "get": {
    "title": "Get a Wallet",
    "action": {
      "label": "GET"
    },
    "mobile": {
      "description": "Mobile Wallet"
    },
    "extension": {
      "description": "Browser Extension"
    },
    "mobile_and_extension": {
      "description": "Mobile Wallet and Extension"
    },
    "mobile_and_desktop": {
      "description": "Mobile and Desktop Wallet"
    },
    "looking_for": {
      "title": "Not what you're looking for?",
      "mobile": {
        "description": "Select a wallet on the main screen to get started with a different wallet provider."
      },
      "desktop": {
        "compact_description": "Select a wallet on the main screen to get started with a different wallet provider.",
        "wide_description": "Select a wallet on the left to get started with a different wallet provider."
      }
    }
  },

  "get_options": {
    "title": "Get started with %{wallet}",
    "short_title": "Get %{wallet}",
    "mobile": {
      "title": "%{wallet} for Mobile",
      "description": "Use the mobile wallet to explore the world of Ethereum.",
      "download": {
        "label": "Get the app"
      }
    },
    "extension": {
      "title": "%{wallet} for %{browser}",
      "description": "Access your wallet right from your favorite web browser.",
      "download": {
        "label": "Add to %{browser}"
      }
    },
    "desktop": {
      "title": "%{wallet} for %{platform}",
      "description": "Access your wallet natively from your powerful desktop.",
      "download": {
        "label": "Add to %{platform}"
      }
    }
  },

  "get_mobile": {
    "title": "Install %{wallet}",
    "description": "Scan with your phone to download on iOS or Android",
    "continue": {
      "label": "Continue"
    }
  },

  "get_instructions": {
    "mobile": {
      "connect": {
        "label": "Connect"
      },
      "learn_more": {
        "label": "Learn More"
      }
    },
    "extension": {
      "refresh": {
        "label": "Refresh"
      },
      "learn_more": {
        "label": "Learn More"
      }
    },
    "desktop": {
      "connect": {
        "label": "Connect"
      },
      "learn_more": {
        "label": "Learn More"
      }
    }
  },

  "chains": {
    "title": "Switch Networks",
    "wrong_network": "Wrong network detected, switch or disconnect to continue.",
    "confirm": "Confirm in Wallet",
    "switching_not_supported": "Your wallet does not support switching networks from %{appName}. Try switching networks from within your wallet instead.",
    "switching_not_supported_fallback": "Your wallet does not support switching networks from this app. Try switching networks from within your wallet instead.",
    "disconnect": "Disconnect",
    "connected": "Connected"
  },

  "profile": {
    "disconnect": {
      "label": "Disconnect"
    },
    "copy_address": {
      "label": "Copy Address",
      "copied": "Copied!"
    },
    "explorer": {
      "label": "View more on explorer"
    },
    "transactions": {
      "description": "%{appName} transactions will appear here...",
      "description_fallback": "Your transactions will appear here...",
      "recent": {
        "title": "Recent Transactions"
      },
      "clear": {
        "label": "Clear All"
      }
    }
  },

  "wallet_connectors": {
    "argent": {
      "qr_code": {
        "step1": {
          "description": "Put Argent on your home screen for faster access to your wallet.",
          "title": "Open the Argent app"
        },
        "step2": {
          "description": "Create a wallet and username, or import an existing wallet.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "berasig": {
      "extension": {
        "step1": {
          "title": "Install the BeraSig extension",
          "description": "We recommend pinning BeraSig to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "best": {
      "qr_code": {
        "step1": {
          "title": "Open the Best Wallet app",
          "description": "Add Best Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "bifrost": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bifrost Wallet on your home screen for quicker access.",
          "title": "Open the Bifrost Wallet app"
        },
        "step2": {
          "description": "Create or import a wallet using your recovery phrase.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "bitget": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bitget Wallet on your home screen for quicker access.",
          "title": "Open the Bitget Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Bitget Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Bitget Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "bitski": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Bitski to your taskbar for quicker access to your wallet.",
          "title": "Install the Bitski extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "bitverse": {
      "qr_code": {
        "step1": {
          "title": "Open the Bitverse Wallet app",
          "description": "Add Bitverse Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "bloom": {
      "desktop": {
        "step1": {
          "title": "Open the Bloom Wallet app",
          "description": "We recommend putting Bloom Wallet on your home screen for quicker access."
        },
        "step2": {
          "description": "Create or import a wallet using your recovery phrase.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you have a wallet, click on Connect to connect via Bloom. A connection prompt in the app will appear for you to confirm the connection.",
          "title": "Click on Connect"
        }
      }
    },

    "bybit": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Bybit on your home screen for faster access to your wallet.",
          "title": "Open the Bybit app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "Click at the top right of your browser and pin Bybit Wallet for easy access.",
          "title": "Install the Bybit Wallet extension"
        },
        "step2": {
          "description": "Create a new wallet or import an existing one.",
          "title": "Create or Import a wallet"
        },
        "step3": {
          "description": "Once you set up Bybit Wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "binance": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Binance on your home screen for faster access to your wallet.",
          "title": "Open the Binance app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      }
    },

    "coin98": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Coin98 Wallet on your home screen for faster access to your wallet.",
          "title": "Open the Coin98 Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },

      "extension": {
        "step1": {
          "description": "Click at the top right of your browser and pin Coin98 Wallet for easy access.",
          "title": "Install the Coin98 Wallet extension"
        },
        "step2": {
          "description": "Create a new wallet or import an existing one.",
          "title": "Create or Import a wallet"
        },
        "step3": {
          "description": "Once you set up Coin98 Wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "coinbase": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Coinbase Wallet on your home screen for quicker access.",
          "title": "Open the Coinbase Wallet app"
        },
        "step2": {
          "description": "You can easily backup your wallet using the cloud backup feature.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Coinbase Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Coinbase Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "compass": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Compass Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Compass Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "core": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Core on your home screen for faster access to your wallet.",
          "title": "Open the Core app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Core to your taskbar for quicker access to your wallet.",
          "title": "Install the Core extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "fox": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting FoxWallet on your home screen for quicker access.",
          "title": "Open the FoxWallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      }
    },

    "frontier": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Frontier Wallet on your home screen for quicker access.",
          "title": "Open the Frontier Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Frontier Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Frontier Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "im_token": {
      "qr_code": {
        "step1": {
          "title": "Open the imToken app",
          "description": "Put imToken app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "iopay": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting ioPay on your home screen for faster access to your wallet.",
          "title": "Open the ioPay app"
        },
        "step2": {
          "description": "You can easily backup your wallet using our backup feature on your phone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the WalletConnect button"
        }
      }
    },

    "kaikas": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Kaikas to your taskbar for quicker access to your wallet.",
          "title": "Install the Kaikas extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Kaikas app",
          "description": "Put Kaikas app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "kaia": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Kaia to your taskbar for quicker access to your wallet.",
          "title": "Install the Kaia extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Kaia app",
          "description": "Put Kaia app on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap Scanner Icon in top right corner",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "kraken": {
      "qr_code": {
        "step1": {
          "title": "Open the Kraken Wallet app",
          "description": "Add Kraken Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "kresus": {
      "qr_code": {
        "step1": {
          "title": "Open the Kresus Wallet app",
          "description": "Add Kresus Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "magicEden": {
      "extension": {
        "step1": {
          "title": "Install the Magic Eden extension",
          "description": "We recommend pinning Magic Eden to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "metamask": {
      "qr_code": {
        "step1": {
          "title": "Open the MetaMask app",
          "description": "We recommend putting MetaMask on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the MetaMask extension",
          "description": "We recommend pinning MetaMask to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "nestwallet": {
      "extension": {
        "step1": {
          "title": "Install the NestWallet extension",
          "description": "We recommend pinning NestWallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "okx": {
      "qr_code": {
        "step1": {
          "title": "Open the OKX Wallet app",
          "description": "We recommend putting OKX Wallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the OKX Wallet extension",
          "description": "We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "omni": {
      "qr_code": {
        "step1": {
          "title": "Open the Omni app",
          "description": "Add Omni to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your home screen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "1inch": {
      "qr_code": {
        "step1": {
          "description": "Put 1inch Wallet on your home screen for faster access to your wallet.",
          "title": "Open the 1inch Wallet app"
        },
        "step2": {
          "description": "Create a wallet and username, or import an existing wallet.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the Scan QR button"
        }
      }
    },

    "token_pocket": {
      "qr_code": {
        "step1": {
          "title": "Open the TokenPocket app",
          "description": "We recommend putting TokenPocket on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the TokenPocket extension",
          "description": "We recommend pinning TokenPocket to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "trust": {
      "qr_code": {
        "step1": {
          "title": "Open the Trust Wallet app",
          "description": "Put Trust Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the Trust Wallet extension",
          "description": "Click at the top right of your browser and pin Trust Wallet for easy access."
        },
        "step2": {
          "title": "Create or Import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up Trust Wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "uniswap": {
      "qr_code": {
        "step1": {
          "title": "Open the Uniswap app",
          "description": "Add Uniswap Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "zerion": {
      "qr_code": {
        "step1": {
          "title": "Open the Zerion app",
          "description": "We recommend putting Zerion on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      },

      "extension": {
        "step1": {
          "title": "Install the Zerion extension",
          "description": "We recommend pinning Zerion to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "rainbow": {
      "qr_code": {
        "step1": {
          "title": "Open the Rainbow app",
          "description": "We recommend putting Rainbow on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "You can easily backup your wallet using our backup feature on your phone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "enkrypt": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Enkrypt Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Enkrypt Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "frame": {
      "extension": {
        "step1": {
          "description": "We recommend pinning Frame to your taskbar for quicker access to your wallet.",
          "title": "Install Frame & the companion extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "one_key": {
      "extension": {
        "step1": {
          "title": "Install the OneKey Wallet extension",
          "description": "We recommend pinning OneKey Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "paraswap": {
      "qr_code": {
        "step1": {
          "title": "Open the ParaSwap app",
          "description": "Add ParaSwap Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      }
    },

    "phantom": {
      "extension": {
        "step1": {
          "title": "Install the Phantom extension",
          "description": "We recommend pinning Phantom to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "rabby": {
      "extension": {
        "step1": {
          "title": "Install the Rabby extension",
          "description": "We recommend pinning Rabby to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "ronin": {
      "qr_code": {
        "step1": {
          "description": "We recommend putting Ronin Wallet on your home screen for quicker access.",
          "title": "Open the Ronin Wallet app"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "After you scan, a connection prompt will appear for you to connect your wallet.",
          "title": "Tap the scan button"
        }
      },

      "extension": {
        "step1": {
          "description": "We recommend pinning Ronin Wallet to your taskbar for quicker access to your wallet.",
          "title": "Install the Ronin Wallet extension"
        },
        "step2": {
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
          "title": "Create or Import a Wallet"
        },
        "step3": {
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension.",
          "title": "Refresh your browser"
        }
      }
    },

    "ramper": {
      "extension": {
        "step1": {
          "title": "Install the Ramper extension",
          "description": "We recommend pinning Ramper to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "safeheron": {
      "extension": {
        "step1": {
          "title": "Install the Core extension",
          "description": "We recommend pinning Safeheron to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "taho": {
      "extension": {
        "step1": {
          "title": "Install the Taho extension",
          "description": "We recommend pinning Taho to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "wigwam": {
      "extension": {
        "step1": {
          "title": "Install the Wigwam extension",
          "description": "We recommend pinning Wigwam to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "talisman": {
      "extension": {
        "step1": {
          "title": "Install the Talisman extension",
          "description": "We recommend pinning Talisman to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import an Ethereum Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "xdefi": {
      "extension": {
        "step1": {
          "title": "Install the XDEFI Wallet extension",
          "description": "We recommend pinning XDEFI Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "zeal": {
      "qr_code": {
        "step1": {
          "title": "Open the Zeal app",
          "description": "Add Zeal Wallet to your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the QR icon and scan",
          "description": "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect."
        }
      },
      "extension": {
        "step1": {
          "title": "Install the Zeal extension",
          "description": "We recommend pinning Zeal to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "safepal": {
      "extension": {
        "step1": {
          "title": "Install the SafePal Wallet extension",
          "description": "Click at the top right of your browser and pin SafePal Wallet for easy access."
        },
        "step2": {
          "title": "Create or Import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up SafePal Wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the SafePal Wallet app",
          "description": "Put SafePal Wallet on your home screen for faster access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Choose New Connection, then scan the QR code and confirm the prompt to connect."
        }
      }
    },

    "desig": {
      "extension": {
        "step1": {
          "title": "Install the Desig extension",
          "description": "We recommend pinning Desig to your taskbar for easier access to your wallet."
        },
        "step2": {
          "title": "Create a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      }
    },

    "subwallet": {
      "extension": {
        "step1": {
          "title": "Install the SubWallet extension",
          "description": "We recommend pinning SubWallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the SubWallet app",
          "description": "We recommend putting SubWallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "clv": {
      "extension": {
        "step1": {
          "title": "Install the CLV Wallet extension",
          "description": "We recommend pinning CLV Wallet to your taskbar for quicker access to your wallet."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Refresh your browser",
          "description": "Once you set up your wallet, click below to refresh the browser and load up the extension."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the CLV Wallet app",
          "description": "We recommend putting CLV Wallet on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or Import a Wallet",
          "description": "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "okto": {
      "qr_code": {
        "step1": {
          "title": "Open the Okto app",
          "description": "Add Okto to your home screen for quick access"
        },
        "step2": {
          "title": "Create an MPC Wallet",
          "description": "Create an account and generate a wallet"
        },
        "step3": {
          "title": "Tap WalletConnect in Settings",
          "description": "Tap the Scan QR icon at the top right and confirm the prompt to connect."
        }
      }
    },

    "ledger": {
      "desktop": {
        "step1": {
          "title": "Open the Ledger Live app",
          "description": "We recommend putting Ledger Live on your home screen for quicker access."
        },
        "step2": {
          "title": "Set up your Ledger",
          "description": "Set up a new Ledger or connect to an existing one."
        },
        "step3": {
          "title": "Connect",
          "description": "A connection prompt will appear for you to connect your wallet."
        }
      },
      "qr_code": {
        "step1": {
          "title": "Open the Ledger Live app",
          "description": "We recommend putting Ledger Live on your home screen for quicker access."
        },
        "step2": {
          "title": "Set up your Ledger",
          "description": "You can either sync with the desktop app or connect your Ledger."
        },
        "step3": {
          "title": "Scan the code",
          "description": "Tap WalletConnect then Switch to Scanner. After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    },

    "valora": {
      "qr_code": {
        "step1": {
          "title": "Open the Valora app",
          "description": "We recommend putting Valora on your home screen for quicker access."
        },
        "step2": {
          "title": "Create or import a wallet",
          "description": "Create a new wallet or import an existing one."
        },
        "step3": {
          "title": "Tap the scan button",
          "description": "After you scan, a connection prompt will appear for you to connect your wallet."
        }
      }
    }
  }
}
`},54192:function(e,t,o){"use strict";o.d(t,{J:function(){return readContracts}});var n=o(18758),i=o(91716),a=o(20422);async function multicall_multicall(e,t){let{allowFailure:o=!0,chainId:n,contracts:s,...l}=t,c=e.getClient({chainId:n}),u=(0,a.s)(c,i.A,"multicall");return u({allowFailure:o,contracts:s,...l})}var s=o(14729);async function readContracts(e,t){let{allowFailure:o=!0,blockNumber:i,blockTag:l,...c}=t,u=t.contracts;try{let t={};for(let[o,n]of u.entries()){let i=n.chainId??e.state.chainId;t[i]||(t[i]=[]),t[i]?.push({contract:n,index:o})}let n=(await Promise.all(Object.entries(t).map(([t,n])=>multicall_multicall(e,{...c,allowFailure:o,blockNumber:i,blockTag:l,chainId:Number.parseInt(t,10),contracts:n.map(({contract:e})=>e)})))).flat(),a=Object.values(t).flatMap(e=>e.map(({index:e})=>e));return n.reduce((e,t,o)=>(e&&(e[a[o]]=t),e),[])}catch(t){if(t instanceof n.uq)throw t;let promises=()=>u.map(t=>(function(e,t){let{chainId:o,...n}=t,i=e.getClient({chainId:o}),l=(0,a.s)(i,s.L,"readContract");return l(n)})(e,{...t,blockNumber:i,blockTag:l}));if(o)return(await Promise.allSettled(promises())).map(e=>"fulfilled"===e.status?{result:e.value,status:"success"}:{error:e.reason,result:void 0,status:"failure"});return await Promise.all(promises())}}},20422:function(e,t,o){"use strict";function getAction(e,t,o){let n=e[t.name];if("function"==typeof n)return n;let i=e[o];return"function"==typeof i?i:o=>t(e,o)}o.d(t,{s:function(){return getAction}})},62856:function(e,t,o){"use strict";t.Z=function(){for(var e,t,o=0,n="",i=arguments.length;o<i;o++)(e=arguments[o])&&(t=function r(e){var t,o,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(o=r(e[t]))&&(n&&(n+=" "),n+=o)}else for(o in e)e[o]&&(n&&(n+=" "),n+=o)}return n}(e))&&(n&&(n+=" "),n+=t);return n}},31319:function(e,t,o){"use strict";let n,i,a,s,l,c,u,p,d,f,h,w,A,g,m;o.d(t,{F:function(){return normalize_normalize}});let y=new Map([[8217,"apostrophe"],[8260,"fraction slash"],[12539,"middle dot"]]);function read_compressed_payload(e){var t;let o;return t=function(e){let t=0;function u16(){return e[t++]<<8|e[t++]}let o=u16(),n=1,i=[0,1];for(let e=1;e<o;e++)i.push(n+=u16());let a=u16(),s=t;t+=a;let l=0,c=0;function read_bit(){return 0==l&&(c=c<<8|e[t++],l=8),c>>--l&1}let u=2147483648-1,p=0;for(let e=0;e<31;e++)p=p<<1|read_bit();let d=[],f=0,h=2147483648;for(;;){let e=Math.floor(((p-f+1)*n-1)/h),t=0,a=o;for(;a-t>1;){let o=t+a>>>1;e<i[o]?a=o:t=o}if(0==t)break;d.push(t);let s=f+Math.floor(h*i[t]/n),l=f+Math.floor(h*i[t+1]/n)-1;for(;((s^l)&1073741824)==0;)p=p<<1&u|read_bit(),s=s<<1&u,l=l<<1&u|1;for(;s&~l&536870912;)p=1073741824&p|p<<1&u>>>1|read_bit(),s=s<<1^1073741824,l=(1073741824^l)<<1|1073741825;f=s,h=1+l-s}let w=o-4;return d.map(t=>{switch(t-w){case 3:return w+65792+(e[s++]<<16|e[s++]<<8|e[s++]);case 2:return w+256+(e[s++]<<8|e[s++]);case 1:return w+e[s++];default:return t-1}})}(function(e){let t=[];[..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((e,o)=>t[e.charCodeAt(0)]=o);let o=e.length,n=new Uint8Array(6*o>>3);for(let i=0,a=0,s=0,l=0;i<o;i++)l=l<<6|t[e.charCodeAt(i)],(s+=6)>=8&&(n[a++]=l>>(s-=8));return n}(e)),o=0,()=>t[o++]}function read_sorted(e,t=0){let o=[];for(;;){let n=e(),i=e();if(!i)break;t+=n;for(let e=0;e<i;e++)o.push(t+e);t+=i+1}return o}function read_sorted_arrays(e){return read_array_while(()=>{let t=read_sorted(e);if(t.length)return t})}function read_mapped(e){let t=[];for(;;){let o=e();if(0==o)break;t.push(function(e,t){let o=1+t(),n=t(),i=read_array_while(t);return read_transposed(i.length,1+e,t).flatMap((e,t)=>{let[a,...s]=e;return Array(i[t]).fill().map((e,t)=>{let i=t*n;return[a+t*o,s.map(e=>e+i)]})})}(o,e))}for(;;){let o=e()-1;if(o<0)break;t.push(read_transposed(1+e(),1+o,e).map(e=>[e[0],e.slice(1)]))}return t.flat()}function read_array_while(e){let t=[];for(;;){let o=e(t.length);if(!o)break;t.push(o)}return t}function read_transposed(e,t,o){let n=Array(e).fill().map(()=>[]);for(let i=0;i<t;i++)(function(e,t){let o=Array(e);for(let i=0,a=0;i<e;i++){var n;o[i]=a+=1&(n=t())?~n>>1:n>>1}return o})(e,o).forEach((e,t)=>n[t].push(e));return n}function quote_cp(e){return`{${e.toString(16).toUpperCase().padStart(2,"0")}}`}function str_from_cps(e){let t=e.length;if(t<4096)return String.fromCodePoint(...e);let o=[];for(let n=0;n<t;)o.push(String.fromCodePoint(...e.slice(n,n+=4096)));return o.join("")}function compare_arrays(e,t){let o=e.length,n=o-t.length;for(let i=0;0==n&&i<o;i++)n=e[i]-t[i];return n}function unpack_cc(e){return e>>24&255}function unpack_cp(e){return 16777215&e}function is_hangul(e){return e>=44032&&e<55204}function decomposed(e){n||function(){let e=read_compressed_payload("AEUDVgHLCGMATwDUADIAdAAhADQAFAAtABQAIQAPACcADQASAAoAGAAJABIACQARAAUACwAFAAwABQAQAAMABwAEAAoABQAJAAIACgABAAQAFAALAAIACwABAAIAAQAHAAMAAwAEAAsADAAMAAwACwANAA0AAwAKAAkABAAdAAYAZwDTAeYDMwCxCl8B8xhZAqfoC190UGcThgBurwf7PT09Pb09AjgJum8OjDllxHYUKXAPxzq6tABAxgK8ysUvWAgMPT09PT09PSs6LT2HcgWXWwFLoSMEEEl5RFVMKvO0XQ8ExDdJMnIgPi89uj00MsvBXxEPAGPCDwBnQKoEbwRwBHEEcgRzBHQEdQR2BHcEeAR6BHsEfAR+BIAEgfndBQoBYgULAWIFDAFiBNcE2ATZBRAFEQUvBdALFAsVDPcNBw13DYcOMA4xDjMB4BllHI0B2grbAMDpHLkQ7QHVAPRNQQFnGRUEg0yEB2uaJF8AJpIBpob5AERSMAKNoAXqaQLUBMCzEiC+AZ4EWRJJFbEu7QDQLARtEbgECxDwAb/RyAk1AV4nD2cEQQKTAzsAGpobWgAahAGPCrysdy0OAKwAfFIcBAQFUmoA/PtZADkBIadVj2UMUgx5Il4ANQC9vAITAdQZWxDzALN9AhsZVwIcGSkCBAgXOhG7AqMZ4M7+1M0UAPDNAWsC+mcJDe8AAQA99zkEXLICyQozAo6lAobcP5JvjQLFzwKD9gU/OD8FEQCtEQL6bW+nAKUEvzjDHsuRyUvOFHcacUz5AqIFRSE2kzsBEQCuaQL5DQTlcgO6twSpTiUgCwIFCAUXBHQEqQV6swAVxUlmTmsCwjqsP/wKJQmXb793UgZBEBsnpRD3DDMBtQE7De1L2ATxBjsEyR99GRkPzZWcCKUt3QztJuMuoYBaI/UqgwXtS/Q83QtNUWgPWQtlCeM6Y4FOAyEBDSKLCt0NOQhtEPMKyWsN5RFFBzkD1UmaAKUHAQsRHTUVtSYQYqwLCTl3Bvsa9guPJq8TKXr8BdMaIQZNASka/wDPLueFsFoxXBxPXwYDCyUjxxSoUCANJUC3eEgaGwcVJakCkUNwSodRNh6TIfY8PQ1mLhNRfAf1PAUZTwuBPJ5Gq0UOEdI+jT1IIklMLAQ1fywvJ4sJzw+FDLl8cgFZCSEJsQxxEzERFzfFCDkHGS2XJCcVCCFGlWCaBPefA/MT0QMLBT8JQQcTA7UcLRMuFSkFDYEk1wLzNtUuswKPVoABFwXLDyUf3xBQR+AO6QibAmUDgyXrAC0VIQAXIpsIQ2MAX4/YUwUuywjHamwjdANnFOdhEXMHkQ5XB6ccMxW/HOFwyF4Lhggoo68JWwF1CZkBXwTjCAk1W4ygIEFnU4tYGJsgYUE/XfwCMQxlFZ9EvYd4AosPaxIbATUBcwc5DQECdxHtEWsQlQjrhgQ1tTP4OiUETyGDIBEKJwNPbM4LJyb5DPhpAaMSYgMMND137merYLYkF/0HGTLFQWAh8QuST80MnBrBGEJULhnkB78D8xrzJ+pBVwX/A6MDEzpNM+4EvQtpCIsJPwBJDqMXB9cYagpxjNABMYsBt5kDV5GDAm+PBjcHCwBnC4cFeeUAHQKnCKMABQDPA1cAOQKtB50AGQCFQQE9AycvASHlAo8DkwgxywGVLwHzKQQbwwwVAPc3bkoCw7ECgGpmogXdWAKOAkk1AU0lBAVOR1EDr3HhANsASwYT30cBFatKyxrjQwHfbysAxwD7AAU1BwVBAc0B820AtwFfCzEJorO1AU3pKQCDABVrAdcCiQDdADUAf/EBUwBNBVn5BdMCT0kBETEYK1dhAbsDHwEzAQ0AeQbLjaXJBx8EbQfTAhAbFeEC7y4HtQEDIt8TzULFAr3eVaFgAmSBAmJCW02vWzcgAqH3AmiYAmYJAp+EOBsLAmY7AmYmBG4EfwN/EwN+kjkGOXcXOYI6IyMCbB0CMjY4CgJtxwJtru+KM2dFKwFnAN4A4QBKBQeYDI0A/gvCAA21AncvAnaiPwJ5S0MCeLodXNtFrkbXAnw/AnrIAn0JAnzwBVkFIEgASH1jJAKBbQKAAAKABQJ/rklYSlsVF0rMAtEBAtDMSycDiE8Dh+ZExZEyAvKhXQMDA65LzkwtJQPPTUxNrwKLPwKK2MEbBx1DZwW3Ao43Ao5cQJeBAo7ZAo5ceFG0UzUKUtRUhQKT+wKTDADpABxVHlWvVdAGLBsplYYy4XhmRTs5ApefAu+yWCGoAFklApaPApZ8nACpWaxaCYFNADsClrUClk5cRFzRApnLAplkXMpdBxkCnJs5wjqdApwWAp+bAp64igAdDzEqDwKd8QKekgC1PWE0Ye8CntMCoG4BqQKenx8Cnk6lY8hkJyUrAievAiZ+AqD7AqBMAqLdAqHEAqYvAqXOAqf/AH0Cp/JofGixAANJahxq0QKs4wKsrgKtZwKtAgJXHQJV3AKx4dcDH05slwKyvQ0CsugXbOBtY21IXwMlzQK2XDs/bpADKUUCuF4CuUcVArkqd3A2cOECvRkCu9pwlgMyEQK+iHICAzNxAr4acyJzTwLDywLDBHOCdEs1RXTgAzynAzyaAz2/AsV8AsZHAsYQiQLIaVECyEQCyU8CyS4CZJ0C3dJ4eWF4rnklS9ADGKNnAgJh9BnzlSR7C16SXrsRAs9rAs9sL0tT0vMTnwDGrQLPcwEp6gNOEn5LBQLcJwLbigLSTwNSXANTXwEBA1WMgIk/AMsW7WBFghyC04LOg40C2scC2d6EEIRJpzwDhqUALwNkDoZxWfkAVQLfZQLeuHN3AuIv7RQB8zAnAfSbAfLShwLr8wLpcHkC6vkC6uQA+UcBuQLuiQLrnJaqlwMC7j8DheCYeXDgcaEC8wMAaQOOFpmTAvcTA5FuA5KHAveYAvnZAvhmmhyaq7s3mx4DnYMC/voBGwA5nxyfswMFjQOmagOm2QDRxQMGaqGIogUJAwxJAtQAPwMA4UEXUwER8wNrB5dnBQCTLSu3r73bAYmZFH8RBDkB+ykFIQ6dCZ8Akv0TtRQrxQL3LScApQC3BbmOkRc/xqdtQS4UJo0uAUMBgPwBtSYAdQMOBG0ALAIWDKEAAAoCPQJqA90DfgSRASBFBSF8CgAFAEQAEwA2EgJ3AQAF1QNr7wrFAgD3Cp8nv7G35QGRIUFCAekUfxE0wIkABAAbAFoCRQKEiwAGOlM6lI1tALg6jzrQAI04wTrcAKUA6ADLATqBOjs5/Dn5O3aJOls7nok6bzkYAVYBMwFsBS81XTWeNa01ZjV1NbY1xTWCNZE10jXhNZ41rTXuNf01sjXBNgI2ETXGNdU2FjYnNd417TYuNj02LjUtITY6Nj02PDbJNwgEkDxXNjg23TcgNw82yiA3iTcwCgSwPGc2JDcZN2w6jTchQtRDB0LgQwscDw8JmyhtKFFVBgDpfwDpsAD+mxQ91wLpNSMArQC9BbeOkRdLxptzBL8MDAMMAQgDAAkKCwsLCQoGBAVVBI/DvwDz9b29kaUCb0QtsRTNLt4eGBcSHAMZFhYZEhYEARAEBUEcQRxBHEEcQRxBHEEaQRxBHEFCSTxBPElISUhBNkM2QTYbNklISVmBVIgELgEaJZkC7aMAoQCjBcGOmxdNxrsBvwGJAaQcEZ0ePCklMAAhMvAIMAL54gC7Bm8EescjzQMpARQpKgDUHqSvAj5Gqwr7YrMUACT9AN3rlr3JG9m8w9lIAXltp/v8kfWaIaaR9OwpAES/I3ZVamDXSgB/UsOgAG6D0tq+5CIqE15FiAhV3yA2VhCQ7tj+m6xXaF53FIfGi/IAZIskMGAi2MU7MDVJNCbMzERyHZi+osdPtnFVbvq653O8rwaCy4IAf9OOok65AqJUtUriUfYsGPPVbe6jm0s9lbKlPCUKjdkHsFsEhvX4kT39ZCtAAbwQdn/h4TpO5hTByWAmr5n+Wuwhdegv6bmvX4LyOes3z2+cuHv2JFYwVMNuq2gzn8YHTjlUQd39osyWei4NKl3LAdfxlO876hh5ENp/cOvpuI9bF55guEthLLPOXjD4dktTH04P5TvZrWTM0e4+BHJxj7MLApXIFOs0sWKhNkG8iwuM5wR83my6V3wW06abhDzTXYfOr/ZpFXgXzmv4d12FFyP00/dPGbIVGV5ao8UufGzUwp/IHx6v/wDWJr9iaoCulhWwlZ7A8q/NMoD12+mBdNRgJYnThRLtMx1Bgwttn8/4Qn2CDfOSup9GVXEvA21ILgp0owHYxNOkpwLWz0G7K+WREIDjIzUzSn8I99CuJSmSpPyH0Ke6/NERYiNx+3dncSebPnOUnnWD61AhJ1n/tSLZmU5wYO5GfgzyAYJm6VL91LxZ8hL1lfximQxIDMRhIecQZBmeE5R0XlrpvwplVrJwpa8BBCdp93GPP9lyBeZ2zkRr920CR3cYbKpKHfogvm0nV7XdDz6EbjzlxADCMjSLXuXpIpyuizy39yY+I+H9rmpoIF3YwEjlH9MgGgWcCNTjHEWMqAbprn2Ox7rOHupaVE3lNyg3nt5XaZID6Y+uml5Ja+aOPu+BI+DZbiJVfaspUadakWUX6TA4dETkIqdJJHYnU4Z4yKpt5y8rVIahoMUf8A8kWtAQNCTbjp71gx3/zVdqNz1Sutkw0gFIMVm2BF4Xdv/0olw+NaDIR9Bb3DPweZA2K/cw+/b+AwyWl9ZOP67A9nexmeTNjfdzPGf9J6E6BMPKa5lJh+qNsdUz3HBUevU71eQFCqOcxiIYhacAhh/8PX0J5DdSViZ6WazDDx7cukJNpMfEkYLJ5Ao4vLoVd3d25Pg4qaVa2p2D2L3WvYPJ5Yf/A/MSxptjlgXL/KJtP2U0cRv2I09ATAiWCJYuRwiapeKFsqmi18yMMulDp3HdcIldq+7jkwsJUOHLHCzzzBw5XFvL0CAmo1ub456z7zb7shk3KPGCLZzr47oT1k/j06XNnJvG3Udv6XrP+wsqTBlZ5MaNPt9FOs/4Bt/ja/vbVhTNpBFl9Gq7MqINvGlWKOAwQzwOZy+EzSdjAqKJVV2YcskTuM94aIK+kc/AZaXiZLPREUDpkXIV947IFfj+85TrqPqLfkGcxgboMQjosf+az+odLNXdyp1mDNGsqSdK/pJ2Ca04mt/4d6s1X+lncOEYaGBBeW4pApGcjf7/XJCFbj3N3mFb+BtlIcw8ZiDKoClFX9Rf0bxCqtLpicObKJzBVVHr/6u4siH2hK75RNv7w9GfTbhJOQBYiFUZAByY4rn37tZBHT//kqKsNi3ryL9AqXJRzqiMIJMhILjoi/i8LVEsbu+Ih9bsyW16sgQqjYLO0qda6KaCPKj3DQcu6CfV5lKtjS3ZCdqLAZkOey9MR+QutJBGiz/r15GVD6rCVwJR4UUKC4GNJkfDf00OMW8aQtLSAGLXV8MIi9mbbl/qQEpxCm2L5hutFX4ekeLH4QgBWUFKs/2VVMKy46WtFE6AbwgmYm/Z0yHk5veDIrcl2HpVqb/rSE0PC9EbDzJEWqeaPhh7vF369Umq2kSiB3s5rBI6c/7N9bkRu4h2n+/h5nSwy+7n+/I+6oXQVANo2Jb5zDwtiBPf1ySCzHdT6yJShMzqSRZfnykX49CaFaxhoVF4PBhEuECJ1PrFYSpmHuyYsl14DTAV9ZxRms1XiR/kBrjhZjidOt0UNe+GSml7XNgpVw8YsUTmZXLTK+6iYnyW/wYR1W4UXwOi14xpFROHb6HcZzksgF5DbL2AFXzKNwHU2adjdAY+KCyM/cwRTBkkq/a227NI0q6DR2MkMCRu620t79bGcYUmACtqN3mk/0uNwd3JSXHqE1kzf6Yyj0W2083JNDRnIXDlgBxJ6uf58NN1f6FQiRCWB4egF8QDx74AixV8oTyw7PluIjr3/rj/WzgwPSq4xPojaF7V0xqG2u5ti2L1h6yYHv73Isrukr0kURDIEjClBsBx7kdcXUxaYMS0syT3ymLzDzslNDWQOT1Tao1YNmJHARUenhCkmV9tqCPGI5GqZaRpkiPxyjoncWjyOHYGqvbvRX+Bn1pn7EhRNXa1lqJPmoeN5VqdqIDPhEVhFsyG0d4iQEIYX0wZUbY2XbZWYlpZ/l66IrDDY0q1C1YzBDpHC4h05YqHQLqS9anyl22JQ6lEvjvdBwMHfE7z0luCXD34/rFeDa2TmSeEAykSpYO5j1G/nsgpR3qn0qaQEmLjnnLfcz+veoYqPnRqmRGwCJ6FJ3Gm/Z1/aVX5PSb03MMnjAf41ww54sD5k8FrkfBP+K0b1MrYpapWjtpZfve2HVf4ickX3LKSOhu7qI1Vd4c1kNrn2ajy1t4y93JhV4fnWCKq7OmFpcr7FjdJCXPTql0Drr14Ho3Z87+GPQ4Z/DcTiGqtvZxlRYi8cNuhXABveZIwNl/BX1huhVLaFax5OqypUrQRyb9OE3SSkPlDdy5uo5XGg2EIGEjLY1MO5cr1ibfiFWV7zspcTgkBKkwo5jPyAin04LqizZXb2tDRgwKJjGx4cVk3ngAQixwcxjYAg2Q7vmUR/hpwInMdw7OhC2qyf41vTPkudQAORS0DdLtOGQxb4fH2VYGsvJCkeWPeUwtf1/tuIhzXEThoCZzzSJqqjUtbaPI3ntHm3T5uf849hGUA0zU8ni5W+EEn3/0Y6oUhQFw9z0aGjkljBbAlFXc0y82G2wkd7VdgWa5KTgJJNjNwZMfmdnUIUn1JU5LiWX5UZEZbVlKSN76mlmjUR2ku+fucTNlO4IAAahnLjBhlvQNR9pe9swGBgq0YR7P3VCyI/seYwQ4QBzy9X+HPePgoF8WfKaJ4MBOhLCGHae6Z8xkNXwni9QAKvTNtVA56x8YJflZ/VvONRSlsSLmiSyNMnTjTaE1ko81zkzGEnVwEhjCzlwIqpxmpDAqwsEmtpdr3xpc7i/ZX3f2TzT3M0FdxIEQvO1jgmmiN+D1YpMduAzEhBtj2OBkMN/rv6p7Th4pSH6f5aH3aTvwFTl7EOSgGASI7ttyMehzpm4AVyK+bFEaFg9gnZsSUPpsbAe/0RFhrH+EXZ12Z7thf4dzN1+Sn+G8QrDA1VKaN4IFxD1rQz9Xq9Coii9S9/hPbTGjyBwFH3H1UdQuz5KsgPDEHua4/kPg2Gp/IIItsaLWBqiT9XH45MiQxSosGJ56H/0F2cjcCFd72l1665RNHURdC3lspI77esfJsl+rXXabkAy7vxDXG/XGGcKpwiKDPFfvMEgjkAHil4Za1F36RnyxxvdIAzvgfH8knukYDck07tc++DP4TdWeI7HXuq5Yl6VVFrUQtf64/dkXewlKZSHQo6YvCSpREB0GDrz+Ys2GfO8nw2SwrYwaf88AifzlPvP17bf1mI3AuccJvAjZIpBmqvharKFAebEjVKfGAwpQjWoXlm9LROsq9bCk1UeQ3CJxJqprzssS/Q04JeS1ReCCubL3J7sx86spkP4eNpp95UF+8K748icIs8vdILFklk9skQqi1So6cx3X906pvy1vz+KipTJ8fiVJxsV5MmT0XwA");for(let[t,o]of(n=new Map(read_sorted_arrays(e).flatMap((e,t)=>e.map(e=>[e,t+1<<24]))),i=new Set(read_sorted(e)),a=new Map,s=new Map,read_mapped(e))){if(!i.has(t)&&2==o.length){let[e,n]=o,i=s.get(e);i||(i=new Map,s.set(e,i)),i.set(n,t)}a.set(t,o.reverse())}}();let t=[],o=[],l=!1;function add(e){let o=n.get(e);o&&(l=!0,e|=o),t.push(e)}for(let n of e)for(;;){if(n<128)t.push(n);else if(is_hangul(n)){let e=n-44032,t=e/588|0,o=e%588/28|0,i=e%28;add(4352+t),add(4449+o),i>0&&add(4519+i)}else{let e=a.get(n);e?o.push(...e):add(n)}if(!o.length)break;n=o.pop()}if(l&&t.length>1){let e=unpack_cc(t[0]);for(let o=1;o<t.length;o++){let n=unpack_cc(t[o]);if(0==n||e<=n){e=n;continue}let i=o-1;for(;;){let o=t[i+1];if(t[i+1]=t[i],t[i]=o,!i||(e=unpack_cc(t[--i]))<=n)break}e=unpack_cc(t[o])}}return t}function nfc(e){return function(e){let t=[],o=[],n=-1,i=0;for(let a of e){let e=unpack_cc(a),l=unpack_cp(a);if(-1==n)0==e?n=l:t.push(l);else if(i>0&&i>=e)0==e?(t.push(n,...o),o.length=0,n=l):o.push(l),i=e;else{let a=function(e,t){if(e>=4352&&e<4371&&t>=4449&&t<4470)return 44032+(e-4352)*588+(t-4449)*28;if(is_hangul(e)&&t>4519&&t<4547&&(e-44032)%28==0)return e+(t-4519);{let o=s.get(e);return o&&(o=o.get(t))?o:-1}}(n,l);a>=0?n=a:0==i&&0==e?(t.push(n),n=l):(o.push(l),i=e)}}return n>=0&&t.push(n,...o),t}(decomposed(e))}let Array_from=e=>Array.from(e);function group_has_cp(e,t){return e.P.has(t)||e.Q.has(t)}let Emoji=class Emoji extends Array{get is_emoji(){return!0}};function init(){let e,t;if(l)return;let o=read_compressed_payload("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"),read_sorted_array=()=>read_sorted(o),read_sorted_set=()=>new Set(read_sorted_array()),set_add_many=(e,t)=>t.forEach(t=>e.add(t));l=new Map(read_mapped(o)),c=read_sorted_set(),u=read_sorted_array(),p=new Set(read_sorted_array().map(e=>u[e])),u=new Set(u),d=read_sorted_set(),read_sorted_set();let n=read_sorted_arrays(o),i=o(),read_chunked=()=>{let e=new Set;return read_sorted_array().forEach(t=>set_add_many(e,n[t])),set_add_many(e,read_sorted_array()),e};f=read_array_while(e=>{let t=read_array_while(o).map(e=>e+96);if(t.length){let n=e>=i;return t[0]-=32,t=str_from_cps(t),n&&(t=`Restricted[${t}]`),{N:t,P:read_chunked(),Q:read_chunked(),M:!o(),R:n}}}),h=read_sorted_set(),w=new Map;let a=read_sorted_array().concat(Array_from(h)).sort((e,t)=>e-t);for(let{V:e,M:t}of(a.forEach((e,t)=>{let n=o(),i=a[t]=n?a[t-n]:{V:[],M:new Map};i.V.push(e),h.has(e)||w.set(e,i)}),new Set(w.values()))){let o=[];for(let t of e){let e=f.filter(e=>group_has_cp(e,t)),n=o.find(({G:t})=>e.some(e=>t.has(e)));n||(n={G:new Set,V:[]},o.push(n)),n.V.push(t),set_add_many(n.G,e)}let n=o.flatMap(e=>Array_from(e.G));for(let{G:e,V:i}of o){let o=new Set(n.filter(t=>!e.has(t)));for(let e of i)t.set(e,o)}}A=new Set;let s=new Set,add_to_union=e=>A.has(e)?s.add(e):A.add(e);for(let e of f){for(let t of e.P)add_to_union(t);for(let t of e.Q)add_to_union(t)}for(let e of A)w.has(e)||s.has(e)||w.set(e,1);for(let n of(set_add_many(A,decomposed(A).map(unpack_cp)),g=(e=[],t=read_sorted(o),function expand({S:t,B:o},n,i){if(!(4&t)||i!==n[n.length-1])for(let a of(2&t&&(i=n[n.length-1]),1&t&&e.push(n),o))for(let e of a.Q)expand(a,[...n,e],i)}(function decode(e){return{S:o(),B:read_array_while(()=>{let e=read_sorted(o).map(e=>t[e]);if(e.length)return decode(e)}),Q:e}}([]),[]),e).map(e=>Emoji.from(e)).sort(compare_arrays),m=new Map,g)){let e=[m];for(let t of n){let o=e.map(e=>{let o=e.get(t);return o||(o=new Map,e.set(t,o)),o});65039===t?e.push(...o):e=o}for(let t of e)t.V=n}}function quoted_cp(e){return(should_escape(e)?"":`${bidi_qq(safe_str_from_cps([e]))} `)+quote_cp(e)}function bidi_qq(e){return`"${e}"\u200E`}function safe_str_from_cps(e,t=1/0,o=quote_cp){var n;let i=[];n=e[0],init(),u.has(n)&&i.push("◌"),e.length>t&&(t>>=1,e=[...e.slice(0,t),8230,...e.slice(-t)]);let a=0,s=e.length;for(let t=0;t<s;t++){let n=e[t];should_escape(n)&&(i.push(str_from_cps(e.slice(a,t))),i.push(o(n)),a=t+1)}return i.push(str_from_cps(e.slice(a,s))),i.join("")}function should_escape(e){return init(),d.has(e)}function error_disallowed(e){return Error(`disallowed character: ${quoted_cp(e)}`)}function error_group_member(e,t){let o=quoted_cp(t),n=f.find(e=>e.P.has(t));return n&&(o=`${n.N} ${o}`),Error(`illegal mixture: ${e.N} + ${o}`)}function error_placement(e){return Error(`illegal placement: ${e}`)}function filter_fe0f(e){return e.filter(e=>65039!=e)}function normalize_normalize(e){var t;return(t=function(e,t,o){if(!e)return[];init();let n=0;return e.split(".").map(e=>{let i=function(e){let t=[];for(let o=0,n=e.length;o<n;){let n=e.codePointAt(o);o+=n<65536?1:2,t.push(n)}return t}(e),a={input:i,offset:n};n+=i.length+1;try{let e,n=a.tokens=function(e,t,o){let n=[],i=[];for(e=e.slice().reverse();e.length;){let a=function(e,t){let o,n=m,i=e.length;for(;i&&(n=n.get(e[--i]));){let{V:a}=n;a&&(o=a,t&&t.push(...e.slice(i).reverse()),e.length=i)}return o}(e);if(a)i.length&&(n.push(t(i)),i=[]),n.push(o(a));else{let t=e.pop();if(A.has(t))i.push(t);else{let e=l.get(t);if(e)i.push(...e);else if(!c.has(t))throw error_disallowed(t)}}}return i.length&&n.push(t(i)),n}(i,t,o),s=n.length;if(!s)throw Error("empty label");let d=a.output=n.flat();if(!function(e){for(let t=e.lastIndexOf(95);t>0;)if(95!==e[--t])throw Error("underscore allowed only at start")}(d),!(a.emoji=s>1||n[0].is_emoji)&&d.every(e=>e<128))!function(e){if(e.length>=4&&45==e[2]&&45==e[3])throw Error(`invalid label extension: "${str_from_cps(e.slice(0,4))}"`)}(d),e="ASCII";else{let t=n.flatMap(e=>e.is_emoji?[]:e);if(t.length){if(u.has(d[0]))throw error_placement("leading combining mark");for(let e=1;e<s;e++){let t=n[e];if(!t.is_emoji&&u.has(t[0]))throw error_placement(`emoji + combining mark: "${str_from_cps(n[e-1])} + ${safe_str_from_cps([t[0]])}"`)}!function(e){let t=e[0],o=y.get(t);if(o)throw error_placement(`leading ${o}`);let n=e.length,i=-1;for(let a=1;a<n;a++){t=e[a];let n=y.get(t);if(n){if(i==a)throw error_placement(`${o} + ${n}`);i=a+1,o=n}}if(i==n)throw error_placement(`trailing ${o}`)}(d);let o=Array_from(new Set(t)),[i]=function(e){let t=f;for(let o of e){let e=t.filter(e=>group_has_cp(e,o));if(!e.length){if(f.some(e=>group_has_cp(e,o)))throw error_group_member(t[0],o);throw error_disallowed(o)}if(t=e,1==e.length)break}return t}(o);(function(e,t){for(let o of t)if(!group_has_cp(e,o))throw error_group_member(e,o);if(e.M){let e=decomposed(t).map(unpack_cp);for(let t=1,o=e.length;t<o;t++)if(p.has(e[t])){let n=t+1;for(let i;n<o&&p.has(i=e[n]);n++)for(let o=t;o<n;o++)if(e[o]==i)throw Error(`duplicate non-spacing marks: ${quoted_cp(i)}`);if(n-t>4)throw Error(`excessive non-spacing marks: ${bidi_qq(safe_str_from_cps(e.slice(t-1,n)))} (${n-t}/4)`);t=n}}})(i,t),function(e,t){let o;let n=[];for(let e of t){let t=w.get(e);if(1===t)return;if(t){let n=t.M.get(e);if(!(o=o?o.filter(e=>n.has(e)):Array_from(n)).length)return}else n.push(e)}if(o){for(let t of o)if(n.every(e=>group_has_cp(t,e)))throw Error(`whole-script confusable: ${e.N}/${t.N}`)}}(i,o),e=i.N}else e="Emoji"}a.type=e}catch(e){a.error=e}return a})}(e,nfc,filter_fe0f)).map(({input:e,error:o,output:n})=>{if(o){let n=o.message;throw Error(1==t.length?n:`Invalid label ${bidi_qq(safe_str_from_cps(e,63))}: ${n}`)}return str_from_cps(n)}).join(".")}},31349:function(e,t,o){"use strict";o.d(t,{E:function(){return useAccountEffect}});var n=o(34946),i=o(77317),a=o(66353);function useAccountEffect(e={}){let{onConnect:t,onDisconnect:o}=e,s=(0,a.Z)(e);(0,i.useEffect)(()=>(0,n.u)(s,{onChange(e,n){if(("reconnecting"===n.status||"connecting"===n.status&&void 0===n.address)&&"connected"===e.status){let{address:o,addresses:i,chain:a,chainId:s,connector:l}=e,c="reconnecting"===n.status||void 0===n.status;t?.({address:o,addresses:i,chain:a,chainId:s,connector:l,isReconnected:c})}else"connected"===n.status&&"disconnected"===e.status&&o?.()}}),[s,t,o])}},59532:function(e,t,o){"use strict";o.d(t,{K:function(){return useBalance}});var n=o(83667),i=o(2932),a=o(24313),s=o(71938),l=o(20422),c=o(48901);function getUnit(e){return"number"==typeof e?e:"wei"===e?0:Math.abs(c.Bd[e])}var u=o(54192);async function getBalance_getBalance(e,t){let{address:o,blockNumber:c,blockTag:u,chainId:p,token:d,unit:f="ether"}=t;if(d)try{return await getTokenBalance(e,{balanceAddress:o,chainId:p,symbolType:"string",tokenAddress:d})}catch(t){if("ContractFunctionExecutionError"===t.name){let t=await getTokenBalance(e,{balanceAddress:o,chainId:p,symbolType:"bytes32",tokenAddress:d}),a=(0,n.rR)((0,i.f)(t.symbol,{dir:"right"}));return{...t,symbol:a}}throw t}let h=e.getClient({chainId:p}),w=(0,l.s)(h,s.s,"getBalance"),A=await w(c?{address:o,blockNumber:c}:{address:o,blockTag:u}),g=e.chains.find(e=>e.id===p)??h.chain;return{decimals:g.nativeCurrency.decimals,formatted:(0,a.b)(A,getUnit(f)),symbol:g.nativeCurrency.symbol,value:A}}async function getTokenBalance(e,t){let{balanceAddress:o,chainId:n,symbolType:i,tokenAddress:s,unit:l}=t,c={abi:[{type:"function",name:"balanceOf",stateMutability:"view",inputs:[{type:"address"}],outputs:[{type:"uint256"}]},{type:"function",name:"decimals",stateMutability:"view",inputs:[],outputs:[{type:"uint8"}]},{type:"function",name:"symbol",stateMutability:"view",inputs:[],outputs:[{type:i}]}],address:s},[p,d,f]=await (0,u.J)(e,{allowFailure:!1,contracts:[{...c,functionName:"balanceOf",args:[o],chainId:n},{...c,functionName:"decimals",chainId:n},{...c,functionName:"symbol",chainId:n}]}),h=(0,a.b)(p??"0",getUnit(l??d));return{decimals:d,formatted:h,symbol:f,value:p}}var p=o(50116),d=o(98444),f=o(23887),h=o(66353);function useBalance(e={}){let{address:t,query:o={}}=e,n=(0,h.Z)(e),i=(0,f.x)({config:n}),a=function(e,t={}){return{async queryFn({queryKey:t}){let{address:o,scopeKey:n,...i}=t[1];if(!o)throw Error("address is required");let a=await getBalance_getBalance(e,{...i,address:o});return a??null},queryKey:function(e={}){return["balance",(0,p.OP)(e)]}(t)}}(n,{...e,chainId:e.chainId??i}),s=!!(t&&(o.enabled??!0));return(0,d.aM)({...o,...a,enabled:s})}},11746:function(e,t,o){"use strict";o.d(t,{$:function(){return useConnect}});var n=o(95499),i=o(30597);async function connect(e,t){let o;if((o="function"==typeof t.connector?e._internal.connectors.setup(t.connector):t.connector).uid===e.state.current)throw new i.wi;try{e.setState(e=>({...e,status:"connecting"})),o.emitter.emit("message",{type:"connecting"});let{connector:n,...i}=t,a=await o.connect(i);return o.emitter.off("connect",e._internal.events.connect),o.emitter.on("change",e._internal.events.change),o.emitter.on("disconnect",e._internal.events.disconnect),await e.storage?.setItem("recentConnectorId",o.id),e.setState(e=>({...e,connections:new Map(e.connections).set(o.uid,{accounts:i.withCapabilities?a.accounts.map(e=>"object"==typeof e?e.address:e):a.accounts,chainId:a.chainId,connector:o}),current:o.uid,status:"connected"})),{accounts:i.withCapabilities?a.accounts.map(e=>"object"==typeof e?e:{address:e,capabilities:{}}):a.accounts,chainId:a.chainId}}catch(t){throw e.setState(e=>({...e,status:e.current?"connected":"disconnected"})),t}}var a=o(77317),s=o(66353);let l=[];function getConnectors(e){let t=e.connectors;return l.length===t.length&&l.every((e,o)=>e===t[o])?l:(l=t,t)}function useConnect(e={}){let{mutation:t}=e,o=(0,s.Z)(e),{mutate:i,mutateAsync:l,...c}=(0,n.D)({...t,mutationFn:e=>connect(o,e),mutationKey:["connect"]});return(0,a.useEffect)(()=>o.subscribe(({status:e})=>e,(e,t)=>{"connected"===t&&"disconnected"===e&&c.reset()}),[o,c.reset]),{...c,connect:i,connectAsync:l,connectors:function(e={}){let t=(0,s.Z)(e);return(0,a.useSyncExternalStore)(e=>(function(e,t){let{onChange:o}=t;return e._internal.connectors.subscribe((e,t)=>{o(Object.values(e),t)})})(t,{onChange:e}),()=>getConnectors(t),()=>getConnectors(t))}({config:o})}}},38091:function(e,t,o){"use strict";o.d(t,{q:function(){return useDisconnect}});var n=o(95499);async function disconnect(e,t={}){let o;if(t.connector)o=t.connector;else{let{connections:t,current:n}=e.state,i=t.get(n);o=i?.connector}let n=e.state.connections;o&&(await o.disconnect(),o.emitter.off("change",e._internal.events.change),o.emitter.off("disconnect",e._internal.events.disconnect),o.emitter.on("connect",e._internal.events.connect),n.delete(o.uid)),e.setState(e=>{if(0===n.size)return{...e,connections:new Map,current:null,status:"disconnected"};let t=n.values().next().value;return{...e,connections:new Map(n),current:t.connector.uid}});{let t=e.state.current;if(!t)return;let o=e.state.connections.get(t)?.connector;if(!o)return;await e.storage?.setItem("recentConnectorId",o.id)}}var i=o(66353),a=o(44108);let s=[];function getConnections(e){let t=[...e.state.connections.values()];return"reconnecting"===e.state.status||(0,a.v)(s,t)?s:(s=t,t)}var l=o(77317);function useDisconnect(e={}){let{mutation:t}=e,o=(0,i.Z)(e),{mutate:s,mutateAsync:c,...u}=(0,n.D)({...t,mutationFn:e=>disconnect(o,e),mutationKey:["disconnect"]});return{...u,connectors:(function(e={}){let t=(0,i.Z)(e);return(0,l.useSyncExternalStore)(e=>(function(e,t){let{onChange:o}=t;return e.subscribe(()=>getConnections(e),o,{equalityFn:a.v})})(t,{onChange:e}),()=>getConnections(t),()=>getConnections(t))})({config:o}).map(e=>e.connector),disconnect:s,disconnectAsync:c}}},7558:function(e,t,o){"use strict";o.d(t,{c:function(){return useEnsAvatar}});var n=o(21386),i=o(20422),a=o(50116),s=o(98444),l=o(23887),c=o(66353);function useEnsAvatar(e={}){let{name:t,query:o={}}=e,u=(0,c.Z)(e),p=(0,l.x)({config:u}),d=function(e,t={}){return{async queryFn({queryKey:t}){let{name:o,scopeKey:a,...s}=t[1];if(!o)throw Error("name is required");return function(e,t){let{chainId:o,...a}=t,s=e.getClient({chainId:o}),l=(0,i.s)(s,n.r,"getEnsAvatar");return l(a)}(e,{...s,name:o})},queryKey:function(e={}){return["ensAvatar",(0,a.OP)(e)]}(t)}}(u,{...e,chainId:e.chainId??p}),f=!!(t&&(o.enabled??!0));return(0,s.aM)({...o,...d,enabled:f})}},85742:function(e,t,o){"use strict";o.d(t,{F:function(){return useEnsName}});var n=o(75916),i=o(20422),a=o(50116),s=o(98444),l=o(23887),c=o(66353);function useEnsName(e={}){let{address:t,query:o={}}=e,u=(0,c.Z)(e),p=(0,l.x)({config:u}),d=function(e,t={}){return{async queryFn({queryKey:t}){let{address:o,scopeKey:a,...s}=t[1];if(!o)throw Error("address is required");return function(e,t){let{chainId:o,...a}=t,s=e.getClient({chainId:o}),l=(0,i.s)(s,n.w,"getEnsName");return l(a)}(e,{...s,address:o})},queryKey:function(e={}){return["ensName",(0,a.OP)(e)]}(t)}}(u,{...e,chainId:e.chainId??p}),f=!!(t&&(o.enabled??!0));return(0,s.aM)({...o,...d,enabled:f})}},81356:function(e,t,o){"use strict";o.d(t,{t:function(){return usePublicClient}});var n=o(64218);function getPublicClient(e,t={}){let o=function(e,t={}){try{return e.getClient(t)}catch{return}}(e,t);return o?.extend(n.I)}var i=o(17686),a=o(66353);function usePublicClient(e={}){let t=(0,a.Z)(e);return(0,i.useSyncExternalStoreWithSelector)(e=>(function(e,t){let{onChange:o}=t;return e.subscribe(()=>getPublicClient(e),o,{equalityFn:(e,t)=>e?.uid===t?.uid})})(t,{onChange:e}),()=>getPublicClient(t,e),()=>getPublicClient(t,e),e=>e,(e,t)=>e?.uid===t?.uid)}},41532:function(e,t,o){"use strict";o.d(t,{Q:function(){return useSignMessage}});var n=o(95499),i=o(22331),a=o(20422),s=o(53129);async function signMessage_signMessage(e,t){let o;let{account:n,connector:l,...c}=t;o="object"==typeof n&&"local"===n.type?e.getClient():await (0,s.e)(e,{account:n,connector:l});let u=(0,a.s)(o,i.l,"signMessage");return u({...c,...n?{account:n}:{}})}var l=o(66353);function useSignMessage(e={}){let{mutation:t}=e,o=(0,l.Z)(e),{mutate:i,mutateAsync:a,...s}=(0,n.D)({...t,mutationFn:e=>signMessage_signMessage(o,e),mutationKey:["signMessage"]});return{...s,signMessage:i,signMessageAsync:a}}}}]);