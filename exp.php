<!doctype html>

<html>
<head>
  <meta charset="utf8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>exp</title>
  <style>
    body {
      background-color: rgb(20,20,20);
      color: rgb(200,200,200);
    }
    a {
      text-decoration: none;
      color: rgb(240,240,200);
    }
  </style>
</head>
<body>
  <?php $events = file_get_contents('http://localhost:44444/wickdingske'); ?>
  <script>const events_response=<?=$events?></script>
  <script src='exp.js'>
  </script>
</body>
</html>
