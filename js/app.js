// Foundation.Abide.defaults.patterns['API-pattern'] = /^[0-9A-Za-z-\\.@:%_\+~#=]+$/;
$(document).foundation()
var x = $("#location_input");
var lat, lon, milesRadius, cusineChoice;
var apiKey = "";

function getLocation() {
  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {
      x.val(location.city + "," + location.state + "," + location.country_name);
      lat = location.latitude;
      lon = location.longitude;
    }
  });
}
function alertCall(textAlert) {
  $("#alertText").text(textAlert);
  $('#alertModal').foundation('open');
}

$('#modalForm').submit(function (event) {
  event.preventDefault();
  // validate input before 
  var textinput = $("#modal_input").val();
  if (textinput != "") {
    $('#inputModal').foundation('close');
    apiKey=textinput;
  }
});


// class FancyPrompt {
//   constructor(a) {
//     this.textforTop = a;
//   }
//   // method
//    theValue() {
//     $("#alertText1").text(this.textforTop);
//     var textinput;
//     var finishCheck = false;
//     popup.open();
//     $('#modalForm').submit(function (event) {
//       event.preventDefault();
//       // validate input before 
//       var textinput = $("#modal_input").val();
//       if (textinput != "") {
//         finishCheck = true;
//         popup.close;
//         return;
//       }
//     });
//     while(!finishCheck){
//       new Promise(resolve => setTimeout(resolve, 500));
//     }
//     return textinput
//   }
// }



function inputdata(textAlert) {
  $("#alertText1").text(textAlert);
  $('#inputModal').foundation('open');
}
function restaurantSearch() {
  $.ajax({
    //     https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${milesRadius * 1600}&type=restaurant&keyword=${cusineChoice}&key=${apiKey}`,
    method: "GET",
    success: function (data) {
      console.log(data)
    }
  });

  // contentType: "application/json",
  // }).then(function (response) {
  //   console.log(response)
  // });



  // method: "GET",
  // headers: {"Access-Control-Allow-Origin": "*"}
  // }).then(function (response) {
  // console.log(response)
  // }).catch(function (error) {
  // if error use default

  // alertCall("ERRRoRRR! #"+error.status)
  // });

}






