(function(){
  var chart;
  var data = ['sentiment'];


  function getSentiment(str, cb) {
    var opts = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({data:str})
    };
    fetch('api', opts)
      .then(function(data){
        return data.json();
      })
      .then(function (data) {
        cb(str, data.score);
      }).catch(function (error) {
        console.log('error', error);
      });
  };

  function displayChart(data){
    chart = c3.generate({
      bindto: "#timeseries-chart",
        data: {
          columns: [
            ['sentiment'].concat(data)
          ]
        }
    });
  };


  function tableRow(str, sentiment) {
    var row = $('<tr/>');
    //TODO: make better
    row.html('<td>' + sentiment + '</td><td>' + str + '</td>');
    return row;
  };


  function init(){
    displayChart([]);
    //TODO: extract this into it's own function
    $('button').on('click', function() {
      var tBody = $('tbody');
      var textArea = $('textarea');
      //TODO:clean up the input
      var input = textArea.val().split('.');
      textArea.val('');
      function walk(str) {
        getSentiment(str, function(str, sentiment){
          tBody.append(tableRow(str, sentiment));
          data.push(sentiment);
          chart.load({columns: [data]});
          if (input.length) walk(input.shift());
        });
      }
      walk(input.shift());
    });
  };


  $(document).ready(function(){ init() });


})();

