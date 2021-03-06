$(document).ready(function(){


    //vars setup------------------------------------------------------------------

    var main = $('#main')[0]; //le player

    var main_source = $('#main_audioSource'); //la source pour changer la musique du player

    var effect = $("#effect")[0]; //player des effets

    var effect_source = $("#effect_audio_source"); //la source pour changer le son de l'effet

    var structure = get_structure(); // arborescence du dossier de musique

    var current_playlist = 0; //playlist qui joue actuellement . Prédéfinit à 0 par défaut.

    var current_music = 0; // musique qui joue actuellement. Prédéfinit à 0 par défaut.

    var playlists_size = structure.length - 1; // nombre de playists / chaînes

    var frequency = 0; // variable pour la fréquence. Actuellement pas utilisée

    // Functions to call-----------------------------------------------------------

    function set_source(player_source,player,music_path) // permet de changer de musique
    {
      player.pause();
      player_source.attr('src',music_path);
      player.load();
      main.play();
    }

    function play_effect(effect_path) // permet de changer de musique
    {
      console.log(effect_path);
       effect.pause();
       effect_source.attr('src',effect_path);
       effect.load();
       effect.play();
    }

    function get_structure() // permet de récupérer l'arborescence du dossier musique
    {
      return JSON.parse($("#structure").html());
    }

    function getRandomInt(max) // permet de récupérer un entier aléatoire entre 0 et max
    {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function checkend(player,player_source) // change de musique à la fin d'une chanson
    {
      var length = player.duration;
      if(length == player.currentTime)
      {
        next_music = getRandomInt(structure[current_playlist][1].length);

        if(current_music == next_music && next_music !=0 )
        {
          next_music -=  1; //pour ne pas récupérer le même morceau que celui qui vient de se terminer...oui c'est améliorable
        }

        current_music = next_music;

        set_source(player_source,player,"music/"+structure[current_playlist][0]+"/"+structure[current_playlist][1][next_music]);

        $("#song").html(structure[current_playlist][1][current_music]);

      }
    }

    //event triggered functions---------------------------------------------------

    $(document).bind('keydown',function(e){ //changement de chaine lorqu'on appuye sur fleche du haut ou fleche du bas.
      //play_effect("./alert/switch.wav");
        if(e.keyCode == 39) {//flèche du haut
           current_playlist+=1;
        }
        else if(e.keyCode == 37) {//flèche du bas
            current_playlist-=1;
       }
       if(current_playlist < 0 )//si on descend en dessus de la plus "petite" playlist
       {
         current_playlist= 0;
        // play_effect("./alert/too_low.wav");
       }
       else if(current_playlist > structure.length-1) //si on monte au dessus de la plus haute playlist
       {
         current_playlist = structure.length-1;
        // play_effect("./alert/too_high.wav");
       }
       else
       {
         //changement de la musique
         $("#current").html(structure[current_playlist][0]);

         next_music = getRandomInt(structure[current_playlist][1].length);

         current_music = next_music;

         set_source(main_source,main,"music/"+structure[current_playlist][0]+"/"+structure[current_playlist][1][next_music]);

         var start_time = Math.floor(Math.random() * Math.floor(60));//si 'est une chanson et pas une alerte on ouvre à un moment aléatoire de la chanson
         main.currentTime = start_time;

         $("#song").html(structure[current_playlist][1][current_music]);

       }

    });

    $(".toggle").click(function(){
      $('.form').toggleClass('hidden');
    });

    $(".volume").change(function(){
      main.volume = ($(this).val()/100);
    });

    //initial script--------------------------------------------------------------


    function detectmob() {// detecte les affichages mobiles
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    $(".main").addClass('hidden');
  }
 else {
    return false;
  }
}

    //lors du lancement de la page
    var first_playlist = structure[0];//première playlist
    var random_music = getRandomInt(first_playlist[1].length);//une musique random

    $("#current").html(structure[current_playlist][0]);//on affiche le nom et l'index de la playlist courrante


    current_music = random_music; //définit comme la musique qui joue courament

    $("#song").html(structure[current_playlist][1][current_music]);// affiche la chanson courante

    set_source(main_source,main,"music/"+first_playlist[0]+"/"+first_playlist[1][random_music]);//on met dans la musique en source

    setInterval(function(){ // toutes les 5 secondes on vérifie que la chanson ne soit pas terminée
      checkend(main,main_source);
    },5000);


});
