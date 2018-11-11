//LOCAL WEATHER---
$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(sucess, error);
    function sucess(pos) {
        var lat = pos.coords.latitude;
        var long = pos.coords.longitude;
        weather(lat, long);
    }
    function error() {
        console.log('ERROR');
    }
    function weather(lat, long) {
        var url = `https://api.openweathermap.org/data/2.5/weather?q=helsingborg&units=metric&appid=6b9fa96839b340590526fdf6c435ef7d`;
        $.getJSON(url, function (data) {
            updateDOM(data);
        });
    }
    function updateDOM(data) {
        var city = data.name;
        var temp = Math.round(data.main.temp);
        //var icon = data.weather[0].icon;
        var icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
        $("#city").html(city);
        $("#temp").html(temp);
        $("#icon").attr('src', icon);
    }
});
//Date & Time
setInterval(showTime, 1000);
function showTime() {
    var date = new Date();
    var din = date.getDate();
    var mahina = date.getMonth() + 1;
    var saal = date.getFullYear();
    var ghanta = date.getHours();
    var min = date.getMinutes();
    var pal = date.getSeconds();
    var session = "AM"
    if (ghanta == 0) {
        ghanta = 12;
    }
    if (ghanta > 12) {
        ghanta = ghanta - 12;
        session = "PM"
    }
    if (ghanta < 10) {
        ghanta = "0" + ghanta;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (pal < 10) {
        pal = "0" + pal;
    }
    var tarik = din + "-" + mahina + "-" + saal;
    var samay = ghanta + ":" + min + ":" + pal + " " + session;
    document.getElementById("myClockDisplay").innerHTML = tarik + "     " + samay;
};
showTime();

// Quotation---
$(document).ready(function () {
    var randomNum;
    var randomQuote;
    var randomAuthor;
    function getQuote() {
        var url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
        $.getJSON(url, function (data) {
            $("#vichar").html('"' + data.quoteText + '"' + '-' + data.quoteAuthor);
        });
    }
    getQuote();
});

// Currency Conversion---

function loadCurrencies() {
    var from = document.getElementById('from');
    var to = document.getElementById('to');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var obj = JSON.parse(this.responseText);
            var options = '';
            for (key in obj.rates) {
                options = options + '<option>' + key + '</option>';
            }
            from.innerHTML = options;
            to.innerHTML = options;
        }
    }
    xhttp.open('Get', 'http://data.fixer.io/api/latest?access_key=587c4a2368c099a651b0dda9c3d445d0', true);
    xhttp.send();
}
$('#submit').on('click', function () {
    convertCurrency();
});
function convertCurrency() {
    var fromCurrency = document.getElementById('from').value;
    //console.log(fromCurrency)
    var toCurrency = document.getElementById('to').value;
    var amount = document.getElementById('amount').value;
    var result = document.getElementById('result');
    var convert = fromCurrency + '_' + toCurrency;
    //console.log(convert)
    if (fromCurrency.length > 0 && toCurrency.length > 0 && amount.length > 0) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var obj = JSON.parse(xhttp.responseText);
                var fact = Object.values(obj)
                if (fact != undefined) {
                    result.innerHTML = parseFloat(amount) * parseFloat(fact);
                }
            }
        }
        xhttp.open('GET', 'http://free.currencyconverterapi.com/api/v6/convert?q=' + convert + '&compact=ultra', true);
        xhttp.send();
    }
}