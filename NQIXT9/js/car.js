var addr = "https://webtechcars.herokuapp.com/api/cars";

function toJSONString() {
    var obj = {};
    var elements = document.querySelectorAll("input");
    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;
        if(name) {
            if (name =="consumption") {
                obj[name] = value + 'kWh/100km';
            } else {
                obj[name] = value;
            }
        }
    }
    return JSON.stringify(obj);
}

function upLoad() {
    var json = toJSONString();
    $.ajax({
        async:false,
        type: "POST",
        url: addr,
        data: json,
        dataType: "json",
        contentType: "application/json",
    });
    $(".content").load("car.html");
}

function del(button) {
    var delId= $(button).parents("tr").find('td:first').html();
    $.ajax({
        type: "DELETE",
        url: addr+"/"+delId,
    });
    setTimeout(function (){

        $(".content").load("car.html");

    }, 100);
}

function rw(button) {
    var rwId = $(button).parents("tr").find('td:first').html();
    $.getJSON(addr, function (data) {
        $.each(data, function (key, value) {
            if (value._id == rwId) {
                document.getElementsByName('_id')[0].value = value._id;
                document.getElementsByName('name')[0].value = value.name;
                document.getElementsByName('consumption')[0].value = value.consumption;
                document.getElementsByName('color')[0].value = value.color;
                document.getElementsByName('manufacturer')[0].value = value.manufacturer;
                document.getElementsByName('avaiable')[0].value = value.avaiable;
                document.getElementsByName('year')[0].value = value.year;
                document.getElementsByName('horsepower')[0].value = value.horsepower;
            }
        })
    })
}


$(document).ready(function() {
    var table = $("#carTable");
    $.getJSON(addr, function (data){
        $.each(data, function (key,value) {
            var row =$("<tr></tr>");
            var idCell = $("<td style='display:none'>" + value._id + "</td>");
            var nameCell = $("<td>" + value.name + "</td>");
            var consumptionCell = $("<td>" + value.consumption + "</td>");
            var colorCell = $("<td>" + value.color + '</td>');
            var manufacturerCell = $("<td>" + value.manufacturer + "</td>");
            var avaiableCell = $("<td>" + value.avaiable + "</td>");
            var yearCell = $("<td>" + value.year + "</td>");
            var horsepowerCell = $("<td>" + value.horsepower + "</td>");
            $(row).append(idCell);
            $(row).append(nameCell);
            $(row).append(consumptionCell);
            $(row).append(colorCell);
            $(row).append(manufacturerCell);
            $(row).append(avaiableCell);
            $(row).append(yearCell);
            $(row).append(horsepowerCell);
            $(row).append("<td><button onclick='del(this)' type='button'>Del</button></td>>");
            $(row).append("<td><button onclick='rw(this)' type='button'>RW</button></td>>");
            $(table).append(row);
        })
        $(table).append("<tr>" +
            "<form id='carForm'>" +
            "<td style='display:none'><input type='text' name='_id'/></td>" +
            "<td><input type='text' name='name' required='required'/></td>" +
            "<td><input type='number' name='consumption' required='required'/></td>" +
            "<td><input type='text' name='color' required='required'/></td>" +
            "<td><input type='text' name='manufacturer' required='required'/></td>" +
            "<td><input type='number' name='avaiable' required='required'/></td>" +
            "<td><input type='number' name='year' min='1900' max='2099' required='required'/></td>" +
            "<td><input type='number' name='horsepower' required='required'/></td>" +
            "<td colSpan = '2' ><button onclick='upLoad()' type ='button'>Upload</button></td>" +
            "</form>" +
            "</tr>");
    })
});