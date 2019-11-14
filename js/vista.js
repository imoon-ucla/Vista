var expanded = false;
var colors_g = ["#0D1F62", "#dc3912", "#257783","#ff9900", "#E46925","#109618", "#990099", "#0099c6", "#257783", "#dd4477", "#66aa00", "#b82e2e", "#007f0e","#333333","#22bb88",
                 "#994499", "#22aa99", "#936029", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac","#ff0000","#000000",
                 "#1f77b4", "#2ca02c", "#d62728", "#9467bd", "#316395", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf","#3eff00","#0080ff",
                 "#4488cc", "#f13912", "#ff4400", "#569678", "#94ee94", "#cc88c7", "#cc7777", "#66bbbb", "#43ee2e", "#56eb5b","#ff0080","#1180ff",
                 "#4466cc", "#ed3912", "#dd9900", "#209618", "#aa0099", "#1199c6", "#ee4477", "#77aa00", "#c82e2e", "#117f0e","#aabb33","#33bb88",
                 "#aa4499", "#22aa99", "#aaaa11", "#66ddcc", "#d64300", "#8C0907", "#65EE67", "#329262", "#5574a6", "#3b3eac","#ffaa00","#cccccc",
                 "#2077b4", "#2ca02c", "#d62728", "#9467bd", "#ed6395", "#8cea4b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf","#44ff00","#2280ff","#3366cc", 
                 "#5588cc", "#f13912", "#ff5500", "#989678", "#56ee94", "#dd88c7", "#cc9977", "#66ccbb", "#55ee2e", "#89eb5b","#fa8080","#4480ff"];

var QueryString = function () {
	  // This function is anonymous, is executed immediately and 
	  // the return value is assigned to QueryString!
	  var query_string = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
	    	// If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
	      query_string[pair[0]] = pair[1];
	    	// If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
	      var arr = [ query_string[pair[0]], pair[1] ];
	      query_string[pair[0]] = arr;
	    	// If third or later entry with this name
	    } else {
	      query_string[pair[0]].push(pair[1]);
	    }
	  } 
	    return query_string;
} ();


