
async function login()
{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
 ///document.getElementById('identification').value.replace('-','').replace('-','')
  var raw = JSON.stringify({
    "email": document.getElementById('email').value,
    "password": document.getElementById('password').value.replace(/\s/g, "")
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("/api/auth/signin", requestOptions)
    .then(response => response.json())
    .then(response => {

      if(response.accessToken!=null){

        setCookie('tk', response.accessToken, 1);
        setCookie('if', response.id, 1);

        window.location.href = '/dashboard';
        
      }else{
        alert(response.message)
      }

    })
    .catch(error => console.log('error', error));

}

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
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      
      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(name == cookiePair[0].trim()) {
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

  console.log(theLastPos)

  if(theLastPos==13){
    document.getElementById("login").disabled = false;
  }else{
    document.getElementById("login").disabled = true;
  }

  document.getElementById("identification").value = myOutPut;
  document.getElementById("identification").setSelectionRange(theLastPos, theLastPos);
}

/* document.getElementById("identification").onkeypress = validate_int;
document.getElementById("identification").onkeyup = phone_number_mask; */