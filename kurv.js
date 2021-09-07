/*
 * Dette script definerer klassen Kurv
*/

class Kurv {
    /* Den første del er en "konstruktør".
     * Den tager parametrene og konstruerer et nyt objekt 
     * ud fra dem. Værdierne huskes som hørende til netop 
     * dette objekt ved hjælp af nøgleordet this
     */
    constructor(x, y, bredde, dybde, speed) {
        this.x = x;
        this.y = y;
        this.bred = bredde;
        this.dyb = dybde;
        this.speed = speed;
        this.img2 = loadImage("img1.jpg");
        this.col = [250,230,150];

    }   
    
    /* Tegner kurven. Her kan evt. sættes et billede ind i stedet
     */
    tegn = function() {
        //fill(this.col);
        //rect(this.x-(this.bred/2), this.y-(this.dyb/2), this.bred, this.dyb);

        image(this.img2, this.x-(this.bred/2), this.y-(this.dyb/2),100,70);
        //ellipse(this.x,this.y,5);
       
    }
    move()
    {
        this.x = (mouseX);
        this.y = (height*8/9);
    }

    /* Flytter kurvens position
     */


    /* Tjekker om bolden/appelsinen er grebet ved at se om den rammer
     * "rent" ned gennem kurvens overkant. Parametrene er hhv. boldens
     * midtpunkts koordinater og boldens radius
     */


    // lorte kode (ya < this.y+3 && ya > this.y-3) && xa > this.x+ra && xa < this.x+this.bred-ra



    grebet = function(appel) {
        //debugger;
        let NEGET = Math.pow(appel.x-this.x,2)+Math.pow(appel.y-this.y,2);
        //console.log(NEGET)

        if (NEGET<Math.pow(appel.radius,2)) {
            //console.log(NEGET)
            return true;
        }
        else {
            return false;
        }
    }

} 