function makeGraph(divID,visible_data, drawAxis, index, winWidth, plot_no){
	bandID  = 'band-' + index;
  	panelID = 'panel-' +index;
  	menuID  = 'menu-' + index;
  	containerID='container-'+index;
	statusID ='status-'+index;
	descID='desc-'+index;
	var visib=[];
	var sTitle="";
	var yLabel=sTitle;
	
	div=document.createElement("div"); 
	div.style.width=winWidth;
	div.style.height="240px";
	
	div.id=bandID;
	div1 = document.createElement("div");
	div2 = document.createElement("div");
	//find descIndex
	var descIndex=0;
	for(var j=0; j<datahandler.length; j++){
		if(labels[plot_no]==datahandler[j].name){
			descIndex=datahandler[j].index;
		}
	}
	
	var div1_wid = parseInt(winWidth)-260;
	div1.style.width= div1_wid+'px';
	div1.style.float="left";
	//div1.classList.add("main");
	div1.style.backgroundColor="#FFFFFF";
    div1.style.position="relative";
    div1.id=panelID;
    //alert("passing23");
	div2.style.float="left";
	div2.style.width='240px';
	div2.style.float="right";
	div2.id=menuID;
	div2_0=document.createElement("div"); 
	div2_0.classList.add("titlerow");
	div2_0.innerHTML=sTitle;
	
	div2_1=document.createElement("div"); 
	div2_1.classList.add("row");

	div2_1_1 = document.createElement("div");
	//div2_1_1.classList.add("column");
	div2_1_1_1=document.createElement("div");
	
	div2_1_1_1.innerHTML='<input type=button class=btn value="hide" id="hide_index" onclick="controlPlot('+index+', this)"><input type=button value="close" onclick="closePlot('+index+')"><input type=button value="restore" onclick="restoreZoom('+index+')">';
	div2_1_1_2=document.createElement("div");
	div2_1_1_2.classList.add("fieldform");
	div2_1_1_2.innerHTML='<form name="fields"></form>';
	div2_1_1.appendChild(div2_1_1_1);
	div2_1_1.appendChild(div2_1_1_2);
	
	div2_1.appendChild(div2_1_1);

	div2_2=document.createElement("div"); 
	div2_2.classList.add("row");
	div2_2.innerHTML='<form class="average">'
    			   + '					<input name="npanel" type="hidden" value="' + index + '">'
	               + '                	Average every:&nbsp;<input name="average" type="text" size="4"><br/>'
	               + '               	<input class="draw-points" type="checkbox" value="' + index + '" onchange="drawPoints(this)"> Draw points<br/>'
	               + '               	<input class="draw-lines" type="checkbox" checked="true" value="' + index + '" onchange="drawLines(this)"> Draw lines<br/>'
	               + '               	<input class="fill-graph" type="checkbox" value="' + index + '" onchange="fillGraph(this)"> Fill area below line<br/>'
	               + '                	<input class="y-axis-log" type="checkbox" value="' + index + '" onchange="YAxisLog(this)"> Log scale Y-Axis<br/>'
    			   + ' 	</form>';
	
	
	
	
	div2.appendChild(div2_0);
	div2.appendChild(div2_1);
	div2.appendChild(div2_2);
	if(typeof(info.columns[descIndex].flag)!="undefined"){
		div2_4=document.createElement("div"); 
		div2_4.innerHTML="MISSING_COSTANT = "+info.columns[descIndex].flag;
	}	
	if(typeof(info.columns[descIndex].description)!="undefined"){
    	description="";
    	div2_3=document.createElement("div"); 
    	div2_3.classList.add("descdisplay");
    	div2_3.innerHTML=info.columns[descIndex].description
    	//div2_3.innerHTML="<input type=button class=btn value=\"Show Description\" id=\"desc\" onclick=\"showDescription("+index+")\">";
    	div2.appendChild(div2_3);
    }
	
	div.appendChild(div1);
	div.appendChild(div2);

	$(divID).append(div);
	$(divID).append('<div class="clear"></div>');
	
	for(var v=1; v<labels.length; v++){
		if(plot_no==v) {
			if(datahandler[v].items==true  || datahandler[v].isParticleData==true){
				sTitle="This is a multi-dimention. Vista cannot support multi-dimention yet. Soon the plot will be available.";
				visib.push(false);
			}
			else{
				visib.push(true);
			}
			
		}
		else visib.push(false);
	}

	if(typeof(info.columns[descIndex].unit)!="undefined"){
		yLabel=yLabel+" ("+info.columns[descIndex].unit+")";
	}
	g=new Dygraph(
    	    div1,
    	    visible_data, 
    	    {
    	    	labels:labels,
    	    	visibility: visib,
    	    	//ylabel :yLabel,
    	    	colors:colors_g,
    	    	drawXAxis: drawAxis,
    	    	title:sTitle,
    	    	legend: 'always',
    	    	legendFormatter:legendFormatter,
    	    	labelsSeparateLines: true,
            	highlightCallback: doHighlight,
 	            unhighlightCallback: doUnhighlight,
 	            zoomCallback : doZoom,
            	underlayCallback: function(ctx, area, dygraph) {	// Black border on panel
                    ctx.strokeStyle = 'black';
                    ctx.strokeRect(area.x, area.y, area.w, area.h);
                },
    	    	axes:{
    	    		/*x:{
                		valueFormatter: function(ms){
	                			if(timeindex>-1){
	                				var d = new Date(ms);
	                				var yyyy = d.getFullYear(),
	                		            mm = d.getMonth() + 1,
	                		            dd = d.getDate();
	                                return yyyy + '-' + (mm < 10 ? '0' : '') + mm +'-' (dd < 10 ? '0' : '') + dd+'T' 
	                                + Dygraph.zeropad(d.getHours())+':'
	                                + Dygraph.zeropad(d.getMinutes()) + ':' 
	                                + Dygraph.zeropad(d.getSeconds()) + '.' 
	                                + Dygraph.zeropad(d.getMilliseconds());
	                			}//end of if	
                				
                			}//end of function
                		},*/
                		y: {
                           
                            axisLabelFormatter: function(y) {
                            	return y.toPrecision(2); 
                            },
                            axisLabelWidth: 180
                          }
    	    	}
    	    } 
    	    
    	  );       
	return g;
}

