$().ready(function() {
  // ajax que traz os documentos na pagina de listar_arquivo
  $.ajax({
    type: "get",
    url : '/documentos/',
    success: function(data, status) {

      for (var i = 0; i < data.length; i++) {
          var cont = i + 1;
          var docfile = split_name(data[i].fields.docfile);
          var status_f = icon_status(data[i].fields.status, data[i].pk);
          var button_f = define_button(data[i].fields.status, data[i].pk);
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
              "<td><div class='text-center'>"+ status_f +"</div></td>"+
              "<td><div class='text-center'>"+ button_f +"</div></td>"+
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
  
  /*
  * Ajax que traz os documentos ja feito o de para - aba de 
  *  Arquivos De-Para 
  */
  $.ajax({
    type: "get",
    url : '/doc_depara/',
    success: function(data, status) {

      for (var i = 0; i < data.length; i++) {
          var cont = i + 1;
          var documento = split_name(data[i].fields.documento);
          var data_f = formatar_data(data[i].fields.data_envio);
          var detalhe = detalhe_arquivo_depara(data[i].pk, documento);
          var file_down = donwload_file(data[i].pk);
          var aux_arr = data[i].fields.documento_origen.split('/');
          var layout_f = aux_arr.splice(1);
          var empresa_f = aux_arr.splice(0);

          
          $("#documento_depara")
            .append(
            "<tr id='rrremove_up'>"+
              "<td>"+ cont +"</td>"+
              "<td>"+ detalhe +"</td>"+
              "<td>"+ empresa_f +"</td>"+
              "<td>"+ layout_f +"</td>"+
              "<td>"+ data_f +"</td>"+
              "<td><div class='text-center'>"+ file_down + "</div></td>"+
            "</tr>"
          );
           $("#search_up").click(function () {
               $("#rrremove_up").remove();
           });
      }
    },
    error: function(data, status) {
        alert("Nenhum dado foi encontrado");
    },
  });

  // ADV SEARCH - DOCUMENTOS
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
          status_f: status_f
        },
        success: function(data, status) {

          for (var i = 0; i < data.length; i++) {
              var cont = i + 1;
              var docfile = split_name(data[i].fields.docfile);
              var status_f = icon_status(data[i].fields.status, data[i].pk);
              var button_f = define_button(data[i].fields.status, data[i].pk);
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
                  "<td><div class='text-center'>"+ status_f +"</div></td>"+
                  "<td><div class='text-center'>"+ button_f +"</div></td>"+
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
 // ADV SEARCH DEPARA = DOCUMENTOS PRONTOS PARA SEREM IMPORTADOS AO QUESTOR
$('#search_up').click(function() {
  var empresa_up =  $('#select_empresa_up option:selected').attr('value');
  var layout_up = $('#select_layout_up option:selected').attr('value');
  var data_in_up = $('#data_in_up').val();
  var data_ou_up = $('#data_ou_up').val();


  $.ajax({
    type: "get",
    url : '/search_depara/?',
    data : {
      empresa_up : empresa_up, layout_up: layout_up,
      data_in_up: data_in_up, data_ou_up: data_ou_up
    },
    success: function(data, status) {

      for (var i = 0; i < data.length; i++) {
        var cont = i + 1;
        var documento = split_name(data[i].fields.documento);
        var data_f = formatar_data(data[i].fields.data_envio);
        var detalhe = detalhe_arquivo_depara(data[i].pk, documento);
        var file_down = donwload_file(data[i].pk);
        var aux_arr = data[i].fields.documento_origen.split('/');
        var layout_f = aux_arr.splice(1);
        var empresa_f = aux_arr.splice(0);

        
        $("#documento_depara")
          .append(
              "<tr id='rrremove_up'>"+
                "<td>"+ cont +"</td>"+
                "<td>"+ detalhe +"</td>"+
                "<td>"+ empresa_f +"</td>"+
                "<td>"+ layout_f +"</td>"+
                "<td>"+ data_f +"</td>"+
                "<td><div class='text-center'>"+ file_down + "</div></td>"+
              "</tr>"
          );
         $("#search_up").click(function () {
             $("#rrremove_up").remove();
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

    function define_button(doc_status, ids) {
        if(doc_status == "N") {
          var result = "<a href='/validar/"+ ids +"' class='btn btn-primary' id='validar'>Validar</a>"
          return result
          }else if(doc_status == "V") {
            var result = "<a href='/deparas/"+ ids +"' class='btn btn-info' id='validar'>Fazer De-Para</a>"
            return result
          }else{
            var result = "<a href='/validar/"+ ids +"' class='btn btn-primary' id='validar'>Validar</a>"
            return result
          }
          return false;
    }

    function icon_status(doc_status) {
        if(doc_status == "N") {
          return '<i class="icon-question-sign"></i>'
        }else if(doc_status == "V") {
            return '<i class="icon-ok"></i>'
        }else{
            return '<i class="icon-remove"></i>'
        }
        return false;
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
    function detalhe_arquivo_depara(ids, arquivo) {
        var result = "<a href='/detalhe-depara/"+ ids +"' data-toggle='tooltip' data-placement='right' title data-original-title='Visualizar Arquivo'>" + arquivo + "</a>"
        return result
    }
    function donwload_file(ids) {
      var result = "<a href='/donwload/"+ ids +"' class='btn btn-primary'>Exportar</a>"
      return result
    }
});
