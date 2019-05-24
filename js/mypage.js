


var user= null;
var scores= null;
var posts= null;
var favors= null;

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
                    <div class="content" onclick="window.location='./game.php?gId=${value.game_id}'">
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
                </div>
                <div class="tip" id="intro">
                    ${user.introduce? user.introduce: emptyIntro}
                </div>
                <div class="activityHistories">
                    <div class="button">
                        <div class="icon" id="favorListBtn" onclick="openFavorList()">
                            <img src="./res/fill_heart.png" alt="">
                            <span class="number" id="reserveNumber">${favors? favors.length: '0'}</span>
                        </div>
                        <p class="explain">찜한 게임</p>
                    </div>
                    <div class="button">
                        <div class="icon" id="scoreListBtn" onclick="openEstimatedList()">
                            <img src="./res/fill_star.png" alt="">
                            <span class="number" id="estimateNumber">${scores? scores.length: '0'}</span>
                        </div>
                        <p class="explain">평가목록</p>
                    </div>
                    <div class="button">
                        <div class="icon" id="">
                            <img src="./res/menu.png" alt="">
                            <span class="number" id="postNumber">1</span>
                        </div>
                        <p class="explain">커뮤니티 목록</p>
                    </div>
                </div>
            </div>
            <div class="cummunities">
                <p class="title">
                    커뮤니티 목록(이였던 것)
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
                    <th class="no">No.</td>
                    <th class="titles">Title</td>
                    <th class="date">Date</td>
                    <th class="view">View</td>
                </tr>
                ${
                    posts?
                    posts.map((value)=>{
                        return `<tr  onclick="window.location='./post.php?pid=${value.id}'">
                            <td class='no'>${value.id}</td>
                            <td class="titles">${value.title} 
                                <span style="color: orange">${value.comment_count? `[${value.comment_count}]`: ''}
                                </span>
                            </td>
                            <td class="date">${value.created_at.slice(0, 10)}</td>
                            <td class="view">${value.views}</td>
                        </tr>`;
                    }).join('')
                    :
                    ''
                }
            </tbody>
        </table>
    </div>
    <br/><br/><br/><br/><br/>    
    `;
    $("#board").html(contents);

    offLoading();
}
$(document).ready(()=>{
    loadData();

});