function controlPlot(index, obj){
	panelID = 'panel-'+index;
	//detailsID = 'details-'+index;
	controlID = 'control-'+index;
	containerID='container-'+index;
	statusID ='status-'+index;
	bandID = 'band-' + index;
	blankID='blank-'+index;
	menuID = 'menu-' + index;
	desc_row1_ID = 'desc_row1_' + index;
	desc_row2_ID =  'desc_row2_' + index;
	var winWidth=$('#panel-main').width();
	//var band = document.getElementById(bandID);
	var menu = document.getElementById(menuID);
	var band =document.getElementById(bandID);
	//var details = document.getElementById(detailsID);
	var control = document.getElementById(controlID);
	var panel =  document.getElementById(panelID);
	var desc_row1=document.getElementById(desc_row1_ID);
	var desc_row2=document.getElementById(desc_row2_ID);
	if(obj.value =="hide"){
		obj.value="show";
		container.style.display='none';
		desc_row1.style.display='none';
		desc_row2.style.display='none';
		
		div1 = document.createElement("div");  
		div1.id=blankID;
		div1.style.float="left";
		div1.style.position="relative";
		
		div1.style.left='0px';
		div1.style.width= (winWidth-260)+'px';
		div1.style.minWidth="540px";
		div1.innerHTML='&nbsp;';
		menu.parentNode.insertBefore(div1, menu);
		//control.style.backgroundColor="#dddddd";
		band.style.display='none';
	}
	else{
		obj.value="hide";
		var blank =document.getElementById(blankID);
		if(blank){
			$('#'+blankID).remove();
		}
		//control.style.backgroundColor="#ffffff";
		container.style.display='block';
		desc_row1.style.display='block';
		desc_row2.style.display='block';
		
	}
	
}
function showDescription(index){
	var descId = 'desc-'+index;
	document.getElementById(descId).style.display='block';
}
function hideDescription(index){
	var descId = 'desc-'+index;
	document.getElementById(descId).style.display='none';
}
function drawPoints(obj){
	var index=obj.value;
	panel[index].updateOptions({drawPoints: obj.checked});
}
function drawLines(obj){
	var index=obj.value;
	if(obj.checked){
		panel[index].updateOptions({strokeWidth: 1.0}); 
	}
	else{
		panel[index].updateOptions({strokeWidth: 0.0}); 
	}	
}
function fillGraph(obj){
	var index=obj.value;
	
	panel[index].updateOptions({fillGraph: obj.checked});
}
function YAxisLog(obj){
	var index=obj.value;
	panel[index].updateOptions({logscale:obj.checked});
}

function doUnhighlight(e) {
    for(p in panel) { 
    	panel[p].clearSelection();
    	if(xline[p])
       		xline[p].style.visibility = "hidden";
    }
 } 
function doHighlight(e, x, pts, row, seriesName) {
  	fix = 0;
    for(p in panel) { 
       	panel[p].setSelection(firstRow + row);
       	if(panel[p].isZoomed('x')) fix = 2;
       	if(xline[p]){
       		xline[p].style.left = (pts[0].canvasx + fix) + "px";
       		xline[p].style.visibility = "visible";
       	}
    }
}
function doZoom(minX, maxX, yRanges) {
    for(p in panel) { 
    	panel[p].updateOptions({
   		dateWindow: [minX, maxX]
			});
    }
    // Find index of first point 
    v = 0;
    firstRow = 0;
    while(v != null) {
       v = panel[0].getValue(firstRow, 0);
       if(v >= minX) { break; }
       firstRow++;
    }
}
function addXLine() {
   	var i=0;
	for(p in panel) {
   		
        var xl = document.createElement("div");
	   	xl.className = "line xline";
  		xl.style.top = "0px";
  		if(document.getElementById("panel-" + p)){
  			document.getElementById("panel-" + p).appendChild(xl);
  		}
  		if(xline)
  			xline.push(xl);
  	}
}

