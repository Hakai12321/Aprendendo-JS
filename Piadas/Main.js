import { Piada } from "./Piadas.js";
import { Categoria } from "./Categorias.js";


var piadas = [
  // Homem-Aranha
  new Piada(
    "Essa piada é nichada",
    "tururururuur tututut tuuuuuuuuu",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1STnhI_Uz6yjxQWOHn6ySEjC1SpYDGRMoGY1lx_DHC7O9azR7GAYRZl8&s=10",
    new Categoria("Homem-Aranha")
  ),
   new Piada(
    "Eis Que Você é o Arthur Aranha",
    "-Alexa ligar para amigos \n -Amigos não detectados \n -Alexa ligar para peões \n -Ok chefe ",
    "https://media1.tenor.com/m/tPwUkYdFXO0AAAAC/checkmate-ayanokoji.gif",
    new Categoria("Homem-Aranha"),
    "9Zj0JOHJR-s",
    87
  ),

  // Sul e meu pais
   new Piada(
    "Geração Nova",
    "A música que representa a geração do bufos é hey it's me it's verity ask me anything",
    "https://media.tenor.com/mjWIRXS6K6oAAAAM/verity-verity-minecraft.gif",
    new Categoria("Bufos"),
    "tVlKLpxyCBY",
    1
  ),


  // Escadas
  new Piada(
    "Subir escadas é fácil",
    "Difícil é lembrar que você esqueceu algo lá embaixo.",
    "img/daniel.png",
    new Categoria("Escadas")
  ),
  new Piada(
    "Por que a escada foi promovida?",
    "Porque ela estava sempre subindo na vida.",
    "img/daniel.png",
    new Categoria("Escadas")
  ),
  new Piada(
    "Qual é o maior medo de uma escada?",
    "Ter uma crise de degraus.",
    "img/daniel.png",
    new Categoria("Escadas")
  ),

  // Animais
  new Piada(
    "O que o pato disse para a pata?",
    "Vem Quá!",
    "https://media.zenfs.com/en/know_your_meme_909/4e43626097ba78ca1322d518f3938cde.jpg",
    new Categoria("Animais")
  ),
  new Piada(
    "Qual é o cúmulo da paciência?",
    "Um caracol esperando o ônibus.",
    "https://media.zenfs.com/en/know_your_meme_909/4e43626097ba78ca1322d518f3938cde.jpg",
    new Categoria("Animais")
  ),
  new Piada(
    "Por que o peixe vive na água salgada?",
    "Porque na pimenta ele espirra.",
    "https://media.zenfs.com/en/know_your_meme_909/4e43626097ba78ca1322d518f3938cde.jpg",
    new Categoria("Animais")
  ),
  new Piada(
    "Qual animal é o melhor em matemática?",
    "A cobra, porque ela sabe somar, diminuir e... víbora!",
    "https://media.zenfs.com/en/know_your_meme_909/4e43626097ba78ca1322d518f3938cde.jpg",
    new Categoria("Animais")
  ),

  // Trocadilhos
  new Piada(
    "O que a vaca foi fazer no espaço?",
    "Procurar o Vácuo.",
    "img/cachorro.jfif",
    new Categoria("Trocadilhos")
  ),
  new Piada(
    "O que o tomate foi fazer no banco?",
    "Tirar extrato.",
    "img/cachorro.jfif",
    new Categoria("Trocadilhos")
  ),
  new Piada(
    "Qual é o fim da picada?",
    "Quando o mosquito vai embora.",
    "img/cachorro.jfif",
    new Categoria("Trocadilhos")
  ),
];

// ---------- Interface ----------
const selectCategoria = document.getElementById("selectCategoria");
const btnPiada = document.getElementById("btnPiada");
const cardPiada = document.getElementById("cardPiada");
const imgPiada = document.getElementById("imgPiada");
const badgeCategoria = document.getElementById("badgeCategoria");
const tituloPiada = document.getElementById("tituloPiada");
const textoPiada = document.getElementById("textoPiada");
const areaMusica = document.getElementById("areaMusica");
const volume = document.getElementById("volume");
let player = null;

// Lista que vai guardar os nomes das categorias
let nomesCategorias = [];

for (let i = 0; i < piadas.length; i++) {
  let nome = piadas[i].categoria.nome;
  if (!nomesCategorias.includes(nome)) {
    nomesCategorias.push(nome);
  }
}

// Cria uma option no select para cada nome
for (let i = 0; i < nomesCategorias.length; i++) {
  let option = document.createElement("option");
  option.value = nomesCategorias[i];
  option.textContent = nomesCategorias[i];
  selectCategoria.appendChild(option);
}

// Sorteia um item de uma lista
function sortear(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

// Toca a música (cria o player na primeira vez, depois só troca o vídeo)
function tocarMusica(codigo, inicio) {
  areaMusica.classList.remove("d-none");

  if (player === null) {
    player = new YT.Player("playerMusica", {
      width: 300,
      height: 170,
      videoId: codigo,
      playerVars: { autoplay: 1, start: inicio },
      events: {
        onReady: function (evento) {
          evento.target.setVolume(volume.value);
        },
      },
    });
  } else {
    player.loadVideoById({ videoId: codigo, startSeconds: inicio });
  }
}

// Para a música e esconde o player
function pararMusica() {
  areaMusica.classList.add("d-none");
  if (player !== null) {
    player.pauseVideo();
  }
}

// Quando mexer na barra, muda o volume
volume.addEventListener("input", function () {
  if (player !== null) {
    player.setVolume(volume.value);
  }
});

// Mostra a piada no card
function mostrarPiada() {
  let nomeEscolhido = selectCategoria.value;
  let lista = [];

  if (nomeEscolhido === "") {
    // Nenhuma categoria escolhida: usa todas as piadas
    lista = piadas;
  } else {
    // Categoria escolhida: separa só as piadas dela
    for (let i = 0; i < piadas.length; i++) {
      if (piadas[i].categoria.nome === nomeEscolhido) {
        lista.push(piadas[i]);
      }
    }
  }

  let piada = sortear(lista);

  imgPiada.src = piada.imagem;
  badgeCategoria.textContent = piada.categoria.nome;
  tituloPiada.textContent = piada.titulo;
  textoPiada.textContent = piada.texto;

  cardPiada.classList.remove("d-none");
  if (piada.musica !== "") {
    tocarMusica(piada.musica, piada.inicio);
  } else {
    pararMusica();
  }
}

btnPiada.addEventListener("click", mostrarPiada);