var restaurants = {
  "html_attributions": [],
  "next_page_token": "CrQCKAEAAHQmsqYU_GLkNe7PaoNVZ0S5mbKLxfA8zjut8BYM_RK-AZxoqWINBwNiHM9vHO3AZGziZwGoMH__hZmith90P5RtLAiP2ssTpjuA8rzAcNWjurwIms0luKQX497Nah70mNpI1OLo8I_bokEJ--qA54FAbCIAEg_S-FejAYGBfWEtvsnN4kLGLoCnK0tgUCsDblwXAI_sK72UkHtfvMhZXJV-Z00dB9rPz7CgVXRRrGUWBHpYRILu18YyAPd3ttkgK_Fz2d_pSLL7FyRPFF7y91Mvcv_lJvPf3hkb1sqrDWyuPA2y8ZolWksMXWj8r1BXRyt7ZT3hfYG_RbLy8RiC-gwuNfoEftSZ6QGEw-JB9MgyqMoGWr2V_rqqLXBrvAb1UTFxkDdIQY3bGzCaHDcOq9ASEADrLiPmrfQ415N6Pak8Z50aFKxzSvrE2FWs9-IjUH0o4vId3voP",
  "results": [
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.86296,
          "lng": -73.9863927
        },
        "viewport": {
          "northeast": {
            "lat": 40.86441562989273,
            "lng": -73.98503427010726
          },
          "southwest": {
            "lat": 40.86171597010728,
            "lng": -73.98773392989271
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "e3c383d7e79cff0e5739506a7c7d249a0894f7cd",
      "name": "Dante's Italian Restaurant, Private Parties and Catering",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 3024,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/116098390929358609048\">손다솜</a>"
          ],
          "photo_reference": "CmRaAAAAQHK0RA0FPUXn-8DMLkwnqsiqh4Hag0TchuPKZdj6U-eksXv1WyNVQrfgF5rdFDH-SeAnPwdt7LX5oglgDZb1GNeM4DBdy5mtV2yyjgTIwqfepEykKpsLxSGoIUTaYVb2EhCrcjpKqDf8TboiKiDnQUYbGhQekJ6NcxOuWX-AVMhXThi0RKCGxA",
          "width": 4032
        }
      ],
      "place_id": "ChIJJWf8OCb3wokRhDdMt3xxqto",
      "plus_code": {
        "compound_code": "V277+5C Leonia, New Jersey",
        "global_code": "87G8V277+5C"
      },
      "price_level": 2,
      "rating": 4.6,
      "reference": "ChIJJWf8OCb3wokRhDdMt3xxqto",
      "scope": "GOOGLE",
      "types": [
        "meal_delivery",
        "restaurant",
        "food",
        "point_of_interest",
        "store",
        "establishment"
      ],
      "user_ratings_total": 265,
      "vicinity": "373 Broad Ave, Leonia"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8657061,
          "lng": -73.9600603
        },
        "viewport": {
          "northeast": {
            "lat": 40.86702867989272,
            "lng": -73.95873707010728
          },
          "southwest": {
            "lat": 40.86432902010728,
            "lng": -73.96143672989271
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "3c06dc2200fd4e1751847e2aaca7275484138d3a",
      "name": "Cafe Italiano",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 266,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/116811271308174437177\">Cafe Italiano</a>"
          ],
          "photo_reference": "CmRaAAAAYKz_dmeSiXRsYn04fj100vGqkredFic6N8-mHQ-4gq2a0Y4o78e98W-jbXMOy-pv-0HP3ZCil9_tSmFC_3CWbuX_EVBbXNrq-T7IcptYTKmz833Cv7MOnWCZqCStJkrgEhAeSY2HaB1_VEVPdEP36sQzGhQL19AGyicx5b_B8iPom1YlYqtZzw",
          "width": 394
        }
      ],
      "place_id": "ChIJxcr5A8r2wokR_ld67fvaFmY",
      "plus_code": {
        "compound_code": "V28Q+7X Englewood Cliffs, New Jersey",
        "global_code": "87G8V28Q+7X"
      },
      "price_level": 2,
      "rating": 4.4,
      "reference": "ChIJxcr5A8r2wokR_ld67fvaFmY",
      "scope": "GOOGLE",
      "types": [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 144,
      "vicinity": "14 Sylvan Ave, Englewood Cliffs"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8613923,
          "lng": -73.9702856
        },
        "viewport": {
          "northeast": {
            "lat": 40.86265272989272,
            "lng": -73.96886912010727
          },
          "southwest": {
            "lat": 40.85995307010727,
            "lng": -73.97156877989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "6b929037e426cd5662b724df937bc111d77384b9",
      "name": "Linwood Pizza",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 4032,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/100787593839602953948\">A Google User</a>"
          ],
          "photo_reference": "CmRaAAAAyXiuleWbbo0cKWrC-IXaWojUTw5fQbq9pRGOg6cntJzPkClwhhV71JB_Ubhd8NekasNIrQxrw-Gn0QOEOg2qb1MVzNC-oMZDx42XmZhmSKs0WGqgkU-rGFKlrRPiCbpuEhBHQR7yMIOJfCJxwMf0mjaRGhR9EcVJcz19q_Hn96PxSEU9DV_tsg",
          "width": 3024
        }
      ],
      "place_id": "ChIJNQzkAND2wokRcFlPkTCJTzc",
      "plus_code": {
        "compound_code": "V26H+HV Fort Lee, New Jersey",
        "global_code": "87G8V26H+HV"
      },
      "price_level": 2,
      "rating": 4.2,
      "reference": "ChIJNQzkAND2wokRcFlPkTCJTzc",
      "scope": "GOOGLE",
      "types": [
        "meal_delivery",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 189,
      "vicinity": "140 Linwood Dr, Fort Lee"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.850578,
          "lng": -73.966352
        },
        "viewport": {
          "northeast": {
            "lat": 40.85201247989271,
            "lng": -73.96498807010728
          },
          "southwest": {
            "lat": 40.84931282010727,
            "lng": -73.96768772989273
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "198d0a70ae1e61e3bc7daa6d7486cf026206c732",
      "name": "In Napoli",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 4160,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/104977196497510062656\">Ιωάννης Κιλουκιώτης</a>"
          ],
          "photo_reference": "CmRaAAAASSNan2lCakRJnjBXhdZlwhWL0y7hmzo9PsraUb70KQ3HFQKeO3sbbqkvCP9OjA1HNoxEK_bA2bJQrWLxA69DY-IgUjsBbsFwuvV9rTq8YXcMiiH8Ju7JZ-npAE2DWkvyEhCe25dzWwsF8wpx6-Kei1mfGhRcaXamDpbihUxTYizR6ctFdAYk4Q",
          "width": 3120
        }
      ],
      "place_id": "ChIJX2b37un2wokRk9-VIEiRpv8",
      "plus_code": {
        "compound_code": "V22M+6F Fort Lee, New Jersey",
        "global_code": "87G8V22M+6F"
      },
      "price_level": 2,
      "rating": 4.3,
      "reference": "ChIJX2b37un2wokRk9-VIEiRpv8",
      "scope": "GOOGLE",
      "types": [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 415,
      "vicinity": "116 Main St, Fort Lee"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.852733,
          "lng": -73.986098
        },
        "viewport": {
          "northeast": {
            "lat": 40.85431537989272,
            "lng": -73.98445332010728
          },
          "southwest": {
            "lat": 40.85161572010728,
            "lng": -73.98715297989271
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "e419c21c7aba7040d1fffd7cbcb7ae0995fcd9fc",
      "name": "Franco's Metro Restaurant, Bar, Pizza",
      "photos": [
        {
          "height": 2448,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/113505759360585011412\">Gabriel Wehrle</a>"
          ],
          "photo_reference": "CmRaAAAA6WfxL8rFK8WBFLdJ-yzaLC7akOB8f95gRbOEVi4pAN-wE7FmpM6UVD8-OL7PiMHv0UPQS3Nf6vOLgu_0qdT1VXgTs4AXk04sCCLGHXvcnFPPpAqKi1hOkVMo3aXPh8oKEhDr2J-ioaTKJKAmfVIOZwOxGhQ2rMkFPTFbkIjmY8QB0UTs-99P0A",
          "width": 3264
        }
      ],
      "place_id": "ChIJWT8fuh_3wokRQjDGuJ9qVdo",
      "plus_code": {
        "compound_code": "V237+3H Fort Lee, New Jersey",
        "global_code": "87G8V237+3H"
      },
      "price_level": 2,
      "rating": 4.4,
      "reference": "ChIJWT8fuh_3wokRQjDGuJ9qVdo",
      "scope": "GOOGLE",
      "types": [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 399,
      "vicinity": "1475 Bergen Blvd, Fort Lee"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8656791,
          "lng": -73.9600659
        },
        "viewport": {
          "northeast": {
            "lat": 40.86701927989272,
            "lng": -73.95872557010728
          },
          "southwest": {
            "lat": 40.86431962010727,
            "lng": -73.96142522989273
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "4104f44eb17d7048a2e21c02cd5f758177377712",
      "name": "Gianni D's",
      "opening_hours": {
        "open_now": true
      },
      "place_id": "ChIJb8kOG8r2wokRRPHpMhvdzRc",
      "plus_code": {
        "compound_code": "V28Q+7X Englewood Cliffs, New Jersey",
        "global_code": "87G8V28Q+7X"
      },
      "rating": 3,
      "reference": "ChIJb8kOG8r2wokRRPHpMhvdzRc",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 2,
      "vicinity": "14 Sylvan Ave, Englewood Cliffs"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8618028,
          "lng": -73.9883667
        },
        "viewport": {
          "northeast": {
            "lat": 40.86305132989271,
            "lng": -73.98684702010728
          },
          "southwest": {
            "lat": 40.86035167010727,
            "lng": -73.98954667989273
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "3e157c7f909320bed427cae0446a357ebcf901c8",
      "name": "Fontana Tritone",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 3024,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/109919892758874909230\">Sangyoub Lee</a>"
          ],
          "photo_reference": "CmRaAAAApoPS9yk_F4LCAet8NDNAGtHVNj764GGX7o8CSaH7kcv_2LWLf-z1kfE0XIp1DCDlPwLyUD-WhdohloQQ6yUAwytzc2rp5nzQGmgVkhLv1MH2GjUIBfjG-ohPSIAycB6VEhBMiT-c6P8V_67wpguFdREJGhT8BYOlL8ItYUJaGiZkR0Hg9uoKCg",
          "width": 4032
        }
      ],
      "place_id": "ChIJ3YnhfSb3wokRJYKdgd0K1Tk",
      "plus_code": {
        "compound_code": "V266+PM Leonia, New Jersey",
        "global_code": "87G8V266+PM"
      },
      "price_level": 2,
      "rating": 4.5,
      "reference": "ChIJ3YnhfSb3wokRJYKdgd0K1Tk",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 180,
      "vicinity": "248 Fort Lee Rd, Leonia"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8514028,
          "lng": -73.9395667
        },
        "viewport": {
          "northeast": {
            "lat": 40.85269297989272,
            "lng": -73.93823937010728
          },
          "southwest": {
            "lat": 40.84999332010727,
            "lng": -73.94093902989273
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "a08a4b692fdc26d6f99b834c671e226758acefb0",
      "name": "Saggio",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 4032,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/118384721747879528082\">Mark Kabbash</a>"
          ],
          "photo_reference": "CmRaAAAAclkCM_GQHG_7QVxQXram_7SUuSwt3Bm1YUGumTe7oPAhBO3KmhC69l1IKfFoLNI5JoWb6G-99o8rIGYbKdwj2yunvPw32kToGxNgoDkGGiS4jkqhXmzatdM528YulGXIEhCvt2uG35-mVUSzSe-FZI7gGhSm5auv-Cio3oeCNhb-ypUh_Gczng",
          "width": 3024
        }
      ],
      "place_id": "ChIJEc6ZPKH2wokRZyyIzHgixT4",
      "plus_code": {
        "compound_code": "V326+H5 New York",
        "global_code": "87G8V326+H5"
      },
      "price_level": 2,
      "rating": 4.4,
      "reference": "ChIJEc6ZPKH2wokRZyyIzHgixT4",
      "scope": "GOOGLE",
      "types": [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 462,
      "vicinity": "827 W 181st St, New York"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8637226,
          "lng": -74.0347127
        },
        "viewport": {
          "northeast": {
            "lat": 40.86500437989272,
            "lng": -74.03348247010729
          },
          "southwest": {
            "lat": 40.86230472010728,
            "lng": -74.03618212989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "dc0f58c1698d572075bc76e83925b048ddce20b0",
      "name": "Taste of Tuscany - Hackensack NJ",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 960,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/100506469551827275588\">Taste of Tuscany Restaurant</a>"
          ],
          "photo_reference": "CmRaAAAALqUmoTRjyMrbvqNzPwkAQIEP4bYq7U4NIrEjQzDx0akLU_yjBAFbNbdXxYALUNrCbcE1pidtjcXtsDgUT2noGYvBn6sTjb4eL0Kb1gBZfRumxZCDBhtwA7zfCdbjY5cCEhCuC6FyVRemGX07fb5X6mTsGhR6W61CLiuLAJ8CRJHFYaVbhofs9Q",
          "width": 1280
        }
      ],
      "place_id": "ChIJK5KDJ-H5wokRnFatRTH0lMM",
      "plus_code": {
        "compound_code": "VX78+F4 Hackensack, New Jersey",
        "global_code": "87G7VX78+F4"
      },
      "price_level": 2,
      "rating": 4.5,
      "reference": "ChIJK5KDJ-H5wokRnFatRTH0lMM",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 212,
      "vicinity": "500 S River St, Hackensack"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.87950379999999,
          "lng": -73.95198610000001
        },
        "viewport": {
          "northeast": {
            "lat": 40.88081507989271,
            "lng": -73.95047127010729
          },
          "southwest": {
            "lat": 40.87811542010727,
            "lng": -73.95317092989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "c57ecda897acf56eb719e840ed5e5ccd3dbf4c6a",
      "name": "Grissini Restaurant",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 1440,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/105021907329264938517\">A Google User</a>"
          ],
          "photo_reference": "CmRaAAAANN316H7xDpgKH5J531KZSKVNapGEEa5eglS1mE5W8aPLSv4gkWDYjhu73yCNzlJiXZ9jmsVd2pwJvvbVHPxMDRu_C3NUV1Og9aMeLh3s9_LcN1Bhj5Jc8yGGd__5gaEKEhCe5_bbDDgk59ZPhSsjnLSfGhRff2T0C0HI8hx9KHeslQ_B7_Mr_Q",
          "width": 1800
        }
      ],
      "place_id": "ChIJc9kGjEXxwokRKPYG4N6RDeg",
      "plus_code": {
        "compound_code": "V2HX+R6 Englewood Cliffs, New Jersey",
        "global_code": "87G8V2HX+R6"
      },
      "price_level": 4,
      "rating": 4.3,
      "reference": "ChIJc9kGjEXxwokRKPYG4N6RDeg",
      "scope": "GOOGLE",
      "types": [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "store",
        "establishment"
      ],
      "user_ratings_total": 252,
      "vicinity": "484 Sylvan Ave, Englewood Cliffs"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.7910963,
          "lng": -73.9739914
        },
        "viewport": {
          "northeast": {
            "lat": 40.79249757989273,
            "lng": -73.97275087010728
          },
          "southwest": {
            "lat": 40.78979792010729,
            "lng": -73.97545052989273
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "bfc821af8d51506f1a4e19971f85448311eeeb5f",
      "name": "Carmine’s Italian Restaurant- Upper West Side",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 3840,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/107865230841081828267\">Carmine&#39;s</a>"
          ],
          "photo_reference": "CmRaAAAALAmGIF2ckhjQRrvh0E-2ipJnaFz6xLRjsLPxlci-w1nFC6cyCIEnDOt30ernKxuuazwfQkXPVkp-KUsigoN6n93ZEQI34bUvWukvVRGIjYq1FrT2CN17L2Pv4GWD92jpEhAGxZctRwk10N30Aq1K3CGqGhShql1d0eCT_bvk8mahrDOXfKntvQ",
          "width": 5760
        }
      ],
      "place_id": "ChIJrXva_oJYwokROtv_EdGJgH0",
      "plus_code": {
        "compound_code": "Q2RG+CC New York",
        "global_code": "87G8Q2RG+CC"
      },
      "price_level": 2,
      "rating": 4.4,
      "reference": "ChIJrXva_oJYwokROtv_EdGJgH0",
      "scope": "GOOGLE",
      "types": [
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 3815,
      "vicinity": "2450 Broadway, New York"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8893139,
          "lng": -73.97616839999999
        },
        "viewport": {
          "northeast": {
            "lat": 40.89062742989272,
            "lng": -73.97468622010729
          },
          "southwest": {
            "lat": 40.88792777010728,
            "lng": -73.97738587989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "ce69332d9d293e9275cb787cbfcf0e9a5a5ce45d",
      "name": "Trattoria Carpaccio",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 2448,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/112452752797416744769\">Elvis Jadrijev</a>"
          ],
          "photo_reference": "CmRaAAAAPcTMbcZlaqTzL-t9LWs9gTN5YZvkqJ57d3TO1jsbvB4OpyKFn_pH9MvVOLqxxvUq1Aln4AMnP3AR6hmHXOL-UNS37Ora8Z2aE3nH1hWnJ3mMpvFkiKl2Ow9mVWW81gP5EhBUDlO21KajwojfSHTrTpATGhQcUGyFvDQyXHtQ8xYyTRPAFY7oFg",
          "width": 3264
        }
      ],
      "place_id": "ChIJ8TywzyPxwokRYJVyDa0vj38",
      "plus_code": {
        "compound_code": "V2QF+PG Englewood, New Jersey",
        "global_code": "87G8V2QF+PG"
      },
      "rating": 4.1,
      "reference": "ChIJ8TywzyPxwokRYJVyDa0vj38",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 65,
      "vicinity": "120 Grand Ave, Englewood"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8691472,
          "lng": -74.03163889999999
        },
        "viewport": {
          "northeast": {
            "lat": 40.87064252989272,
            "lng": -74.03032687010727
          },
          "southwest": {
            "lat": 40.86794287010728,
            "lng": -74.03302652989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "c228c3057643d890a807d6b2cebce09e177fc93b",
      "name": "Luka's Italian Cuisine",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 1080,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/103100728242416297472\">A Google User</a>"
          ],
          "photo_reference": "CmRaAAAAxJUvVRURf1gK21xAIIsf1B9ujZ0mYX3jLnf59jJHALe4N2uitKy2CaxatUD5TpHykMMmYVDpZCQHGXOgAp7--Aixg70EI7fgKmm78y_Nbr1o1BCHgmGd3OpSoXCFDmt8EhCWwHAZU6UdKUWvYgKdBlhHGhRzMyz8Ei0i8X3xX1qX1wVPg_oodw",
          "width": 1920
        }
      ],
      "place_id": "ChIJQ4CmyGD3wokRjFN3GFsdc00",
      "plus_code": {
        "compound_code": "VX99+M8 Bogota, New Jersey",
        "global_code": "87G7VX99+M8"
      },
      "price_level": 2,
      "rating": 4.5,
      "reference": "ChIJQ4CmyGD3wokRjFN3GFsdc00",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "store",
        "establishment"
      ],
      "user_ratings_total": 356,
      "vicinity": "10 River Rd, Bogota"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8394079,
          "lng": -73.9818293
        },
        "viewport": {
          "northeast": {
            "lat": 40.84072517989272,
            "lng": -73.98037827010728
          },
          "southwest": {
            "lat": 40.83802552010728,
            "lng": -73.98307792989273
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "139967d899061be40b690faf2da7a9d645679fd3",
      "name": "The Big Red Tomato",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 3036,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/112018754381169041209\">Alex Shaba</a>"
          ],
          "photo_reference": "CmRaAAAAJ_aSG1lIsiOxi9fk0LSrZ-K67d4MIyOvtUrjrFco5frmVf9IV5oZ6UoJR5ywhhz8Fgd1Tp49o-EP8UUeMbC_XOLlfBJnkumbqwnLN-rouBjUqDaKmhSTG0mIHDGKvLHDEhB7KFLD96cHkRXcUxH-8Bf8GhQratbp9kfQKgZ76llyD5_-irNPhA",
          "width": 4048
        }
      ],
      "place_id": "ChIJN_rB5_32wokRnnX7XpTzCuY",
      "plus_code": {
        "compound_code": "R2Q9+Q7 Fort Lee, New Jersey",
        "global_code": "87G8R2Q9+Q7"
      },
      "price_level": 2,
      "rating": 4.3,
      "reference": "ChIJN_rB5_32wokRnnX7XpTzCuY",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 285,
      "vicinity": "1205 Anderson Ave, Fort Lee"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.88502,
          "lng": -74.00902300000001
        },
        "viewport": {
          "northeast": {
            "lat": 40.88629737989272,
            "lng": -74.00771282010729
          },
          "southwest": {
            "lat": 40.88359772010728,
            "lng": -74.01041247989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "db1aca0f58bbcca82bc48097d1426e5858967d0d",
      "name": "Amarone Ristorante",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 3024,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/116868770950112025360\">PL Wallach</a>"
          ],
          "photo_reference": "CmRaAAAAcTSoZPS1BFbuCWvcFZ2uEj7nKIJOQZOmIQMP2d3GNxwtXiTpp-VPsC4-MPoUm4s3VPrLrWYpq-LU-17xfZItpvORLk2LhSvUTAMHk9PnpcTIjj3JC5aQytd9SyMPERRJEhAK9SXSNMB2MZfJQg4ZdMCNGhRGohFkfp85CxeKyJ7rJF93V4CqYw",
          "width": 4032
        }
      ],
      "place_id": "ChIJkbv-q7fwwokRSW7mygRq320",
      "plus_code": {
        "compound_code": "VXPR+29 Teaneck, New Jersey",
        "global_code": "87G7VXPR+29"
      },
      "price_level": 2,
      "rating": 4.6,
      "reference": "ChIJkbv-q7fwwokRSW7mygRq320",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 308,
      "vicinity": "63 Cedar Ln, Teaneck"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8141746,
          "lng": -73.9603204
        },
        "viewport": {
          "northeast": {
            "lat": 40.81545252989272,
            "lng": -73.95893337010727
          },
          "southwest": {
            "lat": 40.81275287010728,
            "lng": -73.96163302989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "206d5c40ef01ed75bc409566767830dd73a741d4",
      "name": "Pisticci",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 1360,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/104111246635874032234\">ZAGAT</a>"
          ],
          "photo_reference": "CmRaAAAAzX6pZSN50sl_YCLlEPaW7uGzLr3DXdszhwI_4td_HJnUXl-q5oL1FBRTKeYWiaK_WZxtkrYTgF7nFc1q1FVAQtw9_HFn1g5EzmcbP9FMi_RlB-kcSWI4uX2b6lrEh0KMEhC-QuBkaErwMCUmILXienNwGhRRsC1Rs5bZfTTfdfCrBHNaywbqYw",
          "width": 2048
        }
      ],
      "place_id": "ChIJxXmxz0H2wokRwYJIJ7aBB3s",
      "plus_code": {
        "compound_code": "R27Q+MV New York",
        "global_code": "87G8R27Q+MV"
      },
      "price_level": 2,
      "rating": 4.5,
      "reference": "ChIJxXmxz0H2wokRwYJIJ7aBB3s",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 882,
      "vicinity": "125 La Salle St, New York"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8194431,
          "lng": -73.92722049999999
        },
        "viewport": {
          "northeast": {
            "lat": 40.82076327989272,
            "lng": -73.92576047010728
          },
          "southwest": {
            "lat": 40.81806362010727,
            "lng": -73.92846012989271
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "f43a017115b829d445f2688db097edb6ab3beed4",
      "name": "Giovanni's",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 4032,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/114109764050527895231\">A Google User</a>"
          ],
          "photo_reference": "CmRaAAAAn01fgvIQknKzJaH2VBouWRm0bKZPXRsLxSjWqbPkt6kkLlKWSY6t0M1iW5_8EITV1BdHSHuQNuZE3JJqClnF1t509dOziF5dTHRk3FoOgBALZgBsxMOTZooYOLUnobIIEhDjNIQQ_cmcTzlQgmuemacKGhQjZbg7QwO4oBrnGCdMMh7UzL3JMQ",
          "width": 3024
        }
      ],
      "place_id": "ChIJZdK7p9H1wokRXtG1oueAShI",
      "plus_code": {
        "compound_code": "R39F+Q4 The Bronx, New York",
        "global_code": "87G8R39F+Q4"
      },
      "price_level": 2,
      "rating": 3.9,
      "reference": "ChIJZdK7p9H1wokRXtG1oueAShI",
      "scope": "GOOGLE",
      "types": [
        "meal_delivery",
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 1246,
      "vicinity": "579 Grand Concourse, The Bronx"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.830224,
          "lng": -73.94732900000001
        },
        "viewport": {
          "northeast": {
            "lat": 40.83161247989273,
            "lng": -73.94607587010728
          },
          "southwest": {
            "lat": 40.82891282010728,
            "lng": -73.94877552989273
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "b11a8d5ca838bcd657cb31bf7b1807d2e2d8cb91",
      "name": "Bono Trattoria",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 3024,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/106470887536625347419\">Cecilia Sanna</a>"
          ],
          "photo_reference": "CmRaAAAAyieWXyH7GyNMcQcgdNYDUIxrzEfiK0XepUev97a4XHgKYSRtv4QEfR9X8vkTjxbfV_Vai-j5DhTvsUo9RzyhmFaTHnkHCuV4F4NtLMxRYTayhURL2frjGrjeY0jTuzFnEhDJkg9EOc5MlXNtaWltlxLKGhRBgClDLIPpl5V5kYFESJ7ifFFWpA",
          "width": 4032
        }
      ],
      "place_id": "ChIJNbJQ54f2wokRPxHl6aTGio0",
      "plus_code": {
        "compound_code": "R3J3+33 New York",
        "global_code": "87G8R3J3+33"
      },
      "price_level": 2,
      "rating": 4.6,
      "reference": "ChIJNbJQ54f2wokRPxHl6aTGio0",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 557,
      "vicinity": "3658 Broadway, New York"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.9095429,
          "lng": -74.03865449999999
        },
        "viewport": {
          "northeast": {
            "lat": 40.91082907989271,
            "lng": -74.03718842010728
          },
          "southwest": {
            "lat": 40.90812942010727,
            "lng": -74.03988807989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "42b3bb1698e42d4134d3a5644ca5b5d4037d66a5",
      "name": "Rugova",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 2322,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/106313722775409949677\">A Google User</a>"
          ],
          "photo_reference": "CmRaAAAANdosfQqaAgkW-F2R7-drxHulQsZGRiD06ox2CIKUjWgp7935CU9uJdo9LoCjZdRIWhmO69U7gRcPH0L68NbMlZ-zBEjgcYSyxvYjKL_iGcgL4nouIYhhQMct9PK28-D4EhCeEU6iLwDwykJkGLUfQtOVGhQEkmuH3pMVf0OCBfOtDA4P6_PqjA",
          "width": 4128
        }
      ],
      "place_id": "ChIJf6a19XD6wokRhnPlBQU_z8U",
      "plus_code": {
        "compound_code": "WX56+RG River Edge, New Jersey",
        "global_code": "87G7WX56+RG"
      },
      "rating": 4.4,
      "reference": "ChIJf6a19XD6wokRhnPlBQU_z8U",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 118,
      "vicinity": "259 Johnson Ave, River Edge"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 40.8541412,
          "lng": -73.8865738
        },
        "viewport": {
          "northeast": {
            "lat": 40.85545207989271,
            "lng": -73.88517022010728
          },
          "southwest": {
            "lat": 40.85275242010727,
            "lng": -73.88786987989272
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "491e86b410b34e5ab41b8a25dfd48d7a4a761189",
      "name": "Antonio's Trattoria",
      "opening_hours": {
        "open_now": true
      },
      "photos": [
        {
          "height": 3024,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/116613939031633613678\">Nolan Chen</a>"
          ],
          "photo_reference": "CmRaAAAAs1E7Jr4Ufx1ot_J4eDsOJi2zAogzTefBK--8g_hSb5-W6JVD8_GSsuVAKhaZa0fysSTKXZGP_lQlE8PyboDtPmIlW4hkJzjTqanuXrcXBhkJFq6hzTMoGejkwHDW9baNEhAWcz1JHXGx1WdJUEE_FuztGhQM1cKCVb0oClmoo2ZuT8Vn4-EIUQ",
          "width": 4032
        }
      ],
      "place_id": "ChIJi0UhO4f0wokR_jzG9KlaPQA",
      "plus_code": {
        "compound_code": "V437+M9 The Bronx, New York",
        "global_code": "87G8V437+M9"
      },
      "price_level": 2,
      "rating": 4.7,
      "reference": "ChIJi0UhO4f0wokR_jzG9KlaPQA",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 885,
      "vicinity": "2370 Belmont Ave, The Bronx"
    }
  ],
  "status": "OK"
}

