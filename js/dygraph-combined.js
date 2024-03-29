/*! @license Copyright 2011 Dan Vanderkam (danvdk@gmail.com) MIT-licensed (http://opensource.org/licenses/MIT) */
/*Modified Number format and defined inital values by In Sook Moon */

Date.ext={};
Date.ext.util={};
Date.ext.util.xPad=function(a,c,b){if(typeof(b)=="undefined"){b=10}for(;parseInt(a,10)<b&&b>1;b/=10){a=c.toString()+a}return a.toString()};
Date.prototype.locale="en-GB";
if(document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang){
	Date.prototype.locale=document.getElementsByTagName("html")[0].lang
}
Date.ext.locales={};
Date.ext.locales.en={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October","November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],x:"%d/%m/%y",X:"%T"};
Date.ext.locales["en-US"]=Date.ext.locales.en;
Date.ext.locales["en-US"].c="%a %d %b %Y %r %Z";
Date.ext.locales["en-US"].x="%D";
Date.ext.locales["en-US"].X="%r";
Date.ext.locales["en-GB"]=Date.ext.locales.en;
Date.ext.locales["en-AU"]=Date.ext.locales["en-GB"];
Date.ext.formats={
		a:function(a){return Date.ext.locales[a.locale].a[a.getDay()]},
		A:function(a){return Date.ext.locales[a.locale].A[a.getDay()]},
		b:function(a){return Date.ext.locales[a.locale].b[a.getMonth()]},
		B:function(a){return Date.ext.locales[a.locale].B[a.getMonth()]},
		c:"toLocaleString",
		C:function(a){return Date.ext.util.xPad(parseInt(a.getFullYear()/100,10),0)},
		d:["getDate","0"],e:["getDate"," "],
		g:function(a){return Date.ext.util.xPad(parseInt(Date.ext.util.G(a)/100,10),0)},
		G:function(c){var e=c.getFullYear();var b=parseInt(Date.ext.formats.V(c),10);var a=parseInt(Date.ext.formats.W(c),10);if(a>b){e++}else{if(a===0&&b>=52){e--}}return e},H:["getHours","0"],
		I:function(b){var a=b.getHours()%12;return Date.ext.util.xPad(a===0?12:a,0)},
		j:function(c){var a=c-new Date(""+c.getFullYear()+"/1/1 GMT");a+=c.getTimezoneOffset()*60000;var b=parseInt(a/60000/60/24,10)+1;return Date.ext.util.xPad(b,0,100)},
		m:function(a){return Date.ext.util.xPad(a.getMonth()+1,0)},
		M:["getMinutes","0"],
		p:function(a){return Date.ext.locales[a.locale].p[a.getHours()>=12?1:0]},
		P:function(a){return Date.ext.locales[a.locale].P[a.getHours()>=12?1:0]},S:["getSeconds","0"],
		u:function(a){var b=a.getDay();return b===0?7:b},
		U:function(e){var a=parseInt(Date.ext.formats.j(e),10);var c=6-e.getDay();var b=parseInt((a+c)/7,10);return Date.ext.util.xPad(b,0)},
		V:function(e){var c=parseInt(Date.ext.formats.W(e),10);var a=(new Date(""+e.getFullYear()+"/1/1")).getDay();var b=c+(a>4||a<=1?0:1);if(b==53&&(new Date(""+e.getFullYear()+"/12/31")).getDay()<4){b=1}else{if(b===0){b=Date.ext.formats.V(new Date(""+(e.getFullYear()-1)+"/12/31"))}}return Date.ext.util.xPad(b,0)},w:"getDay",
		W:function(e){var a=parseInt(Date.ext.formats.j(e),10);var c=7-Date.ext.formats.u(e);var b=parseInt((a+c)/7,10);return Date.ext.util.xPad(b,0,10)},
		y:function(a){return Date.ext.util.xPad(a.getFullYear()%100,0)},
		Y:"getFullYear",
		z:function(c){var b=c.getTimezoneOffset();var a=Date.ext.util.xPad(parseInt(Math.abs(b/60),10),0);var e=Date.ext.util.xPad(b%60,0);return(b>0?"-":"+")+a+e},
		Z:function(a){return a.toString().replace(/^.*\(([^)]+)\)$/,"$1")},"%":function(a){return"%"}};
Date.ext.aggregates={c:"locale",D:"%m/%d/%y",h:"%b",n:"\n",r:"%I:%M:%S %p",R:"%H:%M",t:"\t",T:"%H:%M:%S",x:"locale",X:"locale"};
Date.ext.aggregates.z=Date.ext.formats.z(new Date());
Date.ext.aggregates.Z=Date.ext.formats.Z(new Date());
Date.ext.unsupported={};