function activate() {
	addXLine();
	for(p in panel){
		menuID = '#menu-' + p;

		var tbl = '<table><tbody>';
		
		visib = panel[p].visibility();
		console.log(visib);
		for(var n=0; n<visib.length; n++){
			checked = '';
			console.log(n);
			if(visib[(n)]) { checked = 'checked="true"'; }
			var no=n+1;
			tbl += '<tr><td><input name="field" type="checkbox" panel="' + p + '" value="' + no + '" ' + checked + '>' + labels[no]+'</td></tr>';
		}
		tbl+='</tbody></table>';
		
		$('form[name="fields"]', $(menuID)).html(tbl);
	}

}
function restoreZoom(index){
	panel[index].updateOptions({
		  dateWindow: null,
          valueRange: null
		});
}
function restoreAllZoom(){
	for(p in panel) { 
		panel[p].updateOptions({
			dateWindow: null,
	        valueRange: null
		});
	} 
}
function makeData(csv_data){
	var temp=csv_data.split("\n");
	var s=start-1;
	//var lines=[];
	var lines=labels[0];
	for(var j=1; j<labels.length; j++){
		lines+=","+	labels[j];
		
	}
	for(var i=1;i<temp.length; i++){
		if(temp[1]){
			var tempcols=temp[i].split(",");
			var templine="";
			if(timeindex>-1){
				var timecol =tempcols[timeindex];
				var temp1=timecol.split(/T|\s+/);
				if(/^\d{4}\-\d{1,3}$/.test(temp1[0])){
					var temp2=temp1[0].split("-");
					timecol=fromdayofyeartToDate(temp2[0],temp2[1])+" "+temp1[1];
				}
				//console.log(i+" : " +timecol)
				//templine.push(makeDateTime(timecol));
				templine+=timecol;
			}
			else{
				templine.push(s+1);
			}
			for(var k=0; k<tempcols.length; k++){
				if(data_visible[k]==true && timeindex!=k){
					if(isDateTimeFormat(tempcols[k])==true){
						var timecol =tempcols[k];
						var temp1=timecol.split(/T|\s+/);
						if(/^\d{4}\-\d{1,3}$/.test(temp1[0])){
							var temp2=temp1[0].split("-");
							timecol=fromdayofyeartToDate(temp2[0],temp2[1])+" "+temp1[1];
						}
						templine+=","+timecol;
						//console.log(i+" : " +timecol)
						//templine.push(makeDateTime(timecol));
					}
					else if(typeof(cols[k].flag)!="undefined"){
						if(tempcols[k].trim()==cols[k].flag.trim()) {
							//templine.push("");
							templine+=",";
						}
						else{
							if(tempcols[k]=="0.") tempcols[k]="0";
							templine+=","+tempcols[k];
							//templine.push(tempcols[k]);
							
						}
					}
					else{
						if(tempcols[k]=="0.") tempcols[k]="0";
						templine+=","+tempcols[k];
						//templine.push(tempcols[k]);
					}
					
				}
			}//end of for: reading column
			lines+="\n"+templine;
			//lines.push(templine)
		}
	}
	return lines;
	
}
/*function getCurrentPageData(start, ends){
	var i=0;
	start = parseInt(start);
	ends = parseInt(ends);
	
	if(visited[start-1]==false ||visited[ends]==false ){
		if(csvdata==null){
			csvdata=getData(start,ends);
		}
		makeData(start, ends, csvdata);
		cvsdata=null;
	}
	if(data.length<ends){
		ends=data.length;
	}
	var current_data = data.slice(start-1, ends);
	
	return current_data;
}
*/
function makeDateTime(timecol){
	var date_time = timecol.split(/T|\s+/);
	var ymd =date_time[0].split(/-/);
	if(date_time.length==1 && date_time[0].match(/-/)){
		//return new Date(Date.UTC(ymd[0], ymd[1], ymd[2]));
		return new Date(ymd[0], ymd[1], ymd[2]);
	}
	else if(date_time.length==2){
		if(/\./.test(date_time[1])){
			var temp = date_time[1].split('.');
			var ms = temp[1];
			var hms =temp[0].split(':');
			//return new Date(Date.UTC(ymd[0], ymd[1]-1, ymd[2], hms[0], hms[1], hms[2], ms))
			return new Date(ymd[0], ymd[1]-1, ymd[2], hms[0], hms[1], hms[2], ms);
		}else{
			var hms=date_time[1].split(':');
			return new Date(ymd[0], ymd[1]-1, ymd[2], hms[0], hms[1], hms[2]);
			//return new Date(Date.UTC(ymd[0], ymd[1]-1, ymd[2], hms[0], hms[1], hms[2]));
		}
	}
}
function fromdayofyeartToDate(year,day){
	var date = new Date();
	if(year){
	    date.setFullYear(year);
	}
	date.setMonth(0);
	date.setDate(0);
	var timeOfFirst = date.getTime(); // this is the time in milliseconds of 1/1/YYYY
	var dayMilli = 1000 * 60 * 60 * 24;
	var dayNumMilli = day * dayMilli;
	date.setTime(timeOfFirst + dayNumMilli);
	var month;
	var fulldate;
	if(date.getMonth()<9){
		month="0"+(date.getMonth()+1);
	}
	else{
		month=(date.getMonth()+1);
	}
	if(date.getDate()<10){
		fulldate="0"+date.getDate();
	}
	else{
		fulldate=date.getDate();
	}
	return date.getFullYear()+"-"+month+"-"+fulldate;
}

