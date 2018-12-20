function setCookie(cname, cvalue, exsec) {
    var d = new Date();
    d.setTime(d.getTime() + (exsec * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function checkForID(name){
    var cook = getCookie(name);
    if(cook != "" && cook != null){
        _SES = cook;
    } else {
        _SES = generateUUID();
        setCookie(name, _SES , 20);
    };
    //alert(_SES + " " + hofevent + " gonna check the hof");
    checkCookie(hofevent);
};

function checkCookie(event) {
    me = event;
    var ses = getCookie(event);
    if (ses != "" && ses != null) {
        return true;
    } else {
        return false;
    };
};