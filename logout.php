

<html>
    <head>
        <?php
            include_once "./components/utils.php";
            include_once "./components/head.php";
            $_SESSION['token']= null;
            $_SESSION['uid']= null;
        ?>
        <title>로그아웃</title>
    </head>
    <body>
        <script>
            User.logout();
            alert("로그아웃 되었습니다");
            window.location= './';
        </script>
    </body>
</html>