<?php include_once "./components/utils.php"?>
<!DOCTYPE html>
<html>
<head>
    <title>게임피커</title>
    <?php include_once './components/head.php'; ?>
    <link rel="stylesheet" type="text/css" media="screen" href="./css/login.css" />
    <script src="./js/login.js"></script>
</head>
<body>
    <section class="contents">
        <div class="wrap">
            <a href="./">
                <div class="description">
                    <img src="./res/logoImage.png" alt="로고와아이콘">
                </div>
            </a>
            <div class="loginBox">
                <input type="email" placeholder="이메일 입력해주세용~!" id="id"/>
                <br/>
                <input type="password" placeholder="비밀번호!!" id="pw"/>
                <br/>
                <button id="startLoginBtn">로그인</button>
            </div>
            <br/>
            <div class="options">
                <div class="rememberToken">
                    <img src="./res/checkbox_nofill.png" alt="">
                    <span class="explain">
                        &nbsp;로그인 상태 유지
                    </span>
                </div>
                <br/>
                <div class="accounts">
                    <a href="./register.php">
                        <p>회원가입</p>
                    </a>
                    <a href="">
                        <p>아이디찾기</p>
                    </a>
                    <a href="./findpw.php">
                        <p>비밀번호찾기</p>
                    </a>
                </div>
            </div>
            <div class="hidden">
                <form action="./" method="POST" id="moveWithTokenForm">
                    <input type="hidden" id="token" name="token" value="">
                    <input type="hidden" id="uid" name="uid" value="">
                </form>
            </div>
        </div>
    </section>
</body>
</html>