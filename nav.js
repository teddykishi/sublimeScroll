       // $(function(){

      var $container = $("#container");

      var items = 1;
      var itemsLoaded = ["file0"];

      var links = ["file0", "file1", "file2", "file3"];
      var position = 0;
      var currentItem = links[position];
      var x = 0;


      $container.width("100%");

      $(".next").click(function(e) {
          next();
          return false;
      });

      $(".prev").click(function(e) {
          prev();
          return false;
      });

      $("#home").click(function(e) {
          slideTo(0);
          return false;
      });

      function prev() {
          if (links[position - 1]) {
              position--;
              currentItem = links[position];
              x = -(position * 100) + "%";
              if (position == 0) {
                  move(0)
              } else {
                  loadItem(currentItem, function() {
                      move(x)
                  });
              }
          }
      }

      function next() {
          if (links[position + 1]) {
              position++;
              currentItem = links[position];
              x = -(position * 100) + "%";
              loadItem(currentItem, function() {
                  move(x)
              });
          }

      }

      function slideTo(num) {
          if (typeof num == "number") {
              position = num;
              currentItem = links[position] || 0;
              x = -(position * 100) + "%";
              move(x);
          }
      }

      function move(x) {
          $container.css({
              left: x + "%"
          }, 500);
      }

      $("#nav a").click(function(e) {
          var link = $(this).attr("href");
          if ((itemsLoaded.indexOf(link) > -1)) {
              console.log("already loaded")
              console.log("position : ", itemsLoaded.indexOf(link))
              position = itemsLoaded.indexOf(link);
              slideTo(position);
          } else {
              console.log("load slide")
              loadItem(link, function() {
                  slideTo(($(".content").length - 1));
              });
          }
          return false;
      });

      function loadItem(link, callback) {
          console.log(link)
          if (!(itemsLoaded.indexOf(link) > -1)) {
              $("<div>").load(link + ".html", function() {
                  $container.append($(this).html());
                  itemsLoaded.push(link)
                  items++;
                  $container.css("width", (items * 100) + "%");
                  $(".content").width((100 / items) + "%");
                  if (callback && typeof callback == "function") callback();
              })
          } else {
              if (callback && typeof callback == "function") callback();
          }
      }

      function scrollTo(position) {
          $container.stop().animate({
              left: position
          }, 500)
      }