<?php include_once "./components/utils.php"?>
<!DOCTYPE html>
<html>
<head>
    <title>게임피커</title>
    <?php include_once './components/head.php'; ?>
    
    <link rel="stylesheet" type="text/css" media="screen" href="./css/gameListStyle.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="./css/community.css" />
    <script src="./js/community.js"></script>
</head>
<body>
    <!-- Navigation -->
    <?php include_once "./components/nav.php" ?>
    <!-- the number of section is not only 1-->
    <section class="communityQuickMenus guideWrap">
        <div class="guideLine">
            <div id="communityName">
                <img src="" alt="" id="isFavor"/>
                <span id="name"></span>
            </div>
            <div class="quickBtn">
                <div class="searcher" onclick="openSearchGame()">
                    <div class="title  imgBtn-inv">
                        <img src="./res/search.svg" class="svg pink"/>
                    </div>
                </div>
                <div class="basic">
                    <div class="title  imgBtn-inv">
                        <img src="./res/menu_pink.png"/>
                    </div>
                    <div class= "list">
                        <div>
                            <a href="./community.php?gId=-1">
                                익명게시판
                            </a>
                        </div>
                        <div>
                            <a href="./community.php?gId=-2">
                                자유게시판
                            </a>
                        </div>
                        <div>
                            <a href="./community.php?gId=-3">
                                새 소식
                            </a>
                        </div>
                        <div>
                            <a href="./community.php?gId=-4">
                                이벤트
                            </a>
                        </div>
                        <div>
                            <a href="./community.php?gId=-5">
                                위키
                            </a>
                        </div>
                    </div>
                </div>
                <!--
                <div class="currents">
                    <div class="title btn-inv">
                        최근 커뮤니티 목록
                    </div>
                    <br/>
                    <div class= "list">
                        
                    </div>
                </div>
                -->
                <div class="favors">
                    <div class="title  imgBtn-inv">
                        <img src="./res/star.svg" class="svg pink"/>
                    </div>
                    <div class= "list">
                        
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
                    <button onclick="loadPosts(postQueryBuild())" class="moreLoadBtn imgBtn">
                        <img src="./res/more_white.png"/>
                    </button>
                    <button onclick="window.location= `./write.php${getUrlParams().gId? `?gId=${getUrlParams().gId}`:''}`" class="imgBtn">
                        <img src="./res/write_white.png"/>
                    </button>
                    <button onclick="searchPosts()" class="imgBtn">
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