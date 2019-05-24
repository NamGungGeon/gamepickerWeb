
const gId= getUrlParams().gId;
var saved= null;
var comments= [];


const togglefollowStatus= ()=>{
    //find game as gId
    
    api.followGame(gId, !saved.favor, (success, data)=>{
        if(success){
            saved.favor= !saved.favor;
            $(`#followOption`).html(`
                ${
                    saved.favor?
                    `<img src='./res/fill_heart.png'/>
                    <br/>
                    <span class="explain">
                        <b>찜</b>
                    </span>`
                    :
                    `<img src='./res/nofill_heart.png'/>
                    <br/>
                    <span class="explain">
                        <b>찜하기</b>
                    </span>`

                }
            `);
        }
    });
};

const renderReviews= (comments)=>{
    const value= `
        <div class="content">
            ${
                comments.length==0?
                '아직 리뷰가 없습니다'
                :
                comments.map((value, idx)=>{
                    const body= value.value;
                    return `
                        <div class="review" onclick="viewFullSizeComment(${idx})">
                            ${body.length>50? body.slice(0, 47)+ '...': body}
                            <p class="userName">
                                ${value.user_name}
                            </p>
                        </div>
                    `;
                }).join('')
            }
        </div>
    `;
    $("#reviews").html(value);
}


const loadReviews= ()=>{
    return api.loadReviews(gId, (success, data)=>{
        if(success){
            const reviews= data.comments;
            comments= [];
            reviews.map((value)=> (comments.push(value)));
            print(reviews);
            renderReviews(reviews);
        }
    });
}

const makeComment= ()=>{
    onLoading();
    api.makeReview(gId, $("#commentInput").val(), (success, data)=>{
        offLoading();
        if(success){
            closePopup();       
            loadReviews();
        }
    });
}

const viewFullSizeComment= (idx)=>{
    buildPopup('리뷰 상세보기',
        `<div class="reviewWrapper" style="text-align:center;">
                <p class="reviewBody">
                    ${comments[idx].value}
                </p>
                <br/><br/>
                <p class="userName">
                    작성자: ${comments[idx].user_name}
                    <br/>
                    작성일: ${convertTime(comments[idx].updated_at)}
                </p>
                <div class="infos">
                    <span onclick="deving(true, ${idx})">
                        <img src="./res/good.png" alt="따봉"/>
                        <span class="good">${comments[idx].recommends}</span>
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span onclick="deving(false, ${idx})">
                        <img src="./res/bad.png" alt="낫따봉"/>
                        <span class="bad">${comments[idx].disrecommends}</span>
                    </span>
                    ${
                        comments[idx].user_id==uid?
                        `
                            &nbsp;&nbsp;&nbsp;
                            <span class='btn buzz'>리뷰 삭제</span>
                        `
                        :
                        ''
                        
                    }
                </div>
            </div>`);
}


const buildCommentMaker= ()=>{
    if(!loginCheck()){
        needLoginMsg();
        return;
    }

    buildPopup('게임 리뷰하기', `
        <textarea id="commentInput" autofocus placeholder="여기에 리뷰 내용을 입력하세요." maxlength="500">
        </textarea>
    `, {
        name: '제출',
        click: ()=>{
            makeComment();
        },
    });
};