function updateDataGraphs(start, ends){
	//alert("passing");
	
	/*var needdata=true;
	if(visited[(start-1)]==true){
		if(visited[ends-1]==true){
			needdata=false;
		}
	}
	if(needdata==true){
	
	var csvdata=getData(start,ends);
	if(csvdata!=null){
		makeData(start, rows, csvdata);
	}
	//}
	var lines=labels[0];
	
	for(var j=1; j<labels.length; j++){
		lines+=","+	labels[j];
		
	}
	
	for(var i=start-1; i<data.; i++){
		if(data[i]){
			lines+="\n"+data[i];
		}	
		
	}
	*/
	var csv_data=getData(start,ends);
	var visible_data=null
	if(csv_data){
		visible_data = makeData(csv_data)
	}

	panel[0].updateOptions({
		  dateWindow: null,
          valueRange: null,
		  file: visible_data
	});
	for(p in panel) { 
		panel[p].updateOptions({
			dateWindow: null,
	        valueRange: null,
			file: visible_data
		});
	} 
	
}
function writeTable(currentpage){
 	var rows1=document.getElementById("rows").value;
 	var start=(currentpage-1)*rows1+1
	document.getElementById("start").value=start;
	var ends=(currentpage)*rows1;
	if(recordCounts<=ends){
		ends=recordCounts;
	}
	document.getElementById("ends").value=ends;
	writePageCount(currentpage);

	updateDataGraphs(start, ends);

}
function writePageCount(currentpage){
	
	var rows=$('#rows').val();
	var pagecount=Math.ceil(recordCounts/rows);
	var quotient= Math.floor(currentpage/10);
	var temp="";
	var last=(quotient+1)*10;
	
	if(recordCounts<rows){
		
	}
	else{
		if(pagecount>10){
			if(quotient>0){
				
				var prevjump=((quotient-1)*10)+1;
				temp+="<a href=\"#\" onclick=\"writeTable(1)\" title='First page'>|<</a> <a href=\"#\" onclick=\"writeTable("+prevjump+")\" title='Jump to page " +prevjump+"'> <<</a>"
			}
			else{
				
				temp+="|< <<";
			}
		}
		var prev=currentpage-1;
		if(prev<=0) {
			prev=1;
		}
		temp+= "<a href=\"#\" onclick=\"writeTable("+prev+")\">Prev</a>"
		if(pagecount<=last){
			last=pagecount;
		}
		for(var k=(quotient*10)+1;k<=last;k++){
			temp+=" "
			if(currentpage==k){
				temp+=k;
			}
			else{
				temp+="<a href=\"#\" onclick=\"writeTable("+k+")\">"+k+"</a>";
			}
			
		}
		
		if(currentpage<last){
			var next=currentpage+1;
			if(next>pagecount){next=pagecount}
			temp+=" <a href=\"#\" onclick=\"writeTable("+next+")\">Next</a>"
		}
		else{
			temp+=" Next";
		}
		if(pagecount>last){
			
			
			var jump=((quotient+1)*10)+1
			temp+=" <a href=\"#\" onclick=\"writeTable("+jump+")\"  title='Jump to page " +jump+"'>>></a><a href=\"#\" onclick=\"writeTable("+pagecount+")\" title=\"Last Page\"> >|</a>";
		}
	}
	$("#pageview").html(temp);
} 

