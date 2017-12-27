var gambarnya;
    function processImage() {

      if(document.getElementById('file').value != '' && $('#url_gambar').val() !== ''){
        swal('Maaf', 'Dua Dua Nya Tidak Boleh terisi', 'error');
      }else if(document.getElementById('file').value === '' && $('#url_gambar').val() === ''){
          swal('Maaf', 'Anda Harus Menyediakan gambar pilih salah satu', 'error');
      }else{

        var subscriptionKey = "cd64e4065a6d42d8b42efdcff9dced94";
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";
        var params = {
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "en",
        };

        $('#loading').fadeIn();
        $('#pertama').fadeOut();
        $.ajax({
            url: uriBase + "?" + $.param(params),
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",
            data: '{"url": ' + '"' + gambarnya + '"}',
        })

        .done(function(data) {
          $('#loading').fadeOut();
          $('#result-image').fadeIn();
          var hasil;
          var hasil2 = null;
          data.description.tags.forEach(e => {

            if(e === 'lizard'){
              hasil2 = "Itu Gambar Kadal";
            }else{
              hasil = "Itu Bukan Gambar kadal";
            }

          });

          if(hasil2!== null){
            $('#hasilnya').html(hasil2);
        }else{
            $('#hasilnya').html(hasil);
          }

          $('#gambar_hasil').attr('src', gambarnya);

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            swal('Sorry', errorString, 'error');
            $('#loading').fadeOut('hilang');
            $('#pertama').fadeIn('hilang');
        });
      }
    };

    $(document).ready(function(){

      function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
               gambarnya = e.target.result;
           }
           console.log(input.files);
            reader.readAsDataURL(input.files[0]);
            console.log(reader.readAsDataURL(input.files[0]));
        }
    }

      $('#file').change(function(){
        $('#url_gambar').attr('disabled', 'disabled');
        readURL(this);
      });

      $('#url_gambar').keyup(function(){
        if($('#url_gambar').val() != ''){
          $('#file').attr('disabled', 'disabled');
          gambarnya = $('#url_gambar').val();
        }else{
          $('#file').removeAttr('disabled');
        }
      });
    });
