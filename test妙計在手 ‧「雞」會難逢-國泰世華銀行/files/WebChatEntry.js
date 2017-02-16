var EcpWebChatEntry = 
{
	//[可  設  定]WebChat根目錄
    //clientRoot    : "http://88.8.111.152/webchat",  //國泰測試環境
	clientRoot    : "https://www.cathaybk.com.tw/webchat",   //國泰正式環境
    //clientRoot: location.protocol + "//" + location.host + "/webchat",  //測試用
	
	//WebChat Main Page
	clientUrl     : "/index.html",
	
	//[可  設  定]開啟WebChat服務按鈕圖樣
	//客服按鈕-頭像
	serviceIcon   : "/image/btn_cathay_service.png",
	//客服按鈕-文字
	minServiceIcon: "/image/btn_cathay_service_min.png",
	//關閉按鈕-x
	closeIcon     : "/image/close_btn_l.png",
	//箭頭按鈕->
	arrowIconHover: "/image/arrow_btn.png",
	
	loadIcon      : "/image/load.gif",
	serviceText   : "&#21363;&#21839;&#21363;&#31572;",	//[可  設  定]客服按鈕文字(HTML Encode)
	closeText     : "&#25910;&#25722;",					//[可  設  定]收摺按鈕文字(HTML Encode)
	closeIconWidth:32,									//[可  設  定]最小化WebChat服務按鈕寬度
 	paneRightWidth:477,									//[可  設  定]Panel寬度
	buttonId	  : "EcpWebChatEntryButton",			//[系統變數]WebChat服務按鈕ID
	paneId		  : "EcpWebChatEntryPane",				//[系統變數]WebChat區塊ID
	paneLeftId	  : "EcpWebChatEntryLeft",				//[系統變數]WebChat區塊左側ID
	paneRightId	  : "EcpWebChatEntryRight",				//[系統變數]WebChat區塊右側ID
	frameId		  : "EcpWebChatIFrame",					//[系統變數]WebChat IFrame ID
 	loadId        : "EcpWebChatLoad",
	maxPanelWidth : 0,									//[系統變數]WebChat寬度 + 關閉按鈕寬度 
 	panelWidth    : 0,									//[系統變數]動畫執行期間的Panel寬度
	unitWidth	  : 30,									//[可  設  定]動畫每毫秒單位位移寬度
 	interval      : null,								//[系統變數]計時器Object
 	reqType		  : "get",								//[可  設  定]設定iFrame傳遞參數時使用get|post
 	version		  : "20170113",						    //[常　　數]每次改版時修訂

 	bindEvent: function(ele, type, handle){
	     if (ele.addEventListener) {
	         ele.addEventListener(type, handle);
	     } else if (ele.attachEvent) {
	         ele.attachEvent('on' + type, handle);
	     }
 	},
 	//Init WebChat----------------------------------------------
	initialize: function(){
		EcpWebChatEntry.clientUrl 		= EcpWebChatEntry.clientRoot + EcpWebChatEntry.clientUrl;
		//---
		var plugResPath = EcpWebChatEntry.getPlugResPath();
		EcpWebChatEntry.serviceIcon 	= plugResPath + EcpWebChatEntry.serviceIcon;
		EcpWebChatEntry.minServiceIcon 	= plugResPath + EcpWebChatEntry.minServiceIcon;
		EcpWebChatEntry.closeIcon 		= plugResPath + EcpWebChatEntry.closeIcon;
		EcpWebChatEntry.arrowIconHover 	= plugResPath + EcpWebChatEntry.arrowIconHover;
		
		EcpWebChatEntry.loadIcon 		= plugResPath + EcpWebChatEntry.loadIcon;
	
		EcpWebChatEntry.maxPanelWidth = EcpWebChatEntry.paneRightWidth + EcpWebChatEntry.closeIconWidth;
		if (document.body == null) {
			EcpWebChatEntry.bindEvent(window, 'load', EcpWebChatEntry.createCSS);
			//TODO
			//EcpWebChatEntry.bindEvent(window, 'load', EcpWebChatEntry.createPanel);
			EcpWebChatEntry.bindEvent(window, 'load', EcpWebChatEntry.initResizeEvent);
			EcpWebChatEntry.bindEvent(window, 'load', EcpWebChatEntry.createButton);
			//TODO
			 EcpWebChatEntry.bindEvent(window, 'load', EcpWebChatEntry.doResize);
			
		}
		else {
			EcpWebChatEntry.createCSS();
			//TODO
			//EcpWebChatEntry.createPanel();
			EcpWebChatEntry.initResizeEvent();
			EcpWebChatEntry.createButton();
			//TODO
			EcpWebChatEntry.doResize();
		}
	},
	getPlugResPath:function(){
		var srcPath = EcpWebChatEntry.clientRoot;
		//srcPath = srcPath.substring(0,srcPath.lastIndexOf("/"));
		//srcPath = srcPath.substring(0,srcPath.lastIndexOf("/"));
        return srcPath;// + "/plugin_res";
	},
    
	//Main Event---------------------------------------------------
	doButtonClick: function(){
		
		
		setTimeout(function(){}, 3000);
		//TODO
		EcpWebChatEntry.createPanel();
		EcpWebChatEntry.doShowPanel();
		EcpWebChatEntry.doResize();

		var pane = document.getElementById(EcpWebChatEntry.paneId);
		pane.style.width   = "0px";
		pane.style.display = "block";
		
		var paneRight = document.getElementById(EcpWebChatEntry.paneRightId);
		paneRight.style.width   = "0px";
		paneRight.style.display = "block";
 	},
 	 	
 	doCloseButtonClick: function(){
 		EcpWebChatEntry.doHidePanel();
 	},
 	
 	//Browser Resize----------------------------------------------------
 	initResizeEvent:function(){
 		EcpWebChatEntry.bindEvent(window, 'resize', function(){
 			EcpWebChatEntry.doResize();
 		})
 	},
 	
 	doResize:function(){
 		var newHeight = Math.max(
		 	    	window.innerHeight||0,
		 	    	document.body.clientHeight,
		 	        0
		 	);
			var newPanelHeight = parseInt(newHeight * 0.8);
			var pane  = document.getElementById(EcpWebChatEntry.paneId);
			var frame = document.getElementById(EcpWebChatEntry.frameId);
			var load  = document.getElementById(EcpWebChatEntry.loadId);
			if(load != null){
				load.style.height   = newPanelHeight + "px";
			}
			if (pane != null) {
				pane.style.height   = newPanelHeight + "px";
		    }
		    if (frame != null) {
			    frame.style.height  = newPanelHeight + "px";
		    }
		var newWidth = Math.max(
		 	    	window.innerWidth||0,
		 	    	document.body.clientWidth,
		 	        0
		 	);
		var button = document.getElementById(EcpWebChatEntry.buttonId);
		if(button != null){
			//在未執行動畫前，直接透過CSS's class去控制按鈕的大小，但執行過動畫後會改變Tag屬性使class失效，故需再檢查按鈕現在是否可見，若為可見則設定正確大小，被免按鈕切半或浮空
			//配合國泰新官網調整，小QIcon 一律顯示小圖，不顯示大圖Icon  by Patty @20161102
			button.className = "EcpWebChat_min";
				if(parseInt(button.style.width) > 0){
					button.style.width = EcpWebChatEntry.maxMinButtonWidth + "px";
				}
			//width小於1024的以小圖icon呈現	
			// if(newWidth >= 1024){
			// 	button.className = "";
			// 	if(parseInt(button.style.width) > 0){
			// 		button.style.width = EcpWebChatEntry.maxButtonWidth + "px";
			// 	}
			// }else{
			// 	button.className = "EcpWebChat_min";
			// 	if(parseInt(button.style.width) > 0){
			// 		button.style.width = EcpWebChatEntry.maxMinButtonWidth + "px";
			// 	}
			// }
		}
		
			
 	},
	
 	//Panel Control---------------------------------
 	doShowPanel:function(){
 		EcpWebChatEntry.interval = setInterval(function(){ EcpWebChatEntry.showPanel() },1);
 	},
 	
 	doHidePanel:function(){
 		EcpWebChatEntry.interval = setInterval(function(){ EcpWebChatEntry.hidePanel() },1);
 	},
 	
 	showPanel:function(){
 		if(EcpWebChatEntry.panelWidth < EcpWebChatEntry.maxPanelWidth){
 			EcpWebChatEntry.panelWidth = EcpWebChatEntry.panelWidth + EcpWebChatEntry.unitWidth;
 			if(EcpWebChatEntry.panelWidth > EcpWebChatEntry.maxPanelWidth){
 				EcpWebChatEntry.panelWidth = EcpWebChatEntry.maxPanelWidth;
 			}
 			
 			var pane = document.getElementById(EcpWebChatEntry.paneId);
 			pane.style.width = EcpWebChatEntry.panelWidth + "px";
 			
 			var paneRight = document.getElementById(EcpWebChatEntry.paneRightId);		
 			if(EcpWebChatEntry.panelWidth - EcpWebChatEntry.closeIconWidth > 0){
 				paneRight.style.width = EcpWebChatEntry.panelWidth - EcpWebChatEntry.closeIconWidth + "px";
 			} 			
 		}else{
 			if(EcpWebChatEntry.interval != null){
 				clearInterval(EcpWebChatEntry.interval);
 	 			var paneLeft = document.getElementById(EcpWebChatEntry.paneLeftId);
 	 			paneLeft.style.width = EcpWebChatEntry.closeIconWidth + "px";
				EcpWebChatEntry.doHideButton();
 			}
 		}
 	},hidePanel:function(){
 		if(EcpWebChatEntry.panelWidth > 0){
 			
 			EcpWebChatEntry.panelWidth = EcpWebChatEntry.panelWidth - EcpWebChatEntry.unitWidth;
 			if(EcpWebChatEntry.panelWidth < 0){
 				EcpWebChatEntry.panelWidth = 0;
 			}
 			var pane = document.getElementById(EcpWebChatEntry.paneId);
 			pane.style.width = EcpWebChatEntry.panelWidth + "px";
 			
 			var paneRight = document.getElementById(EcpWebChatEntry.paneRightId);
 			if(EcpWebChatEntry.panelWidth - EcpWebChatEntry.closeIconWidth > 0){
 				paneRight.style.width = EcpWebChatEntry.panelWidth - EcpWebChatEntry.closeIconWidth + "px";
 			}else{
 				paneRight.style.width = "0px";
 			}
 			
 			var paneLeft = document.getElementById(EcpWebChatEntry.paneLeftId);
 			paneLeft.style.width = "0px";
 		}else{
 			if(EcpWebChatEntry.interval != null){
 				clearInterval(EcpWebChatEntry.interval);
				EcpWebChatEntry.doShowButton();
 			}
 		}
 		
 		
 	},
	//=========================================================
	buttonInterval:null,
	maxButtonWidth:138,
	maxMinButtonWidth:40,
	buttonWidth:0,
	buttonUnitWidth:10,
	buttonMinUnitWidth:3,
	doShowButton:function(){
 		EcpWebChatEntry.buttonInterval = setInterval(function(){ EcpWebChatEntry.showButton() },EcpWebChatEntry.buttonUnitWidth);
 	},
 	
 	doHideButton:function(){
 		EcpWebChatEntry.buttonInterval = setInterval(function(){ EcpWebChatEntry.hideButton() },EcpWebChatEntry.buttonUnitWidth);
 	},
 	
 	showButton:function(){
		//plug-in按鈕最大size與動畫單位移動距離設定
		//區分大按鈕/小按鈕
		var maxWidth  = EcpWebChatEntry.maxButtonWidth;
		var unitWidth = EcpWebChatEntry.buttonUnitWidth;
		var button = document.getElementById(EcpWebChatEntry.buttonId);
		if(button != null && button.className == "EcpWebChat_min"){
			maxWidth  = EcpWebChatEntry.maxMinButtonWidth;
			unitWidth = EcpWebChatEntry.buttonMinUnitWidth;
		}
		
		//目前寬度小於最大寬度時，則執行寬度調整
 		if(EcpWebChatEntry.buttonWidth < maxWidth){
 			//計算新的按鈕寬度
			EcpWebChatEntry.buttonWidth = EcpWebChatEntry.buttonWidth + unitWidth;
 			if(EcpWebChatEntry.buttonWidth > maxWidth){
 				EcpWebChatEntry.buttonWidth = maxWidth;
 			}
 			//調整按鈕寬度
 			var button = document.getElementById(EcpWebChatEntry.buttonId);
 			button.style.width = EcpWebChatEntry.buttonWidth + "px";
 		}else{//否則註銷Interval
 			if(EcpWebChatEntry.buttonInterval != null){
 				clearInterval(EcpWebChatEntry.buttonInterval);
 			}
 		}
 	},hideButton:function(){
 		if(EcpWebChatEntry.buttonWidth > 0){
 			
 			EcpWebChatEntry.buttonWidth = EcpWebChatEntry.buttonWidth -  EcpWebChatEntry.buttonUnitWidth;
 			if(EcpWebChatEntry.buttonWidth < 0){
 				EcpWebChatEntry.buttonWidth = 0;
 			}
 			var pane = document.getElementById(EcpWebChatEntry.buttonId);
 			pane.style.width = EcpWebChatEntry.buttonWidth + "px";
 			
 		}else{
 			if(EcpWebChatEntry.buttonInterval != null){
 				clearInterval(EcpWebChatEntry.buttonInterval);
 			}
 		}
 		
 		
 	},
	
	
	//==========================================================
 	//Chat Args-----------------------------------------------
 	getFromTitle:function(){
 		var fromTitle = "No Title";
		if(typeof(document.getElementsByTagName("title")[0])!=='undefined'){
			fromTitle = document.getElementsByTagName("title")[0].innerHTML;
		}
 		return encodeURIComponent(fromTitle);
 	},
 	getFromDevice:function(){
 		var fromDevice = "";;
		if(/Android|iPhone|iPad/i.test(navigator.userAgent)){
			fromDevice = "MOBILE_APP";
		}else{
			fromDevice = "WEB_SITE";
		}
		return fromDevice;
 	},
 	getFromUrl:function(){
 		var url = location.href,
 			protocol = location.protocol,
 			hostname = location.hostname,
 			pathname = location.pathname,
 			search = location.search;
 		if(search){
 			search = search.replace(/</g, "");  
 			search = search.replace(/%3C/g, "");  
 			search = search.replace(/>/g, "");  
 			search = search.replace(/%3E/g, "");  
 			search = search.replace(/'/g, "");  
 			search = search.replace(/%27/g, "");  
 			search = search.replace(/"/g, "");  
 			search = search.replace(/%22/g, "");  
 			search = search.replace(/\//g, ""); 
 			return protocol+"//"+hostname+pathname+search;
 		}else{
 			return url;
 		}
 	},
 	
 	//INIT UI--------------------------------------
 	createCSS:function(){
 		//Define CSS and insert to head tag
 		var css = document.createElement('style');
 		css.type = 'text/css';
 		var styles = "";
		styles+= "html, body { height:100%; }								 ";//處理HTML5文件宣告無法正確取得高度問題
 		styles+= "#EcpWebChatEntryPane{                                      ";
	    styles+= "	position: fixed;                                         ";
	    styles+= "	bottom: 0px;                                             ";
	    styles+= "	right: 0px;                                              ";
	    styles+= "	width: 0px;                                              ";
	    styles+= "	height: 600px;                                           ";
	    styles+= "	padding: 0px;                                            ";
	    styles+= "	font-size: 16px;                                         ";
	    styles+= "	cursor: default;                                         ";
	    styles+= "	box-sizing: border-box;                                  ";
	    styles+= "	resize: both;                                            ";
	    styles+= "	border: 0px solid rgb(64, 64, 128);                      ";
	    styles+= "	z-index: 99999;                                          ";
	    styles+= "	display: block;                                          ";
	    styles+= "}                                                          ";  
	    styles+= "#EcpWebChatEntryButton{                                    ";
	    styles+= "	position: fixed;                                         ";
	    styles+= "	bottom: 30%;                                             ";
	    styles+= "	right: 0px;                                              ";
	    styles+= "	width: 138px;                                            ";
	    styles+= "	height: 139px;                                           ";
	    styles+= "	cursor:pointer;                                          ";
	    styles+= "	text-align:center;                                       ";
	    styles+= "	line-height:30px;                                        ";
	    styles+= "	font-family:\"Microsoft JhengHei\",sans-serif;			 ";
	    styles+= "	color:#333;                                              ";
	    styles+= "	z-index: 99998;                                          ";
		styles+= "	overflow: hidden;                                        ";
	    styles+= "}    			                                             ";
		styles+= "#EcpWebChatEntryButton .EcpWebChat_text{                   ";
		styles+= "	padding-top:100px;                                       ";
		styles+= "	font-size:16px;                                          ";
		styles+= "}    			                                             ";
		styles+= "#EcpWebChatEntryButton:hover{color: #00a94f}    	 		 ";
		styles+= "#EcpWebChatEntryButton.EcpWebChat_min{                     ";
		styles+= "	width:   40px;                                           ";
	    styles+= "	height: 172px;                                           ";
		styles+= "	padding:  0px;                                           ";
		styles+= "	color:#FFF;          									 ";
		styles+= "}    			                                             ";
		styles+= "#EcpWebChatEntryButton.EcpWebChat_min:hover .EcpWebChat_arrow{                   ";
	    styles+= "	margin: 8px 0 0 17px;                                	 ";
		styles+= "	width:40px;												 ";
		styles+= "	height: 30px;                                            ";
		styles+= "}  														 ";
		styles+= "#EcpWebChatEntryButton.EcpWebChat_min .EcpWebChat_text{    ";
		styles+= "	padding-top:45px;                          				 ";
		styles+= "	width:22px;                          					 ";
		styles+= "	font-size:1.2em;                                         ";
		styles+= "	line-height:20px; 										 ";
		styles+= "	margin:0 8px;          								 	 ";
		styles+= "}    			                                             ";
		styles+= "#EcpWebChatEntryButton.EcpWebChat_min:hover{color: #fff437;}    		 ";
		styles+= "#EcpWebChatEntryButton.EcpWebChat_min:active{color: #7DFF32;}    	 ";
	    styles+= "#EcpWebChatPostFrameForm{                                  ";
	    styles+= "	display:none;                                            ";
	    styles+= "}                                                          ";
	    styles+= "#EcpWebChatIFrame{                                         ";
	    styles += "	height:600px;                                            ";
	    styles+= "	width:477px;                                             ";
	    styles+= "	right:0                                                  ";
	    styles+= "	border-radius: 10px;                                     ";
	    styles+= "	-webkit-box-shadow: rgba(0, 0, 0, 0.15) -8px 10px 15px 0;";
	    styles+= "	-moz-box-shadow: rgba(0, 0, 0, 0.15) -8px 10px 15px 0;   ";
	    styles+= "	box-shadow: rgba(0, 0, 0, 0.15) -8px 10px 15px 0;        ";
	    styles+= "}                                                          ";
		styles+= "#EcpWebChatEntryLeft{                                      ";
		styles+= "	width:0px;                                               ";
		styles+= "	float:left;                                              ";
		styles+= "	margin-top:10px;                                         ";
		styles+= "}                                                          ";
		styles+= "#EcpWebChatEntryRight{                                     ";
		styles+= "	width:0px;                                               ";
		styles+= "	float:right;                                             ";
		styles+= "}                                                          ";
		styles+= "#EcpWebChatEntryClean{clear:both;}                         ";
		styles+= "#EcpWebChatCloseButton{                                    ";
		styles+= "	background-repeat: no-repeat;                            ";
		styles+= "	width:32px;                                              ";
		styles+= "	height:100px;                                            ";
		styles+= "	cursor:pointer;                                          ";
		styles+= "	font-family:\"Microsoft JhengHei\",sans-serif;			 ";
		styles+= "	color:#FFF;			 									 ";		
		styles+= "	padding-top:10px;			 						     ";	
		styles+= "}                                                          ";
		styles+= "#EcpWebChatCloseButton .EcpWebChat_text{                   ";
		styles+= "	padding-top:15px;                          				 ";
		styles+= "	width:20px;                          					 ";
		styles+= "	font-size:1.1em;                                         ";
		styles+= "	line-height:25px; 										 ";
		styles+= "	margin:0 5px;          								 	 ";
		styles+= "}   														 ";
		styles+= "#EcpWebChatCloseButton .EcpWebChat_text:hover{             ";
		styles+= "	color: #fff437;                                          ";
		styles+= "}                                                          ";
		
		styles+= "#EcpWebChatCloseButton .EcpWebChat_arrow{                  ";
	    styles+= "	margin-left:11px;                                	     ";
		styles+= "	width:40px;												 ";
		styles+= "}  														 ";
		
		styles+= "#EcpWebChatLoad{                                           ";
	    styles+= "	z-index:99997;                                	         ";
		styles+= "	position: fixed;										 ";
		styles+= "	text-align:center;										 ";
		styles+= "	padding-top:150px;				                         ";
		styles+= "	background-color:#F8F6F1;				                 ";
	    styles+= "	border-radius: 10px 0 10px 0;width:477px;                ";
		styles+= "	width:477px;                                             ";
		styles+= "}  														 ";
     
		//圖片CSS
		styles+= "#EcpWebChatCloseButton{background: url(" + EcpWebChatEntry.closeIcon + ") no-repeat 0 center;}						"
		styles+= "#EcpWebChatEntryButton{background: url(" + EcpWebChatEntry.serviceIcon + ") no-repeat 0 center;}						"
		styles+= "#EcpWebChatEntryButton.EcpWebChat_min{background: url(" + EcpWebChatEntry.minServiceIcon + ") no-repeat 0 center;}				"
		styles+= "#EcpWebChatEntryButton.EcpWebChat_min:hover .EcpWebChat_arrow{background: url(" + EcpWebChatEntry.arrowIconHover + ") no-repeat 0 center;}	";
 		styles+= "#EcpWebChatCloseButton:hover .EcpWebChat_arrow{background: url(" + EcpWebChatEntry.arrowIconHover + ") no-repeat 0 center;}	";
 		
		if (css.styleSheet){
 			css.styleSheet.cssText = styles;
 		} else {
 			css.appendChild(document.createTextNode(styles));
 		}
 		document.getElementsByTagName("head")[0].appendChild(css);
 	},
 	createButton: function(){
 		var button = document.getElementById(EcpWebChatEntry.buttonId);
		if (button == null) {
			var button						= document.createElement("div");
			button.id						= EcpWebChatEntry.buttonId;
			button.onclick					= EcpWebChatEntry.doButtonClick;
			button.innerHTML				= "<div class='EcpWebChat_text'>"+EcpWebChatEntry.serviceText+"</div><div class='EcpWebChat_arrow'>&nbsp;</div>";
			document.body.appendChild(button); 
		}

	},
 	createPanel:function(){
 		//init WebChatHtml
 		var pane = document.getElementById(EcpWebChatEntry.paneId);
		if (pane == null) {
			var html = "";
			html+= "<div id='EcpWebChatEntryLeft'>                                                                                                                    ";
			html+= "	<div style='padding:2px;'>																													  ";
			html+= "		<div id='EcpWebChatCloseButton' onclick='EcpWebChatEntry.doCloseButtonClick()'>															  ";
			html+= "			<div class='EcpWebChat_arrow'>&nbsp;</div><div class='EcpWebChat_text'>"+EcpWebChatEntry.closeText+"</div>							  ";
			html+= "		</div>																																	  ";
			html+= "	</div>																																		  ";
			html+= "</div>                                                                                                                                            ";
			html+= "<div id='EcpWebChatEntryRight'>                                                                                                                   ";
			html+= "	<div id='EcpWebChatLoad'><img src='" + EcpWebChatEntry.loadIcon + "' /></div>                                                                                                                                            ";
			html+= "	<iframe id='EcpWebChatIFrame' name='EcpWebChatIFrame' frameborder='no' allowTransparency='true' src='"
			html+=       EcpWebChatEntry.clientUrl+"?fromUrl="+EcpWebChatEntry.getFromUrl()+"&fromTitle="+EcpWebChatEntry.getFromTitle()+"&fromDevice="+EcpWebChatEntry.getFromDevice()
			html+=       "'></iframe>                                     ";

			html+= "</div>                                                                                                                                            ";
			html+= "<div id='EcpWebChatEntryClean'></div>                                                                                                             ";
			
			var pane			= document.createElement("div");
			pane.id				= EcpWebChatEntry.paneId;
			pane.innerHTML		= html;
			pane.onmousewheel	= function(event) {event.preventDefault();};
			document.body.appendChild(pane);
			
			var frame = document.getElementById('EcpWebChatIFrame');
			EcpWebChatEntry.bindEvent(frame, 'load', EcpWebChatEntry.doFrameOnLoad);
		}
 	},
 	doFrameOnLoad:function(){
 		 EcpWebChatEntry.loadInterval = setInterval(function(){ EcpWebChatEntry.hideLoadIcon() },1);
 	},

	loadInterval:null,
	alpha:100,
	alphaUnit:10,
	hideLoadIcon:function(){
		var obj = document.getElementById(EcpWebChatEntry.loadId);
		var alpha = EcpWebChatEntry.alpha - EcpWebChatEntry.alphaUnit;
		if(alpha < 0){alpha = 0;}
		EcpWebChatEntry.alpha = alpha;
		if(typeof(obj) != "undefined" && typeof(obj.filters) != "undefined" && typeof(obj.filters.alpha) != "undefined"){
			obj.filters.alpha.opacity = 1 * alpha;
		}else{
			obj.style.opacity=0.01 * alpha;
		}
		if(alpha == 0 && EcpWebChatEntry.loadInterval != null){
			clearInterval(EcpWebChatEntry.loadInterval);
			obj.style.display="none";
		}
	}
};

function ProcessXSS(sInput)
{
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(sInput));		
	return div.innerHTML;
}

function htmldecode(sInput)
{
	var div = document.createElement('div');
	div.innerHTML = sInput;
	return div.innerText || div.textContent;
}
    
var mobiles = new Array
(
	"midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
	"240x320", "opwv", "chtml", "pda", "window ce", "mmp/",
	"blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
	"phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc",
	"mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx",
	"NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
	"rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
	"bir", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
	"sgh", "gradi", "jb", "dddi", "moto", "iphone", "android",
	"iPod", "incoqnito", "webmate", "dream", "cupcake", "webos",
	"s8000", "bada", "googlebot-mobile"
)
 
var ua = navigator.userAgent.toLowerCase();
var isMobile = false;
for(var i = 0; i < mobiles.length; i++)
{
	if(ua.indexOf(mobiles[i]) > 0)
	{
		isMobile = true;
		break;
	}
}

var currentURL = window.location.href;
var notShow = new Array
(
	"cathaybk/private-bank/default.asp"
)

var isShow = false;
for(var i = 0; i < notShow.length; i++)
{
	if(currentURL.indexOf(notShow[i]) > 0)
	{
		isShow = true;
		break;
	}
}

if (isMobile == false && isShow == false)
{
	EcpWebChatEntry.initialize();
}



