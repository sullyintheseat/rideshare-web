function checkField(field, type) {
    var isValid = false;
    var val = $(field).val();
    if (type == "email") {
        var atpos = val.indexOf("@");
        var dotpos = val.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= val.length) {
            isValid = false;
        } else {
            isValid = true;
        }
    };
    if (type == "text") {
        if (val.length > 0) {
            isValid = true;
        }
    };
    return isValid;
};

function getData(op, cb) {
    $.ajax({
        type: "GET",
        url: op,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            cb(true, data);
        },
        error: function(err) {
            cb(false, "error");
        }
    });
};


function postData(mdata, purl, callback) {
    var success = false;
    $.ajax({
        url: purl,
        type: 'POST',
        data: JSON.stringify(mdata),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        context: this,
        success: function(data) {
            console.log(data)
            if(data.success){
                callback(true, data);
            } else {
                callback(false, data);
            };
        },
        error: function(err) {
            callback(false, {'data':{'err':err}} )
        },
        complete: function(data) { }
    });


};


function jumpTo(target) {
    window.location = target;
};

function logOut(){
    sDomain = '54.149.254.241';
    sPath = '/';
    document.cookie = encodeURIComponent('mkim') + 
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + 
    (sDomain ? "; domain=" + sDomain : "") + 
    (sPath ? "; path=" + sPath : "");
    jumpTo('/default.html');
};

function showPanel(panel){
    for(var i = 0; i < panels.length; i++){
        $('#' + panels[i]).removeClass('displayOn');
        $('#' + panels[i]).addClass('displayOff');
    };
    $('#' + panel).removeClass('displayOff');
    $('#' + panel).addClass('displayOn');
}

function setContent(src, data, target) {
    var source = $('#'+src).html();
    var template = Handlebars.compile(source);
    $('#'+target).html(template(data));
};

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function propIter(obj){
    var str = "";
    for (var prop in obj) {
      str += ("obj." + prop + " = " + obj[prop] + "\n");
    };
    return(str);
};

function getAll(obj){
    var str = "";
    for (var prop in obj) {
      str += (obj[prop] + " ");
    };
    return(str);
};

Handlebars.registerHelper('switcheroo', function (evt){
    var result = "";
    switch(evt){
        case "1000":
            result = "EMERALD";
            break;

        case "1001":
            result = "RUBY";
            break;

        case "1002":
            result = "SAPPHIRE";
            break;

        case "1003":
            result = "DIAMOND";
            break;
    }
    return result;
});


Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('format-date', function(date, format, dispyear) {
    if(dispyear == null || dispyear){
        return moment(date).format(format);
    } else {
        var tdate = moment(date).format(format).split(' ');
        return tdate[0] + tdate[1];
    }
});