for(var i = 0; i < restaurants.results.length; i++){
  console.log(restaurants.results[i]);
  var restaurantlocation = restaurants.results[i].vicinity;
  var restaurantRating = restaurants.results[i].rating;
  var restaurantName = restaurants.results[i].name;

  // restaurantIcon needs to be changed
  if(restaurants.results['photos']){
  var restaurantIcon = restaurants.results[i].photos.photo_reference;
  var cardImage = $(`<img src='${restaurantIcon}' alt='restaurant Icon'>`);
  }
  else{
    var cardImage = $(`<img src='' alt='restaurant Icon'>`);
  }

  if(restaurants.results[i]['opening_hours']){
    if(restaurants.results[i].opening_hours['open_now']){
      var openConfirm = $(`<p style='color: green;'>Open Now</p>`);
    }
  }
  else{
    var openConfirm = $(`<p style='color: red;'>Closed</p>`);
  }

  var restaurantCell = $("<div class='cell'>")
  var restaurantCard = $("<div class='card'>");
  var cardHeader = $(`<div class='card-divider'>${restaurantName}</div>`);
  var cardTextSection = $(`<div class='card-section'>`);
  var cardSectionHeader = $(`<h4>Restaurant Info:</h4>`);
  var cardSectionRating = $(`<p>Rating: ${restaurantRating}</p>`);
  var cardSectionlocation = $(`<p>Location: ${restaurantlocation}</p>`);

  
  $(restaurantCard).append(cardHeader);
  $(restaurantCard).append(cardImage);
  $(restaurantCard).append(cardTextSection);
  $(cardTextSection).append(cardSectionRating);
  $(cardTextSection).append(cardSectionlocation);
  $(cardTextSection).append(openConfirm);
  $(restaurantCell).append(restaurantCard);
  $("#restaurantList").append(restaurantCell);
}

$('#restaurantForm').submit(function (event) {
  event.preventDefault();
  // validate input before proceed
  var textLocation = $("#location_input").val();
  cusineChoice = $("#cusineChoice").val();
  milesRadius = $("#milesRadius").val();
  var dishesChoice = $("#dishesChoice").val();
  if (!lat) {
    getLocation();
  }
  if (!milesRadius) {
    alertCall("Please enter radious of search");
    return;
  };
  if ((!dishesChoice) && (!cusineChoice)) {
    alertCall("Please enter something! I have no idea what you like to eat");
    return;
  }
  // restaurantSearch();
  alertCall("pass!");
  console.log(restaurants);
});

inputdata("Please input your API key");
