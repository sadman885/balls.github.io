var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 35;
var minRadius = 3;

var colorArray = [
    "#0D2E41",
    "#00798A",
    "#44AD9F",
    "#F8AF2C",
    "#FA6135"
];

window.addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Circle (x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "blue";
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function() {
        if (this.x + radius > canvas.width || this.x - radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + radius > canvas.height || this.y - radius <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // Interacting with user
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 1000; i++) {
        var x = Math.random() * (canvas.width - r * 2) + r;
        var y = Math.random() * (canvas.height - r * 2) + r;
        var r = Math.random() * 4 + 1;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        circleArray.push(new Circle(x, y, dx, dy, r));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();
