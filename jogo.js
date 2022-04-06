var rodada=1;
var matrizJogo = Array(3);

matrizJogo['a'] = Array(3);
matrizJogo['b'] = Array(3);
matrizJogo['c'] = Array(3);

matrizJogo['a'][1]=0;
matrizJogo['a'][2]=0;
matrizJogo['a'][3]=0;
matrizJogo['b'][1]=0;
matrizJogo['b'][2]=0;
matrizJogo['b'][3]=0;
matrizJogo['c'][1]=0;
matrizJogo['c'][2]=0;
matrizJogo['c'][3]=0;

$(document).ready( function(){
	$('#btn-iniciar-jogo').click( function(){
		if($('#inserir-nome-jogador1').val() == ''){
			alert("Insira o nome do jogador 1");
			return false;
		}
		if($('#inserir-nome-jogador2').val() == ''){
			alert("Insira o nome do jogador 2");
			return false;
		}

		$('#nome-jogador1').html($('#inserir-nome-jogador1').val());
		$('#nome-jogador2').html($('#inserir-nome-jogador2').val());

		$('#pagina-inicial').hide();
		$('#palco-jogo').show();


	})

	$('.jogada').click(function(){
		var idCampoClicado = this.id;
		jogada(idCampoClicado);
		$('#' + idCampoClicado).off();
	})

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if(rodada%2){
			icone = 'url("imagens/marcacao_1.png")';
			ponto = 1;
		} else{
			icone = 'url("imagens/marcacao_2.png")';			
			ponto = -1;
		}

		rodada++;

		$('#'+id).css('background-image', icone);

		var linhaColuna = id.split('-');

		matrizJogo[linhaColuna[0]][linhaColuna[1]]=ponto;
		situacaoJogo();
	}

	function situacaoJogo(){
		var soma=0;

		//horizontal
		for(var i=1;i<=3;i++){
			soma=soma+matrizJogo['a'][i];
		}
		ganhador(soma);

		soma=0;
		for(var i=1;i<=3;i++){
			soma=soma+matrizJogo['b'][i];
		}
		ganhador(soma);

		soma=0;
		for(var i=1;i<=3;i++){
			soma=soma+matrizJogo['c'][i];
		}
		ganhador(soma);

		//vertical
		for(var j=1;j<=3;j++){
			soma=0;
			soma+= matrizJogo['a'][j];
			soma+= matrizJogo['b'][j];
			soma+= matrizJogo['c'][j];
			ganhador(soma);
		}

		//diagonal
		soma=0;
		soma=matrizJogo['a'][1]+matrizJogo['b'][2]+matrizJogo['c'][3];
		ganhador(soma);

		soma=0;
		soma=matrizJogo['a'][3]+matrizJogo['b'][2]+matrizJogo['c'][1];
		ganhador(soma);

		if(rodada==10){
			alert('Deu velha! Atualize a página para jogar novamente');
		}
	}

	function ganhador(soma){
		if (soma==3){
			alert($('#inserir-nome-jogador1').val() +' venceu!!! Atualize a página para jogar novamente');
			$('.jogada').off();
		} else if (soma==-3){
			alert($('#inserir-nome-jogador2').val() +' venceu!!!  Atualize a página para jogar novamente');
			$('.jogada').off();
		}
	}

})