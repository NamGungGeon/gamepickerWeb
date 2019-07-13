


var user= null;
var scores= null;
var posts= null;
var favors= null;
var bookmarks= null;

var post_limit= getUrlParams().limit? 
                    (parseInt(getUrlParams().limit)? parseInt(getUrlParams().limit): 10)
                    : 10;
var delta_post_limit= 10;

var emptyIntro= '아직 자기소개를 작성하지 않았습니다';


const loadData= async ()=>{
    onLoading();
    if(!loginCheck()){
        alert('로그인이 필요한 기능입니다');
        window.location= './login.php?back='+ window.location.href;
    }

    await api.loadMyInfo((success, data)=>{
        if(success)
            user= data;
    });
    
    await api.loadMyPosts((success, data)=>{
        if(success)
            posts= data;
    });
    await api.loadMyScores(uid, (success, data)=>{
        if(success)
            scores= data.games;
    });
    await api.loadFollows((success, data)=>{
        if(success)
            favors= data;
    });
    await api.loadFavorites(uid, (success, data)=>{
        if(success)
            bookmarks= data;

    });
    renderPage();
}


const changeIntroduction= ()=>{
    buildPopup('자기소개 변경', 
        `<div class="introChangeWrapper">
            <textarea id="introInput" autofocus placeholder="여기에 자기소개를 입력하세요." maxlength="500" style="height: 400px; width: 100%">
            </textarea>
        </div>
    `, {
        name: '제출',
        click: ()=>{
            //submit
            const introText= $("#introInput").val();
            api.updateIntroduce(introText, (success, data)=>{
                if(success){
                    closePopup();
                    makeToast("자기소개가 수정되었습니다");
                    user.introduce= introText? introText: '';
                    $("#intro").text(introText? introText: '아직 자기소개를 작성하지 않았습니다');
                }
            });
        }
    });
    $("#introInput").text(`${user.introduce? user.introduce : ''}`);
};


const openFavorList= ()=>{
    if(!favors || favors.length==0){
        makeToast("찜한 게임이 아직 없습니다");
        return;
    }
    buildPopup('찜한 게임 목록', 
        `
        ${
            favors.map((value)=>{
                return `
                    <div class="content" onclick="window.location='./game.php?gId=${value.id}'">
                        <img src="${value.images[0]}" alt="">
                        <div class="description">${value.title}</div>
                    </div>
                `;
            }).join('')
        }
        `);
}
const openEstimatedList= ()=>{
    if(!scores || scores.length==0){
        makeToast("평가한 게임이 아직 없습니다");
        return;
    }
    buildPopup('평가한 게임 목록', 
        `
        ${
            scores.map((value)=>{
                return`
                    <div class="content" onclick="window.location='./game.php?gId=${value.id}'">
                        <img src="${value.images.length!== 0? value.images[0]: './res/sorry.png'}" alt="">
                        <div class="description scores">
                            <p class="title">${value.title}</p>
                            <p class="score">★${value.score}</p>
                        </div>
                    </div>
                `;
            }).join('')
        }
        `);
}
const openBookmarks= ()=>{
    if(!bookmarks || bookmarks.length== 0){
        makeToast('즐겨찾기에 등록한 커뮤니티가 없습니다');
        return;
    }
    buildPopup('즐겨찾는 커뮤니티',
        `
        ${
            bookmarks.map((value)=>{
                return `
                    <div class="content" style="height: initial" onclick="window.location='./community.php?gId=${value.id}'">
                        <b>${value.title}</b>
                    </div>`;                
            }).join('')
        }
        `);
};

