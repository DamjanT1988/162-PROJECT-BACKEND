"use strict";

var baseURL = "http://localhost:3000/users/";
var secURL = "http://localhost:3000/keys/";

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {

    // Read and publish all users 
    let url = baseURL;
    let urlkey = secURL;

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("name").value = "";
    document.getElementById("key").value = "";

    //
    // Create event handler for add user
    document.getElementById("adduser").addEventListener("click", function (e) {
        
        fetch(urlkey, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(response => response.text())
            .then(data => {

            var jsonData = JSON.parse(data);

            console.log(jsonData[0].key);

            var obj = {};
            obj.key = document.getElementById("key").value;

            if (jsonData[0].key == obj.key)  {
                console.log("Correct!");
                
                var obj = {};
                obj.name = document.getElementById("name").value;
                obj.email = document.getElementById("email").value;
                obj.password = document.getElementById("password").value;
        
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
            
            } else {
                console.log("Incorrect!");
            }

            })
    
            .catch(error => {
                alert('There was an error ' + error);
            });
    
    });

}); // End of DOM content loaded 






/*
 
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
*/

/*
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
*/