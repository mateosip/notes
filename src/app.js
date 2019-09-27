import yargs from 'yargs';
import fs from 'fs';
import uuid from 'uuid';


const path = './notas.txt';

let obj;

fs.access(path, fs.F_OK, (err) =>{
    if (err){ //Si no existe el archivo
        fs.writeFileSync("notas.txt");//Crea uno vacio
    }
    const data = fs.readFileSync("notas.txt").toString();//Leo lo que contiene el fichero y lo convierto en String
    
    if(data !== ""){
        obj = JSON.parse(data);//me construyo el objeto
    }else{//Si no hay nada me creo le objeto con un array de notas pero vacío.
        obj = {
            notes: [

            ]
        };
    }
    yargs.parse();
    fs.writeFileSync("notas.txt",JSON.stringify(obj));//Escribimos en el fichero
})
const add = function(arg){ //Función para añadir notas
  const nota = {
    uuid: uuid.v4(), //Generacion automatica de id.
    title: arg.title, //Titulo = captura por teclado
    body: arg.body, //Cuerpo = captura por teclado
    author: arg.author, //Autor = captura por teclado
  };

  obj.notes.push(nota);//Introducimos nueva nota en el array
  console.log(`Se ha añadido la nota: ${nota.title}`);
}

const list = function(){
    obj.notes.forEach(function(note,i){ //Recorremos todo el array de notes
        console.log(i,note.title);  //Mostramos los indices y el título de cada nota
    })
}

const read = function(arg){
    obj.notes.forEach(function(note,i){
        if(i === arg.index){
            console.log(note.body);
        }
    })
}

const remove = function(arg){
    obj.notes.forEach(function(note,i){
        if(i === arg.index){
            obj.notes.splice(i,1);
        }
    })
}
//Creamos el comando add.

yargs.command({

  command: 'add',
  describe: 'Anadir una nueva nota',
  builder: {
    title: {
      describe: 'Titulo',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo',
      demandOption: true,
      type: 'string',
    },
    author: {
      describe: 'Autor',
      demandOption: true,
      type: 'string',
    },
  },
  handler: add,
});
yargs.command({
    command: 'list',
    describe: 'Listar todas las notas',
    handler: list,
});  

yargs.command({
    command: 'read',
    describe: 'Leyendo nota',
    builder: {
        index: {
            describe: "indice",
            demandOption: true,
            type: "int",
        }
    },
    handler: read,
})

yargs.command({
    command: 'remove',
    describe: 'Eliminando nota',
    builder: {
        index: {
            describe: "indice",
            demandOption: true,
            type: "int",
        }
    },
    handler: remove,
})