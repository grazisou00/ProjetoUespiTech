<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Document</title>
    <link rel="stylesheet" href="css/areadeEstudo.css">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
</head>
<body>
  <div class="area-de-estudo">
    <div class="div-card-13">
      <div class="regies">
        Regiões 
      </div>
      <div class="line-6">
      </div>
      <div class="container-30">
        <div class="div-card-28">
          <div class="rectangle-721629">
          </div>
          <span class="incisivos-superiores">
            INCISIVOS<br />
            SUPERIORES
          </span>
          <button class="button" onclick="redirectToPage('pagina1.html')">Button 1</button>
        </div>
        <div class="div-card-2">
          <div class="rectangle-72163">
          </div>
          <span class="caninos-superiores">
            Caninos <br/>
            superiores
          </span>
          <button class="button-4" onclick="redirectToPage('pagina2.html')">Button 2</button>
        </div>
        <!-- Adicione os eventos onclick para os outros botões conforme necessário -->
      </div>
    </div>
  </div>
  
  <script>
    function redirectToPage(pageURL) {
      window.location.href = pageURL; 
    }
  </script>
</body>
</html>
