$(document).ready(function () {

    document.getElementById("btnChange").disabled = true;

    $("#repeatpassword").change(function () {

        if (document.getElementById('newpassword').value != document.getElementById('repeatpassword').value) {
            document.getElementById("btnChange").disabled = true;
        } else {
            document.getElementById("btnChange").disabled = false;
        }

    })

    $("#newpassword").change(function () {

        if (document.getElementById('newpassword').value != document.getElementById('repeatpassword').value) {
            document.getElementById("btnChange").disabled = true;
        } else {
            document.getElementById("btnChange").disabled = false;
        }

    })


})

async function ChangePassword() {

    ///Validate
    if (document.getElementById('oldpassword').value.replace(/\s/g, "") == "" || document.getElementById('newpassword').value.replace(/\s/g, "") == "" || document.getElementById('repeatpassword').value.replace(/\s/g, "") == "") {
        alert("Falta campos por llenar.")
        return;
    }

    var id = getCookie('if');
    var tk = getCookie('tk');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", tk);

    var raw = JSON.stringify({
        "id": id,
        "oldpassword": document.getElementById('oldpassword').value.replace(/\s/g, ""),
        "newpassword": document.getElementById('newpassword').value.replace(/\s/g, "")
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/api/auth/changepassword", requestOptions)
        .then(response => response.json())
        .then(response => {
            alert(response.message)
            document.getElementById('oldpassword').value=""
            document.getElementById('newpassword').value=""
            document.getElementById('repeatpassword').value=""
        })
        .catch(error => console.log('error', error));

}

function getCookie(cookieName) {

    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

function exit() {

    var id=getCookie('if');
    var tk=getCookie('tk');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-access-token", tk);
    
    var raw = JSON.stringify({
        "id": id
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("/api/auth/signout/", requestOptions)
      .then(response => response.json())
      .then(() => {
        deleteCookie('if');
        deleteCookie('tk');
        window.location.href = '/'
      })
      .catch(error => console.log('error', error));

   
    

}

function deleteCookie(cookieName) {
    document.cookie = cookieName + "= ;Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}