$().ready(function () {

 $.ajax({
    type: "get",
    url : '/documentos/?',
    success: function(data, status) {

      for (var i = 0; i < data.length; i++) {
          var cont = i + 1;
          var docfile = split_name(data[i].fields.docfile);
          var data_f = formatar_data(data[i].fields.data_envio);
          var detalhe = detalhe_arquivo(data[i].pk, docfile);
          $("#empresas_td")
            .append(
            "<tr id='rrremove'>"+
              "<td>"+ cont +"</td>"+
              "<td>"+ detalhe +"</td>"+
              "<td>"+ data[i].fields.empresa +"</td>"+
              "<td>"+ data[i].fields.layout +"</td>"+
              "<td>"+ data_f +"</td>"+
            "</tr>"
          );
           $("#search").click(function () {
             $("#rrremove").remove();
           };
      }
    },
    error: function(data, status) {
        alert("Nenhum dado foi encontrado");
    },
  });

   $('#search').click(function() {
      var empresa =  $('#select_empresa option:selected').attr('value');
      var layout = $('#select_layout option:selected').attr('value');
      var data_in = $('#data_in').val();
      var data_ou = $('#data_ou').val();
      var status_f = $('#select_status option:selected').attr('value');

      $.ajax({
          type: "get",
          url : '/search/?',
          data : {
            empresa : empresa, layout: layout,
            data_in: data_in, data_ou: data_ou,
          },
          success: function(data, status) {

            for (var i = 0; i < data.length; i++) {
                var cont = i + 1;
                var docfile = split_name(data[i].fields.docfile);
                var data_f = formatar_data(data[i].fields.data_envio);
                var detalhe = detalhe_arquivo(data[i].pk, docfile);
                $("#empresas_td")
                  .append(
                  "<tr id='rrremove'>"+
                    "<td>"+ cont +"</td>"+
                    "<td>"+ detalhe +"</td>"+
                    "<td>"+ data[i].fields.empresa +"</td>"+
                    "<td>"+ data[i].fields.layout +"</td>"+
                    "<td>"+ data_f +"</td>"+
                  "</tr>"
                );
                 $("#search").click(function () {
                     $("#rrremove").remove();
                 });
            }
          },
          error: function(data, status) {
              alert("Nenhum dado foi encontrado");
          },
      });

  });

    $('.input-append.date').datepicker({
       format: "dd/mm/yyyy",
       language: "pt-BR",
       keyboardNavigation: false,
       forceParse: false,
       autoclose: true,
       todayHighlight: true
    });


    function split_name(name) {
        var new_name = name.split("/");
        return new_name.splice(-1);
    }

    function formatar_data(datas) {
        var man_data = new Date(datas);
        var m_names = new Array("Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro",
        "Outubro", "Novembro", "Dezembro");
        var mes = man_data.getMonth();
        var dia = man_data.getDate();
        var ano = man_data.getFullYear();
        var hora = man_data.getHours();
        var min = man_data.getMinutes();

        var result = dia +" de " + m_names[mes] +" de " + ano + " ás " + hora
        + ":" + min
        return result
    }

    function detalhe_arquivo(ids, arquivo) {
        var result = "<a href='/detalhe/"+ ids +"' data-toggle='tooltip' data-placement='right' title data-original-title='Visualizar Arquivo'>" + arquivo + "</a>"
        return result
    }

    function change_name(ids) {
      var nome = "";
      $.ajax({
        type: "GET",
        url: "/empresas/?id=" + ids,
        success: function(data, status){
         },

      });
    }
});