Date.prototype.strftime=function(a){
	if(!(this.locale in Date.ext.locales)){
		if(this.locale.replace(/-[a-zA-Z]+$/,"") in Date.ext.locales){this.locale=this.locale.replace(/-[a-zA-Z]+$/,"")}
		else{this.locale="en-GB"}
	}
	var c=this;
	while(a.match(/%[cDhnrRtTxXzZ]/)){
		a=a.replace(/%([cDhnrRtTxXzZ])/g,function(e,d){
			var g=Date.ext.aggregates[d];
			return(g=="locale"?Date.ext.locales[c.locale][d]:g)
		})
	}
	var b=a.replace(/%([aAbBCdegGHIjmMpPSuUVwWyY%])/g,function(e,d){
		var g=Date.ext.formats[d];
		if(typeof(g)=="string"){return c[g]()}
		else{
			if(typeof(g)=="function"){return g.call(c,c)}
			else{
				if(typeof(g)=="object"&&typeof(g[0])=="string"){return Date.ext.util.xPad(c[g[0]](),g[1])}
				else{return d}
			}
		}
	});
	c=null;
	return b
};
"use strict";
function RGBColorParser(f){
	this.ok=false;
	if(f.charAt(0)=="#"){f=f.substr(1,6)}
	f=f.replace(/ /g,"");
	f=f.toLowerCase();
	var b={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};
	for(var g in b){
		if(f==g){f=b[g]}
	}
	var e=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(i){return[parseInt(i[1]),parseInt(i[2]),parseInt(i[3])]}},
			{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(i){return[parseInt(i[1],16),parseInt(i[2],16),parseInt(i[3],16)]}},
			{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(i){return[parseInt(i[1]+i[1],16),parseInt(i[2]+i[2],16),parseInt(i[3]+i[3],16)]}}];
	for(var c=0;c<e.length;c++){
		var j=e[c].re;
		var a=e[c].process;
		var h=j.exec(f);
		if(h){
			var d=a(h);
			this.r=d[0];
			this.g=d[1];
			this.b=d[2];
			this.ok=true
		}
	}
	this.r=(this.r<0||isNaN(this.r))?0:((this.r>255)?255:this.r);
	this.g=(this.g<0||isNaN(this.g))?0:((this.g>255)?255:this.g);
	this.b=(this.b<0||isNaN(this.b))?0:((this.b>255)?255:this.b);
	this.toRGB=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"};
	this.toHex=function(){
		var l=this.r.toString(16);var k=this.g.toString(16);
		var i=this.b.toString(16);
		if(l.length==1){l="0"+l}
		if(k.length==1){k="0"+k}
		if(i.length==1){i="0"+i}
		return"#"+l+k+i
	}
}
function printStackTrace(b){b=b||{guess:true};var c=b.e||null,e=!!b.guess;var d=new printStackTrace.implementation(),a=d.run(c);return(e)?d.guessAnonymousFunctions(a):a}
printStackTrace.implementation=function(){};
printStackTrace.implementation.prototype={
		run:function(a,b){a=a||this.createException();b=b||this.mode(a);if(b==="other"){return this.other(arguments.callee)}else{return this[b](a)}},
		createException:function(){try{this.undef()}catch(a){return a}},
		mode:function(a){if(a["arguments"]&&a.stack){return"chrome"}else{if(typeof a.message==="string"&&typeof window!=="undefined"&&window.opera){if(!a.stacktrace){return"opera9"}if(a.message.indexOf("\n")>-1&&a.message.split("\n").length>a.stacktrace.split("\n").length){return"opera9"}if(!a.stack){return"opera10a"}if(a.stacktrace.indexOf("called from line")<0){return"opera10b"}return"opera11"}else{if(a.stack){return"firefox"}}}return"other"},
		instrumentFunction:function(b,d,e){b=b||window;var a=b[d];b[d]=function c(){e.call(this,printStackTrace().slice(4));return b[d]._instrumented.apply(this,arguments)};b[d]._instrumented=a},
		deinstrumentFunction:function(a,b){if(a[b].constructor===Function&&a[b]._instrumented&&a[b]._instrumented.constructor===Function){a[b]=a[b]._instrumented}},
		chrome:function(b){var a=(b.stack+"\n").replace(/^\S[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^([^\(]+?)([\n$])/gm,"{anonymous}()@$1$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm,"{anonymous}()@$1").split("\n");a.pop();return a},firefox:function(a){return a.stack.replace(/(?:\n@:0)?\s+$/m,"").replace(/^\(/gm,"{anonymous}(").split("\n")},
		opera11:function(g){var a="{anonymous}",h=/^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;var k=g.stacktrace.split("\n"),l=[];for(var c=0,f=k.length;c<f;c+=2){var d=h.exec(k[c]);if(d){var j=d[4]+":"+d[1]+":"+d[2];var b=d[3]||"global code";b=b.replace(/<anonymous function: (\S+)>/,"$1").replace(/<anonymous function>/,a);l.push(b+"@"+j+" -- "+k[c+1].replace(/^\s+/,""))}}return l},opera10b:function(g){var a="{anonymous}",h=/^(.*)@(.+):(\d+)$/;var j=g.stacktrace.split("\n"),k=[];for(var c=0,f=j.length;c<f;c++){var d=h.exec(j[c]);if(d){var b=d[1]?(d[1]+"()"):"global code";k.push(b+"@"+d[2]+":"+d[3])}}return k},
		opera10a:function(g){var a="{anonymous}",h=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;var j=g.stacktrace.split("\n"),k=[];for(var c=0,f=j.length;c<f;c+=2){var d=h.exec(j[c]);if(d){var b=d[3]||a;k.push(b+"()@"+d[2]+":"+d[1]+" -- "+j[c+1].replace(/^\s+/,""))}}return k},
		opera9:function(j){var d="{anonymous}",h=/Line (\d+).*script (?:in )?(\S+)/i;var c=j.message.split("\n"),b=[];for(var g=2,a=c.length;g<a;g+=2){var f=h.exec(c[g]);if(f){b.push(d+"()@"+f[2]+":"+f[1]+" -- "+c[g+1].replace(/^\s+/,""))}}return b},
		other:function(g){var b="{anonymous}",f=/function\s*([\w\-$]+)?\s*\(/i,a=[],d,c,e=10;while(g&&a.length<e){d=f.test(g.toString())?RegExp.$1||b:b;c=Array.prototype.slice.call(g["arguments"]||[]);a[a.length]=d+"("+this.stringifyArguments(c)+")";g=g.caller}return a},
		stringifyArguments:function(c){var b=[];var e=Array.prototype.slice;for(var d=0;d<c.length;++d){var a=c[d];if(a===undefined){b[d]="undefined"}else{if(a===null){b[d]="null"}else{if(a.constructor){if(a.constructor===Array){if(a.length<3){b[d]="["+this.stringifyArguments(a)+"]"}else{b[d]="["+this.stringifyArguments(e.call(a,0,1))+"..."+this.stringifyArguments(e.call(a,-1))+"]"}}else{if(a.constructor===Object){b[d]="#object"}else{if(a.constructor===Function){b[d]="#function"}else{if(a.constructor===String){b[d]='"'+a+'"'}else{if(a.constructor===Number){b[d]=a}}}}}}}}}return b.join(",")},sourceCache:{},ajax:function(a){var b=this.createXMLHTTPObject();if(b){try{b.open("GET",a,false);b.send(null);return b.responseText}catch(c){}}return""},
		createXMLHTTPObject:function(){var c,a=[function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}];for(var b=0;b<a.length;b++){try{c=a[b]();this.createXMLHTTPObject=a[b];return c}catch(d){}}},isSameDomain:function(a){return a.indexOf(location.hostname)!==-1},getSource:function(a){if(!(a in this.sourceCache)){this.sourceCache[a]=this.ajax(a).split("\n")}return this.sourceCache[a]},
		guessAnonymousFunctions:function(k){for(var g=0;g<k.length;++g){var f=/\{anonymous\}\(.*\)@(.*)/,l=/^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,b=k[g],c=f.exec(b);if(c){var e=l.exec(c[1]),d=e[1],a=e[2],j=e[3]||0;if(d&&this.isSameDomain(d)&&a){var h=this.guessAnonymousFunction(d,a,j);k[g]=b.replace("{anonymous}",h)}}}return k},
		guessAnonymousFunction:function(c,f,a){var b;try{b=this.findFunctionName(this.getSource(c),f)}catch(d){b="getSource failed with url: "+c+", exception: "+d.toString()}return b},
		findFunctionName:function(a,e){var g=/function\s+([^(]*?)\s*\(([^)]*)\)/;var k=/['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function\b/;var h=/['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(?:eval|new Function)\b/;var b="",l,j=Math.min(e,20),d,c;for(var f=0;f<j;++f){l=a[e-f-1];c=l.indexOf("//");if(c>=0){l=l.substr(0,c)}if(l){b=l+b;d=k.exec(b);if(d&&d[1]){return d[1]}d=g.exec(b);if(d&&d[1]){return d[1]}d=h.exec(b);if(d&&d[1]){return d[1]}}}return"(?)"}};
CanvasRenderingContext2D.prototype.installPattern=function(e){
	if(typeof(this.isPatternInstalled)!=="undefined"){throw"Must un-install old line pattern before installing a new one."}
	this.isPatternInstalled=true;
	var g=[0,0];var b=[];
	var f=this.beginPath;
	var d=this.lineTo;
	var c=this.moveTo;
	var a=this.stroke;
	this.uninstallPattern=function(){this.beginPath=f;this.lineTo=d;this.moveTo=c;this.stroke=a;this.uninstallPattern=undefined;this.isPatternInstalled=undefined};
	this.beginPath=function(){b=[];f.call(this)};
	this.moveTo=function(h,i){b.push([[h,i]]);c.call(this,h,i)};
	this.lineTo=function(h,j){var i=b[b.length-1];i.push([h,j])};
	this.stroke=function(){
		if(b.length===0){a.call(this);return}
		for(var p=0;p<b.length;p++){
			var o=b[p];
			var l=o[0][0],u=o[0][1];
			for(var n=1;n<o.length;n++){
				var h=o[n][0],s=o[n][1];
				this.save();
				var w=(h-l);
				var v=(s-u);
				var r=Math.sqrt(w*w+v*v);
				var k=Math.atan2(v,w);
				this.translate(l,u);
				c.call(this,0,0);
				this.rotate(k);
				var m=g[0];
				var t=0;
				while(r>t){
					var q=e[m];
					if(g[1]){t+=g[1]}
					else{t+=q}
					if(t>r){g=[m,t-r];t=r}
					else{g=[(m+1)%e.length,0]}
					if(m%2===0){d.call(this,t,0)}
					else{c.call(this,t,0)}
					m=(m+1)%e.length
				}
				this.restore();
				l=h,u=s
			}
		}
		a.call(this);
		b=[]
	}
};
CanvasRenderingContext2D.prototype.uninstallPattern=function(){throw"Must install a line pattern before uninstalling it."};
var DygraphOptions=(function(){var a=function(b){
	this.dygraph_=b;
	this.yAxes_=[];
	this.xAxis_={};
	this.series_={};
	this.global_=this.dygraph_.attrs_;
	this.user_=this.dygraph_.user_attrs_||{};
	this.highlightSeries_=this.get("highlightSeriesOpts")||{};
	this.reparseSeries()};
	a.AXIS_STRING_MAPPINGS_={y:0,Y:0,y1:0,Y1:0,y2:1,Y2:1};
	a.axisToIndex_=function(b){
		if(typeof(b)=="string"){if(a.AXIS_STRING_MAPPINGS_.hasOwnProperty(b)){return a.AXIS_STRING_MAPPINGS_[b]}throw"Unknown axis : "+b}
		if(typeof(b)=="number"){if(b===0||b===1){return b}throw"Dygraphs only supports two y-axes, indexed from 0-1."}
		if(typeof(b)=="object"){throw"Using objects for axis specification is not supported inside the 'series' option."}
		if(b){throw"Unknown axis : "+b}
		return 0
	};
	a.prototype.reparseSeries=function(){
		var g=this.get("labels");
		if(!g){return}
		this.labels=g.slice(1);
		this.yAxes_=[{series:[],options:{}}];
		this.xAxis_={options:{}};
		this.series_={};
		var h=!this.user_.series;
		if(h){
			var c=0;
			for(var j=0;j<this.labels.length;j++){
				var i=this.labels[j];
				var e=this.user_[i]||{};
				var b=0;
				var d=e.axis;
				if(typeof(d)=="object"){
					b=++c;
					this.yAxes_[b]={series:[i],options:d}
				}
				if(!d){this.yAxes_[0].series.push(i)}
				this.series_[i]={idx:j,yAxis:b,options:e}
			}
			for(var j=0;j<this.labels.length;j++){
				var i=this.labels[j];
				var e=this.series_[i]["options"];
				var d=e.axis;
				if(typeof(d)=="string"){
					if(!this.series_.hasOwnProperty(d)){
						this.dygraph_.error("Series "+i+" wants to share a y-axis with series "+d+", which does not define its own axis.");
						return null
					}
					var b=this.series_[d].yAxis;
					this.series_[i].yAxis=b;
					this.yAxes_[b].series.push(i)
				}
			}
		}else{
			for(var j=0;j<this.labels.length;j++){
				var i=this.labels[j];
				var e=this.user_.series[i]||{};
				var b=a.axisToIndex_(e.axis);
				this.series_[i]={idx:j,yAxis:b,options:e};
				if(!this.yAxes_[b]){this.yAxes_[b]={series:[i],options:{}}}
				else{this.yAxes_[b].series.push(i)}
			}
		}
		var f=this.user_.axes||{};
		Dygraph.update(this.yAxes_[0].options,f.y||{});
		if(this.yAxes_.length>1){Dygraph.update(this.yAxes_[1].options,f.y2||{})}
		Dygraph.update(this.xAxis_.options,f.x||{})};
		a.prototype.get=function(c){var b=this.getGlobalUser_(c);if(b!==null){return b}return this.getGlobalDefault_(c)};
		a.prototype.getGlobalUser_=function(b){if(this.user_.hasOwnProperty(b)){return this.user_[b]}return null};
		a.prototype.getGlobalDefault_=function(b){if(this.global_.hasOwnProperty(b)){return this.global_[b]}if(Dygraph.DEFAULT_ATTRS.hasOwnProperty(b)){return Dygraph.DEFAULT_ATTRS[b]}return null};
		a.prototype.getForAxis=function(d,e){var f;var i;if(typeof(e)=="number"){f=e;i=f===0?"y":"y2"}else{if(e=="y1"){e="y"}if(e=="y"){f=0}else{if(e=="y2"){f=1}else{if(e=="x"){f=-1}else{throw"Unknown axis "+e}}}i=e}var g=(f==-1)?this.xAxis_:this.yAxes_[f];if(g){var h=g.options;if(h.hasOwnProperty(d)){return h[d]}}var c=this.getGlobalUser_(d);if(c!==null){return c}var b=Dygraph.DEFAULT_ATTRS.axes[i];if(b.hasOwnProperty(d)){return b[d]}return this.getGlobalDefault_(d)};
		a.prototype.getForSeries=function(c,e){if(e===this.dygraph_.highlightSet_){if(this.highlightSeries_.hasOwnProperty(c)){return this.highlightSeries_[c]}}if(!this.series_.hasOwnProperty(e)){throw"Unknown series: "+e}var d=this.series_[e];var b=d.options;if(b.hasOwnProperty(c)){return b[c]}return this.getForAxis(c,d.yAxis)};
		a.prototype.numAxes=function(){return this.yAxes_.length};a.prototype.axisForSeries=function(b){return this.series_[b].yAxis};
		a.prototype.axisOptions=function(b){return this.yAxes_[b].options};
		a.prototype.seriesForAxis=function(b){return this.yAxes_[b].series};
		a.prototype.seriesNames=function(){return this.labels_};
		a.prototype.indexOfSeries=function(b){return this.series_[b].idx};
		return a})();
"use strict";
var DygraphLayout=function(a){
	this.dygraph_=a;
	this.datasets=[];
	this.setNames=[];
	this.annotations=[];
	this.yAxes_=null;
	this.points=null;
	this.xTicks_=null;
	this.yTicks_=null
};
DygraphLayout.prototype.attr_=function(a){return this.dygraph_.attr_(a)};
DygraphLayout.prototype.addDataset=function(a,b){this.datasets.push(b);this.setNames.push(a)};
DygraphLayout.prototype.getPlotArea=function(){return this.area_};
DygraphLayout.prototype.computePlotArea=function(){var a={x:0,y:0};a.w=this.dygraph_.width_-a.x-this.attr_("rightGap");a.h=this.dygraph_.height_;var b={chart_div:this.dygraph_.graphDiv,reserveSpaceLeft:function(c){var d={x:a.x,y:a.y,w:c,h:a.h};a.x+=c;a.w-=c;return d},reserveSpaceRight:function(c){var d={x:a.x+a.w-c,y:a.y,w:c,h:a.h};a.w-=c;return d},reserveSpaceTop:function(c){var d={x:a.x,y:a.y,w:a.w,h:c};a.y+=c;a.h-=c;return d},reserveSpaceBottom:function(c){var d={x:a.x,y:a.y+a.h-c,w:a.w,h:c};a.h-=c;return d},chartRect:function(){return{x:a.x,y:a.y,w:a.w,h:a.h}}};this.dygraph_.cascadeEvents_("layout",b);this.area_=a};
DygraphLayout.prototype.setAnnotations=function(d){this.annotations=[];var e=this.attr_("xValueParser")||function(a){return a};for(var c=0;c<d.length;c++){var b={};if(!d[c].xval&&!d[c].x){this.dygraph_.error("Annotations must have an 'x' property");return}if(d[c].icon&&!(d[c].hasOwnProperty("width")&&d[c].hasOwnProperty("height"))){this.dygraph_.error("Must set width and height when setting annotation.icon property");return}Dygraph.update(b,d[c]);if(!b.xval){b.xval=e(b.x)}this.annotations.push(b)}};
DygraphLayout.prototype.setXTicks=function(a){
	//console.log("passing xTicks :" +a);
	this.xTicks_=a
};
DygraphLayout.prototype.setYAxes=function(a){this.yAxes_=a};
DygraphLayout.prototype.setDateWindow=function(a){this.dateWindow_=a};
DygraphLayout.prototype.evaluate=function(){this._evaluateLimits();this._evaluateLineCharts();this._evaluateLineTicks();this._evaluateAnnotations()};
DygraphLayout.prototype._evaluateLimits=function(){this.minxval=this.maxxval=null;if(this.dateWindow_){this.minxval=this.dateWindow_[0];this.maxxval=this.dateWindow_[1]}else{for(var f=0;f<this.datasets.length;++f){var d=this.datasets[f];if(d.length>1){var b=d[0][0];if(!this.minxval||b<this.minxval){this.minxval=b}var a=d[d.length-1][0];if(!this.maxxval||a>this.maxxval){this.maxxval=a}}}}this.xrange=this.maxxval-this.minxval;this.xscale=(this.xrange!==0?1/this.xrange:1);for(var c=0;c<this.yAxes_.length;c++){var e=this.yAxes_[c];e.minyval=e.computedValueRange[0];e.maxyval=e.computedValueRange[1];e.yrange=e.maxyval-e.minyval;e.yscale=(e.yrange!==0?1/e.yrange:1);if(e.g.attr_("logscale")){e.ylogrange=Dygraph.log10(e.maxyval)-Dygraph.log10(e.minyval);e.ylogscale=(e.ylogrange!==0?1/e.ylogrange:1);if(!isFinite(e.ylogrange)||isNaN(e.ylogrange)){e.g.error("axis "+c+" of graph at "+e.g+" can't be displayed in log scale for range ["+e.minyval+" - "+e.maxyval+"]")}}}};

DygraphLayout._calcYNormal=function(b,c,a){if(a){return 1-((Dygraph.log10(c)-Dygraph.log10(b.minyval))*b.ylogscale)}else{return 1-((c-b.minyval)*b.yscale)}};
DygraphLayout.prototype._evaluateLineCharts=function(){
	var c=this.attr_("connectSeparatedPoints");
	this.points=new Array(this.datasets.length);
	for(var a=0;a<this.datasets.length;a++){
		var e=this.datasets[a];
		var h=this.setNames[a];
		var b=this.dygraph_.axisPropertiesForSeries(h);
		var i=this.dygraph_.attributes_.getForSeries("logscale",h);
		var n=new Array(e.length);
		for(var f=0;f<e.length;f++){
			var m=e[f];
			var d=DygraphLayout.parseFloat_(m[0]);
			var k=DygraphLayout.parseFloat_(m[1]);
			var l=(d-this.minxval)*this.xscale;
			var g=DygraphLayout._calcYNormal(b,k,i);
			if(c&&m[1]===null){k=null}
			n[f]={x:l,y:g,xval:d,yval:k,name:h}
		}
		this.points[a]=n}
};
DygraphLayout.parseFloat_=function(a){if(a===null){return NaN}return a};
DygraphLayout.prototype._evaluateLineTicks=function(){
	var d,c,b,f;
	this.xticks=[];
	for(d=0;d<this.xTicks_.length;d++){
		c=this.xTicks_[d];b=c.label;
		f=this.xscale*(c.v-this.minxval);
		if((f>=0)&&(f<=1)){this.xticks.push([f,b])}
	}
	this.yticks=[];
	for(d=0;d<this.yAxes_.length;d++){
		var e=this.yAxes_[d];
		for(var a=0;a<e.ticks.length;a++){
			c=e.ticks[a];
			b=c.label;
			f=this.dygraph_.toPercentYCoord(c.v,d);
			if((f>=0)&&(f<=1)){this.yticks.push([d,f,b])}
		}
	}
};
DygraphLayout.prototype.evaluateWithError=function(){this.evaluate();if(!(this.attr_("errorBars")||this.attr_("customBars"))){return}var h=0;for(var a=0;a<this.datasets.length;++a){var p=this.points[a];var g=0;var f=this.datasets[a];var l=this.setNames[a];var e=this.dygraph_.axisPropertiesForSeries(l);var m=this.dygraph_.attributes_.getForSeries("logscale",l);for(g=0;g<f.length;g++,h++){var q=f[g];var c=DygraphLayout.parseFloat_(q[0]);var n=DygraphLayout.parseFloat_(q[1]);if(c==p[g].xval&&n==p[g].yval){var k=DygraphLayout.parseFloat_(q[2]);var d=DygraphLayout.parseFloat_(q[3]);var o=n-k;var b=n+d;p[g].y_top=DygraphLayout._calcYNormal(e,o,m);p[g].y_bottom=DygraphLayout._calcYNormal(e,b,m)}}}};DygraphLayout.prototype._evaluateAnnotations=function(){var d;var g={};for(d=0;d<this.annotations.length;d++){var b=this.annotations[d];g[b.xval+","+b.series]=b}this.annotated_points=[];if(!this.annotations||!this.annotations.length){return}for(var h=0;h<this.points.length;h++){var e=this.points[h];for(d=0;d<e.length;d++){var f=e[d];var c=f.xval+","+f.name;if(c in g){f.annotation=g[c];this.annotated_points.push(f)}}}};DygraphLayout.prototype.removeAllDatasets=function(){delete this.datasets;delete this.setNames;delete this.setPointsLengths;delete this.setPointsOffsets;this.datasets=[];this.setNames=[];this.setPointsLengths=[];this.setPointsOffsets=[]};DygraphLayout.prototype.unstackPointAtIndex=function(f,e){var a=this.points[f][e];if(!a.yval){return a}var c={};for(var d in a){c[d]=a[d]}if(!this.attr_("stackedGraph")){return c}if(f==this.points.length-1){return c}var b=this.points[f+1];if(b[e].xval==a.xval&&b[e].yval){c.yval-=b[e].yval}return c};"use strict";var DygraphCanvasRenderer=function(d,c,b,e){this.dygraph_=d;this.layout=e;this.element=c;this.elementContext=b;this.container=this.element.parentNode;this.height=this.element.height;this.width=this.element.width;if(!this.isIE&&!(DygraphCanvasRenderer.isSupported(this.element))){throw"Canvas is not supported."}this.area=e.getPlotArea();this.container.style.position="relative";this.container.style.width=this.width+"px";if(this.dygraph_.isUsingExcanvas_){this._createIEClipArea()}else{if(!Dygraph.isAndroid()){var a=this.dygraph_.canvas_ctx_;a.beginPath();a.rect(this.area.x,this.area.y,this.area.w,this.area.h);a.clip();a=this.dygraph_.hidden_ctx_;a.beginPath();a.rect(this.area.x,this.area.y,this.area.w,this.area.h);a.clip()}}};DygraphCanvasRenderer.prototype.attr_=function(a,b){return this.dygraph_.attr_(a,b)};DygraphCanvasRenderer.prototype.clear=function(){var a;if(this.isIE){try{if(this.clearDelay){this.clearDelay.cancel();this.clearDelay=null}a=this.elementContext}catch(b){return}}a=this.elementContext;a.clearRect(0,0,this.width,this.height)};DygraphCanvasRenderer.isSupported=function(f){var b=null;try{if(typeof(f)=="undefined"||f===null){b=document.createElement("canvas")}else{b=f}b.getContext("2d")}catch(c){var d=navigator.appVersion.match(/MSIE (\d\.\d)/);var a=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);if((!d)||(d[1]<6)||(a)){return false}return true}return true};DygraphCanvasRenderer.prototype.render=function(){this._updatePoints();this._renderLineChart()};DygraphCanvasRenderer.prototype._createIEClipArea=function(){var g="dygraph-clip-div";var f=this.dygraph_.graphDiv;for(var e=f.childNodes.length-1;e>=0;e--){if(f.childNodes[e].className==g){f.removeChild(f.childNodes[e])}}var c=document.bgColor;var d=this.dygraph_.graphDiv;while(d!=document){var a=d.currentStyle.backgroundColor;if(a&&a!="transparent"){c=a;break}d=d.parentNode}function b(j){if(j.w===0||j.h===0){return}var i=document.createElement("div");i.className=g;i.style.backgroundColor=c;i.style.position="absolute";i.style.left=j.x+"px";i.style.top=j.y+"px";i.style.width=j.w+"px";i.style.height=j.h+"px";f.appendChild(i)}var h=this.area;b({x:0,y:0,w:h.x,h:this.height});b({x:h.x,y:0,w:this.width-h.x,h:h.y});b({x:h.x+h.w,y:0,w:this.width-h.x-h.w,h:this.height});b({x:h.x,y:h.y+h.h,w:this.width-h.x,h:this.height-h.h-h.y})};DygraphCanvasRenderer._getIteratorPredicate=function(a){return a?DygraphCanvasRenderer._predicateThatSkipsEmptyPoints:null};DygraphCanvasRenderer._predicateThatSkipsEmptyPoints=function(b,a){return b[a].yval!==null};DygraphCanvasRenderer._drawStyledLine=function(i,a,m,q,f,n,d){var h=i.dygraph;var c=h.getOption("stepPlot");if(!Dygraph.isArrayLike(q)){q=null}var l=h.getOption("drawGapEdgePoints",i.setName);var o=i.points;var k=Dygraph.createIterator(o,0,o.length,DygraphCanvasRenderer._getIteratorPredicate(h.getOption("connectSeparatedPoints")));var j=q&&(q.length>=2);var p=i.drawingContext;p.save();if(j){p.installPattern(q)}var b=DygraphCanvasRenderer._drawSeries(i,k,m,d,f,l,c,a);DygraphCanvasRenderer._drawPointsOnLine(i,b,n,a,d);if(j){p.uninstallPattern()}p.restore()};DygraphCanvasRenderer._drawSeries=function(v,t,m,h,p,s,g,q){var b=null;var w=null;var k=null;var j;var o;var l=[];var f=true;var n=v.drawingContext;n.beginPath();n.strokeStyle=q;n.lineWidth=m;var c=t.array_;var u=t.end_;var a=t.predicate_;for(var r=t.start_;r<u;r++){o=c[r];if(a){while(r<u&&!a(c,r)){r++}if(r==u){break}o=c[r]}if(o.canvasy===null||o.canvasy!=o.canvasy){if(g&&b!==null){n.moveTo(b,w);n.lineTo(o.canvasx,w)}b=w=null}else{j=false;if(s||!b){t.nextIdx_=r;t.next();k=t.hasNext?t.peek.canvasy:null;var d=k===null||k!=k;j=(!b&&d);if(s){if((!f&&!b)||(t.hasNext&&d)){j=true}}}if(b!==null){if(m){if(g){n.moveTo(b,w);n.lineTo(o.canvasx,w)}n.lineTo(o.canvasx,o.canvasy)}}else{n.moveTo(o.canvasx,o.canvasy)}if(p||j){l.push([o.canvasx,o.canvasy])}b=o.canvasx;w=o.canvasy}f=false}n.stroke();return l};DygraphCanvasRenderer._drawPointsOnLine=function(h,i,f,d,g){var c=h.drawingContext;for(var b=0;b<i.length;b++){var a=i[b];c.save();f(h.dygraph,h.setName,c,a[0],a[1],d,g);c.restore()}};DygraphCanvasRenderer.prototype._updatePoints=function(){var e=this.layout.points;for(var c=e.length;c--;){var d=e[c];for(var b=d.length;b--;){var a=d[b];a.canvasx=this.area.w*a.x+this.area.x;a.canvasy=this.area.h*a.y+this.area.y}}};DygraphCanvasRenderer.prototype._renderLineChart=function(g,u){var h=u||this.elementContext;var n;var a=this.layout.points;var s=this.layout.setNames;var b;this.colors=this.dygraph_.colorsMap_;var o=this.attr_("plotter");var f=o;if(!Dygraph.isArrayLike(f)){f=[f]}var c={};for(n=0;n<s.length;n++){b=s[n];var t=this.attr_("plotter",b);if(t==o){continue}c[b]=t}for(n=0;n<f.length;n++){var r=f[n];var q=(n==f.length-1);for(var l=0;l<a.length;l++){b=s[l];if(g&&b!=g){continue}var m=a[l];var e=r;if(b in c){if(q){e=c[b]}else{continue}}var k=this.colors[b];var d=this.dygraph_.getOption("strokeWidth",b);h.save();h.strokeStyle=k;h.lineWidth=d;e({points:m,setName:b,drawingContext:h,color:k,strokeWidth:d,dygraph:this.dygraph_,axis:this.dygraph_.axisPropertiesForSeries(b),plotArea:this.area,seriesIndex:l,seriesCount:a.length,allSeriesPoints:a});h.restore()}}};DygraphCanvasRenderer._Plotters={linePlotter:function(a){DygraphCanvasRenderer._linePlotter(a)},fillPlotter:function(a){DygraphCanvasRenderer._fillPlotter(a)},errorPlotter:function(a){DygraphCanvasRenderer._errorPlotter(a)}};DygraphCanvasRenderer._linePlotter=function(f){var d=f.dygraph;var h=f.setName;var i=f.strokeWidth;var a=d.getOption("strokeBorderWidth",h);var j=d.getOption("drawPointCallback",h)||Dygraph.Circles.DEFAULT;var k=d.getOption("strokePattern",h);var c=d.getOption("drawPoints",h);var b=d.getOption("pointSize",h);if(a&&i){DygraphCanvasRenderer._drawStyledLine(f,d.getOption("strokeBorderColor",h),i+2*a,k,c,j,b)}DygraphCanvasRenderer._drawStyledLine(f,f.color,i,k,c,j,b)};DygraphCanvasRenderer._errorPlotter=function(s){var r=s.dygraph;var f=s.setName;var t=r.getOption("errorBars")||r.getOption("customBars");if(!t){return}var k=r.getOption("fillGraph",f);if(k){r.warn("Can't use fillGraph option with error bars")}var m=s.drawingContext;var n=s.color;var o=r.getOption("fillAlpha",f);var i=r.getOption("stepPlot");var p=s.points;var q=Dygraph.createIterator(p,0,p.length,DygraphCanvasRenderer._getIteratorPredicate(r.getOption("connectSeparatedPoints")));var j;var h=NaN;var c=NaN;var d=[-1,-1];var a=new RGBColorParser(n);var u="rgba("+a.r+","+a.g+","+a.b+","+o+")";m.fillStyle=u;m.beginPath();var b=function(e){return(e===null||e===undefined||isNaN(e))};while(q.hasNext){var l=q.next();if((!i&&b(l.y))||(i&&!isNaN(c)&&b(c))){h=NaN;continue}if(i){j=[l.y_bottom,l.y_top];c=l.y}else{j=[l.y_bottom,l.y_top]}j[0]=s.plotArea.h*j[0]+s.plotArea.y;j[1]=s.plotArea.h*j[1]+s.plotArea.y;if(!isNaN(h)){if(i){m.moveTo(h,d[0]);m.lineTo(l.canvasx,d[0]);m.lineTo(l.canvasx,d[1])}else{m.moveTo(h,d[0]);m.lineTo(l.canvasx,j[0]);m.lineTo(l.canvasx,j[1])}m.lineTo(h,d[1]);m.closePath()}d=j;h=l.canvasx}m.fill()};DygraphCanvasRenderer._fillPlotter=function(D){if(D.seriesIndex!==0){return}var B=D.dygraph;var F=B.getLabels().slice(1);for(var A=F.length;A>=0;A--){if(!B.visibility()[A]){F.splice(A,1)}}var h=(function(){for(var e=0;e<F.length;e++){if(B.getOption("fillGraph",F[e])){return true}}return false})();if(!h){return}var u=D.drawingContext;var C=D.plotArea;var c=D.allSeriesPoints;var x=c.length;var w=B.getOption("fillAlpha");var o=B.getOption("stepPlot");var j=B.getOption("stackedGraph");var p=B.getColors();var q={};var a;for(var s=x-1;s>=0;s--){var m=F[s];if(!B.getOption("fillGraph",m)){continue}var v=p[s];var f=B.axisPropertiesForSeries(m);var d=1+f.minyval*f.yscale;if(d<0){d=0}else{if(d>1){d=1}}d=C.h*d+C.y;var z=c[s];var y=Dygraph.createIterator(z,0,z.length,DygraphCanvasRenderer._getIteratorPredicate(B.getOption("connectSeparatedPoints")));var l=NaN;var k=[-1,-1];var r;var b=new RGBColorParser(v);var E="rgba("+b.r+","+b.g+","+b.b+","+w+")";u.fillStyle=E;u.beginPath();while(y.hasNext){var t=y.next();if(!Dygraph.isOK(t.y)){l=NaN;continue}if(j){a=q[t.canvasx];var n;if(a===undefined){n=d}else{if(o){n=a[0]}else{n=a}}r=[t.canvasy,n];if(o){if(k[0]===-1){q[t.canvasx]=[t.canvasy,d]}else{q[t.canvasx]=[t.canvasy,k[0]]}}else{q[t.canvasx]=t.canvasy}}else{r=[t.canvasy,d]}if(!isNaN(l)){u.moveTo(l,k[0]);if(o){u.lineTo(t.canvasx,k[0]);if(a){u.lineTo(t.canvasx,a[1])}else{u.lineTo(t.canvasx,r[1])}}else{u.lineTo(t.canvasx,r[0]);u.lineTo(t.canvasx,r[1])}u.lineTo(l,k[1]);u.closePath()}k=r;l=t.canvasx}u.fill()}};"use strict";var Dygraph=function(d,c,b,a){if(a!==undefined){this.warn("Using deprecated four-argument dygraph constructor");this.__old_init__(d,c,b,a)}else{this.__init__(d,c,b)}};
Dygraph.NAME="Dygraph";
Dygraph.VERSION="1.2";
Dygraph.__repr__=function(){return"["+this.NAME+" "+this.VERSION+"]"};
Dygraph.toString=function(){return this.__repr__()};
Dygraph.DEFAULT_ROLL_PERIOD=1;Dygraph.DEFAULT_WIDTH=480;Dygraph.DEFAULT_HEIGHT=320;Dygraph.ANIMATION_STEPS=12;Dygraph.ANIMATION_DURATION=200;
Dygraph.numberValueFormatter=function(a,e,h,d){
	var b=e("sigFigs");
	if(b!==null){return Dygraph.floatFormat(a,b)}
	var f=e("digitsAfterDecimal");
	var c=e("maxNumberWidth");
	/*update by In Sook Moon
	 * a!=0 changed to Number Number(a)!=0
	 * a=0. or a=-0.00.
	 */
	//console.log("a: "+a +" Math.abs"+Math.abs(a) +" Math.pow(10,c) :"+Math.pow(10,c)+" Math.pow(10,-f) :"+Math.pow(10,-f));
	if(Number(a)!==0&&(Math.abs(a)>=Math.pow(10,c)||Math.abs(a)<Math.pow(10,-f))){
		//console.log("a : "+a +" f:"+f +" numuber:"+Number(a));
		return Number(a).toExponential(f);
	}
	else{
		//console.log("round"+a +" f:"+f +" round value :"+Dygraph.round_(a,f));
		return""+Dygraph.round_(a,f)
	}
};
Dygraph.numberAxisLabelFormatter=function(a,d,c,b){return Dygraph.numberValueFormatter(a,c,b)};
Dygraph.dateString_=function(e){
	
	var i=Dygraph.zeropad;
	var h=new Date(e);
	var f=""+h.getFullYear();
	var g=i(h.getMonth()+1);
	var a=i(h.getDate());
	var c="";
	var b=h.getHours()*3600+h.getMinutes()*60+h.getSeconds();
	if(b){c=" "+Dygraph.hmsString_(e)}
	
	return f+"-"+g+"-"+a+c
};
Dygraph.dateAxisFormatter=function(b,c){
	//console.log("passing axis formatatter");
	if(c>=Dygraph.DECADAL){return b.strftime("%Y")}
	else{
		if(c>=Dygraph.MONTHLY){return b.strftime("%b %y")}
		else{
			var a=b.getHours()*3600+b.getMinutes()*60+b.getSeconds()+b.getMilliseconds();
			if(a===0||c>=Dygraph.DAILY){return new Date(b.getTime()+3600*1000).strftime("%d%b")}
			else{return Dygraph.hmsString_(b.getTime())}
		}
	}
};
Dygraph.Plotters=DygraphCanvasRenderer._Plotters;
Dygraph.DEFAULT_ATTRS={highlightCircleSize:3,highlightSeriesOpts:null,highlightSeriesBackgroundAlpha:0.5,labelsDivWidth:250,labelsDivStyles:{},labelsSeparateLines:false,labelsShowZeroValues:true,labelsKMB:false,labelsKMG2:false,showLabelsOnHighlight:true,digitsAfterDecimal:6/*Changed By In Sook Moon*/,maxNumberWidth:6,/*6 to 10 chaged by In Sook Moon */sigFigs:null,strokeWidth:1,strokeBorderWidth:0,strokeBorderColor:"white",axisTickSize:3,axisLabelFontSize:14,xAxisLabelWidth:50,yAxisLabelWidth:50,rightGap:5,showRoller:false,xValueParser:Dygraph.dateParser,delimiter:",",sigma:2,errorBars:false,fractions:false,wilsonInterval:true,customBars:false,fillGraph:false,fillAlpha:0.15,connectSeparatedPoints:false,stackedGraph:false,hideOverlayOnMouseOut:true,legend:"onmouseover",stepPlot:false,avoidMinZero:false,drawAxesAtZero:false,titleHeight:28,xLabelHeight:18,yLabelWidth:18,drawXAxis:true,drawYAxis:true,axisLineColor:"black",axisLineWidth:0.3,gridLineWidth:0.3,axisLabelColor:"black",axisLabelFont:"Arial",axisLabelWidth:50,drawYGrid:true,drawXGrid:true,gridLineColor:"rgb(128,128,128)",interactionModel:null,animatedZooms:false,showRangeSelector:false,rangeSelectorHeight:40,rangeSelectorPlotStrokeColor:"#808FAB",rangeSelectorPlotFillColor:"#A7B1C4",plotter:[Dygraph.Plotters.fillPlotter,Dygraph.Plotters.errorPlotter,Dygraph.Plotters.linePlotter],plugins:[],axes:{x:{pixelsPerLabel:60,axisLabelFormatter:Dygraph.dateAxisFormatter,valueFormatter:Dygraph.dateString_,ticker:null},y:{pixelsPerLabel:30,valueFormatter:Dygraph.numberValueFormatter,axisLabelFormatter:Dygraph.numberAxisLabelFormatter,ticker:null},y2:{pixelsPerLabel:30,valueFormatter:Dygraph.numberValueFormatter,axisLabelFormatter:Dygraph.numberAxisLabelFormatter,ticker:null}}};Dygraph.HORIZONTAL=1;Dygraph.VERTICAL=2;Dygraph.PLUGINS=[];Dygraph.addedAnnotationCSS=false;Dygraph.prototype.__old_init__=function(f,d,e,b){if(e!==null){var a=["Date"];for(var c=0;c<e.length;c++){a.push(e[c])}Dygraph.update(b,{labels:a})}this.__init__(f,d,b)};Dygraph.prototype.__init__=function(a,c,l){if(/MSIE/.test(navigator.userAgent)&&!window.opera&&typeof(G_vmlCanvasManager)!="undefined"&&document.readyState!="complete"){var o=this;setTimeout(function(){o.__init__(a,c,l)},100);return}if(l===null||l===undefined){l={}}l=Dygraph.mapLegacyOptions_(l);if(typeof(a)=="string"){a=document.getElementById(a)}if(!a){Dygraph.error("Constructing dygraph with a non-existent div!");return}this.isUsingExcanvas_=typeof(G_vmlCanvasManager)!="undefined";this.maindiv_=a;this.file_=c;this.rollPeriod_=l.rollPeriod||Dygraph.DEFAULT_ROLL_PERIOD;this.previousVerticalX_=-1;this.fractions_=l.fractions||false;this.dateWindow_=l.dateWindow||null;this.is_initial_draw_=true;this.annotations_=[];this.zoomed_x_=false;this.zoomed_y_=false;a.innerHTML="";if(a.style.width===""&&l.width){a.style.width=l.width+"px"}if(a.style.height===""&&l.height){a.style.height=l.height+"px"}if(a.style.height===""&&a.clientHeight===0){a.style.height=Dygraph.DEFAULT_HEIGHT+"px";if(a.style.width===""){a.style.width=Dygraph.DEFAULT_WIDTH+"px"}}this.width_=a.clientWidth;this.height_=a.clientHeight;if(l.stackedGraph){l.fillGraph=true}this.user_attrs_={};Dygraph.update(this.user_attrs_,l);this.attrs_={};Dygraph.updateDeep(this.attrs_,Dygraph.DEFAULT_ATTRS);this.boundaryIds_=[];this.setIndexByName_={};this.datasetIndex_=[];this.registeredEvents_=[];this.eventListeners_={};this.attributes_=new DygraphOptions(this);this.createInterface_();this.plugins_=[];var d=Dygraph.PLUGINS.concat(this.getOption("plugins"));for(var g=0;g<d.length;g++){var k=d[g];var f=new k();var j={plugin:f,events:{},options:{},pluginOptions:{}};var b=f.activate(this);for(var h in b){j.events[h]=b[h]}this.plugins_.push(j)}for(var g=0;g<this.plugins_.length;g++){var n=this.plugins_[g];for(var h in n.events){if(!n.events.hasOwnProperty(h)){continue}var m=n.events[h];var e=[n.plugin,m];if(!(h in this.eventListeners_)){this.eventListeners_[h]=[e]}else{this.eventListeners_[h].push(e)}}}this.createDragInterface_();this.start_()};
Dygraph.prototype.cascadeEvents_=function(c,b){if(!(c in this.eventListeners_)){return true}var g={dygraph:this,cancelable:false,defaultPrevented:false,preventDefault:function(){if(!g.cancelable){throw"Cannot call preventDefault on non-cancelable event."}g.defaultPrevented=true},propagationStopped:false,stopPropagation:function(){g.propagationStopped=true}};Dygraph.update(g,b);var a=this.eventListeners_[c];if(a){for(var d=a.length-1;d>=0;d--){var f=a[d][0];var h=a[d][1];h.call(f,g);if(g.propagationStopped){break}}}return g.defaultPrevented};Dygraph.prototype.isZoomed=function(a){if(a===null||a===undefined){return this.zoomed_x_||this.zoomed_y_}if(a==="x"){return this.zoomed_x_}if(a==="y"){return this.zoomed_y_}throw"axis parameter is ["+a+"] must be null, 'x' or 'y'."};Dygraph.prototype.toString=function(){var a=this.maindiv_;var b=(a&&a.id)?a.id:a;return"[Dygraph "+b+"]"};
Dygraph.prototype.attr_=function(b,a){return a?this.attributes_.getForSeries(b,a):this.attributes_.get(b)};
Dygraph.prototype.getOption=function(a,b){return this.attr_(a,b)};
Dygraph.prototype.getOptionForAxis=function(a,b){return this.attributes_.getForAxis(a,b)};
Dygraph.prototype.optionsViewForAxis_=function(b){
	var a=this;
	return function(c){var d=a.user_attrs_.axes;if(d&&d[b]&&d[b][c]){return d[b][c]}if(typeof(a.user_attrs_[c])!="undefined"){return a.user_attrs_[c]}d=a.attrs_.axes;if(d&&d[b]&&d[b][c]){return d[b][c]}if(b=="y"&&a.axes_[0].hasOwnProperty(c)){return a.axes_[0][c]}else{if(b=="y2"&&a.axes_[1].hasOwnProperty(c)){return a.axes_[1][c]}}return a.attr_(c)}
};
Dygraph.prototype.rollPeriod=function(){return this.rollPeriod_};
Dygraph.prototype.xAxisRange=function(){
	//console.log("passing xAxisRange:"+this.dateWindow_?this.dateWindow_:this.xAxisExtremes());
	return this.dateWindow_?this.dateWindow_:this.xAxisExtremes()
};
Dygraph.prototype.xAxisExtremes=function(){
	//console.log("xAxis:"+b);
	var b=this.rawData_[0][0];var a=this.rawData_[this.rawData_.length-1][0];
	return[b,a]
};
Dygraph.prototype.yAxisRange=function(a){
	if(typeof(a)=="undefined"){a=0}
	if(a<0||a>=this.axes_.length){return null}
	var b=this.axes_[a];
	return[b.computedValueRange[0],b.computedValueRange[1]]
};
Dygraph.prototype.yAxisRanges=function(){var a=[];for(var b=0;b<this.axes_.length;b++){a.push(this.yAxisRange(b))}return a};
Dygraph.prototype.toDomCoords=function(a,c,b){return[this.toDomXCoord(a),this.toDomYCoord(c,b)]};
Dygraph.prototype.toDomXCoord=function(b){if(b===null){return null}var c=this.plotter_.area;var a=this.xAxisRange();return c.x+(b-a[0])/(a[1]-a[0])*c.w};
Dygraph.prototype.toDomYCoord=function(d,a){var c=this.toPercentYCoord(d,a);if(c===null){return null}var b=this.plotter_.area;return b.y+c*b.h};
Dygraph.prototype.toDataCoords=function(a,c,b){return[this.toDataXCoord(a),this.toDataYCoord(c,b)]};
Dygraph.prototype.toDataXCoord=function(b){if(b===null){return null}var c=this.plotter_.area;var a=this.xAxisRange();return a[0]+(b-c.x)/c.w*(a[1]-a[0])};
Dygraph.prototype.toDataYCoord=function(h,b){if(h===null){return null}var c=this.plotter_.area;var g=this.yAxisRange(b);if(typeof(b)=="undefined"){b=0}if(!this.axes_[b].logscale){return g[0]+(c.y+c.h-h)/c.h*(g[1]-g[0])}else{var f=(h-c.y)/c.h;var a=Dygraph.log10(g[1]);var e=a-(f*(a-Dygraph.log10(g[0])));var d=Math.pow(Dygraph.LOG_SCALE,e);return d}};Dygraph.prototype.toPercentYCoord=function(f,c){if(f===null){return null}if(typeof(c)=="undefined"){c=0}var e=this.yAxisRange(c);var d;var b=this.attributes_.getForAxis("logscale",c);if(!b){d=(e[1]-f)/(e[1]-e[0])}else{var a=Dygraph.log10(e[1]);d=(a-Dygraph.log10(f))/(a-Dygraph.log10(e[0]))}return d};Dygraph.prototype.toPercentXCoord=function(b){if(b===null){return null}var a=this.xAxisRange();return(b-a[0])/(a[1]-a[0])};
Dygraph.prototype.numColumns=function(){return this.rawData_[0]?this.rawData_[0].length:this.attr_("labels").length};
Dygraph.prototype.numRows=function(){return this.rawData_.length};
Dygraph.prototype.fullXRange_=function(){
	//console.log("fullXRange_");
	if(this.numRows()>0){
		return[this.rawData_[0][0],this.rawData_[this.numRows()-1][0]]
	}
	else{return[0,1]}
};
Dygraph.prototype.getValue=function(b,a){if(b<0||b>this.rawData_.length){return null}if(a<0||a>this.rawData_[b].length){return null}return this.rawData_[b][a]};
Dygraph.prototype.createInterface_=function(){var a=this.maindiv_;this.graphDiv=document.createElement("div");this.graphDiv.style.width=this.width_+"px";this.graphDiv.style.height=this.height_+"px";a.appendChild(this.graphDiv);this.canvas_=Dygraph.createCanvas();this.canvas_.style.position="absolute";this.canvas_.width=this.width_;this.canvas_.height=this.height_;this.canvas_.style.width=this.width_+"px";this.canvas_.style.height=this.height_+"px";this.canvas_ctx_=Dygraph.getContext(this.canvas_);this.hidden_=this.createPlotKitCanvas_(this.canvas_);this.hidden_ctx_=Dygraph.getContext(this.hidden_);this.graphDiv.appendChild(this.hidden_);this.graphDiv.appendChild(this.canvas_);this.mouseEventElement_=this.createMouseEventElement_();this.layout_=new DygraphLayout(this);var b=this;if(!this.mouseMoveHandler_){this.mouseMoveHandler_=function(c){b.mouseMove_(c)};this.addEvent(this.mouseEventElement_,"mousemove",this.mouseMoveHandler_);this.mouseOutHandler_=function(c){b.mouseOut_(c)};this.addEvent(this.mouseEventElement_,"mouseout",this.mouseOutHandler_);this.resizeHandler_=function(c){b.resize()};this.addEvent(window,"resize",this.resizeHandler_)}};Dygraph.prototype.destroy=function(){var b=function(e){while(e.hasChildNodes()){b(e.firstChild);e.removeChild(e.firstChild)}};for(var a=0;a<this.registeredEvents_.length;a++){var d=this.registeredEvents_[a];Dygraph.removeEvent(d.elem,d.type,d.fn)}this.registeredEvents_=[];Dygraph.removeEvent(this.mouseEventElement_,"mouseout",this.mouseOutHandler_);Dygraph.removeEvent(this.mouseEventElement_,"mousemove",this.mouseMoveHandler_);Dygraph.removeEvent(this.mouseEventElement_,"mousemove",this.mouseUpHandler_);Dygraph.removeEvent(window,"resize",this.resizeHandler_);this.resizeHandler_=null;b(this.maindiv_);var c=function(e){for(var f in e){if(typeof(e[f])==="object"){e[f]=null}}};c(this.layout_);c(this.plotter_);c(this)};Dygraph.prototype.createPlotKitCanvas_=function(a){var b=Dygraph.createCanvas();b.style.position="absolute";b.style.top=a.style.top;b.style.left=a.style.left;b.width=this.width_;b.height=this.height_;b.style.width=this.width_+"px";b.style.height=this.height_+"px";return b};Dygraph.prototype.createMouseEventElement_=function(){if(this.isUsingExcanvas_){var a=document.createElement("div");a.style.position="absolute";a.style.backgroundColor="white";a.style.filter="alpha(opacity=0)";a.style.width=this.width_+"px";a.style.height=this.height_+"px";this.graphDiv.appendChild(a);return a}else{return this.canvas_}};Dygraph.prototype.setColors_=function(){var g=this.getLabels();var e=g.length-1;this.colors_=[];this.colorsMap_={};var a=this.attr_("colors");var d;if(!a){var c=this.attr_("colorSaturation")||1;var b=this.attr_("colorValue")||0.5;var k=Math.ceil(e/2);for(d=1;d<=e;d++){if(!this.visibility()[d-1]){continue}var h=d%2?Math.ceil(d/2):(k+d/2);var f=(1*h/(1+e));var j=Dygraph.hsvToRGB(f,c,b);this.colors_.push(j);this.colorsMap_[g[d]]=j}}else{for(d=0;d<e;d++){if(!this.visibility()[d]){continue}var j=a[d%a.length];this.colors_.push(j);this.colorsMap_[g[1+d]]=j}}};Dygraph.prototype.getColors=function(){return this.colors_};Dygraph.prototype.getPropertiesForSeries=function(c){var a=-1;var d=this.getLabels();for(var b=1;b<d.length;b++){if(d[b]==c){a=b;break}}if(a==-1){return null}return{name:c,column:a,visible:this.visibility()[a-1],color:this.colorsMap_[c],axis:1+this.attributes_.axisForSeries(c)}};Dygraph.prototype.createRollInterface_=function(){if(!this.roller_){this.roller_=document.createElement("input");this.roller_.type="text";this.roller_.style.display="none";this.graphDiv.appendChild(this.roller_)}var e=this.attr_("showRoller")?"block":"none";var d=this.plotter_.area;var b={position:"absolute",zIndex:10,top:(d.y+d.h-25)+"px",left:(d.x+1)+"px",display:e};this.roller_.size="2";this.roller_.value=this.rollPeriod_;for(var a in b){if(b.hasOwnProperty(a)){this.roller_.style[a]=b[a]}}var c=this;this.roller_.onchange=function(){c.adjustRoll(c.roller_.value)}};Dygraph.prototype.dragGetX_=function(b,a){return Dygraph.pageX(b)-a.px};Dygraph.prototype.dragGetY_=function(b,a){return Dygraph.pageY(b)-a.py};Dygraph.prototype.createDragInterface_=function(){var c={isZooming:false,isPanning:false,is2DPan:false,dragStartX:null,dragStartY:null,dragEndX:null,dragEndY:null,dragDirection:null,prevEndX:null,prevEndY:null,prevDragDirection:null,cancelNextDblclick:false,initialLeftmostDate:null,xUnitsPerPixel:null,dateRange:null,px:0,py:0,boundedDates:null,boundedValues:null,tarp:new Dygraph.IFrameTarp(),initializeMouseDown:function(i,h,f){if(i.preventDefault){i.preventDefault()}else{i.returnValue=false;i.cancelBubble=true}f.px=Dygraph.findPosX(h.canvas_);f.py=Dygraph.findPosY(h.canvas_);f.dragStartX=h.dragGetX_(i,f);f.dragStartY=h.dragGetY_(i,f);f.cancelNextDblclick=false;f.tarp.cover()}};var e=this.attr_("interactionModel");var b=this;var d=function(f){return function(g){f(g,b,c)}};for(var a in e){if(!e.hasOwnProperty(a)){continue}this.addEvent(this.mouseEventElement_,a,d(e[a]))}this.mouseUpHandler_=function(g){if(c.isZooming||c.isPanning){c.isZooming=false;c.dragStartX=null;c.dragStartY=null}if(c.isPanning){c.isPanning=false;c.draggingDate=null;c.dateRange=null;for(var f=0;f<b.axes_.length;f++){delete b.axes_[f].draggingValue;delete b.axes_[f].dragValueRange}}c.tarp.uncover()};this.addEvent(document,"mouseup",this.mouseUpHandler_)};
Dygraph.prototype.drawZoomRect_=function(e,c,i,b,g,a,f,d){var h=this.canvas_ctx_;if(a==Dygraph.HORIZONTAL){h.clearRect(Math.min(c,f),this.layout_.getPlotArea().y,Math.abs(c-f),this.layout_.getPlotArea().h)}else{if(a==Dygraph.VERTICAL){h.clearRect(this.layout_.getPlotArea().x,Math.min(b,d),this.layout_.getPlotArea().w,Math.abs(b-d))}}if(e==Dygraph.HORIZONTAL){if(i&&c){h.fillStyle="rgba(128,128,128,0.33)";h.fillRect(Math.min(c,i),this.layout_.getPlotArea().y,Math.abs(i-c),this.layout_.getPlotArea().h)}}else{if(e==Dygraph.VERTICAL){if(g&&b){h.fillStyle="rgba(128,128,128,0.33)";h.fillRect(this.layout_.getPlotArea().x,Math.min(b,g),this.layout_.getPlotArea().w,Math.abs(g-b))}}}if(this.isUsingExcanvas_){this.currentZoomRectArgs_=[e,c,i,b,g,0,0,0]}};Dygraph.prototype.clearZoomRect_=function(){this.currentZoomRectArgs_=null;this.canvas_ctx_.clearRect(0,0,this.canvas_.width,this.canvas_.height)};Dygraph.prototype.doZoomX_=function(c,a){this.currentZoomRectArgs_=null;var b=this.toDataXCoord(c);var d=this.toDataXCoord(a);this.doZoomXDates_(b,d)};Dygraph.zoomAnimationFunction=function(c,b){var a=1.5;return(1-Math.pow(a,-c))/(1-Math.pow(a,-b))};
Dygraph.prototype.doZoomXDates_=function(c,e){var a=this.xAxisRange();var d=[c,e];this.zoomed_x_=true;var b=this;this.doAnimatedZoom(a,d,null,null,function(){if(b.attr_("zoomCallback")){b.attr_("zoomCallback")(c,e,b.yAxisRanges())}})};
Dygraph.prototype.doZoomY_=function(h,f){
	this.currentZoomRectArgs_=null;
	var c=this.yAxisRanges();
	var b=[];
	for(var e=0;e<this.axes_.length;e++){
		var d=this.toDataYCoord(h,e);
		var a=this.toDataYCoord(f,e);
		b.push([a,d])
	}
	this.zoomed_y_=true;
	var g=this;this.doAnimatedZoom(null,null,c,b,function(){if(g.attr_("zoomCallback")){var i=g.xAxisRange();g.attr_("zoomCallback")(i[0],i[1],g.yAxisRanges())}})
};
Dygraph.prototype.resetZoom=function(){var c=false,d=false,a=false;if(this.dateWindow_!==null){c=true;d=true}for(var g=0;g<this.axes_.length;g++){if(typeof(this.axes_[g].valueWindow)!=="undefined"&&this.axes_[g].valueWindow!==null){c=true;a=true}}this.clearSelection();if(c){this.zoomed_x_=false;this.zoomed_y_=false;var f=this.rawData_[0][0];var b=this.rawData_[this.rawData_.length-1][0];if(!this.attr_("animatedZooms")){this.dateWindow_=null;for(g=0;g<this.axes_.length;g++){if(this.axes_[g].valueWindow!==null){delete this.axes_[g].valueWindow}}this.drawGraph_();if(this.attr_("zoomCallback")){this.attr_("zoomCallback")(f,b,this.yAxisRanges())}return}var l=null,m=null,k=null,h=null;if(d){l=this.xAxisRange();m=[f,b]}if(a){k=this.yAxisRanges();var n=this.gatherDatasets_(this.rolledSeries_,null);var o=n[1];this.computeYAxisRanges_(o);h=[];for(g=0;g<this.axes_.length;g++){var e=this.axes_[g];h.push((e.valueRange!==null&&e.valueRange!==undefined)?e.valueRange:e.extremeRange)}}var j=this;this.doAnimatedZoom(l,m,k,h,function(){j.dateWindow_=null;for(var p=0;p<j.axes_.length;p++){if(j.axes_[p].valueWindow!==null){delete j.axes_[p].valueWindow}}if(j.attr_("zoomCallback")){j.attr_("zoomCallback")(f,b,j.yAxisRanges())}})}};Dygraph.prototype.doAnimatedZoom=function(a,e,b,c,m){var i=this.attr_("animatedZooms")?Dygraph.ANIMATION_STEPS:1;var l=[];var k=[];var f,d;if(a!==null&&e!==null){for(f=1;f<=i;f++){d=Dygraph.zoomAnimationFunction(f,i);l[f-1]=[a[0]*(1-d)+d*e[0],a[1]*(1-d)+d*e[1]]}}if(b!==null&&c!==null){for(f=1;f<=i;f++){d=Dygraph.zoomAnimationFunction(f,i);var n=[];for(var g=0;g<this.axes_.length;g++){n.push([b[g][0]*(1-d)+d*c[g][0],b[g][1]*(1-d)+d*c[g][1]])}k[f-1]=n}}var h=this;Dygraph.repeatAndCleanup(function(p){if(k.length){for(var o=0;o<h.axes_.length;o++){var j=k[p][o];h.axes_[o].valueWindow=[j[0],j[1]]}}if(l.length){h.dateWindow_=l[p]}h.drawGraph_()},i,Dygraph.ANIMATION_DURATION/i,m)};Dygraph.prototype.getArea=function(){return this.plotter_.area};Dygraph.prototype.eventToDomCoords=function(c){var b=Dygraph.pageX(c)-Dygraph.findPosX(this.mouseEventElement_);var a=Dygraph.pageY(c)-Dygraph.findPosY(this.mouseEventElement_);return[b,a]};Dygraph.prototype.findClosestRow=function(b){var k=Infinity;var d=-1,a=-1;var g=this.layout_.points;for(var e=0;e<g.length;e++){var m=g[e];var f=m.length;for(var c=0;c<f;c++){var l=m[c];if(!Dygraph.isValidPoint(l,true)){continue}var h=Math.abs(l.canvasx-b);if(h<k){k=h;a=e;d=c}}}return this.idxToRow_(a,d)};Dygraph.prototype.findClosestPoint=function(f,e){var j=Infinity;var k=-1;var h,o,n,l,d,c;for(var b=this.layout_.datasets.length-1;b>=0;--b){var m=this.layout_.points[b];for(var g=0;g<m.length;++g){var l=m[g];if(!Dygraph.isValidPoint(l)){continue}o=l.canvasx-f;n=l.canvasy-e;h=o*o+n*n;if(h<j){j=h;d=l;c=b;k=g}}}var a=this.layout_.setNames[c];return{row:k+this.getLeftBoundary_(),seriesName:a,point:d}};Dygraph.prototype.findStackedPoint=function(i,h){var p=this.findClosestRow(i);var g=this.getLeftBoundary_();var e=p-g;var f,c;for(var d=0;d<this.layout_.datasets.length;++d){var l=this.layout_.points[d];if(e>=l.length){continue}var m=l[e];if(!Dygraph.isValidPoint(m)){continue}var j=m.canvasy;if(i>m.canvasx&&e+1<l.length){var k=l[e+1];if(Dygraph.isValidPoint(k)){var o=k.canvasx-m.canvasx;if(o>0){var a=(i-m.canvasx)/o;j+=a*(k.canvasy-m.canvasy)}}}else{if(i<m.canvasx&&e>0){var n=l[e-1];if(Dygraph.isValidPoint(n)){var o=m.canvasx-n.canvasx;if(o>0){var a=(m.canvasx-i)/o;j+=a*(n.canvasy-m.canvasy)}}}}if(d===0||j<h){f=m;c=d}}var b=this.layout_.setNames[c];return{row:p,seriesName:b,point:f}};Dygraph.prototype.mouseMove_=function(b){var h=this.layout_.points;if(h===undefined||h===null){return}var e=this.eventToDomCoords(b);var a=e[0];var j=e[1];var f=this.attr_("highlightSeriesOpts");var d=false;if(f&&!this.isSeriesLocked()){var c;if(this.attr_("stackedGraph")){c=this.findStackedPoint(a,j)}else{c=this.findClosestPoint(a,j)}d=this.setSelection(c.row,c.seriesName)}else{var g=this.findClosestRow(a);d=this.setSelection(g)}var i=this.attr_("highlightCallback");if(i&&d){i(b,this.lastx_,this.selPoints_,this.lastRow_,this.highlightSet_)}};Dygraph.prototype.getLeftBoundary_=function(){for(var a=0;a<this.boundaryIds_.length;a++){if(this.boundaryIds_[a]!==undefined){return this.boundaryIds_[a][0]}}return 0};Dygraph.prototype.idxToRow_=function(b,a){if(a<0){return -1}var c=this.getLeftBoundary_();return c+a};Dygraph.prototype.animateSelection_=function(f){var e=10;var c=30;if(this.fadeLevel===undefined){this.fadeLevel=0}if(this.animateId===undefined){this.animateId=0}var g=this.fadeLevel;var b=f<0?g:e-g;if(b<=0){if(this.fadeLevel){this.updateSelection_(1)}return}var a=++this.animateId;var d=this;Dygraph.repeatAndCleanup(function(h){if(d.animateId!=a){return}d.fadeLevel+=f;if(d.fadeLevel===0){d.clearSelection()}else{d.updateSelection_(d.fadeLevel/e)}},b,c,function(){})};Dygraph.prototype.updateSelection_=function(d){this.cascadeEvents_("select",{selectedX:this.lastx_,selectedPoints:this.selPoints_});var h;var n=this.canvas_ctx_;if(this.attr_("highlightSeriesOpts")){n.clearRect(0,0,this.width_,this.height_);var f=1-this.attr_("highlightSeriesBackgroundAlpha");if(f){var g=true;if(g){if(d===undefined){this.animateSelection_(1);return}f*=d}n.fillStyle="rgba(255,255,255,"+f+")";n.fillRect(0,0,this.width_,this.height_)}this.plotter_._renderLineChart(this.highlightSet_,n)}else{if(this.previousVerticalX_>=0){var j=0;var k=this.attr_("labels");for(h=1;h<k.length;h++){var c=this.attr_("highlightCircleSize",k[h]);if(c>j){j=c}}var l=this.previousVerticalX_;n.clearRect(l-j-1,0,2*j+2,this.height_)}}if(this.isUsingExcanvas_&&this.currentZoomRectArgs_){Dygraph.prototype.drawZoomRect_.apply(this,this.currentZoomRectArgs_)}if(this.selPoints_.length>0){var b=this.selPoints_[0].canvasx;n.save();for(h=0;h<this.selPoints_.length;h++){var o=this.selPoints_[h];if(!Dygraph.isOK(o.canvasy)){continue}var a=this.attr_("highlightCircleSize",o.name);var m=this.attr_("drawHighlightPointCallback",o.name);var e=this.plotter_.colors[o.name];if(!m){m=Dygraph.Circles.DEFAULT}n.lineWidth=this.attr_("strokeWidth",o.name);n.strokeStyle=e;n.fillStyle=e;m(this.g,o.name,n,b,o.canvasy,e,a)}n.restore();this.previousVerticalX_=b}};Dygraph.prototype.setSelection=function(d,g,f){this.selPoints_=[];if(d!==false){d-=this.getLeftBoundary_()}var c=false;if(d!==false&&d>=0){if(d!=this.lastRow_){c=true}this.lastRow_=d;for(var b=0;b<this.layout_.datasets.length;++b){var e=this.layout_.datasets[b];if(d<e.length){var a=this.layout_.points[b][d];if(this.attr_("stackedGraph")){a=this.layout_.unstackPointAtIndex(b,d)}if(a.yval!==null){this.selPoints_.push(a)}}}}else{if(this.lastRow_>=0){c=true}this.lastRow_=-1}if(this.selPoints_.length){this.lastx_=this.selPoints_[0].xval}else{this.lastx_=-1}if(g!==undefined){if(this.highlightSet_!==g){c=true}this.highlightSet_=g}if(f!==undefined){this.lockedSet_=f}if(c){this.updateSelection_(undefined)}return c};Dygraph.prototype.mouseOut_=function(a){if(this.attr_("unhighlightCallback")){this.attr_("unhighlightCallback")(a)}if(this.attr_("hideOverlayOnMouseOut")&&!this.lockedSet_){this.clearSelection()}};Dygraph.prototype.clearSelection=function(){this.cascadeEvents_("deselect",{});this.lockedSet_=false;if(this.fadeLevel){this.animateSelection_(-1);return}this.canvas_ctx_.clearRect(0,0,this.width_,this.height_);this.fadeLevel=0;this.selPoints_=[];this.lastx_=-1;this.lastRow_=-1;this.highlightSet_=null};Dygraph.prototype.getSelection=function(){if(!this.selPoints_||this.selPoints_.length<1){return -1}for(var c=0;c<this.layout_.points.length;c++){var a=this.layout_.points[c];for(var b=0;b<a.length;b++){if(a[b].x==this.selPoints_[0].x){return b+this.getLeftBoundary_()}}}return -1};
Dygraph.prototype.getHighlightSeries=function(){return this.highlightSet_};
Dygraph.prototype.isSeriesLocked=function(){return this.lockedSet_};
Dygraph.prototype.loadedEvent_=function(a){this.rawData_=this.parseCSV_(a);this.predraw_()};
Dygraph.prototype.addXTicks_=function(){
	var a;
	if(this.dateWindow_){
		a=[this.dateWindow_[0],this.dateWindow_[1]]
		
	}else{
		a=this.fullXRange_();
		
	}
	var c=this.optionsViewForAxis_("x");
	//console.log(c("ticker"));
	var b=c("ticker")(a[0],a[1],this.width_,c,this);
	
	this.layout_.setXTicks(b)
};
Dygraph.prototype.extremeValues_=function(d){
	var h=null,f=null,c,g;
	var b=this.attr_("errorBars")||this.attr_("customBars");
	if(b){
		for(c=0;c<d.length;c++){
			g=d[c][1][0];
			if(g===null||isNaN(g)){continue}
			var a=g-d[c][1][1];
			var e=g+d[c][1][2];
			if(a>g){a=g}if(e<g){e=g}
			if(f===null||e>f){f=e}
			if(h===null||a<h){h=a}
		}
	}else{
		for(c=0;c<d.length;c++){
			g=d[c][1];
			if(g===null||isNaN(g)){continue}
			if(f===null||Number(g)>Number(f)){f=g}
			if(h===null||Number(g)<Number(h)){
				h=g;
			}
			
		}
	}
	//console.log("h:"+h+" f:"+f);
	return[h,f]
};
Dygraph.prototype.predraw_=function(){var e=new Date();this.layout_.computePlotArea();this.computeYAxes_();if(this.plotter_){this.cascadeEvents_("clearChart");this.plotter_.clear()}this.plotter_=new DygraphCanvasRenderer(this,this.hidden_,this.hidden_ctx_,this.layout_);this.createRollInterface_();this.cascadeEvents_("predraw");this.rolledSeries_=[null];for(var c=1;c<this.numColumns();c++){var d=this.attr_("logscale");var b=this.extractSeries_(this.rawData_,c,d);b=this.rollingAverage(b,this.rollPeriod_);this.rolledSeries_.push(b)}this.drawGraph_();var a=new Date();this.drawingTimeMs_=(a-e)};
Dygraph.prototype.gatherDatasets_=function(w,c){
	var s=[];var b=[];var e=[];var a={};var u,t,r;var m=w.length-1;
	for(u=m;u>=1;u--){
		if(!this.visibility()[u-1]){continue}
		var h=[];
		for(t=0;t<w[u].length;t++){h.push(w[u][t])}
		var o=this.attr_("errorBars")||this.attr_("customBars");
		if(c){
			var A=c[0];
			var f=c[1];
			var p=[];
			var d=null,z=null;
			for(r=0;r<h.length;r++){
				if(h[r][0]>=A&&d===null){d=r}
				if(h[r][0]<=f){z=r}
			}
			if(d===null){d=0}
			if(d>0){d--}
			if(z===null){z=h.length-1}
			if(z<h.length-1){z++}
			s[u-1]=[d,z];
			for(r=d;r<=z;r++){p.push(h[r])}
			h=p
		}else{s[u-1]=[0,h.length-1]}
		var n=this.extremeValues_(h);
		if(o){for(t=0;t<h.length;t++){h[t]=[h[t][0],h[t][1][0],h[t][1][1],h[t][1][2]]}}
		else{
			if(this.attr_("stackedGraph")){
				var q=h.length;var y;
				for(t=0;t<q;t++){
					var g=h[t][0];
					if(b[g]===undefined){b[g]=0}
					y=h[t][1];
					if(y===null){h[t]=[g,null];continue}
					b[g]+=y;
					h[t]=[g,b[g]];
					if(b[g]>n[1]){n[1]=b[g]}
					if(b[g]<n[0]){n[0]=b[g]}
				}
			}
		}
		var v=this.attr_("labels")[u];
		a[v]=n;
		e[u]=h
	}
	if(this.attr_("stackedGraph")){
		for(r=e.length-1;r>=0;--r){
			if(!e[r]){continue}
			for(t=0;t<e[r].length;t++){
				var g=e[r][t][0];
				if(isNaN(b[g])){
					for(u=e.length-1;u>=0;u--){
						if(!e[u]){continue}
						e[u][t][1]=NaN
					}
				}
			}
			break
		}
	}
	return[e,a,s]
};
Dygraph.prototype.drawGraph_=function(){
	var a=new Date();
	var e=this.is_initial_draw_;
	this.is_initial_draw_=false;
	this.layout_.removeAllDatasets();
	this.setColors_();
	this.attrs_.pointSize=0.5*this.attr_("highlightCircleSize");
	var j=this.gatherDatasets_(this.rolledSeries_,this.dateWindow_);
	var d=j[0];
	var k=j[1];
	this.boundaryIds_=j[2];
	this.setIndexByName_={};
	var h=this.attr_("labels");
	if(h.length>0){this.setIndexByName_[h[0]]=0}
	var f=0;
	for(var g=1;g<d.length;g++){
		this.setIndexByName_[h[g]]=g;
		if(!this.visibility()[g-1]){continue}
		this.layout_.addDataset(h[g],d[g]);
		this.datasetIndex_[g]=f++
	}
	this.computeYAxisRanges_(k);
	this.layout_.setYAxes(this.axes_);
	this.addXTicks_();var b=this.zoomed_x_;
	this.layout_.setDateWindow(this.dateWindow_);
	this.zoomed_x_=b;
	this.layout_.evaluateWithError();
	this.renderGraph_(e);
	if(this.attr_("timingName")){
		var c=new Date();
		Dygraph.info(this.attr_("timingName")+" - drawGraph: "+(c-a)+"ms")
	}
};
Dygraph.prototype.renderGraph_=function(a){this.cascadeEvents_("clearChart");this.plotter_.clear();if(this.attr_("underlayCallback")){this.attr_("underlayCallback")(this.hidden_ctx_,this.layout_.getPlotArea(),this,this)}var b={canvas:this.hidden_,drawingContext:this.hidden_ctx_};this.cascadeEvents_("willDrawChart",b);this.plotter_.render();this.cascadeEvents_("didDrawChart",b);this.canvas_.getContext("2d").clearRect(0,0,this.canvas_.width,this.canvas_.height);if(this.attr_("drawCallback")!==null){this.attr_("drawCallback")(this,a)}};Dygraph.prototype.computeYAxes_=function(){var b,d,c,e,a;if(this.axes_!==undefined&&this.user_attrs_.hasOwnProperty("valueRange")===false){b=[];for(c=0;c<this.axes_.length;c++){b.push(this.axes_[c].valueWindow)}}this.axes_=[];for(d=0;d<this.attributes_.numAxes();d++){e={g:this};Dygraph.update(e,this.attributes_.axisOptions(d));this.axes_[d]=e}a=this.attr_("valueRange");if(a){this.axes_[0].valueRange=a}if(b!==undefined){for(c=0;c<b.length;c++){this.axes_[c].valueWindow=b[c]}}for(d=0;d<this.axes_.length;d++){if(d===0){e=this.optionsViewForAxis_("y"+(d?"2":""));a=e("valueRange");if(a){this.axes_[d].valueRange=a}}else{var f=this.user_attrs_.axes;if(f&&f.y2){a=f.y2.valueRange;if(a){this.axes_[d].valueRange=a}}}}};
Dygraph.prototype.numAxes=function(){return this.attributes_.numAxes()};
Dygraph.prototype.axisPropertiesForSeries=function(a){return this.axes_[this.attributes_.axisForSeries(a)]};
Dygraph.prototype.computeYAxisRanges_=function(a){
	var g;
	var l=this.attributes_.numAxes();
	for(var t=0;t<l;t++){
		var b=this.axes_[t];
		var w=this.attributes_.getForAxis("logscale",t);
		var z=this.attributes_.getForAxis("includeZero",t);
		g=this.attributes_.seriesForAxis(t);
		if(g.length===0){b.extremeRange=[0,1]}
		else{
			var x=Infinity;
			var v=-Infinity;
			var o,m;
			for(var r=0;r<g.length;r++){
				if(!a.hasOwnProperty(g[r])){continue}
				o=a[g[r]][0];
				//console.log("min value:"+a[g[r]][0])
				if(o!==null){x=Math.min(o,x)}
				m=a[g[r]][1];
				if(m!==null){v=Math.max(m,v)}
			}
			if(z&&x>0){x=0}
			if(x==Infinity){x=0}
			if(v==-Infinity){v=1}
			var s=v-x;
			if(s===0){s=v}
			var d,A;
			if(w){
				d=v+0.1*s;
				A=x;
				
			}
			else{
				d=v+0.1*s;
				A=x-0.1*s;
				//console.log("voidMinzeoro w A:"+A+" d:"+d+" v:"+v +" s:"+s+" x:"+x);
				if(!this.attr_("avoidMinZero")){
					if(A<0&&x>=0){A=0}
					if(d>0&&v<=0){d=0}
					//console.log("voidMinzeoro w A:"+A+" d:"+d);
					
				}
				if(this.attr_("includeZero")){
					if(v<0){d=0}
					if(x>0){A=0}
				}
			}
			//console.log("A:"+A+" d:"+d);
			b.extremeRange=[A,d]
		}
		if(b.valueWindow){b.computedValueRange=[b.valueWindow[0],b.valueWindow[1]]}
		else{
			if(b.valueRange){b.computedValueRange=[b.valueRange[0],b.valueRange[1]]}
			else{b.computedValueRange=b.extremeRange}
		}
		var n=this.optionsViewForAxis_("y"+(t?"2":""));
		var y=n("ticker");
		if(t===0||b.independentTicks){
			b.ticks=y(b.computedValueRange[0],b.computedValueRange[1],this.height_,n,this)
		}else{
			var h=this.axes_[0];
			var e=h.ticks;
			var f=h.computedValueRange[1]-h.computedValueRange[0];
			var B=b.computedValueRange[1]-b.computedValueRange[0];
			var c=[];
			for(var q=0;q<e.length;q++){
				var p=(e[q].v-h.computedValueRange[0])/f;
				var u=b.computedValueRange[0]+p*B;
				c.push(u)
			}
			b.ticks=y(b.computedValueRange[0],b.computedValueRange[1],this.height_,n,this,c)
		}
	}
};
Dygraph.prototype.extractSeries_=function(g,e,f){var d=[];for(var c=0;c<g.length;c++){var b=g[c][0];var a=g[c][e];if(f){if(a<=0){a=null}}d.push([b,a])}return d};
Dygraph.prototype.rollingAverage=function(l,d){if(l.length<2){return l}d=Math.min(d,l.length);var b=[];var s=this.attr_("sigma");var E,o,w,v,m,c,D,x;if(this.fractions_){var k=0;var h=0;var e=100;for(w=0;w<l.length;w++){k+=l[w][1][0];h+=l[w][1][1];if(w-d>=0){k-=l[w-d][1][0];h-=l[w-d][1][1]}var A=l[w][0];var u=h?k/h:0;if(this.attr_("errorBars")){if(this.attr_("wilsonInterval")){if(h){var r=u<0?0:u,t=h;var z=s*Math.sqrt(r*(1-r)/t+s*s/(4*t*t));var a=1+s*s/h;E=(r+s*s/(2*h)-z)/a;o=(r+s*s/(2*h)+z)/a;b[w]=[A,[r*e,(r-E)*e,(o-r)*e]]}else{b[w]=[A,[0,0,0]]}}else{x=h?s*Math.sqrt(u*(1-u)/h):1;b[w]=[A,[e*u,e*x,e*x]]}}else{b[w]=[A,e*u]}}}else{if(this.attr_("customBars")){E=0;var B=0;o=0;var g=0;for(w=0;w<l.length;w++){var C=l[w][1];m=C[1];b[w]=[l[w][0],[m,m-C[0],C[2]-m]];if(m!==null&&!isNaN(m)){E+=C[0];B+=m;o+=C[2];g+=1}if(w-d>=0){var q=l[w-d];if(q[1][1]!==null&&!isNaN(q[1][1])){E-=q[1][0];B-=q[1][1];o-=q[1][2];g-=1}}if(g){b[w]=[l[w][0],[1*B/g,1*(B-E)/g,1*(o-B)/g]]}else{b[w]=[l[w][0],[null,null,null]]}}}else{if(!this.attr_("errorBars")){if(d==1){return l}for(w=0;w<l.length;w++){c=0;D=0;for(v=Math.max(0,w-d+1);v<w+1;v++){m=l[v][1];if(m===null||isNaN(m)){continue}D++;c+=l[v][1]}if(D){b[w]=[l[w][0],c/D]}else{b[w]=[l[w][0],null]}}}else{for(w=0;w<l.length;w++){c=0;var f=0;D=0;for(v=Math.max(0,w-d+1);v<w+1;v++){m=l[v][1][0];if(m===null||isNaN(m)){continue}D++;c+=l[v][1][0];f+=Math.pow(l[v][1][1],2)}if(D){x=Math.sqrt(f)/D;b[w]=[l[w][0],[c/D,s*x,s*x]]}else{b[w]=[l[w][0],[null,null,null]]}}}}}return b};
Dygraph.prototype.detectTypeFromString_=function(b){var a=false;var c=b.indexOf("-");if((c>0&&(b[c-1]!="e"&&b[c-1]!="E"))||b.indexOf("/")>=0||isNaN(parseFloat(b))){a=true}else{if(b.length==8&&b>"19700101"&&b<"20371231"){a=true}}this.setXAxisOptions_(a)};
Dygraph.prototype.setXAxisOptions_=function(a){
	if(a){
		this.attrs_.xValueParser=Dygraph.dateParser;
		this.attrs_.axes.x.valueFormatter=Dygraph.dateString_;
		this.attrs_.axes.x.ticker=Dygraph.dateTicker;
		this.attrs_.axes.x.axisLabelFormatter=Dygraph.dateAxisFormatter
	}else{
		this.attrs_.xValueParser=function(b){return parseFloat(b)};
		this.attrs_.axes.x.valueFormatter=function(b){return b};
		this.attrs_.axes.x.ticker=Dygraph.numericLinearTicks;
		this.attrs_.axes.x.axisLabelFormatter=this.attrs_.axes.x.valueFormatter}
	};
Dygraph.prototype.parseFloat_=function(a,c,b){var e=parseFloat(a);if(!isNaN(e)){return e}if(/^ *$/.test(a)){return null}if(/^ *nan *$/i.test(a)){return NaN}var d="Unable to parse '"+a+"' as a number";if(b!==null&&c!==null){d+=" on line "+(1+c)+" ('"+b+"') of CSV."}this.error(d);return null};
Dygraph.prototype.parseCSV_=function(t){
	//console.log("passing");
	var r=[];
	var s=Dygraph.detectLineDelimiter(t);
	var a=t.split(s||"\n");
	var g,k;
	var p=this.attr_("delimiter");
	if(a[0].indexOf(p)==-1&&a[0].indexOf("\t")>=0){p="\t"}
	var b=0;
	if(!("labels" in this.user_attrs_)){b=1;this.attrs_.labels=a[0].split(p);this.attributes_.reparseSeries()}
	var o=0;var m;
	var q=false;
	var c=this.attr_("labels").length;
	var f=false;
	for(var l=b;l<a.length;l++){
		var e=a[l];o=l;
		if(e.length===0){continue}
		if(e[0]=="#"){continue}
		var d=e.split(p);
		if(d.length<2){continue}
		var h=[];
		if(!q){
			this.detectTypeFromString_(d[0]);
			m=this.attr_("xValueParser");
			//console.log("passhg dateparser a:"+a);console.log("m:"+m);
			q=true
		}
		h[0]=m(d[0],this);
		if(this.fractions_){
			for(k=1;k<d.length;k++){
				g=d[k].split("/");
				if(g.length!=2){this.error('Expected fractional "num/den" values in CSV data but found a value \''+d[k]+"' on line "+(1+l)+" ('"+e+"') which is not of this form.");h[k]=[0,0]}
				else{h[k]=[this.parseFloat_(g[0],l,e),this.parseFloat_(g[1],l,e)]}
			}
		}else{
			if(this.attr_("errorBars")){
				if(d.length%2!=1){this.error("Expected alternating (value, stdev.) pairs in CSV data but line "+(1+l)+" has an odd number of values ("+(d.length-1)+"): '"+e+"'")}
				for(k=1;k<d.length;k+=2){
					h[(k+1)/2]=[this.parseFloat_(d[k],l,e),this.parseFloat_(d[k+1],l,e)]
				}
			}else{
				if(this.attr_("customBars")){
					for(k=1;k<d.length;k++){
						var u=d[k];
						if(/^ *$/.test(u)){h[k]=[null,null,null]}
						else{
							g=u.split(";");
							if(g.length==3){h[k]=[this.parseFloat_(g[0],l,e),this.parseFloat_(g[1],l,e),this.parseFloat_(g[2],l,e)]}
							else{this.warn('When using customBars, values must be either blank or "low;center;high" tuples (got "'+u+'" on line '+(1+l))}
						}
					}
				}else{
					for(k=1;k<d.length;k++){
						h[k]=this.parseFloat_(d[k],l,e)
					}
				}
			}
		}
		if(r.length>0&&h[0]<r[r.length-1][0]){f=true}
		if(h.length!=c){this.error("Number of columns in line "+l+" ("+h.length+") does not agree with number of labels ("+c+") "+e)}
		if(l===0&&this.attr_("labels")){
			var n=true;
			for(k=0;n&&k<h.length;k++){
				if(h[k]){n=false}
			}
			if(n){
				this.warn("The dygraphs 'labels' option is set, but the first row of CSV data ('"+e+"') appears to also contain labels. Will drop the CSV labels and use the option labels.");
				continue
			}
		}
		r.push(h)
	}
	if(f){
		this.warn("CSV is out of order; order it correctly to speed loading.");
		r.sort(function(j,i){return j[0]-i[0]})
	}
	return r
};
Dygraph.prototype.parseArray_=function(c){
	if(c.length===0){this.error("Can't plot empty data set");return null}
	if(c[0].length===0){this.error("Data set cannot contain an empty row");return null}
	var a;
	if(this.attr_("labels")===null){
		this.warn("Using default labels. Set labels explicitly via 'labels' in the options parameter");
		this.attrs_.labels=["X"];
		for(a=1;a<c[0].length;a++){this.attrs_.labels.push("Y"+a)}
		this.attributes_.reparseSeries()
	}else{
		var b=this.attr_("labels");
		if(b.length!=c[0].length){this.error("Mismatch between number of labels ("+b+") and number of columns in array ("+c[0].length+")");return null}
	}
	if(Dygraph.isDateLike(c[0][0])){
		this.attrs_.axes.x.valueFormatter=Dygraph.dateString_;
		this.attrs_.axes.x.ticker=Dygraph.dateTicker;
		this.attrs_.axes.x.axisLabelFormatter=Dygraph.dateAxisFormatter;
		var d=Dygraph.clone(c);for(a=0;a<c.length;a++){
			if(d[a].length===0){this.error("Row "+(1+a)+" of data is empty");return null}if(d[a][0]===null||typeof(d[a][0].getTime)!="function"||isNaN(d[a][0].getTime())){this.error("x value in row "+(1+a)+" is not a Date");return null}d[a][0]=d[a][0].getTime()}return d}else{this.attrs_.axes.x.valueFormatter=function(e){return e};this.attrs_.axes.x.ticker=Dygraph.numericLinearTicks;this.attrs_.axes.x.axisLabelFormatter=Dygraph.numberAxisLabelFormatter;return c}};
Dygraph.prototype.parseDataTable_=function(w){var d=function(i){var j=String.fromCharCode(65+i%26);i=Math.floor(i/26);while(i>0){j=String.fromCharCode(65+(i-1)%26)+j.toLowerCase();i=Math.floor((i-1)/26)}return j};var h=w.getNumberOfColumns();var g=w.getNumberOfRows();var f=w.getColumnType(0);if(f=="date"||f=="datetime"){this.attrs_.xValueParser=Dygraph.dateParser;this.attrs_.axes.x.valueFormatter=Dygraph.dateString_;this.attrs_.axes.x.ticker=Dygraph.dateTicker;this.attrs_.axes.x.axisLabelFormatter=Dygraph.dateAxisFormatter}else{if(f=="number"){this.attrs_.xValueParser=function(i){return parseFloat(i)};this.attrs_.axes.x.valueFormatter=function(i){return i};this.attrs_.axes.x.ticker=Dygraph.numericLinearTicks;this.attrs_.axes.x.axisLabelFormatter=this.attrs_.axes.x.valueFormatter}else{this.error("only 'date', 'datetime' and 'number' types are supported for column 1 of DataTable input (Got '"+f+"')");return null}}var m=[];var t={};var s=false;var q,o;for(q=1;q<h;q++){var b=w.getColumnType(q);if(b=="number"){m.push(q)}else{if(b=="string"&&this.attr_("displayAnnotations")){var r=m[m.length-1];if(!t.hasOwnProperty(r)){t[r]=[q]}else{t[r].push(q)}s=true}else{this.error("Only 'number' is supported as a dependent type with Gviz. 'string' is only supported if displayAnnotations is true")}}}var u=[w.getColumnLabel(0)];for(q=0;q<m.length;q++){u.push(w.getColumnLabel(m[q]));if(this.attr_("errorBars")){q+=1}}this.attrs_.labels=u;h=u.length;var v=[];var l=false;var a=[];for(q=0;q<g;q++){var e=[];if(typeof(w.getValue(q,0))==="undefined"||w.getValue(q,0)===null){this.warn("Ignoring row "+q+" of DataTable because of undefined or null first column.");continue}if(f=="date"||f=="datetime"){e.push(w.getValue(q,0).getTime())}else{e.push(w.getValue(q,0))}if(!this.attr_("errorBars")){for(o=0;o<m.length;o++){var c=m[o];e.push(w.getValue(q,c));if(s&&t.hasOwnProperty(c)&&w.getValue(q,t[c][0])!==null){var p={};p.series=w.getColumnLabel(c);p.xval=e[0];p.shortText=d(a.length);p.text="";for(var n=0;n<t[c].length;n++){if(n){p.text+="\n"}p.text+=w.getValue(q,t[c][n])}a.push(p)}}for(o=0;o<e.length;o++){if(!isFinite(e[o])){e[o]=null}}}else{for(o=0;o<h-1;o++){e.push([w.getValue(q,1+2*o),w.getValue(q,2+2*o)])}}if(v.length>0&&e[0]<v[v.length-1][0]){l=true}v.push(e)}if(l){this.warn("DataTable is out of order; order it correctly to speed loading.");v.sort(function(j,i){return j[0]-i[0]})}this.rawData_=v;if(a.length>0){this.setAnnotations(a,true)}this.attributes_.reparseSeries()};
Dygraph.prototype.start_=function(){var d=this.file_;if(typeof d=="function"){d=d()}if(Dygraph.isArrayLike(d)){this.rawData_=this.parseArray_(d);this.predraw_()}else{if(typeof d=="object"&&typeof d.getColumnRange=="function"){this.parseDataTable_(d);this.predraw_()}else{if(typeof d=="string"){var c=Dygraph.detectLineDelimiter(d);if(c){this.loadedEvent_(d)}else{var b=new XMLHttpRequest();var a=this;b.onreadystatechange=function(){if(b.readyState==4){if(b.status===200||b.status===0){a.loadedEvent_(b.responseText)}}};b.open("GET",d,true);b.send(null)}}else{this.error("Unknown data format: "+(typeof d))}}}};Dygraph.prototype.updateOptions=function(e,b){if(typeof(b)=="undefined"){b=false}var d=e.file;var c=Dygraph.mapLegacyOptions_(e);if("rollPeriod" in c){this.rollPeriod_=c.rollPeriod}if("dateWindow" in c){this.dateWindow_=c.dateWindow;if(!("isZoomedIgnoreProgrammaticZoom" in c)){this.zoomed_x_=(c.dateWindow!==null)}}if("valueRange" in c&&!("isZoomedIgnoreProgrammaticZoom" in c)){this.zoomed_y_=(c.valueRange!==null)}var a=Dygraph.isPixelChangingOptionList(this.attr_("labels"),c);Dygraph.updateDeep(this.user_attrs_,c);this.attributes_.reparseSeries();if(d){this.file_=d;if(!b){this.start_()}}else{if(!b){if(a){this.predraw_()}else{this.renderGraph_(false)}}}};Dygraph.mapLegacyOptions_=function(c){var a={};for(var b in c){if(b=="file"){continue}if(c.hasOwnProperty(b)){a[b]=c[b]}}var e=function(g,f,h){if(!a.axes){a.axes={}}if(!a.axes[g]){a.axes[g]={}}a.axes[g][f]=h};var d=function(f,g,h){if(typeof(c[f])!="undefined"){Dygraph.warn("Option "+f+" is deprecated. Use the "+h+" option for the "+g+" axis instead. (e.g. { axes : { "+g+" : { "+h+" : ... } } } (see http://dygraphs.com/per-axis.html for more information.");e(g,h,c[f]);delete a[f]}};d("xValueFormatter","x","valueFormatter");d("pixelsPerXLabel","x","pixelsPerLabel");d("xAxisLabelFormatter","x","axisLabelFormatter");d("xTicker","x","ticker");d("yValueFormatter","y","valueFormatter");d("pixelsPerYLabel","y","pixelsPerLabel");d("yAxisLabelFormatter","y","axisLabelFormatter");d("yTicker","y","ticker");return a};Dygraph.prototype.resize=function(d,b){if(this.resize_lock){return}this.resize_lock=true;if((d===null)!=(b===null)){this.warn("Dygraph.resize() should be called with zero parameters or two non-NULL parameters. Pretending it was zero.");d=b=null}var a=this.width_;var c=this.height_;if(d){this.maindiv_.style.width=d+"px";this.maindiv_.style.height=b+"px";this.width_=d;this.height_=b}else{this.width_=this.maindiv_.clientWidth;this.height_=this.maindiv_.clientHeight}if(a!=this.width_||c!=this.height_){this.maindiv_.innerHTML="";this.roller_=null;this.attrs_.labelsDiv=null;this.createInterface_();if(this.annotations_.length){this.layout_.setAnnotations(this.annotations_)}this.createDragInterface_();this.predraw_()}this.resize_lock=false};Dygraph.prototype.adjustRoll=function(a){this.rollPeriod_=a;this.predraw_()};Dygraph.prototype.visibility=function(){if(!this.attr_("visibility")){this.attrs_.visibility=[]}while(this.attr_("visibility").length<this.numColumns()-1){this.attrs_.visibility.push(true)}return this.attr_("visibility")};Dygraph.prototype.setVisibility=function(b,c){var a=this.visibility();if(b<0||b>=a.length){this.warn("invalid series number in setVisibility: "+b)}else{a[b]=c;this.predraw_()}};Dygraph.prototype.size=function(){return{width:this.width_,height:this.height_}};Dygraph.prototype.setAnnotations=function(b,a){Dygraph.addAnnotationRule();this.annotations_=b;this.layout_.setAnnotations(this.annotations_);if(!a){this.predraw_()}};Dygraph.prototype.annotations=function(){return this.annotations_};
Dygraph.prototype.getLabels=function(){return this.attr_("labels").slice()};
Dygraph.prototype.indexFromSetName=function(a){return this.setIndexByName_[a]};
Dygraph.prototype.datasetIndexFromSetName_=function(a){return this.datasetIndex_[this.indexFromSetName(a)]};
Dygraph.addAnnotationRule=function(){
	if(Dygraph.addedAnnotationCSS){return}
	var f="border: 1px solid black; background-color: white; text-align: center;";
	var e=document.createElement("style");
	e.type="text/css";
	document.getElementsByTagName("head")[0].appendChild(e);
	for(var b=0;b<document.styleSheets.length;b++){
		if(document.styleSheets[b].disabled){continue}
		var d=document.styleSheets[b];
		try{
			if(d.insertRule){var a=d.cssRules?d.cssRules.length:0;d.insertRule(".dygraphDefaultAnnotation { "+f+" }",a)}
			else{if(d.addRule){d.addRule(".dygraphDefaultAnnotation",f)}}
			Dygraph.addedAnnotationCSS=true;return
		}catch(c){}
	}
	this.warn("Unable to add default annotation CSS rule; display may be off.")
};
var DateGraph=Dygraph;
"use strict";
Dygraph.LOG_SCALE=10;
Dygraph.LN_TEN=Math.log(Dygraph.LOG_SCALE);
Dygraph.log10=function(a){return Math.log(a)/Dygraph.LN_TEN};
Dygraph.DEBUG=1;
Dygraph.INFO=2;
Dygraph.WARNING=3;
Dygraph.ERROR=3;
Dygraph.LOG_STACK_TRACES=false;
Dygraph.DOTTED_LINE=[2,2];
Dygraph.DASHED_LINE=[7,3];
Dygraph.DOT_DASH_LINE=[7,2,2,2];
Dygraph.log=function(b,d){
	var a;
	if(typeof(printStackTrace)!="undefined"){
		try{
			a=printStackTrace({guess:false});
			while(a[0].indexOf("stacktrace")!=-1){a.splice(0,1)}
			a.splice(0,2);
			for(var c=0;c<a.length;c++){a[c]=a[c].replace(/\([^)]*\/(.*)\)/,"@$1").replace(/\@.*\/([^\/]*)/,"@$1").replace("[object Object].","")}
			var g=a.splice(0,1)[0];
			d+=" ("+g.replace(/^.*@ ?/,"")+")"
		}catch(f){}
	}
	if(typeof(window.console)!="undefined"){
		switch(b){
			case Dygraph.DEBUG:window.console.debug("dygraphs: "+d);break;
			case Dygraph.INFO:window.console.info("dygraphs: "+d);break;
			case Dygraph.WARNING:window.console.warn("dygraphs: "+d);break;
			case Dygraph.ERROR:window.console.error("dygraphs: "+d);break
		}
	}
	if(Dygraph.LOG_STACK_TRACES){window.console.log(a.join("\n"))}
};
Dygraph.info=function(a){Dygraph.log(Dygraph.INFO,a)};
Dygraph.prototype.info=Dygraph.info;Dygraph.warn=function(a){Dygraph.log(Dygraph.WARNING,a)};Dygraph.prototype.warn=Dygraph.warn;Dygraph.error=function(a){Dygraph.log(Dygraph.ERROR,a)};
Dygraph.prototype.error=Dygraph.error;Dygraph.getContext=function(a){return(a.getContext("2d"))};
Dygraph.addEvent=function addEvent(c,b,a){if(c.addEventListener){c.addEventListener(b,a,false)}else{c[b+a]=function(){a(window.event)};c.attachEvent("on"+b,c[b+a])}};
Dygraph.prototype.addEvent=function addEvent(c,b,a){Dygraph.addEvent(c,b,a);this.registeredEvents_.push({elem:c,type:b,fn:a})};
Dygraph.removeEvent=function addEvent(c,b,a){if(c.removeEventListener){c.removeEventListener(b,a,false)}else{try{c.detachEvent("on"+b,c[b+a])}catch(d){}c[b+a]=null}};
Dygraph.cancelEvent=function(a){a=a?a:window.event;if(a.stopPropagation){a.stopPropagation()}if(a.preventDefault){a.preventDefault()}a.cancelBubble=true;a.cancel=true;a.returnValue=false;return false};
Dygraph.hsvToRGB=function(h,g,k){var c;var d;var l;if(g===0){c=k;d=k;l=k}else{var e=Math.floor(h*6);var j=(h*6)-e;var b=k*(1-g);var a=k*(1-(g*j));var m=k*(1-(g*(1-j)));switch(e){case 1:c=a;d=k;l=b;break;case 2:c=b;d=k;l=m;break;case 3:c=b;d=a;l=k;break;case 4:c=m;d=b;l=k;break;case 5:c=k;d=b;l=a;break;case 6:case 0:c=k;d=m;l=b;break}}c=Math.floor(255*c+0.5);d=Math.floor(255*d+0.5);l=Math.floor(255*l+0.5);return"rgb("+c+","+d+","+l+")"};
Dygraph.findPosX=function(b){var c=0;if(b.offsetParent){var a=b;while(1){c+=a.offsetLeft;if(!a.offsetParent){break}a=a.offsetParent}}else{if(b.x){c+=b.x}}while(b&&b!=document.body){c-=b.scrollLeft;b=b.parentNode}return c};
Dygraph.findPosY=function(c){var b=0;if(c.offsetParent){var a=c;while(1){b+=a.offsetTop;if(!a.offsetParent){break}a=a.offsetParent}}else{if(c.y){b+=c.y}}while(c&&c!=document.body){b-=c.scrollTop;c=c.parentNode}return b};
Dygraph.pageX=function(c){if(c.pageX){return(!c.pageX||c.pageX<0)?0:c.pageX}else{var d=document.documentElement;var a=document.body;return c.clientX+(d.scrollLeft||a.scrollLeft)-(d.clientLeft||0)}};
Dygraph.pageY=function(c){if(c.pageY){return(!c.pageY||c.pageY<0)?0:c.pageY}else{var d=document.documentElement;var a=document.body;return c.clientY+(d.scrollTop||a.scrollTop)-(d.clientTop||0)}};
Dygraph.isOK=function(a){return !!a&&!isNaN(a)};
Dygraph.isValidPoint=function(b,a){if(!b){return false}if(b.yval===null){return false}if(b.x===null||b.x===undefined){return false}if(b.y===null||b.y===undefined){return false}if(isNaN(b.x)||(!a&&isNaN(b.y))){return false}return true};
Dygraph.floatFormat=function(a,b){var c=Math.min(Math.max(1,b||2),21);return(Math.abs(a)<0.001&&a!==0)?a.toExponential(c-1):a.toPrecision(c)};
Dygraph.zeropad=function(a){if(a<10){return"0"+a}else{return""+a}};
Dygraph.hmsString_=function(a){
	var c=Dygraph.zeropad;
	var b=new Date(a);
	if(b.getMilliseconds()){
		return c(b.getHours())+":"+c(b.getMinutes())+":"+c(b.getSeconds())+"."+c(b.getMilliseconds());
	}
	else if(b.getSeconds()){ 
		return c(b.getHours())+":"+c(b.getMinutes())+":"+c(b.getSeconds())
	}else{return c(b.getHours())+":"+c(b.getMinutes())}
};
Dygraph.round_=function(c,b){
	var a=Math.pow(10,b);
	return Math.round(c*a)/a
};
Dygraph.binarySearch=function(a,d,i,e,b){
	if(e===null||e===undefined||b===null||b===undefined){e=0;b=d.length-1}
	if(e>b){return -1}
	if(i===null||i===undefined){i=0}
	var h=function(j){return j>=0&&j<d.length};
	var g=parseInt((e+b)/2,10);
	var c=d[g];
	var f;
	if(c==a){return g}
	else{
		if(c>a){
			if(i>0){
				f=g-1;
				if(h(f)&&d[f]<a){return g}
			}
			return Dygraph.binarySearch(a,d,i,e,g-1)
		}else{
			if(c<a){
				if(i<0){
					f=g+1;
					if(h(f)&&d[f]>a){return g}
				}
				return Dygraph.binarySearch(a,d,i,g+1,b)
			}
		}
	}
	return -1
};
Dygraph.dateParser=function(a){
	var b;var c;
	if(a.search("-")==-1||a.search("T")!=-1||a.search("Z")!=-1){
		c=Dygraph.dateStrToMillis(a);
		//console.log(" T case c:"+c);
		if(c&&!isNaN(c)){return c}
	}
	if(a.search("-")!=-1){
		b=a.replace("-","/","g");
		while(b.search("-")!=-1){b=b.replace("-","/")}
		c=Dygraph.dateStrToMillis(b)
		
	}else{
		if(a.length==8){
			b=a.substr(0,4)+"/"+a.substr(4,2)+"/"+a.substr(6,2);
			c=Dygraph.dateStrToMillis(b)
		}else{
			
			c=Dygraph.dateStrToMillis(a)
		}
	}
	if(!c||isNaN(c)){Dygraph.error("Couldn't parse "+a+" as a date")}
	return c
};
Dygraph.dateStrToMillis=function(a){
	/*update reading date for safari
	 * 
	 * modified In Sook Moon 9/9/2009
	 * */
	var date_time = a.split(/T|\s+/);
	var ymd =date_time[0].split(/-/);
	if(date_time.length==1 && date_time[0].match(/-/)){
		//return new Date(Date.UTC(ymd[0], ymd[1], ymd[2]));
		return new Date(ymd[0], ymd[1], ymd[2]).getTime();
	}
	else if(date_time.length==2){
		if(/\./.test(date_time[1])){
			var temp = date_time[1].split('.');
			var ms = temp[1];
			var hms =temp[0].split(':');
			//return new Date(Date.UTC(ymd[0], ymd[1]-1, ymd[2], hms[0], hms[1], hms[2], ms))
			return new Date(ymd[0], ymd[1]-1, ymd[2], hms[0], hms[1], hms[2], ms).getTime();
		}else{
			var hms=date_time[1].split(':');
			return new Date(ymd[0], ymd[1]-1, ymd[2], hms[0], hms[1], hms[2]).getTime();
			//return new Date(Date.UTC(ymd[0], ymd[1]-1, ymd[2], hms[0], hms[1], hms[2]));
		}
	}
	//return new Date(a).getTime()
};
Dygraph.update=function(b,c){if(typeof(c)!="undefined"&&c!==null){for(var a in c){if(c.hasOwnProperty(a)){b[a]=c[a]}}}return b};
Dygraph.updateDeep=function(b,d){function c(e){return(typeof Node==="object"?e instanceof Node:typeof e==="object"&&typeof e.nodeType==="number"&&typeof e.nodeName==="string")}if(typeof(d)!="undefined"&&d!==null){for(var a in d){if(d.hasOwnProperty(a)){if(d[a]===null){b[a]=null}else{if(Dygraph.isArrayLike(d[a])){b[a]=d[a].slice()}else{if(c(d[a])){b[a]=d[a]}else{if(typeof(d[a])=="object"){if(typeof(b[a])!="object"||b[a]===null){b[a]={}}Dygraph.updateDeep(b[a],d[a])}else{b[a]=d[a]}}}}}}}return b};Dygraph.isArrayLike=function(b){var a=typeof(b);if((a!="object"&&!(a=="function"&&typeof(b.item)=="function"))||b===null||typeof(b.length)!="number"||b.nodeType===3){return false}return true};Dygraph.isDateLike=function(a){if(typeof(a)!="object"||a===null||typeof(a.getTime)!="function"){return false}return true};Dygraph.clone=function(c){var b=[];for(var a=0;a<c.length;a++){if(Dygraph.isArrayLike(c[a])){b.push(Dygraph.clone(c[a]))}else{b.push(c[a])}}return b};Dygraph.createCanvas=function(){var a=document.createElement("canvas");var b=(/MSIE/.test(navigator.userAgent)&&!window.opera);if(b&&(typeof(G_vmlCanvasManager)!="undefined")){a=G_vmlCanvasManager.initElement((a))}return a};Dygraph.isAndroid=function(){return(/Android/).test(navigator.userAgent)};Dygraph.Iterator=function(d,c,b,a){c=c||0;b=b||d.length;this.hasNext=true;this.peek=null;this.start_=c;this.array_=d;this.predicate_=a;this.end_=Math.min(d.length,c+b);this.nextIdx_=c-1;this.next()};Dygraph.Iterator.prototype.next=function(){if(!this.hasNext){return null}var c=this.peek;var b=this.nextIdx_+1;var a=false;while(b<this.end_){if(!this.predicate_||this.predicate_(this.array_,b)){this.peek=this.array_[b];a=true;break}b++}this.nextIdx_=b;if(!a){this.hasNext=false;this.peek=null}return c};Dygraph.createIterator=function(d,c,b,a){return new Dygraph.Iterator(d,c,b,a)};Dygraph.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1000/60)}})();Dygraph.repeatAndCleanup=function(h,g,f,a){var i=0;var d;var b=new Date().getTime();h(i);if(g==1){a();return}var e=g-1;(function c(){if(i>=g){return}Dygraph.requestAnimFrame.call(window,function(){var l=new Date().getTime();var j=l-b;d=i;i=Math.floor(j/f);var k=i-d;var m=(i+k)>e;if(m||(i>=e)){h(e);a()}else{if(k!==0){h(i)}c()}})})()};Dygraph.isPixelChangingOptionList=function(h,e){var d={annotationClickHandler:true,annotationDblClickHandler:true,annotationMouseOutHandler:true,annotationMouseOverHandler:true,axisLabelColor:true,axisLineColor:true,axisLineWidth:true,clickCallback:true,digitsAfterDecimal:true,drawCallback:true,drawHighlightPointCallback:true,drawPoints:true,drawPointCallback:true,drawXGrid:true,drawYGrid:true,fillAlpha:true,gridLineColor:true,gridLineWidth:true,hideOverlayOnMouseOut:true,highlightCallback:true,highlightCircleSize:true,interactionModel:true,isZoomedIgnoreProgrammaticZoom:true,labelsDiv:true,labelsDivStyles:true,labelsDivWidth:true,labelsKMB:true,labelsKMG2:true,labelsSeparateLines:true,labelsShowZeroValues:true,legend:true,maxNumberWidth:true,panEdgeFraction:true,pixelsPerYLabel:true,pointClickCallback:true,pointSize:true,rangeSelectorPlotFillColor:true,rangeSelectorPlotStrokeColor:true,showLabelsOnHighlight:true,showRoller:true,sigFigs:true,strokeWidth:true,underlayCallback:true,unhighlightCallback:true,xAxisLabelFormatter:true,xTicker:true,xValueFormatter:true,yAxisLabelFormatter:true,yValueFormatter:true,zoomCallback:true};var a=false;var b={};if(h){for(var f=1;f<h.length;f++){b[h[f]]=true}}for(var g in e){if(a){break}if(e.hasOwnProperty(g)){if(b[g]){for(var c in e[g]){if(a){break}if(e[g].hasOwnProperty(c)&&!d[c]){a=true}}}else{if(!d[g]){a=true}}}}return a};Dygraph.compareArrays=function(c,b){if(!Dygraph.isArrayLike(c)||!Dygraph.isArrayLike(b)){return false}if(c.length!==b.length){return false}for(var a=0;a<c.length;a++){if(c[a]!==b[a]){return false}}return true};Dygraph.regularShape_=function(o,c,i,f,e,a,n){a=a||0;n=n||Math.PI*2/c;o.beginPath();var g=a;var d=g;var h=function(){var p=f+(Math.sin(d)*i);var q=e+(-Math.cos(d)*i);return[p,q]};var b=h();var l=b[0];var j=b[1];o.moveTo(l,j);for(var m=0;m<c;m++){d=(m==c-1)?g:(d+n);var k=h();o.lineTo(k[0],k[1])}o.fill();o.stroke()};Dygraph.shapeFunction_=function(b,a,c){return function(j,i,f,e,k,h,d){f.strokeStyle=h;f.fillStyle="white";Dygraph.regularShape_(f,b,d,e,k,a,c)}};Dygraph.Circles={DEFAULT:function(h,f,b,e,d,c,a){b.beginPath();b.fillStyle=c;b.arc(e,d,a,0,2*Math.PI,false);b.fill()},TRIANGLE:Dygraph.shapeFunction_(3),SQUARE:Dygraph.shapeFunction_(4,Math.PI/4),DIAMOND:Dygraph.shapeFunction_(4),PENTAGON:Dygraph.shapeFunction_(5),HEXAGON:Dygraph.shapeFunction_(6),CIRCLE:function(f,e,c,b,h,d,a){c.beginPath();c.strokeStyle=d;c.fillStyle="white";c.arc(b,h,a,0,2*Math.PI,false);c.fill();c.stroke()},STAR:Dygraph.shapeFunction_(5,0,4*Math.PI/5),PLUS:function(f,e,c,b,h,d,a){c.strokeStyle=d;c.beginPath();c.moveTo(b+a,h);c.lineTo(b-a,h);c.closePath();c.stroke();c.beginPath();c.moveTo(b,h+a);c.lineTo(b,h-a);c.closePath();c.stroke()},EX:function(f,e,c,b,h,d,a){c.strokeStyle=d;c.beginPath();c.moveTo(b+a,h+a);c.lineTo(b-a,h-a);c.closePath();c.stroke();c.beginPath();c.moveTo(b+a,h-a);c.lineTo(b-a,h+a);c.closePath();c.stroke()}};Dygraph.IFrameTarp=function(){this.tarps=[]};Dygraph.IFrameTarp.prototype.cover=function(){var f=document.getElementsByTagName("iframe");for(var c=0;c<f.length;c++){var e=f[c];var b=Dygraph.findPosX(e),h=Dygraph.findPosY(e),d=e.offsetWidth,a=e.offsetHeight;var g=document.createElement("div");g.style.position="absolute";g.style.left=b+"px";g.style.top=h+"px";g.style.width=d+"px";g.style.height=a+"px";g.style.zIndex=999;document.body.appendChild(g);this.tarps.push(g)}};
Dygraph.IFrameTarp.prototype.uncover=function(){for(var a=0;a<this.tarps.length;a++){this.tarps[a].parentNode.removeChild(this.tarps[a])}this.tarps=[]};
Dygraph.detectLineDelimiter=function(c){
	for(var a=0;a<c.length;a++){
		var b=c.charAt(a);
		if(b==="\r"){
			if(((a+1)<c.length)&&(c.charAt(a+1)==="\n")){
				return"\r\n"
			}
			return b
		}
		if(b==="\n"){
			if(((a+1)<c.length)&&(c.charAt(a+1)==="\r")){
				return"\n\r"
			}
			return b
		}
	}
	return null
};
"use strict";
Dygraph.GVizChart=function(a){this.container=a};
Dygraph.GVizChart.prototype.draw=function(b,a){this.container.innerHTML="";if(typeof(this.date_graph)!="undefined"){this.date_graph.destroy()}this.date_graph=new Dygraph(this.container,b,a)};Dygraph.GVizChart.prototype.setSelection=function(b){var a=false;if(b.length){a=b[0].row}this.date_graph.setSelection(a)};Dygraph.GVizChart.prototype.getSelection=function(){var b=[];var d=this.date_graph.getSelection();if(d<0){return b}var a=this.date_graph.layout_.datasets;for(var c=0;c<a.length;++c){b.push({row:d,column:c+1})}return b};"use strict";Dygraph.Interaction={};Dygraph.Interaction.startPan=function(o,t,c){var r,b;c.isPanning=true;var k=t.xAxisRange();c.dateRange=k[1]-k[0];c.initialLeftmostDate=k[0];c.xUnitsPerPixel=c.dateRange/(t.plotter_.area.w-1);if(t.attr_("panEdgeFraction")){var x=t.width_*t.attr_("panEdgeFraction");var d=t.xAxisExtremes();var j=t.toDomXCoord(d[0])-x;var l=t.toDomXCoord(d[1])+x;var u=t.toDataXCoord(j);var w=t.toDataXCoord(l);c.boundedDates=[u,w];var f=[];var a=t.height_*t.attr_("panEdgeFraction");for(r=0;r<t.axes_.length;r++){b=t.axes_[r];var p=b.extremeRange;var q=t.toDomYCoord(p[0],r)+a;var s=t.toDomYCoord(p[1],r)-a;var n=t.toDataYCoord(q);var e=t.toDataYCoord(s);f[r]=[n,e]}c.boundedValues=f}c.is2DPan=false;c.axes=[];for(r=0;r<t.axes_.length;r++){b=t.axes_[r];var h={};var m=t.yAxisRange(r);var v=t.attributes_.getForAxis("logscale",r);if(v){h.initialTopValue=Dygraph.log10(m[1]);h.dragValueRange=Dygraph.log10(m[1])-Dygraph.log10(m[0])}else{h.initialTopValue=m[1];h.dragValueRange=m[1]-m[0]}h.unitsPerPixel=h.dragValueRange/(t.plotter_.area.h-1);c.axes.push(h);if(b.valueWindow||b.valueRange){c.is2DPan=true}}};Dygraph.Interaction.movePan=function(b,k,c){c.dragEndX=k.dragGetX_(b,c);c.dragEndY=k.dragGetY_(b,c);var h=c.initialLeftmostDate-(c.dragEndX-c.dragStartX)*c.xUnitsPerPixel;if(c.boundedDates){h=Math.max(h,c.boundedDates[0])}var a=h+c.dateRange;if(c.boundedDates){if(a>c.boundedDates[1]){h=h-(a-c.boundedDates[1]);a=h+c.dateRange}}k.dateWindow_=[h,a];if(c.is2DPan){for(var j=0;j<k.axes_.length;j++){var e=k.axes_[j];var o=c.axes[j];var d=c.dragEndY-c.dragStartY;var p=d*o.unitsPerPixel;var f=c.boundedValues?c.boundedValues[j]:null;var l=o.initialTopValue+p;if(f){l=Math.min(l,f[1])}var n=l-o.dragValueRange;if(f){if(n<f[0]){l=l-(n-f[0]);n=l-o.dragValueRange}}var m=k.attributes_.getForAxis("logscale",j);if(m){e.valueWindow=[Math.pow(Dygraph.LOG_SCALE,n),Math.pow(Dygraph.LOG_SCALE,l)]}else{e.valueWindow=[n,l]}}}k.drawGraph_(false)};Dygraph.Interaction.endPan=function(c,b,a){a.dragEndX=b.dragGetX_(c,a);a.dragEndY=b.dragGetY_(c,a);var e=Math.abs(a.dragEndX-a.dragStartX);var d=Math.abs(a.dragEndY-a.dragStartY);if(e<2&&d<2&&b.lastx_!==undefined&&b.lastx_!=-1){Dygraph.Interaction.treatMouseOpAsClick(b,c,a)}a.isPanning=false;a.is2DPan=false;a.initialLeftmostDate=null;a.dateRange=null;a.valueRange=null;a.boundedDates=null;a.boundedValues=null;a.axes=null};Dygraph.Interaction.startZoom=function(c,b,a){a.isZooming=true;a.zoomMoved=false};Dygraph.Interaction.moveZoom=function(c,b,a){a.zoomMoved=true;a.dragEndX=b.dragGetX_(c,a);a.dragEndY=b.dragGetY_(c,a);var e=Math.abs(a.dragStartX-a.dragEndX);var d=Math.abs(a.dragStartY-a.dragEndY);a.dragDirection=(e<d/2)?Dygraph.VERTICAL:Dygraph.HORIZONTAL;b.drawZoomRect_(a.dragDirection,a.dragStartX,a.dragEndX,a.dragStartY,a.dragEndY,a.prevDragDirection,a.prevEndX,a.prevEndY);a.prevEndX=a.dragEndX;a.prevEndY=a.dragEndY;a.prevDragDirection=a.dragDirection};Dygraph.Interaction.treatMouseOpAsClick=function(f,b,d){var k=f.attr_("clickCallback");var n=f.attr_("pointClickCallback");var j=null;if(n){var l=-1;var m=Number.MAX_VALUE;for(var e=0;e<f.selPoints_.length;e++){var c=f.selPoints_[e];var a=Math.pow(c.canvasx-d.dragEndX,2)+Math.pow(c.canvasy-d.dragEndY,2);if(!isNaN(a)&&(l==-1||a<m)){m=a;l=e}}var h=f.attr_("highlightCircleSize")+2;if(m<=h*h){j=f.selPoints_[l]}}if(j){n(b,j)}if(k){k(b,f.lastx_,f.selPoints_)}};Dygraph.Interaction.endZoom=function(c,b,a){a.isZooming=false;a.dragEndX=b.dragGetX_(c,a);a.dragEndY=b.dragGetY_(c,a);var e=Math.abs(a.dragEndX-a.dragStartX);var d=Math.abs(a.dragEndY-a.dragStartY);if(e<2&&d<2&&b.lastx_!==undefined&&b.lastx_!=-1){Dygraph.Interaction.treatMouseOpAsClick(b,c,a)}if(e>=10&&a.dragDirection==Dygraph.HORIZONTAL){b.doZoomX_(Math.min(a.dragStartX,a.dragEndX),Math.max(a.dragStartX,a.dragEndX));a.cancelNextDblclick=true}else{if(d>=10&&a.dragDirection==Dygraph.VERTICAL){b.doZoomY_(Math.min(a.dragStartY,a.dragEndY),Math.max(a.dragStartY,a.dragEndY));a.cancelNextDblclick=true}else{if(a.zoomMoved){b.clearZoomRect_()}}}a.dragStartX=null;a.dragStartY=null};Dygraph.Interaction.startTouch=function(f,e,d){f.preventDefault();var h=[];for(var c=0;c<f.touches.length;c++){var b=f.touches[c];h.push({pageX:b.pageX,pageY:b.pageY,dataX:e.toDataXCoord(b.pageX),dataY:e.toDataYCoord(b.pageY)})}d.initialTouches=h;if(h.length==1){d.initialPinchCenter=h[0];d.touchDirections={x:true,y:true}}else{if(h.length==2){d.initialPinchCenter={pageX:0.5*(h[0].pageX+h[1].pageX),pageY:0.5*(h[0].pageY+h[1].pageY),dataX:0.5*(h[0].dataX+h[1].dataX),dataY:0.5*(h[0].dataY+h[1].dataY)};var a=180/Math.PI*Math.atan2(d.initialPinchCenter.pageY-h[0].pageY,h[0].pageX-d.initialPinchCenter.pageX);a=Math.abs(a);if(a>90){a=90-a}d.touchDirections={x:(a<(90-45/2)),y:(a>45/2)}}}d.initialRange={x:e.xAxisRange(),y:e.yAxisRange()}};Dygraph.Interaction.moveTouch=function(n,q,d){var p,l=[];for(p=0;p<n.touches.length;p++){var k=n.touches[p];l.push({pageX:k.pageX,pageY:k.pageY})}var a=d.initialTouches;var h;var j=d.initialPinchCenter;if(l.length==1){h=l[0]}else{h={pageX:0.5*(l[0].pageX+l[1].pageX),pageY:0.5*(l[0].pageY+l[1].pageY)}}var m={pageX:h.pageX-j.pageX,pageY:h.pageY-j.pageY};var f=d.initialRange.x[1]-d.initialRange.x[0];var o=d.initialRange.y[0]-d.initialRange.y[1];m.dataX=(m.pageX/q.plotter_.area.w)*f;m.dataY=(m.pageY/q.plotter_.area.h)*o;var u,c;if(l.length==1){u=1;c=1}else{if(l.length==2){var e=(a[1].pageX-j.pageX);u=(l[1].pageX-h.pageX)/e;var s=(a[1].pageY-j.pageY);c=(l[1].pageY-h.pageY)/s}}u=Math.min(8,Math.max(0.125,u));c=Math.min(8,Math.max(0.125,c));if(d.touchDirections.x){q.dateWindow_=[j.dataX-m.dataX+(d.initialRange.x[0]-j.dataX)/u,j.dataX-m.dataX+(d.initialRange.x[1]-j.dataX)/u]}if(d.touchDirections.y){for(p=0;p<1;p++){var b=q.axes_[p];var r=q.attributes_.getForAxis("logscale",p);if(r){}else{b.valueWindow=[j.dataY-m.dataY+(d.initialRange.y[0]-j.dataY)/c,j.dataY-m.dataY+(d.initialRange.y[1]-j.dataY)/c]}}}q.drawGraph_(false)};Dygraph.Interaction.endTouch=function(c,b,a){if(c.touches.length!==0){Dygraph.Interaction.startTouch(c,b,a)}};Dygraph.Interaction.defaultModel={mousedown:function(c,b,a){if(c.button&&c.button==2){return}a.initializeMouseDown(c,b,a);if(c.altKey||c.shiftKey){Dygraph.startPan(c,b,a)}else{Dygraph.startZoom(c,b,a)}},mousemove:function(c,b,a){if(a.isZooming){Dygraph.moveZoom(c,b,a)}else{if(a.isPanning){Dygraph.movePan(c,b,a)}}},mouseup:function(c,b,a){if(a.isZooming){Dygraph.endZoom(c,b,a)}else{if(a.isPanning){Dygraph.endPan(c,b,a)}}},touchstart:function(c,b,a){Dygraph.Interaction.startTouch(c,b,a)},touchmove:function(c,b,a){Dygraph.Interaction.moveTouch(c,b,a)},touchend:function(c,b,a){Dygraph.Interaction.endTouch(c,b,a)},mouseout:function(c,b,a){if(a.isZooming){a.dragEndX=null;a.dragEndY=null}},dblclick:function(c,b,a){if(a.cancelNextDblclick){a.cancelNextDblclick=false;return}if(c.altKey||c.shiftKey){return}b.resetZoom()}};Dygraph.DEFAULT_ATTRS.interactionModel=Dygraph.Interaction.defaultModel;Dygraph.defaultInteractionModel=Dygraph.Interaction.defaultModel;Dygraph.endZoom=Dygraph.Interaction.endZoom;Dygraph.moveZoom=Dygraph.Interaction.moveZoom;Dygraph.startZoom=Dygraph.Interaction.startZoom;Dygraph.endPan=Dygraph.Interaction.endPan;Dygraph.movePan=Dygraph.Interaction.movePan;Dygraph.startPan=Dygraph.Interaction.startPan;Dygraph.Interaction.nonInteractiveModel_={mousedown:function(c,b,a){a.initializeMouseDown(c,b,a)},mouseup:function(c,b,a){a.dragEndX=b.dragGetX_(c,a);a.dragEndY=b.dragGetY_(c,a);var e=Math.abs(a.dragEndX-a.dragStartX);var d=Math.abs(a.dragEndY-a.dragStartY);if(e<2&&d<2&&b.lastx_!==undefined&&b.lastx_!=-1){Dygraph.Interaction.treatMouseOpAsClick(b,c,a)}}};Dygraph.Interaction.dragIsPanInteractionModel={mousedown:function(c,b,a){a.initializeMouseDown(c,b,a);Dygraph.startPan(c,b,a)},mousemove:function(c,b,a){if(a.isPanning){Dygraph.movePan(c,b,a)}},mouseup:function(c,b,a){if(a.isPanning){Dygraph.endPan(c,b,a)}}};"use strict";Dygraph.TickList=undefined;Dygraph.Ticker=undefined;Dygraph.numericLinearTicks=function(d,c,i,g,f,h){var e=function(a){if(a==="logscale"){return false}return g(a)};return Dygraph.numericTicks(d,c,i,e,f,h)};
Dygraph.numericTicks=function(S,R,p,w,u,F){
	var y=function(a,b){if(b<0){return 1/Math.pow(a,-b)}return Math.pow(a,b)};var d=(w("pixelsPerLabel"));var G=[];var N,L,h,q;if(F){for(N=0;N<F.length;N++){G.push({v:F[N]})}}else{if(w("logscale")){q=Math.floor(p/d);var r=Dygraph.binarySearch(S,Dygraph.PREFERRED_LOG_TICK_VALUES,1);var A=Dygraph.binarySearch(R,Dygraph.PREFERRED_LOG_TICK_VALUES,-1);if(r==-1){r=0}if(A==-1){A=Dygraph.PREFERRED_LOG_TICK_VALUES.length-1}var H=null;if(A-r>=q/4){for(var Q=A;Q>=r;Q--){var D=Dygraph.PREFERRED_LOG_TICK_VALUES[Q];var s=Math.log(D/S)/Math.log(R/S)*p;var e={v:D};if(H===null){H={tickValue:D,pixel_coord:s}}else{if(Math.abs(s-H.pixel_coord)>=d){H={tickValue:D,pixel_coord:s}}else{e.label=""}}G.push(e)}G.reverse()}}if(G.length===0){var o=w("labelsKMG2");var C,t;if(o){C=[1,2,4,8,16,32,64,128,256];t=16}else{C=[1,2,5,10,20,50,100];t=10}var l=Math.ceil(p/d);var O=Math.abs(R-S)/l;var P=Math.floor(Math.log(O)/Math.log(t));var z=Math.pow(t,P);var B,x,E,g;for(L=0;L<C.length;L++){B=z*C[L];x=Math.floor(S/B)*B;E=Math.ceil(R/B)*B;q=Math.abs(E-x)/B;g=p/q;if(g>d){break}}if(x>E){B*=-1}for(N=0;N<q;N++){h=x+N*B;G.push({v:h})}}}var K;var M=[];var f=[];if(w("labelsKMB")){K=1000;M=["K","M","B","T","Q"]}if(w("labelsKMG2")){if(K){Dygraph.warn("Setting both labelsKMB and labelsKMG2. Pick one!")}K=1024;M=["k","M","G","T","P","E","Z","Y"];f=["m","u","n","p","f","a","z","y"]}K=K||1;var m=(w("axisLabelFormatter"));var v=(w("digitsAfterDecimal"));for(N=0;N<G.length;N++){if(G[N].label!==undefined){continue}h=G[N].v;var c=Math.abs(h);var I=m(h,0,w,u);if(M.length>0){var J=y(K,M.length);for(L=M.length-1;L>=0;L--,J/=K){if(c>=J){I=Dygraph.round_(h/J,v)+M[L];break}}}if(w("labelsKMG2")){h=String(h.toExponential());if(h.split("e-").length===2&&h.split("e-")[1]>=3&&h.split("e-")[1]<=24){if(h.split("e-")[1]%3>0){I=Dygraph.round_(h.split("e-")[0]/y(10,(h.split("e-")[1]%3)),v)}else{I=Number(h.split("e-")[0]).toFixed(2)}I+=f[Math.floor(h.split("e-")[1]/3)-1]}}G[N].label=I}return G};

