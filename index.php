<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Radio</title>

  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

  <!-- Optional theme -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

  <!-- Latest compiled and minified JavaScript -->
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

  <link href="https://fonts.googleapis.com/css?family=Shrikhand" rel="stylesheet">

  <link rel="stylesheet" href="css/style.css">
  <script src="js/script.js"></script>
</head>

<body>


<div class="col-md-10">
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Image</th>
        <th scope="col">Station</th>
        <th scope="col">Fréquence</th>
        <th scope="col">Musiques</th>
      </tr>
    </thead>
    <tbody>
      <?php

      $musicPath = "./music/"; //toutes les plylist sont contenues dans le dossier musique
      $playlists = scandir($musicPath); //récupération de tous les dossiers de playlist
      $size = sizeof($playlists) - 2; // nombre de playlist -2 car 2 index qui ne sont pas des playlists

      foreach ($playlists as $key => $playlist)
      {
        if(is_dir($musicPath.$playlist) && $playlist != '.' && $playlist != '..') // on affiche toutes les playlists sauf "." et ".." qui sont des indexes
        {
          echo "<tr><td><img src='https://files.steyoyoke.com/2016/04/SYYK039_VINYL.jpg' width='100px;'></td><td>".$playlist."</td><td>".(((array_search($playlist,$playlists)-2)/$size)*200)." Mhz</td>";
          echo "<td class='music-list'><ul>";
          $musics = scandir($musicPath.$playlist."/"); // on récupère la liste des chansons pour chaque playlist dans le foreach
          foreach($musics as $key => $music)
          {
              if($music != "." && $music != "..")
              {
                echo "<li class='music' >".$music."</li>";
              }
          }
          echo "</ul></td></tr>";
        }
      }
      ?>
    </tbody>
  </table>
</div>
<div class="col-md-2 sidebar">
  <form action="upload.php" method="post" enctype="multipart/form-data">
    Upload music
    <input type="file" name="fileToUpload" id="fileToUpload">

    <select name="playlist">
      <?php
        foreach($playlists as $key => $playlist)
        {
          if($playlist != '.' && $playlist != '..')
          {
            echo "<option value='".$playlist."' >".$playlist."</option>";
          }
        }
      ?>
    </select><br/>

    <input type="submit" value="Upload Music" name="submit">
</form>
</div>

</body>

</html>
