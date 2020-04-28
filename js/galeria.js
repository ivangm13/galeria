var seccionGaleria = document.querySelector('.galeria');
var seccionCategorias = document.querySelector('.categorias ul');
var numeroCategorias = 1;
var categoriaActual = 1;

function cargarDatos(pTipo) {

    let url = "https://jsonplaceholder.typicode.com/" + pTipo;
    var pedido = new XMLHttpRequest;
    pedido.open('GET', url, true);
    pedido.send();
    pedido.addEventListener('load', recogerDatos);
}

function recogerDatos(event) {
    let texto = event.target.responseText;
    let album = JSON.parse(texto);
    pintarAlbum(album);
}
cargarDatos('photos');

//order category para ordenar las categorias

function orderCategory(pAlbum) {
    let numeroCategoria = 1;
    let listaPhotos = new Object();
    let categoriaParcial = new Array();
    for (let i = 0; i < 250; i++) {
        if (pAlbum[i].albumId == numeroCategoria) {
            categoriaParcial.push(pAlbum[i]);
        }
    }
    listaPhotos['categoria' + numeroCategoria] = categoriaParcial;
    console.log(listaPhotos);
}




//pintar en el interfaz

function pintarAlbum(pListaAlbumes) {
    seccionGaleria.innerHTML = "";
    for (let i = 0; i < 250; i++) {

        if (categoriaActual != pListaAlbumes[i].albumId) {
            categoriaActual = pListaAlbumes[i].albumId;
            numeroCategorias++;
        }
        seccionGaleria.innerHTML += '<div class="categoria' + pListaAlbumes[i].albumId + '"><img  src="' + pListaAlbumes[i].thumbnailUrl + '" </div>'
    }
    pintarListadoCategorias();
}

function pintarListadoCategorias() {
    
    for (let i = 1; i <= numeroCategorias; i++) {
        seccionCategorias.innerHTML += '<li data-id ="'+ i +' "onclick="mostrarCategoria(this)" ">Categoria ' + i + '</li>';
    }
}
function mostrarCategoria(pThis) {
    let imagenes = document.querySelectorAll('.imagenes');
    let categoria = 'categoria' + pThis.dataset.id;

    for (imagen of imagenes) {
        if (imagen.classList[1] != categoria) {
            imagen.style.display ="none";
        }else{
            imagen.style.display ="block";
            
        }
    }
}