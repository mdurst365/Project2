
/* -------------------------------------------- */
/* -------- SCRIPTS FOR LOGIN.HANDLEBARS ------ */
/* -------------------------------------------- */

// nav scripts -- changing content and active tab color

  function openOption(tabs) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(tabs).style.display = "block";
  }

  $(".bar-item").on("click", function(e) {

    document.querySelectorAll(".bar-item").forEach(function(element) {
        element.classList.remove("activeTab");
    });

      e.currentTarget.classList += " activeTab";

  });

  // handle posting to the login route, grabbing info from inputs

  $("#login-form").on("submit", e => {

      e.preventDefault();

      var user = document.getElementById("loginUser").value;
      console.log(user);
      var password = document.getElementById("loginPassword").value;
      console.log(password);

      var userData = {
        name: user,
        password: password
      }

      $.ajax("/api/login", {

          type: "POST",

          data: userData,

          success: function(req, err) { console.log("A user has been logged in!"); },

          error: function(req, err) { console.log("A user failed to log in with: " + err); }

        }).then(() => {

          // need to make some call to change to render the /index file here

      });

  })

  // handle posting to the register route, grabbing info from inputs

  $("#register-form").on("submit", e => {

      e.preventDefault();

      var user = document.getElementById("registerUser").value;
      console.log(user);
      var password = document.getElementById("registerPassword").value;
      console.log(password);
      var teamName = document.getElementById("registerTeamName").value;
      console.log(teamName);

      var userData = {
        name: user,
        password: password,
        teamName: teamName
      }

      $.ajax("/api/signup", {

          type: "POST",

          data: userData,

          success: function(req, err) { console.log("A user has been registered!"); },

          error: function(req, err) { console.log("A user failed to register with: " + err); }

        }).then(() => {

          // need to make some call to switch back to log in and make the user log in

      });

  })

/* -------------------------------------------- */
/* -------- SCRIPTS FOR INDEX.HANDLEBARS ------ */
/* -------------------------------------------- */


// immediately invoked functions to position players once they are pulled from api

$(document).ready(function() {
      updatePlayers();
      positionPlayers();
    });


  // may not be necessary to "get" api route of players if they will render via handlebars calls

  var updatePlayers = function() {

    // this inserts position names on all the position spaces -- unsure if necessary

      // var positionLists = document.querySelectorAll(".container");

      // for (i=0; i<positionLists.length; i++) {

      //   if (positionLists[i].childElementCount == 0) {

      //     var positionName = positionLists[i].getAttribute("data-position");

      //     positionLists[i].textContent = positionName;
      //   }
      // }

        $.ajax("/api/players", {

          type: "GET",

          success: function (data) { console.log("here is your data: " + data); } ,

          error: function(err) { console.log("error:" + err); }

          }).then(() => {

          // location.reload();

          console.log("you made it to the end of this GET request!");

        });

    }

    /* when all of the players from api render into benched, this function 
    places them into their correct position based on data-position attribute */

    var positionPlayers = function() {

      var initialJoin = document.getElementById("benched");

      var players = initialJoin.querySelectorAll("li");

      for (i=0; i<players.length; i++) {

              var position = players[i].getAttribute("data-position");

              var positionOptions = document.querySelectorAll(".container");

              for (p=0; p<positionOptions.length; p++) {

                  if (positionOptions[p].getAttribute("data-position") == position && positionOptions[p].childElementCount == 0) {

                      positionOptions[p].append(players[i]);
                  }

            }
        }
    }


    // handles form submission of the "add player" form and it's ajax call

    $(".addPlayerForm").on("submit", event => {

      event.preventDefault();

      var playerLimit = document.querySelectorAll(".container li, .container-benched li");

      if (playerLimit.length >= 11) {

        alert("You already have the maximum amount of players! Please delete a player to add another.");
      
      }

      else {
      
        // var newPlayerName = $(".addPlayerForm #newPlayerName").textContent;
    
        var playerData = {
        
          name: document.getElementById("newPlayerName").value
        
        }

        console.log(playerData.name);

        console.log(newPlayerName);

        $.ajax("/api/players", {

            type: "POST",

            data: playerData,

            success: function(req, err) { console.log("A new player has been created!"); },

            error: function(req, err) { console.log("Your player failed to post with: " + err); }

            }).then(() => {

            // updatePlayers();

            location.reload();

          });

      }

    });


    // handles ajax call and frontend handling of the "delete" button for a player

    $(".delete").on("click", e => {
        console.log(e.currentTarget);
        var target = e.currentTarget;
        var li = target.closest(".player");
        var id = li.getAttribute("data-id");
        var url = "/api/players/" + id

        $.ajax(url, {

            type: "DELETE",

            error: function(req, err) { console.log("Your player failed to delete with err: " + err); }

            }).then(() => {

            li.remove();

            location.reload();

        });

      console.log(li);

      // drake.remove();

  });


  // handles the user input, ajax update call, and the page reload for updating a single player

  $(".update").on("click", e => {
      console.log(e.currentTarget);
      var target = e.currentTarget;
      var li = target.closest(".player");
      var name = li.getAttribute("data-name");
      var id = li.getAttribute("data-id");
      console.log(id);
      var url = "/api/players/" + id
      console.log(name);

      var newName = window.prompt("Update the Player name:", name);

      var playerData = {
        name: newName
      }

    console.log(newName);

      if (newName) {

          $.ajax(url, {

            type: "PUT",

            data: playerData,

            error: function(req, err) { console.log("Your player failed to update with a new name: " + err); }

            }).then(() => {

            // updatePlayers();

            location.reload();

          });
      }
    

    });

    /* --------------------- */
    /* -- dragula scripts -- */
    /* --------------------- */

    // sets up where the li can be dragged to, and to revert to last position upon spill

    var drake = dragula({
      isContainer: function(el) {
        return el.classList.contains('container') || el.classList.contains('container-benched');
      },
      revertOnSpill: true
    });

    // limit the amount of players that can be in a position (1), besides benched 

    drake.on('drop', function(el, target, source, sibling) {
        
      // only one player per position
      if (target.getAttribute("data-position") !== "benched" && target.childElementCount > 1) {
        alert("You have already placed a player in this position!");
        drake.cancel();
      }

      else {
        var newPosition = target.getAttribute("data-position");
        el.setAttribute("data-position", newPosition);
        // target.textContent = "";
      }
      
    });

    drake.on('cancel', function(el, container, source) {
      console.log("cancelled!");
    });


    