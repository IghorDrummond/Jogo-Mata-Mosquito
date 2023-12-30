//Declaração de Variaveis
//Elementos
var Selecionado = document.getElementById('Selecao')
var telaJogar = document.getElementById('tela_jogo')
var telaEntrada = document.getElementById('tela_entrada')
var mosquito = document.getElementById('mosquito')
var amostrador = document.getElementById('rodape')
var textoAmos = document.getElementsByTagName('h5')
var telaSecundaria = document.getElementById('tela_secundaria')
var coracao = document.getElementsByClassName('coracao')
var tituloImage = document.getElementById('tituloImagem')
//Objetos
var somFundo = [new Audio('audio/musicbg.mp3'), new Audio('audio/splash.mp3')]
//String
var Modo = ''
//Numerico
var Tempo = 0
var altura = 0
var largura = 0
var velocidade = 0
var kill = 0
var score = -1
//Array
var TelaEspaco = [0, 0]
//Booleana
var validaGame = true
//Funções Anônimas
var apresentaTela = function(final){
	var textoScore = document.getElementById('Score')

	//Desliga a Tela do Jogo
	telaJogar.style.display = 'none'
	amostrador.style.display = 'none'

	//Define o Titulo em Imagem
	switch(final){
		case 'V':
			tituloImage.src = 'img/vitoria.png'
			break;
		case 'D':
			tituloImage.src = 'img/game_over.png'
			break
	}
	//Adiciona o Score na Tela Final
	textoScore.innerHTML = 'Seu Score: ' + score.toString()
	//Ativa Tela Secundaria com o Titulo Desejado!
	telaSecundaria.style.display = 'block'	
}

//============================== Funções =========================\\
/*
Função: Dificuldade()
Motivo: Altera o Modo escolhido pelo usuario
Data: 29/12/2023
Programador(a): Ighor Drummond
*/
function Dificuldade(){
	//Recebe o o valor Selecionado do Modo
	Modo = Selecionado.value

	//Valida se o modo de jogo ja foi selecionado
	if(Modo != '' && Modo != 'Selecione Uma Dificuldade'){
		//Filtra o Modo 
		switch(Modo){
			case 'easy':
				Tempo = 100
				velocidade = 2000
				break
			case 'normal':
				Tempo = 150
				velocidade = 1500
				break
			case 'hard':
				Tempo = 200
				velocidade = 1000
				break		
		}
	}	
}

/*
Função: Jogar()
Motivo: Inicia o Jogo após ter sido escolhido a Dificuldade
Data: 29/12/2023
Programador(a): Ighor Drummond
*/
function Jogar(){
	var interval = null

	if(Modo != '' && Modo != 'Selecione Uma Dificuldade'){
		//Desliga a Tela de Entrada em Estilo Animado
		telaEntrada.style.animation = 'desligandoTela 1s'
		//Ativa Musica do Jogo de Fundo
		somFundo[0].play()
		somFundo[0].loop = true

		//Desativa a Tela de Entrada
		setTimeout(function(){
			telaEntrada.style.display = 'none'
			telaJogar.style.display = 'block'
		}, 900)

		//Ativa mostrador e o mosquito
		amostrador.style.display = 'block'

		//Entra na Logica do Jogo	
		interval = setInterval(function(){
			//Adiciona o Tempo para a Tag P
			textoAmos[0].innerHTML = 'Tempo Restante: ' + Tempo.toString()
			
			//Verifica se a Mosca foi Morta
			if(validaGame == false){
				coracao[kill].src = 'img/coracao_vazio.png'				
				kill += 1//Caso a Mosca não for morta, apaga um coração				
			}else{
				score += 1//Adiciona pontos a cada morte efetuada
				textoAmos[1].innerHTML = 'Seu Score: ' + score.toString()//Apresenta seu Score
			}

			//Reseta Valida Game
			validaGame = false
			//Reseta a Imagem do Sangue
			mosquito.src = 'img/mosca.png'
			tamanhoTela()//Verifica o Tamanho da Tela

			//Recebe a altura e largura da tela atual além de sortear a posição Y e X
			largura = sorteiaPosicao(TelaEspaco[0])  - mosquito.clientWidth 
			altura = sorteiaPosicao(TelaEspaco[1]) - mosquito.clientHeight

			//Caso os valores forem negativos, ele converte em positivo
			if(largura < 0){
				largura *= -1
			}
			if(altura < 0){
				altura *= -1
			}	

			//Posiciona o Mosquito em um canto da tela aleatorio De acordo com o tamanho da tela
			mosquito.style.top = altura + 'px'
			mosquito.style.left = largura + 'px'
			//Exibe o Mosquito
			mosquito.style.display = 'block'

			if(Tempo === 0 && kill <= 1){
				apresentaTela('V')
				clearInterval(interval)//Saí da Logica
			}
			if(Tempo >= 0 && kill == 3){
				apresentaTela('D');
				clearInterval(interval)//Saí da Logica
			}

			//Decrementa o Tempo 
			Tempo--
		}, velocidade)
	}else{
		alert('Selecione um Modo de Dificuldade Antes de Jogar!')
	}
}

/*
Função: tamanhoTela()
Motivo: reajusta as coordernadas de aparecimento da mosca de acordo com o tamanho da tela
Data: 29/12/2023
Programador(a): Ighor Drummond
*/
function tamanhoTela(){
	//Recebe os valores do tamanho da tela atual
	TelaEspaco[0] = telaJogar.clientWidth
	TelaEspaco[1] = telaJogar.clientHeight
}

/*
Função: sorteiaPosicao(Valor maximo)
Motivo: sorteia uma posição determinado o valor de 0 até o limite   
Data: 29/12/2023
Programador(a): Ighor Drummond
*/
function sorteiaPosicao(limite){
	var ret = 0

	ret = parseInt(Math.random() * limite)//Sorteia um numero de 1 até o numero o limite definido
	return ret//Retorna o Valor Sorteado
}

/*
Função: morto()
Motivo: recebe a kill feita pelo jogador
Data: 29/12/2023
Programador(a): Ighor Drummond
*/
function morto(){
	//Valida a Morte do Mosquito para não perde coração
	validaGame = true

	//Após apertar em cima do Mosquito, sangue aparecerá e emitirá o som
	somFundo[1].play()
	mosquito.src = 'img/sangue.png'
}

/*
Função: operacao(Escolha da Operacao)
Motivo: recebe se o jogo será reiniciado ou finalizado
Data: 29/12/2023
Programador(a): Ighor Drummond
*/
function operacao(opc){

	switch(opc){
		case 'R':
			window.location.reload()
			break
		case 'S':
			close()
			break	
	}
}