Dygraph.dateTicker=function(e,c,i,g,f,h){
	//console.log("passing dateTicker e");
	
	var d=Dygraph.pickDateTickGranularity(e,c,i,g);
	//console.log("passing dateTicker d:"+d);
	if(d>=0){return Dygraph.getDateAxis(e,c,d,g,f)}else{return[]}
};
Dygraph.SECONDLY=0;Dygraph.TWO_SECONDLY=1;Dygraph.FIVE_SECONDLY=2;Dygraph.TEN_SECONDLY=3;Dygraph.THIRTY_SECONDLY=4;Dygraph.MINUTELY=5;Dygraph.TWO_MINUTELY=6;Dygraph.FIVE_MINUTELY=7;Dygraph.TEN_MINUTELY=8;Dygraph.THIRTY_MINUTELY=9;Dygraph.HOURLY=10;Dygraph.TWO_HOURLY=11;Dygraph.SIX_HOURLY=12;Dygraph.DAILY=13;Dygraph.WEEKLY=14;Dygraph.MONTHLY=15;Dygraph.QUARTERLY=16;Dygraph.BIANNUAL=17;Dygraph.ANNUAL=18;Dygraph.DECADAL=19;Dygraph.CENTENNIAL=20;Dygraph.NUM_GRANULARITIES=21;Dygraph.SHORT_SPACINGS=[];Dygraph.SHORT_SPACINGS[Dygraph.SECONDLY]=1000*1;Dygraph.SHORT_SPACINGS[Dygraph.TWO_SECONDLY]=1000*2;Dygraph.SHORT_SPACINGS[Dygraph.FIVE_SECONDLY]=1000*5;Dygraph.SHORT_SPACINGS[Dygraph.TEN_SECONDLY]=1000*10;Dygraph.SHORT_SPACINGS[Dygraph.THIRTY_SECONDLY]=1000*30;Dygraph.SHORT_SPACINGS[Dygraph.MINUTELY]=1000*60;Dygraph.SHORT_SPACINGS[Dygraph.TWO_MINUTELY]=1000*60*2;Dygraph.SHORT_SPACINGS[Dygraph.FIVE_MINUTELY]=1000*60*5;Dygraph.SHORT_SPACINGS[Dygraph.TEN_MINUTELY]=1000*60*10;Dygraph.SHORT_SPACINGS[Dygraph.THIRTY_MINUTELY]=1000*60*30;Dygraph.SHORT_SPACINGS[Dygraph.HOURLY]=1000*3600;Dygraph.SHORT_SPACINGS[Dygraph.TWO_HOURLY]=1000*3600*2;Dygraph.SHORT_SPACINGS[Dygraph.SIX_HOURLY]=1000*3600*6;Dygraph.SHORT_SPACINGS[Dygraph.DAILY]=1000*86400;Dygraph.SHORT_SPACINGS[Dygraph.WEEKLY]=1000*604800;Dygraph.PREFERRED_LOG_TICK_VALUES=function(){var c=[];for(var b=-39;b<=39;b++){var a=Math.pow(10,b);for(var d=1;d<=9;d++){var e=a*d;c.push(e)}}return c}();
Dygraph.pickDateTickGranularity=function(d,c,j,h){
	var g=(h("pixelsPerLabel"));
	//console.log("j:"+j+" Dygraph.NUM_GRANULARITIES:"+Dygraph.NUM_GRANULARITIES);
	for(var f=0;f<Dygraph.NUM_GRANULARITIES;f++){
		
		var e=Dygraph.numDateTicks(d,c,f);
		//console.log("e:"+e+" g:"+g +"j/e: "+j/e);
		if(Math.abs(j/e)>=g){return f}
	}
	return -1
};
Dygraph.numDateTicks=function(e,b,g){
	if(g<Dygraph.MONTHLY){
		var h=Dygraph.SHORT_SPACINGS[g];
		var temp=b-e;
		//console.log("pssing :"+Math.abs(Math.floor(0.5+1*(b-e)/h)));
		return Math.floor(0.5+1*(b-e)/h);
	}else{
		var f=1;
		var d=12;
		if(g==Dygraph.QUARTERLY){d=3}
		if(g==Dygraph.BIANNUAL){d=2}
		if(g==Dygraph.ANNUAL){d=1}
		if(g==Dygraph.DECADAL){d=1;f=10}
		if(g==Dygraph.CENTENNIAL){d=1;f=100}
		var c=365.2524*24*3600*1000;
		var a=1*(b-e)/c;
		return Math.floor(0.5+1*a*d/f)}
};
Dygraph.getDateAxis=function(n,h,a,l,w){
	//console.log("passing getDateAxis");
	var u=(l("axisLabelFormatter"));
	var z=[];var k;
	if(a<Dygraph.MONTHLY){
	
		var c=Dygraph.SHORT_SPACINGS[a];
		var v=c/1000;
		var y=new Date(n);
		
		y.setMilliseconds(0);
		var f;
		if(v<=60){
			f=y.getSeconds();
			y.setSeconds(f-f%v)
			
		}else{
			y.setSeconds(0);v/=60;
			if(v<=60){
				f=y.getMinutes();y.setMinutes(f-f%v)
			}else{
				y.setMinutes(0);v/=60;
				if(v<=24){
					f=y.getHours();y.setHours(f-f%v)
				}else{
					y.setHours(0);v/=24;
					if(v==7){y.setDate(y.getDate()-y.getDay())}
				}
			}
		}
		n=y.getTime();
		if(n>h){
			for(k=n;k>=h;k-=c){	
				var sample=+new Date(k);
				z.push({v:k,label:u(new Date(k),a,l,w)})
			}
		}
		else{
			for(k=n;k<=h;k+=c){	
				z.push({v:k,label:u(new Date(k),a,l,w)})
			}
		}
		
	}else{
		var e;var o=1;
		if(a==Dygraph.MONTHLY){
			e=[0,1,2,3,4,5,6,7,8,9,10,11]
		}else{
			if(a==Dygraph.QUARTERLY){e=[0,3,6,9]}
			else{
				if(a==Dygraph.BIANNUAL){e=[0,6]
				}else{
					if(a==Dygraph.ANNUAL){e=[0]}
					else{
						if(a==Dygraph.DECADAL){e=[0];o=10}
						else{
							if(a==Dygraph.CENTENNIAL){e=[0];o=100}
							else{Dygraph.warn("Span of dates is too long")}
						}
					}
				}
			}
		}
		var s=new Date(n).getFullYear();
		var p=new Date(h).getFullYear();
		var b=Dygraph.zeropad;
		for(var r=s;r<=p;r++){
			if(r%o!==0){continue}
			for(var q=0;q<e.length;q++){
				var m=r+"/"+b(1+e[q])+"/01";
				k=Dygraph.dateStrToMillis(m);
				if(k<n||k>h){continue}
				z.push({v:k,label:u(new Date(k),a,l,w)})
			}
		}
	}
	return z
};
Dygraph.DEFAULT_ATTRS.axes["x"]["ticker"]=Dygraph.dateTicker;Dygraph.DEFAULT_ATTRS.axes["y"]["ticker"]=Dygraph.numericTicks;Dygraph.DEFAULT_ATTRS.axes["y2"]["ticker"]=Dygraph.numericTicks;Dygraph.Plugins={};Dygraph.Plugins.Annotations=(function(){var a=function(){this.annotations_=[]};a.prototype.toString=function(){return"Annotations Plugin"};a.prototype.activate=function(b){return{clearChart:this.clearChart,didDrawChart:this.didDrawChart}};a.prototype.detachLabels=function(){for(var c=0;c<this.annotations_.length;c++){var b=this.annotations_[c];if(b.parentNode){b.parentNode.removeChild(b)}this.annotations_[c]=null}this.annotations_=[]};a.prototype.clearChart=function(b){this.detachLabels()};a.prototype.didDrawChart=function(o){var m=o.dygraph;var t=m.layout_.annotated_points;if(!t||t.length===0){return}var q=o.canvas.parentNode;var l={position:"absolute",fontSize:m.getOption("axisLabelFontSize")+"px",zIndex:10,overflow:"hidden"};var n=function(e,g,i){return function(w){var p=i.annotation;if(p.hasOwnProperty(e)){p[e](p,i,m,w)}else{if(m.getOption(g)){m.getOption(g)(p,i,m,w)}}}};var h=o.dygraph.plotter_.area;for(var k=0;k<t.length;k++){var f=t[k];if(f.canvasx<h.x||f.canvasx>h.x+h.w||f.canvasy<h.y||f.canvasy>h.y+h.h){continue}var r=f.annotation;var s=6;if(r.hasOwnProperty("tickHeight")){s=r.tickHeight}var c=document.createElement("div");for(var b in l){if(l.hasOwnProperty(b)){c.style[b]=l[b]}}if(!r.hasOwnProperty("icon")){c.className="dygraphDefaultAnnotation"}if(r.hasOwnProperty("cssClass")){c.className+=" "+r.cssClass}var d=r.hasOwnProperty("width")?r.width:16;var u=r.hasOwnProperty("height")?r.height:16;if(r.hasOwnProperty("icon")){var j=document.createElement("img");j.src=r.icon;j.width=d;j.height=u;c.appendChild(j)}else{if(f.annotation.hasOwnProperty("shortText")){c.appendChild(document.createTextNode(f.annotation.shortText))}}c.style.left=(f.canvasx-d/2)+"px";if(r.attachAtBottom){c.style.top=(h.h-u-s)+"px"}else{c.style.top=(f.canvasy-u-s)+"px"}c.style.width=d+"px";c.style.height=u+"px";c.title=f.annotation.text;c.style.color=m.colorsMap_[f.name];c.style.borderColor=m.colorsMap_[f.name];r.div=c;m.addEvent(c,"click",n("clickHandler","annotationClickHandler",f,this));m.addEvent(c,"mouseover",n("mouseOverHandler","annotationMouseOverHandler",f,this));m.addEvent(c,"mouseout",n("mouseOutHandler","annotationMouseOutHandler",f,this));m.addEvent(c,"dblclick",n("dblClickHandler","annotationDblClickHandler",f,this));q.appendChild(c);this.annotations_.push(c);var v=o.drawingContext;v.save();v.strokeStyle=m.colorsMap_[f.name];v.beginPath();if(!r.attachAtBottom){v.moveTo(f.canvasx,f.canvasy);v.lineTo(f.canvasx,f.canvasy-2-s)}else{v.moveTo(f.canvasx,h.h);v.lineTo(f.canvasx,h.h-2-s)}v.closePath();v.stroke();v.restore()}};a.prototype.destroy=function(){this.detachLabels()};return a})();Dygraph.Plugins.Axes=(function(){var a=function(){this.xlabels_=[];this.ylabels_=[]};a.prototype.toString=function(){return"Axes Plugin"};a.prototype.activate=function(b){return{layout:this.layout,clearChart:this.clearChart,willDrawChart:this.willDrawChart}};a.prototype.layout=function(f){var d=f.dygraph;if(d.getOption("drawYAxis")){var b=d.getOption("yAxisLabelWidth")+2*d.getOption("axisTickSize");f.reserveSpaceLeft(b)}if(d.getOption("drawXAxis")){var c;if(d.getOption("xAxisHeight")){c=d.getOption("xAxisHeight")}else{c=d.getOptionForAxis("axisLabelFontSize","x")+2*d.getOption("axisTickSize")}f.reserveSpaceBottom(c)}if(d.numAxes()==2){var b=d.getOption("yAxisLabelWidth")+2*d.getOption("axisTickSize");f.reserveSpaceRight(b)}else{if(d.numAxes()>2){d.error("Only two y-axes are supported at this time. (Trying to use "+d.numAxes()+")")}}};a.prototype.detachLabels=function(){function b(d){for(var c=0;c<d.length;c++){var e=d[c];if(e.parentNode){e.parentNode.removeChild(e)}}}b(this.xlabels_);b(this.ylabels_);this.xlabels_=[];this.ylabels_=[]};a.prototype.clearChart=function(b){this.detachLabels()};a.prototype.willDrawChart=function(H){var F=H.dygraph;if(!F.getOption("drawXAxis")&&!F.getOption("drawYAxis")){return}function B(e){return Math.round(e)+0.5}function A(e){return Math.round(e)-0.5}var j=H.drawingContext;var v=H.canvas.parentNode;var J=H.canvas.width;var d=H.canvas.height;var s,u,t,E,D;var C=function(e){return{position:"absolute",fontSize:F.getOptionForAxis("axisLabelFontSize",e)+"px",zIndex:10,color:F.getOptionForAxis("axisLabelColor",e),width:F.getOption("axisLabelWidth")+"px",lineHeight:"normal",overflow:"hidden"}};var p={x:C("x"),y:C("y"),y2:C("y2")};var m=function(g,x,y){var K=document.createElement("div");var e=p[y=="y2"?"y2":x];for(var r in e){if(e.hasOwnProperty(r)){K.style[r]=e[r]}}var i=document.createElement("div");i.className="dygraph-axis-label dygraph-axis-label-"+x+(y?" dygraph-axis-label-"+y:"");i.innerHTML=g;K.appendChild(i);return K};j.save();var I=F.layout_;var G=H.dygraph.plotter_.area;if(F.getOption("drawYAxis")){if(I.yticks&&I.yticks.length>0){var h=F.numAxes();for(D=0;D<I.yticks.length;D++){E=I.yticks[D];if(typeof(E)=="function"){return}u=G.x;var o=1;var f="y1";if(E[0]==1){u=G.x+G.w;o=-1;f="y2"}var k=F.getOptionForAxis("axisLabelFontSize",f);t=G.y+E[1]*G.h;s=m(E[2],"y",h==2?f:null);var z=(t-k/2);if(z<0){z=0}if(z+k+3>d){s.style.bottom="0px"}else{s.style.top=z+"px"}if(E[0]===0){s.style.left=(G.x-F.getOption("yAxisLabelWidth")-F.getOption("axisTickSize"))+"px";s.style.textAlign="right"}else{if(E[0]==1){s.style.left=(G.x+G.w+F.getOption("axisTickSize"))+"px";s.style.textAlign="left"}}s.style.width=F.getOption("yAxisLabelWidth")+"px";v.appendChild(s);this.ylabels_.push(s)}var n=this.ylabels_[0];var k=F.getOptionForAxis("axisLabelFontSize","y");var q=parseInt(n.style.top,10)+k;if(q>d-k){n.style.top=(parseInt(n.style.top,10)-k/2)+"px"}}var c;if(F.getOption("drawAxesAtZero")){var w=F.toPercentXCoord(0);if(w>1||w<0){w=0}c=B(G.x+w*G.w)}else{c=B(G.x)}j.strokeStyle=F.getOptionForAxis("axisLineColor","y");j.lineWidth=F.getOptionForAxis("axisLineWidth","y");j.beginPath();j.moveTo(c,A(G.y));j.lineTo(c,A(G.y+G.h));j.closePath();j.stroke();if(F.numAxes()==2){j.strokeStyle=F.getOptionForAxis("axisLineColor","y2");j.lineWidth=F.getOptionForAxis("axisLineWidth","y2");j.beginPath();j.moveTo(A(G.x+G.w),A(G.y));j.lineTo(A(G.x+G.w),A(G.y+G.h));j.closePath();j.stroke()}}if(F.getOption("drawXAxis")){if(I.xticks){for(D=0;D<I.xticks.length;D++){E=I.xticks[D];u=G.x+E[0]*G.w;t=G.y+G.h;s=m(E[1],"x");s.style.textAlign="center";s.style.top=(t+F.getOption("axisTickSize"))+"px";var l=(u-F.getOption("axisLabelWidth")/2);if(l+F.getOption("axisLabelWidth")>J){l=J-F.getOption("xAxisLabelWidth");s.style.textAlign="right"}if(l<0){l=0;s.style.textAlign="left"}s.style.left=l+"px";s.style.width=F.getOption("xAxisLabelWidth")+"px";v.appendChild(s);this.xlabels_.push(s)}}j.strokeStyle=F.getOptionForAxis("axisLineColor","x");j.lineWidth=F.getOptionForAxis("axisLineWidth","x");j.beginPath();var b;if(F.getOption("drawAxesAtZero")){var w=F.toPercentYCoord(0,0);if(w>1||w<0){w=1}b=A(G.y+w*G.h)}else{b=A(G.y+G.h)}j.moveTo(B(G.x),b);j.lineTo(B(G.x+G.w),b);j.closePath();j.stroke()}j.restore()};return a})();Dygraph.Plugins.ChartLabels=(function(){var c=function(){this.title_div_=null;this.xlabel_div_=null;this.ylabel_div_=null;this.y2label_div_=null};c.prototype.toString=function(){return"ChartLabels Plugin"};c.prototype.activate=function(d){return{layout:this.layout,didDrawChart:this.didDrawChart}};var b=function(d){var e=document.createElement("div");e.style.position="absolute";e.style.left=d.x+"px";e.style.top=d.y+"px";e.style.width=d.w+"px";e.style.height=d.h+"px";return e};c.prototype.detachLabels_=function(){var e=[this.title_div_,this.xlabel_div_,this.ylabel_div_,this.y2label_div_];for(var d=0;d<e.length;d++){var f=e[d];if(!f){continue}if(f.parentNode){f.parentNode.removeChild(f)}}this.title_div_=null;this.xlabel_div_=null;this.ylabel_div_=null;this.y2label_div_=null};var a=function(l,i,f,h,j){var d=document.createElement("div");d.style.position="absolute";if(f==1){d.style.left="0px"}else{d.style.left=i.x+"px"}d.style.top=i.y+"px";d.style.width=i.w+"px";d.style.height=i.h+"px";d.style.fontSize=(l.getOption("yLabelWidth")-2)+"px";var m=document.createElement("div");m.style.position="absolute";m.style.width=i.h+"px";m.style.height=i.w+"px";m.style.top=(i.h/2-i.w/2)+"px";m.style.left=(i.w/2-i.h/2)+"px";m.style.textAlign="center";var e="rotate("+(f==1?"-":"")+"90deg)";m.style.transform=e;m.style.WebkitTransform=e;m.style.MozTransform=e;m.style.OTransform=e;m.style.msTransform=e;if(typeof(document.documentMode)!=="undefined"&&document.documentMode<9){m.style.filter="progid:DXImageTransform.Microsoft.BasicImage(rotation="+(f==1?"3":"1")+")";m.style.left="0px";m.style.top="0px"}var k=document.createElement("div");k.className=h;k.innerHTML=j;m.appendChild(k);d.appendChild(m);return d};c.prototype.layout=function(k){this.detachLabels_();var i=k.dygraph;var m=k.chart_div;if(i.getOption("title")){var d=k.reserveSpaceTop(i.getOption("titleHeight"));this.title_div_=b(d);this.title_div_.style.textAlign="center";this.title_div_.style.fontSize=(i.getOption("titleHeight")-8)+"px";this.title_div_.style.fontWeight="bold";this.title_div_.style.zIndex=10;var f=document.createElement("div");f.className="dygraph-label dygraph-title";f.innerHTML=i.getOption("title");this.title_div_.appendChild(f);m.appendChild(this.title_div_)}if(i.getOption("xlabel")){var j=k.reserveSpaceBottom(i.getOption("xLabelHeight"));this.xlabel_div_=b(j);this.xlabel_div_.style.textAlign="center";this.xlabel_div_.style.fontSize=(i.getOption("xLabelHeight")-2)+"px";var f=document.createElement("div");f.className="dygraph-label dygraph-xlabel";f.innerHTML=i.getOption("xlabel");this.xlabel_div_.appendChild(f);m.appendChild(this.xlabel_div_)}if(i.getOption("ylabel")){var h=k.reserveSpaceLeft(0);this.ylabel_div_=a(i,h,1,"dygraph-label dygraph-ylabel",i.getOption("ylabel"));m.appendChild(this.ylabel_div_)}if(i.getOption("y2label")&&i.numAxes()==2){var l=k.reserveSpaceRight(0);this.y2label_div_=a(i,l,2,"dygraph-label dygraph-y2label",i.getOption("y2label"));m.appendChild(this.y2label_div_)}};c.prototype.didDrawChart=function(f){var d=f.dygraph;if(this.title_div_){this.title_div_.children[0].innerHTML=d.getOption("title")}if(this.xlabel_div_){this.xlabel_div_.children[0].innerHTML=d.getOption("xlabel")}if(this.ylabel_div_){this.ylabel_div_.children[0].children[0].innerHTML=d.getOption("ylabel")}if(this.y2label_div_){this.y2label_div_.children[0].children[0].innerHTML=d.getOption("y2label")}};c.prototype.clearChart=function(){};c.prototype.destroy=function(){this.detachLabels_()};return c})();Dygraph.Plugins.Grid=(function(){var a=function(){};a.prototype.toString=function(){return"Gridline Plugin"};a.prototype.activate=function(b){return{willDrawChart:this.willDrawChart}};a.prototype.willDrawChart=function(k){var h=k.dygraph;var o=k.drawingContext;var j=h.layout_;var c=k.dygraph.plotter_.area;function b(e){return Math.round(e)+0.5}function d(e){return Math.round(e)-0.5}var m,l,f,n;if(h.getOption("drawYGrid")){n=j.yticks;o.save();o.strokeStyle=h.getOption("gridLineColor");o.lineWidth=h.getOption("gridLineWidth");for(f=0;f<n.length;f++){if(n[f][0]!==0){continue}m=b(c.x);l=d(c.y+n[f][1]*c.h);o.beginPath();o.moveTo(m,l);o.lineTo(m+c.w,l);o.closePath();o.stroke()}o.restore()}if(h.getOption("drawXGrid")){n=j.xticks;o.save();o.strokeStyle=h.getOption("gridLineColor");o.lineWidth=h.getOption("gridLineWidth");for(f=0;f<n.length;f++){m=b(c.x+n[f][0]*c.w);l=d(c.y+c.h);o.beginPath();o.moveTo(m,l);o.lineTo(m,c.y);o.closePath();o.stroke()}o.restore()}};a.prototype.destroy=function(){};return a})();
Dygraph.Plugins.Legend=(function(){
	var c=function(){this.legend_div_=null;this.is_generated_div_=false};
	c.prototype.toString=function(){return"Legend Plugin"};
	var a,d;
	c.prototype.activate=function(j){
		var m;
		var f=j.getOption("labelsDivWidth");
		var l=j.getOption("labelsDiv");
		if(l&&null!==l){
			if(typeof(l)=="string"||l instanceof String){m=document.getElementById(l)}else{m=l}
		}else{
			var i={position:"absolute",fontSize:"14px",zIndex:10,width:f+"px",top:"0px",left:(j.size().width-f-2)+"px",background:"white",lineHeight:"normal",textAlign:"left",overflow:"hidden"};
			Dygraph.update(i,j.getOption("labelsDivStyles"));
			m=document.createElement("div");
			m.className="dygraph-legend";
			for(var h in i){
				if(!i.hasOwnProperty(h)){continue}
				try{m.style[h]=i[h]}catch(k){this.warn("You are using unsupported css properties for your browser in labelsDivStyles")}
			}
			j.graphDiv.appendChild(m);
			this.is_generated_div_=true
		}
		this.legend_div_=m;
		this.one_em_width_=10;
		return{select:this.select,deselect:this.deselect,predraw:this.predraw,didDrawChart:this.didDrawChart}
	};
	var b=function(g){
		var f=document.createElement("span");
		f.setAttribute("style","margin: 0; padding: 0 0 0 1em; border: 0;");
		g.appendChild(f);
		var e=f.offsetWidth;
		g.removeChild(f);
		return e
	};
	c.prototype.select=function(i){var h=i.selectedX;var g=i.selectedPoints;var f=a(i.dygraph,h,g,this.one_em_width_);this.legend_div_.innerHTML=f};
	c.prototype.deselect=function(h){var f=b(this.legend_div_);this.one_em_width_=f;var g=a(h.dygraph,undefined,undefined,f);this.legend_div_.innerHTML=g};
	c.prototype.didDrawChart=function(f){this.deselect(f)};
	c.prototype.predraw=function(h){
		if(!this.is_generated_div_){return}
		h.dygraph.graphDiv.appendChild(this.legend_div_);
		var g=h.dygraph.plotter_.area;
		var f=h.dygraph.getOption("labelsDivWidth");
		this.legend_div_.style.left=g.x+g.w-f-1+"px";
		this.legend_div_.style.top=g.y+"px";
		this.legend_div_.style.width=f+"px"
	};
	c.prototype.destroy=function(){this.legend_div_=null};a=function(w,p,l,f){if(w.getOption("showLabelsOnHighlight")!==true){return""}var r,C,u,s,m;var z=w.getLabels();if(typeof(p)==="undefined"){if(w.getOption("legend")!="always"){return""}C=w.getOption("labelsSeparateLines");r="";for(u=1;u<z.length;u++){var q=w.getPropertiesForSeries(z[u]);if(!q.visible){continue}if(r!==""){r+=(C?"<br/>":" ")}m=w.getOption("strokePattern",z[u]);s=d(m,q.color,f);r+="<span style='font-weight: bold; color: "+q.color+";'>"+s+" "+z[u]+"</span>"}return r}var A=w.optionsViewForAxis_("x");var o=A("valueFormatter");r=o(p,A,z[0],w);if(r!==""){r+=":"}var v=[];var j=w.numAxes();for(u=0;u<j;u++){v[u]=w.optionsViewForAxis_("y"+(u?1+u:""))}var k=w.getOption("labelsShowZeroValues");C=w.getOption("labelsSeparateLines");var B=w.getHighlightSeries();for(u=0;u<l.length;u++){var t=l[u];if(t.yval===0&&!k){continue}if(!Dygraph.isOK(t.canvasy)){continue}if(C){r+="<br/>"}var q=w.getPropertiesForSeries(t.name);var n=v[q.axis-1];var y=n("valueFormatter");var e=y(t.yval,n,t.name,w);var h=(t.name==B)?" class='highlight'":"";r+="<span"+h+"> <b><span style='color: "+q.color+";'>"+t.name+"</span></b>:"+e+"</span>"}return r};d=function(s,h,r){var e=(/MSIE/.test(navigator.userAgent)&&!window.opera);if(e){return"&mdash;"}if(!s||s.length<=1){return'<div style="display: inline-block; position: relative; bottom: .5ex; padding-left: 1em; height: 1px; border-bottom: 2px solid '+h+';"></div>'}var l,k,f,o;var g=0,q=0;var p=[];var n;for(l=0;l<=s.length;l++){g+=s[l%s.length]}n=Math.floor(r/(g-s[0]));if(n>1){for(l=0;l<s.length;l++){p[l]=s[l]/r}q=p.length}else{n=1;for(l=0;l<s.length;l++){p[l]=s[l]/g}q=p.length+1}var m="";for(k=0;k<n;k++){for(l=0;l<q;l+=2){f=p[l%p.length];if(l<s.length){o=p[(l+1)%p.length]}else{o=0}m+='<div style="display: inline-block; position: relative; bottom: .5ex; margin-right: '+o+"em; padding-left: "+f+"em; height: 1px; border-bottom: 2px solid "+h+';"></div>'}}return m};return c})();Dygraph.Plugins.RangeSelector=(function(){var b=0;var a=1<<0;var d=1<<1;var c=function(){this.isIE_=/MSIE/.test(navigator.userAgent)&&!window.opera;this.hasTouchInterface_=typeof(TouchEvent)!="undefined";this.isMobileDevice_=/mobile|android/gi.test(navigator.appVersion);this.status_=b};c.prototype.toString=function(){return"RangeSelector Plugin"};c.prototype.activate=function(e){this.dygraph_=e;this.layout_=e.layout_;this.graphDiv_=e.graphDiv;this.isUsingExcanvas_=e.isUsingExcanvas_;if(this.getOption_("showRangeSelector")){this.createInterface_()}return{layout:this.reserveSpace_,predraw:this.renderStaticLayer_,didDrawChart:this.renderInteractiveLayer_}};c.prototype.destroy=function(){this.bgcanvas_=null;this.fgcanvas_=null;this.leftZoomHandle_=null;this.rightZoomHandle_=null;this.iePanOverlay_=null};c.prototype.getOption_=function(e){return this.dygraph_.getOption(e)};c.prototype.setDefaultOption_=function(e,f){return this.dygraph_.attrs_[e]=f};c.prototype.createInterface_=function(){this.createCanvases_();if(this.isUsingExcanvas_){this.createIEPanOverlay_()}this.createZoomHandles_();this.initInteraction_();if(this.getOption_("animatedZooms")){this.dygraph_.warn("Animated zooms and range selector are not compatible; disabling animatedZooms.");this.dygraph_.updateOptions({animatedZooms:false},true)}this.addToGraph_();this.status_=a};c.prototype.addToGraph_=function(){var e=this.graphDiv_;e.appendChild(this.bgcanvas_);e.appendChild(this.fgcanvas_);e.appendChild(this.leftZoomHandle_);e.appendChild(this.rightZoomHandle_);this.status_|=d};c.prototype.removeFromGraph_=function(){var e=this.graphDiv_;e.removeChild(this.bgcanvas_);e.removeChild(this.fgcanvas_);e.removeChild(this.leftZoomHandle_);e.removeChild(this.rightZoomHandle_);this.status_^=d};c.prototype.reserveSpace_=function(f){if(this.getOption_("showRangeSelector")){f.reserveSpaceBottom(this.getOption_("rangeSelectorHeight")+4)}};c.prototype.renderStaticLayer_=function(){if(!this.updateInterfaceStatus_()){return}this.resize_();this.drawStaticLayer_()};c.prototype.renderInteractiveLayer_=function(){if(!this.updateInterfaceStatus_()||this.isChangingRange_){return}this.placeZoomHandles_();this.drawInteractiveLayer_()};c.prototype.updateInterfaceStatus_=function(){var e=this.getOption_("showRangeSelector");if(e){if(!(this.status_&a)){this.createInterface_()}else{if(!(this.status_&d)){this.addToGraph_()}}}else{if(this.status_&d){this.removeFromGraph_();var f=this.dygraph_;setTimeout(function(){f.width_=0;f.resize()},1)}}return e};c.prototype.resize_=function(){function g(h,i){h.style.top=i.y+"px";h.style.left=i.x+"px";h.width=i.w;h.height=i.h;h.style.width=h.width+"px";h.style.height=h.height+"px"}var f=this.layout_.getPlotArea();var e=this.getOption_("xAxisHeight")||(this.getOption_("axisLabelFontSize")+2*this.getOption_("axisTickSize"));this.canvasRect_={x:f.x,y:f.y+f.h+e+4,w:f.w,h:this.getOption_("rangeSelectorHeight")};g(this.bgcanvas_,this.canvasRect_);g(this.fgcanvas_,this.canvasRect_)};c.prototype.createCanvases_=function(){this.bgcanvas_=Dygraph.createCanvas();this.bgcanvas_.className="dygraph-rangesel-bgcanvas";this.bgcanvas_.style.position="absolute";this.bgcanvas_.style.zIndex=9;this.bgcanvas_ctx_=Dygraph.getContext(this.bgcanvas_);this.fgcanvas_=Dygraph.createCanvas();this.fgcanvas_.className="dygraph-rangesel-fgcanvas";this.fgcanvas_.style.position="absolute";this.fgcanvas_.style.zIndex=9;this.fgcanvas_.style.cursor="default";this.fgcanvas_ctx_=Dygraph.getContext(this.fgcanvas_)};c.prototype.createIEPanOverlay_=function(){this.iePanOverlay_=document.createElement("div");this.iePanOverlay_.style.position="absolute";this.iePanOverlay_.style.backgroundColor="white";this.iePanOverlay_.style.filter="alpha(opacity=0)";this.iePanOverlay_.style.display="none";this.iePanOverlay_.style.cursor="move";this.fgcanvas_.appendChild(this.iePanOverlay_)};c.prototype.createZoomHandles_=function(){var e=new Image();e.className="dygraph-rangesel-zoomhandle";e.style.position="absolute";e.style.zIndex=10;e.style.visibility="hidden";e.style.cursor="col-resize";if(/MSIE 7/.test(navigator.userAgent)){e.width=7;e.height=14;e.style.backgroundColor="white";e.style.border="1px solid #333333"}else{e.width=9;e.height=16;e.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAYAAADESFVDAAAAAXNSR0IArs4c6QAAAAZiS0dEANAAzwDP4Z7KegAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9sHGw0cMqdt1UwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAaElEQVQoz+3SsRFAQBCF4Z9WJM8KCDVwownl6YXsTmCUsyKGkZzcl7zkz3YLkypgAnreFmDEpHkIwVOMfpdi9CEEN2nGpFdwD03yEqDtOgCaun7sqSTDH32I1pQA2Pb9sZecAxc5r3IAb21d6878xsAAAAAASUVORK5CYII="}if(this.isMobileDevice_){e.width*=2;e.height*=2}this.leftZoomHandle_=e;this.rightZoomHandle_=e.cloneNode(false)};c.prototype.initInteraction_=function(){var s=this;var l=this.isIE_?document:window;var u=0;var z=null;var x=false;var g=false;var j=!this.isMobileDevice_&&!this.isUsingExcanvas_;var o=new Dygraph.IFrameTarp();var t,i,w,m,A,k,B,y,v,f,r,n;var h,q,p;t=function(G){var F=s.dygraph_.xAxisExtremes();var D=(F[1]-F[0])/s.canvasRect_.w;var E=F[0]+(G.leftHandlePos-s.canvasRect_.x)*D;var C=F[0]+(G.rightHandlePos-s.canvasRect_.x)*D;return[E,C]};n=function(D){var C=window.outerWidth/document.documentElement.clientWidth;if(!isNaN(C)){return D/C}else{return D}};i=function(C){Dygraph.cancelEvent(C);x=true;u=C.screenX;z=C.target?C.target:C.srcElement;s.dygraph_.addEvent(l,"mousemove",w);s.dygraph_.addEvent(l,"mouseup",m);s.fgcanvas_.style.cursor="col-resize";o.cover();return true};w=function(G){if(!x){return false}Dygraph.cancelEvent(G);var D=G.screenX-u;if(Math.abs(D)<4||G.screenX===0){return true}u=G.screenX;D=n(D);var F=s.getZoomHandleStatus_();var C;if(z==s.leftZoomHandle_){C=F.leftHandlePos+D;C=Math.min(C,F.rightHandlePos-z.width-3);C=Math.max(C,s.canvasRect_.x)}else{C=F.rightHandlePos+D;C=Math.min(C,s.canvasRect_.x+s.canvasRect_.w);C=Math.max(C,F.leftHandlePos+z.width+3)}var E=z.width/2;z.style.left=(C-E)+"px";s.drawInteractiveLayer_();if(j){A()}return true};m=function(C){if(!x){return false}x=false;o.uncover();Dygraph.removeEvent(l,"mousemove",w);Dygraph.removeEvent(l,"mouseup",m);s.fgcanvas_.style.cursor="default";if(!j){A()}return true};A=function(){try{var D=s.getZoomHandleStatus_();s.isChangingRange_=true;if(!D.isZoomed){s.dygraph_.resetZoom()}else{var C=t(D);s.dygraph_.doZoomXDates_(C[0],C[1])}}finally{s.isChangingRange_=false}};k=function(E){if(s.isUsingExcanvas_){return E.srcElement==s.iePanOverlay_}else{var D=s.leftZoomHandle_.getBoundingClientRect();var C=D.left+D.width/2;D=s.rightZoomHandle_.getBoundingClientRect();var F=D.left+D.width/2;return(E.clientX>C&&E.clientX<F)}};B=function(C){if(!g&&k(C)&&s.getZoomHandleStatus_().isZoomed){Dygraph.cancelEvent(C);g=true;u=C.screenX;s.dygraph_.addEvent(l,"mousemove",y);s.dygraph_.addEvent(l,"mouseup",v);return true}return false};y=function(G){if(!g){return false}Dygraph.cancelEvent(G);var D=G.screenX-u;if(Math.abs(D)<4){return true}u=G.screenX;D=n(D);var F=s.getZoomHandleStatus_();var I=F.leftHandlePos;var C=F.rightHandlePos;var H=C-I;if(I+D<=s.canvasRect_.x){I=s.canvasRect_.x;C=I+H}else{if(C+D>=s.canvasRect_.x+s.canvasRect_.w){C=s.canvasRect_.x+s.canvasRect_.w;I=C-H}else{I+=D;C+=D}}var E=s.leftZoomHandle_.width/2;s.leftZoomHandle_.style.left=(I-E)+"px";s.rightZoomHandle_.style.left=(C-E)+"px";s.drawInteractiveLayer_();if(j){f()}return true};v=function(C){if(!g){return false}g=false;Dygraph.removeEvent(l,"mousemove",y);Dygraph.removeEvent(l,"mouseup",v);if(!j){f()}return true};f=function(){try{s.isChangingRange_=true;s.dygraph_.dateWindow_=t(s.getZoomHandleStatus_());s.dygraph_.drawGraph_(false)}finally{s.isChangingRange_=false}};r=function(C){if(x||g){return}var D=k(C)?"move":"default";if(D!=s.fgcanvas_.style.cursor){s.fgcanvas_.style.cursor=D}};h=function(C){if(C.type=="touchstart"&&C.targetTouches.length==1){if(i(C.targetTouches[0])){Dygraph.cancelEvent(C)}}else{if(C.type=="touchmove"&&C.targetTouches.length==1){if(w(C.targetTouches[0])){Dygraph.cancelEvent(C)}}else{m(C)}}};q=function(C){if(C.type=="touchstart"&&C.targetTouches.length==1){if(B(C.targetTouches[0])){Dygraph.cancelEvent(C)}}else{if(C.type=="touchmove"&&C.targetTouches.length==1){if(y(C.targetTouches[0])){Dygraph.cancelEvent(C)}}else{v(C)}}};p=function(F,E){var D=["touchstart","touchend","touchmove","touchcancel"];for(var C=0;C<D.length;C++){s.dygraph_.addEvent(F,D[C],E)}};this.setDefaultOption_("interactionModel",Dygraph.Interaction.dragIsPanInteractionModel);this.setDefaultOption_("panEdgeFraction",0.0001);var e=window.opera?"mousedown":"dragstart";this.dygraph_.addEvent(this.leftZoomHandle_,e,i);this.dygraph_.addEvent(this.rightZoomHandle_,e,i);if(this.isUsingExcanvas_){this.dygraph_.addEvent(this.iePanOverlay_,"mousedown",B)}else{this.dygraph_.addEvent(this.fgcanvas_,"mousedown",B);this.dygraph_.addEvent(this.fgcanvas_,"mousemove",r)}if(this.hasTouchInterface_){p(this.leftZoomHandle_,h);p(this.rightZoomHandle_,h);p(this.fgcanvas_,q)}};c.prototype.drawStaticLayer_=function(){var e=this.bgcanvas_ctx_;e.clearRect(0,0,this.canvasRect_.w,this.canvasRect_.h);try{this.drawMiniPlot_()}catch(f){Dygraph.warn(f)}var g=0.5;this.bgcanvas_ctx_.lineWidth=1;e.strokeStyle="gray";e.beginPath();e.moveTo(g,g);e.lineTo(g,this.canvasRect_.h-g);e.lineTo(this.canvasRect_.w-g,this.canvasRect_.h-g);e.lineTo(this.canvasRect_.w-g,g);e.stroke()};c.prototype.drawMiniPlot_=function(){var j=this.getOption_("rangeSelectorPlotFillColor");var u=this.getOption_("rangeSelectorPlotStrokeColor");if(!j&&!u){return}var m=this.getOption_("stepPlot");var A=this.computeCombinedSeriesAndLimits_();var t=A.yMax-A.yMin;var s=this.bgcanvas_ctx_;var q=0.5;var h=this.dygraph_.xAxisExtremes();var r=Math.max(h[1]-h[0],1e-30);var k=(this.canvasRect_.w-q)/r;var z=(this.canvasRect_.h-q)/t;var w=this.canvasRect_.w-q;var e=this.canvasRect_.h-q;var g=null,f=null;s.beginPath();s.moveTo(q,e);for(var v=0;v<A.data.length;v++){var l=A.data[v];var o=((l[0]!==null)?((l[0]-h[0])*k):NaN);var n=((l[1]!==null)?(e-(l[1]-A.yMin)*z):NaN);if(isFinite(o)&&isFinite(n)){if(g===null){s.lineTo(o,e)}else{if(m){s.lineTo(o,f)}}s.lineTo(o,n);g=o;f=n}else{if(g!==null){if(m){s.lineTo(o,f);s.lineTo(o,e)}else{s.lineTo(g,e)}}g=f=null}}s.lineTo(w,e);s.closePath();if(j){var p=this.bgcanvas_ctx_.createLinearGradient(0,0,0,e);p.addColorStop(0,"white");p.addColorStop(1,j);this.bgcanvas_ctx_.fillStyle=p;s.fill()}if(u){this.bgcanvas_ctx_.strokeStyle=u;this.bgcanvas_ctx_.lineWidth=1.5;s.stroke()}};c.prototype.computeCombinedSeriesAndLimits_=function(){var z=this.dygraph_.rawData_;var x=this.getOption_("logscale");var t=[];var g;var n;var p;var w,v,u;var h,m;for(w=0;w<z.length;w++){if(z[w].length>1&&z[w][1]!==null){p=typeof z[w][1]!="number";if(p){g=[];n=[];for(u=0;u<z[w][1].length;u++){g.push(0);n.push(0)}}break}}for(w=0;w<z.length;w++){var o=z[w];h=o[0];if(p){for(u=0;u<g.length;u++){g[u]=n[u]=0}}else{g=n=0}for(v=1;v<o.length;v++){if(this.dygraph_.visibility()[v-1]){var q;if(p){for(u=0;u<g.length;u++){q=o[v][u];if(q===null||isNaN(q)){continue}g[u]+=q;n[u]++}}else{q=o[v];if(q===null||isNaN(q)){continue}g+=q;n++}}}if(p){for(u=0;u<g.length;u++){g[u]/=n[u]}m=g.slice(0)}else{m=g/n}t.push([h,m])}t=this.dygraph_.rollingAverage(t,this.dygraph_.rollPeriod_);if(typeof t[0][1]!="number"){for(w=0;w<t.length;w++){m=t[w][1];t[w][1]=m[0]}}var e=Number.MAX_VALUE;var f=-Number.MAX_VALUE;for(w=0;w<t.length;w++){m=t[w][1];if(m!==null&&isFinite(m)&&(!x||m>0)){e=Math.min(e,m);f=Math.max(f,m)}}var r=0.25;if(x){f=Dygraph.log10(f);f+=f*r;e=Dygraph.log10(e);for(w=0;w<t.length;w++){t[w][1]=Dygraph.log10(t[w][1])}}else{var l;var s=f-e;if(s<=Number.MIN_VALUE){l=f*r}else{l=s*r}f+=l;e-=l}return{data:t,yMin:e,yMax:f}};c.prototype.placeZoomHandles_=function(){var k=this.dygraph_.xAxisExtremes();var e=this.dygraph_.xAxisRange();var f=k[1]-k[0];var m=Math.max(0,(e[0]-k[0])/f);var i=Math.max(0,(k[1]-e[1])/f);var l=this.canvasRect_.x+this.canvasRect_.w*m;var h=this.canvasRect_.x+this.canvasRect_.w*(1-i);var g=Math.max(this.canvasRect_.y,this.canvasRect_.y+(this.canvasRect_.h-this.leftZoomHandle_.height)/2);var j=this.leftZoomHandle_.width/2;this.leftZoomHandle_.style.left=(l-j)+"px";this.leftZoomHandle_.style.top=g+"px";this.rightZoomHandle_.style.left=(h-j)+"px";this.rightZoomHandle_.style.top=this.leftZoomHandle_.style.top;this.leftZoomHandle_.style.visibility="visible";this.rightZoomHandle_.style.visibility="visible"};c.prototype.drawInteractiveLayer_=function(){var f=this.fgcanvas_ctx_;f.clearRect(0,0,this.canvasRect_.w,this.canvasRect_.h);var i=1;var h=this.canvasRect_.w-i;var e=this.canvasRect_.h-i;var k=this.getZoomHandleStatus_();f.strokeStyle="black";if(!k.isZoomed){f.beginPath();f.moveTo(i,i);f.lineTo(i,e);f.lineTo(h,e);f.lineTo(h,i);f.stroke();if(this.iePanOverlay_){this.iePanOverlay_.style.display="none"}}else{var j=Math.max(i,k.leftHandlePos-this.canvasRect_.x);var g=Math.min(h,k.rightHandlePos-this.canvasRect_.x);f.fillStyle="rgba(240, 240, 240, 0.6)";f.fillRect(0,0,j,this.canvasRect_.h);f.fillRect(g,0,this.canvasRect_.w-g,this.canvasRect_.h);f.beginPath();f.moveTo(i,i);f.lineTo(j,i);f.lineTo(j,e);f.lineTo(g,e);f.lineTo(g,i);f.lineTo(h,i);f.stroke();if(this.isUsingExcanvas_){this.iePanOverlay_.style.width=(g-j)+"px";this.iePanOverlay_.style.left=j+"px";this.iePanOverlay_.style.height=e+"px";this.iePanOverlay_.style.display="inline"}}};c.prototype.getZoomHandleStatus_=function(){var f=this.leftZoomHandle_.width/2;var g=parseFloat(this.leftZoomHandle_.style.left)+f;var e=parseFloat(this.rightZoomHandle_.style.left)+f;return{leftHandlePos:g,rightHandlePos:e,isZoomed:(g-1>this.canvasRect_.x||e+1<this.canvasRect_.x+this.canvasRect_.w)}};return c})();
Dygraph.PLUGINS.push(Dygraph.Plugins.Legend,Dygraph.Plugins.Axes,Dygraph.Plugins.RangeSelector,Dygraph.Plugins.ChartLabels,Dygraph.Plugins.Annotations,Dygraph.Plugins.Grid);