window.onload = function() {
    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        cw, ch;

    var pi = Math.PI;

    function size() {
        canvas.width = cw = window.innerWidth;
        canvas.height = ch = window.innerHeight;
    }
    size();

    function bg() {
        ctx.fillStyle = "rgba(30,10,10,1)"
        ctx.fillRect(0, 0, cw, ch);
    }

    function circle(x, y, r, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * pi);
        ctx.fill();
    }

    function rect(x, y, w, h, col) {
        ctx.fillStyle = col;
        ctx.fillRect(x, y, w, h);
    }

    function line(x1, y1, x2, y2, col) {
        ctx.strokeStyle = col;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    var phi =30;
    var x, y, z;
    var radius = ch/3;
    var r;

    var mouseY = .8*ch;

    var col;
    var alpha;
    var istep = ch/50;
    var jmax = 10;
    var yMargin=.1*ch;
    var imax = ch-yMargin;
    var angle;


    function loop() {
        bg();

        line(cw/2,yMargin,cw/2,ch,"rgba(150,255,150,.5)");


        for (var j = 0; j < jmax; j++) {
            for (var i = yMargin; i < imax; i += istep) {
                angle = (i / imax) * (phi / (2 * pi)) + (j / jmax) * 2 * pi;

                x = cw / 2 + ((i-10) / imax) * radius * Math.cos(angle);
                z = radius + ((i-10) / imax) * radius * Math.sin(angle);
                y = i +  100*Math.sin((mouseY - ch/2 )/(ch/2)) ;
                r = .0075 * z + .002 * y;
                alpha = (z / (2 * radius)) + .2;

                col = "rgba(255,255,255," + alpha / 5 + ")";
                line(cw / 2, i, x, y, col);

                if (j % 2)
                    col = "rgba(255,155,0," + alpha + ")";
                else
                    col = "rgba(0,155,255," + alpha + ")";

                circle(x, y, r, col);

            }
        }

        phi += pi / 90;

        window.requestAnimationFrame(loop);
    }

    window.onresize = size;

    window.onmousemove = function(e) {
        mouseY = e.clientY;
    }

    loop();

}