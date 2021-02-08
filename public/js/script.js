
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

/* -------------------------------------------- */
/* -------- SCRIPTS FOR INDEX.HANDLEBARS ------ */
/* -------------------------------------------- */

// immediately invoked functions to position players once they are pulled from api

  var positionPlayers = function() {

    console.log("running position players");

    var players = $("#benched").find("li");

    console.log(players);

    console.log("players length: " + players.length)

    for (i=0; i<players.length; i++) {

            console.log("getting players");

            var position = players[i].getAttribute("data-position");

            console.log(position);

            var positionOptions = document.querySelectorAll(".container");

            console.log(positionOptions);

            for (p=0; p<positionOptions.length; p++) {

                if (positionOptions[p].getAttribute("data-position") == position && positionOptions[p].childElementCount == 0) {

                    positionOptions[p].append(players[i]);

                    console.log("appending players to positions");
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

      $.ajax("/api/players", {

          type: "POST",

          data: playerData,

          success: function(req, err) { console.log("A new player has been created!"); },

          error: function(req, err) { console.log("Your player failed to post with: " + err); }

          }).then(() => {

          location.reload();

          // window.location.reload();

        }).then(() => {

          location.reload();

          positionPlayers();

        });

      

    }

  });


  // handles ajax call and frontend handling of the "delete" button for a player

  $(".delete").on("click", e => {
      e.preventDefault();
      var target = e.currentTarget;
      console.log(target);
      var li = target.closest(".player");
      console.log(li);
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
    e.preventDefault();
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

    console.log(playerData.name);

    if (newName) {

      console.log("adding a new name is happening.");

        $.ajax(url, {

          type: "PUT",

          data: playerData,

          success: function(req, err) { console.log("New name is successful!"); },

          error: function(req, err) { console.log("Your player failed to update with a new name: " + err); }

          }).then(() => {

          console.log("made it to /then/ statement.");

          // updatePlayers();

          location.reload();

        });
    }
  

  });

  // gives an alert to the user before heading back to login page to confirm logout

  $("#logOutLink").on("click", e => {

    alert("You've been logged out. Come back soon!");
    
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
      var id = el.getAttribute("data-id");
      console.log(id);
      var url = "/api/players/" + id

      var playerData = {
        position: newPosition
      }

      $.ajax(url, {

          type: "PUT",

          data: playerData,

          error: function(req, err) { console.log("Your player failed to update with a new position" + err); }

          }).then(() => {

          // updatePlayers();

          // location.reload();

        });
    }
    
  });

  drake.on('cancel', function(el, container, source) {
    console.log("cancelled!");
  });


  