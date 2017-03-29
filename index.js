document.getElementById("ghusername")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("ghsubmitbtn").click();
    }
});


$(function(){

   $('#ghsubmitbtn').on('click', function(e){ 

    e.preventDefault();
    $('#ghapidata').html('<div align="center" id="loader"><img src="http://i.imgur.com/UqLN6nl.gif" alt="loading..."></div>');
    
    var username = $('#ghusername').val();
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';
    

    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#ghapidata').html("<h2>Usuario não encontrado!</h2>");
      }
      
      else {
        var fullname   = json.name;
        var email      = json.email;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
        var bio          = json.bio;
        var created_at   = json.created_at;
        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<p>E-mail:  '+email+'</p>'
        outhtml = outhtml + '<p>Data de cadastro no GitHub:  '+created_at +'</p>'
        outhtml = outhtml + '<p>Biografia:  '+bio+'</p><br></br>'
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Seguidores: '+followersnum+' - Seguindo: '+followingnum+'<br>Quantidade de Repositórios: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';
        
        $('#ghapidata').html(outhtml);
      }
    });
  });
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});