<?php include_once "./components/utils.php"?>
<!DOCTYPE html>
<html>
<head>
    <title>게임피커</title>
    
    <?php include_once './components/head.php'; ?>
    <link rel="stylesheet" type="text/css" media="screen" href="./css/index.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="./css/gameListStyle.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="./css/loadingStyle.css" />
    <script src="./js/index.js"></script>
</head>
<body>
    <!-- Navigation -->
    <?php include "./components/nav.php"?>

    <!-- the number of section is not only 1-->
    <section class="initial guideWrap">
        <div class="slogun">
            <p class="wrap guideLine">
                세상의 모든 게임을 내 손 안에, 게임피커
            </p>
        </div>
        <div class="wrap guideLine screenshots">
            <img src="./res/card_1.png" alt="" style="transform: translateY(-0px) scale(0.95); opacity: 0.4">
            <img src="./res/card_2.png" alt="" style="transform: translateY(0px) scale(1.15);opacity: 0.6">
            <img src="./res/card_3.png" alt="" style="transform:scale(1.3);opacity: 1; z-index: 9998;">
            <img src="./res/card_4.png" alt="" style="transform: translateY(0px) scale(1.15); opacity: 0.6">
            <img src="./res/card_5.png" alt=""style="transform: translateY(-0px) scale(0.95); opacity: 0.4">
        </div>
        <br>
        
        <div class="wrap_down">
            <div class="wrap guideLine">
                <div class="installInfo">
                    <a class="bigbtn" id='androidInstall' href='https://play.google.com/store/apps/details?id=com.gamepicker.gamepicker'>
                    <img src="./res/android.svg"/>
                        Android App
                    </a>
                    <span class='bigbtn' id='appleInstall' href='' onclick="makeToast(`준비중입니다`)">
                        <img src="./res/ios.svg"/>
                            IOS App
                    </span>
                    </div>
                    <div class="scrollGuide">
                        &nbsp;아래로 스크롤 해보세요<br/>
                        <img src="./res/down-arrow.png" alt="">
                        <br/>
                    </div>
                </div>

            </div>
    </section>
    <section class="contents guideWrap">
        <div class="wrap guideLine">
            <div class="miniMenuWrapper">
                <span class="searchGame imgBtn" id="searchGameBtn" onclick="openSearchGame()">
                    <img class="icon" src="./res/search.png" alt="검색"/>
                </span>
            </div>
            <div class="description">
                <span class="justSquare"></span>
                <p class="title leftBorder">게임추천</p>
                <p class="explain">좋아하실 만한 게임을 추천해드립니다</p>
            </div>
            <div class="optionsWrapper">
            </div>
            <div class="games">
                <!-- This wrapper is fulfilled in js -->
            </div>
            <div class="moreGamesWrapper">
                <span class="imgBtn"  onclick="loadMoreGames()" >
                    <img src="./res/more_white.png"/>
                </span>
            </div>
        </div>
        <!-- footer -->
        <?php include "./components/footer.php" ?>

    </section>
</body>
</html>