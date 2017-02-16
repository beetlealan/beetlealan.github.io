var isIE = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) <= 10;
var ieVer = navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1;
var str = navigator.appVersion;
var project = "/cathaybk/";//
if(isIE){
    var ua = navigator.userAgent;
    var ie_compatibilityMode = false;

    // Detect whether or not the browser is IE
    var ieRegex = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (ieRegex.exec(ua) == null)
        this.exception = "The user agent detected does not contai Internet Explorer.";

    // Get the current "emulated" version of IE
    var ie_renderVersion = parseFloat(RegExp.$1);
    var ie_version = ie_renderVersion;

    // Check the browser version with the rest of the agent string to detect compatibility mode
    if (ua.indexOf("Trident/7.0") > -1) {
        if (ua.indexOf("MSIE 8.0") > -1) {
            ie_compatibilityMode = true;
            ie_version = 11;                  // IE 11
        }
    }else if (ua.indexOf("Trident/6.0") > -1) {
        if (ua.indexOf("MSIE 7.0") > -1) {
            ie_compatibilityMode = true;
            ie_version = 10;                  // IE 10
        }
    } else if (ua.indexOf("Trident/5.0") > -1) {      
        if (ua.indexOf("MSIE 7.0") > -1) {
            ie_compatibilityMode = true;
            ie_version = 9;                   // IE 9
        }
    } else if (ua.indexOf("Trident/4.0") > -1) {
        if (ua.indexOf("MSIE 7.0") > -1) {
            ie_compatibilityMode = true;
            ie_version = 8;                   // IE 8
        }
    } else if (ua.indexOf("MSIE 7.0") > -1)
        ie_version = 7;                       // IE 7
    else
       ie_version = 6;                       // IE 6

    if(ie_version <8 && document.documentMode== undefined  || document.documentMode<8 ){
        ieVer = 7;
    }

    if(document.documentMode == undefined){
        ieVer = 7;
    }
}

if(isIE && (ie_version<=8)){
    document.write('<script src="'+project+'js/vendor/gsap/plugins/ScrollToPlugin.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/gsap/TweenMax.min.js"></script>');//
    document.write('<script src="'+project+'js/vendor/jquery.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/gsap/jquery.gsap.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/jquery.easing.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/hoverIntent.js"></script>');
    document.write('<script src="'+project+'js/vendor/superfish.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/jquery.selectik.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/jquery.icheck.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/jquery.mousewheel.js"></script>');
    document.write('<script src="'+project+'js/vendor/placeholders.jquery.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/jquery.flexslider.min.js"></script>');
    document.write('<script src="'+project+'js/main.js"></script>');
}else{
    document.write('<script src="'+project+'js/vendor/gsap/plugins/ScrollToPlugin.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/gsap/TweenMax.min.js"></script>');//
    document.write('<script src="'+project+'js/vendor/jquery.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/gsap/jquery.gsap.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/jquery.easing.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/hoverIntent.js"></script>');
    document.write('<script src="'+project+'js/vendor/superfish.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/jquery.selectik.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/jquery.icheck.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/jquery.mousewheel.js"></script>');
    document.write('<script src="'+project+'js/vendor/placeholders.jquery.min.js"></script>');
    document.write('<script src="'+project+'js/vendor/jquery.flexslider.min.js"></script>');
    document.write('<script src="'+project+'js/main.js"></script>');
}

var C_path ="/"
document.write('<script src="' + C_path + 'CelebrusInsert.js"></script>');