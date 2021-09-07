class Appelsin {
    constructor(y)
    {
        this.x=0;
        this.y=y;
        this.xspeed=2*Math.random();
        this.yspeed=-10;
        this.tid = 150;
        this.img = loadImage("pic3.png");
        this.radius = 30;
    }

    move()
    {
        this.tid -= 1;
        if (this.tid <= 0) {
            this.x += this.xspeed;
            this.y += this.yspeed;

            //console.log(y);
            this.yspeed += grav;
        }
        if (this.x > width || this.y > height) {
            missed += 1;
            liv -= 1;
            if (liv < 1) {
                spilIgang = false;
            }
        }
    }

    tegn()
    {
        image(this.img,this.x,this.y,50,50);
    }

}
