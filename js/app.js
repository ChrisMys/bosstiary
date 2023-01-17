jQuery(document).ready(function () {
  var boss_arr = [
    "Arthom The Hunter",
    "Barbaria",
    "Big Boss Trolliver",
    "Captain Jones",
    "Chizzoron the Distorter",
    "Countess Sorrow",
    "Cublarc the Plunderer",
    "Dharalion",
    "Diblis the Fair",
    "Dracola",
    "Dreadmaw",
    "Elvira Hammerthrust",
    "Ferumbras",
    "Flamecaller Zazrak",
    "Fleabringer",
    "Foreman Kneebiter",
    "Furyosa",
    "Gaz'haragoth",
    "General Murius",
    "Ghazbaran",
    "Grand Mother Foulscale",
    "Grandfather Tridian",
    "Gravelord Oshuran",
    "Groam",
    "Grorlam",
    "Hairman the Huge",
    "Hatebreeder",
    "High Templar Cobrass",
    "Hirintror",
    "Horestis",
    "Jesse the Wicked",
    "Man in the Cave",
    "Massacre",
    "Morgaroth",
    "Mornenion",
    "Morshabaal",
    "Mr. Punish",
    "Ocyakao",
    "Omarafir",
    "Oodok Witchmaster",
    "Orshabaal",
    "Robby the Reckless",
    "Rotworm Queens",
    "Rukor Zad",
    "Shlorg",
    "Sir Valorcrest",
    "Smuggler Baron Silvertoe",
    "The Abomination",
    "The Big Bad One",
    "The Blightfather",
    "The Evil Eye",
    "The Frog Prince",
    "The Hungerer",
    "The Imperor",
    "The Manhunter",
    "The Mean Masher",
    "The Old Whopper",
    "The Pale Count",
    "The Plasmother",
    "The Voice Of Ruin",
    "The Welter",
    "Tyrn",
    "Tzumrah the Dazzler",
    "Warlord Ruzad",
    "White Pale",
    "Willi Wasp",
    "Xenia",
    "Zarabustor",
    "Zevelon Duskbringer",
    "Zomba",
    "Zulazza the Corruptor",
    "Zushuka",
    "midnight panthers",
    "undead cavebears",
    "yetis",
  ];

  var world_arr = [
    "Adra",
    "Alumbra",
    "Antica",
    "Ardera",
    "Astera",
    "Axera",
    "Bastia",
    "Batabra",
    "Belobra",
    "Bombra",
    "Bona",
    "Cadebra",
    "Calmera",
    "Castela",
    "Celebra",
    "Celesta",
    "Collabra",
    "Damora",
    "Descubra",
    "Dibra",
    "Epoca",
    "Esmera",
    "Famosa",
    "Fera",
    "Ferobra",
    "Firmera",
    "Gentebra",
    "Gladera",
    "Harmonia",
    "Havera",
    "Honbra",
    "Illusera",
    "Impulsa",
    "Inabra",
    "Issobra",
    "Kalibra",
    "Kardera",
    "Karna",
    "Libertabra",
    "Lobera",
    "Luminera",
    "Lutabra",
    "Marbera",
    "Marcia",
    "Menera",
    "Monza",
    "Mudabra",
    "Mykera",
    "Nadora",
    "Nefera",
    "Nossobra",
    "Ocebra",
    "Olima",
    "Ombra",
    "Optera",
    "Ousabra",
    "Pacera",
    "Peloria",
    "Premia",
    "Quelibra",
    "Quintera",
    "Refugia",
    "Reinobra",
    "Seanera",
    "Secura",
    "Serdebra",
    "Solidera",
    "Suna",
    "Syrena",
    "Talera",
    "Tembra",
    "Thyria",
    "Trona",
    "Utobra",
    "Venebra",
    "Versa",
    "Visabra",
    "Vunira",
    "Wintera",
    "Wizera",
    "Xandebra",
    "Yonabra",
    "Zenobra",
    "Zuna",
    "Zunera",
  ];

  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  };

  const world = getUrlParameter("world");

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  function fetchAPI(url) {
    return $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
    });
  }

  if (world && world_arr.includes(world)) {
    fetchAPI("https://api.tibiadata.com/v3/killstatistics/" + world)
      .done(function (data) {
        $("#boss-list").append(
          "<h2>Bosses killed yesterday on " + world + "!</h2>"
        );
        $("#boss-list").append("<ul>");
        const mainList = data.killstatistics.entries;
        $(mainList).each(function (index) {
          if (
            boss_arr.includes(mainList[index].race) &&
            mainList[index].last_day_killed > 0
          ) {
            if (
              mainList[index].race == "midnight panthers" ||
              mainList[index].race == "yetis" ||
              mainList[index].race == "undead cavebears"
            ) {
              $("#boss-list ul").append(
                "<li><a href='https://tibia.fandom.com/wiki/" +
                  titleCase(mainList[index].race)
                    .replace(/ /g, "_")
                    .slice(0, -1) +
                  "' target='_blank'>" +
                  titleCase(mainList[index].race.slice(0, -1)) +
                  "</a></li>"
              );
            } else {
              $("#boss-list ul").append(
                "<li><a href='https://tibia.fandom.com/wiki/" +
                  mainList[index].race.replace(/ /g, "_") +
                  "' target='_blank'>" +
                  mainList[index].race +
                  "</a></li>"
              );
            }
          }
        });
        $("#boss-list").append("</ul></div>");
      })
      .fail(function (error) {
        console.log(error);
      });
  } else {
    $("#boss-list").append(
      "<div class='no-results'><h2>Please select a world!</h2></div>"
    );
  }

  // POPULATE THE SELECT LIST WITH ALL WORLDS IN WORLD ARRAY
  $(world_arr).each(function (index, value) {
    $("#world-select").append(
      "<option value='" + value + "'>" + value + "</option>"
    );
  });

  // WHEN WORLD IS SELECTED PAGE WILL REFRESH WITH THAT VALUE
  $("#world-select").change(function () {
    var url = "https://chrismys.github.io/bosstiary/?world=" + $(this).val();
    if (url) {
      window.location = url;
    }
  });

  // SET SELECT VALUE TO WORLD IN URL
  if (world) {
    $("#world-select").val(world);
  }

  // GET CURRENT YEAR
  var $today = new Date();
  $("#currentYear").text($today.getFullYear());
});
