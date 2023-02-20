const fs = require('fs');
const mongoose = require('mongoose');

let fichero = fs.readFileSync('./peliculas.json');

let fichero2 = JSON.parse(fichero);

//de esta forma separamos las peliculas y los directores de el json, para porder trabajar mejor y mas comodo
let peliculas=fichero2.films

let directores=fichero2.directors

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/peliculas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.set('strictQuery', true);


//apartado peliculas
//esquema
let peliculaSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        minlength: 1,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    year: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    director_id: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    }
});



//modelo
// let Pelicula = mongoose.model('films', peliculaSchema);


// peliculas.forEach(datos => {
//     let pelicula = new Pelicula();
//     pelicula.id = datos.id;
//     pelicula.title = datos.title;
//     pelicula.year = datos.year;
//     pelicula.director_id = datos.director_id;
//     pelicula.save().then(resultado => {
//         console.log("Contacto añadido:", resultado);
//     }).catch(error => {
//         console.log("ERROR añadiendo contacto");
//     });
// });








//apartado directores
//esquema
let directorSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        minlength: 1,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    films: {
        type: Array,
        required: true,
        minlength: 1,
        trim: true
    },

});



//modelo
// let Director = mongoose.model('directors', directorSchema);


// directores.forEach(datos => {
//     let director = new Director();
//     director.id = datos.id;
//     director.name = datos.name;
//     director.films = datos.films;
   
//     director.save().then(resultado => {
//         console.log("Contacto añadido:", resultado);
//     }).catch(error => {
//         console.log("ERROR añadiendo contacto");
//     });
// });




//funciones pra listar las peliculas en el html
let pelicula = mongoose.model('films', peliculaSchema)


let cat = ''



let representaPeliculas = (peliculas) => {
    cat=""

    for (let s = 0; s < peliculas.length; s++) {
        cat += '<div> <x-box vertical>  <x-label><strong> Titulo: ' + peliculas[s].title + '<br> Year: ' + peliculas[s].year +  '<br> id del director: ' + peliculas[s].director_id +'</x-label>        </x-box></div>'
    }
    document.getElementById('peliculas').innerHTML = cat
}


let buscarPel = () => {
    pelicula.find().then(resultado => {
        representaPeliculas(resultado);

    }).catch(error => {
        console.log("ERROR en find");
    });
}






//funciones pra listar los directores en el html
let director = mongoose.model('directors', directorSchema)


let cat2 = ''



let representaDirectores = (directores) => {
    cat2=""

    for (let h = 0; h < directores.length; h++) {
        cat2 += '<div> <x-box vertical>  <x-label><strong>Nombre: ' + directores[h].id + ' ' + directores[h].name +  '<br> Ids de sus peliculas: ' + directores[h].films +'</x-label>        </x-box></div>'
    }
    document.getElementById('directores').innerHTML = cat2
}


let buscarDir = () => {
    director.find().then(resultado => {
        representaDirectores(resultado);

    }).catch(error => {
        console.log("ERROR en find");
    });
}


//llamamos a las funciones creadas anteriormente
buscarPel(pelicula)
buscarDir(director)
// Chovi