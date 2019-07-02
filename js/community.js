
var postList= [];
var favoriteList= [];
var currentCommunity= [];

const loadNum= 10;
const param= getUrlParams();


const searchPosts= ()=>{
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
}

const setBoardName= (data)=>{
    let cName;
    switch(parseInt(param.gId)){
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
    $("#communityName #name").html(`
        ${
            data.game_title?
            `${data.game_title} 게시판`:
            `${cName}`
        }
    `);    
}
const loadPosts= (query)=>{
    onLoading();
    api.loadPosts(query, (success, data)=>{
        offLoading();
        if(success){
            if(data.length== 0){
                if(postList.length== 0) makeToast('이 게시판에는 아직 포스트가 없습니다.<br/>첫 게시글의 주인공이 되어보세요!');
                else makeToast(`더 이상 게시글이 없습니다`);
            }
            postList= postList.concat(data);
            setBoardName(data);
            renderPost(data, $("#recentPosts .postList"));            
        }
    });
}

const postQueryBuild= ()=>{
    const query= {
        limit: loadNum,
        offset: postList.length,
    };

    //전체게시판
    if(!param.gId)
        return query;

    switch(parseInt(param.gId)){
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
            query.game_id= param.gId;
    }
    return query;
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

const initQuickMenu= ()=>{
    const currents= $(".communityQuickMenus .currents");
    const favors= $(".communityQuickMenus .favors");

    if(loginCheck()){
        //로그인 되었을 경우에만 즐겨찾기, 최근커뮤니티 사용 가능
        currents.mouseover(()=>{
            currents.find(".list").css('display', 'block');
        }).mouseout(()=>{
            currents.find(".list").css('display', 'none');
        });
        currents.find(".list").html(
            currentCommunity.map((value)=>{
              return `<div><a href='${value.link}'>${value.name}</a></div>`;  
            })
        );
    
        favors.mouseover(()=>{
            favors.find('.list').css('display', 'block');
        }).mouseout(()=>{
            favors.find('.list').css('display', 'none');
        });
        favors.find(".list").html(
            favoriteList.map((value)=>{
                return `<div><a href='./community.php?gId=${value.id}'>
                        ${value.title.length>9? value.title.slice(0,9)+'...': value.title}
                    </a></div>`;  
            })
        );
    }else{
        currents.remove();
        favors.remove();
    }

    const basics= $(".communityQuickMenus .basic").mouseover(()=>{
        basics.find('.list').css('display', 'block');
    }).mouseout(()=>{
        basics.find('.list').css('display', 'none');
    });


    //기본 게시판에는 즐겨찾기 불가능
    if(param.gId<0 || !param.gId)
        $("#isFavor").css("display", "none");
    else
        $("#isFavor").attr('src', `./res/${isFavorBoard()? '': 'no'}fill_star.png`)
                    .attr('onclick', `controlFavorites(${param.gId}, ${isFavorBoard()})`);
};


const openSearchGame= ()=>{
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
};

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
const getBoardName= ()=>{
    const name= $("#communityName #name").text().trim();
    if(parseInt(param.gId)<= 0){
        return name;
    }else{
        return name.slice(0, name.length-4);
    }
}

const isFavorBoard= ()=>{
    const target= param.gId;
    let result= false;
    favoriteList.map((value)=>{
        if(target== value.id)
            result= true;
    });
    return result;
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
            if(wanted) favoriteList.push({id: targetId, title: getBoardName()});
            else favoriteList= deleteElementFromArray({id: targetId, title: getBoardName()}, favoriteList);
            initQuickMenu();
        }
    });
}   

$(document).ready(()=>{
    const msg= getUrlParams().msg;
    if(msg) makeToast(msg);

    // post
    loadPosts(postQueryBuild());

    //notice / news
    onLoading();
    api.loadNotices(4, (success, data)=>{
        if(success){
            renderPost(data, $("#notices > .postList"), true);
        }
    });
    
    api.loadNews((success, news)=>{
        if(success){
            if(news.length== 0) $("#news").css('display', 'none');
            else renderPost(news, $("#news .postList"));            
        }else{
            $("#news").css('display', 'none');
        }
    });
    //QuickMenu 
    if(loginCheck()){
        api.loadFavorites(uid, (success, data)=>{
            offLoading();
            if(success){
                const games= data;
                games.map((value)=>{
                    favoriteList.push(value);
                });
                print(games);
                print(favoriteList);
                initQuickMenu();            
            }
        });
    }else{
        offLoading();
        initQuickMenu();
    }
});