const renderPage= ()=>{

    const contents= `
        <div class="overviews">
        <div class="profileImageWrap">
            <img src="${user.profile? user.profile: './res/user.png'}" alt="" id="profileImage" onclick="deving()">
        </div>
        <div class="texts">
            <div class="myInfos">
                <div class="nicknames">
                    <span id="nickname">
                        ${user.name}
                    </span>
                    <img src="./res/pen.png" id="changeNicknameBtn" onclick="changeIntroduction()">    
                    <div class="tip" id="intro">
                        ${user.introduce? user.introduce: emptyIntro}
                    </div>
                </div>
                <div class="activityHistories">
                    <div class="button">
                        <div class="icon" id="favorListBtn" onclick="openFavorList()">
                            <img src="./res/fill_heart.png" alt="">
                            
                        </div>
                        <p class="explain">찜한 게임 <span class="number" id="reserveNumber">(${favors? favors.length: '0'})</span></p>
                    </div>
                    <div class="button">
                        <div class="icon" id="scoreListBtn" onclick="openEstimatedList()">
                            <img src="./res/fill_star.png" alt="">
                            
                        </div>
                        <p class="explain">평가목록 <span class="number" id="estimateNumber">(${scores? scores.length: '0'})</span></p>
                    </div>
                    <div class="button">
                        <div class="icon" id="" onclick="openBookmarks()">
                            <img src="./res/menu.png" alt="">
                        </div>
                        <p class="explain">커뮤니티 목록 <span class="number" id="postNumber">(1)</span></p>
                    </div>
                </div>
            </div>
            <div class="cummunities desktop">
                <p class="title">
                    최근 방문 커뮤니티
                    <br/>
                    <br/>
                    ${
                        User.latestCommunity().map((value, idx)=>{
                            if(idx>= 4)
                                return;
                            return `<div style="cursor: pointer; margin: 5px 0" onclick='window.location= ${value.link}'>${value.title}</div>`;
                        }).join('')
                    }
                </p>
            </div>
        </div>
    </div>
    <br/><br/><br/><br/><br/>
    <div class="description">
        <p class="title leftBorder">분석하기</p>
        <br/>
        <p class="explain">데이터를 기반으로 나의 게임 성향을 분석합니다</p>
        <br/><br/>
        <div class="analyzeOptions">
            <div class="option cloud" onclick="deving()">
                <p class="title">클라우드기반</p>
                <p class="highlight">게임성향분석</p>
                <br/><br/>
                <img src="./res/graph.png" alt="">
            </div>
            <div class="option pie" onclick="deving()">
                <p class="title">파이차트기반</p>
                <p class="highlight">플랫폼별분석</p>
                <br/><br/>
                <img src="./res/pie.png" alt="">
            </div>
        </div>
    </div>
    <br/><br/><br/><br/><br/>
    <div class="description">
        <p class="leftBorder title">나의 글 목록</p>
        <br/>
        <p class="explain">내가 쓴 글 전체 목록입니다</p>
        <br/><br/>
        <table class="myPostTable">
            <tbody>
                <tr>
                    <th class="no desktop">No.</td>
                    <th class="titles">
                        <span class="desktop">Title</span>
                        <span class="mobile">Post</span>
                    </td>
                    <th class="date desktop">Date</td>
                    <th class="view desktop">View</td>
                </tr>
                ${
                    posts?
                    posts.map((value, idx)=>{
                        if(idx+1 > post_limit)
                            return;
                        return `<tr  onclick="window.location='./post.php?pid=${value.id}'">
                            <td class='no desktop'>${value.id}</td>
                            <td class="titles">${value.title} 
                                <span style="color: orange">${value.comment_count? `[${value.comment_count}]`: ''}
                                </span>
                                <br/>
                                <div class="mobile sub">
                                    조회수: ${value.views} &nbsp;&nbsp;&nbsp; 작성일: ${convertTime(value.created_at)}
                                </div>
                            </td>
                            <td class="date desktop">
                                <span class="desktop">${convertTime_new(value.created_at).converted}</span>
                            </td>
                            <td class="view desktop">${value.views}</td>
                        </tr>`;
                    }).join('')
                    :
                    ''
                }
            </tbody>
        </table>
        <br/>
        <div class="postList_options">
            <span class="imgBtn" onclick="moreLoadPostList()">
                <img src="./res/more_white.png"/>
            </span>
        </div>
    </div>
    <br/><br/><br/><br/><br/>    
    `;
    $("#board").html(contents);

    offLoading();
}

const moreLoadPostList= ()=>{
    if(posts.length< post_limit){
        makeToast('더 이상 불러올 포스트가 없습니다');
        return;
    }
    post_limit+= delta_post_limit;
    Url.replace(`./mypage.php?limit=${post_limit}`);

    const render= `<tbody>
                <tr>
                    <th class="no desktop">No.</td>
                    <th class="titles">
                        <span class="desktop">Title</span>
                        <span class="mobile">Post</span>
                    </td>
                    <th class="date desktop">Date</td>
                    <th class="view desktop">View</td>
                </tr>
                ${
                    posts?
                    posts.map((value, idx)=>{
                        if(idx+1 > post_limit)
                            return;
                        return `<tr  onclick="window.location='./post.php?pid=${value.id}'">
                            <td class='no desktop'>${value.id}</td>
                            <td class="titles">${value.title} 
                                <span style="color: orange">${value.comment_count? `[${value.comment_count}]`: ''}
                                </span>
                                <br/>
                                <div class="mobile sub">
                                    조회수: ${value.views} &nbsp;&nbsp;&nbsp; 작성일: ${convertTime(value.created_at)}
                                </div>
                            </td>
                            <td class="date desktop">
                                <span class="desktop">${convertTime_new(value.created_at).converted}</span>
                            </td>
                            <td class="view desktop">${value.views}</td>
                        </tr>`;
                    }).join('')
                    :
                    ''
                }
            </tbody>`
    $("table.myPostTable").html(render);
}
$(document).ready(()=>{
    loadData();

});