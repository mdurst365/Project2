/* 
--- SCRIPTS FOR LOGINS ON LOGIN.HANDLEBARS
*/




/* 
--- SCRIPTS FOR HANDLING PLAYERS ON INDEX.HANDLEBARS
*/

$(document).ready(function() {
      updatePlayers();
      positionPlayers();
    });

    var updatePlayers = function() {

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

    $(".addPlayerForm").on("submit", event => {

      event.preventDefault();

      // var newPlayerName = $(".addPlayerForm #newPlayerName").textContent;
      
      var playerData = {
        name: $(".addPlayerForm #newPlayerName").textContent
      }

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

    });

    var drake = dragula({
      isContainer: function(el) {
        return el.classList.contains('container') || el.classList.contains('container-benched');
      },
      revertOnSpill: true
    });

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