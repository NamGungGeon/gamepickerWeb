<?php include_once "./components/utils.php"?>
<!DOCTYPE html>
<html>
<head>
    <title>게임피커</title>
    <?php include_once './components/head.php'; ?>
    <link rel="stylesheet" type="text/css" media="screen" href="./css/write.css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.css" rel="stylesheet"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-lite.js"></script>
    <script src="./js/write.js"></script>
</head>
<body>
    <!-- Navigation -->
    <?php include_once "./components/nav.php" ?>
    <section class="guideWrap contents">
        <div class="guideLine" id="board">
            <div class="content" id="recentPosts">
                <div class="description leftBorder">
                    게시글 작성
                </div>
                <div class="postBody">
                    <br/><hr/><br/>
                    <div class="titles">
                        <input type='text' id="titleInput" placeholder="여기에 제목을 입력하세요"/>
                    </div>
                    <br/>
                    <p class="msg">
                        <br/>
                        <!--
                        <textarea name="content" id="editor" placeholder="여기에 내용을 입력하세요">
                        </textarea>
                        -->
                        <div id="summernote"></div>
                    </p> 
                    <br/><br/>
                    <div class="options">
                        <button onclick="submitPost()" class="btn">제출</button>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
        <!-- footer -->
        <?php include "./components/footer.php" ?>
    </section>
    

</body>
</html>