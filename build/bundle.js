var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function o(e){e.forEach(t)}function a(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function l(e,t){e.appendChild(t)}function i(e,t,n){e.insertBefore(t,n||null)}function s(e){e.parentNode.removeChild(e)}function u(e){return document.createElement(e)}function c(e){return document.createTextNode(e)}function d(){return c(" ")}function p(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function m(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function f(e,t){t=""+t,e.data!==t&&(e.data=t)}function h(e,t){(null!=t||e.value)&&(e.value=t)}function g(e,t,n,o){e.style.setProperty(t,n,o?"important":"")}let b;function k(e){b=e}function w(){if(!b)throw new Error("Function called outside component initialization");return b}function v(){const e=w();return(t,n)=>{const o=e.$$.callbacks[t];if(o){const a=function(e,t){const n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!1,!1,t),n}(t,n);o.slice().forEach(t=>{t.call(e,a)})}}}const $=[],y=[],x=[],z=[],j=Promise.resolve();let C=!1;function _(e){x.push(e)}function E(){const e=new Set;do{for(;$.length;){const e=$.shift();k(e),L(e.$$)}for(;y.length;)y.pop()();for(let t=0;t<x.length;t+=1){const n=x[t];e.has(n)||(n(),e.add(n))}x.length=0}while($.length);for(;z.length;)z.pop()();C=!1}function L(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(_)}}const T=new Set;let q;function A(){q={r:0,c:[],p:q}}function D(){q.r||o(q.c),q=q.p}function M(e,t){e&&e.i&&(T.delete(e),e.i(t))}function I(e,t,n,o){if(e&&e.o){if(T.has(e))return;T.add(e),q.c.push(()=>{T.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}}function N(e){e&&e.c()}function S(e,n,r){const{fragment:l,on_mount:i,on_destroy:s,after_update:u}=e.$$;l&&l.m(n,r),_(()=>{const n=i.map(t).filter(a);s?s.push(...n):o(n),e.$$.on_mount=[]}),u.forEach(_)}function P(e,t){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function B(e,t){-1===e.$$.dirty[0]&&($.push(e),C||(C=!0,j.then(E)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function O(t,a,r,l,i,s,u=[-1]){const c=b;k(t);const d=a.props||{},p=t.$$={fragment:null,ctx:null,props:s,update:e,not_equal:i,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:n(),dirty:u};let m=!1;p.ctx=r?r(t,d,(e,n,...o)=>{const a=o.length?o[0]:n;return p.ctx&&i(p.ctx[e],p.ctx[e]=a)&&(p.bound[e]&&p.bound[e](a),m&&B(t,e)),n}):[],p.update(),m=!0,o(p.before_update),p.fragment=!!l&&l(p.ctx),a.target&&(a.hydrate?p.fragment&&p.fragment.l(function(e){return Array.from(e.childNodes)}(a.target)):p.fragment&&p.fragment.c(),a.intro&&M(t.$$.fragment),S(t,a.target,a.anchor),E()),k(c)}class R{$destroy(){P(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}}function U(t){let n,o;return{c(){n=u("div"),o=c(t[0]),m(n,"class","svelte-uk3kzb")},m(e,t){i(e,n,t),l(n,o)},p(e,[t]){1&t&&f(o,e[0])},i:e,o:e,d(e){e&&s(n)}}}function Y(e,t,n){let o,{value:a}=t,{uncovered:r}=t;return e.$set=e=>{"value"in e&&n(1,a=e.value),"uncovered"in e&&n(2,r=e.uncovered)},e.$$.update=()=>{6&e.$$.dirty&&n(0,o=r?a:"")},[o,a,r]}class F extends R{constructor(e){super(),O(this,e,Y,U,r,{value:1,uncovered:2})}}function H(t){let n,o;return{c(){n=u("div"),o=u("div"),m(o,"class","bar svelte-18q98t4"),g(o,"width",Math.ceil(t[0]/t[1]*100)+"%"),m(n,"class","wrapper svelte-18q98t4")},m(e,t){i(e,n,t),l(n,o)},p(e,[t]){3&t&&g(o,"width",Math.ceil(e[0]/e[1]*100)+"%")},i:e,o:e,d(e){e&&s(n)}}}function G(e,t,n){let{value:o}=t,{total:a}=t;return e.$set=e=>{"value"in e&&n(0,o=e.value),"total"in e&&n(1,a=e.total)},[o,a]}class J extends R{constructor(e){super(),O(this,e,G,H,r,{value:0,total:1})}}function K(t){let n,o,a;return{c(){n=u("button"),o=c(t[0]),m(n,"type",t[1]),m(n,"class","svelte-ron3as")},m(e,r){i(e,n,r),l(n,o),a=p(n,"click",t[2])},p(e,[t]){1&t&&f(o,e[0]),2&t&&m(n,"type",e[1])},i:e,o:e,d(e){e&&s(n),a()}}}function Q(e,t,n){let{label:o}=t,{type:a}=t,{onClick:r=(()=>{})}=t;return e.$set=e=>{"label"in e&&n(0,o=e.label),"type"in e&&n(1,a=e.type),"onClick"in e&&n(2,r=e.onClick)},[o,a,r]}class V extends R{constructor(e){super(),O(this,e,Q,K,r,{label:0,type:1,onClick:2})}}function W(e){let t,n,a,r,c,f;const g=new V({props:{type:"submit",label:"Submit"}});return{c(){t=u("form"),n=u("input"),r=d(),N(g.$$.fragment),m(n,"type","text"),m(n,"maxlength",e[0]),m(n,"placeholder",a=Array.from({length:e[0]},X).join("")),m(n,"class","svelte-1iihki3")},m(o,a){i(o,t,a),l(t,n),h(n,e[1]),l(t,r),S(g,t,null),c=!0,f=[p(n,"input",e[4]),p(t,"submit",e[2])]},p(e,[t]){(!c||1&t)&&m(n,"maxlength",e[0]),(!c||1&t&&a!==(a=Array.from({length:e[0]},X).join("")))&&m(n,"placeholder",a),2&t&&n.value!==e[1]&&h(n,e[1])},i(e){c||(M(g.$$.fragment,e),c=!0)},o(e){I(g.$$.fragment,e),c=!1},d(e){e&&s(t),P(g),o(f)}}}const X=()=>"*";function Z(e,t,n){let{desiredLength:o}=t,a="";const r=v();return e.$set=e=>{"desiredLength"in e&&n(0,o=e.desiredLength)},[o,a,function(e){e.preventDefault(),a.length===o&&(r("submit",{value:a}),n(1,a=""))},r,function(){a=this.value,n(1,a)}]}class ee extends R{constructor(e){super(),O(this,e,Z,W,r,{desiredLength:0})}}function te(e,t){const n=setInterval(e,t);var o;return o=()=>{clearInterval(n)},w().$$.on_destroy.push(o),n}function ne(e,t,n){const o=e.slice();return o[15]=t[n],o[17]=n,o}function oe(e){let t;const n=new F({props:{value:e[15],uncovered:e[2].includes(e[17])}});return{c(){N(n.$$.fragment)},m(e,o){S(n,e,o),t=!0},p(e,t){const o={};16&t&&(o.value=e[15]),4&t&&(o.uncovered=e[2].includes(e[17])),n.$set(o)},i(e){t||(M(n.$$.fragment,e),t=!0)},o(e){I(n.$$.fragment,e),t=!1},d(e){P(n,e)}}}function ae(t){let n,o,a,r,p,f,h;return{c(){n=u("div"),n.textContent="Time's up!",o=d(),a=u("div"),r=c("Don't know the word? "),p=u("a"),f=c("Look it up in the dictionary."),g(n,"margin-bottom","1em"),m(p,"href",h="https://www.dictionary.com/browse/"+encodeURIComponent(t[0])),m(p,"class","svelte-7qj2ix")},m(e,t){i(e,n,t),i(e,o,t),i(e,a,t),l(a,r),l(a,p),l(p,f)},p(e,t){1&t&&h!==(h="https://www.dictionary.com/browse/"+encodeURIComponent(e[0]))&&m(p,"href",h)},i:e,o:e,d(e){e&&s(n),e&&s(o),e&&s(a)}}}function re(t){let n;return{c(){n=u("div"),n.textContent="You won!"},m(e,t){i(e,n,t)},p:e,i:e,o:e,d(e){e&&s(n)}}}function le(e){let t,n,o,a;const r=new ee({props:{desiredLength:e[0].length}});r.$on("submit",e[6]);const c=new J({props:{value:e[1]-e[5],total:e[1]}});return{c(){t=u("div"),N(r.$$.fragment),n=d(),o=u("div"),N(c.$$.fragment),g(o,"margin-top","4rem"),g(t,"margin-top","2em")},m(e,s){i(e,t,s),S(r,t,null),l(t,n),l(t,o),S(c,o,null),a=!0},p(e,t){const n={};1&t&&(n.desiredLength=e[0].length),r.$set(n);const o={};34&t&&(o.value=e[1]-e[5]),2&t&&(o.total=e[1]),c.$set(o)},i(e){a||(M(r.$$.fragment,e),M(c.$$.fragment,e),a=!0)},o(e){I(r.$$.fragment,e),I(c.$$.fragment,e),a=!1},d(e){e&&s(t),P(r),P(c)}}}function ie(e){let t,n,o,a,r,c,p=e[4],f=[];for(let t=0;t<p.length;t+=1)f[t]=oe(ne(e,p,t));const h=e=>I(f[e],1,1,()=>{f[e]=null}),g=[le,re,ae],b=[];function k(e,t){return"active"===e[3]?0:"win"===e[3]?1:2}return a=k(e),r=b[a]=g[a](e),{c(){t=u("div"),n=u("div");for(let e=0;e<f.length;e+=1)f[e].c();o=d(),r.c(),m(n,"class","letters svelte-7qj2ix")},m(e,r){i(e,t,r),l(t,n);for(let e=0;e<f.length;e+=1)f[e].m(n,null);l(t,o),b[a].m(t,null),c=!0},p(e,[o]){if(20&o){let t;for(p=e[4],t=0;t<p.length;t+=1){const a=ne(e,p,t);f[t]?(f[t].p(a,o),M(f[t],1)):(f[t]=oe(a),f[t].c(),M(f[t],1),f[t].m(n,null))}for(A(),t=p.length;t<f.length;t+=1)h(t);D()}let l=a;a=k(e),a===l?b[a].p(e,o):(A(),I(b[l],1,1,()=>{b[l]=null}),D(),r=b[a],r||(r=b[a]=g[a](e),r.c()),M(r,1),r.m(t,null))},i(e){if(!c){for(let e=0;e<p.length;e+=1)M(f[e]);M(r),c=!0}},o(e){f=f.filter(Boolean);for(let e=0;e<f.length;e+=1)I(f[e]);I(r),c=!1},d(e){e&&s(t),function(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}(f,e),b[a].d()}}}function se(e,t,n){let{word:o}=t,{duration:a}=t;const r=v();let l,i=(new Date).getTime(),s=(new Date).getTime(),u=[],c="active";var d;function p(e){(function(e){return u.includes(e)})(e)||n(2,u=[...u,e]),"active"===c&&u.length===m.length&&(n(3,c="win"),r("finish",{success:!0}))}let m,f,h;return d=()=>{n(9,l=te(()=>n(8,s=(new Date).getTime()),500))},w().$$.on_mount.push(d),e.$set=e=>{"word"in e&&n(0,o=e.word),"duration"in e&&n(1,a=e.duration)},e.$$.update=()=>{1&e.$$.dirty&&n(4,m=o.split("")),1&e.$$.dirty&&o&&(n(3,c="active"),n(2,u=[]),n(7,i=(new Date).getTime()),n(9,l=te(()=>n(8,s=(new Date).getTime()),500))),130&e.$$.dirty&&n(10,f=i+1e3*a),1280&e.$$.dirty&&n(5,h=Math.round((f-s)/1e3)),568&e.$$.dirty&&h<=0&&"active"===c&&(n(3,c="fail"),m.forEach((e,t)=>p(t)),clearInterval(l),r("finish",{success:!1}))},[o,a,u,c,m,h,function(e){var t;(t=e.detail.value,m.map((e,n)=>t[n]===e).reduce((e,t,n)=>t?[...e,n]:e,[])).forEach(e=>p(e))}]}class ue extends R{constructor(e){super(),O(this,e,se,ie,r,{word:0,duration:1})}}const ce=["ache","acid","acme","acre","afro","aged","ally","aloe","alps","ammo","ante","apex","aqua","arch","area","arms","army","atom","aunt","aura","auto","axis","axle","baby","back","bail","bait","bale","balk","ball","balm","band","bane","bank","barb","bard","bark","barn","bars","base","bash","bass","bath","bead","beak","beam","bean","bear","beat","beef","beep","beer","beet","bell","belt","bend","bent","beta","bevy","bias","bike","bill","bind","bird","bite","blip","blob","blog","blow","blue","blur","boar","boat","body","boil","bold","bolt","bomb","bond","bone","bong","book","boom","boon","boot","bore","born","boss","bowl","brag","bran","brat","brew","brie","brim","brit","brow","buck","buff","bulb","bulk","bull","bump","bung","bunk","buns","bunt","buoy","burn","burp","bush","buss","bust","buzz","byte","cafe","cage","cake","calf","call","calm","camp","cane","cape","card","care","carp","cart","case","cash","cask","cast","cave","cell","cent","chap","chat","chef","chew","chic","chin","chip","chit","chop","chow","chug","chum","cite","city","clam","clan","clap","clay","clip","clog","clot","club","clue","coal","coat","code","coil","coin","coke","cola","cold","colt","coma","comb","come","cone","conk","cook","cool","coot","cope","copy","cord","core","cork","corn","corp","cost","cosy","cove","cowl","cows","cozy","crab","cred","cree","crew","crib","crop","crow","crud","crux","cube","cuff","cull","cult","curb","curd","cure","curl","cyan","dame","damp","dane","dare","dark","dart","dash","data","date","dawn","days","daze","dead","deaf","deal","dean","dear","debt","deck","deed","deep","deer","deli","demo","dent","desk","dial","dibs","dice","diet","digs","dill","dime","ding","dirt","disc","dish","disk","dive","dock","doll","dolt","dome","doom","door","dope","dork","dorm","dove","down","drag","draw","drew","drip","drop","drug","drum","duck","duct","duel","duet","dune","dunk","dusk","dust","duty","dyer","ease","east","eats","echo","edge","eggs","envy","epic","even","evil","exam","exit","eyes","face","fact","fade","fair","fake","fall","fame","fang","fare","farm","fast","fate","fawn","fear","feat","feed","feel","felt","fern","feud","file","fill","film","find","fine","fire","firm","fish","fist","five","fizz","flag","flak","flap","flat","flaw","flea","flex","flip","flop","flow","flub","flux","foam","foil","fold","folk","font","food","fool","foot","fork","form","fort","foul","four","fowl","frat","fray","free","fret","frog","fuel","full","fume","fund","funk","fury","fuse","fuss","fuze","fuzz","gage","gain","game","gape","gash","gasp","gate","gawk","gaze","gear","geek","gene","gent","germ","gift","gild","gimp","girl","gist","give","glad","glee","glow","glue","gnat","goal","goat","gold","golf","good","goof","goon","goth","gown","grab","grad","gram","gray","grey","grid","grin","grip","grit","grub","gulf","gull","gulp","guru","gush","gust","guts","hack","hail","hair","half","hall","halo","halt","hand","hang","hare","harp","hash","hate","have","hawk","haze","head","heap","heat","heed","heel","heft","heir","helm","help","hemp","herb","herd","here","hero","hick","hide","high","hike","hill","hilt","hind","hint","hire","hiss","hive","hoax","hobo","hold","hole","home","honk","hoof","hook","hoop","hoot","hope","hops","horn","hose","host","hour","howl","huff","hula","hulk","hull","hump","hunk","hunt","hurl","hurt","hush","husk","hymn","hype","ibis","icon","idea","idle","idol","iglu","inch","info","iris","iron","isle","itch","jack","jail","jamb","java","jazz","jean","jeep","jeer","jest","jive","jock","join","joke","jolt","juke","jump","junk","jury","kale","keen","keep","kelp","kick","kiln","kilo","kilt","kind","king","kiss","kite","kiwi","knee","knit","knot","know","lace","lack","lady","lair","lake","lamb","lame","lamp","land","lane","lard","lash","lass","last","lava","lawn","laws","lead","leaf","leak","lean","leap","lear","leek","leer","left","lego","legs","lens","lent","liar","lick","lied","life","lift","like","limb","lime","limp","line","link","lint","lion","lisp","list","load","loaf","loan","lobe","lock","loft","logo","look","loom","loon","loop","loot","lord","loss","lost","lots","love","luck","lump","lung","lure","lush","mace","magi","maid","mail","main","male","malt","mama","mane","mare","mark","mars","mash","mask","mass","mast","mate","math","mayo","maze","meal","mean","meat","meet","meld","melt","memo","mend","menu","meow","mesh","mess","meth","mile","milk","mill","mind","mine","mini","mink","mint","miss","mist","mite","mitt","moan","moat","mock","mode","mojo","mold","mole","molt","monk","mood","moon","mope","moss","moth","move","mule","muse","mush","musk","must","mute","mutt","name","navy","neck","need","neon","nerd","nest","news","newt","nick","nine","node","none","nook","noon","nose","note","noun","nuke","oath","odds","odor","ogre","oink","okay","omen","ooze","open","oral","orca","oreo","oval","oven","over","oxen","pace","pack","pact","page","pail","pain","pair","pale","palm","pane","pant","papa","park","part","pass","past","path","pave","peak","pear","peek","peel","peer","pelt","perk","pick","pier","pike","pile","pill","pimp","pine","ping","pink","pint","pipe","pita","pitt","pity","plan","play","plea","plot","plow","ploy","plug","plum","plus","poem","poet","poke","pole","poll","pond","pong","pony","poof","pool","poor","pore","pork","port","pose","post","prey","prom","prop","puck","puff","pull","pulp","puma","pump","punk","punt","push","putt","quad","quid","quiz","race","raft","rage","raid","rail","rain","rake","ramp","rank","rant","rash","rate","razz","read","real","ream","rear","reed","reef","reek","reel","rent","rest","rice","rich","ride","riff","rift","rind","ring","rink","riot","rise","risk","rite","road","roar","robe","rock","role","roll","room","root","rope","rose","rube","ruby","ruin","rule","rune","rung","runt","ruse","rush","rust","safe","saga","sage","sail","sale","salt","same","sand","sang","sash","sass","save","scan","scar","seal","seam","seat","sect","seed","seek","seer","self","sell","sham","shed","shim","shin","ship","shoe","shop","shot","show","sick","sigh","sign","silk","silo","sink","size","skid","skim","skin","skip","skit","slab","slag","slam","slap","slaw","sled","slew","slip","slit","slob","slot","slug","slum","slur","smog","snag","snap","snot","snow","snug","soak","soap","soar","sock","sofa","soil","sole","song","soot","sore","sort","soul","soup","sour","spam","span","spar","spat","spin","spit","spot","spud","spur","stab","stag","star","stay","stem","step","stew","stir","stop","stub","stud","suds","suit","sung","surf","swab","swag","swan","swap","sway","swim","tack","taco","tact","tail","take","tale","talk","tall","tank","tape","taps","tarp","tart","task","taxi","teal","team","tear","teen","tell","temp","tent","term","test","text","thaw","then","thud","thug","tick","tide","tidy","tier","tile","till","time","tint","tire","toad","toil","toll","tomb","tome","tone","tons","tool","toon","toot","toss","tote","tour","town","trap","tray","tree","trek","trim","trio","trip","trot","true","tuba","tube","tuck","tuna","tune","turf","turn","tush","tusk","type","typo","unit","user","vase","veil","vein","vent","verb","vest","vial","vibe","vice","view","vine","void","volt","vote","wade","wads","waft","wage","wail","wain","wait","wake","walk","wall","wane","want","ward","ware","warp","wart","wash","wasp","watt","wave","ways","wear","week","well","west","whey","whim","whip","wick","wife","wild","will","wilt","wimp","wind","wine","wing","wink","wipe","wire","wise","wish","wits","wolf","womb","wood","woof","wool","word","work","worm","wort","wrap","yard","yarn","yawn","year","yell","yeti","yoga","yolk","zinc","zing","zone","zoom","zero","zany","whir","welt","whig","wand","twin","tilt","site","sent"];function de(e){let t,n,o,a;const r=new V({props:{type:"button",onClick:e[5],label:"Start"}});return{c(){t=u("div"),t.innerHTML="<p>\n                You have 60 seconds and unlimited attempts to guess the password.\n            </p> \n\n            <p>\n              The password is a singular noun in English.\n            </p> \n\n            <p>\n              Each matching letter will be revealed.\n            </p>",n=d(),o=u("div"),N(r.$$.fragment),g(t,"max-width","18em"),g(t,"margin","0 auto"),g(o,"margin-top","2em")},m(e,l){i(e,t,l),i(e,n,l),i(e,o,l),S(r,o,null),a=!0},p(e,t){const n={};2&t&&(n.onClick=e[5]),r.$set(n)},i(e){a||(M(r.$$.fragment,e),a=!0)},o(e){I(r.$$.fragment,e),a=!1},d(e){e&&s(t),e&&s(n),e&&s(o),P(r)}}}function pe(e){let t,n,o;const a=new ue({props:{word:e[0],duration:60}});a.$on("finish",e[3]);let r=void 0!==e[2]&&me(e);return{c(){N(a.$$.fragment),t=d(),r&&r.c(),n=c("")},m(e,l){S(a,e,l),i(e,t,l),r&&r.m(e,l),i(e,n,l),o=!0},p(e,t){const o={};1&t&&(o.word=e[0]),a.$set(o),void 0!==e[2]?r?(r.p(e,t),M(r,1)):(r=me(e),r.c(),M(r,1),r.m(n.parentNode,n)):r&&(A(),I(r,1,1,()=>{r=null}),D())},i(e){o||(M(a.$$.fragment,e),M(r),o=!0)},o(e){I(a.$$.fragment,e),I(r),o=!1},d(e){P(a,e),e&&s(t),r&&r.d(e),e&&s(n)}}}function me(t){let n,o;const a=new V({props:{type:"button",onClick:t[4],label:"Try Again"}});return{c(){n=u("div"),N(a.$$.fragment),g(n,"margin-top","2em")},m(e,t){i(e,n,t),S(a,n,null),o=!0},p:e,i(e){o||(M(a.$$.fragment,e),o=!0)},o(e){I(a.$$.fragment,e),o=!1},d(e){e&&s(n),P(a)}}}function fe(e){let t,n,o,a,r,c;const p=[pe,de],f=[];function h(e,t){return e[1]?0:1}return a=h(e),r=f[a]=p[a](e),{c(){t=u("main"),n=u("h1"),n.textContent="Crack the Password!",o=d(),r.c(),m(n,"class","svelte-4engu8"),m(t,"class","svelte-4engu8")},m(e,r){i(e,t,r),l(t,n),l(t,o),f[a].m(t,null),c=!0},p(e,[n]){let o=a;a=h(e),a===o?f[a].p(e,n):(A(),I(f[o],1,1,()=>{f[o]=null}),D(),r=f[a],r||(r=f[a]=p[a](e),r.c()),M(r,1),r.m(t,null))},i(e){c||(M(r),c=!0)},o(e){I(r),c=!1},d(e){e&&s(t),f[a].d()}}}function he(e){return e[Math.round(Math.random()*e.length)]}function ge(e,t,n){let o,a=he(ce),r=!1;return[a,r,o,function(e){n(2,o=e.detail.success)},function(){n(0,a=he(ce)),n(2,o=void 0)},()=>n(1,r=!0)]}return new class extends R{constructor(e){super(),O(this,e,ge,fe,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
