

<style>
        
    header{
        padding: 21px 0 21px 0;
        z-index: 100;
        position: absolute;
        left: 0;
    }


    .logo{
        text-align: left;
    }
    .logo svg{
        fill: #e71469 !important;
        width: 30px;
        height: 30px;
        float: left;
        margin-right: 1rem;
    }
    .logo .logoText>img{
        transform: translateY(5px);
        height: 20px;
    }
    header .headerMenu{
        float: right;
        transform: translateY(0.2rem);
    }
    .headerMenu li{
        text-align: right;
        float: left;
    }

    .headerMenu li a{
        text-decoration: none;
        margin-right: 2rem;
        font-size: 1rem;
        font-weight: 600;
        color: white;
        transition-duration: 0.5s;
        transition-property: color;
        cursor: pointer;
    }
    .headerMenu li a:hover{
        color: #e71469!important
    }
</style>

<header class="guideWrap">
    <div class="guideLine">
        <ul class="headerMenu">
            <li><a href="./game.php">게임추천</a></li>
            <li><a href="./community.php">커뮤니티</a></li>
        </ul>
        <div class="logo">
            <a href="./" class="logoText">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.67 56.24"><defs><style>.cls-1, cls-1 *{fill:#e71469!important;}</style></defs><title>자산 20</title><g id="레이어_2" data-name="레이어 2"><g id="레이어_1-2" data-name="레이어 1"><path class="cls-1" d="M16.87,33.75A16.88,16.88,0,0,1,16.87,0V6.82A10.05,10.05,0,1,0,26.92,16.87h6.83A16.9,16.9,0,0,1,16.87,33.75Z"></path><path class="cls-1" d="M33.75,43.69H26.92V16.87A16.88,16.88,0,1,1,43.8,33.75V26.92a10.05,10.05,0,1,0-10-10Z"></path><path class="cls-1" d="M29.69,56.24A42.6,42.6,0,0,1,18,54.59a44,44,0,0,1-16.89-9.1l4.69-5c.88.82,21.75,19.85,49.51-.28l4,5.53C48.25,53.76,38.08,56.24,29.69,56.24Z"></path><polygon class="cls-1" points="31.52 14.56 18.84 14.56 18.84 10.79 14.21 10.79 14.21 14.56 10.44 14.56 10.44 19.19 14.21 19.19 14.21 22.96 18.84 22.96 18.84 19.19 31.52 19.19 31.52 14.56"></polygon><path class="cls-1" d="M42.14,16.87a2.21,2.21,0,1,1-2.21-2.21A2.2,2.2,0,0,1,42.14,16.87Z"></path><path class="cls-1" d="M49.88,16.87a2.21,2.21,0,1,1-2.21-2.21A2.2,2.2,0,0,1,49.88,16.87Z"></path><path class="cls-1" d="M43.8,15.21A2.21,2.21,0,1,1,46,13,2.21,2.21,0,0,1,43.8,15.21Z"></path><path class="cls-1" d="M43.8,23A2.21,2.21,0,1,1,46,20.75,2.21,2.21,0,0,1,43.8,23Z"></path></g></g></svg>
                <img alt='logoText' src='./res/logoImage.png'/>
            </a>
        </div>
    </div>
</header>


<script>
    const ___headerMenu= $(".headerMenu");
    if(loginCheck()){
        ___headerMenu.append(`<li><a href="./mypage.php">마이페이지</a></li><li><a href="./logout.php">로그아웃</a></li>`);
    }else{
        ___headerMenu.append(`<li><a href='./login.php?back=${window.location.href}'>로그인</a></li>`);
    }
</script>