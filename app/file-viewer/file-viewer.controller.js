let name = 5;

class FileViewerController {

	constructor($scope) {
		this.boletos = [
			{'nosso_numero': '100', 'tipo': 'Baixa de Título'},
			{'nosso_numero': '101', 'tipo': 'Baixa de Título'},
			{'nosso_numero': '102', 'tipo': 'Baixa de Título'},
			{'nosso_numero': '103', 'tipo': 'Baixa de Título'},
			{'nosso_numero': '104', 'tipo': 'Baixa de Título'},
		];

		this.coluna_boletos = [
			[],
			[]
		];

		angular.forEach(this.boletos, (boleto, index) => {
			this.coluna_boletos[index % 2 ? 1 : 0].push(boleto);
		});
	}

}

export default FileViewerController;