var space = {};

space.Consts = [
  {name: "State", consts: ["WAITING", "PAUSED", "PLAYING", "DYING"]},
  {name: "Dir",   consts: ["UP", "DOWN"]}
];

space.FOOTER_HEIGHT = 30;
space.FPS           = 19;

space.Color = {
    BACKGROUND  : "#FFFFFF", BLOCK         : "#BD8D46",
    HOME_TEXT   : "#403B37", RAND_BLOCK    : "#403B37",
    USER        : "#FFFF00", TARGET_STROKE : "#B24524",
    DIALOG_TEXT : "#333333", FOOTER_BG     : "#403B37",
    FOOTER_TEXT : "#C3CCB5"
}

space.User = function (params) {

    var _distance = 0,
        position = null,
        _trail   = null,
        momentum = null;


    function distance() {
        return _distance;
    }

    function reset() {
        _distance = 0;
        position = 50; // initial position of the space flight 
        _trail = [];
        momentum = 0;//position of ths space flight when moving
    }

    function move(thrusters) {

        _distance += 1;

        momentum += ((thrusters) ? 0.4 : -0.5);
        position += momentum;

        if (params.tick() % 2 === 0) {
            _trail.push(position);
        }

        if (_trail.length > 4) {
            _trail.shift();
        }

        return position;
    }

    function trail() {
        return _trail;
    }

    return {
        "reset":reset,
        "move":move,
        "trail":trail,
        "distance":distance,

    };
};

space.Screen = function (params) {

    var _width       = params.width,
        _height      = params.height,
        _numLines    = 30,
        _direction   = space.Dir.UP,
        _lineWidth   = _width / _numLines,
        _lineHeight  = _height / 100,
        _gap         = null,
        _randomBlock = null,
        magnitude    = null,
        changeDir    = 0,
        _blockY      = null,
        _blockHeight = 20,
        heliHeight   = (30 / params.height) * 100, // Convert px to %
        _terrain     = [],
        img = new Image(),
        img2 = new Image();

    img.src = 'images/spatiale2.png';
    img2.src = 'images/spatiale1.png';

    function width()  { return _width; }
    function height() { return _height; }

    function init() {

        manitude = null;
        changeDir = 0;
        _randomBlock = null;
        _gap = 80; // The gap between the top and the bottom part
        _terrain = [];

        var i,
            size = (100 - _gap) / 2,
            obj  = {"top":size, "bottom":size};

        for (i = 0; i < _numLines; i += 1) {
            _terrain.push(obj);
        }
    }
/*
Draw() : It's background of the map (we must change)!!!!
*/
    function draw(ctx) {
        ctx.fillStyle = space.Color.BACKGROUND;
		ctx.fillRect(0, 0, _width, _height);
        ctx.fill();
    }

    function toPix(userPos) {
        return _height - (_height * (userPos / 100));
    }
/*
randomNum() : generate random points (top and bottom)
*/
    function randomNum(low, high) {
        return low + Math.floor(Math.random() * (high - low));
    }
/*
Moveterrain() makes it possible to advance the space flight
*/
    function moveTerrain() {

        var toAdd, len, rand,
            last = _terrain[Math.round(_terrain.length-1)];

        if (changeDir === 0) {
            _direction = (_direction === space.Dir.DOWN) ? space.Dir.UP : space.Dir.DOWN;
            len = (_direction === space.Dir.DOWN) ? last.bottom : last.top;
            magnitude = randomNum(1, 4);
            changeDir = randomNum(5, len / magnitude);
            if (params.tick() % 2 === 0) {
                if (_direction === space.Dir.DOWN) {
                    last.top += 1;
                } else {
                    last.bottom += 1;
                }
            }
        }

        changeDir--;

        toAdd = (_direction === space.Dir.UP) ? {"top":-magnitude,"bottom":magnitude}
            : {"top":magnitude,"bottom":-magnitude};

        _terrain.push({
            "top":last.top + toAdd.top,
            "bottom":last.bottom + toAdd.bottom
        });
        _terrain.shift();
    }

    function drawTerrain(ctx) {

        var i, obj, bottom;

        ctx.fillStyle = space.Color.BLOCK;

        for (i = 0; i < _numLines; i += 1) {
            obj = _terrain[i];
            bottom = obj.bottom;
		    ctx.fillRect(Math.floor(i * _lineWidth), 0,
                         Math.ceil(_lineWidth), obj.top * _lineHeight);
		    ctx.fillRect(Math.floor(i * _lineWidth),
                         _height - bottom * _lineHeight,
                         Math.ceil(_lineWidth),
                         _height);
        }

    }

    function drawUser(ctx, user, trail, alternate) {

        var i, len, mid, image;
        mid = Math.round(_terrain.length * 0.25);
        image = (alternate && params.tick()) % 4 < 2 ? img : img2;

        ctx.fillStyle = space.Color.USER;
        ctx.beginPath();
        ctx.drawImage(image, mid * _lineWidth - 40,
                      toPix(user) - (heliHeight / 2));
        ctx.fill();
        ctx.closePath();
    }

/*
collided () to manage collisions
*/
   function collided(pos) {

        var midPoint = Math.round(_terrain.length * 0.25),
            middle = _terrain[midPoint],
            size = heliHeight / 2;

        var hitBlock = (_randomBlock === midPoint ||
                        _randomBlock === midPoint-1) &&
            (pos < (_blockY + size)) &&
            (pos > (_blockY - _blockHeight));

        return (pos > (100 - middle.top)) && 100 - middle.top ||
            pos < (middle.bottom + size) && (middle.bottom + size) ||
            hitBlock;
    }


    return {
        "draw"        : draw,
        "drawUser"    : drawUser,
        "drawTerrain" : drawTerrain,
        "moveTerrain" : moveTerrain,
        "toPix"       : toPix,
        "init"        : init,
        "width"       : width,
        "height"      : height,
        "collided"    : collided
    };
};

