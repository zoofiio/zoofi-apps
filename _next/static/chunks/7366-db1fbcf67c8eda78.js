(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7366],{43771:function(e,t,n){"use strict";function vanilla_extract_private_esm_getVarName(e){var t=e.match(/^var\((.*)\)$/);return t?t[1]:e}function assignInlineVars(e,t){var n={};if("object"==typeof t)!function vanilla_extract_private_esm_walkObject(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],o={};for(var i in e){var a=e[i],s=[...n,i];"string"==typeof a||"number"==typeof a||null==a?o[i]=t(a,s):"object"!=typeof a||Array.isArray(a)?console.warn('Skipping invalid key "'.concat(s.join("."),'". Should be a string, number, null or object. Received: "').concat(Array.isArray(a)?"Array":typeof a,'"')):o[i]=vanilla_extract_private_esm_walkObject(a,t,s)}return o}(t,(t,o)=>{null!=t&&(n[vanilla_extract_private_esm_getVarName(function(e,t){var n=e;for(var o of t){if(!(o in n))throw Error("Path ".concat(t.join(" -> ")," does not exist in object"));n=n[o]}return n}(e,o))]=String(t))});else for(var o in e){var i=e[o];null!=i&&(n[vanilla_extract_private_esm_getVarName(o)]=i)}return Object.defineProperty(n,"toString",{value:function(){return Object.keys(this).map(e=>"".concat(e,":").concat(this[e])).join(";")},writable:!1}),n}n.d(t,{L:function(){return assignInlineVars}})},34516:function(e,t,n){"use strict";function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach(function(t){!function(e,t,n){var o;(t="symbol"==typeof(o=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,t||"default");if("object"!=typeof o)return o;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?o:String(o))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}n.d(t,{$:function(){return createSprinkles}});var createSprinkles_74286718_esm_createSprinkles=e=>function(){for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];var i=Object.assign({},...n.map(e=>e.styles)),a=Object.keys(i),s=a.filter(e=>"mappings"in i[e]);return Object.assign(t=>{var n=[],o={},a=_objectSpread2({},t),c=!1;for(var l of s){var u=t[l];if(null!=u)for(var p of(c=!0,i[l].mappings))o[p]=u,null==a[p]&&delete a[p]}var d=c?_objectSpread2(_objectSpread2({},o),a):t;for(var f in d)if(function(){var e=d[f],t=i[f];try{if(t.mappings)return 1;if("string"==typeof e||"number"==typeof e)n.push(t.values[e].defaultClass);else if(Array.isArray(e))for(var o=0;o<e.length;o++){var a=e[o];if(null!=a){var s=t.responsiveArray[o];n.push(t.values[a].conditions[s])}}else for(var c in e){var l=e[c];null!=l&&n.push(t.values[l].conditions[c])}}catch(e){throw e}}())continue;return e(n.join(" "))},{properties:new Set(a)})},composeStyles=e=>e,createSprinkles=function(){return createSprinkles_74286718_esm_createSprinkles(composeStyles)(...arguments)}},62151:function(e,t,n){"use strict";n.d(t,{d:function(){return createMapValueFn},M:function(){return createNormalizeValueFn}});var addRecipe=function(e,t){return Object.defineProperty(e,"__recipe__",{value:t,writable:!1}),e};function createNormalizeValueFn(e){var{conditions:t}=e;if(!t)throw Error("Styles have no conditions");return addRecipe(function(e){if("string"==typeof e||"number"==typeof e||"boolean"==typeof e){if(!t.defaultCondition)throw Error("No default condition");return{[t.defaultCondition]:e}}if(Array.isArray(e)){if(!("responsiveArray"in t))throw Error("Responsive arrays are not supported");var n={};for(var o in t.responsiveArray)null!=e[o]&&(n[t.responsiveArray[o]]=e[o]);return n}return e},{importPath:"@vanilla-extract/sprinkles/createUtils",importName:"createNormalizeValueFn",args:[{conditions:e.conditions}]})}function createMapValueFn(e){var{conditions:t}=e;if(!t)throw Error("Styles have no conditions");var n=createNormalizeValueFn(e);return addRecipe(function(e,o){if("string"==typeof e||"number"==typeof e||"boolean"==typeof e){if(!t.defaultCondition)throw Error("No default condition");return o(e,t.defaultCondition)}var i=Array.isArray(e)?n(e):e,a={};for(var s in i)null!=i[s]&&(a[s]=o(i[s],s));return a},{importPath:"@vanilla-extract/sprinkles/createUtils",importName:"createMapValueFn",args:[{conditions:e.conditions}]})}},13526:function(e){"use strict";var t={single_source_shortest_paths:function(e,n,o){var i,a,s,c,l,u,p,d={},f={};f[n]=0;var h=t.PriorityQueue.make();for(h.push(n,0);!h.empty();)for(s in a=(i=h.pop()).value,c=i.cost,l=e[a]||{})l.hasOwnProperty(s)&&(u=c+l[s],p=f[s],(void 0===f[s]||p>u)&&(f[s]=u,h.push(s,u),d[s]=a));if(void 0!==o&&void 0===f[o])throw Error(["Could not find a path from ",n," to ",o,"."].join(""));return d},extract_shortest_path_from_predecessor_list:function(e,t){for(var n=[],o=t;o;)n.push(o),e[o],o=e[o];return n.reverse(),n},find_path:function(e,n,o){var i=t.single_source_shortest_paths(e,n,o);return t.extract_shortest_path_from_predecessor_list(i,o)},PriorityQueue:{make:function(e){var n,o=t.PriorityQueue,i={};for(n in e=e||{},o)o.hasOwnProperty(n)&&(i[n]=o[n]);return i.queue=[],i.sorter=e.sorter||o.default_sorter,i},default_sorter:function(e,t){return e.cost-t.cost},push:function(e,t){this.queue.push({value:e,cost:t}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};e.exports=t},13318:function(e,t,n){let o=n(64218),i=n(12235),a=n(53113),s=n(70835);function renderCanvas(e,t,n,a,s){let c=[].slice.call(arguments,1),l=c.length,u="function"==typeof c[l-1];if(!u&&!o())throw Error("Callback required as last argument");if(u){if(l<2)throw Error("Too few arguments provided");2===l?(s=n,n=t,t=a=void 0):3===l&&(t.getContext&&void 0===s?(s=a,a=void 0):(s=a,a=n,n=t,t=void 0))}else{if(l<1)throw Error("Too few arguments provided");return 1===l?(n=t,t=a=void 0):2!==l||t.getContext||(a=n,n=t,t=void 0),new Promise(function(o,s){try{let s=i.create(n,a);o(e(s,t,a))}catch(e){s(e)}})}try{let o=i.create(n,a);s(null,e(o,t,a))}catch(e){s(e)}}t.create=i.create,t.toCanvas=renderCanvas.bind(null,a.render),t.toDataURL=renderCanvas.bind(null,a.renderToDataURL),t.toString=renderCanvas.bind(null,function(e,t,n){return s.render(e,n)})},64218:function(e){e.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},41167:function(e,t,n){let o=n(75919).getSymbolSize;t.getRowColCoords=function(e){if(1===e)return[];let t=Math.floor(e/7)+2,n=o(e),i=145===n?26:2*Math.ceil((n-13)/(2*t-2)),a=[n-7];for(let e=1;e<t-1;e++)a[e]=a[e-1]-i;return a.push(6),a.reverse()},t.getPositions=function(e){let n=[],o=t.getRowColCoords(e),i=o.length;for(let e=0;e<i;e++)for(let t=0;t<i;t++)(0!==e||0!==t)&&(0!==e||t!==i-1)&&(e!==i-1||0!==t)&&n.push([o[e],o[t]]);return n}},1983:function(e,t,n){let o=n(34672),i=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function AlphanumericData(e){this.mode=o.ALPHANUMERIC,this.data=e}AlphanumericData.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)},AlphanumericData.prototype.getLength=function(){return this.data.length},AlphanumericData.prototype.getBitsLength=function(){return AlphanumericData.getBitsLength(this.data.length)},AlphanumericData.prototype.write=function(e){let t;for(t=0;t+2<=this.data.length;t+=2){let n=45*i.indexOf(this.data[t]);n+=i.indexOf(this.data[t+1]),e.put(n,11)}this.data.length%2&&e.put(i.indexOf(this.data[t]),6)},e.exports=AlphanumericData},50943:function(e){function BitBuffer(){this.buffer=[],this.length=0}BitBuffer.prototype={get:function(e){return(this.buffer[Math.floor(e/8)]>>>7-e%8&1)==1},put:function(e,t){for(let n=0;n<t;n++)this.putBit((e>>>t-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(e){let t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}},e.exports=BitBuffer},49281:function(e){function BitMatrix(e){if(!e||e<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}BitMatrix.prototype.set=function(e,t,n,o){let i=e*this.size+t;this.data[i]=n,o&&(this.reservedBit[i]=!0)},BitMatrix.prototype.get=function(e,t){return this.data[e*this.size+t]},BitMatrix.prototype.xor=function(e,t,n){this.data[e*this.size+t]^=n},BitMatrix.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]},e.exports=BitMatrix},57537:function(e,t,n){let o=n(34672);function ByteData(e){this.mode=o.BYTE,"string"==typeof e?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}ByteData.getBitsLength=function(e){return 8*e},ByteData.prototype.getLength=function(){return this.data.length},ByteData.prototype.getBitsLength=function(){return ByteData.getBitsLength(this.data.length)},ByteData.prototype.write=function(e){for(let t=0,n=this.data.length;t<n;t++)e.put(this.data[t],8)},e.exports=ByteData},15835:function(e,t,n){let o=n(51141),i=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],a=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];t.getBlocksCount=function(e,t){switch(t){case o.L:return i[(e-1)*4+0];case o.M:return i[(e-1)*4+1];case o.Q:return i[(e-1)*4+2];case o.H:return i[(e-1)*4+3];default:return}},t.getTotalCodewordsCount=function(e,t){switch(t){case o.L:return a[(e-1)*4+0];case o.M:return a[(e-1)*4+1];case o.Q:return a[(e-1)*4+2];case o.H:return a[(e-1)*4+3];default:return}}},51141:function(e,t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2},t.isValid=function(e){return e&&void 0!==e.bit&&e.bit>=0&&e.bit<4},t.from=function(e,n){if(t.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw Error("Param is not a string");let n=e.toLowerCase();switch(n){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw Error("Unknown EC Level: "+e)}}(e)}catch(e){return n}}},87922:function(e,t,n){let o=n(75919).getSymbolSize;t.getPositions=function(e){let t=o(e);return[[0,0],[t-7,0],[0,t-7]]}},1020:function(e,t,n){let o=n(75919),i=o.getBCHDigit(1335);t.getEncodedBits=function(e,t){let n=e.bit<<3|t,a=n<<10;for(;o.getBCHDigit(a)-i>=0;)a^=1335<<o.getBCHDigit(a)-i;return(n<<10|a)^21522}},20239:function(e,t){let n=new Uint8Array(512),o=new Uint8Array(256);!function(){let e=1;for(let t=0;t<255;t++)n[t]=e,o[e]=t,256&(e<<=1)&&(e^=285);for(let e=255;e<512;e++)n[e]=n[e-255]}(),t.log=function(e){if(e<1)throw Error("log("+e+")");return o[e]},t.exp=function(e){return n[e]},t.mul=function(e,t){return 0===e||0===t?0:n[o[e]+o[t]]}},31806:function(e,t,n){let o=n(34672),i=n(75919);function KanjiData(e){this.mode=o.KANJI,this.data=e}KanjiData.getBitsLength=function(e){return 13*e},KanjiData.prototype.getLength=function(){return this.data.length},KanjiData.prototype.getBitsLength=function(){return KanjiData.getBitsLength(this.data.length)},KanjiData.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let n=i.toSJIS(this.data[t]);if(n>=33088&&n<=40956)n-=33088;else if(n>=57408&&n<=60351)n-=49472;else throw Error("Invalid SJIS character: "+this.data[t]+"\nMake sure your charset is UTF-8");n=(n>>>8&255)*192+(255&n),e.put(n,13)}},e.exports=KanjiData},97760:function(e,t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};let n={N1:3,N2:3,N3:40,N4:10};t.isValid=function(e){return null!=e&&""!==e&&!isNaN(e)&&e>=0&&e<=7},t.from=function(e){return t.isValid(e)?parseInt(e,10):void 0},t.getPenaltyN1=function(e){let t=e.size,o=0,i=0,a=0,s=null,c=null;for(let l=0;l<t;l++){i=a=0,s=c=null;for(let u=0;u<t;u++){let t=e.get(l,u);t===s?i++:(i>=5&&(o+=n.N1+(i-5)),s=t,i=1),(t=e.get(u,l))===c?a++:(a>=5&&(o+=n.N1+(a-5)),c=t,a=1)}i>=5&&(o+=n.N1+(i-5)),a>=5&&(o+=n.N1+(a-5))}return o},t.getPenaltyN2=function(e){let t=e.size,o=0;for(let n=0;n<t-1;n++)for(let i=0;i<t-1;i++){let t=e.get(n,i)+e.get(n,i+1)+e.get(n+1,i)+e.get(n+1,i+1);(4===t||0===t)&&o++}return o*n.N2},t.getPenaltyN3=function(e){let t=e.size,o=0,i=0,a=0;for(let n=0;n<t;n++){i=a=0;for(let s=0;s<t;s++)i=i<<1&2047|e.get(n,s),s>=10&&(1488===i||93===i)&&o++,a=a<<1&2047|e.get(s,n),s>=10&&(1488===a||93===a)&&o++}return o*n.N3},t.getPenaltyN4=function(e){let t=0,o=e.data.length;for(let n=0;n<o;n++)t+=e.data[n];let i=Math.abs(Math.ceil(100*t/o/5)-10);return i*n.N4},t.applyMask=function(e,n){let o=n.size;for(let i=0;i<o;i++)for(let a=0;a<o;a++)n.isReserved(a,i)||n.xor(a,i,function(e,n,o){switch(e){case t.Patterns.PATTERN000:return(n+o)%2==0;case t.Patterns.PATTERN001:return n%2==0;case t.Patterns.PATTERN010:return o%3==0;case t.Patterns.PATTERN011:return(n+o)%3==0;case t.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(o/3))%2==0;case t.Patterns.PATTERN101:return n*o%2+n*o%3==0;case t.Patterns.PATTERN110:return(n*o%2+n*o%3)%2==0;case t.Patterns.PATTERN111:return(n*o%3+(n+o)%2)%2==0;default:throw Error("bad maskPattern:"+e)}}(e,a,i))},t.getBestMask=function(e,n){let o=Object.keys(t.Patterns).length,i=0,a=1/0;for(let s=0;s<o;s++){n(s),t.applyMask(s,e);let o=t.getPenaltyN1(e)+t.getPenaltyN2(e)+t.getPenaltyN3(e)+t.getPenaltyN4(e);t.applyMask(s,e),o<a&&(a=o,i=s)}return i}},34672:function(e,t,n){let o=n(40662),i=n(29537);t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(e,t){if(!e.ccBits)throw Error("Invalid mode: "+e);if(!o.isValid(t))throw Error("Invalid version: "+t);return t>=1&&t<10?e.ccBits[0]:t<27?e.ccBits[1]:e.ccBits[2]},t.getBestModeForData=function(e){return i.testNumeric(e)?t.NUMERIC:i.testAlphanumeric(e)?t.ALPHANUMERIC:i.testKanji(e)?t.KANJI:t.BYTE},t.toString=function(e){if(e&&e.id)return e.id;throw Error("Invalid mode")},t.isValid=function(e){return e&&e.bit&&e.ccBits},t.from=function(e,n){if(t.isValid(e))return e;try{return function(e){if("string"!=typeof e)throw Error("Param is not a string");let n=e.toLowerCase();switch(n){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw Error("Unknown mode: "+e)}}(e)}catch(e){return n}}},37524:function(e,t,n){let o=n(34672);function NumericData(e){this.mode=o.NUMERIC,this.data=e.toString()}NumericData.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)},NumericData.prototype.getLength=function(){return this.data.length},NumericData.prototype.getBitsLength=function(){return NumericData.getBitsLength(this.data.length)},NumericData.prototype.write=function(e){let t,n;for(t=0;t+3<=this.data.length;t+=3)n=parseInt(this.data.substr(t,3),10),e.put(n,10);let o=this.data.length-t;o>0&&(n=parseInt(this.data.substr(t),10),e.put(n,3*o+1))},e.exports=NumericData},63752:function(e,t,n){let o=n(20239);t.mul=function(e,t){let n=new Uint8Array(e.length+t.length-1);for(let i=0;i<e.length;i++)for(let a=0;a<t.length;a++)n[i+a]^=o.mul(e[i],t[a]);return n},t.mod=function(e,t){let n=new Uint8Array(e);for(;n.length-t.length>=0;){let e=n[0];for(let i=0;i<t.length;i++)n[i]^=o.mul(t[i],e);let i=0;for(;i<n.length&&0===n[i];)i++;n=n.slice(i)}return n},t.generateECPolynomial=function(e){let n=new Uint8Array([1]);for(let i=0;i<e;i++)n=t.mul(n,new Uint8Array([1,o.exp(i)]));return n}},12235:function(e,t,n){let o=n(75919),i=n(51141),a=n(50943),s=n(49281),c=n(41167),l=n(87922),u=n(97760),p=n(15835),d=n(89776),f=n(1621),h=n(1020),w=n(34672),A=n(17821);function setupFormatInfo(e,t,n){let o,i;let a=e.size,s=h.getEncodedBits(t,n);for(o=0;o<15;o++)i=(s>>o&1)==1,o<6?e.set(o,8,i,!0):o<8?e.set(o+1,8,i,!0):e.set(a-15+o,8,i,!0),o<8?e.set(8,a-o-1,i,!0):o<9?e.set(8,15-o-1+1,i,!0):e.set(8,15-o-1,i,!0);e.set(a-8,8,1,!0)}t.create=function(e,t){let n,h;if(void 0===e||""===e)throw Error("No input text");let g=i.M;return void 0!==t&&(g=i.from(t.errorCorrectionLevel,i.M),n=f.from(t.version),h=u.from(t.maskPattern),t.toSJISFunc&&o.setToSJISFunction(t.toSJISFunc)),function(e,t,n,i){let h;if(Array.isArray(e))h=A.fromArray(e);else if("string"==typeof e){let o=t;if(!o){let t=A.rawSplit(e);o=f.getBestVersionForData(t,n)}h=A.fromString(e,o||40)}else throw Error("Invalid data");let g=f.getBestVersionForData(h,n);if(!g)throw Error("The amount of data is too big to be stored in a QR Code");if(t){if(t<g)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+g+".\n")}else t=g;let m=function(e,t,n){let i=new a;n.forEach(function(t){i.put(t.mode.bit,4),i.put(t.getLength(),w.getCharCountIndicator(t.mode,e)),t.write(i)});let s=o.getSymbolTotalCodewords(e),c=p.getTotalCodewordsCount(e,t),l=(s-c)*8;for(i.getLengthInBits()+4<=l&&i.put(0,4);i.getLengthInBits()%8!=0;)i.putBit(0);let u=(l-i.getLengthInBits())/8;for(let e=0;e<u;e++)i.put(e%2?17:236,8);return function(e,t,n){let i,a;let s=o.getSymbolTotalCodewords(t),c=p.getTotalCodewordsCount(t,n),l=s-c,u=p.getBlocksCount(t,n),f=s%u,h=u-f,w=Math.floor(s/u),A=Math.floor(l/u),g=A+1,m=w-A,y=new d(m),b=0,v=Array(u),C=Array(u),B=0,k=new Uint8Array(e.buffer);for(let e=0;e<u;e++){let t=e<h?A:g;v[e]=k.slice(b,b+t),C[e]=y.encode(v[e]),b+=t,B=Math.max(B,t)}let E=new Uint8Array(s),x=0;for(i=0;i<B;i++)for(a=0;a<u;a++)i<v[a].length&&(E[x++]=v[a][i]);for(i=0;i<m;i++)for(a=0;a<u;a++)E[x++]=C[a][i];return E}(i,e,t)}(t,n,h),y=o.getSymbolSize(t),b=new s(y);return function(e,t){let n=e.size,o=l.getPositions(t);for(let t=0;t<o.length;t++){let i=o[t][0],a=o[t][1];for(let t=-1;t<=7;t++)if(!(i+t<=-1)&&!(n<=i+t))for(let o=-1;o<=7;o++)a+o<=-1||n<=a+o||(t>=0&&t<=6&&(0===o||6===o)||o>=0&&o<=6&&(0===t||6===t)||t>=2&&t<=4&&o>=2&&o<=4?e.set(i+t,a+o,!0,!0):e.set(i+t,a+o,!1,!0))}}(b,t),function(e){let t=e.size;for(let n=8;n<t-8;n++){let t=n%2==0;e.set(n,6,t,!0),e.set(6,n,t,!0)}}(b),function(e,t){let n=c.getPositions(t);for(let t=0;t<n.length;t++){let o=n[t][0],i=n[t][1];for(let t=-2;t<=2;t++)for(let n=-2;n<=2;n++)-2===t||2===t||-2===n||2===n||0===t&&0===n?e.set(o+t,i+n,!0,!0):e.set(o+t,i+n,!1,!0)}}(b,t),setupFormatInfo(b,n,0),t>=7&&function(e,t){let n,o,i;let a=e.size,s=f.getEncodedBits(t);for(let t=0;t<18;t++)n=Math.floor(t/3),o=t%3+a-8-3,i=(s>>t&1)==1,e.set(n,o,i,!0),e.set(o,n,i,!0)}(b,t),function(e,t){let n=e.size,o=-1,i=n-1,a=7,s=0;for(let c=n-1;c>0;c-=2)for(6===c&&c--;;){for(let n=0;n<2;n++)if(!e.isReserved(i,c-n)){let o=!1;s<t.length&&(o=(t[s]>>>a&1)==1),e.set(i,c-n,o),-1==--a&&(s++,a=7)}if((i+=o)<0||n<=i){i-=o,o=-o;break}}}(b,m),isNaN(i)&&(i=u.getBestMask(b,setupFormatInfo.bind(null,b,n))),u.applyMask(i,b),setupFormatInfo(b,n,i),{modules:b,version:t,errorCorrectionLevel:n,maskPattern:i,segments:h}}(e,n,g,h)}},89776:function(e,t,n){let o=n(63752);function ReedSolomonEncoder(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}ReedSolomonEncoder.prototype.initialize=function(e){this.degree=e,this.genPoly=o.generateECPolynomial(this.degree)},ReedSolomonEncoder.prototype.encode=function(e){if(!this.genPoly)throw Error("Encoder not initialized");let t=new Uint8Array(e.length+this.degree);t.set(e);let n=o.mod(t,this.genPoly),i=this.degree-n.length;if(i>0){let e=new Uint8Array(this.degree);return e.set(n,i),e}return n},e.exports=ReedSolomonEncoder},29537:function(e,t){let n="[0-9]+",o="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";o=o.replace(/u/g,"\\u");let i="(?:(?![A-Z0-9 $%*+\\-./:]|"+o+")(?:.|[\r\n]))+";t.KANJI=RegExp(o,"g"),t.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),t.BYTE=RegExp(i,"g"),t.NUMERIC=RegExp(n,"g"),t.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let a=RegExp("^"+o+"$"),s=RegExp("^"+n+"$"),c=RegExp("^[A-Z0-9 $%*+\\-./:]+$");t.testKanji=function(e){return a.test(e)},t.testNumeric=function(e){return s.test(e)},t.testAlphanumeric=function(e){return c.test(e)}},17821:function(e,t,n){let o=n(34672),i=n(37524),a=n(1983),s=n(57537),c=n(31806),l=n(29537),u=n(75919),p=n(13526);function getStringByteLength(e){return unescape(encodeURIComponent(e)).length}function getSegments(e,t,n){let o;let i=[];for(;null!==(o=e.exec(n));)i.push({data:o[0],index:o.index,mode:t,length:o[0].length});return i}function getSegmentsFromString(e){let t,n;let i=getSegments(l.NUMERIC,o.NUMERIC,e),a=getSegments(l.ALPHANUMERIC,o.ALPHANUMERIC,e);u.isKanjiModeEnabled()?(t=getSegments(l.BYTE,o.BYTE,e),n=getSegments(l.KANJI,o.KANJI,e)):(t=getSegments(l.BYTE_KANJI,o.BYTE,e),n=[]);let s=i.concat(a,t,n);return s.sort(function(e,t){return e.index-t.index}).map(function(e){return{data:e.data,mode:e.mode,length:e.length}})}function getSegmentBitsLength(e,t){switch(t){case o.NUMERIC:return i.getBitsLength(e);case o.ALPHANUMERIC:return a.getBitsLength(e);case o.KANJI:return c.getBitsLength(e);case o.BYTE:return s.getBitsLength(e)}}function buildSingleSegment(e,t){let n;let l=o.getBestModeForData(e);if((n=o.from(t,l))!==o.BYTE&&n.bit<l.bit)throw Error('"'+e+'" cannot be encoded with mode '+o.toString(n)+".\n Suggested mode is: "+o.toString(l));switch(n!==o.KANJI||u.isKanjiModeEnabled()||(n=o.BYTE),n){case o.NUMERIC:return new i(e);case o.ALPHANUMERIC:return new a(e);case o.KANJI:return new c(e);case o.BYTE:return new s(e)}}t.fromArray=function(e){return e.reduce(function(e,t){return"string"==typeof t?e.push(buildSingleSegment(t,null)):t.data&&e.push(buildSingleSegment(t.data,t.mode)),e},[])},t.fromString=function(e,n){let i=getSegmentsFromString(e,u.isKanjiModeEnabled()),a=function(e){let t=[];for(let n=0;n<e.length;n++){let i=e[n];switch(i.mode){case o.NUMERIC:t.push([i,{data:i.data,mode:o.ALPHANUMERIC,length:i.length},{data:i.data,mode:o.BYTE,length:i.length}]);break;case o.ALPHANUMERIC:t.push([i,{data:i.data,mode:o.BYTE,length:i.length}]);break;case o.KANJI:t.push([i,{data:i.data,mode:o.BYTE,length:getStringByteLength(i.data)}]);break;case o.BYTE:t.push([{data:i.data,mode:o.BYTE,length:getStringByteLength(i.data)}])}}return t}(i),s=function(e,t){let n={},i={start:{}},a=["start"];for(let s=0;s<e.length;s++){let c=e[s],l=[];for(let e=0;e<c.length;e++){let u=c[e],p=""+s+e;l.push(p),n[p]={node:u,lastCount:0},i[p]={};for(let e=0;e<a.length;e++){let s=a[e];n[s]&&n[s].node.mode===u.mode?(i[s][p]=getSegmentBitsLength(n[s].lastCount+u.length,u.mode)-getSegmentBitsLength(n[s].lastCount,u.mode),n[s].lastCount+=u.length):(n[s]&&(n[s].lastCount=u.length),i[s][p]=getSegmentBitsLength(u.length,u.mode)+4+o.getCharCountIndicator(u.mode,t))}}a=l}for(let e=0;e<a.length;e++)i[a[e]].end=0;return{map:i,table:n}}(a,n),c=p.find_path(s.map,"start","end"),l=[];for(let e=1;e<c.length-1;e++)l.push(s.table[c[e]].node);return t.fromArray(l.reduce(function(e,t){let n=e.length-1>=0?e[e.length-1]:null;return n&&n.mode===t.mode?e[e.length-1].data+=t.data:e.push(t),e},[]))},t.rawSplit=function(e){return t.fromArray(getSegmentsFromString(e,u.isKanjiModeEnabled()))}},75919:function(e,t){let n;let o=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];t.getSymbolSize=function(e){if(!e)throw Error('"version" cannot be null or undefined');if(e<1||e>40)throw Error('"version" should be in range from 1 to 40');return 4*e+17},t.getSymbolTotalCodewords=function(e){return o[e]},t.getBCHDigit=function(e){let t=0;for(;0!==e;)t++,e>>>=1;return t},t.setToSJISFunction=function(e){if("function"!=typeof e)throw Error('"toSJISFunc" is not a valid function.');n=e},t.isKanjiModeEnabled=function(){return void 0!==n},t.toSJIS=function(e){return n(e)}},40662:function(e,t){t.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}},1621:function(e,t,n){let o=n(75919),i=n(15835),a=n(51141),s=n(34672),c=n(40662),l=o.getBCHDigit(7973);function getReservedBitsCount(e,t){return s.getCharCountIndicator(e,t)+4}t.from=function(e,t){return c.isValid(e)?parseInt(e,10):t},t.getCapacity=function(e,t,n){if(!c.isValid(e))throw Error("Invalid QR Code version");void 0===n&&(n=s.BYTE);let a=o.getSymbolTotalCodewords(e),l=i.getTotalCodewordsCount(e,t),u=(a-l)*8;if(n===s.MIXED)return u;let p=u-getReservedBitsCount(n,e);switch(n){case s.NUMERIC:return Math.floor(p/10*3);case s.ALPHANUMERIC:return Math.floor(p/11*2);case s.KANJI:return Math.floor(p/13);case s.BYTE:default:return Math.floor(p/8)}},t.getBestVersionForData=function(e,n){let o;let i=a.from(n,a.M);if(Array.isArray(e)){if(e.length>1)return function(e,n){for(let o=1;o<=40;o++){let i=function(e,t){let n=0;return e.forEach(function(e){let o=getReservedBitsCount(e.mode,t);n+=o+e.getBitsLength()}),n}(e,o);if(i<=t.getCapacity(o,n,s.MIXED))return o}}(e,i);if(0===e.length)return 1;o=e[0]}else o=e;return function(e,n,o){for(let i=1;i<=40;i++)if(n<=t.getCapacity(i,o,e))return i}(o.mode,o.getLength(),i)},t.getEncodedBits=function(e){if(!c.isValid(e)||e<7)throw Error("Invalid QR Code version");let t=e<<12;for(;o.getBCHDigit(t)-l>=0;)t^=7973<<o.getBCHDigit(t)-l;return e<<12|t}},53113:function(e,t,n){let o=n(68375);t.render=function(e,t,n){var i;let a=n,s=t;void 0!==a||t&&t.getContext||(a=t,t=void 0),t||(s=function(){try{return document.createElement("canvas")}catch(e){throw Error("You need to specify a canvas element")}}()),a=o.getOptions(a);let c=o.getImageWidth(e.modules.size,a),l=s.getContext("2d"),u=l.createImageData(c,c);return o.qrToImageData(u.data,e,a),i=s,l.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=c,i.width=c,i.style.height=c+"px",i.style.width=c+"px",l.putImageData(u,0,0),s},t.renderToDataURL=function(e,n,o){let i=o;void 0!==i||n&&n.getContext||(i=n,n=void 0),i||(i={});let a=t.render(e,n,i),s=i.type||"image/png",c=i.rendererOpts||{};return a.toDataURL(s,c.quality)}},70835:function(e,t,n){let o=n(68375);function getColorAttrib(e,t){let n=e.a/255,o=t+'="'+e.hex+'"';return n<1?o+" "+t+'-opacity="'+n.toFixed(2).slice(1)+'"':o}function svgCmd(e,t,n){let o=e+t;return void 0!==n&&(o+=" "+n),o}t.render=function(e,t,n){let i=o.getOptions(t),a=e.modules.size,s=e.modules.data,c=a+2*i.margin,l=i.color.light.a?"<path "+getColorAttrib(i.color.light,"fill")+' d="M0 0h'+c+"v"+c+'H0z"/>':"",u="<path "+getColorAttrib(i.color.dark,"stroke")+' d="'+function(e,t,n){let o="",i=0,a=!1,s=0;for(let c=0;c<e.length;c++){let l=Math.floor(c%t),u=Math.floor(c/t);l||a||(a=!0),e[c]?(s++,c>0&&l>0&&e[c-1]||(o+=a?svgCmd("M",l+n,.5+u+n):svgCmd("m",i,0),i=0,a=!1),l+1<t&&e[c+1]||(o+=svgCmd("h",s),s=0)):i++}return o}(s,a,i.margin)+'"/>',p=i.width?'width="'+i.width+'" height="'+i.width+'" ':"",d='<svg xmlns="http://www.w3.org/2000/svg" '+p+('viewBox="0 0 '+c)+" "+c+'" shape-rendering="crispEdges">'+l+u+"</svg>\n";return"function"==typeof n&&n(null,d),d}},68375:function(e,t){function hex2rgba(e){if("number"==typeof e&&(e=e.toString()),"string"!=typeof e)throw Error("Color should be defined as hex string");let t=e.slice().replace("#","").split("");if(t.length<3||5===t.length||t.length>8)throw Error("Invalid hex color: "+e);(3===t.length||4===t.length)&&(t=Array.prototype.concat.apply([],t.map(function(e){return[e,e]}))),6===t.length&&t.push("F","F");let n=parseInt(t.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:255&n,hex:"#"+t.slice(0,6).join("")}}t.getOptions=function(e){e||(e={}),e.color||(e.color={});let t=void 0===e.margin||null===e.margin||e.margin<0?4:e.margin,n=e.width&&e.width>=21?e.width:void 0,o=e.scale||4;return{width:n,scale:n?4:o,margin:t,color:{dark:hex2rgba(e.color.dark||"#000000ff"),light:hex2rgba(e.color.light||"#ffffffff")},type:e.type,rendererOpts:e.rendererOpts||{}}},t.getScale=function(e,t){return t.width&&t.width>=e+2*t.margin?t.width/(e+2*t.margin):t.scale},t.getImageWidth=function(e,n){let o=t.getScale(e,n);return Math.floor((e+2*n.margin)*o)},t.qrToImageData=function(e,n,o){let i=n.modules.size,a=n.modules.data,s=t.getScale(i,o),c=Math.floor((i+2*o.margin)*s),l=o.margin*s,u=[o.color.light,o.color.dark];for(let t=0;t<c;t++)for(let n=0;n<c;n++){let p=(t*c+n)*4,d=o.color.light;if(t>=l&&n>=l&&t<c-l&&n<c-l){let e=Math.floor((t-l)/s),o=Math.floor((n-l)/s);d=u[a[e*i+o]?1:0]}e[p++]=d.r,e[p++]=d.g,e[p++]=d.b,e[p]=d.a}}},71092:function(e,t,n){"use strict";n.d(t,{Z:function(){return S}});var o,i,a,s,c=n(74158),l=n(77317),u="right-scroll-bar-position",p="width-before-scroll-bar";function assignRef(e,t){return"function"==typeof e?e(t):e&&(e.current=t),e}var d="undefined"!=typeof window?l.useLayoutEffect:l.useEffect,f=new WeakMap,h=(0,n(22132)._)(),nothing=function(){},w=l.forwardRef(function(e,t){var n,o,i,a,s=l.useRef(null),u=l.useState({onScrollCapture:nothing,onWheelCapture:nothing,onTouchMoveCapture:nothing}),p=u[0],w=u[1],A=e.forwardProps,g=e.children,m=e.className,y=e.removeScrollBar,b=e.enabled,v=e.shards,C=e.sideCar,B=e.noIsolation,k=e.inert,E=e.allowPinchZoom,x=e.as,I=void 0===x?"div":x,D=e.gapMode,S=(0,c.__rest)(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),_=(n=[s,t],o=function(e){return n.forEach(function(t){return assignRef(t,e)})},(i=(0,l.useState)(function(){return{value:null,callback:o,facade:{get current(){return i.value},set current(value){var e=i.value;e!==value&&(i.value=value,i.callback(value,e))}}}})[0]).callback=o,a=i.facade,d(function(){var e=f.get(a);if(e){var t=new Set(e),o=new Set(n),i=a.current;t.forEach(function(e){o.has(e)||assignRef(e,null)}),o.forEach(function(e){t.has(e)||assignRef(e,i)})}f.set(a,n)},[n]),a),Q=(0,c.__assign)((0,c.__assign)({},S),p);return l.createElement(l.Fragment,null,b&&l.createElement(C,{sideCar:h,removeScrollBar:y,shards:v,noIsolation:B,inert:k,setCallbacks:w,allowPinchZoom:!!E,lockRef:s,gapMode:D}),A?l.cloneElement(l.Children.only(g),(0,c.__assign)((0,c.__assign)({},Q),{ref:_})):l.createElement(I,(0,c.__assign)({},Q,{className:m,ref:_}),g))});w.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1},w.classNames={fullWidth:p,zeroRight:u};var A=n(94345),g=n(82145),m={left:0,top:0,right:0,gap:0},parse=function(e){return parseInt(e||"",10)||0},getOffset=function(e){var t=window.getComputedStyle(document.body),n=t["padding"===e?"paddingLeft":"marginLeft"],o=t["padding"===e?"paddingTop":"marginTop"],i=t["padding"===e?"paddingRight":"marginRight"];return[parse(n),parse(o),parse(i)]},getGapWidth=function(e){if(void 0===e&&(e="margin"),"undefined"==typeof window)return m;var t=getOffset(e),n=document.documentElement.clientWidth,o=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,o-n+t[2]-t[0])}},y=(o=0,i=null,a={add:function(e){if(0==o&&(i=function(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=(0,g.V)();return t&&e.setAttribute("nonce",t),e}())){var t,n;(t=i).styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),n=i,(document.head||document.getElementsByTagName("head")[0]).appendChild(n)}o++},remove:function(){--o||!i||(i.parentNode&&i.parentNode.removeChild(i),i=null)}},s=function(e,t){l.useEffect(function(){return a.add(e),function(){a.remove()}},[e&&t])},function(e){return s(e.styles,e.dynamic),null}),b="data-scroll-locked",getStyles=function(e,t,n,o){var i=e.left,a=e.top,s=e.right,c=e.gap;return void 0===n&&(n="margin"),"\n  .".concat("with-scroll-bars-hidden"," {\n   overflow: hidden ").concat(o,";\n   padding-right: ").concat(c,"px ").concat(o,";\n  }\n  body[").concat(b,"] {\n    overflow: hidden ").concat(o,";\n    overscroll-behavior: contain;\n    ").concat([t&&"position: relative ".concat(o,";"),"margin"===n&&"\n    padding-left: ".concat(i,"px;\n    padding-top: ").concat(a,"px;\n    padding-right: ").concat(s,"px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(c,"px ").concat(o,";\n    "),"padding"===n&&"padding-right: ".concat(c,"px ").concat(o,";")].filter(Boolean).join(""),"\n  }\n  \n  .").concat(u," {\n    right: ").concat(c,"px ").concat(o,";\n  }\n  \n  .").concat(p," {\n    margin-right: ").concat(c,"px ").concat(o,";\n  }\n  \n  .").concat(u," .").concat(u," {\n    right: 0 ").concat(o,";\n  }\n  \n  .").concat(p," .").concat(p," {\n    margin-right: 0 ").concat(o,";\n  }\n  \n  body[").concat(b,"] {\n    ").concat("--removed-body-scroll-bar-size",": ").concat(c,"px;\n  }\n")},getCurrentUseCounter=function(){var e=parseInt(document.body.getAttribute(b)||"0",10);return isFinite(e)?e:0},useLockAttribute=function(){l.useEffect(function(){return document.body.setAttribute(b,(getCurrentUseCounter()+1).toString()),function(){var e=getCurrentUseCounter()-1;e<=0?document.body.removeAttribute(b):document.body.setAttribute(b,e.toString())}},[])},RemoveScrollBar=function(e){var t=e.noRelative,n=e.noImportant,o=e.gapMode,i=void 0===o?"margin":o;useLockAttribute();var a=l.useMemo(function(){return getGapWidth(i)},[i]);return l.createElement(y,{styles:getStyles(a,!t,i,n?"":"!important")})},v=n(71691),C=!1;if("undefined"!=typeof window)try{var B=Object.defineProperty({},"passive",{get:function(){return C=!0,!0}});window.addEventListener("test",B,B),window.removeEventListener("test",B,B)}catch(e){C=!1}var k=!!C&&{passive:!1},elementCanBeScrolled=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return"hidden"!==n[t]&&!(n.overflowY===n.overflowX&&"TEXTAREA"!==e.tagName&&"visible"===n[t])},locationCouldBeScrolled=function(e,t){var n=t.ownerDocument,o=t;do{if("undefined"!=typeof ShadowRoot&&o instanceof ShadowRoot&&(o=o.host),elementCouldBeScrolled(e,o)){var i=getScrollVariables(e,o);if(i[1]>i[2])return!0}o=o.parentNode}while(o&&o!==n.body);return!1},elementCouldBeScrolled=function(e,t){return"v"===e?elementCanBeScrolled(t,"overflowY"):elementCanBeScrolled(t,"overflowX")},getScrollVariables=function(e,t){return"v"===e?[t.scrollTop,t.scrollHeight,t.clientHeight]:[t.scrollLeft,t.scrollWidth,t.clientWidth]},handleScroll=function(e,t,n,o,i){var a,s=(a=window.getComputedStyle(t).direction,"h"===e&&"rtl"===a?-1:1),c=s*o,l=n.target,u=t.contains(l),p=!1,d=c>0,f=0,h=0;do{var w=getScrollVariables(e,l),A=w[0],g=w[1]-w[2]-s*A;(A||g)&&elementCouldBeScrolled(e,l)&&(f+=g,h+=A),l=l instanceof ShadowRoot?l.host:l.parentNode}while(!u&&l!==document.body||u&&(t.contains(l)||t===l));return d&&(i&&1>Math.abs(f)||!i&&c>f)?p=!0:!d&&(i&&1>Math.abs(h)||!i&&-c>h)&&(p=!0),p},getTouchXY=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},getDeltaXY=function(e){return[e.deltaX,e.deltaY]},extractRef=function(e){return e&&"current"in e?e.current:e},E=0,x=[],I=(0,A.L)(h,function(e){var t=l.useRef([]),n=l.useRef([0,0]),o=l.useRef(),i=l.useState(E++)[0],a=l.useState(v.Ws)[0],s=l.useRef(e);l.useEffect(function(){s.current=e},[e]),l.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(i));var t=(0,c.__spreadArray)([e.lockRef.current],(e.shards||[]).map(extractRef),!0).filter(Boolean);return t.forEach(function(e){return e.classList.add("allow-interactivity-".concat(i))}),function(){document.body.classList.remove("block-interactivity-".concat(i)),t.forEach(function(e){return e.classList.remove("allow-interactivity-".concat(i))})}}},[e.inert,e.lockRef.current,e.shards]);var u=l.useCallback(function(e,t){if("touches"in e&&2===e.touches.length||"wheel"===e.type&&e.ctrlKey)return!s.current.allowPinchZoom;var i,a=getTouchXY(e),c=n.current,l="deltaX"in e?e.deltaX:c[0]-a[0],u="deltaY"in e?e.deltaY:c[1]-a[1],p=e.target,d=Math.abs(l)>Math.abs(u)?"h":"v";if("touches"in e&&"h"===d&&"range"===p.type)return!1;var f=locationCouldBeScrolled(d,p);if(!f)return!0;if(f?i=d:(i="v"===d?"h":"v",f=locationCouldBeScrolled(d,p)),!f)return!1;if(!o.current&&"changedTouches"in e&&(l||u)&&(o.current=i),!i)return!0;var h=o.current||i;return handleScroll(h,t,e,"h"===h?l:u,!0)},[]),p=l.useCallback(function(e){if(x.length&&x[x.length-1]===a){var n="deltaY"in e?getDeltaXY(e):getTouchXY(e),o=t.current.filter(function(t){var o;return t.name===e.type&&(t.target===e.target||e.target===t.shadowParent)&&(o=t.delta)[0]===n[0]&&o[1]===n[1]})[0];if(o&&o.should){e.cancelable&&e.preventDefault();return}if(!o){var i=(s.current.shards||[]).map(extractRef).filter(Boolean).filter(function(t){return t.contains(e.target)});(i.length>0?u(e,i[0]):!s.current.noIsolation)&&e.cancelable&&e.preventDefault()}}},[]),d=l.useCallback(function(e,n,o,i){var a={name:e,delta:n,target:o,should:i,shadowParent:function(e){for(var t=null;null!==e;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}(o)};t.current.push(a),setTimeout(function(){t.current=t.current.filter(function(e){return e!==a})},1)},[]),f=l.useCallback(function(e){n.current=getTouchXY(e),o.current=void 0},[]),h=l.useCallback(function(t){d(t.type,getDeltaXY(t),t.target,u(t,e.lockRef.current))},[]),w=l.useCallback(function(t){d(t.type,getTouchXY(t),t.target,u(t,e.lockRef.current))},[]);l.useEffect(function(){return x.push(a),e.setCallbacks({onScrollCapture:h,onWheelCapture:h,onTouchMoveCapture:w}),document.addEventListener("wheel",p,k),document.addEventListener("touchmove",p,k),document.addEventListener("touchstart",f,k),function(){x=x.filter(function(e){return e!==a}),document.removeEventListener("wheel",p,k),document.removeEventListener("touchmove",p,k),document.removeEventListener("touchstart",f,k)}},[]);var A=e.removeScrollBar,g=e.inert;return l.createElement(l.Fragment,null,g?l.createElement(a,{styles:"\n  .block-interactivity-".concat(i," {pointer-events: none;}\n  .allow-interactivity-").concat(i," {pointer-events: all;}\n")}):null,A?l.createElement(RemoveScrollBar,{gapMode:e.gapMode}):null)}),D=l.forwardRef(function(e,t){return l.createElement(w,(0,c.__assign)({},e,{ref:t,sideCar:I}))});D.classNames=w.classNames;var S=D},39856:function(e,t,n){var o;!function(i,a){"use strict";var s="function",c="undefined",l="object",u="string",p="major",d="model",f="name",h="type",w="vendor",A="version",g="architecture",m="console",y="mobile",b="tablet",v="smarttv",C="wearable",B="embedded",k="Amazon",E="Apple",x="ASUS",I="BlackBerry",D="Browser",S="Chrome",_="Firefox",Q="Google",M="Huawei",T="Microsoft",N="Motorola",R="Opera",F="Samsung",O="Sharp",W="Sony",P="Xiaomi",U="Zebra",L="Facebook",K="Chromium OS",q="Mac OS",extend=function(e,t){var n={};for(var o in e)t[o]&&t[o].length%2==0?n[o]=t[o].concat(e[o]):n[o]=e[o];return n},enumerize=function(e){for(var t={},n=0;n<e.length;n++)t[e[n].toUpperCase()]=e[n];return t},has=function(e,t){return typeof e===u&&-1!==lowerize(t).indexOf(lowerize(e))},lowerize=function(e){return e.toLowerCase()},trim=function(e,t){if(typeof e===u)return e=e.replace(/^\s\s*/,""),typeof t===c?e:e.substring(0,500)},rgxMapper=function(e,t){for(var n,o,i,c,u,p,d=0;d<t.length&&!u;){var f=t[d],h=t[d+1];for(n=o=0;n<f.length&&!u&&f[n];)if(u=f[n++].exec(e))for(i=0;i<h.length;i++)p=u[++o],typeof(c=h[i])===l&&c.length>0?2===c.length?typeof c[1]==s?this[c[0]]=c[1].call(this,p):this[c[0]]=c[1]:3===c.length?typeof c[1]!==s||c[1].exec&&c[1].test?this[c[0]]=p?p.replace(c[1],c[2]):a:this[c[0]]=p?c[1].call(this,p,c[2]):a:4===c.length&&(this[c[0]]=p?c[3].call(this,p.replace(c[1],c[2])):a):this[c]=p||a;d+=2}},strMapper=function(e,t){for(var n in t)if(typeof t[n]===l&&t[n].length>0){for(var o=0;o<t[n].length;o++)if(has(t[n][o],e))return"?"===n?a:n}else if(has(t[n],e))return"?"===n?a:n;return e},j={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2","8.1":"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},J={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[A,[f,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[A,[f,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[f,A],[/opios[\/ ]+([\w\.]+)/i],[A,[f,R+" Mini"]],[/\bopr\/([\w\.]+)/i],[A,[f,R]],[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],[A,[f,"Baidu"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[f,A],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[A,[f,"UC"+D]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i,/micromessenger\/([\w\.]+)/i],[A,[f,"WeChat"]],[/konqueror\/([\w\.]+)/i],[A,[f,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[A,[f,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[A,[f,"Yandex"]],[/slbrowser\/([\w\.]+)/i],[A,[f,"Smart Lenovo "+D]],[/(avast|avg)\/([\w\.]+)/i],[[f,/(.+)/,"$1 Secure "+D],A],[/\bfocus\/([\w\.]+)/i],[A,[f,_+" Focus"]],[/\bopt\/([\w\.]+)/i],[A,[f,R+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[A,[f,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[A,[f,"Dolphin"]],[/coast\/([\w\.]+)/i],[A,[f,R+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[A,[f,"MIUI "+D]],[/fxios\/([-\w\.]+)/i],[A,[f,_]],[/\bqihu|(qi?ho?o?|360)browser/i],[[f,"360 "+D]],[/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i],[[f,/(.+)/,"$1 "+D],A],[/samsungbrowser\/([\w\.]+)/i],[A,[f,F+" Internet"]],[/(comodo_dragon)\/([\w\.]+)/i],[[f,/_/g," "],A],[/metasr[\/ ]?([\d\.]+)/i],[A,[f,"Sogou Explorer"]],[/(sogou)mo\w+\/([\d\.]+)/i],[[f,"Sogou Mobile"],A],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i],[f,A],[/(lbbrowser)/i,/\[(linkedin)app\]/i],[f],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[f,L],A],[/(Klarna)\/([\w\.]+)/i,/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(alipay)client\/([\w\.]+)/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[f,A],[/\bgsa\/([\w\.]+) .*safari\//i],[A,[f,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[A,[f,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[A,[f,S+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[f,S+" WebView"],A],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[A,[f,"Android "+D]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[f,A],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[A,[f,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[A,f],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[f,[A,strMapper,{"1.0":"/8","1.2":"/1","1.3":"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[f,A],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[f,"Netscape"],A],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[A,[f,_+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[f,A],[/(cobalt)\/([\w\.]+)/i],[f,[A,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[g,"amd64"]],[/(ia32(?=;))/i],[[g,lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[g,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[g,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[g,"armhf"]],[/windows (ce|mobile); ppc;/i],[[g,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[g,/ower/,"",lowerize]],[/(sun4\w)[;\)]/i],[[g,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[g,lowerize]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[d,[w,F],[h,b]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[d,[w,F],[h,y]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[d,[w,E],[h,y]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[d,[w,E],[h,b]],[/(macintosh);/i],[d,[w,E]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[d,[w,O],[h,y]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[d,[w,M],[h,b]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[d,[w,M],[h,y]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[d,/_/g," "],[w,P],[h,y]],[/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[d,/_/g," "],[w,P],[h,b]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[d,[w,"OPPO"],[h,y]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[d,[w,"Vivo"],[h,y]],[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],[d,[w,"Realme"],[h,y]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[d,[w,N],[h,y]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[d,[w,N],[h,b]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[d,[w,"LG"],[h,b]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[d,[w,"LG"],[h,y]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[d,[w,"Lenovo"],[h,b]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[d,/_/g," "],[w,"Nokia"],[h,y]],[/(pixel c)\b/i],[d,[w,Q],[h,b]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[d,[w,Q],[h,y]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[d,[w,W],[h,y]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[d,"Xperia Tablet"],[w,W],[h,b]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[d,[w,"OnePlus"],[h,y]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[d,[w,k],[h,b]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[d,/(.+)/g,"Fire Phone $1"],[w,k],[h,y]],[/(playbook);[-\w\),; ]+(rim)/i],[d,w,[h,b]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[d,[w,I],[h,y]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[d,[w,x],[h,b]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[d,[w,x],[h,y]],[/(nexus 9)/i],[d,[w,"HTC"],[h,b]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[w,[d,/_/g," "],[h,y]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[d,[w,"Acer"],[h,b]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[d,[w,"Meizu"],[h,y]],[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],[d,[w,"Ulefone"],[h,y]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[w,d,[h,y]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[w,d,[h,b]],[/(surface duo)/i],[d,[w,T],[h,b]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[d,[w,"Fairphone"],[h,y]],[/(u304aa)/i],[d,[w,"AT&T"],[h,y]],[/\bsie-(\w*)/i],[d,[w,"Siemens"],[h,y]],[/\b(rct\w+) b/i],[d,[w,"RCA"],[h,b]],[/\b(venue[\d ]{2,7}) b/i],[d,[w,"Dell"],[h,b]],[/\b(q(?:mv|ta)\w+) b/i],[d,[w,"Verizon"],[h,b]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[d,[w,"Barnes & Noble"],[h,b]],[/\b(tm\d{3}\w+) b/i],[d,[w,"NuVision"],[h,b]],[/\b(k88) b/i],[d,[w,"ZTE"],[h,b]],[/\b(nx\d{3}j) b/i],[d,[w,"ZTE"],[h,y]],[/\b(gen\d{3}) b.+49h/i],[d,[w,"Swiss"],[h,y]],[/\b(zur\d{3}) b/i],[d,[w,"Swiss"],[h,b]],[/\b((zeki)?tb.*\b) b/i],[d,[w,"Zeki"],[h,b]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[w,"Dragon Touch"],d,[h,b]],[/\b(ns-?\w{0,9}) b/i],[d,[w,"Insignia"],[h,b]],[/\b((nxa|next)-?\w{0,9}) b/i],[d,[w,"NextBook"],[h,b]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[w,"Voice"],d,[h,y]],[/\b(lvtel\-)?(v1[12]) b/i],[[w,"LvTel"],d,[h,y]],[/\b(ph-1) /i],[d,[w,"Essential"],[h,y]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[d,[w,"Envizen"],[h,b]],[/\b(trio[-\w\. ]+) b/i],[d,[w,"MachSpeed"],[h,b]],[/\btu_(1491) b/i],[d,[w,"Rotor"],[h,b]],[/(shield[\w ]+) b/i],[d,[w,"Nvidia"],[h,b]],[/(sprint) (\w+)/i],[w,d,[h,y]],[/(kin\.[onetw]{3})/i],[[d,/\./g," "],[w,T],[h,y]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[d,[w,U],[h,b]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[d,[w,U],[h,y]],[/smart-tv.+(samsung)/i],[w,[h,v]],[/hbbtv.+maple;(\d+)/i],[[d,/^/,"SmartTV"],[w,F],[h,v]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[w,"LG"],[h,v]],[/(apple) ?tv/i],[w,[d,E+" TV"],[h,v]],[/crkey/i],[[d,S+"cast"],[w,Q],[h,v]],[/droid.+aft(\w+)( bui|\))/i],[d,[w,k],[h,v]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[d,[w,O],[h,v]],[/(bravia[\w ]+)( bui|\))/i],[d,[w,W],[h,v]],[/(mitv-\w{5}) bui/i],[d,[w,P],[h,v]],[/Hbbtv.*(technisat) (.*);/i],[w,d,[h,v]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[w,trim],[d,trim],[h,v]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[h,v]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[w,d,[h,m]],[/droid.+; (shield) bui/i],[d,[w,"Nvidia"],[h,m]],[/(playstation [345portablevi]+)/i],[d,[w,W],[h,m]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[d,[w,T],[h,m]],[/((pebble))app/i],[w,d,[h,C]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[d,[w,E],[h,C]],[/droid.+; (glass) \d/i],[d,[w,Q],[h,C]],[/droid.+; (wt63?0{2,3})\)/i],[d,[w,U],[h,C]],[/(quest( 2| pro)?)/i],[d,[w,L],[h,C]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[w,[h,B]],[/(aeobc)\b/i],[d,[w,k],[h,B]],[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],[d,[h,y]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[d,[h,b]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[h,b]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[h,y]],[/(android[-\w\. ]{0,9});.+buil/i],[d,[w,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[A,[f,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[A,[f,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[f,A],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[A,f]],os:[[/microsoft (windows) (vista|xp)/i],[f,A],[/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],[f,[A,strMapper,j]],[/windows nt 6\.2; (arm)/i,/windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,/(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[A,strMapper,j],[f,"Windows"]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[A,/_/g,"."],[f,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[f,q],[A,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[A,f],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[f,A],[/\(bb(10);/i],[A,[f,I]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[A,[f,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[A,[f,_+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[A,[f,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[A,[f,"watchOS"]],[/crkey\/([\d\.]+)/i],[A,[f,S+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[f,K],A],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[f,A],[/(sunos) ?([\w\.\d]*)/i],[[f,"Solaris"],A],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[f,A]]},UAParser=function(e,t){if(typeof e===l&&(t=e,e=a),!(this instanceof UAParser))return new UAParser(e,t).getResult();var n=typeof i!==c&&i.navigator?i.navigator:a,o=e||(n&&n.userAgent?n.userAgent:""),m=n&&n.userAgentData?n.userAgentData:a,v=t?extend(J,t):J,C=n&&n.userAgent==o;return this.getBrowser=function(){var e,t={};return t[f]=a,t[A]=a,rgxMapper.call(t,o,v.browser),t[p]=typeof(e=t[A])===u?e.replace(/[^\d\.]/g,"").split(".")[0]:a,C&&n&&n.brave&&typeof n.brave.isBrave==s&&(t[f]="Brave"),t},this.getCPU=function(){var e={};return e[g]=a,rgxMapper.call(e,o,v.cpu),e},this.getDevice=function(){var e={};return e[w]=a,e[d]=a,e[h]=a,rgxMapper.call(e,o,v.device),C&&!e[h]&&m&&m.mobile&&(e[h]=y),C&&"Macintosh"==e[d]&&n&&typeof n.standalone!==c&&n.maxTouchPoints&&n.maxTouchPoints>2&&(e[d]="iPad",e[h]=b),e},this.getEngine=function(){var e={};return e[f]=a,e[A]=a,rgxMapper.call(e,o,v.engine),e},this.getOS=function(){var e={};return e[f]=a,e[A]=a,rgxMapper.call(e,o,v.os),C&&!e[f]&&m&&"Unknown"!=m.platform&&(e[f]=m.platform.replace(/chrome os/i,K).replace(/macos/i,q)),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return o},this.setUA=function(e){return o=typeof e===u&&e.length>500?trim(e,500):e,this},this.setUA(o),this};UAParser.VERSION="1.0.37",UAParser.BROWSER=enumerize([f,A,p]),UAParser.CPU=enumerize([g]),UAParser.DEVICE=enumerize([d,w,h,m,y,v,b,C,B]),UAParser.ENGINE=UAParser.OS=enumerize([f,A]),typeof t!==c?(e.exports&&(t=e.exports=UAParser),t.UAParser=UAParser):n.amdO?a!==(o=(function(){return UAParser}).call(t,n,t,e))&&(e.exports=o):typeof i!==c&&(i.UAParser=UAParser);var H=typeof i!==c&&(i.jQuery||i.Zepto);if(H&&!H.ua){var G=new UAParser;H.ua=G.getResult(),H.ua.get=function(){return G.getUA()},H.ua.set=function(e){G.setUA(e);var t=G.getResult();for(var n in t)H.ua[n]=t[n]}}}("object"==typeof window?window:this)},49729:function(e,t,n){"use strict";n.d(t,{W:function(){return lightTheme}});var o=n(80239),i={blue:{accentColor:"#0E76FD",accentColorForeground:"#FFF"},green:{accentColor:"#1DB847",accentColorForeground:"#FFF"},orange:{accentColor:"#FF801F",accentColorForeground:"#FFF"},pink:{accentColor:"#FF5CA0",accentColorForeground:"#FFF"},purple:{accentColor:"#5F5AFA",accentColorForeground:"#FFF"},red:{accentColor:"#FA423C",accentColorForeground:"#FFF"}},a=i.blue,lightTheme=({accentColor:e=a.accentColor,accentColorForeground:t=a.accentColorForeground,...n}={})=>({...(0,o.w)(n),colors:{accentColor:e,accentColorForeground:t,actionButtonBorder:"rgba(0, 0, 0, 0.04)",actionButtonBorderMobile:"rgba(0, 0, 0, 0.06)",actionButtonSecondaryBackground:"rgba(0, 0, 0, 0.06)",closeButton:"rgba(60, 66, 66, 0.8)",closeButtonBackground:"rgba(0, 0, 0, 0.06)",connectButtonBackground:"#FFF",connectButtonBackgroundError:"#FF494A",connectButtonInnerBackground:"linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))",connectButtonText:"#25292E",connectButtonTextError:"#FFF",connectionIndicator:"#30E000",downloadBottomCardBackground:"linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF",downloadTopCardBackground:"linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF",error:"#FF494A",generalBorder:"rgba(0, 0, 0, 0.06)",generalBorderDim:"rgba(0, 0, 0, 0.03)",menuItemBackground:"rgba(60, 66, 66, 0.1)",modalBackdrop:"rgba(0, 0, 0, 0.3)",modalBackground:"#FFF",modalBorder:"transparent",modalText:"#25292E",modalTextDim:"rgba(60, 66, 66, 0.3)",modalTextSecondary:"rgba(60, 66, 66, 0.6)",profileAction:"#FFF",profileActionHover:"rgba(255, 255, 255, 0.5)",profileForeground:"rgba(60, 66, 66, 0.06)",selectedOptionBorder:"rgba(60, 66, 66, 0.1)",standby:"#FFD641"},shadows:{connectButton:"0px 4px 12px rgba(0, 0, 0, 0.1)",dialog:"0px 8px 32px rgba(0, 0, 0, 0.32)",profileDetailsAction:"0px 2px 6px rgba(37, 41, 46, 0.04)",selectedOption:"0px 2px 6px rgba(0, 0, 0, 0.24)",selectedWallet:"0px 2px 6px rgba(0, 0, 0, 0.12)",walletLogo:"0px 2px 16px rgba(0, 0, 0, 0.16)"}});lightTheme.accentColors=i},80239:function(e,t,n){"use strict";n.d(t,{w:function(){return baseTheme}});var o='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',i={rounded:`SFRounded, ui-rounded, "SF Pro Rounded", ${o}`,system:o},a={large:{actionButton:"9999px",connectButton:"12px",modal:"24px",modalMobile:"28px"},medium:{actionButton:"10px",connectButton:"8px",modal:"16px",modalMobile:"18px"},none:{actionButton:"0px",connectButton:"0px",modal:"0px",modalMobile:"0px"},small:{actionButton:"4px",connectButton:"4px",modal:"8px",modalMobile:"8px"}},s={large:{modalOverlay:"blur(20px)"},none:{modalOverlay:"blur(0px)"},small:{modalOverlay:"blur(4px)"}},baseTheme=({borderRadius:e="large",fontStack:t="rounded",overlayBlur:n="none"})=>({blurs:{modalOverlay:s[n].modalOverlay},fonts:{body:i[t]},radii:{actionButton:a[e].actionButton,connectButton:a[e].connectButton,menuButton:a[e].connectButton,modal:a[e].modal,modalMobile:a[e].modalMobile}})},27957:function(e,t,n){"use strict";n.d(t,{I:function(){return o}});var o=`{
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
`},7868:function(e,t,n){"use strict";n.d(t,{J:function(){return readContracts}});var o=n(94761),i=n(62132),a=n(31849);async function multicall_multicall(e,t){let{allowFailure:n=!0,chainId:o,contracts:s,...c}=t,l=e.getClient({chainId:o}),u=(0,a.s)(l,i.A,"multicall");return u({allowFailure:n,contracts:s,...c})}var s=n(43833);async function readContracts(e,t){let{allowFailure:n=!0,blockNumber:i,blockTag:c,...l}=t,u=t.contracts;try{let t={};for(let[n,o]of u.entries()){let i=o.chainId??e.state.chainId;t[i]||(t[i]=[]),t[i]?.push({contract:o,index:n})}let o=(await Promise.all(Object.entries(t).map(([t,o])=>multicall_multicall(e,{...l,allowFailure:n,blockNumber:i,blockTag:c,chainId:Number.parseInt(t),contracts:o.map(({contract:e})=>e)})))).flat(),a=Object.values(t).flatMap(e=>e.map(({index:e})=>e));return o.reduce((e,t,n)=>(e&&(e[a[n]]=t),e),[])}catch(t){if(t instanceof o.uq)throw t;let promises=()=>u.map(t=>(function(e,t){let{chainId:n,...o}=t,i=e.getClient({chainId:n}),c=(0,a.s)(i,s.L,"readContract");return c(o)})(e,{...t,blockNumber:i,blockTag:c}));if(n)return(await Promise.allSettled(promises())).map(e=>"fulfilled"===e.status?{result:e.value,status:"success"}:{error:e.reason,result:void 0,status:"failure"});return await Promise.all(promises())}}},31849:function(e,t,n){"use strict";function getAction(e,t,n){let o=e[t.name];if("function"==typeof o)return o;let i=e[n];return"function"==typeof i?i:n=>t(e,n)}n.d(t,{s:function(){return getAction}})},62856:function(e,t,n){"use strict";t.Z=function(){for(var e,t,n=0,o="",i=arguments.length;n<i;n++)(e=arguments[n])&&(t=function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n)}else for(n in e)e[n]&&(o&&(o+=" "),o+=n)}return o}(e))&&(o&&(o+=" "),o+=t);return o}},74158:function(e,t,n){"use strict";n.r(t),n.d(t,{__addDisposableResource:function(){return __addDisposableResource},__assign:function(){return __assign},__asyncDelegator:function(){return __asyncDelegator},__asyncGenerator:function(){return __asyncGenerator},__asyncValues:function(){return __asyncValues},__await:function(){return __await},__awaiter:function(){return __awaiter},__classPrivateFieldGet:function(){return __classPrivateFieldGet},__classPrivateFieldIn:function(){return __classPrivateFieldIn},__classPrivateFieldSet:function(){return __classPrivateFieldSet},__createBinding:function(){return o},__decorate:function(){return __decorate},__disposeResources:function(){return __disposeResources},__esDecorate:function(){return __esDecorate},__exportStar:function(){return __exportStar},__extends:function(){return __extends},__generator:function(){return __generator},__importDefault:function(){return __importDefault},__importStar:function(){return __importStar},__makeTemplateObject:function(){return __makeTemplateObject},__metadata:function(){return __metadata},__param:function(){return __param},__propKey:function(){return __propKey},__read:function(){return __read},__rest:function(){return __rest},__rewriteRelativeImportExtension:function(){return __rewriteRelativeImportExtension},__runInitializers:function(){return __runInitializers},__setFunctionName:function(){return __setFunctionName},__spread:function(){return __spread},__spreadArray:function(){return __spreadArray},__spreadArrays:function(){return __spreadArrays},__values:function(){return __values}});var extendStatics=function(e,t){return(extendStatics=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};function __extends(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function __(){this.constructor=e}extendStatics(e,t),e.prototype=null===t?Object.create(t):(__.prototype=t.prototype,new __)}var __assign=function(){return(__assign=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};function __rest(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&0>t.indexOf(o)&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)0>t.indexOf(o[i])&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n}function __decorate(e,t,n,o){var i,a=arguments.length,s=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,o);else for(var c=e.length-1;c>=0;c--)(i=e[c])&&(s=(a<3?i(s):a>3?i(t,n,s):i(t,n))||s);return a>3&&s&&Object.defineProperty(t,n,s),s}function __param(e,t){return function(n,o){t(n,o,e)}}function __esDecorate(e,t,n,o,i,a){function accept(e){if(void 0!==e&&"function"!=typeof e)throw TypeError("Function expected");return e}for(var s,c=o.kind,l="getter"===c?"get":"setter"===c?"set":"value",u=!t&&e?o.static?e:e.prototype:null,p=t||(u?Object.getOwnPropertyDescriptor(u,o.name):{}),d=!1,f=n.length-1;f>=0;f--){var h={};for(var w in o)h[w]="access"===w?{}:o[w];for(var w in o.access)h.access[w]=o.access[w];h.addInitializer=function(e){if(d)throw TypeError("Cannot add initializers after decoration has completed");a.push(accept(e||null))};var A=(0,n[f])("accessor"===c?{get:p.get,set:p.set}:p[l],h);if("accessor"===c){if(void 0===A)continue;if(null===A||"object"!=typeof A)throw TypeError("Object expected");(s=accept(A.get))&&(p.get=s),(s=accept(A.set))&&(p.set=s),(s=accept(A.init))&&i.unshift(s)}else(s=accept(A))&&("field"===c?i.unshift(s):p[l]=s)}u&&Object.defineProperty(u,o.name,p),d=!0}function __runInitializers(e,t,n){for(var o=arguments.length>2,i=0;i<t.length;i++)n=o?t[i].call(e,n):t[i].call(e);return o?n:void 0}function __propKey(e){return"symbol"==typeof e?e:"".concat(e)}function __setFunctionName(e,t,n){return"symbol"==typeof t&&(t=t.description?"[".concat(t.description,"]"):""),Object.defineProperty(e,"name",{configurable:!0,value:n?"".concat(n," ",t):t})}function __metadata(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function __awaiter(e,t,n,o){return new(n||(n=Promise))(function(i,a){function fulfilled(e){try{step(o.next(e))}catch(e){a(e)}}function rejected(e){try{step(o.throw(e))}catch(e){a(e)}}function step(e){var t;e.done?i(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(fulfilled,rejected)}step((o=o.apply(e,t||[])).next())})}function __generator(e,t){var n,o,i,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]},s=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return s.next=verb(0),s.throw=verb(1),s.return=verb(2),"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function verb(c){return function(l){return function(c){if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(a=0)),a;)try{if(n=1,o&&(i=2&c[0]?o.return:c[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,c[1])).done)return i;switch(o=0,i&&(c=[2&c[0],i.value]),c[0]){case 0:case 1:i=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,o=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===c[0]||2===c[0])){a=0;continue}if(3===c[0]&&(!i||c[1]>i[0]&&c[1]<i[3])){a.label=c[1];break}if(6===c[0]&&a.label<i[1]){a.label=i[1],i=c;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(c);break}i[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],o=0}finally{n=i=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,l])}}}var o=Object.create?function(e,t,n,o){void 0===o&&(o=n);var i=Object.getOwnPropertyDescriptor(t,n);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,o,i)}:function(e,t,n,o){void 0===o&&(o=n),e[o]=t[n]};function __exportStar(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||o(t,e,n)}function __values(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],o=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function __read(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var o,i,a=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(o=a.next()).done;)s.push(o.value)}catch(e){i={error:e}}finally{try{o&&!o.done&&(n=a.return)&&n.call(a)}finally{if(i)throw i.error}}return s}function __spread(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(__read(arguments[t]));return e}function __spreadArrays(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;for(var o=Array(e),i=0,t=0;t<n;t++)for(var a=arguments[t],s=0,c=a.length;s<c;s++,i++)o[i]=a[s];return o}function __spreadArray(e,t,n){if(n||2==arguments.length)for(var o,i=0,a=t.length;i<a;i++)!o&&i in t||(o||(o=Array.prototype.slice.call(t,0,i)),o[i]=t[i]);return e.concat(o||Array.prototype.slice.call(t))}function __await(e){return this instanceof __await?(this.v=e,this):new __await(e)}function __asyncGenerator(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var o,i=n.apply(e,t||[]),a=[];return o=Object.create(("function"==typeof AsyncIterator?AsyncIterator:Object).prototype),verb("next"),verb("throw"),verb("return",function(e){return function(t){return Promise.resolve(t).then(e,reject)}}),o[Symbol.asyncIterator]=function(){return this},o;function verb(e,t){i[e]&&(o[e]=function(t){return new Promise(function(n,o){a.push([e,t,n,o])>1||resume(e,t)})},t&&(o[e]=t(o[e])))}function resume(e,t){try{var n;(n=i[e](t)).value instanceof __await?Promise.resolve(n.value.v).then(fulfill,reject):settle(a[0][2],n)}catch(e){settle(a[0][3],e)}}function fulfill(e){resume("next",e)}function reject(e){resume("throw",e)}function settle(e,t){e(t),a.shift(),a.length&&resume(a[0][0],a[0][1])}}function __asyncDelegator(e){var t,n;return t={},verb("next"),verb("throw",function(e){throw e}),verb("return"),t[Symbol.iterator]=function(){return this},t;function verb(o,i){t[o]=e[o]?function(t){return(n=!n)?{value:__await(e[o](t)),done:!1}:i?i(t):t}:i}}function __asyncValues(e){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e=__values(e),t={},verb("next"),verb("throw"),verb("return"),t[Symbol.asyncIterator]=function(){return this},t);function verb(n){t[n]=e[n]&&function(t){return new Promise(function(o,i){!function(e,t,n,o){Promise.resolve(o).then(function(t){e({value:t,done:n})},t)}(o,i,(t=e[n](t)).done,t.value)})}}}function __makeTemplateObject(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var i=Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t},ownKeys=function(e){return(ownKeys=Object.getOwnPropertyNames||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[t.length]=n);return t})(e)};function __importStar(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n=ownKeys(e),a=0;a<n.length;a++)"default"!==n[a]&&o(t,e,n[a]);return i(t,e),t}function __importDefault(e){return e&&e.__esModule?e:{default:e}}function __classPrivateFieldGet(e,t,n,o){if("a"===n&&!o)throw TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!o:!t.has(e))throw TypeError("Cannot read private member from an object whose class did not declare it");return"m"===n?o:"a"===n?o.call(e):o?o.value:t.get(e)}function __classPrivateFieldSet(e,t,n,o,i){if("m"===o)throw TypeError("Private method is not writable");if("a"===o&&!i)throw TypeError("Private accessor was defined without a setter");if("function"==typeof t?e!==t||!i:!t.has(e))throw TypeError("Cannot write private member to an object whose class did not declare it");return"a"===o?i.call(e,n):i?i.value=n:t.set(e,n),n}function __classPrivateFieldIn(e,t){if(null===t||"object"!=typeof t&&"function"!=typeof t)throw TypeError("Cannot use 'in' operator on non-object");return"function"==typeof e?t===e:e.has(t)}function __addDisposableResource(e,t,n){if(null!=t){var o,i;if("object"!=typeof t&&"function"!=typeof t)throw TypeError("Object expected.");if(n){if(!Symbol.asyncDispose)throw TypeError("Symbol.asyncDispose is not defined.");o=t[Symbol.asyncDispose]}if(void 0===o){if(!Symbol.dispose)throw TypeError("Symbol.dispose is not defined.");o=t[Symbol.dispose],n&&(i=o)}if("function"!=typeof o)throw TypeError("Object not disposable.");i&&(o=function(){try{i.call(this)}catch(e){return Promise.reject(e)}}),e.stack.push({value:t,dispose:o,async:n})}else n&&e.stack.push({async:!0});return t}var a="function"==typeof SuppressedError?SuppressedError:function(e,t,n){var o=Error(n);return o.name="SuppressedError",o.error=e,o.suppressed=t,o};function __disposeResources(e){function fail(t){e.error=e.hasError?new a(t,e.error,"An error was suppressed during disposal."):t,e.hasError=!0}var t,n=0;return function next(){for(;t=e.stack.pop();)try{if(!t.async&&1===n)return n=0,e.stack.push(t),Promise.resolve().then(next);if(t.dispose){var o=t.dispose.call(t.value);if(t.async)return n|=2,Promise.resolve(o).then(next,function(e){return fail(e),next()})}else n|=1}catch(e){fail(e)}if(1===n)return e.hasError?Promise.reject(e.error):Promise.resolve();if(e.hasError)throw e.error}()}function __rewriteRelativeImportExtension(e,t){return"string"==typeof e&&/^\.\.?\//.test(e)?e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,function(e,n,o,i,a){return n?t?".jsx":".js":!o||i&&a?o+i+"."+a.toLowerCase()+"js":e}):e}t.default={__extends,__assign,__rest,__decorate,__param,__esDecorate,__runInitializers,__propKey,__setFunctionName,__metadata,__awaiter,__generator,__createBinding:o,__exportStar,__values,__read,__spread,__spreadArrays,__spreadArray,__await,__asyncGenerator,__asyncDelegator,__asyncValues,__makeTemplateObject,__importStar,__importDefault,__classPrivateFieldGet,__classPrivateFieldSet,__classPrivateFieldIn,__addDisposableResource,__disposeResources,__rewriteRelativeImportExtension}},33561:function(e,t,n){"use strict";let o,i,a,s,c,l,u,p,d,f,h,w,A,g,m;n.d(t,{F:function(){return normalize_normalize}});let y=new Map([[8217,"apostrophe"],[8260,"fraction slash"],[12539,"middle dot"]]);function read_compressed_payload(e){var t;let n;return t=function(e){let t=0;function u16(){return e[t++]<<8|e[t++]}let n=u16(),o=1,i=[0,1];for(let e=1;e<n;e++)i.push(o+=u16());let a=u16(),s=t;t+=a;let c=0,l=0;function read_bit(){return 0==c&&(l=l<<8|e[t++],c=8),l>>--c&1}let u=2147483648-1,p=0;for(let e=0;e<31;e++)p=p<<1|read_bit();let d=[],f=0,h=2147483648;for(;;){let e=Math.floor(((p-f+1)*o-1)/h),t=0,a=n;for(;a-t>1;){let n=t+a>>>1;e<i[n]?a=n:t=n}if(0==t)break;d.push(t);let s=f+Math.floor(h*i[t]/o),c=f+Math.floor(h*i[t+1]/o)-1;for(;((s^c)&1073741824)==0;)p=p<<1&u|read_bit(),s=s<<1&u,c=c<<1&u|1;for(;s&~c&536870912;)p=1073741824&p|p<<1&u>>>1|read_bit(),s=s<<1^1073741824,c=(1073741824^c)<<1|1073741825;f=s,h=1+c-s}let w=n-4;return d.map(t=>{switch(t-w){case 3:return w+65792+(e[s++]<<16|e[s++]<<8|e[s++]);case 2:return w+256+(e[s++]<<8|e[s++]);case 1:return w+e[s++];default:return t-1}})}(function(e){let t=[];[..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((e,n)=>t[e.charCodeAt(0)]=n);let n=e.length,o=new Uint8Array(6*n>>3);for(let i=0,a=0,s=0,c=0;i<n;i++)c=c<<6|t[e.charCodeAt(i)],(s+=6)>=8&&(o[a++]=c>>(s-=8));return o}(e)),n=0,()=>t[n++]}function read_sorted(e,t=0){let n=[];for(;;){let o=e(),i=e();if(!i)break;t+=o;for(let e=0;e<i;e++)n.push(t+e);t+=i+1}return n}function read_sorted_arrays(e){return read_array_while(()=>{let t=read_sorted(e);if(t.length)return t})}function read_mapped(e){let t=[];for(;;){let n=e();if(0==n)break;t.push(function(e,t){let n=1+t(),o=t(),i=read_array_while(t);return read_transposed(i.length,1+e,t).flatMap((e,t)=>{let[a,...s]=e;return Array(i[t]).fill().map((e,t)=>{let i=t*o;return[a+t*n,s.map(e=>e+i)]})})}(n,e))}for(;;){let n=e()-1;if(n<0)break;t.push(read_transposed(1+e(),1+n,e).map(e=>[e[0],e.slice(1)]))}return t.flat()}function read_array_while(e){let t=[];for(;;){let n=e(t.length);if(!n)break;t.push(n)}return t}function read_transposed(e,t,n){let o=Array(e).fill().map(()=>[]);for(let i=0;i<t;i++)(function(e,t){let n=Array(e);for(let i=0,a=0;i<e;i++){var o;n[i]=a+=1&(o=t())?~o>>1:o>>1}return n})(e,n).forEach((e,t)=>o[t].push(e));return o}function quote_cp(e){return`{${e.toString(16).toUpperCase().padStart(2,"0")}}`}function str_from_cps(e){let t=e.length;if(t<4096)return String.fromCodePoint(...e);let n=[];for(let o=0;o<t;)n.push(String.fromCodePoint(...e.slice(o,o+=4096)));return n.join("")}function compare_arrays(e,t){let n=e.length,o=n-t.length;for(let i=0;0==o&&i<n;i++)o=e[i]-t[i];return o}function unpack_cc(e){return e>>24&255}function unpack_cp(e){return 16777215&e}function is_hangul(e){return e>=44032&&e<55204}function decomposed(e){o||function(){let e=read_compressed_payload("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");for(let[t,n]of(o=new Map(read_sorted_arrays(e).flatMap((e,t)=>e.map(e=>[e,t+1<<24]))),i=new Set(read_sorted(e)),a=new Map,s=new Map,read_mapped(e))){if(!i.has(t)&&2==n.length){let[e,o]=n,i=s.get(e);i||(i=new Map,s.set(e,i)),i.set(o,t)}a.set(t,n.reverse())}}();let t=[],n=[],c=!1;function add(e){let n=o.get(e);n&&(c=!0,e|=n),t.push(e)}for(let o of e)for(;;){if(o<128)t.push(o);else if(is_hangul(o)){let e=o-44032,t=e/588|0,n=e%588/28|0,i=e%28;add(4352+t),add(4449+n),i>0&&add(4519+i)}else{let e=a.get(o);e?n.push(...e):add(o)}if(!n.length)break;o=n.pop()}if(c&&t.length>1){let e=unpack_cc(t[0]);for(let n=1;n<t.length;n++){let o=unpack_cc(t[n]);if(0==o||e<=o){e=o;continue}let i=n-1;for(;;){let n=t[i+1];if(t[i+1]=t[i],t[i]=n,!i||(e=unpack_cc(t[--i]))<=o)break}e=unpack_cc(t[n])}}return t}function nfc(e){return function(e){let t=[],n=[],o=-1,i=0;for(let a of e){let e=unpack_cc(a),c=unpack_cp(a);if(-1==o)0==e?o=c:t.push(c);else if(i>0&&i>=e)0==e?(t.push(o,...n),n.length=0,o=c):n.push(c),i=e;else{let a=function(e,t){if(e>=4352&&e<4371&&t>=4449&&t<4470)return 44032+(e-4352)*588+(t-4449)*28;if(is_hangul(e)&&t>4519&&t<4547&&(e-44032)%28==0)return e+(t-4519);{let n=s.get(e);return n&&(n=n.get(t))?n:-1}}(o,c);a>=0?o=a:0==i&&0==e?(t.push(o),o=c):(n.push(c),i=e)}}return o>=0&&t.push(o,...n),t}(decomposed(e))}let Array_from=e=>Array.from(e);function group_has_cp(e,t){return e.P.has(t)||e.Q.has(t)}let Emoji=class Emoji extends Array{get is_emoji(){return!0}};function init(){let e,t;if(c)return;let n=read_compressed_payload("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"),read_sorted_array=()=>read_sorted(n),read_sorted_set=()=>new Set(read_sorted_array()),set_add_many=(e,t)=>t.forEach(t=>e.add(t));c=new Map(read_mapped(n)),l=read_sorted_set(),u=read_sorted_array(),p=new Set(read_sorted_array().map(e=>u[e])),u=new Set(u),d=read_sorted_set(),read_sorted_set();let o=read_sorted_arrays(n),i=n(),read_chunked=()=>{let e=new Set;return read_sorted_array().forEach(t=>set_add_many(e,o[t])),set_add_many(e,read_sorted_array()),e};f=read_array_while(e=>{let t=read_array_while(n).map(e=>e+96);if(t.length){let o=e>=i;return t[0]-=32,t=str_from_cps(t),o&&(t=`Restricted[${t}]`),{N:t,P:read_chunked(),Q:read_chunked(),M:!n(),R:o}}}),h=read_sorted_set(),w=new Map;let a=read_sorted_array().concat(Array_from(h)).sort((e,t)=>e-t);for(let{V:e,M:t}of(a.forEach((e,t)=>{let o=n(),i=a[t]=o?a[t-o]:{V:[],M:new Map};i.V.push(e),h.has(e)||w.set(e,i)}),new Set(w.values()))){let n=[];for(let t of e){let e=f.filter(e=>group_has_cp(e,t)),o=n.find(({G:t})=>e.some(e=>t.has(e)));o||(o={G:new Set,V:[]},n.push(o)),o.V.push(t),set_add_many(o.G,e)}let o=n.flatMap(e=>Array_from(e.G));for(let{G:e,V:i}of n){let n=new Set(o.filter(t=>!e.has(t)));for(let e of i)t.set(e,n)}}A=new Set;let s=new Set,add_to_union=e=>A.has(e)?s.add(e):A.add(e);for(let e of f){for(let t of e.P)add_to_union(t);for(let t of e.Q)add_to_union(t)}for(let e of A)w.has(e)||s.has(e)||w.set(e,1);for(let o of(set_add_many(A,decomposed(A).map(unpack_cp)),g=(e=[],t=read_sorted(n),function expand({S:t,B:n},o,i){if(!(4&t)||i!==o[o.length-1])for(let a of(2&t&&(i=o[o.length-1]),1&t&&e.push(o),n))for(let e of a.Q)expand(a,[...o,e],i)}(function decode(e){return{S:n(),B:read_array_while(()=>{let e=read_sorted(n).map(e=>t[e]);if(e.length)return decode(e)}),Q:e}}([]),[]),e).map(e=>Emoji.from(e)).sort(compare_arrays),m=new Map,g)){let e=[m];for(let t of o){let n=e.map(e=>{let n=e.get(t);return n||(n=new Map,e.set(t,n)),n});65039===t?e.push(...n):e=n}for(let t of e)t.V=o}}function quoted_cp(e){return(should_escape(e)?"":`${bidi_qq(safe_str_from_cps([e]))} `)+quote_cp(e)}function bidi_qq(e){return`"${e}"\u200E`}function safe_str_from_cps(e,t=1/0,n=quote_cp){var o;let i=[];o=e[0],init(),u.has(o)&&i.push("◌"),e.length>t&&(t>>=1,e=[...e.slice(0,t),8230,...e.slice(-t)]);let a=0,s=e.length;for(let t=0;t<s;t++){let o=e[t];should_escape(o)&&(i.push(str_from_cps(e.slice(a,t))),i.push(n(o)),a=t+1)}return i.push(str_from_cps(e.slice(a,s))),i.join("")}function should_escape(e){return init(),d.has(e)}function error_disallowed(e){return Error(`disallowed character: ${quoted_cp(e)}`)}function error_group_member(e,t){let n=quoted_cp(t),o=f.find(e=>e.P.has(t));return o&&(n=`${o.N} ${n}`),Error(`illegal mixture: ${e.N} + ${n}`)}function error_placement(e){return Error(`illegal placement: ${e}`)}function filter_fe0f(e){return e.filter(e=>65039!=e)}function normalize_normalize(e){var t;return(t=function(e,t,n){if(!e)return[];init();let o=0;return e.split(".").map(e=>{let i=function(e){let t=[];for(let n=0,o=e.length;n<o;){let o=e.codePointAt(n);n+=o<65536?1:2,t.push(o)}return t}(e),a={input:i,offset:o};o+=i.length+1;try{let e,o=a.tokens=function(e,t,n){let o=[],i=[];for(e=e.slice().reverse();e.length;){let a=function(e,t){let n,o=m,i=e.length;for(;i&&(o=o.get(e[--i]));){let{V:a}=o;a&&(n=a,t&&t.push(...e.slice(i).reverse()),e.length=i)}return n}(e);if(a)i.length&&(o.push(t(i)),i=[]),o.push(n(a));else{let t=e.pop();if(A.has(t))i.push(t);else{let e=c.get(t);if(e)i.push(...e);else if(!l.has(t))throw error_disallowed(t)}}}return i.length&&o.push(t(i)),o}(i,t,n),s=o.length;if(!s)throw Error("empty label");let d=a.output=o.flat();if(!function(e){for(let t=e.lastIndexOf(95);t>0;)if(95!==e[--t])throw Error("underscore allowed only at start")}(d),!(a.emoji=s>1||o[0].is_emoji)&&d.every(e=>e<128))!function(e){if(e.length>=4&&45==e[2]&&45==e[3])throw Error(`invalid label extension: "${str_from_cps(e.slice(0,4))}"`)}(d),e="ASCII";else{let t=o.flatMap(e=>e.is_emoji?[]:e);if(t.length){if(u.has(d[0]))throw error_placement("leading combining mark");for(let e=1;e<s;e++){let t=o[e];if(!t.is_emoji&&u.has(t[0]))throw error_placement(`emoji + combining mark: "${str_from_cps(o[e-1])} + ${safe_str_from_cps([t[0]])}"`)}!function(e){let t=e[0],n=y.get(t);if(n)throw error_placement(`leading ${n}`);let o=e.length,i=-1;for(let a=1;a<o;a++){t=e[a];let o=y.get(t);if(o){if(i==a)throw error_placement(`${n} + ${o}`);i=a+1,n=o}}if(i==o)throw error_placement(`trailing ${n}`)}(d);let n=Array_from(new Set(t)),[i]=function(e){let t=f;for(let n of e){let e=t.filter(e=>group_has_cp(e,n));if(!e.length){if(f.some(e=>group_has_cp(e,n)))throw error_group_member(t[0],n);throw error_disallowed(n)}if(t=e,1==e.length)break}return t}(n);(function(e,t){for(let n of t)if(!group_has_cp(e,n))throw error_group_member(e,n);if(e.M){let e=decomposed(t).map(unpack_cp);for(let t=1,n=e.length;t<n;t++)if(p.has(e[t])){let o=t+1;for(let i;o<n&&p.has(i=e[o]);o++)for(let n=t;n<o;n++)if(e[n]==i)throw Error(`duplicate non-spacing marks: ${quoted_cp(i)}`);if(o-t>4)throw Error(`excessive non-spacing marks: ${bidi_qq(safe_str_from_cps(e.slice(t-1,o)))} (${o-t}/4)`);t=o}}})(i,t),function(e,t){let n;let o=[];for(let e of t){let t=w.get(e);if(1===t)return;if(t){let o=t.M.get(e);if(!(n=n?n.filter(e=>o.has(e)):Array_from(o)).length)return}else o.push(e)}if(n){for(let t of n)if(o.every(e=>group_has_cp(t,e)))throw Error(`whole-script confusable: ${e.N}/${t.N}`)}}(i,n),e=i.N}else e="Emoji"}a.type=e}catch(e){a.error=e}return a})}(e,nfc,filter_fe0f)).map(({input:e,error:n,output:o})=>{if(n){let o=n.message;throw Error(1==t.length?o:`Invalid label ${bidi_qq(safe_str_from_cps(e,63))}: ${o}`)}return str_from_cps(o)}).join(".")}},70904:function(e,t,n){"use strict";n.d(t,{E:function(){return useAccountEffect}});var o=n(31998),i=n(77317),a=n(92738);function useAccountEffect(e={}){let{onConnect:t,onDisconnect:n}=e,s=(0,a.Z)(e);(0,i.useEffect)(()=>(0,o.u)(s,{onChange(e,o){if(("reconnecting"===o.status||"connecting"===o.status&&void 0===o.address)&&"connected"===e.status){let{address:n,addresses:i,chain:a,chainId:s,connector:c}=e,l="reconnecting"===o.status||void 0===o.status;t?.({address:n,addresses:i,chain:a,chainId:s,connector:c,isReconnected:l})}else"connected"===o.status&&"disconnected"===e.status&&n?.()}}),[s,t,n])}},70704:function(e,t,n){"use strict";n.d(t,{K:function(){return useBalance}});var o=n(20638),i=n(24770),a=n(93469),s=n(32320),c=n(31849),l=n(89345);function getUnit(e){return"number"==typeof e?e:"wei"===e?0:Math.abs(l.Bd[e])}var u=n(7868);async function getBalance_getBalance(e,t){let{address:n,blockNumber:l,blockTag:u,chainId:p,token:d,unit:f="ether"}=t;if(d)try{return await getTokenBalance(e,{balanceAddress:n,chainId:p,symbolType:"string",tokenAddress:d})}catch(t){if("ContractFunctionExecutionError"===t.name){let t=await getTokenBalance(e,{balanceAddress:n,chainId:p,symbolType:"bytes32",tokenAddress:d}),a=(0,o.rR)((0,i.f)(t.symbol,{dir:"right"}));return{...t,symbol:a}}throw t}let h=e.getClient({chainId:p}),w=(0,c.s)(h,s.s,"getBalance"),A=await w(l?{address:n,blockNumber:l}:{address:n,blockTag:u}),g=e.chains.find(e=>e.id===p)??h.chain;return{decimals:g.nativeCurrency.decimals,formatted:(0,a.b)(A,getUnit(f)),symbol:g.nativeCurrency.symbol,value:A}}async function getTokenBalance(e,t){let{balanceAddress:n,chainId:o,symbolType:i,tokenAddress:s,unit:c}=t,l={abi:[{type:"function",name:"balanceOf",stateMutability:"view",inputs:[{type:"address"}],outputs:[{type:"uint256"}]},{type:"function",name:"decimals",stateMutability:"view",inputs:[],outputs:[{type:"uint8"}]},{type:"function",name:"symbol",stateMutability:"view",inputs:[],outputs:[{type:i}]}],address:s},[p,d,f]=await (0,u.J)(e,{allowFailure:!1,contracts:[{...l,functionName:"balanceOf",args:[n],chainId:o},{...l,functionName:"decimals",chainId:o},{...l,functionName:"symbol",chainId:o}]}),h=(0,a.b)(p??"0",getUnit(c??d));return{decimals:d,formatted:h,symbol:f,value:p}}var p=n(15707),d=n(9520),f=n(55812),h=n(92738);function useBalance(e={}){let{address:t,query:n={}}=e,o=(0,h.Z)(e),i=(0,f.x)({config:o}),a=function(e,t={}){return{async queryFn({queryKey:t}){let{address:n,scopeKey:o,...i}=t[1];if(!n)throw Error("address is required");let a=await getBalance_getBalance(e,{...i,address:n});return a??null},queryKey:function(e={}){return["balance",(0,p.OP)(e)]}(t)}}(o,{...e,chainId:e.chainId??i}),s=!!(t&&(n.enabled??!0));return(0,d.aM)({...n,...a,enabled:s})}},45245:function(e,t,n){"use strict";n.d(t,{$:function(){return useConnect}});var o=n(95499),i=n(11043);async function connect(e,t){let n;if((n="function"==typeof t.connector?e._internal.connectors.setup(t.connector):t.connector).uid===e.state.current)throw new i.wi;try{e.setState(e=>({...e,status:"connecting"})),n.emitter.emit("message",{type:"connecting"});let{connector:o,...i}=t,a=await n.connect(i),s=a.accounts;return n.emitter.off("connect",e._internal.events.connect),n.emitter.on("change",e._internal.events.change),n.emitter.on("disconnect",e._internal.events.disconnect),await e.storage?.setItem("recentConnectorId",n.id),e.setState(e=>({...e,connections:new Map(e.connections).set(n.uid,{accounts:s,chainId:a.chainId,connector:n}),current:n.uid,status:"connected"})),{accounts:s,chainId:a.chainId}}catch(t){throw e.setState(e=>({...e,status:e.current?"connected":"disconnected"})),t}}var a=n(77317),s=n(92738),c=n(64401);let l=[];function getConnectors(e){let t=e.connectors;return(0,c.v)(l,t)?l:(l=t,t)}function useConnect(e={}){let{mutation:t}=e,n=(0,s.Z)(e),{mutate:i,mutateAsync:c,...l}=(0,o.D)({...t,mutationFn:e=>connect(n,e),mutationKey:["connect"]});return(0,a.useEffect)(()=>n.subscribe(({status:e})=>e,(e,t)=>{"connected"===t&&"disconnected"===e&&l.reset()}),[n,l.reset]),{...l,connect:i,connectAsync:c,connectors:function(e={}){let t=(0,s.Z)(e);return(0,a.useSyncExternalStore)(e=>(function(e,t){let{onChange:n}=t;return e._internal.connectors.subscribe((e,t)=>{n(Object.values(e),t)})})(t,{onChange:e}),()=>getConnectors(t),()=>getConnectors(t))}({config:n})}}},14530:function(e,t,n){"use strict";n.d(t,{q:function(){return useDisconnect}});var o=n(95499);async function disconnect(e,t={}){let n;if(t.connector)n=t.connector;else{let{connections:t,current:o}=e.state,i=t.get(o);n=i?.connector}let o=e.state.connections;n&&(await n.disconnect(),n.emitter.off("change",e._internal.events.change),n.emitter.off("disconnect",e._internal.events.disconnect),n.emitter.on("connect",e._internal.events.connect),o.delete(n.uid)),e.setState(e=>{if(0===o.size)return{...e,connections:new Map,current:null,status:"disconnected"};let t=o.values().next().value;return{...e,connections:new Map(o),current:t.connector.uid}});{let t=e.state.current;if(!t)return;let n=e.state.connections.get(t)?.connector;if(!n)return;await e.storage?.setItem("recentConnectorId",n.id)}}var i=n(92738),a=n(64401);let s=[];function getConnections(e){let t=[...e.state.connections.values()];return"reconnecting"===e.state.status||(0,a.v)(s,t)?s:(s=t,t)}var c=n(77317);function useDisconnect(e={}){let{mutation:t}=e,n=(0,i.Z)(e),{mutate:s,mutateAsync:l,...u}=(0,o.D)({...t,mutationFn:e=>disconnect(n,e),mutationKey:["disconnect"]});return{...u,connectors:(function(e={}){let t=(0,i.Z)(e);return(0,c.useSyncExternalStore)(e=>(function(e,t){let{onChange:n}=t;return e.subscribe(()=>getConnections(e),n,{equalityFn:a.v})})(t,{onChange:e}),()=>getConnections(t),()=>getConnections(t))})({config:n}).map(e=>e.connector),disconnect:s,disconnectAsync:l}}},41374:function(e,t,n){"use strict";n.d(t,{c:function(){return useEnsAvatar}});var o=n(38393),i=n(31849),a=n(15707),s=n(9520),c=n(55812),l=n(92738);function useEnsAvatar(e={}){let{name:t,query:n={}}=e,u=(0,l.Z)(e),p=(0,c.x)({config:u}),d=function(e,t={}){return{async queryFn({queryKey:t}){let{name:n,scopeKey:a,...s}=t[1];if(!n)throw Error("name is required");return function(e,t){let{chainId:n,...a}=t,s=e.getClient({chainId:n}),c=(0,i.s)(s,o.r,"getEnsAvatar");return c(a)}(e,{...s,name:n})},queryKey:function(e={}){return["ensAvatar",(0,a.OP)(e)]}(t)}}(u,{...e,chainId:e.chainId??p}),f=!!(t&&(n.enabled??!0));return(0,s.aM)({...n,...d,enabled:f})}},86220:function(e,t,n){"use strict";n.d(t,{F:function(){return useEnsName}});var o=n(43597),i=n(31849),a=n(15707),s=n(9520),c=n(55812),l=n(92738);function useEnsName(e={}){let{address:t,query:n={}}=e,u=(0,l.Z)(e),p=(0,c.x)({config:u}),d=function(e,t={}){return{async queryFn({queryKey:t}){let{address:n,scopeKey:a,...s}=t[1];if(!n)throw Error("address is required");return function(e,t){let{chainId:n,...a}=t,s=e.getClient({chainId:n}),c=(0,i.s)(s,o.w,"getEnsName");return c(a)}(e,{...s,address:n})},queryKey:function(e={}){return["ensName",(0,a.OP)(e)]}(t)}}(u,{...e,chainId:e.chainId??p}),f=!!(t&&(n.enabled??!0));return(0,s.aM)({...n,...d,enabled:f})}},19698:function(e,t,n){"use strict";n.d(t,{t:function(){return usePublicClient}});var o=n(89459);function getPublicClient(e,t={}){let n=function(e,t={}){let n;try{n=e.getClient(t)}catch{}return n}(e,t);return n?.extend(o.I)}var i=n(17686),a=n(92738);function usePublicClient(e={}){let t=(0,a.Z)(e);return(0,i.useSyncExternalStoreWithSelector)(e=>(function(e,t){let{onChange:n}=t;return e.subscribe(()=>getPublicClient(e),n,{equalityFn:(e,t)=>e?.uid===t?.uid})})(t,{onChange:e}),()=>getPublicClient(t,e),()=>getPublicClient(t,e),e=>e,(e,t)=>e?.uid===t?.uid)}},87391:function(e,t,n){"use strict";n.d(t,{Q:function(){return useSignMessage}});var o=n(95499),i=n(52014),a=n(31849),s=n(3599);async function signMessage_signMessage(e,t){let n;let{account:o,connector:c,...l}=t;n="object"==typeof o&&"local"===o.type?e.getClient():await (0,s.e)(e,{account:o,connector:c});let u=(0,a.s)(n,i.l,"signMessage");return u({...l,...o?{account:o}:{}})}var c=n(92738);function useSignMessage(e={}){let{mutation:t}=e,n=(0,c.Z)(e),{mutate:i,mutateAsync:a,...s}=(0,o.D)({...t,mutationFn:e=>signMessage_signMessage(n,e),mutationKey:["signMessage"]});return{...s,signMessage:i,signMessageAsync:a}}}}]);