const renderPage= (game)=>{
    const init= $('section.contents');

    if(game.images){
        init.css('background-image', `url('${game.images[0]}')`);
    }else{
        init.css('background-color', '#e71469');
    }

    $('section.contents>.wrap').html(`
        <!-- 설명 -->
        <div class="desc">
            <div id="gtitle">
                ${game.title}
            </div>
            <div id="gplatform">
            </div>
        </div>
        <br/>
        <!-- 유튜부영상-->   
        <div class="subtitle">
            <span class='justSquare'></span>트레일러
        </div>     
        <div class="alignCenter">
            ${
                game.videos[0]?
                `<iframe src="${convertYoutubeUrl(game.videos[0])}" class="gameVideo"
                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
                </iframe>`:
                `<img src='./res/sorry.png' alt='not found video' class="gameVideo"/>`

            }
        </div>
        <br/><br/>
        <!-- limitAge -->
        <div class="summary">
            <div class="subtitle">
                <span class='justSquare'></span>연령제한
            </div>
            ${game.age_rate}
        </div>
        <br/>
        <!-- Platform -->
        <div class="summary">
            <div class="subtitle">
                <span class='justSquare'></span>플랫폼
            </div>
            ${game.platforms.toString()}
        </div>
        <br/>
        <!-- Developer -->
        <div class="summary">
            <div class="subtitle">
                <span class='justSquare'></span>개발사
            </div>
            ${game.developer}
        </div>
        <br/>
        <!-- Summary -->
        <div class="summary">
            <div class="subtitle">
                <span class='justSquare'></span>게임설명
            </div>
            ${game.summary.replace('\n', '<br/>')}
        </div>
        <br/>
        <!-- ScoreInfo -->
        <div class="summary">
            <div class="subtitle">
                <span class='justSquare'></span>평가정보
            </div>
            ${
                game.score_count?
                `이 게임의 평점은 
                <span style="font-size:20px; font-weight: 600; color: #e71469;">${getFixedScore(game.score)}점</span> 이고, ${game.score_count}명이 평가했습니다.`:
                '아직 이 게임에 대한 평가가 없습니다'
            }
        </div>
        <br/>
        <!-- Review -->
        <div class="summary">
            <div class="subtitle">
                <span class='justSquare'></span>게임리뷰
            </div>
            <div class="reviews" >
                <div id="reviews"></div>
                <br/>
                <span class="btn" onclick="buildCommentMaker()">등록</span>
            </div>
        </div>
        <br/>
        <!-- Analytics -->
        <div class="summary">
            <div class="subtitle">
                <span class='justSquare'></span>게임 분석
            </div>
            <!-- 그래프 -->
            <canvas id="analyze"></canvas>
        </div>
        <br/>
        <!-- 별 -->
        <div class="options">
            <div class="option" id="followOption"   onclick='togglefollowStatus()'>
                <img src='./res/${game.favor?'fill':'nofill'}_heart.png'/>
                <br/>
                <span class="explain">
                    <b>${game.favor? '찜': '찜하기'}</b>
                </span>
            </div>
            <div class="option" onclick="openEstimateGamePopup(${gId})" id="estimateOption">
                <img src='./res/${game.my_score? '': 'no'}fill_star.png'/>
                <br/>
                <span class="explain">
                    <b>${game.my_score? `평가됨(${game.my_score})`: '평가하기'}</b>
                </span>
            </div>
            <div class="option" onclick="buildCommentMaker()">
                <img src='./res/msgBox.png'/>
                <br/>
                <span class="explain">
                    <b>리뷰하기</b>
                </span>
            </div>
            <div class="option" onclick="window.location='./community.php?gId=${gId}'">
                <img src='./res/commnunity.png'/>
                <br/>
                <span class="explain">
                    <b>커뮤니티</b>
                </span>
            </div>
        </div>
    `);
    // Draw graph
    const ctx = document.getElementById('analyze').getContext('2d');
    const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: Object.keys(game.features),
            datasets: [{
                label: game.title,
                backgroundColor: '#e71469',
                borderColor: 'rgb(255, 99, 132)',
                data: Object.values(game.features),
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMax: 5,
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    loadReviews();
};


const loadGameInfo= ()=>{
    onLoading();
    return api.loadGame(gId, (success, data)=>{
        offLoading();
        if(success){
            const game= data.game;
            saved= game;
            renderPage(game);
        }else{
            alert('유효하지 않은 링크입니다. 삭제된 게임일 수 있습니다.');
            print(data);
            window.location= './';
        }
    })
};



var currentScore= 5.0;
const openEstimateGamePopup= (gId)=>{
    if(!loginCheck()){
        needLoginMsg();
        return;
    }
    currentScore= 5.0;
    buildPopup(`${saved.title} 평가`, `
                <div class="estimateGameWrapper">
                    <div id="scoreText">5.0점</div>
                    <span class="scoreBoard">
                        <span id="scoreStar">★★★★★</span>
                        <span class="scoreChange">
                            <span id="scoreUp">▲</span>
                            <span id="scoreDown">▼</span>
                        </span>
                    </span>
                </div>
            `,{
                name: '제출',
                click: ()=>{
                    api.estimateGame(gId, currentScore, (isSuccess)=>{
                        if(isSuccess){
                            $("#estimateOption").html(`
                                <img src='./res/fill_star.png'/>
                                <br/>
                                <span class="explain">
                                    <b>평가됨 (${currentScore})</b>
                                </span>
                            `);
                            closePopup();
                        }
                    });
                }
            });

    // add Listener
    $(".popupBackground #scoreUp").click(()=>{
        if(currentScore>= 5.0){
            currentScore=5.0;
            return;
        }
        currentScore+= 0.5;
        refreshScoreText();        
    });
    $(".popupBackground #scoreDown").click(()=>{
        if(currentScore<= 0.0){
            currentScore=0.0;
            return;
        }
        currentScore-= 0.5;
        refreshScoreText();
    });
}


const refreshScoreText= ()=>{
    $(".popupBackground #scoreText").html(currentScore+ '점');
    const fillStar= parseInt(currentScore/1);
    const nofillStar= currentScore-fillStar;
    let starTag= "";
    for(let l=0; l<fillStar; l++){
        starTag+= '★';
    }
    if(nofillStar)
        starTag+= '☆';
    if(starTag.length==0) starTag+= ' ';
    $("#scoreStar").html(starTag);
}




const init= async ()=>{
    onLoading();

    await loadGameInfo();    
    await loadReviews();
    
    offLoading();
}
$(document).ready(()=>{
    init();
});