/**********************************************************************************************************************************************************
*												Audio test part 
*************************************************************************************************************************************************************/
space.Audio = function(game) {

    var files          = [],
        endEvents      = [],
        progressEvents = [],
        playing        = [];

    function load(name, path, cb) {

        var f = files[name] = document.createElement("audio");

        progressEvents[name] = function(event) { progress(event, name, cb); };

        f.addEventListener("canplaythrough", progressEvents[name], true);
        f.setAttribute("preload", "auto");
        f.setAttribute("autobuffer", "true");
        f.setAttribute("src", path);
        f.pause();
    }

    function progress(event, name, callback) {
        if (event.loaded === event.total && typeof callback === "function") {
            callback();
            files[name].removeEventListener("canplaythrough",
                                            progressEvents[name], true);
        }
    }

    function disableSound() {
        for (var i = 0; i < playing.length; i++) {
            files[playing[i]].pause();
            files[playing[i]].currentTime = 0;
        }
        playing = [];
    }

    function stop(file) {
        files[file].pause();
        files[file].currentTime = 0;
    }

    function ended(name) {

        var i, tmp = [], found = false;

        files[name].removeEventListener("ended", endEvents[name], true);

        for (i = 0; i < playing.length; i++) {
            if (!found && playing[i]) {
                found = true;
            } else {
                tmp.push(playing[i]);
            }
        }
        playing = tmp;
    }

    function play(name) {
        if (!game.soundDisabled()) {
            endEvents[name] = function() { ended(name); };
            playing.push(name);
            files[name].addEventListener("ended", endEvents[name], true);
            files[name].play();
        }
    }

    function pause() {
        for (var i = 0; i < playing.length; i++) {
            files[playing[i]].pause();
        }
    }

    function resume() {
        for (var i = 0; i < playing.length; i++) {
            files[playing[i]].play();
        }
    }

    return {
        "disableSound" : disableSound,
        "load"         : load,
        "play"         : play,
        "stop"         : stop,
        "pause"        : pause,
        "resume"       : resume
    };
};

