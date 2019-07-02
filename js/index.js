
var currentGameIdx= 0;
var gameListStoreTarget;
const gameList= [];
var scores= [];
var currentScore= 5.0;
var followList= [];


const loadMyScores= (num)=>{
    //If not logined, score info will be not loaded
    if(!uid || !token){
        if(num) loadMoreGames(num);
        else loadMoreGames(3);
        return;
    }

    api.loadMyScores(uid, (success, data)=>{
        if(success){
            data.games.map((value)=>{
                scores.push(value.id);
            });
            if(num) loadMoreGames(num);
            else loadMoreGames(3);
        }
    });
}
const isEstimated= (gId)=>{
    if(!loginCheck())
        return false;

    if(!scores || scores.length== 0) return false;
    for(let l= 0; l< scores.length; l++){
        if(scores[l].id== gId){
            return true;
        }
    }
    return false;
}
const showGameDetailInfo= (game)=>{
    const detailView= `
            <section class="gameDetailWrapper_container">
                <div class="gameDetailWrapper">
                    <ul class="menus">
                        <li><img src="./res/share.png" alt="" id="gameDetail_shareBtn"></li>
                        <li><img src="./res/writing.png" alt="" id="gameDetail_estimateBtn"></li>
                        <li><img src="./res/x.png" alt="" id="gameDetail_closeBtn"></li>
                    </ul>
                    <div class="gameDetailContents">
                        ${
                            game.videos[0]?
                             `
                             <iframe src="${convertYoutubeUrl(game.videos)}" class="gameDetailVideo"
                            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                            </iframe>
                             `
                             :
                             `<img src='./res/sorry.png' class='gameDetailVideo/>'`}
                        
                        <div class="gameDetailInfos">
                            <ul class="tabs">
                                <li id="explain" class="selected">게임설명</li>
                                <li id="review">리뷰</li>
                                <li id="userReview">유저리뷰</li>
                            </ul>
                            <div class="contents">

                            </div>
                            <div class="gameDetailComments">
                                <span>${game.created_at}</span>
                                <span>${game.score? game.score: '0'}</span>
                            </div>
                        </div>
                    </div>    
                    <p class="titleAndScore">${game.title}</p>
                </div>
            </section>
        `;
        $("body").append(detailView);
        const container= $(".gameDetailWrapper_container");
        container.find("#gameDetail_closeBtn").click(()=>{
            container.fadeOut('fast', ()=>{
                container.remove();
            });
        });
}
//if return is null, that game is not loaded game.
const findGame= (gId)=>{
    let target= null;
    for(let l= 0; l< gameList.length; l++){
        if(gameList[l].id== gId){
            target =gameList[l];
        }
    }
    return target;
}
const getGameScore= (gId)=>{
    for(let l= 0; l< scores.length; l++){
        if(scores[l].id== gId){
            return scores[l].score;
        }
    }
    return 0;
}
const togglefollowStatus= (gId)=>{
    if(!loginCheck()){
        needLoginMsg();
        return;
    }

    //find game as gId
    let target= findGame(gId);

    //toggle follow state
    axios.request({
        method: `${isFollowGame(target.id)?`DELETE`: `POST`}`,
        url: `http://api.gamepicker.co.kr/games/${gId}/follow`,
        headers: buildHeader()
    }).then(response=>{
        if(response.status== "204"){
            if(isFollowGame(target.id)){
                //remove follow
                followList[followList.findIndex((i)=>(target.id===i))]= -1;
                makeToast(`${target.title}이(가) 찜 목록에서 제거되었습니다`);
            }else{
                //enroll follow
                makeToast(`${target.title}이(가) 찜 목록에 등록되었습니다`);
                followList.push(target.id);
            }
            //refresh isfollow view
            $(`#followBtn_${gId}`).html(`
                <span class="icon ${isFollowGame(target.id)? 'reserved': 'notReserved'}"></span>
                <p class="explain">${isFollowGame(target.id)? "찜": "찜하기"}</p>
            `);
        }else{
            throw(response.status);
        }
    }).catch(e=>{
        if(isFollowGame(target.id)) makeToast('찜 목록에서 삭제 도중 오류 발생. 다시 시도하세요.');
        else makeToast('찜 목록에 등록 도중 오류 발생. 다시 시도하세요.');
    });
}


