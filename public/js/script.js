

$(document).ready(function() {
      updatePositions();
      positionPlayers();
    });

    var updatePositions = function() {

        var positionLists = document.querySelectorAll(".container");

        for (i=0; i<positionLists.length; i++) {

          if (positionLists[i].childElementCount == 0) {

            var positionName = positionLists[i].getAttribute("data-position");

            positionLists[i].textContent = positionName;
          }
        }

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

      var newPlayerName = $(".addPlayerForm #newPlayerName").textContent;
      console.log(newPlayerName);
      $.ajax("/api/players", {

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
        console.log(li);
        li.remove();
        // drake.remove();

    });