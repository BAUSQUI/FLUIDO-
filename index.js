let letters = [];
let l;
let font;
let img;
let vehicles = [];
let texto = 'veneno';
let particles = []; // Array para almacenar las partículas
let points = [];
let points1 = [];

function preload() {
  font = loadFont('Fluido-Regular.otf');
  img1 = loadImage("veneno1.png")
  img = loadImage("homeFinal.png")
  img2 = loadImage("amorfo1.png")
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  
  // var screenshotButton = document.getElementById('screenshotButton');
  // screenshotButton.addEventListener('click', tomarCaptura);
  
  
  // Colocar puntos en el borde del texto y crear vehículos
  let points = font.textToPoints(texto, 310, 450, 190);
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  
  background(80);
  image(img,0,0);
  for (let i = 0; i < letters.length; i++) {
    letters[i].update(); 
    letters[i].display();   
  }


  

  if (showVeneno) {
    mostrarVeneno();
  } else if (showAmorfo) {
    mostrarAmorfo();
  
  }
  
}


function home(){

  
}


function mouseDragged() {
  letters.push(new letter(mouseX, mouseY))
}

function mostrarVeneno() {
  push()
  //translate(380, 400)
  //Dibujar los vehículos
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
  pop()
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    texto = texto.substring(0, texto.length - 1); // Eliminar el último carácter
    updateText();
  }
}

function keyTyped() {
  if (key !== BACKSPACE) {
    texto += key; // Agregar el carácter presionado al texto
    updateText();
  }
}

function updateText() {
  push()
  background(80);
  noStroke()
  fill(80)
  textFont(font);
  textSize(100);
  text(texto, 310, 450);

  // Actualizar los vehículos con el nuevo texto
  vehicles = [];
  let points = font.textToPoints(texto, 310, 450, 190);
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  pop()
}

function mostrarAmorfo() {
  push()
  image(img2, 0,0)
  for (let index = 0; index < points1.length; index++) {
    point(points1[index].x, points1[index].y);
  }
  
  // Verificar si el grosor del trazo ha alcanzado su máximo
  if (mouseX >= 200) {
    // Crear partículas en las posiciones de los caracteres del texto
    createParticles();
    // Mover y mostrar las partículas
    moveParticles();
  } else {
    // Configurar el color del texto en blanco si el grosor del trazo es menor que 200
    if (mouseX > 8) {
      fill(255); // Blanco
    } else {
      fill(0); // Negro
    }

    // Establecer el color del trazo a blanco
    stroke(255);

    // Configurar el trazo para que esté en el exterior del texto
    strokeOutside(mouseX);

    // Configurar la fuente y el tamaño del texto
    textFont(font);
    textSize(500);

    // Dibujar el texto
    text(texto, 310, 450);
  
  }
  pop()
}

// Función para configurar el trazo en el exterior del texto
function strokeOutside() {
  strokeJoin(ROUND); // Ajustar la forma en que se unen las líneas
  let strokeSize = min(mouseX, 200); // Limitar el grosor del trazo al valor máximo de 200
  strokeWeight(strokeSize); // Ajustar el grosor del trazo
}

// Función para crear partículas en las posiciones de los caracteres del texto
function createParticles() {
  push()
  //translate (380, 400);
  for (let i = 0; i < 10; i++) { // Cambia 10 por el número de partículas que deseas
    let x = random(width); // Posición x aleatoria
    let y = random(height); // Posición y aleatoria
    let particle = createVector(x, y); // Crear vector de partícula
    particles.push(particle); // Agregar partícula al array
  }
  pop()
}

// Función para mover y mostrar las partículas
function moveParticles() {
  push()
  //translate (380, 400);
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    // Mover la partícula aleatoriamente
    particle.x += random(-5, 5);
    particle.y += random(-5, 5);
    // Mostrar la partícula con asimetría en el tamaño
    let ellipseWidth = random(0.3, 2); // Ancho aleatorio
    let ellipseHeight = random(0.2, 1); // Altura aleatoria
    ellipse(particle.x, particle.y, ellipseWidth, ellipseHeight); // Elipse con asimetría
  }
  pop()
}

let showVeneno = false;

function mostrarVeneno() {
  push()
  
  showAmorfo = false;
  showVeneno = true;
  image(img1,0,0);
  //background(80);
  //translate(380, 400);
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
  pop()
}
  let showAmorfo = false;

  function mostrarAmorfo() {
    push()
    showVeneno = false;
    showAmorfo = true;
    image(img2, 0,0)
    //background(80);
    for (let index = 0; index < points1.length; index++) {
      point(points1[index].x, points1[index].y);
    }
  
    // Configurar el color del texto en blanco si el grosor del trazo es menor que 200
    if (mouseX > 8) {
      fill(255); // Blanco
    } else {
      fill(0); // Negro
    }
  
    // Establecer el color del trazo a blanco
    stroke(255);
  
    // Configurar el trazo para que esté en el exterior del texto
    strokeOutside(mouseX > 200 ? 200 : mouseX);
  
    // Configurar la fuente y el tamaño del texto
    textFont(font);
    textSize(180);
  
    // Dibujar el texto
    text(texto, 340, 450);
    pop()
  }
  
function iniciarAmorfo () {
texto = "amorfo"

mostrarAmorfo()
}
function iniciarVeneno () {
  push()
  //translate(380, 400)
  image(img1,0,0)
  texto = "veneno"
   // Colocar puntos en el borde del texto y crear vehículos
   vehicles = [];
   let points = font.textToPoints(texto, 310, 450, 190);
   for (let i = 0; i < points.length; i++) {
     let pt = points[i];
     let vehicle = new Vehicle(pt.x, pt.y);
     vehicles.push(vehicle);
   }
  mostrarVeneno()
  pop()
  }

  function reiniciarPagina () {
    window.location.reload();
    
  }

  function tomarCaptura() {
    // Toma un screenshot del lienzo y lo convierte en una URL de datos
    var screenshot = getCanvasScreenshot();
    
    // Crea un enlace de descarga y simula el clic para que el usuario descargue la captura de pantalla
    var enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = screenshot;
    enlaceDescarga.download = 'captura_pantalla.png'; // Nombre del archivo a descargar
    enlaceDescarga.click();
  }
  
  function getCanvasScreenshot() {
    // Obtiene los datos de la imagen del lienzo como una URL de datos
    return canvas.toDataURL('image/png');
  }