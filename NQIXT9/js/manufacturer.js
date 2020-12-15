var addr = "https://webtechcars.herokuapp.com/api/manufacturers";

function toJSONString() {
    var obj = {};
    var elements = document.querySelectorAll("input");
    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;
        if(name) {
            obj[name] = value;
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
    $(".content").load("manufacturer.html");
}

function del(button) {
    var delId= $(button).parents("tr").find('td:first').html();
    $.ajax({
        type: "DELETE",
        url: addr+"/"+delId,
    });
    setTimeout(function (){

        $(".content").load("manufacturer.html");

    }, 100);
}

function rw(button) {
    var rwId = $(button).parents("tr").find('td:first').html();
    $.getJSON(addr, function (data) {
        $.each(data, function (key, value) {
            if (value._id == rwId) {
                document.getElementsByName('_id')[0].value = value._id;
                document.getElementsByName('name')[0].value = value.name;
                document.getElementsByName('country')[0].value = value.country;
                document.getElementsByName('founded')[0].value = value.founded;
            }
        })
    })
}


$(document).ready(function() {
    var table = $("#manufacturerTable");
    $.getJSON(addr, function (data){
        $.each(data, function (key,value) {
            var row =$("<tr></tr>");
            var idCell = $("<td style='display:none'>" + value._id + "</td>");
            var nameCell = $("<td>" + value.name + "</td>");
            var countryCell = $("<td>" + value.country + "</td>");
            var foundedCell = $("<td>" + value.founded + '</td>');
            $(row).append(idCell);
            $(row).append(nameCell);
            $(row).append(countryCell);
            $(row).append(foundedCell);
            $(row).append("<td><button onclick='del(this)' type='button'>Del</button></td>>");
            $(row).append("<td><button onclick='rw(this)' type='button'>RW</button></td>>");
            $(table).append(row);
        })
        $(table).append("<tr>" +
            "<form id='manufacturerForm'>" +
            "<td style='display:none'><input type='text' name='_id'/></td>" +
            "<td><input type='text' name='name' required='required'/></td>" +
            "<td><input type='text' name='country' required='required'/></td>" +
            "<td><input type='date' name='founded' required='required'/></td>" +
            "<td colSpan = '2' ><button onclick='upLoad()' type ='button'>Upload</button></td>" +
            "</form>" +
            "</tr>");
    })
});