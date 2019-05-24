<?php
    include_once "./components/utils.php";
    $_SESSION['token']= null;
    $_SESSION['uid']= null;

?>

<script>
    alert("로그아웃 되었습니다");
    window.location= "./";
</script>