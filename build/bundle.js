var app=function(){"use strict";function e(){}function t(e){return e()}function a(){return Object.create(null)}function o(e){e.forEach(t)}function r(e){return"function"==typeof e}function n(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function l(e){return null==e?"":e}function s(e,t){e.appendChild(t)}function i(e,t,a){e.insertBefore(t,a||null)}function c(e){e.parentNode.removeChild(e)}function u(e){return document.createElement(e)}function d(e){return document.createTextNode(e)}function p(){return d(" ")}function m(e,t,a,o){return e.addEventListener(t,a,o),()=>e.removeEventListener(t,a,o)}function h(e,t,a){null==a?e.removeAttribute(t):e.getAttribute(t)!==a&&e.setAttribute(t,a)}function g(e,t){t=""+t,e.data!==t&&(e.data=t)}function f(e,t){(null!=t||e.value)&&(e.value=t)}function b(e,t,a,o){e.style.setProperty(t,a,o?"important":"")}let w;function k(e){w=e}function y(){if(!w)throw new Error("Function called outside component initialization");return w}function v(){const e=y();return(t,a)=>{const o=e.$$.callbacks[t];if(o){const r=function(e,t){const a=document.createEvent("CustomEvent");return a.initCustomEvent(e,!1,!1,t),a}(t,a);o.slice().forEach(t=>{t.call(e,r)})}}}const $=[],x=[],z=[],j=[],C=Promise.resolve();let q=!1;function _(e){z.push(e)}function E(){const e=new Set;do{for(;$.length;){const e=$.shift();k(e),L(e.$$)}for(;x.length;)x.pop()();for(let t=0;t<z.length;t+=1){const a=z[t];e.has(a)||(a(),e.add(a))}z.length=0}while($.length);for(;j.length;)j.pop()();q=!1}function L(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(_)}}const I=new Set;let T;function A(){T={r:0,c:[],p:T}}function D(){T.r||o(T.c),T=T.p}function M(e,t){e&&e.i&&(I.delete(e),e.i(t))}function S(e,t,a,o){if(e&&e.o){if(I.has(e))return;I.add(e),T.c.push(()=>{I.delete(e),o&&(a&&e.d(1),o())}),e.o(t)}}function N(e){e&&e.c()}function R(e,a,n){const{fragment:l,on_mount:s,on_destroy:i,after_update:c}=e.$$;l&&l.m(a,n),_(()=>{const a=s.map(t).filter(r);i?i.push(...a):o(a),e.$$.on_mount=[]}),c.forEach(_)}function U(e,t){const a=e.$$;null!==a.fragment&&(o(a.on_destroy),a.fragment&&a.fragment.d(t),a.on_destroy=a.fragment=null,a.ctx=[])}function P(e,t){-1===e.$$.dirty[0]&&($.push(e),q||(q=!0,C.then(E)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function B(t,r,n,l,s,i,c=[-1]){const u=w;k(t);const d=r.props||{},p=t.$$={fragment:null,ctx:null,props:i,update:e,not_equal:s,bound:a(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:a(),dirty:c};let m=!1;p.ctx=n?n(t,d,(e,a,...o)=>{const r=o.length?o[0]:a;return p.ctx&&s(p.ctx[e],p.ctx[e]=r)&&(p.bound[e]&&p.bound[e](r),m&&P(t,e)),a}):[],p.update(),m=!0,o(p.before_update),p.fragment=!!l&&l(p.ctx),r.target&&(r.hydrate?p.fragment&&p.fragment.l(function(e){return Array.from(e.childNodes)}(r.target)):p.fragment&&p.fragment.c(),r.intro&&M(t.$$.fragment),R(t,r.target,r.anchor),E()),k(u)}class H{$destroy(){U(this,1),this.$destroy=e}$on(e,t){const a=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return a.push(t),()=>{const e=a.indexOf(t);-1!==e&&a.splice(e,1)}}$set(){}}function O(t){let a,o;return{c(){a=u("div"),o=d(t[0]),h(a,"class","svelte-uk3kzb")},m(e,t){i(e,a,t),s(a,o)},p(e,[t]){1&t&&g(o,e[0])},i:e,o:e,d(e){e&&c(a)}}}function Y(e,t,a){let o,{value:r}=t,{uncovered:n}=t;return e.$set=e=>{"value"in e&&a(1,r=e.value),"uncovered"in e&&a(2,n=e.uncovered)},e.$$.update=()=>{6&e.$$.dirty&&a(0,o=n?r:"")},[o,r,n]}class F extends H{constructor(e){super(),B(this,e,Y,O,n,{value:1,uncovered:2})}}function G(t){let a,o;return{c(){a=u("div"),o=u("div"),h(o,"class","bar svelte-z4z7ww"),b(o,"width",Math.ceil(t[0]/t[1]*100)+"%"),h(a,"class","wrapper svelte-z4z7ww")},m(e,t){i(e,a,t),s(a,o)},p(e,[t]){3&t&&b(o,"width",Math.ceil(e[0]/e[1]*100)+"%")},i:e,o:e,d(e){e&&c(a)}}}function J(e,t,a){let{value:o}=t,{total:r}=t;return e.$set=e=>{"value"in e&&a(0,o=e.value),"total"in e&&a(1,r=e.total)},[o,r]}class K extends H{constructor(e){super(),B(this,e,J,G,n,{value:0,total:1})}}function Q(t){let a,o,r,n;return{c(){a=u("button"),o=d(t[0]),h(a,"type",t[1]),h(a,"class",r=l(t[3]&&"isSecondary")+" svelte-1ptztyh")},m(e,r){i(e,a,r),s(a,o),n=m(a,"click",t[2])},p(e,[t]){1&t&&g(o,e[0]),2&t&&h(a,"type",e[1]),8&t&&r!==(r=l(e[3]&&"isSecondary")+" svelte-1ptztyh")&&h(a,"class",r)},i:e,o:e,d(e){e&&c(a),n()}}}function V(e,t,a){let{label:o}=t,{type:r="button"}=t,{onClick:n=(()=>{})}=t,{secondary:l=!1}=t;return e.$set=e=>{"label"in e&&a(0,o=e.label),"type"in e&&a(1,r=e.type),"onClick"in e&&a(2,n=e.onClick),"secondary"in e&&a(3,l=e.secondary)},[o,r,n,l]}class W extends H{constructor(e){super(),B(this,e,V,Q,n,{label:0,type:1,onClick:2,secondary:3})}}function X(e){let t,a,r,n,l,d;const g=new W({props:{type:"submit",label:"Submit"}});return{c(){t=u("form"),a=u("input"),n=p(),N(g.$$.fragment),h(a,"type","text"),h(a,"maxlength",e[0]),h(a,"placeholder",r=Array.from({length:e[0]},Z).join("")),h(a,"class","svelte-1iihki3")},m(o,r){i(o,t,r),s(t,a),f(a,e[1]),s(t,n),R(g,t,null),l=!0,d=[m(a,"input",e[4]),m(t,"submit",e[2])]},p(e,[t]){(!l||1&t)&&h(a,"maxlength",e[0]),(!l||1&t&&r!==(r=Array.from({length:e[0]},Z).join("")))&&h(a,"placeholder",r),2&t&&a.value!==e[1]&&f(a,e[1])},i(e){l||(M(g.$$.fragment,e),l=!0)},o(e){S(g.$$.fragment,e),l=!1},d(e){e&&c(t),U(g),o(d)}}}const Z=()=>"*";function ee(e,t,a){let{desiredLength:o}=t,r="";const n=v();return e.$set=e=>{"desiredLength"in e&&a(0,o=e.desiredLength)},[o,r,function(e){e.preventDefault(),r.length===o&&(n("submit",{value:r}),a(1,r=""))},n,function(){r=this.value,a(1,r)}]}class te extends H{constructor(e){super(),B(this,e,ee,X,n,{desiredLength:0})}}function ae(e,t){const a=setInterval(e,t);var o;return o=()=>{clearInterval(a)},y().$$.on_destroy.push(o),a}function oe(e,t,a){const o=e.slice();return o[16]=t[a],o[18]=a,o}function re(e){let t;const a=new F({props:{value:e[16],uncovered:e[2].includes(e[18])}});return{c(){N(a.$$.fragment)},m(e,o){R(a,e,o),t=!0},p(e,t){const o={};16&t&&(o.value=e[16]),4&t&&(o.uncovered=e[2].includes(e[18])),a.$set(o)},i(e){t||(M(a.$$.fragment,e),t=!0)},o(e){S(a.$$.fragment,e),t=!1},d(e){U(a,e)}}}function ne(t){let a,o,r,n,l,m,g;return{c(){a=u("div"),a.textContent="Time's up!",o=p(),r=u("div"),n=d("Don't know the word?\n            "),l=u("a"),m=d("Look it up in the dictionary."),b(a,"margin-bottom","1em"),h(l,"href",g="https://www.dictionary.com/browse/"+encodeURIComponent(t[0])),h(l,"target","_blank"),h(l,"class","svelte-6wevm4")},m(e,t){i(e,a,t),i(e,o,t),i(e,r,t),s(r,n),s(r,l),s(l,m)},p(e,t){1&t&&g!==(g="https://www.dictionary.com/browse/"+encodeURIComponent(e[0]))&&h(l,"href",g)},i:e,o:e,d(e){e&&c(a),e&&c(o),e&&c(r)}}}function le(t){let a,o,r,n,l,m,g;return{c(){a=u("div"),a.textContent="You won!",o=p(),r=u("div"),n=d("Still no idea what does it mean? "),l=u("a"),m=d("Look it up in the dictionary."),h(l,"href",g="https://www.dictionary.com/browse/"+encodeURIComponent(t[0])),h(l,"target","_blank"),h(l,"class","svelte-6wevm4"),b(r,"margin-top","1em")},m(e,t){i(e,a,t),i(e,o,t),i(e,r,t),s(r,n),s(r,l),s(l,m)},p(e,t){1&t&&g!==(g="https://www.dictionary.com/browse/"+encodeURIComponent(e[0]))&&h(l,"href",g)},i:e,o:e,d(e){e&&c(a),e&&c(o),e&&c(r)}}}function se(e){let t,a,o,r;const n=new te({props:{desiredLength:e[0].length}});n.$on("submit",e[7]);const l=new W({props:{secondary:!0,onClick:e[15],label:"Give up"}});return{c(){t=u("div"),N(n.$$.fragment),a=p(),o=u("div"),N(l.$$.fragment),b(t,"margin-top","0em"),b(o,"margin-top","4rem")},m(e,s){i(e,t,s),R(n,t,null),i(e,a,s),i(e,o,s),R(l,o,null),r=!0},p(e,t){const a={};1&t&&(a.desiredLength=e[0].length),n.$set(a)},i(e){r||(M(n.$$.fragment,e),M(l.$$.fragment,e),r=!0)},o(e){S(n.$$.fragment,e),S(l.$$.fragment,e),r=!1},d(e){e&&c(t),U(n),e&&c(a),e&&c(o),U(l)}}}function ie(e){let t,a,o,r,n,l,d,m;const g=new K({props:{value:e[1]-e[5],total:e[1]}});let f=e[4],w=[];for(let t=0;t<f.length;t+=1)w[t]=re(oe(e,f,t));const k=e=>S(w[e],1,1,()=>{w[e]=null}),y=[se,le,ne],v=[];function $(e,t){return"active"===e[3]?0:"win"===e[3]?1:2}return l=$(e),d=v[l]=y[l](e),{c(){t=u("div"),a=u("div"),N(g.$$.fragment),o=p(),r=u("div");for(let e=0;e<w.length;e+=1)w[e].c();n=p(),d.c(),b(a,"margin-top","3rem"),h(r,"class","letters svelte-6wevm4")},m(e,c){i(e,t,c),s(t,a),R(g,a,null),s(t,o),s(t,r);for(let e=0;e<w.length;e+=1)w[e].m(r,null);s(t,n),v[l].m(t,null),m=!0},p(e,[a]){const o={};if(34&a&&(o.value=e[1]-e[5]),2&a&&(o.total=e[1]),g.$set(o),20&a){let t;for(f=e[4],t=0;t<f.length;t+=1){const o=oe(e,f,t);w[t]?(w[t].p(o,a),M(w[t],1)):(w[t]=re(o),w[t].c(),M(w[t],1),w[t].m(r,null))}for(A(),t=f.length;t<w.length;t+=1)k(t);D()}let n=l;l=$(e),l===n?v[l].p(e,a):(A(),S(v[n],1,1,()=>{v[n]=null}),D(),d=v[l],d||(d=v[l]=y[l](e),d.c()),M(d,1),d.m(t,null))},i(e){if(!m){M(g.$$.fragment,e);for(let e=0;e<f.length;e+=1)M(w[e]);M(d),m=!0}},o(e){S(g.$$.fragment,e),w=w.filter(Boolean);for(let e=0;e<w.length;e+=1)S(w[e]);S(d),m=!1},d(e){e&&c(t),U(g),function(e,t){for(let a=0;a<e.length;a+=1)e[a]&&e[a].d(t)}(w,e),v[l].d()}}}function ce(e,t,a){let{word:o}=t,{duration:r}=t;const n=v();let l,s=(new Date).getTime(),i=(new Date).getTime(),c=[],u="active";function d(e){return h.map((t,a)=>e[a]===t).reduce((e,t,a)=>t?[...e,a]:e,[])}function p(e){m(e)||a(2,c=[...c,e]),"active"===u&&c.length===h.length&&(a(3,u="win"),clearInterval(l),n("finish",{success:!0}))}function m(e){return c.includes(e)}let h,g,f;return e.$set=e=>{"word"in e&&a(0,o=e.word),"duration"in e&&a(1,r=e.duration)},e.$$.update=()=>{1&e.$$.dirty&&a(4,h=o.split("")),1025&e.$$.dirty&&o&&(a(3,u="active"),a(2,c=[]),a(8,s=(new Date).getTime()),clearInterval(l),a(10,l=ae(()=>a(9,i=(new Date).getTime()),500))),258&e.$$.dirty&&a(11,g=s+1e3*r),2560&e.$$.dirty&&a(5,f=Math.round((g-i)/1e3)),1080&e.$$.dirty&&f<=0&&"active"===u&&(a(3,u="fail"),h.forEach((e,t)=>p(t)),clearInterval(l),n("finish",{success:!1}))},[o,r,c,u,h,f,n,function(e){d(e.detail.value).forEach(e=>p(e))},s,i,l,g,d,p,m,()=>n("giveup")]}class ue extends H{constructor(e){super(),B(this,e,ce,ie,n,{word:0,duration:1})}}const de=["ace","act","add","age","aim","air","ale","amp","ant","ape","arc","ark","arm","art","ate","awe","awl","axe","bad","bag","ban","bar","bat","bay","bed","bee","bet","bib","bid","bin","bit","boa","bod","bog","boo","bot","bow","box","boy","bra","bud","bug","bun","bur","bus","buy","bye","cab","cam","can","cap","car","cat","caw","cod","cog","cop","cot","cow","cry","cub","cue","cup","cut","dab","day","dew","dig","dip","dog","dot","dry","due","dug","dye","ear","eel","egg","ego","elf","elk","elm","emu","end","era","eve","eye","fad","fan","far","fat","fax","fed","fee","few","fib","fig","fit","fix","flu","fly","fog","fox","fry","fun","fur","gag","gap","gas","gel","gem","gin","goo","gum","gun","gut","guy","gym","hag","ham","hat","hay","hem","hen","hex","hip","hit","hob","hog","hop","hub","hue","hug","hum","hut","ice","ill","imp","ink","inn","ion","ivy","jab","jam","jar","jaw","jay","jet","jig","job","jog","joy","jug","keg","key","kid","kin","kit","lab","lad","lag","lap","lat","law","lay","leg","let","lid","lie","lip","lit","lob","log","lot","low","mam","man","map","mat","max","may","men","min","mix","mob","mod","mom","moo","mop","mow","mud","mug","mum","nap","net","nod","nun","nut","oaf","oak","oar","oat","ode","oil","old","one","orb","ore","out","owl","pad","pal","pan","par","pat","paw","pay","peg","pen","pet","pie","pig","pin","pit","pod","pop","pot","pro","pry","pub","pug","pun","pup","put","rad","rag","ram","rap","rat","raw","ray","red","rib","rig","rim","rip","rod","rot","row","rub","rug","rum","run","rut","sag","saw","say","sea","see","set","shy","sin","sip","sir","six","ski","sky","sob","son","spa","spy","sub","sum","sun","tad","tag","tan","tap","tar","tax","tea","ten","tie","tin","tip","toe","ton","top","tow","toy","try","tub","tug","two","urn","use","van","vat","vet","vow","wad","wag","war","wax","way","web","wed","wet","who","why","wig","win","wit","woe","won","wow","yam","yay","yes","zap","zip","zit","zoo"],pe=["ache","acid","acme","acre","afro","aged","ally","aloe","alps","ammo","ante","apex","aqua","arch","area","arms","army","atom","aunt","aura","auto","axis","axle","baby","back","bail","bait","bale","balk","ball","balm","band","bane","bank","barb","bard","bark","barn","bars","base","bash","bass","bath","bead","beak","beam","bean","bear","beat","beef","beep","beer","beet","bell","belt","bend","bent","beta","bevy","bias","bike","bill","bind","bird","bite","blip","blob","blog","blow","blue","blur","boar","boat","body","boil","bold","bolt","bomb","bond","bone","bong","book","boom","boon","boot","bore","born","boss","bowl","brag","bran","brat","brew","brie","brim","brit","brow","buck","buff","bulb","bulk","bull","bump","bung","bunk","buns","bunt","buoy","burn","burp","bush","buss","bust","buzz","byte","cafe","cage","cake","calf","call","calm","camp","cane","cape","card","care","carp","cart","case","cash","cask","cast","cave","cell","cent","chap","chat","chef","chew","chic","chin","chip","chit","chop","chow","chug","chum","cite","city","clam","clan","clap","clay","clip","clog","clot","club","clue","coal","coat","code","coil","coin","coke","cola","cold","colt","coma","comb","come","cone","conk","cook","cool","coot","cope","copy","cord","core","cork","corn","corp","cost","cosy","cove","cowl","cows","cozy","crab","cred","cree","crew","crib","crop","crow","crud","crux","cube","cuff","cull","cult","curb","curd","cure","curl","cyan","dame","damp","dane","dare","dark","dart","dash","data","date","dawn","days","daze","dead","deaf","deal","dean","dear","debt","deck","deed","deep","deer","deli","demo","dent","desk","dial","dibs","dice","diet","digs","dill","dime","ding","dirt","disc","dish","disk","dive","dock","doll","dolt","dome","doom","door","dope","dork","dorm","dove","down","drag","draw","drew","drip","drop","drug","drum","duck","duct","duel","duet","dune","dunk","dusk","dust","duty","dyer","ease","east","eats","echo","edge","eggs","envy","epic","even","evil","exam","exit","eyes","face","fact","fade","fair","fake","fall","fame","fang","fare","farm","fast","fate","fawn","fear","feat","feed","feel","felt","fern","feud","file","fill","film","find","fine","fire","firm","fish","fist","five","fizz","flag","flak","flap","flat","flaw","flea","flex","flip","flop","flow","flub","flux","foam","foil","fold","folk","font","food","fool","foot","fork","form","fort","foul","four","fowl","frat","fray","free","fret","frog","fuel","full","fume","fund","funk","fury","fuse","fuss","fuze","fuzz","gage","gain","game","gape","gash","gasp","gate","gawk","gaze","gear","geek","gene","gent","germ","gift","gild","gimp","girl","gist","give","glad","glee","glow","glue","gnat","goal","goat","gold","golf","good","goof","goon","goth","gown","grab","grad","gram","gray","grey","grid","grin","grip","grit","grub","gulf","gull","gulp","guru","gush","gust","guts","hack","hail","hair","half","hall","halo","halt","hand","hang","hare","harp","hash","hate","have","hawk","haze","head","heap","heat","heed","heel","heft","heir","helm","help","hemp","herb","herd","here","hero","hick","hide","high","hike","hill","hilt","hind","hint","hire","hiss","hive","hoax","hobo","hold","hole","home","honk","hoof","hook","hoop","hoot","hope","hops","horn","hose","host","hour","howl","huff","hula","hulk","hull","hump","hunk","hunt","hurl","hurt","hush","husk","hymn","hype","ibis","icon","idea","idle","idol","iglu","inch","info","iris","iron","isle","itch","jack","jail","jamb","java","jazz","jean","jeep","jeer","jest","jive","jock","join","joke","jolt","juke","jump","junk","jury","kale","keen","keep","kelp","kick","kiln","kilo","kilt","kind","king","kiss","kite","kiwi","knee","knit","knot","know","lace","lack","lady","lair","lake","lamb","lame","lamp","land","lane","lard","lash","lass","last","lava","lawn","laws","lead","leaf","leak","lean","leap","lear","leek","leer","left","lego","legs","lens","lent","liar","lick","lied","life","lift","like","limb","lime","limp","line","link","lint","lion","lisp","list","load","loaf","loan","lobe","lock","loft","logo","look","loom","loon","loop","loot","lord","loss","lost","lots","love","luck","lump","lung","lure","lush","mace","magi","maid","mail","main","male","malt","mama","mane","mare","mark","mars","mash","mask","mass","mast","mate","math","mayo","maze","meal","mean","meat","meet","meld","melt","memo","mend","menu","meow","mesh","mess","meth","mile","milk","mill","mind","mine","mini","mink","mint","miss","mist","mite","mitt","moan","moat","mock","mode","mojo","mold","mole","molt","monk","mood","moon","mope","moss","moth","move","mule","muse","mush","musk","must","mute","mutt","name","navy","neck","need","neon","nerd","nest","news","newt","nick","nine","node","none","nook","noon","nose","note","noun","nuke","oath","odds","odor","ogre","oink","okay","omen","ooze","open","oral","orca","oreo","oval","oven","over","oxen","pace","pack","pact","page","pail","pain","pair","pale","palm","pane","pant","papa","park","part","pass","past","path","pave","peak","pear","peek","peel","peer","pelt","perk","pick","pier","pike","pile","pill","pimp","pine","ping","pink","pint","pipe","pita","pitt","pity","plan","play","plea","plot","plow","ploy","plug","plum","plus","poem","poet","poke","pole","poll","pond","pong","pony","poof","pool","poor","pore","pork","port","pose","post","prey","prom","prop","puck","puff","pull","pulp","puma","pump","punk","punt","push","putt","quad","quid","quiz","race","raft","rage","raid","rail","rain","rake","ramp","rank","rant","rash","rate","razz","read","real","ream","rear","reed","reef","reek","reel","rent","rest","rice","rich","ride","riff","rift","rind","ring","rink","riot","rise","risk","rite","road","roar","robe","rock","role","roll","room","root","rope","rose","rube","ruby","ruin","rule","rune","rung","runt","ruse","rush","rust","safe","saga","sage","sail","sale","salt","same","sand","sang","sash","sass","save","scan","scar","seal","seam","seat","sect","seed","seek","seer","self","sell","sham","shed","shim","shin","ship","shoe","shop","shot","show","sick","sigh","sign","silk","silo","sink","size","skid","skim","skin","skip","skit","slab","slag","slam","slap","slaw","sled","slew","slip","slit","slob","slot","slug","slum","slur","smog","snag","snap","snot","snow","snug","soak","soap","soar","sock","sofa","soil","sole","song","soot","sore","sort","soul","soup","sour","spam","span","spar","spat","spin","spit","spot","spud","spur","stab","stag","star","stay","stem","step","stew","stir","stop","stub","stud","suds","suit","sung","surf","swab","swag","swan","swap","sway","swim","tack","taco","tact","tail","take","tale","talk","tall","tank","tape","taps","tarp","tart","task","taxi","teal","team","tear","teen","tell","temp","tent","term","test","text","thaw","then","thud","thug","tick","tide","tidy","tier","tile","till","time","tint","tire","toad","toil","toll","tomb","tome","tone","tons","tool","toon","toot","toss","tote","tour","town","trap","tray","tree","trek","trim","trio","trip","trot","true","tuba","tube","tuck","tuna","tune","turf","turn","tush","tusk","type","typo","unit","user","vase","veil","vein","vent","verb","vest","vial","vibe","vice","view","vine","void","volt","vote","wade","wads","waft","wage","wail","wain","wait","wake","walk","wall","wane","want","ward","ware","warp","wart","wash","wasp","watt","wave","ways","wear","week","well","west","whey","whim","whip","wick","wife","wild","will","wilt","wimp","wind","wine","wing","wink","wipe","wire","wise","wish","wits","wolf","womb","wood","woof","wool","word","work","worm","wort","wrap","yard","yarn","yawn","year","yell","yeti","yoga","yolk","zinc","zing","zone","zoom","zero","zany","whir","welt","whig","wand","twin","tilt","site","sent"],me=["acorn","actor","adder","adept","advil","agave","agent","agony","ailey","aioli","aisle","akron","alarm","album","alert","algae","alias","alibi","alien","alley","alloy","alpha","altar","amber","amigo","amino","amish","angel","anger","angle","angst","angus","anime","ankle","annex","anole","antic","anvil","aphid","apple","april","apron","arbor","arena","argon","argus","armor","aroma","array","arrow","arson","ascot","aspen","asset","attic","audio","audit","auger","aunty","award","axiom","azure","bacon","badge","bagel","baker","banjo","banks","barge","baron","basic","basil","basin","basis","batch","baton","bayou","beach","beads","beard","beast","beats","beech","begin","beige","being","belch","belly","bench","bends","beret","berry","bevel","bible","bidet","biker","bingo","biome","biped","birch","birth","bison","biter","black","blade","blame","blank","blast","blaze","blend","blimp","blind","bling","blink","bliss","blitz","bloat","block","bloke","blond","blood","bloom","blues","bluff","blurb","blush","board","boast","bogey","bones","bongo","bonus","boost","booth","booty","booze","borer","botch","bound","bowel","bowls","boxer","brace","braid","brail","brain","brake","brand","brass","brave","bravo","brawl","brawn","bread","break","breed","briar","bribe","brick","bride","brief","brine","brink","brits","britt","broad","broil","brood","brook","broom","broth","brown","brunt","brush","brute","buddy","budge","buggy","bugle","build","bulge","bully","bunch","bunny","burns","burst","buyer","bylaw","cabin","cable","cabot","cache","caddy","cadet","cager","camel","canal","candy","caper","carat","cards","caret","cargo","carry","caste","catch","caulk","cause","cavil","cease","cedar","cello","chaff","chain","chair","chalk","champ","chant","chaos","chard","charm","chart","chase","chasm","cheat","check","cheek","cheep","cheer","chess","chest","chick","chief","child","chill","chime","chimp","chips","chirp","chive","chock","choir","choke","choky","chomp","chord","chore","chuck","chump","chunk","churn","chute","cider","cigar","cinch","clack","claim","clamp","clams","clang","clank","clash","clasp","class","clean","clear","cleat","cleft","clerk","click","cliff","climb","cling","cloak","clock","clone","close","cloth","cloud","clout","clove","clown","cluck","clump","clunk","coach","coast","cobra","cocoa","colon","color","combo","comet","comic","comma","conch","condo","coney","coral","cords","corps","costs","couch","cough","count","court","coven","cover","crabs","crack","craft","cramp","crane","crank","crash","crate","crawl","craze","crazy","creak","cream","creed","creek","creep","crepe","cress","crest","crime","crimp","crisp","croak","crock","crook","cross","crowd","crown","crude","crumb","crush","crust","crypt","cubby","cubit","curry","curse","curve","cycle","cynic","daily","dairy","daisy","dance","dandy","darts","death","debit","debut","decal","decay","decor","decoy","deeds","delay","delta","demon","denim","depot","depth","derby","detox","deuce","devil","diary","digit","diner","disco","ditch","ditto","diver","dodge","dogma","dolly","donor","donut","doubt","dough","dowel","dozen","dozer","draft","drain","drama","drape","dread","dream","dress","drier","drift","drill","drink","drive","drone","drool","drove","druid","dryer","dunce","dying","eager","eagle","earth","easel","eater","eight","elbow","elder","elect","elite","elves","email","ember","empty","enemy","entry","epoxy","equal","error","essay","event","exile","extra","fable","facet","faint","fairy","faith","falls","fancy","farce","fault","favor","feast","femur","fence","ferry","fetch","fever","fiber","field","fiend","fifth","fifty","fight","filet","filth","final","finch","first","fiver","fives","fixer","flair","flake","flame","flank","flaps","flare","flash","flask","flats","fleet","flesh","flick","flier","flies","fling","flint","flirt","float","flock","flood","floor","floss","flour","fluff","fluid","fluke","flume","flush","flute","flyer","focus","folks","folly","force","forge","forth","forty","forum","found","foyer","frail","frame","fraud","freak","freon","friar","fries","frill","frisk","frizz","front","frost","froth","frown","fruit","fryer","fudge","fumes","funds","fungi","funny","futon","gamma","gates","gator","gauge","gavel","gecko","genie","genoa","genre","ghost","ghoul","giant","gipsy","given","giver","gizmo","glade","gland","glans","glare","glass","glaze","gleam","glide","glint","globe","gloom","glory","gloss","glove","gnome","going","golem","goner","goofy","goose","gouge","grace","grade","graft","grail","grain","grand","grant","grape","graph","grasp","grass","grate","grave","gravy","graze","great","greed","green","grief","grill","grime","grind","gripe","grits","groan","groom","gross","group","grove","growl","gruel","grump","grunt","guard","guess","guest","guide","guild","guilt","gulch","guppy","habit","hands","handy","haste","hatch","hater","haunt","haven","havoc","hazel","heaps","heart","heavy","hedge","helix","hello","hiker","hinge","hippo","hippy","hitch","hives","hoagy","hoard","hobby","hoist","honey","honor","hooks","hoops","horde","horse","hotel","hound","hours","house","human","humor","humus","hunch","hurry","husky","hydra","hyena","icing","ideal","idiom","idiot","idler","igloo","image","index","ingot","inlet","input","intro","irony","issue","ivory","jacks","jeans","jello","jelly","jetty","jewel","joint","joist","joker","jolly","joust","judge","juice","junky","juror","kayak","kazoo","kebab","kiddy","kitty","knack","kneel","knell","knife","knock","koala","krill","label","labor","ladle","lance","lapel","lapse","large","larva","laser","lasso","latch","latex","lathe","latte","laugh","layer","layup","leach","lease","leash","least","leave","ledge","leech","leeds","lefty","lemon","lemur","level","lever","libel","light","lilac","limbo","limit","linen","liner","links","liter","liver","llama","loach","loads","lobby","local","lodge","logic","loner","loony","loser","lotto","lotus","lover","lower","lunch","lying","macro","madam","mafia","magic","magma","major","maker","mamba","mambo","mamma","mango","mania","manor","maple","march","marks","marsh","match","mates","maths","maxim","mayor","means","medal","medic","melee","melon","mercy","merit","metal","meter","metro","might","mills","mimer","mimic","mince","miner","minor","minus","miser","miter","mixer","mocha","modal","model","modem","mogul","molar","momma","mommy","money","month","mooch","moody","moose","moped","moral","morse","motel","motor","motto","mould","mound","mount","mouse","mouth","mover","movie","mucus","mulch","mummy","munch","mural","music","mylar","nacho","namer","names","nanna","nasal","needy","nepal","nerve","niece","night","niner","ninja","ninth","noble","noise","nomad","noose","north","notch","nudge","nurse","nylon","oasis","oates","ocean","octet","offer","oiler","oldie","olive","omega","onion","onset","optic","orbit","order","organ","ounce","owner","oxbow","ozone","pacer","pager","pains","paint","panda","panel","panic","pansy","pants","paper","parks","parts","party","pasta","paste","patch","patio","pause","payer","peace","peach","pearl","pecan","pedal","penny","perch","peril","pesto","petal","petty","phase","phone","photo","piano","piece","piggy","pigmy","piles","pinch","pinky","pinot","pitch","pivot","pixel","pizza","place","plaid","plain","plane","plank","plant","plate","plaza","plier","pluck","plumb","plume","plump","plush","plyer","point","poker","polls","pooch","poppy","porch","poser","pouch","pound","power","prank","prawn","press","price","pride","prime","prism","prize","probe","promo","proof","props","prose","prowl","prune","pulse","punch","punks","pupil","puppy","purge","purse","putty","quack","quake","qualm","quart","queen","query","quest","quick","quiet","quilt","quirk","quirt","quota","quote","racer","radar","radio","rafts","rails","raise","rally","ranch","range","rapid","rates","ratio","razor","reach","ready","realm","rebel","reign","relay","relic","reply","reset","resin","retro","revel","rhino","rhyme","ricer","rider","ridge","rifle","right","rings","rinse","riser","rival","river","roach","roads","roast","robin","robot","rodeo","rogue","rooms","roost","roots","rotor","rouge","rough","round","route","rover","rowdy","rower","royal","rugby","ruler","rummy","rumor","saber","saint","salad","salem","sales","salon","salsa","sands","sauce","sauna","saver","savor","scale","scare","scarf","scene","scent","scold","scone","scoop","scope","score","scorn","scout","scrap","seats","sedan","sense","serum","serve","servo","setup","seven","shack","shade","shake","shame","shank","shape","shard","share","shark","sharp","shave","shawl","sheep","sheet","shelf","shell","shift","shill","shirt","shoes","shore","shove","shred","shrub","shrug","siege","sight","silks","silly","sinus","siren","sixer","sixth","sixty","skier","skill","skirt","skull","skunk","slack","slain","slang","slant","slash","slate","slave","sleep","sleet","slews","slice","slick","slide","slime","sling","slope","sloth","slump","slush","smack","small","smart","smash","smear","smell","smelt","smile","smirk","smith","smock","smoke","snack","snail","snake","snare","snarl","sneak","sniff","snipe","snore","snort","softy","solid","sonar","sonny","sooth","sound","south","space","spade","spare","spark","spasm","spawn","speed","spell","spelt","spice","spike","spill","spite","splat","split","spoil","spoke","spoof","spook","spool","spoon","spore","sport","spots","spout","spray","spree","spurt","squat","squid","stack","staff","stage","stain","stair","stake","stalk","stall","stamp","stand","stare","start","stash","state","stays","steak","steal","steam","steed","steel","steer","steps","stern","stick","stiff","still","stilt","sting","stink","stint","stock","stoic","stomp","stone","stool","stoop","stops","store","stork","storm","story","stove","strap","straw","stray","strip","strum","strut","study","stuff","stump","stunt","style","sugar","suite","sumer","super","surge","sushi","sutra","swamp","swarm","sweat","sweep","sweet","swell","swift","swine","swing","swipe","swirl","swish","syrup","table","taffy","tails","taker","talks","tally","talon","taste","taunt","taxer","taxis","teach","tears","tease","teens","teeth","tempo","tense","tenth","terms","theft","theme","there","theta","thick","thief","thigh","thing","think","third","thorn","three","throw","thumb","tiger","tilde","timer","times","timid","titan","title","toady","toast","today","token","toner","tongs","tonic","tooth","topic","torch","torso","total","totem","touch","tough","tours","towel","tower","towny","toxin","trace","track","trade","trail","train","trait","trash","tread","treat","trend","triad","trial","trick","troll","troop","trout","truce","truck","trump","trunk","trust","truth","tulip","tummy","tumor","tuner","tunic","tutor","twine","twins","twirl","twist","tying","udder","ulcer","uncle","union","unity","upper","upset","usage","usher","using","valet","valor","value","valve","vault","vegan","venom","venue","verge","vibes","video","vigil","vinyl","viola","viper","virgo","virus","visit","visor","vista","vocal","vodka","vogue","voice","voter","vowel","wacko","wader","wafer","wager","wages","wagon","waist","waltz","waste","watch","water","watts","waver","weave","wedge","weird","wells","welsh","whack","whale","wharf","wheat","wheel","whiff","while","whirl","whisk","white","whole","widow","width","wince","winch","wings","wiper","witch","woman","woods","words","works","world","worry","worse","worst","worth","wound","wrack","wrath","wreck","wring","wrist","wrong","years","yeast","yield","young","youth","zebra","tribe","sword","spine","spear","shock"];function he(e){let t,a,o,r,n,l,s,d,m,g;const f=new W({props:{type:"button",onClick:e[7],label:"Easy"}}),w=new W({props:{type:"button",onClick:e[8],label:"Normal"}}),k=new W({props:{type:"button",onClick:e[9],label:"Hard"}});return{c(){t=u("div"),t.innerHTML='<p class="svelte-z24sgt">\n                You have 60 seconds and unlimited attempts to guess the password.\n            </p> \n\n            <p class="svelte-z24sgt">\n              The password is a singular noun in English.\n            </p> \n\n            <p class="svelte-z24sgt">\n              Each matching letter will be revealed.\n            </p>',a=p(),o=u("p"),o.textContent="Difficulty:",r=p(),n=u("div"),N(f.$$.fragment),l=p(),s=u("div"),N(w.$$.fragment),d=p(),m=u("div"),N(k.$$.fragment),h(t,"class","intro svelte-z24sgt"),h(o,"class","svelte-z24sgt"),b(n,"margin-top","1em"),b(s,"margin-top","1em"),b(m,"margin-top","1em")},m(e,c){i(e,t,c),i(e,a,c),i(e,o,c),i(e,r,c),i(e,n,c),R(f,n,null),i(e,l,c),i(e,s,c),R(w,s,null),i(e,d,c),i(e,m,c),R(k,m,null),g=!0},p(e,t){const a={};2&t&&(a.onClick=e[7]),f.$set(a);const o={};2&t&&(o.onClick=e[8]),w.$set(o);const r={};2&t&&(r.onClick=e[9]),k.$set(r)},i(e){g||(M(f.$$.fragment,e),M(w.$$.fragment,e),M(k.$$.fragment,e),g=!0)},o(e){S(f.$$.fragment,e),S(w.$$.fragment,e),S(k.$$.fragment,e),g=!1},d(e){e&&c(t),e&&c(a),e&&c(o),e&&c(r),e&&c(n),U(f),e&&c(l),e&&c(s),U(w),e&&c(d),e&&c(m),U(k)}}}function ge(e){let t,a,o;const r=new ue({props:{word:e[0],duration:60}});r.$on("finish",e[3]),r.$on("giveup",e[5]);let n=void 0!==e[2]&&fe(e);return{c(){N(r.$$.fragment),t=p(),n&&n.c(),a=d("")},m(e,l){R(r,e,l),i(e,t,l),n&&n.m(e,l),i(e,a,l),o=!0},p(e,t){const o={};1&t&&(o.word=e[0]),r.$set(o),void 0!==e[2]?n?(n.p(e,t),M(n,1)):(n=fe(e),n.c(),M(n,1),n.m(a.parentNode,a)):n&&(A(),S(n,1,1,()=>{n=null}),D())},i(e){o||(M(r.$$.fragment,e),M(n),o=!0)},o(e){S(r.$$.fragment,e),S(n),o=!1},d(e){U(r,e),e&&c(t),n&&n.d(e),e&&c(a)}}}function fe(t){let a,o,r,n;const l=new W({props:{type:"button",onClick:t[4],label:"Try Again"}}),s=new W({props:{onClick:t[5],label:"Change difficulty"}});return{c(){a=u("div"),N(l.$$.fragment),o=p(),r=u("div"),N(s.$$.fragment),b(a,"margin-top","2em"),b(r,"margin-top","2em")},m(e,t){i(e,a,t),R(l,a,null),i(e,o,t),i(e,r,t),R(s,r,null),n=!0},p:e,i(e){n||(M(l.$$.fragment,e),M(s.$$.fragment,e),n=!0)},o(e){S(l.$$.fragment,e),S(s.$$.fragment,e),n=!1},d(e){e&&c(a),U(l),e&&c(o),e&&c(r),U(s)}}}function be(e){let t,a,o,r,n,l;const d=[ge,he],m=[];function g(e,t){return e[1]?0:1}return r=g(e),n=m[r]=d[r](e),{c(){t=u("main"),a=u("h1"),a.textContent="Crack the Password!",o=p(),n.c(),h(a,"class","svelte-z24sgt"),h(t,"class","svelte-z24sgt")},m(e,n){i(e,t,n),s(t,a),s(t,o),m[r].m(t,null),l=!0},p(e,[a]){let o=r;r=g(e),r===o?m[r].p(e,a):(A(),S(m[o],1,1,()=>{m[o]=null}),D(),n=m[r],n||(n=m[r]=d[r](e),n.c()),M(n,1),n.m(t,null))},i(e){l||(M(n),l=!0)},o(e){S(n),l=!1},d(e){e&&c(t),m[r].d()}}}function we(e){return e[Math.round(Math.random()*e.length)]}function ke(e,t,a){const o={easy:de,normal:pe,hard:me};let r,n=we(pe),l=null;return e.$$.update=()=>{2&e.$$.dirty&&l&&(a(0,n=we(o[l])),a(2,r=void 0))},[n,l,r,function(e){a(2,r=e.detail.success)},function(){const e=l;a(1,l=null),a(1,l=e)},function(){a(1,l=null)},o,()=>a(1,l="easy"),()=>a(1,l="normal"),()=>a(1,l="hard")]}return new class extends H{constructor(e){super(),B(this,e,ke,be,n,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
