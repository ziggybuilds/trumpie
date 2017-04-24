// Require SASS files

require('../scss/style.scss');


//Begin moving Trumpie

const box = document.querySelector('#moveBox');
const rect = box.getBoundingClientRect();

const body = document.body;
	const html = document.documentElement;

const height = Math.max( body.scrollHeight, body.offsetHeight, 
                   html.clientHeight, html.scrollHeight, html.offsetHeight );

const width = Math.max( body.scrollWidth, body.offsetWidth, 
                   html.clientWidth, html.scrollWidth, html.offsetWidth );

function mouseMover(e) {
	var x = event.clientX;
		var y = event.clientY;

		if (x < width ) {
    		var shiftX = (100 / width) * 2 * x;
    		box.style.paddingRight = shiftX + "px";
		} else if (x > width ) {
			var shiftX = (-100 / width) * 2 * x;
			box.style.paddingLeft = shiftX + "px";
		}

		if (y < height ) {
		var shiftY = (100 / height) * y;
		box.style.paddingBottom = shiftY + "px";
		} else if (y > height ) {
			var shiftY = (-100 / height) * y;
			box.style.paddingTop = shiftY + "px";
		}
}

document.addEventListener('mousemove', (e) => {
	mouseMover();
});




//Begin game timer

const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');
const startBtn = document.querySelector('#start');


class Timer {
    constructor(display) {
        this.active = false;
        this.display = display;
        this.reboot();
        this.print(this.times);
    }

    reboot() {
        this.times = [ 0, 0, 0 ];
    }

    start() {
        if (!this.time) this.time = performance.now();
        if (!this.active) {
            this.active = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }

    stop() {
        this.active = false;
        this.time = null;
    }

    step(timestamp) {
        if (!this.active) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    
    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

let timer = new Timer(document.querySelector('#counter'));

startBtn.addEventListener('click', (e) => {
    timer.start();
});

resetBtn.addEventListener('click', (e) => {
        window.location.reload(true);
});


const house = document.querySelector('#whitehouse');
const liberty = document.querySelector('#liberty');
const flag = document.querySelector('#flag');
const earth = document.querySelector('#earth');

const parenthouse = document.querySelector('#parentHouse');
const parentLiberty = document.querySelector('#parentLiberty');
const parentflag = document.querySelector('#parentFlag');
const parentearth = document.querySelector('#parentEarth');

const boom = document.createElement("img");
boom.src = "./images/boom.gif";
boom.setAttribute("class", "boom");

const done = document.createElement("img");
done.src = "./images/done.png";
done.setAttribute("class", "boom");

    house.addEventListener('click', (e) => {
        timer.start();
       if(house.hasAttribute("datagame")) {
        house.setAttribute("datagame", "true");
        }
        parentHouse.appendChild(done);
        house.style.display = "none";
        gameOver();
    });
    liberty.addEventListener('click', (e) => {
        timer.start();
        if(liberty.hasAttribute("datagame")) {
        liberty.setAttribute("datagame", "true");
        }
        parentLiberty.appendChild(done);
        liberty.style.display = "none";
        gameOver();
    });
    earth.addEventListener('click', (e) => {
        timer.start();
        if(earth.hasAttribute("datagame")) {
        earth.setAttribute("datagame", "true");
        }
        parentEarth.appendChild(boom);
        earth.style.display = "none";
        gameOver();
    });
    flag.addEventListener('click', (e) => {
        timer.start();
        if(flag.hasAttribute("datagame")) {
        flag.setAttribute("datagame", "true");
        }
        parentFlag.appendChild(done);
        flag.style.display = "none";
        gameOver();
    });

function gameOver() {
    if( 
        house.getAttribute("datagame") == "true" &&
        liberty.getAttribute("datagame") == "true" &&
        flag.getAttribute("datagame") == "true" &&
        earth.getAttribute("datagame") == "true"
     ) {
            timer.stop();
            endMessage();
    }
}

//// Function to dispaly gameover pop-up
const score = document.querySelector("#score");
const title = document.querySelector("#gametitle");
const pop = document.querySelector("#pop-up");
document.addEventListener('DOMContentLoaded', (e) => {
    pop.style.display = "none";
});

function endMessage() {
    let time = document.querySelector("#counter").textContent;
    score.textContent = "Congrats! Donald destroyed the world in: " + counter.textContent;

    setTimeout(function() {
        pop.style.display = "block";
    }, 500);

    console.log("completed");
}










// fallback, animation frame polyfill

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

