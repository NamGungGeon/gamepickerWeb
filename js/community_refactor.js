
var currentCommunity= [];

const loadNum= 10;


const Page= {
    Ui: {
        Popup: {
            searchPost: ()=>{
                buildPopup('게시글 검색', `
                        <div style="overflow-y: scroll; text-align: center;">
                            <br/>
                            <input type='text' id="searchInput" placeholder='검색 키워드를 이곳에 입력하세요'/>
                            <br/>
                            <div class="post"></div>
                        </div>
                    `, {
                        name: '검색',
                        click: ()=>{deving()}
                    });
            },
            searchCommunity: ()=>{
                buildPopup('게시판 찾기', 
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
            },
            bookmarks: ()=>{
                if(!loginCheck()){
                    makeToast('로그인이 필요한 기능입니다');
                    return;    
                }

                if(!Page.Data.follows || Page.Data.follows.length== 0){
                    makeToast('즐겨찾기에 등록한 커뮤니티가 없습니다');
                    return;
                }
                buildPopup('즐겨찾는 커뮤니티',
                    `
                    ${
                        Page.Data.follows.map((value)=>{
                            return `
                                <div class="content" style="height: initial" onclick="window.location='./community.php?gId=${value.id}'">
                                    <b>${value.title}</b>
                                </div>`;                
                        }).join('')
                    }
                    `);
            },
            basicCommunity: ()=>{
                buildPopup('기본 커뮤니티',
                `
                ${
                    Page.Data.basicBoards.map((value)=>{
                        return `
                            <div class="content" style="height: initial" onclick="window.location='./community.php${value.id!==0? `?gId=${value.id}`: ''}'">
                                <b>${value.title}</b>
                            </div>`;                
                    }).join('')
                }
                `);
            },
            history: ()=>{
                const latests= User.latestCommunity();
                if(!latests || latests.length== 0){
                    makeToast('최근 방문한 커뮤니티가 없습니다<br/>만약, 쿠키 사용을 비활성화한 경우 이 기능을 사용할 수 없습니다');
                    return;
                }
                buildPopup('최근 방문한 커뮤니티',
                `
                ${
                    latests.map((value)=>{
                        return `
                            <div class="content" style="height: initial" onclick="window.location='${value.link}'">
                                <b>${value.title}</b>
                            </div>`;                
                    }).join('')
                }
                `);
            },
        },
        Render: {
            boardName: ()=>{
                let cName;
                switch(parseInt(getUrlParams().gId)){
                    case -1:
                        cName= '익명게시판';
                        break;
                    case -2:
                        cName= '자유게시판';
                        break;
                    case -3:
                        cName= '새 소식';
                        break;
                    case -4:
                        cName= '이벤트';
                        break;
                    case -5:
                        cName= '위키';
                        break;
                    default:
                        cName='전체게시판';
                }
                Page.Data.boardName= `
                    ${
                        Page.Data.game_title?
                        `${Page.Data.game_title}`:
                        `${cName}`
                    }
                `;
                $("#communityName #name").html(Page.Data.boardName);   
            },
            
        }
    },
    Data: {
        posts: [],
        follows: [],
        basicBoards: [
            {title: '전체게시판', id: 0},
            {title: '익명게시판', id: -1},
            {title: '자유게시판', id: -2},
            {title: '새 소식', id: -3},
            {title: '이벤트', id: -4},
            {title: '위키', id: -5},
        ],
        boardName: '',
        game_title: null,
    },
    Loader: {
        posts: ()=>{
            const query= Page.Util.postQueryBuild();
            onLoading();
            api.loadPosts(query, (success, data)=>{
                offLoading();
                if(success){
                    console.log('api.loadPosts()', data);
                    Page.Data.game_title= data.game_title;
                    if(data.posts.length== 0){
                        if(Page.Data.posts.length== 0) makeToast('이 게시판에는 아직 포스트가 없습니다.<br/>첫 게시글의 주인공이 되어보세요!');
                        else makeToast(`더 이상 게시글이 없습니다`);
                    }
                    Page.Data.posts= Page.Data.posts.concat(data.posts);
                    Page.Ui.Render.boardName();
                    renderPost(data.posts, $("#recentPosts .postList"));            
                }
            });
        }
    },
    Util: {
        postQueryBuild: ()=>{        
            const query= {
                limit: loadNum,
                offset: Page.Data.posts.length,
            };

            //전체게시판
            if(!getUrlParams().gId)
                return query;

            switch(parseInt(getUrlParams().gId)){
                case -1:
                    query.category= 'anonymous';
                    break;
                case -2:
                    query.category= 'free';
                    break;
                case -3:
                    query.category= 'news';
                    break;
                case -4:
                    query.category= 'event';
                    break;
                case -5:
                    query.category= 'wiki';
                    break;
                default:
                    query.category= 'games';
                    query.game_id= getUrlParams().gId;
            }
            return query;
        },
        isFavorBoard: ()=>{
            const target= getUrlParams().gId;
            let result= false;
            Page.Data.follows.map((value)=>{
                if(target== value.id)
                    result= true;
            });
            return result;
        }    
    },
    init: async ()=>{
        await Page.Loader.posts();
    
        onLoading();
    
        await api.loadNotices(4, (success, data)=>{
            if(success){
                renderPost(data, $("#notices > .postList"), true);
            }
        });
        
        await api.loadNews((success, news)=>{
            if(success){
                if(news.length== 0) $("#news").css('display', 'none');
                else renderPost(news, $("#news .postList"));            
            }else{
                $("#news").css('display', 'none');
            }
        });
        
        if(getUrlParams().gId && getUrlParams().gId> 0){
            User.latestCommunity({
                title: Page.Data.boardName,
                link: `./community.php${getUrlParams().gId? `?gId=${getUrlParams().gId}`:''}`
            });
        }
        //QuickMenu 
        if(loginCheck()){
            await api.loadFavorites(uid, (success, data)=>{
                offLoading();
                if(success){
                    const games= data;
                    games.map((value)=>{
                        Page.Data.follows.push(value);
                    });
                    print(games);
                    print(Page.Data.follows);

                    //기본 게시판에는 즐겨찾기 불가능
                    if(getUrlParams().gId<=0 || !getUrlParams().gId)
                        $("#isFavor").css("display", "none");
                    else
                        $("#isFavor").attr('src', `./res/${Page.Util.isFavorBoard()? '': 'no'}fill_star.png`)
                                    .attr('onclick', `controlFavorites(${getUrlParams().gId}, ${Page.Util.isFavorBoard()})`)
                                    .css('display', 'inline-block');      
                }
            });
        }else{
            offLoading();
        }
    }
};



const renderPost= (posts, target, isNotice)=>{
    if(!posts || posts.length== 0) return;

    const tags= posts.map((p)=>{
        return `
            <div class="post" onclick="window.location='./post.php?pid=${p.id}${isNotice? '&isNotice=true': ''}'">
                <div class="mInfo" style="${isNotice? 'width: 100%; max-width: 100%;': ''}">
                    <p class="titles">${p.title} 
                    ${isNotice? 
                        '': 
                        p.comment_count==0? '': `<span style='color: orange'>[${p.comment_count}]</span>`}
                    </p>
                    <span class="date">
                        ${convertTime(p.created_at)}
                    </span>
                    <p class="nickname">${isNotice? '관리자': p.name}
                    </p>
                </div>
                ${
                    isNotice? ''
                    :`
                    <ul class="sInfo">
                        <li class="recommandNum"><img src='./res/good.png'/>&nbsp;${p.recommends}</li>
                        <li class="viewNum"><img src='./res/eye.png'/>&nbsp;${p.views}</li>
                    </ul>
                    `
                }
            </div>
        `;
    });
    target.append(tags);
}

const buildPolaroid= (game, target)=>{
    const tag= `
    <div class="polaroid">
        <div class="thumbnails" id="game_${game.id}" onclick="window.location='./community.php?gId=${game.id}'">
            <img src="${game.images? game.images[0]: ""}" alt="게임 썸네일" style="width:100%">
            <p class="gameName">${game.title}</p>
        </div>
        <div class="texts">
            <p class="platform">플랫폼 : ${
                game.platforms? game.platforms.join(','): ''
            }</p>
            <p class="score">
                ${
                    getFixedScore(game.score)==0?
                    `아직 평가가 없습니다`
                    :
                    `평점 : <span class="highlight">${getFixedScore(game.score)}★</span> (${game.score_count})`
                }
            </p>
        </div> 
    </div>
    `;
    target.append(tag);
};

const searchGame= ()=>{
    const target= $("#gameNameInput").val();

    onLoading();
    api.searchGame(target, (success, data)=>{
        offLoading();
        if(success){
            const results= data.games;
            if(results.length== 0)
                makeToast('해당 단어를 포함하는 게임을 찾을 수 없습니다<br/>외국 게임이라면 영문으로 검색해 보세요.');
            else
                makeToast(`${results.length}개의 게임이 검색되었습니다<br/>게임 썸네일을 클릭하면 해당 게시판으로 이동합니다.`);
    
            const resultWrapper= $(".searchResults").html('');
            results.map((value)=>{
                buildPolaroid(value, resultWrapper);
            });
        }
    });
}

const controlFavorites= (targetId, currentState)=>{
    //wanted is true, add this board to favorite list
    //wanted is false, remove this board from favorite list
    const wanted= !currentState;
    api.updateFavorites(targetId, currentState, (success)=>{
        if(success){
            //UI update
            if(wanted) Page.Data.follows.push({id: targetId, title: Page.Data.boardName});
            else Page.Data.follows= deleteElementFromArray({id: targetId, title: Page.Data.boardName}, Page.Data.follows);

            $("#isFavor").attr('src', `./res/${Page.Util.isFavorBoard()? '': 'no'}fill_star.png`)
                                    .attr('onclick', `controlFavorites(${getUrlParams().gId}, ${Page.Util.isFavorBoard()})`)
                                    .css('display', 'inline-block');    
        }
    });
}   


$(document).ready(()=>{
    const msg= getUrlParams().msg;
    if(msg) makeToast(msg);
    
    Page.init();
});