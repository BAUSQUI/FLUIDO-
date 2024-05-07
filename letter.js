class letter {
constructor (x,y) {
this.alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J","K","L","M","Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
this.letter = random(this.alphabets);
this.size = random(60,300)


this.x = x;
this.y = y;
this.dx = random(-5,5);
this.dy = random(-5,5);
this.angle = random(360);
}

update(){
this.x += this.dx;
this.y += this.dy;

}

display(){
    push()
    fill(173,255,0)
    translate(this.x, this.y);
    rotate(this.angle);
    textFont(font);
    textSize(this.size);
    text(this.letter, 0, 0);
    pop()
}


}