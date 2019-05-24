<!DOCTYPE html>
<html>
<head>
    <title>게임피커</title>
    
    <?php include_once './components/head.php'; ?>
    <link rel="stylesheet" type="text/css" media="screen" href="./css/resetpw.css" />
    <script src="./js/resetpw.js"></script>
</head>
<body>
    <section class="contents">
        <div class="wrap">
            <div class="description">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.67 56.24"><defs><style>.cls-1{fill:#e61469}</style></defs><title>자산 20</title><g id="레이어_2" data-name="레이어 2"><g id="레이어_1-2" data-name="레이어 1"><path class="cls-1" d="M16.87,33.75A16.88,16.88,0,0,1,16.87,0V6.82A10.05,10.05,0,1,0,26.92,16.87h6.83A16.9,16.9,0,0,1,16.87,33.75Z"/><path class="cls-1" d="M33.75,43.69H26.92V16.87A16.88,16.88,0,1,1,43.8,33.75V26.92a10.05,10.05,0,1,0-10-10Z"/><path class="cls-1" d="M29.69,56.24A42.6,42.6,0,0,1,18,54.59a44,44,0,0,1-16.89-9.1l4.69-5c.88.82,21.75,19.85,49.51-.28l4,5.53C48.25,53.76,38.08,56.24,29.69,56.24Z"/><polygon class="cls-1" points="31.52 14.56 18.84 14.56 18.84 10.79 14.21 10.79 14.21 14.56 10.44 14.56 10.44 19.19 14.21 19.19 14.21 22.96 18.84 22.96 18.84 19.19 31.52 19.19 31.52 14.56"/><path class="cls-1" d="M42.14,16.87a2.21,2.21,0,1,1-2.21-2.21A2.2,2.2,0,0,1,42.14,16.87Z"/><path class="cls-1" d="M49.88,16.87a2.21,2.21,0,1,1-2.21-2.21A2.2,2.2,0,0,1,49.88,16.87Z"/><path class="cls-1" d="M43.8,15.21A2.21,2.21,0,1,1,46,13,2.21,2.21,0,0,1,43.8,15.21Z"/><path class="cls-1" d="M43.8,23A2.21,2.21,0,1,1,46,20.75,2.21,2.21,0,0,1,43.8,23Z"/></g></g></svg>
                <br/><br/>
                <p class="title">GAMEPICKER</p>
            </div>
            <div class="inputBoxWrapper">
                <div class="explain">
                    <div class="main">
                        <span class="justSquare"></span>
                        비밀번호 재설정
                    </div>
                </div>
                <div class="inputBox">
                    <div>
                        <span class="justSquare"></span>
                        <span class="explain">새 비밀번호</span>
                        <input type="password" id="pwInput" placeholder="4자 이상">
                    </div>
                    <div>
                        <span class="justSquare"></span>
                        <span class="explain">새 비밀번호 확인</span>
                        <input type="password" id="pwInputCheck" placeholder="비밀번호를 다시 입력해 주세요">
                    </div>
                </div>
                    
                <div class="buttons">
                    <br/>
                    <button id="resetBtn">
                        변경
                    </button>
                </div>
                <br/><br/><br/><br/>
            </div>
    </section>
</body>
</html>