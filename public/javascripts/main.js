"use strict";

var baseURL = "http://localhost:3000/products/";

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {

    //document.getElementById("_id").value = "";
    document.getElementById("product_title").value = "";
    document.getElementById("ean_number").value = "";
    document.getElementById("product_description").value = "";
    document.getElementById("amount_storage").value = "";
    document.getElementById("price").value = "";
    document.getElementById("expiration_date").value = "";

    // Read and publish all users 
    let url = baseURL;
    
    fetch(url, {
        method: 'GET'
    })
        .then(response => response.text())
        .then(data => {

            var jsonData = JSON.parse(data);

            var s = "<table><th>PROD.TITLE</th><th>EAN.NO.</th><th>PROD.DESC.</th><th>AMOUNT</th><th>PRICE</th><th>EXPIRATION</th>";

            for (var i = 0; i < jsonData.length; i++) {
                s += "<tr><td>" + jsonData[i].product_title + "</td><td>" + jsonData[i].ean_number +
                    "</td><td>" + jsonData[i].product_description + "</td><td>" + jsonData[i].amount_storage + "</td><td>" + jsonData[i].price + "</td><td>" + jsonData[i].expiration_date + "</td><td><img src='images/papperskorg.png' alt='Erase user' id=" + jsonData[i]._id + " /></td></tr>";
            }

            s += "</table>";
            document.getElementById("result").innerHTML = s;
        })

        .catch(error => {
            alert('There was an error ' + error);
        });
    
    // Create event handler for delete user
    document.getElementById("result").addEventListener("click", function (e) {
        //console.log(e.target.id);

        let url = baseURL + e.target.id;

        //console.log(url);

        fetch(url, {
            method: 'DELETE'
        })
            .then(response => response.text())
            .then(data => {
                location.reload();
            }
            )
            .catch(error => {
                alert('There was an error ' + error);
            });
    });

    //
    // Create event handler for add user
    document.getElementById("addbutton").addEventListener("click", function (e) {
        var obj = {};

        obj.product_title = document.getElementById("product_title").value;
        obj.ean_number = document.getElementById("ean_number").value;
        obj.product_description = document.getElementById("product_description").value;
        obj.amount_storage = document.getElementById("amount_storage").value;
        obj.price = document.getElementById("price").value;
        obj.expiration_date = document.getElementById("expiration_date").value;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(response => response.text())
            .then(data => {
                location.reload();
            })

            .catch(error => {
                alert('There was an error ' + error);
            });
    });

}); // End of DOM content loaded 