var SPACERIDER = (function() {

    /* Generate Constants from Heli.Consts arrays */
    (function (glob, consts) {
        for (var x, i = 0; i < consts.length; i += 1) {
            glob[consts[i].name] = {};
            for (x = 0; x < consts[i].consts.length; x += 1) {
                glob[consts[i].name][consts[i].consts[x]] = x;
            }
        }
    })(space, space.Consts);

    var state       = space.State.WAITING,
        thrustersOn = false,
        timer       = null,
        audio       = null,
        screen      = null,
        user        = null,
        pos         = 0,
        died        = 0,
       _tick        = 0;

    function mouseDown(e) {
        audio.play("start");
        thrustersOn = true;
        if (e.target.nodeName === "CANVAS" && state === space.State.WAITING) {
            newGame();
        }
    }

    function mouseUp(e) {
        audio.stop("start");
        thrustersOn = false;
    }

    function tick() {
        return _tick;
    }

    function newGame() {
        if (state != space.State.PLAYING) {
            user.reset();
            screen.init();
            timer = window.setInterval(mainLoop, 1000/space.FPS);
            state = space.State.PLAYING;
        }
    }

    function dialog(text) {
        var textWidth = ctx.measureText(text).width,
            x = (screen.width() - textWidth) / 2,
            y = (screen.height() / 2) - 7;

        ctx.fillStyle = space.Color.DIALOG_TEXT;
        ctx.font      = "14px silkscreen";
        ctx.fillText(text, x, y);
    }

    function soundDisabled() {
        return localStorage.soundDisabled === "true";
    }

    function mainLoop() {

        ++_tick;

        if (state === space.State.PLAYING) {

            pos = user.move(thrustersOn);
            screen.moveTerrain();

            screen.draw(ctx);
            screen.drawTerrain(ctx);

            var tmp = screen.collided(pos);
            if (tmp !== false) {
                if (tmp !== true) {
                    pos = tmp;
                }

                state = space.State.DYING;
                died = _tick;

            }
            screen.drawUser(ctx, pos, user.trail(), true);

        } else if (state === space.State.DYING && (_tick - died) > (space.FPS / 1)) {

            state = space.State.WAITING;
            window.clearInterval(timer);
            timer = null;
        } else if (state === space.State.DYING) {

            screen.draw(ctx);
            screen.drawTerrain(ctx);
            screen.drawUser(ctx, pos, user.trail(), false);


        }

    }
/*
* this function iniatilize the main frame
 */   function init(wrapper, root) {

        var width  = wrapper.offsetWidth,
            height = (width / 4) * 3,
            canvas = document.createElement("canvas");

        canvas.setAttribute("width", width + "px");
        canvas.setAttribute("height", (height + 20) + "px");

        wrapper.appendChild(canvas);

        ctx = canvas.getContext('2d');

		audio = new space.Audio({
            "soundDisabled" : soundDisabled
        });
        screen = new space.Screen({
            "tick"   : tick,
            "width"  : width,
            "height" : height
        });
        user = new space.User({"tick":tick});

        screen.init();
        screen.draw(ctx);

        dialog("Loading ...");

        // disable sound while it sucks
        if (typeof localStorage.soundDisabled === "undefined") {
            localStorage.soundDisabled = true;
        }

      var ext = Modernizr.audio.ogg ? 'ogg' : 'mp3';

        var audio_files = [
            ["start", root + "motor." + ext],
            ["crash", root + "crash." + ext]
        ];

        load(audio_files, function () { loaded(); });
    }

  function load(arr, loaded) {

        if (arr.length === 0) {
            loaded();
        } else {
            var x = arr.pop();
            audio.load(x[0], x[1], function() { load(arr, loaded); });
        }
    }
/*
This function allows you to customize the homepage (the title)
*/
    function startScreen() {

        screen.draw(ctx);
        screen.drawTerrain(ctx);

        ctx.fillStyle = space.Color.HOME_TEXT;
        ctx.font = "22px silkscreenbold";

        var text = "Space Rider";
        var textWidth = ctx.measureText(text).width,
        x = (screen.width() - textWidth) / 2,
        y = screen.height() / 3;

        ctx.fillText(text, x, y);
		ctx.fillText("touch the screen to start", x - 105, y + 66);

    }


    function loaded() {

        document.addEventListener("mousedown", mouseDown, true);
        document.addEventListener("mouseup", mouseUp, true);

        startScreen();
    }

    return {
        "init" : init
    };
}());