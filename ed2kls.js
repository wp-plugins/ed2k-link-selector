// Simple Set Clipboard System
// Author: Joseph Huckaby
// http://code.google.com/p/zeroclipboard/
var ZeroClipboard={version:"1.0.7",clients:{},moviePath:ed2klsPath+"/ZeroClipboard.swf",nextId:1,$:function(d){if(typeof(d)=='string')d=document.getElementById(d);if(!d.addClass){d.hide=function(){this.style.display='none'};d.show=function(){this.style.display=''};d.addClass=function(a){this.removeClass(a);this.className+=' '+a};d.removeClass=function(a){var b=this.className.split(/\s+/);var c=-1;for(var k=0;k<b.length;k++){if(b[k]==a){c=k;k=b.length}}if(c>-1){b.splice(c,1);this.className=b.join(' ')}return this};d.hasClass=function(a){return!!this.className.match(new RegExp("\\s*"+a+"\\s*"))}}return d},setMoviePath:function(a){this.moviePath=a},dispatch:function(a,b,c){var d=this.clients[a];if(d){d.receiveEvent(b,c)}},register:function(a,b){this.clients[a]=b},getDOMObjectPosition:function(a,b){var c={left:0,top:0,width:a.width?a.width:a.offsetWidth,height:a.height?a.height:a.offsetHeight};while(a&&(a!=b)){c.left+=a.offsetLeft;c.top+=a.offsetTop;a=a.offsetParent}return c},Client:function(a){this.handlers={};this.id=ZeroClipboard.nextId++;this.movieId='ZeroClipboardMovie_'+this.id;ZeroClipboard.register(this.id,this);if(a)this.glue(a)}};ZeroClipboard.Client.prototype={id:0,ready:false,movie:null,clipText:'',handCursorEnabled:true,cssEffects:true,handlers:null,glue:function(a,b,c){this.domElement=ZeroClipboard.$(a);var d=99;if(this.domElement.style.zIndex){d=parseInt(this.domElement.style.zIndex,10)+1}if(typeof(b)=='string'){b=ZeroClipboard.$(b)}else if(typeof(b)=='undefined'){b=document.getElementsByTagName('body')[0]}var e=ZeroClipboard.getDOMObjectPosition(this.domElement,b);this.div=document.createElement('div');var f=this.div.style;f.position='absolute';f.left=''+e.left+'px';f.top=''+e.top+'px';f.width=''+e.width+'px';f.height=''+e.height+'px';f.zIndex=d;if(typeof(c)=='object'){for(addedStyle in c){f[addedStyle]=c[addedStyle]}}b.appendChild(this.div);this.div.innerHTML=this.getHTML(e.width,e.height)},getHTML:function(a,b){var c='';var d='id='+this.id+'&width='+a+'&height='+b;if(navigator.userAgent.match(/MSIE/)){var e=location.href.match(/^https/i)?'https://':'http://';c+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+e+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+a+'" height="'+b+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+d+'"/><param name="wmode" value="transparent"/></object>'}else{c+='<embed id="'+this.movieId+'" src="'+ZeroClipboard.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+a+'" height="'+b+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+d+'" wmode="transparent" />'}return c},hide:function(){if(this.div){this.div.style.left='-2000px'}},show:function(){this.reposition()},destroy:function(){if(this.domElement&&this.div){this.hide();this.div.innerHTML='';var a=document.getElementsByTagName('body')[0];try{a.removeChild(this.div)}catch(e){}this.domElement=null;this.div=null}},reposition:function(a){if(a){this.domElement=ZeroClipboard.$(a);if(!this.domElement)this.hide()}if(this.domElement&&this.div){var b=ZeroClipboard.getDOMObjectPosition(this.domElement);var c=this.div.style;c.left=''+b.left+'px';c.top=''+b.top+'px'}},setText:function(a){this.clipText=a;if(this.ready)this.movie.setText(a)},addEventListener:function(a,b){a=a.toString().toLowerCase().replace(/^on/,'');if(!this.handlers[a])this.handlers[a]=[];this.handlers[a].push(b)},setHandCursor:function(a){this.handCursorEnabled=a;if(this.ready)this.movie.setHandCursor(a)},setCSSEffects:function(a){this.cssEffects=!!a},receiveEvent:function(a,b){a=a.toString().toLowerCase().replace(/^on/,'');switch(a){case'load':this.movie=document.getElementById(this.movieId);if(!this.movie){var c=this;setTimeout(function(){c.receiveEvent('load',null)},1);return}if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){var c=this;setTimeout(function(){c.receiveEvent('load',null)},100);this.ready=true;return}this.ready=true;this.movie.setText(this.clipText);this.movie.setHandCursor(this.handCursorEnabled);break;case'mouseover':if(this.domElement&&this.cssEffects){this.domElement.addClass('hover');if(this.recoverActive)this.domElement.addClass('active')}break;case'mouseout':if(this.domElement&&this.cssEffects){this.recoverActive=false;if(this.domElement.hasClass('active')){this.domElement.removeClass('active');this.recoverActive=true}this.domElement.removeClass('hover')}break;case'mousedown':if(this.domElement&&this.cssEffects){this.domElement.addClass('active')}break;case'mouseup':if(this.domElement&&this.cssEffects){this.domElement.removeClass('active');this.recoverActive=false}break}if(this.handlers[a]){for(var d=0,len=this.handlers[a].length;d<len;d++){var e=this.handlers[a][d];if(typeof(e)=='function'){e(this,b)}else if((typeof(e)=='object')&&(e.length==2)){e[0][e[1]](this,b)}else if(typeof(e)=='string'){window[e](this,b)}}}}};
/*
eD2k Link Selector Main JavaScript
by tomchen1989
http://emulefans.com/wordpress-ed2k-link-selector/
GPL v2
*/
var ed2kls={$:function(a){return document.getElementById(a)},$n:function(a){return document.getElementsByName(a)},$c:function(b,c,d){d=d||document;c=c||"*";var e=[];if(document.getElementsByClassName&&Array.filter){if(c=="*"){return d.getElementsByClassName(b)}else{e=Array.filter(d.getElementsByClassName(b),function(a){return a.tagName==c.toUpperCase()})}}else{var f=d.getElementsByTagName(c);var g=new RegExp("(^|\\s)"+b+"(\\s|$)");for(i=0,j=0,l=f.length;i<l;i++){if(g.test(f[i].className)){e[j]=f[i];j++}}}return e},ht:function(a,b){for(var c=a.firstChild;c!==null;c=c.nextSibling){if(c.nodeType==3){c.nodeValue=b;return true}}return false},help:function(a,b){var c=ed2kls.$("el-s-info-"+a);var d=ed2kls.$("el-s-info-content-"+a);d.innerHTML="";var e=ed2kls.$("el-s-info-content-str-"+b).cloneNode(true);e.id="";d.appendChild(e);if(c.style.display=="none"){if(typeof jQuery=="undefined"){c.style.display="block"}else{jQuery(c).slideDown(300)}}this.cb.init()},closeinfo:function(a){if(typeof jQuery=="undefined"){ed2kls.$("el-s-info-"+a).style.display="none"}else{jQuery(ed2kls.$("el-s-info-"+a)).slideUp(300)}this.cb.init()},close:function(a){var b=ed2kls.$("el-s-tb-"+a);var c=ed2kls.$("el-s-exd-"+a);if(b.style.display=="none"){ed2kls.ht(c,"[-]");if(typeof jQuery!='undefined'&&!jQuery.browser.msie){jQuery(b).fadeIn("slow")}else{b.style.display="table-row-group"}c.setAttribute("title",ed2klsVar.shk)}else{ed2kls.ht(c,"[+]");if(typeof jQuery!='undefined'&&!jQuery.browser.msie){jQuery(b).fadeOut("slow")}else{b.style.display="none"}c.setAttribute("title",ed2klsVar.exd)}this.cb.init()},cb:{main:function(d,e){var f=new ZeroClipboard.Client();var g=false;f.setHandCursor(true);f.addEventListener("load",function(a){g=true});f.addEventListener("mouseOver",function(b){var a=ed2kls.$n("el-s-chkbx-"+e+"[]");var n=a.length;var c="";for(var i=0;i<n;i++){if(a[i].checked){if(d==1){c+=ed2kls.getName(a[i].value)+"\n"}else if(d==2){c+=a[i].value+"\n"}}}f.setText(c)});f.addEventListener("complete",function(a,b){var c=ed2kls.$("el-s-copied-"+e);if(!g){alert(ed2klsVar.retry)}else{c.style.display="inline";window.setTimeout(function(){c.style.display="none"},1000)}});if(d==1){f.glue("el-s-copynames-"+e)}else if(d==2){f.glue("el-s-copylinks-"+e)}},init:function(){var a=ed2kls.$c("ZeroClipboard_ED2k","embed");for(var j=0,l=a.length;j<l;j++){var b=a[j].parentNode;b.parentNode.removeChild(b)}var c=ed2kls.$c("el-s-copylinks","input");var n=c.length;var d;for(var i=0;i<n;i++){d=c[i].id;d=d.substr(d.lastIndexOf("-")+1);if(ed2kls.$("el-s-totsize-"+d)){this.main(1,d)}this.main(2,d)}},exe:function(){if(window.addEventListener){window.addEventListener("load",function(){ed2kls.cb.init()},false)}},iecopy:function(b,c){if(!window.addEventListener){var a=ed2kls.$n("el-s-chkbx-"+c+"[]");var n=a.length;var d="";for(var i=0;i<n;i++){if(a[i].checked){if(b==1){d+=ed2kls.getName(a[i].value)+"\n"}else if(b==2){d+=a[i].value+"\n"}}}window.clipboardData.setData("Text",d);var e=ed2kls.$("el-s-copied-"+c);e.style.display="inline";window.setTimeout(function(){e.style.display="none"},1000)}else{this.init();alert(ed2klsVar.retry)}}},formatSize:function(a,b){var c=100;var d=ed2klsVar.bytes;if(a>=1099511627776){a=Math.round(a/(1099511627776/c))/c;d=ed2klsVar.tb}else if(a>=1073741824){a=Math.round(a/(1073741824/c))/c;d=ed2klsVar.gb}else if(a>=1048576){a=Math.round(a/(1048576/c))/c;d=ed2klsVar.mb}else if(a>=1024){a=Math.round(a/(1024/c))/c;d=ed2klsVar.kb}return a+d},getName:function(a){var b;b=decodeURIComponent(a);b=b.split("|")[2];return b},getSize:function(a){var b;b=decodeURIComponent(a);b=+b.split("|")[3];return b},clear:function(a){if(ed2kls.$("el-s-namefilter-"+a)){ed2kls.$("el-s-namefilter-"+a).value="";var b=ed2kls.$n("el-s-chktype-"+a+"[]");var n=b.length;for(var i=0;i<n;i++){b[i].checked=false}}if(ed2kls.$("el-s-sizesymbol-"+a+"-1")){ed2kls.$("el-s-sizesymbol-"+a+"-1").selectedIndex=0;ed2kls.$("el-s-sizefilter-"+a+"-1").value="";ed2kls.$("el-s-sizeunit-"+a+"-1").selectedIndex=0;ed2kls.$("el-s-sizesymbol-"+a+"-2").selectedIndex=0;ed2kls.$("el-s-sizefilter-"+a+"-2").value="";ed2kls.$("el-s-sizeunit-"+a+"-2").selectedIndex=0}},total:function(b){var c=(ed2kls.$("el-s-totsize-"+b))?true:false;var a=ed2kls.$n("el-s-chkbx-"+b+"[]");var n=a.length;var d=0;var e=0;var f=ed2kls.$("el-s-chkall-"+b);for(var i=0;i<n;i++){if(a[i].checked){if(c){d+=this.getSize(a[i].value)}e++}}f.checked=(e==n)?true:false;if(c){ed2kls.ht(ed2kls.$("el-s-totsize-"+b),this.formatSize(d,b))}ed2kls.ht(ed2kls.$("el-s-totnum-"+b),e)},initChk:-1,checkIt:function(a,b){var c=b||window.event;var d=c.target||c.srcElement;tarNum=d.id;tarNum=tarNum.substr(tarNum.lastIndexOf("-")+1);tarNum=tarNum-1;if(!c.shiftKey){this.initChk=tarNum}else{var e=ed2kls.$n("el-s-chkbx-"+a+"[]");var f=Math.min(tarNum,this.initChk);var g=Math.max(tarNum,this.initChk);for(var i=f+1;i<=g-1;i++){e[i].checked=e[i].checked?false:true}}this.total(a);this.clear(a)},checkAll:function(b,c){var a=ed2kls.$n("el-s-chkbx-"+b+"[]");var n=a.length;for(var i=0;i<n;i++){a[i].checked=c}this.total(b);this.clear(b)},download:function(b){var a=ed2kls.$n("el-s-chkbx-"+b+"[]");var n=a.length;var c=[];for(var i=0;i<n;i++){if(a[i].checked){c.push(a[i].value)}}var l=c.length;if(l===0){return false}var d=6000;var j=0;var e=function(){window.location=c[j];if(j<l-1){j++;window.setTimeout(function(){d=500;e()},d)}};e()},test:function(b,c){if(b===""||b===undefined||c===""){return true}b=b.replace(/\"(.+?)\"/g,function(a){a=a.substr(1,a.length-2);a=a.replace(/\s/g,"\\u0020").replace(/\+/g,"\\u002B").replace(/-/g,"\\u002D").replace(/\|/g,"\\u007C").replace(/\^/g,"\\u005E").replace(/\$/g,"\\u0024");return a});b=b.replace(/[\s\+)]*\-/g," -").replace(/\|\s-/g,"|-").replace(/([\\\.\{\}\[\]\(\)\*\+\?])/g,"\\$1").replace(/\\(\\u[0-9A-F]{4})/g,"$1");var d=b.split(/[\s\+]+/);for(var i=0,l=d.length;i<l;i++){var e=d[i];if(e!==""){if(/\|/.test(e)){var f=e.split("|");var g=false;for(var j=0,jl=f.length;j<jl;j++){var h=f[j];if(h!==""){if((h.charAt(0)!="-"&&new RegExp(h,"i").test(c)===true)||(h.charAt(0)=="-"&&new RegExp(h.substr(1,h.length-1),"i").test(c)===false)){g=true}}}if(g===false){return false}}else if((e.charAt(0)!="-"&&new RegExp(e,"i").test(c)===false)||(e.charAt(0)=="-"&&new RegExp(e.substr(1,e.length-1),"i").test(c)===true)){return false}}}return true},testSize:function(a,b,c,d){if(c===""||c===undefined){return true}else{var e=c*d;switch(b){case"1":if(a>e){return true}break;case"2":if(a<e){return true}break;default:return true}return false}},filter:function(a){this.filterRun(a);this.setChktype(a);this.total(a)},filterRun:function(b){var c,str,sizesymbol1,sizefilter1,sizeunit1,sizesymbol2,sizefilter2,sizeunit2;if(ed2kls.$("el-s-namefilter-"+b)){c=ed2kls.$("el-s-namefilter-"+b);str=c.value}if(ed2kls.$("el-s-sizesymbol-"+b+"-1")){sizesymbol1=ed2kls.$("el-s-sizesymbol-"+b+"-1");sizesymbol1=sizesymbol1.options[sizesymbol1.selectedIndex].value;sizefilter1=ed2kls.$("el-s-sizefilter-"+b+"-1").value;sizeunit1=ed2kls.$("el-s-sizeunit-"+b+"-1");sizeunit1=sizeunit1.options[sizeunit1.selectedIndex].value;sizesymbol2=ed2kls.$("el-s-sizesymbol-"+b+"-2");sizesymbol2=sizesymbol2.options[sizesymbol2.selectedIndex].value;sizefilter2=ed2kls.$("el-s-sizefilter-"+b+"-2").value;sizeunit2=ed2kls.$("el-s-sizeunit-"+b+"-2");sizeunit2=sizeunit2.options[sizeunit2.selectedIndex].value}var a=ed2kls.$n("el-s-chkbx-"+b+"[]");var n=a.length;for(var i=0;i<n;i++){a[i].checked=(this.test(str,this.getName(a[i].value))&&this.testSize(this.getSize(a[i].value),sizesymbol1,sizefilter1,sizeunit1)&&this.testSize(this.getSize(a[i].value),sizesymbol2,sizefilter2,sizeunit2))?true:false}},setChktype:function(a){var b=ed2kls.$("el-s-namefilter-"+a);if(b){var c=ed2kls.$n("el-s-chktype-"+a+"[]");var d=ed2kls.$("el-s-namefilter-"+a).value;var n=c.length;var e,str;for(var i=0;i<n;i++){str=c[i].value;e=new RegExp("\\."+str+"\\$","i");c[i].checked=e.test(d)?true:false}}},typeFilter:function(a,b,c){var d=ed2kls.$("el-s-namefilter-"+a);var e=/(\.\S+?\$)(\|\.\S+?\$)*/i;var f=new RegExp("\\|\\."+b+"\\$|\\."+b+"\\$\\||\\."+b+"\\$","i");d.value=d.value.replace(f,"");if(c){if(e.test(d.value)){d.value=d.value.replace(e,"$&|."+b+"$")}else{if(d.value!==""&&d.value.substr(d.value.length-1,1)!==" "){d.value+=" "}d.value+="."+b+"$"}}this.filterRun(a);this.total(a)},emclChk:function(b){var a=ed2kls.$n("el-s-chkbx-"+b+"[]");var n=a.length;for(var i=0;i<n;i++){if(a[i].checked){return true}}return false},exe:function(){if(window.addEventListener){window.addEventListener("load",ed2kls.init,false)}else if(window.attachEvent){window.attachEvent("onload",ed2kls.init)}},init:function(){var a=ed2kls.$c("el-s-namefilter","input").concat(ed2kls.$c("el-s-sizefilter","input"));for(var i=0,l=a.length;i<l;i++){a[i].value=""}var b=ed2kls.$c("el-s-chkbx","input");for(var j=0,jl=b.length;j<jl;j++){var c=b[j];if(/el-s-chktype/.test(c.className)){c.checked=false}else{c.checked=true}}}};ed2kls.cb.exe();ed2kls.exe();