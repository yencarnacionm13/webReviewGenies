
$(document).ready(function () {

  $('#otherform').hide();

  document.getElementById("register").disabled = true;

  $("#ocupation").change(function () {

    if (document.getElementById('ocupation').value == 5) {
      $('#otherform').show();
    } else {
      $('#otherform').hide();
    }

  })

  $("#repeatpswd").change(function () {

    if (document.getElementById('pswd').value != document.getElementById('repeatpswd').value) {
      document.getElementById("register").disabled = true;
    } else {
      document.getElementById("register").disabled = false;
    }

  })

  $("#pswd").change(function () {

    if (document.getElementById('pswd').value != document.getElementById('repeatpswd').value) {
      document.getElementById("register").disabled = true;
    } else {
      document.getElementById("register").disabled = false;
    }

  })

})

async function createregister() {
  ///Validate
  /*   if(document.getElementById('identification').value.replace('-','').replace('-','')=="" || document.getElementById('identification').value.replace('-','').replace('-','').replace('_','').length!=11){
        alert("Cedula no valida")
        return;
      } */

  if (document.getElementById('nombre').value == "" || document.getElementById('email').value == "" || document.getElementById('ocupation').value == "") {
    alert("Faltan campos por llenar.")
    return;
  }

  if (document.getElementById('ocupation').value == 5 && document.getElementById('other').value == "") {
    alert("Debe llenar el campo otro.")
    return;
  }


  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "identification": document.getElementById('identification').value.replace('-', '').replace('-', ''),
    "name": document.getElementById('nombre').value,
    /* "lastname":document.getElementById('apellido').value, */
    "idocupation": document.getElementById('ocupation').value,
    "other": document.getElementById('other').value,
    "email": document.getElementById('email').value,
    "password": document.getElementById('pswd').value
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("/api/auth/signup", requestOptions)
    .then(response => response.json())
    .then( response => {

      if (response.message == "¡Esta cedula existe entre los usuarios!" || response.message == "¡Este correo existe entre los usuarios!") {
        alert(response.message)
      } else {

        alert(response.message)
        window.location.href = '/'
      }
    })
    .catch(error => console.log('error', error));

}

async function dropdown() {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("/api/ocupation", requestOptions)
    .then(response => response.json())
    .then(response => {

      var options = response.resultado;
      for (var i = 0; i < options.length; i++) {
        $('#ocupation').append('<option value="' + options[i].id + '">' + options[i].name + '</option>');
      }

    })
    .catch(error => console.log('error', error));

}


dropdown();

// Set a Cookie
function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  //date.setTime(date.getTime() + (expDays * 6000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    /* Removing whitespace at the beginning of the cookie name
    and compare it with the given string */
    if (name == cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if not found
  return null;
}

function validate_int(myEvento) {
  if ((myEvento.charCode >= 48 && myEvento.charCode <= 57) || myEvento.keyCode == 9 || myEvento.keyCode == 10 || myEvento.keyCode == 13 || myEvento.keyCode == 8 || myEvento.keyCode == 116 || myEvento.keyCode == 46 || (myEvento.keyCode <= 40 && myEvento.keyCode >= 37)) {
    dato = true;
  } else {
    dato = false;
  }
  return dato;
}

function phone_number_mask() {
  var myMask = "___-_______-_";
  var myCaja = document.getElementById("identification");
  var myText = "";
  var myNumbers = [];
  var myOutPut = ""
  var theLastPos = 1;
  myText = myCaja.value;
  //get numbers
  for (var i = 0; i < myText.length; i++) {
    if (!isNaN(myText.charAt(i)) && myText.charAt(i) != " ") {
      myNumbers.push(myText.charAt(i));
    }
  }

  //write over mask
  for (var j = 0; j < myMask.length; j++) {
    if (myMask.charAt(j) == "_") { //replace "_" by a number 
      if (myNumbers.length == 0)
        myOutPut = myOutPut + myMask.charAt(j);
      else {
        myOutPut = myOutPut + myNumbers.shift();
        theLastPos = j + 1; //set caret position
      }
    } else {
      myOutPut = myOutPut + myMask.charAt(j);
    }
  }



  document.getElementById("identification").value = myOutPut;
  document.getElementById("identification").setSelectionRange(theLastPos, theLastPos);
}

document.getElementById("identification").onkeypress = validate_int;
document.getElementById("identification").onkeyup = phone_number_mask;