
// function to run as soon as the user lands on the player/team page

    /* 
        this function needs to: take all of the player li's filter into benched and match any with positions to their correct position on the field, possibly finding another solution for updatePosition, right now it is allowing text content to fill the void of having a "drop zone" and I am not sure this is the best approach.
    
    */

    $(document).ready(function() {
        // $("#signIn").show();
        updatePositions();
        // positionPlayers();
    });

  var updatePositions = function() {

      var positionLists = document.querySelectorAll(".container");
      
      console.log("running update positions");

      for (i=0; i<positionLists.length; i++) {

        console.log("in the for the loop");

        if (positionLists[i].childElementCount == 0) {

          console.log("in the if statement");

          var positionName = positionLists[i].getAttribute("data-position");

          console.log(positionName);

          positionLists[i].textContent = positionName;

        }
      }

    }


    /* position players function does not work yet -- commenting out in dev branch until functional */

    // var positionPlayers = function() {
    //     var initialJoin = document.getElementById("benched");
    //     var players = initialJoin.getElementsByTagName("li");

    //     for (i=0; i<players.length; i++) {

    //         if (players[i].getAttribute("data-position") !== "benched") {

    //             var position = players[i].getAttribute("data-position");

    //             var positionOptions = document.querySelectorAll(".container");

    //             for (p=0; p<positionOptions.length; p++) {
    //                 if (positionOptions[i].getAttribute("data-position") == position && positionOptions[i].childElementCount < 1) {
    //                     // player[i].appendTo(positionOptions[i]);

    //                     positionOptions[i].append(players[i]);
    //                 }

    //             }

    //         }
    //     }
    // }


  $(".addPlayerForm").on("submit", event => {

    event.preventDefault();

    var newPlayerName = $(".addPlayerForm #newPlayerName").textContent;

    $.ajax("/api/playerRoster", {

        type: "POST",

        data: newPlayerName

        }).then(() => {

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


    console.log("target= " + target.childElementCount)
      
    // only one player per position
    if (target.getAttribute("data-position") !== "benched" && target.childElementCount > 1) {
      alert("You have already placed a player in this position!");
      drake.cancel();
    }

    else {
      var newPosition = target.getAttribute("data-position");
      el.setAttribute("data-position", newPosition);
      // target.textContent = "";
      console.log("success!");
    }
    
  });

  drake.on('cancel', function(el, container, source) {
    console.log("cancelled!");
  });