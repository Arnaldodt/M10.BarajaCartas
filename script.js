class carta{
    clasificacion= ["corazones","tréboles","diamantes","picas"];
    cadena = ["as","dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez","J","Q","K"];
    numero = [1,2,3,4,5,6,7,8,9,10,11,12,13];

    mostrar = function(i,x){
        console.log(`carta:: ${this.clasificacion[i]} ${this.numero[x]} ${this.cadena[x]}`);
    };
    retornaCarta = function(i,x){
        return `carta:: ${this.clasificacion[i]} ${this.numero[x]} ${this.cadena[x]}`;
    };
};

console.log('------------------------------------------------------------');
let cartas = new carta();
cartas.mostrar(3,4);

class baraja extends carta{
    mazo = [];

    constructor(){
        super();
        this.restablecer();
        // this.mezclar();
    };

    restablecer = function(){
        this.mazo = new Array;
        for (let i=0 ; i<this.clasificacion.length ; i++){
            for (let x=0 ; x<this.numero.length ; x++){
                // this.mazo.push({"c":i,"n":x,"r":"n"});

                this.mazo.push({"c": this.retornaCarta(i,x) ,"r":"n"});
            }
        }
    };

    mezclar = function(){
        let newarray = new Array;
        let pos;
        do{
            pos = Math.floor(Math.random() * this.mazo.length);
            let esta= false;
            for (let i=0 ; i<newarray.length ; i++){
                if (this.mazo[pos] === newarray[i]){
                    esta = true;    
                }
            }
            if (esta === false){
                newarray.push(this.mazo[pos]);
            }
        }while(newarray.length != this.mazo.length)

        this.mazo = newarray
    };

    repartir = function(){
        let pos
        do{
            pos = Math.floor(Math.random() * this.mazo.length); 
        }while (this.mazo[pos].r === 's')
        
        this.mazo[pos].r ='s';
        return this.mazo[pos];
    };
};

console.log('------------------------------------------------------------');
let mazo = new baraja();
console.log(mazo.mazo)

mazo.mezclar();
console.log(mazo.mazo)

let cartaRep = mazo.repartir();
console.log(cartaRep);

class jugador extends baraja{
    nombre;
    mano=[];
    constructor(nombre,nroCartas){
        super();
        this.nombre = nombre;
        console.log("-- gene --");
        this.mano = new Array;
        for (let i=0 ; i<nroCartas ; i++){
            let carta = this.repartir();
            console.log(carta);
            this.mano.push({"c":carta.c,"r":"n"});
        }
    };
    tomarCarta = function(){
        console.log("-- toma --");
        let carta = this.repartir();
        console.log(carta);
        this.mano.push({"c":carta.c,"r":"n"});
    };
    descartarCarta = function(carta){
        console.log("-- desc " + carta +  " --");
        for (let i=carta ; i<this.mano.length-1 ; i++){
            this.mano[i] =this.mano[i+1];

            console.log(this.mano[i]);
        }
        this.mano.pop();
    }
};

console.log('------------------------------------------------------------');
let jugar = new jugador("Arnaldo",7)
jugar.tomarCarta();
jugar.descartarCarta(3);

console.log("-- mano final --");
console.log(jugar.mano);