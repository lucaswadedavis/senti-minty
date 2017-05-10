(function(){
  var chart;
  var data = ['sentiment'];


  function getSentiment(str, cb) {
    var sentiment = Math.random();
    cb(str, sentiment);
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
    row.html('<td>' + sentiment + '</td><td>' + str + '</td>');
    return row;
  };


  function init(){
    displayChart([]);
    $('button').on('click', function() {
      var textArea = $('textarea');
      var input = textArea.val();
      input = input.split('.');
      textArea.val('');
      for (var i = 0; i < input.length; i++) {
        getSentiment(input[i], function(str, sentiment){
          $('tbody').append(tableRow(str, sentiment));
          data.push(sentiment);
          chart.load({columns: [data]});
        });
      }
    });

    setTimeout(function() {
      chart.load({
        columns: [data]
      });
    }, 1000);
  };


  $(document).ready(function(){ init() });


})();

