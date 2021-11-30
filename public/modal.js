// Initialize and add the map

// function initMap() {
//           // The location of Uluru
//   const uluru = { lat: -25.344, lng: 131.036 };
//           // The map, centered at Uluru
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: uluru,
//   });
//         // The marker, positioned at Uluru
//   const marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//   });
// }



let map;
let markers = [];


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(-33.91722, 151.23064),
    zoom: 16,
  });

  var markerIcon = {
    url: 'http://image.flaticon.com/icons/svg/252/252025.svg',
    scaledSize: new google.maps.Size(80, 80),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(32,65),
    labelOrigin:  new google.maps.Point(40,33),
  };
  const labels = {
    low: {
      label: {
        text: "$175K",
        color: "black",
        fontFamily: "Material Icons",
        fontSize: "16px",
        fontWeight: 'bold', 
       
      }
    },
    middle: {
      label: {
        text: "$425K",
        color: "magenta",
        fontFamily: "Material Icons",
        fontSize: "16px",
        fontWeight: 'bold',         
      }
    },
    high: {
      label: {
        text: "$850K",
        color: "red",
        fontFamily: "Material Icons",
        fontSize: "16px",
        fontWeight: 'bold',         
      }
    },
  };


  const features = [
    {
      position: new google.maps.LatLng(-33.91721, 151.2263),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.91539, 151.2282),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.91747, 151.22912),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.9191, 151.22907),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.91725, 151.23011),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.91872, 151.23089),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.91784, 151.23094),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.91682, 151.23149),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.9179, 151.23463),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.91666, 151.23468),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.916988, 151.23364),
      textbox: "low",
    },
    {
      position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
      textbox: "middle",
    },
    {
      position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
      textbox: "middle",
    },
    {
      position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
      textbox: "middle",
    },
    {
      position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
      textbox: "middle",
    },
    {
      position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
      textbox: "middle",
    },
    {
      position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
      textbox: "middle",
    },
    {
      position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
      textbox: "middle",
    },
    {
      position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
      textbox: "high",
    },
  ];




  // Create markers.
  for (let i = 0; i < features.length; i++) {
    const marker = new google.maps.Marker({
      position: features[i].position,
      label: labels[features[i].textbox].label,
      map: map,
      optimized: false,
      visible: true,
      icon: markerIcon,


    });
  }
}


// Delete markers

// document.getElementById("Button1").addEventListener("load", deleteMarkers);
// function deleteMarkers() {
//   hideMarkers();
//   markers = [];
// }





// DatePicker Code

$(document).ready(function () {
    
  $("#dt1").datepicker({
      dateFormat: "dd-M-yy",
      changeYear:true,
      changeMonth:true,
      minDate: 0,
      onSelect: function (date) {
          var date2 = $('#dt1').datepicker('getDate');
          date2.setDate(date2.getDate() + 1);
          $('#dt2').datepicker('setDate', date2);
          //sets minDate to dt1 date + 1
          $('#dt2').datepicker('option', 'minDate', date2);
      }
  });
  $('#dt2').datepicker({
      dateFormat: "dd-M-yy",
      onClose: function () {
          var dt1 = $('#dt1').datepicker('getDate');
          var dt2 = $('#dt2').datepicker('getDate');
          //check to prevent a user from entering a date below date of dt1
          if (dt2 <= dt1) {
              var minDate = $('#dt2').datepicker('option', 'minDate');
              $('#dt2').datepicker('setDate', minDate);
          }
      }
  });
  });    


// Guest Value Increase

function increaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
  }
  
  function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('number').value = value;
  }




// Price Range Slider

$( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      step:100,
      values: [ 0, 500 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );


  //Get all data search 
  
  var nameValue = document.getElementById("dt1").value;
  console.log(nameValue)
  
    
    function showDiv() {
      var nameValue1 = document.getElementById("search_input").value;
      var nameValue2 = document.getElementById("dt1").value;
      var nameValue3 = document.getElementById("dt2").value;
      var nameValue4 = document.getElementById("number").value;
      var nameValue5 = document.getElementById("amount").value;
      document.getElementById("search").innerHTML=nameValue1;
      document.getElementById("search1").innerHTML=nameValue2;
      document.getElementById("search2").innerHTML=nameValue3;
      document.getElementById("search3").innerHTML=nameValue4;
      document.getElementById("search4").innerHTML=nameValue5;
      // console.log(nameValue1,nameValue2,nameValue3,nameValue4,nameValue5);
    }

    

    // show map function

// function showMap(){
//   var x = document.getElementById("map");
//   if (x.style.display === "none"){
//     x.style.display = "block";
//   } else{
//     x.style.display = "none";
//   }
// }


function showMap() {
  if (document.getElementById('Div1')) {

      if (document.getElementById('Div1').style.display == 'none') {
          document.getElementById('Div1').style.display = 'block';
          document.getElementById('map').style.display = 'none';
      }
      else {
          document.getElementById('Div1').style.display = 'none';
          document.getElementById('map').style.display = 'block';
      }
  }
}


function exchangeTemp() {
  if (document.getElementById('weather_c')) {

      if (document.getElementById('weather_c').style.display == 'none') {
          document.getElementById('weather_c').style.display = 'block';
          document.getElementById('weather_f').style.display = 'none';
      }
      else {
          document.getElementById('weather_c').style.display = 'none';
          document.getElementById('weather_f').style.display = 'block';
      }
  }
}


//   var showMap = $('#show-map');
//   var map = document.getElementById('show-map')

// function initialize() {
//     var mapOptions = {
// 	    center: { lat: 0, lng: 0 },
// 	    zoom: 8
// 	};
// 	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// }

// google.maps.event.addDomListener(showMap, 'click', initialize);
// google.maps.event.addDomListener(map, 'click', initialize);
// google.maps.event.addDomListener(window, 'load', initialize);
  
// $(document).ready(function(){
//     $('#show-map').on('click',initialize)
// });

// function initMap() {
//     const myLatlng = { lat: -25.363, lng: 131.044 };
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 4,
//       center: myLatlng,
//     });
//     const marker = new google.maps.Marker({
//       position: myLatlng,
//       map,
//       title: "Click to zoom",
//     });
  
//     map.addListener("center_changed", () => {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
//       window.setTimeout(() => {
//         map.panTo(marker.getPosition());
//       }, 3000);
//     });
//     marker.addListener("click", () => {
//       map.setZoom(8);
//       map.setCenter(marker.getPosition());
//     });
//   }



  