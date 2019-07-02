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
            <p class="wrap">
                세상의 모든 게임을 내 손 안에, 게임피커
            </p>
        </div>
        <div class="wrap">
            <img src="./res/card_1.png" alt="" style="transform: translateY(-0px) scale(0.95); opacity: 0.4">
            <img src="./res/card_2.png" alt="" style="transform: translateY(0px) scale(1.15);opacity: 0.6">
            <img src="./res/card_3.png" alt="" style="transform:scale(1.3);opacity: 1; z-index: 9998;">
            <img src="./res/card_4.png" alt="" style="transform: translateY(0px) scale(1.15); opacity: 0.6">
            <img src="./res/card_5.png" alt=""style="transform: translateY(-0px) scale(0.95); opacity: 0.4">
        </div>
        <br>
        
        <div class="wrap_down">
            <div class="wrap">
                <div class="installInfo">
                    <a class="bigbtn" id='androidInstall' href='https://play.google.com/store/apps/details?id=com.gamepicker.gamepicker'>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="611.363px" height="611.363px" viewBox="0 0 611.363 611.363" style="enable-background:new 0 0 611.363 611.363;" xml:space="preserve">
                        <g>
                            <g id="android">
                                <path d="M152.682,458.363c0,15.3,10.2,25.5,25.5,25.5h25.5v89.25c0,20.4,17.85,38.25,38.25,38.25s38.25-17.85,38.25-38.25v-89.25    h51v89.25c0,20.4,17.85,38.25,38.25,38.25s38.25-17.85,38.25-38.25v-89.25h25.5c15.3,0,25.5-10.2,25.5-25.5v-255h-306V458.363z     M88.932,203.363c-20.4,0-38.25,17.851-38.25,38.25v178.5c0,20.4,17.85,38.25,38.25,38.25s38.25-17.85,38.25-38.25v-178.5    C127.182,221.213,109.332,203.363,88.932,203.363z M522.432,203.363c-20.4,0-38.25,17.851-38.25,38.25v178.5    c0,20.4,17.85,38.25,38.25,38.25s38.25-17.85,38.25-38.25v-178.5C560.682,221.213,542.832,203.363,522.432,203.363z     M394.932,55.463l33.15-33.15c5.1-5.1,5.1-12.75,0-17.85c-5.101-5.101-12.75-5.101-17.851,0l-38.25,38.25    c-17.85-12.75-40.8-17.851-66.3-17.851s-48.45,5.101-68.85,15.3l-35.7-38.25c-5.1-2.55-15.3-2.55-20.4,0    c-2.55,5.101-2.55,15.301,0,20.4l33.15,33.15c-35.7,28.05-61.2,71.399-61.2,122.399h306    C458.682,126.863,433.182,80.963,394.932,55.463z M254.682,126.863h-25.5v-25.5h25.5V126.863z M382.182,126.863h-25.5v-25.5h25.5    V126.863z"/>
                            </g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        </svg>
                        Android App
                    </a>
                    <span class='bigbtn' id='appleInstall' href='' onclick="makeToast(`준비중입니다`)">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 305 305" xml:space="preserve">
                            <g id="XMLID_228_">
                                <path id="XMLID_229_" d="M40.738,112.119c-25.785,44.745-9.393,112.648,19.121,153.82C74.092,286.523,88.502,305,108.239,305
                                    c0.372,0,0.745-0.007,1.127-0.022c9.273-0.37,15.974-3.225,22.453-5.984c7.274-3.1,14.797-6.305,26.597-6.305
                                    c11.226,0,18.39,3.101,25.318,6.099c6.828,2.954,13.861,6.01,24.253,5.815c22.232-0.414,35.882-20.352,47.925-37.941
                                    c12.567-18.365,18.871-36.196,20.998-43.01l0.086-0.271c0.405-1.211-0.167-2.533-1.328-3.066c-0.032-0.015-0.15-0.064-0.183-0.078
                                    c-3.915-1.601-38.257-16.836-38.618-58.36c-0.335-33.736,25.763-51.601,30.997-54.839l0.244-0.152
                                    c0.567-0.365,0.962-0.944,1.096-1.606c0.134-0.661-0.006-1.349-0.386-1.905c-18.014-26.362-45.624-30.335-56.74-30.813
                                    c-1.613-0.161-3.278-0.242-4.95-0.242c-13.056,0-25.563,4.931-35.611,8.893c-6.936,2.735-12.927,5.097-17.059,5.097
                                    c-4.643,0-10.668-2.391-17.645-5.159c-9.33-3.703-19.905-7.899-31.1-7.899c-0.267,0-0.53,0.003-0.789,0.008
                                    C78.894,73.643,54.298,88.535,40.738,112.119z"/>
                                <path id="XMLID_230_" d="M212.101,0.002c-15.763,0.642-34.672,10.345-45.974,23.583c-9.605,11.127-18.988,29.679-16.516,48.379
                                    c0.155,1.17,1.107,2.073,2.284,2.164c1.064,0.083,2.15,0.125,3.232,0.126c15.413,0,32.04-8.527,43.395-22.257
                                    c11.951-14.498,17.994-33.104,16.166-49.77C214.544,0.921,213.395-0.049,212.101,0.002z"/>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                            </svg>
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
        <div class="wrap guideline">
            <div class="miniMenuWrapper">
                <span class="searchGame btn" id="searchGameBtn" onclick="openSearchGame()">
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
                <button class="btn" onclick="loadMoreGames()">더보기</button>
            </div>
        </div>
        <!-- footer -->
        <?php include "./components/footer.php" ?>

    </section>
</body>
</html>