function initDocument(id){
	QueryString.id=id;
	//alert(QueryString.id);
	var jsoninfo=getJSON();
	tableinfo=JSON.parse(jsoninfo);
	var isNew=true;
	
	window.history.pushState('page2', info.productname, '?id='+id);
	start=1;
	writeHeaderInfo();
}

function getOrder(inventory, id){
	for(var i=0; i<inventory.length; i++){	
		if(id===inventory[i].id){
			return i;
		}
	}
	return 0;
}
function isDateTimeFormat(columndata){
	if(columndata.indexOf(".")>0){
		columndata=columndata.substring(0,columndata.indexOf("."));
	}
	columndata=columndata.replace(/T/g," ");
	if(/^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/.test(columndata) 
			||/^(\d{4})\-(\d{3}) (\d{2}):(\d{2}):(\d{2})$/.test(columndata) ){
		return true;
	}
	else{
		return false;
	}
}
function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
function handledraw(obj){
	var index=obj.value;
	bandID = 'band-' + index;
	var div=document.getElementById(bandID);
	
	if(obj.checked==true){
		div.style.display = 'block';
	}
	else{
		div.style.display="none";
	}
}

function getJSON(){
	var value= $.ajax({
	    //url: '/ditdos/write?loadtable=on&id='+id, 
		 dataType: "json",
	   url:'data/fgm_jno_l3_2016214pc_r1s_v01.json',
	   async: false
	}).responseText;
	return value;
}

function getData(start, end){
	//var id=QueryString.id;
	//id =id.replace("/\\.+/g", "");
	//var dataurl="/ditdos/write?o=vista&id="+id+"&f=csv&r="+start+"-"+end;
	var dataurl="data/fgm_jno_l3_2016214pc_r1s_v01.csv";
	/*if(typeof(info.object)!="undefined"){
		dataurl=dataurl+"&t="+info.object;
	}
	*/
	var value= $.ajax({
	    url: dataurl, 
	    async: false
	}).responseText;
	return value;
} 
function getCollection(){
	var id = QueryString.id;
	id = id.replace("/\\.+/g", "");
	var dataurl = "/ditdos/collection?id="+id;
	var value =$.ajax({
		url:dataurl,
		async:false
	}).responseText;
	return value;
}


function custom_sort1(a, b) {
    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
}

function custom_sort2(a, b) {
	 var ax = [], bx = [];
	 var aid=a.id;
	 var bid=b.id;
	    aid.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
	    bid.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
	    
	    while(ax.length && bx.length) {
	        var an = ax.shift();
	        var bn = bx.shift();
	        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
	        if(nn) return nn;
	    }
	    return ax.length - bx.length;
}
function legendFormatter(data) {
	  if (data.x == null) {
	    // This happens when there's no selection and {legend: 'always'} is set.
	    return '<br>' + data.series.map(function(series) { return series.dashHTML + ' ' + series.labelHTML }).join('<br>');
	  }

	  var html = this.getLabels()[0] + ': ' + data.xHTML;
	  data.series.forEach(function(series) {
	    if (!series.isVisible) return;
	    var labeledData = series.labelHTML + ': ' + series.yHTML;
	    if (series.isHighlighted) {
	      labeledData = '<b>' + labeledData + '</b>';
	    }
	    html += '<br>' + series.dashHTML + ' ' + labeledData;
	  });
	  return html;
}