const submitGameScore= (gId)=>{
    onLoading();
    api.estimateGame(gId, currentScore, (isSuccess, data)=>{
        if(isSuccess){
            makeToast(`평가 완료!`);
            closePopup();
            scores.push({
                score: currentScore,
                id: gId
            });
            $(`#scoreBtn_${gId}`).html(`
                <span class="icon ${isEstimated(gId)? 'estimated': 'notEstimated'}"></span>
                <p class="explain">${isEstimated(gId)? '평가됨 ('+getGameScore(gId)+ ')': '평가하기'}</p>
            `);
        }else{
            offLoading();
            print('Score Fail : '+ data);
        }
    });
};

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
const estimateGame= (gId)=>{
    if(!loginCheck()){
        needLoginMsg();
        return;
    }
    currentScore= 5.0;
    const target= findGame(gId);
    if(!target){
        makeToast(`오류 발생. 새로고침하세요.`);
        return;
    }
    buildPopup(`${target.title} 평가`, `
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
                click: ()=>{submitGameScore(gId)}
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

const loadMyFollows= ()=>{
    if(!loginCheck()){
        loadMyScores(9);
        return;
    }

    axios.request({
        method: 'GET',
        url: `http://api.gamepicker.co.kr/users/${uid}/games/follow`,
        headers: buildHeader()
    }).then(response=>{
        offLoading();
        if(response.status== "200"){
            //DEV...
            print(response.data.games);
            response.data.games.map((value)=>{
                followList.push(value.id);
            });
            loadMyScores(9);
        }else{
            throw(response.status);
        }
    }).catch(e=>{
        offLoading();
    });
}
const isFollowGame= (gId)=>{
    if(followList.length== 0)
        return false;

    for(let l=0; l< followList.length; l++){
        if(gId== followList[l]){
            return true;
        }
    }
    return false;
}


const buildPolaroid= (game, parent)=>{
    const fixedScore= getFixedScore(game.score);
    

    // Status: Login
    isfollow= isFollowGame(game.id);
    const building= `
        <div class="polaroid">
            <div class="thumbnails" id="game_${game.id}" onclick="window.location='./game.php?gId=${game.id}'">
                <img src="${game.images && game.images[0]? '': "./res/sorry.png"}" alt="게임 썸네일" style="width:100%">
                <p class="gameName">${game.title}</p>
            </div>
            <div class="texts">
                <p class="platform">플랫폼 : ${
                    game.platforms? game.platforms.join(', '): '정보가 준비중입니다'
                }</p>
                <p class="score">
                    ${
                        parseInt(fixedScore)==0?
                        `아직 평가가 없습니다`
                        :
                        `평점 : <span class="highlight">${fixedScore}★</span> (${game.score_count})`
                    }
                </p>
            </div> 
            <div class="buttons">
                <div class="button" id="followBtn_${game.id}" onclick="togglefollowStatus(${game.id})">
                    <span class="icon ${isfollow? 'reserved': 'notReserved'}"></span>
                    <p class="explain">${isfollow? "찜": "찜하기"}</p>
                </div>
                <div class="button" id="scoreBtn_${game.id}" onclick="estimateGame(${game.id})">
                    <span class="icon ${isEstimated(game.id)? 'estimated': 'notEstimated'}"></span>
                    <p class="explain">${isEstimated(game.id)? '평가됨 ('+getGameScore(game.id)+ ')': '평가하기'}</p>
                </div>
                <div class="button" onclick="window.location='./community.php?gId=${game.id}'">
                    <span class="icon community"></span>
                    <p class="explain">커뮤니티</p>
                </div>
            </div>
            <span class="floatingScore" id="fScore_${game.id}" style="${fixedScore==0 ? 'display: none':''}">${fixedScore}</span>
        </div>
        `;
    if(parent) parent.append(building);
    else gameListStoreTarget.append(building);
    
    if(game.images && game.images[0]){
        checkCanLoad(game.images[0], (success)=>{
            if(success){
                $(`#game_${game.id} img`).attr('src', game.images[0]);
            }else{
                $(`#game_${game.id} img`).attr('src', './res/sorry.png');
            }
        });
    }
}

const loadMoreGames= (lim)=>{
    api.loadGames(lim, currentGameIdx, (isSuccess, data)=>{
        if(isSuccess){
            currentGameIdx+= 3;

            const {games}= data;
            for(const idx in games){
                gameList.push(games[idx]);
                print(gameList);
                buildPolaroid(games[idx]);
            }
        }else{
            makeToast('게임 불러오기에 실패했습니다. 새로고침을 권장합니다');
            print(data);
            offLoading();
        }
    });
};

const openSearchGame= ()=>{
    buildPopup('게임 찾기', 
        `<input type="text" id="gameNameInput" class="customInputStyle" 
            placeholder="여기에 검색할 게임의 제목을 입력하세요."
            style="width: 94%; margin: 2% 3% 0 3%"/>
            <br/>
            <div class="searchResults"
                style="
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-content: center;
                flex-wrap: wrap; 
                width: 94%; 
                margin: 2% 3% 2% 3%">
            </div>
    `,{
        name: '검색',
        click: ()=>{
            searchGame();
        }
    });
        
    $("#gameNameInput").keydown((e)=>{
        if(e.key== 'Enter')
            searchGame();
    });
};
const searchGame= ()=>{
    onLoading();
    api.searchGame($("#gameNameInput").val(), (success, data)=>{
        offLoading();
        if(success){
            const results= data.games;
            if(results.length== 0)
                makeToast('해당 단어를 포함하는 게임을 찾을 수 없습니다<br/>외국 게임이라면 영문으로 검색해 보세요.');
            else
                makeToast(`${results.length}개의 게임이 검색되었습니다`);
                
            const resultWrapper= $(".searchResults").html('');
            results.map((value)=>{
                buildPolaroid(value, resultWrapper);
            });
        }
    });
}

$(document).ready(()=>{
    gameListStoreTarget= $(".games");
    loadMyFollows();
});