<?php include_once "./components/utils.php"?>
<!DOCTYPE html>
<html>
<head>
    <title>게임피커</title>
    <?php include_once './components/head.php'; ?>
    
    <link rel="stylesheet" type="text/css" media="screen" href="./css/gameListStyle.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="./css/community.css" />
    <script src="./js/community_refactor.js"></script>
</head>
<body>
    <!-- Navigation -->
    <?php include_once "./components/nav.php" ?>
    <!-- the number of section is not only 1-->
    <section class="communityQuickMenus guideWrap">
        <div class="guideLine">
            <div id="communityName">
                <img alt="" id="isFavor"/>
                <span id="name"></span>
            </div>
            <div class="quickBtn">
                <div class="searcher" onclick="Page.Ui.Popup.searchCommunity()">
                    <div class="title imgBtn-inv">
                        <img src="./res/search.svg" class="svg pink"/>
                    </div>
                </div>
                <div class="basic" onclick="Page.Ui.Popup.basicCommunity()">
                    <div class="title imgBtn-inv">
                        <img src="./res/menu_pink.png"/>
                    </div>
                </div>
                <div class="history">
                    <div class="title imgBtn-inv" onclick="Page.Ui.Popup.history()">
                        <img src="./res/history.svg" class="svg pink"/>
                    </div>
                </div>
                <div class="favors">
                    <div class="title imgBtn-inv" onclick="Page.Ui.Popup.bookmarks()">
                        <img src="./res/star.svg" class="svg pink"/>
                    </div>
                </div>
            </div>

        </div>
    </section>
    <section class="contents guideWrap">
        <div class="guideLine" id="board">
            <div class="content" id="notices">
                <div class="description leftBorder">
                    공지사항
                </div>
                <div class="postList">
                </div>
            </div>
            <div class="content" id="recentPosts">
                <div class="description leftBorder">
                    최신글
                </div>
                <div class="postList">
                    <!-- This section will be fulfilled in js -->
                </div>
                <br/>
                <div class="options">
                    <button onclick="Page.Loader.posts()" class="moreLoadBtn imgBtn">
                        <img src="./res/more_white.png"/>
                    </button>
                    <button onclick="window.location= `./write.php${getUrlParams().gId? `?gId=${getUrlParams().gId}`:''}`" class="imgBtn">
                        <img src="./res/write_white.png"/>
                    </button>
                    <button onclick="Page.Ui.Popup.searchPost()" class="imgBtn">
                        <img src="./res/search.png"/>
                    </button>
                </div>
            </div>
            
            <div class="content" id="news">
                <div class="description leftBorder">
                    뉴스
                </div>
                <div class="postList">
                </div>
            </div>

        </div>
        <!-- footer -->
        <?php include "./components/footer.php" ?>
    </section>
    

</body>
</html>