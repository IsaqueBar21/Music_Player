//VARIAVEIS---------------------

//aqui criaremos uma variavel para armazenar as musicas transformando-as em objetos para armazenar os dados de cada uma (IMAGEM, NOME DA MUSICA E NOME DO ARTISTA)
let musicas = [
  {
    titulo: "5 Mentes",
    artista: "MC Davi e MC Pedrinho - (Funk)",
    src: "musicas/MC Davi e MC Pedrinho - 5 Mentes.mp3",
    img: "imagens/Funk.jpg",
  },

  {
    titulo: "Negro Drama",
    artista: "Racionais Mcs - (Rap)",
    src: "musicas/Racionais Mcs Negro Drama.mp3",
    img: "imagens/Rap.jpg",
  },

  {
    titulo: "Pisando Descalço",
    artista: "Maneva - (Reggae)",
    src: "musicas/Maneva - Pisando Descalco.mp3",
    img: "imagens/Reggae.jpg",
  },

  {
    titulo: "Tá Escrito",
    artista: "Grupo Revelação - (Samba)",
    src: "musicas/Grupo Revelacao - Ta Escrito.mp3",
    img: "imagens/Samba.jpg",
  },

  {
    titulo: "Flor e o beija-flor",
    artista: "Henrique e Juliano part Marilia Mendonça - (Sertanejo)",
    src: "musicas/Henrique e Juliano - Flor E O Beija-Flor part Marilia Mendonca.mp3",
    img: "imagens/Sertanejo.jpg",
  },
];

//aqui criamos uma variavel para a musica
let musica = document.querySelector("audio");
//aqui criaremos uma variavel para o index das infos das musicas começar a partir da numero 0 - que na lista é a primeira.
let indexMusica = 0;
//aqui criamos uma variavel para o minuto final da musica em formato de hora
let duracaoMusica = document.querySelector(".fim");
//aqui criamos uma variavel para as imagens e nome da musica e nome dos artistas
let imagem = document.querySelector("img");
let nomeMusica = document.querySelector(".descricao h2");
let nomeArtista = document.querySelector(".descricao i");

renderizarMusica(indexMusica);

//EVENTOS----------------------
//aqui selecionamos a classe do botao de play e adicionamos um evento de clique e denominamos o nome da função
document.querySelector(".botao-play").addEventListener("click", tocarMusica);
//aqui selecionamos a classe do botao de pause e adicionamos um evento de clique e denominamos o nome da função
document.querySelector(".botao-pause").addEventListener("click", pausarMusica);
//aqui vamos criar um evento para verificar se a musica esta tocando ou nao
musica.addEventListener("timeupdate", atualizarBarra);
//aqui iremos criar um evento para a seta anterior com uma função anonima (sem nome) que so sera executada a partir do clique
document.querySelector(".anterior").addEventListener("click", () => {
  indexMusica--;
  if (indexMusica < 0) {
    indexMusica = 4;
  }
  renderizarMusica(indexMusica);
});
//aqui iremos criar um evento para a seta proxima com uma função anonima (sem nome) que so sera executada a partir do clique
document.querySelector(".proxima").addEventListener("click", () => {
  indexMusica++;
  if (indexMusica > 4) {
    indexMusica = 0;
  }
  renderizarMusica(indexMusica);
});

//FUNÇÕES--------------------------
//aqui criaremos a funcao que trocara as informações da musica junto com o clique nos botoes de anterior ou proxima
function renderizarMusica(index) {
  //estamos mudando o atributo src da tag audio no HTML atraves do JS, 'puxando' a proxima musica
  musica.setAttribute("src", musicas[index].src);
  //add um evento que carregara uma função anonima enquanto a musica esta sendo baixada
  musica.addEventListener("loadeddata", () => {
    //aqui efetuaremos as trocas dos dados de cada musica enquanto cada musica esta sendo baixada
    nomeMusica.textContent = musicas[index].titulo;
    nomeArtista.textContent = musicas[index].artista;
    imagem.src = musicas[index].img;
    duracaoMusica.textContent = segundosParaMinutos(
      Math.floor(musica.duration)
    );
  });
}

//aqui criamos a função play
function tocarMusica() {
  //para dar play na musica precisamos pegar a variavel musica e add .play()
  musica.play();
  //para dar pause precisamos primeiro selecionar o botão de pause e depois alteramos o display dos botoes de pause e play, trocando as visibilidades
  document.querySelector(".botao-pause").style.display = "block";
  document.querySelector(".botao-play").style.display = "none";
}

//aqui criamos a função pause
function pausarMusica() {
  //para dar pause na musica precisamos pegar a variavel musica e add .pause()
  musica.pause();
  //para dar play novamente precisamos primeiro selecionar o botão de play e depois alteramos o display dos botoes de pause e play, trocando as visibilidades, como feito anteriormente só que inverso.
  document.querySelector(".botao-pause").style.display = "none";
  document.querySelector(".botao-play").style.display = "block";
}

//aqui criamos a função de progresso da barra do player
function atualizarBarra() {
  //variavel que representa a barra do player no HTML
  let barra = document.querySelector("progress");
  //para que a barra siga o tempo da musica precisamos modificar o estilo da barra, atraves da divisao da duração da musica pelo segundo que ela foi pausada e atraves da operação do proprio javascript MATH.FLOOR, automaticamente o numero arredonda para o numero inteiro mais proximo, dando mais exatidão a porcentagem
  barra.style.width =
    Math.floor((musica.currentTime / musica.duration) * 100) + "%";
  //variavel que vai representar os minutos em que está a duração da musica e selecionamos a tag que representa os numeros de inicio da musica no HTML
  let tempoDecorrido = document.querySelector(".inicio");
  //agora mudaremos o conteudo da variavel para os segundos atuais da musica
  tempoDecorrido.textContent = segundosParaMinutos(
    Math.floor(musica.currentTime)
  );
}

//aqui criaremos uma função que irá converter o tempo mostrado em segundos po um mostrado em minutos e por parametro ira receber o tempo em segundos
function segundosParaMinutos(segundos) {
  //criaremos uma variavel para mostrar o temporizador em formato de hora. EX: 0:50
  //e dividiremos os segundos por 60 para mostrar quantos minutos ja foram executados
  let campoMinutos = Math.floor(segundos / 60);
  //aqui criamos outra variavel que armazenara os segundos
  //e pegaremos o resto da divisao dos segundos por 60 pois assim o tempo contara ate 60seg corretamente.
  let campoSegundos = segundos % 60;
  //essa condição organizara o segundo numeral do tempo da musica.
  if (campoSegundos < 10) {
    campoSegundos = "0" + campoSegundos;
  }
  //e esta retornando o valor em formato de hora corretamente

  return campoMinutos + ":" + campoSegundos;
}
