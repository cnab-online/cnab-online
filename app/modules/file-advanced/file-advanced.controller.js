class FileAdvancedController {

  constructor($scope, linesResponse) {
    let lines = [];

    let linePos = 0;

    console.log('linesResponse => ', linesResponse);

    for(let line of linesResponse.data) {
        lines.push({
            'title': (++linePos) + 'ª Linha',
            'raw_text': line.attributes.raw_text,
            'identified_fields': line.attributes.identified_fields
        });
    }

    console.log('lines => ', lines);

    $scope.lines = lines;
  }

}

export default FileAdvancedController;