<!DOCTYPE html>
<html>
<head>
    <title>게임피커</title>
    <link rel="stylesheet" type="text/css" media="screen" href="./css/findpw.css" />
    <?php include_once './components/head.php'; ?>
    <script src="./js/findpw.js"></script>
</head>
<body>
    <section class="contents guideWrap">
        <div class="wrap guideLine">
            <div class="explain">
                <p class="title">
                    비밀번호 찾기
                </p>
                <p>
                    이메일을 이용해 비밀번호를 재설정합니다
                </p>
            </div>
            <div class="description">
                <img src="./res/IconWithLogo.png" alt="로고">
            </div>
            <div class="inputBoxWrapper">
                <div class="explain">
                    <div class="main leftBorder">
                        비밀번호 찾기
                    </div>
                    <div class="sub">
                        가입하신 이메일 계정으로 비밀번호 재설정 메일이 발송됩니다.
                    </div>
                </div>
                <div class="inputBox">
                    <div>
                        
                        <span class="explain"><span class="justSquare"></span>이메일 주소</span>
                        <input type="email" id="mailInput" placeholder="가입 시 사용하신 이메일을 입력해주세요">
                    </div>
                </div>
                    
                <div class="buttons">
                    <button id="sendBtn" class='btn'>
                        메일 발송
                    </button>
                </div>
                <br/><br/><br/><br/>
            </div>
    </section>
</body>
</html>