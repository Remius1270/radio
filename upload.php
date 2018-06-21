<?php
$target_dir = "music/".$_POST["playlist"]."/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$musicFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

//check file type
if(isset($_POST["submit"]) && $musicFileType == "mp3") {
        $uploadOk = 1;
}
else{
  echo"erreur";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

?>
