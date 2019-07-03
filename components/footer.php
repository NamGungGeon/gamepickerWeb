
<style>
    footer{
        width: 100%;
        min-width: 1200px;
        height: 300px;
        background-image: url('../res/footer_background.jpg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: white;
    }
    footer .backgroundEffect{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        overflow: hidden;
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+0,000000+100&0+0,0.65+50 */
        background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.8) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 50%,rgba(0,0,0,0.8) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.8) 50%,rgba(0,0,0,0.8) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 ); /* IE6-9 */

    }
    footer .wrap{
        transform: translateY(200px);
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 1000px;
        height: 100%;
        margin: 0;
    }
    footer .wrap > *{
        display: inline-block;
        flex: 2;
        text-align: left;
    }

    footer .logo{
        width: 50px;
        height: 50px;
        transform: translateY(20px);
    }
    footer .quickNav{
        flex: 1;
        margin: 0;
        padding: 0;
        padding-right: 20px;
    }
    footer .quickNav li{
        color: #787878;
        font-size: 0.8rem;
    }
    footer .quickNav li a{
        color: #787878;
        text-decoration: none;
    }
    footer .quickNav .accent{
        font-size: 1.0rem;
        color: white;
        font-weight: 600;
        margin-bottom: 0.3rem;
    }

    @media(max-width: 450px){
        footer{
            height: inherit;
            display: block!important;
            min-width: 0;
        }
        footer .logo{
            display: none;
        }
        footer .wrap{
            flex-direction: column;
            transform: translateY(0);
            width: 100%;
        }
        footer .backgroundEffect{
            background-color: rgba(0,0,0,0.4);
        }
        footer .quickNav{
            padding: 0.7rem;
        }
    }

</style>


<footer class="guideWrap">
    <div class="backgroundEffect guideWrap">
        <div class="wrap guideline">
            <div class="logo">
                <a href="./" class="logoText">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.67 56.24"><defs><style>.cls-1, cls-1 *{fill:#e71469!important;}</style></defs><title>자산 20</title><g id="레이어_2" data-name="레이어 2"><g id="레이어_1-2" data-name="레이어 1"><path class="cls-1" d="M16.87,33.75A16.88,16.88,0,0,1,16.87,0V6.82A10.05,10.05,0,1,0,26.92,16.87h6.83A16.9,16.9,0,0,1,16.87,33.75Z"></path><path class="cls-1" d="M33.75,43.69H26.92V16.87A16.88,16.88,0,1,1,43.8,33.75V26.92a10.05,10.05,0,1,0-10-10Z"></path><path class="cls-1" d="M29.69,56.24A42.6,42.6,0,0,1,18,54.59a44,44,0,0,1-16.89-9.1l4.69-5c.88.82,21.75,19.85,49.51-.28l4,5.53C48.25,53.76,38.08,56.24,29.69,56.24Z"></path><polygon class="cls-1" points="31.52 14.56 18.84 14.56 18.84 10.79 14.21 10.79 14.21 14.56 10.44 14.56 10.44 19.19 14.21 19.19 14.21 22.96 18.84 22.96 18.84 19.19 31.52 19.19 31.52 14.56"></polygon><path class="cls-1" d="M42.14,16.87a2.21,2.21,0,1,1-2.21-2.21A2.2,2.2,0,0,1,42.14,16.87Z"></path><path class="cls-1" d="M49.88,16.87a2.21,2.21,0,1,1-2.21-2.21A2.2,2.2,0,0,1,49.88,16.87Z"></path><path class="cls-1" d="M43.8,15.21A2.21,2.21,0,1,1,46,13,2.21,2.21,0,0,1,43.8,15.21Z"></path><path class="cls-1" d="M43.8,23A2.21,2.21,0,1,1,46,20.75,2.21,2.21,0,0,1,43.8,23Z"></path></g></g></svg>
                    <img alt='logoText' src='./res/logoImage.png'/>
                </a>
            </div>
            <ul class="quickNav">
                <li class="accent">GAMEPICKER</li>
                <li>서울시 광진구 광나루로 416<br/>지층 (화양동,건회빌딩)</li>
            </ul>
            <ul class="quickNav">
                <li class="accent">CONTACT</li>
                <li>gamepicker.inc@gmail.com</li>
                <li><a href="http://www.gamepicker.co.kr">웹사이트</a></li>
            </ul>
        </div>
    </div>
</footer>