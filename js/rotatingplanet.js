(function() {
    var globe = planetaryjs.planet();
    // Load our custom `autorotate` plugin; see below.
    globe.loadPlugin(autorotate(5));
    // The `earth` plugin draws the oceans and the land; it's actually
    // a combination of several separate built-in plugins.
    //
    // Note that we're loading a special TopoJSON file
    // (world-110m-withlakes.json) so we can render lakes.
    globe.loadPlugin(planetaryjs.plugins.earth({
      topojson: { file:   '/world-110m-withlakes.json' },
      oceans:   { fill:   '#3B2F2F' },
      land:     { fill:   '#C8A165' },
      borders:  { stroke: '#4D2B1F' }
    }));
    // Load our custom `lakes` plugin to draw lakes; see below.
    globe.loadPlugin(lakes({
      fill: '#3B2F2F'
    }));
    // The `pings` plugin draws animated pings on the globe.
    globe.loadPlugin(planetaryjs.plugins.pings());
    // The `zoom` and `drag` plugins enable
    // manipulating the globe with the mouse.
    globe.loadPlugin(planetaryjs.plugins.zoom({
      scaleExtent: [100, 300]
    }));
    globe.loadPlugin(planetaryjs.plugins.drag({
      // Dragging the globe should pause the
      // automatic rotation until we release the mouse.
      onDragStart: function() {
        this.plugins.autorotate.pause();
      },
      onDragEnd: function() {
        this.plugins.autorotate.resume();
      }
    }));
    // Set up the globe's initial scale, offset, and rotation.
    globe.projection.scale(175).translate([175, 175]).rotate([0, -10, 0]);
  
    // Every few hundred milliseconds, we'll draw another random ping.
    var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
    setInterval(function() {
      var lat = Math.random() * 170 - 85;
      var lng = Math.random() * 360 - 180;
      var color = colors[Math.floor(Math.random() * colors.length)];
      globe.plugins.pings.add(lng, lat, { color: color, ttl: 2000, angle: Math.random() * 10 });
    }, 150);
  
    var canvas = document.getElementById('rotatingGlobe');

// Special code to handle high-density displays (e.g. retina, some phones)
// In the future, Planetary.js will handle this by itself (or via a plugin).
if (window.devicePixelRatio == 2) {
  canvas.width = 800;
  canvas.height = 800;
  var context = canvas.getContext('2d');
  context.scale(2, 2);
}

// Variables to help distinguish a click from a drag
var mouseDownPos = null;
var clickThreshold = 5; // pixels

// Add mousedown and mouseup listeners to detect a click
canvas.addEventListener('mousedown', function(event) {
  mouseDownPos = [event.offsetX, event.offsetY];
});

canvas.addEventListener('mouseup', function(event) {
  if (!mouseDownPos) return;
  
  var dx = event.offsetX - mouseDownPos[0];
  var dy = event.offsetY - mouseDownPos[1];
  
  if (Math.sqrt(dx * dx + dy * dy) < clickThreshold) {
    // Convert the click position into geographic coordinates
    const coords = globe.projection.invert([event.offsetX, event.offsetY]);
    // Process the click as a ping selection
    handlePingClick(coords);
  }
  mouseDownPos = null;
});

// Function to process the ping click
function handlePingClick([lng, lat]) {
  console.log(`User clicked at longitude: ${lng}, latitude: ${lat}`);
  // Here, you would look up the region based on [lng, lat] and select the corresponding recipe.
  // For now, we’re simply calling a function to show the modal:
  showModalWithRecipe(lng, lat);
}

// Function to show the modal with recipe details
function showModalWithRecipe(lng, lat) {
  var modal = document.getElementById('recipeModal');
  // In a complete implementation, you’d use the lng/lat (or region mapping) to decide what recipe to show.
  modal.innerHTML = `
    <h2>Coffee Recipe from Selected Region</h2>
    <p>Try this amazing coffee recipe from the region near:</p>
    <p>Longitude: ${lng.toFixed(2)}, Latitude: ${lat.toFixed(2)}</p>
    <a href="recipe-link.html" target="_blank">View Full Recipe</a>
  `;
  modal.style.display = 'block';
}

// Draw the globe!
globe.draw(canvas);


function autorotate(degPerSec) {
  // Planetary.js plugins are functions that take a `planet` instance as an argument...
  return function(planet) {
    var lastTick = null;
    var paused = false;
    planet.plugins.autorotate = {
      pause:  function() { paused = true;  },
      resume: function() { paused = false; }
    };
    // ... and so on.
  };
}

    globe.draw(canvas);
      
    // This plugin will automatically rotate the globe around its vertical
    // axis a configured number of degrees every second.
    function autorotate(degPerSec) {
      // Planetary.js plugins are functions that take a `planet` instance
      // as an argument...
      return function(planet) {
        var lastTick = null;
        var paused = false;
        planet.plugins.autorotate = {
          pause:  function() { paused = true;  },
          resume: function() { paused = false; }
        };
        // ...and configure hooks into certain pieces of its lifecycle.
        planet.onDraw(function() {
          if (paused || !lastTick) {
            lastTick = new Date();
          } else {
            var now = new Date();
            var delta = now - lastTick;
            // This plugin uses the built-in projection (provided by D3)
            // to rotate the globe each time we draw it.
            var rotation = planet.projection.rotate();
            rotation[0] += degPerSec * delta / 1000;
            if (rotation[0] >= 180) rotation[0] -= 360;
            planet.projection.rotate(rotation);
            lastTick = now;
          }
        });
      };
    };
  
    // This plugin takes lake data from the special
    // TopoJSON we're loading and draws them on the map.
    function lakes(options) {
      options = options || {};
      var lakes = null;
  
      return function(planet) {
        planet.onInit(function() {
          // We can access the data loaded from the TopoJSON plugin
          // on its namespace on `planet.plugins`. We're loading a custom
          // TopoJSON file with an object called "ne_110m_lakes".
          var world = planet.plugins.topojson.world;
          lakes = topojson.feature(world, world.objects.ne_110m_lakes);
        });
  
        planet.onDraw(function() {
          planet.withSavedContext(function(context) {
            context.beginPath();
            planet.path.context(context)(lakes);
            context.fillStyle = options.fill || 'black';
            context.fill();
          });
        });
      };
    };
  })();