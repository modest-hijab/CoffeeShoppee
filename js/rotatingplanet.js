
(function() {
  // Create a new Planetary.js planet instance.
  var globe = planetaryjs.planet();
  // Load our custom autorotate plugin with a rotation speed of 4 deg/sec.
  globe.loadPlugin(autorotate(4));
  
  
  globe.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file: '/world-110m-withlakes.json' },
    oceans:   { fill: '#6F4E37' },
    land:     { fill: '#D2B48C' },
    borders:  { stroke: '#8B4513' }
  }));
  
  // Load our custom lakes plugin to draw lakes.
  globe.loadPlugin(lakes({ fill: '#3B2F2F' }));
  
  // Load the pings plugin (for animated pings on the globe).
  globe.loadPlugin(planetaryjs.plugins.pings());
  
  globe.loadPlugin(planetaryjs.plugins.objects());	//line test	change planet to globe
  // Load the zoom and drag plugins.
  //globe.loadPlugin(planetaryjs.plugins.zoom({
 //   scaleExtent: [300, 300]
  //}));
  globe.loadPlugin(planetaryjs.plugins.drag({
    // Pause autorotation while dragging.
    onDragStart: function() {
      this.plugins.autorotate.pause();
    },
    onDragEnd: function() {
      this.plugins.autorotate.resume();
    }
  }));

  // Set the globe's initial scale, offset, and rotation.
  globe.projection.scale(195).translate([195, 195]).rotate([0, -10, 0]);

  // -----------------------------
  // Fixed Pings for Selected Regions
  // -----------------------------
  // Create an array for storing ping data for click detection.
  var storedPings = [
    { lng: 174.885971, lat: -40.900557, name: "New Zealand", url: "<iframe width='560' height='315' src='https://www.youtube.com/embed/gRFNPn6sG_Y?si=5yOdzXgFzSmmdbpz' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>" },
    { lng: -95.712891, lat: 37.090240, name: "United States", url: "<iframe width='560' height='315' src='https://www.youtube.com/embed/kySG70ZqE4o?si=Jl4NcZrA5ekszObg' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>" },
    { lng: 12.56738, lat: 41.87194, name: "Italy", url: "<iframe width='560' height='315' src='https://www.youtube.com/embed/LnUSTtyF1rs?si=LicE9XSKjseUT_XO' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>" },
    { lng: 35.243322, lat: 38.963745, name: "Turkey", url: "<iframe width='560' height='315' src='https://www.youtube.com/embed/UghjdGRhCPE?si=v6ZYLY2MlNtm6xr-' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>" },
    { lng: -8.24389, lat: 53.41291, name: "Ireland", url: "<iframe width='560' height='315' src='https://www.youtube.com/embed/example_video' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>" },
    { lng: 101.975766, lat: 4.210484, name: "Malaysia", url: "<iframe width='560' height='315' src='https://www.youtube.com/embed/NEz4khlo6a8?si=l2BYLvqVNC_OuO2a' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>" },
    { lng: 36.238414, lat: 30.585164, name: "Jordan", url: "<iframe width='560' height='315' src='https://www.youtube.com/embed/kKgdF376brQ?si=OkVX-aJVNdKno9Rg' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>" },
    { lng: 45.079162, lat: 23.885942, name: "Saudi Arabia", url: "<iframe width='560' height='315' src='https://www.youtube.com/embed/QFg-_Bg_TQo?si=VEeDq5dpWute5oWt' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>" },
    { lng: -51.92528, lat: -14.235004, name: "Brazil", url: "<iframe width='560' height='315' src='https://www.youtube.com/embed/C_zZ2NAoa4g?si=raRAC0a7kPjDrbl_' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>" },
    { lng: 108.277199, lat: 14.058324, name: "Vietnam", url: "<iframe width='560' height='315' src='https://www.youtube.com/embed/hrMOikezwg8?si=w4bZcaB8llE6oWy0' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>" }

  ];


  // Add pings for each region.
  setInterval(() => {
    storedPings.forEach(function (ping) {
        console.log(`Ping added: ${ping.name}, Longitude: ${ping.lng}, Latitude: ${ping.lat}`);

        if (globe.plugins.objects) {
            // Calculate accurate coordinates using the projection
            const [x, y] = globe.projection([ping.lng, ping.lat]);

            // Check if coordinates are valid
            if (x && y) {
                globe.plugins.objects.add(ping.lng, ping.lat, {
                    imagesrc: "images/what transp bean.webp",
                    imagewidth: 10, // Adjusted size
                    imageheight: 10 // Adjusted size
                });
            } else {
                console.error("Invalid coordinates for ping:", ping);
            }
        } else {
            console.error("The 'objects' plugin is not available.");
        }
    });
}, 1500);
  




  // -----------------------------
  // Set up the canvas.
  // -----------------------------
  var canvas = document.getElementById('rotatingGlobe');

  // Handle high-density (retina) displays.
  if (window.devicePixelRatio == 2) {
    canvas.width = 800;
    canvas.height = 800;
    var context = canvas.getContext('2d');
    context.scale(2, 2);
  }

  // -----------------------------
  // Set up mouse event listeners
  // (to distinguish dragging from clicking)
  // -----------------------------
  var mouseDownPos = null;
  var clickThreshold = 5; // in pixels

  canvas.addEventListener('mousedown', function(event) {
    mouseDownPos = [event.offsetX, event.offsetY];
  });

  canvas.addEventListener('mouseup', function(event) {
    if (!mouseDownPos) return;

    var dx = event.offsetX - mouseDownPos[0];
    var dy = event.offsetY - mouseDownPos[1];

    if (Math.sqrt(dx * dx + dy * dy) < clickThreshold) {
      // If the mouse didn't move much, treat it as a click.
      var coords = globe.projection.invert([event.offsetX, event.offsetY]);
      handlePingClick(coords);
    }
    mouseDownPos = null;
  });

  // -----------------------------
  // Handle a ping click.
  // -----------------------------
  // This function checks if a click is close enough to any stored ping.
  function handlePingClick([clickedLng, clickedLat]) {
    console.log(`User clicked at: Longitude ${clickedLng}, Latitude ${clickedLat}`);
    
    var threshold = 15 * (globe.projection.scale() / 200); // Scale threshold with zoom levelon

    for (var i = 0; i < storedPings.length; i++) {
        var ping = storedPings[i];
        var dx = clickedLng - ping.lng;
        var dy = clickedLat - ping.lat;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < threshold) {
            console.log(`Ping found near: ${ping.name}`);
            showModalWithRecipe(ping);
            return;
        }
    }
    console.log("No ping near the clicked position.");
}

  // -----------------------------
  // Display the modal with the coffee recipe.
  // -----------------------------
  function showModalWithRecipe(ping) {
    var modal = document.getElementById('recipeModal'); // Ensure this exists in your HTML

    // Default URL logic (ping.url is expected to contain the embedded YouTube video)
    const url = ping.url || `recipe-link-${ping.name.toLowerCase().replace(/\s+/g, '-')}.html`;

    modal.innerHTML = `
        <div class="modal-content">
        <span id="closeModalBtn" style="cursor: pointer; font-size: 40px; position: absolute; top: 10px; right: 15px;">&times;</span> <!-- X icon -->
            <h2>Coffee Recipe from ${ping.name}</h2>
            <p>Check out this amazing recipe!</p>
            <div class="video-container">
                ${ping.url} <!-- Embed YouTube video from the object -->
            </div>
          
        </div>
    `;

    modal.style.display = 'flex'; // Show the modal

    // Add event listener for the close button
    document.getElementById('closeModalBtn').onclick = () => {
        modal.style.display = 'none'; // Hide the modal when "Close" is clicked
    };
}  
    

  // -----------------------------
  // Draw the globe!
  // -----------------------------
  globe.draw(canvas);
  globe.plugins.objects.add(-1.3167103, 50.6927176, { imagesrc:"images/what transp bean.webp" }); //line test change from planet to globe
  console.log(globe.plugins)


  // -----------------------------
  // Plugin definitions.
  // -----------------------------

  // Autorotate plugin: rotates the globe by a specified number of degrees per second.
  function autorotate(degPerSec) {
    return function(planet) {
      var lastTick = null;
      var paused = false;
      planet.plugins.autorotate = {
        pause: function() { paused = true; },
        resume: function() { paused = false; }
      };
      planet.onDraw(function() {
        if (paused || !lastTick) {
          lastTick = new Date();
        } else {
          var now = new Date();
          var delta = now - lastTick;
          var rotation = planet.projection.rotate();
          rotation[0] += degPerSec * delta / 1000;
          if (rotation[0] >= 180) rotation[0] -= 360;
          planet.projection.rotate(rotation);
          lastTick = now;
        }
      });
    };
  }

  // Lakes plugin: draws lakes from the TopoJSON file.
  function lakes(options) {
    options = options || {};
    var lakesData = null;
    return function(planet) {
      planet.onInit(function() {
        var world = planet.plugins.topojson.world;
        lakesData = topojson.feature(world, world.objects.ne_110m_lakes);
      });
      planet.onDraw(function() {
        planet.withSavedContext(function(context) {
          context.beginPath();
          planet.path.context(context)(lakesData);
          context.fillStyle = options.fill || 'black';
          context.fill();
        });
      });
    };
  }
})();