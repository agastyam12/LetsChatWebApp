var firebaseConfig = {
  apiKey: "AIzaSyDipV58AR9MEtw7H4K88bY-ar89cBHROhg",
  authDomain: "databases-2f0a2.firebaseapp.com",
  databaseURL: "https://databases-2f0a2-default-rtdb.firebaseio.com",
  projectId: "databases-2f0a2",
  storageBucket: "databases-2f0a2.appspot.com",
  messagingSenderId: "27240971622",
  appId: "1:27240971622:web:0c47d4d5d6b6d1ab6f5ca7",
  measurementId: "G-YXNJLNP2E8"
};


firebase.initializeApp(firebaseConfig);
var user_name = localStorage.getItem("user_name");
var room_name = localStorage.getItem("room_name");


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         name1 = message_data['name'];
         message = message_data["message"];
         like = message_data ['like'];
         name_with_tag ="<h4>" + name1 + "<img class='user_tick' src='tick.png'> </h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
         user_name = localStorage.getItem("user_name");
         if(name1 == user_name){
          name_with_tag = "<span id='namecheck1'>" + "<h4>" + name1 + "<img class='user_tick' src='tick.png'> </h4>" + "</span>" ;
          message_with_tag= "<span id='messagecheck1'>" + "<h4 class='message_h4'>" + message + "</h4>";
        }
        else if (name1 != user_name){
          name_with_tag = "<span id='namecheck2'>" + "<h4>" + name1 + "<img class='user_tick' src='tick.png'> </h4>" + "</span>" ;
          message_with_tag= "<span id='messagecheck2'>" + "<h4>" + "<h4 class='message_h4'>" + message + "</h4>";
        }
row = name_with_tag + message_with_tag;
document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function send(){
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
  });

  document.getElementById("msg").value = "";
}


function logout() {
  window.location.replace = "kwitter.html";
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
}