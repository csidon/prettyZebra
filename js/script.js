console.log('js'); //viewed in console of the browser
console.log(key)
// js objects written in key:value pair
//similar to c++ array of structure
var login =[
  {
    username:'beulasamuel',
    password:'beula'
  },
  {
    username:'priscillaphilips',
    password:'priscilla'
  },
  {
    username:'lazarusgamaliel',
    password:'lazarus'
  }
];

document.getElementById('login-form').style.display='none';
// document.getElementById('taxi-nav-container').style.display='none';

var loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', function(){
  document.getElementById('login-form').style.display='block';
});


var homeIcon = document.getElementById('home-icon');



homeIcon.addEventListener('click', function(){
  nav();

});
function  nav(){
  if (homeIcon.style.display == 'none'){
    document.getElementById('taxi-nav-container').style.display='block';
  } else {
      document.getElementById('taxi-nav-container').style.display='none';
  };
}
var closeBtn =document.getElementById('close-btn');
closeBtn.addEventListener('click', function(){
  console.log('close btn clicked');
  document.getElementById('taxi-nav-container').style.display='none';
});


var submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click',function(){
  document.getElementById('login-form').style.display='none';
  // alert('Login button is clicked');
  var userName = document.getElementById('username').value;
  var passWord = document.getElementById('password').value;
  // console.log(userName,passWord );

  if ((userName !== '') && (password !== '')) {
    var i, flag=0;
    for(i=0; i<login.length; i++){
      if ((userName == login[i].username) && (passWord == login[i].password)) {
        flag=1;
        break;
      }
    }

    if (flag==1){
      //alert()//is a function to show a pop up message
      alert('Login successful');
    } else {
      alert('Login not successful. Please try again');
    }
  } else{
    alert('username and password must be provided');
  }
});


//input form submission
var submitInputBtn = document.getElementById('submit-input');

submitInputBtn.addEventListener('click', function(){
  //document.getElementById('input-form').style.display='none';
  //alert()
  var origin =document.getElementById('origin').value;
  var origin = document.getElementById('destination').value;
  console.log(origin, destination);
})

// Initialize and add the map
function initMap() {
  // The location of Middle of north island, NZ
  const kapitiCoastDistrict = { lat: -40.839046, lng: 175.279067 };
  // The location of Wellington, NZ
  const wellington = { lat: -41.2924, lng: 174.7787 };
  // The location of KapitiEOC, NZ
  const kapitiEOC = { lat: -40.900008, lng: 175.015388 };
  // The location of Palmerston North, NZ
  const palmerston = { lat: -40.358217, lng: 175.614785 };

  // The map, centered at Wellington
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: kapitiCoastDistrict,
  });
  // The marker, positioned at Wellington
  const marker = new google.maps.Marker({
    position: wellington,
    map: map,
  });
  const marker2 = new google.maps.Marker({
    position: palmerston,
    map: map,
  });
  const marker3 = new google.maps.Marker({
    position: kapitiEOC,
    map: map,
  });
}
