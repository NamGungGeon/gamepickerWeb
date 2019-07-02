var saved= null;
const pid= getUrlParams().pid;
const isNotice= getUrlParams().isNotice;
var gId;
var boardInfo;


const openReportPopup= ()=>{
    buildPopup('게시글 신고',
            `<p style="text-align: center; font-size: 25px;">
                <br/>
                정말 이 게시글을 <span style="font-weight: 600; color: red;">신고</span>하시겠습니까?
                <br/>
                (관리자의 검토 후에 적절한 조치가 취해지며, 허위 신고시 제재를 받을 수 있습니다)
                <br/><br/>
            </p>`,
            {
                name: '신고',
                click: ()=>{
                    onLoading();
                    api.reportPost(pid, (success)=>{
                        offLoading();
                        if(success) closePopup();
                    });
                }
            });
}

const confirmDelete= ()=>{
    const deletePost= ()=>{
        onLoading();
        api.deletePost(pid, (success)=>{
            offLoading();
            if(success){
                window.location= buildUrlWithParams('./community.php', {
                    gId,
                    msg: '게시글이 삭제되었습니다'
                });
            }       
        });
    };

    buildPopup('게시묵 삭제', `정말로 이 게시글을&nbsp;<span style="font-weight: 600;color: red;">삭제</span>&nbsp;하시겠습니까?` ,
            {
            name: '삭제',
            click: ()=>{
                deletePost();
            }
        });
};

const readySubcomment= (id)=> {
    const after= $(`#comment_${id} + .subFactory`);
    if(after.length>=1){
        after.remove();
        return;
    }
    const check= $(".subFactory");
    if(check.length>=1){
        check.remove();
    }
    $("#comment_"+ id).after(`    
        <div class="commentFactory subFactory">
            <textarea id="subInputs" autofocus 
            ${token? 'placeholder="여기에 대댓글을 입력하세요 (100자 이하)"': 'placeholder="로그인 한 사용자만 댓글 작성이 가능합니다" disabled'}/>
            <button id="submitSubComment" onclick="submitSubComment(${id})">작성</button>
        </div>
    `);
};
const submitSubComment= (id)=>{
    //process
    const commentInputs= $("#subInputs");
    if(commentInputs.val().length== 0){
        makeToast('댓글을 입력해주세요');
        return;
    }else if(commentInputs.val().length>100){
        makeToast(`댓글은 100자 이하로 입력해주세요`);
        return;
    }
    onLoading();
    axios.request({
        method: 'POST',
        url: `http://api.gamepicker.co.kr/posts/${pid}/comments`,
        headers: buildHeader(),
        data:{
            value: commentInputs.val(),
            parent_id: id
        }
    }).then(response=>{
        offLoading();
        if(response.status== "204"){
            //end
            $(".subFactory").remove();
            makeToast(`대댓글 작성 완료!`);
            //reload
            loadComments();
        }else{
            throw(response.status);
        }
    }).catch(e=>{
        makeToast(`대댓글 작성에 실패했습니다. 다시 시도하세요.`);
        offLoading();
    });
};
const openRemovePopup= (commentId)=>{
    buildPopup('댓글 삭제', 
            `
            <p style="text-align: center; font-size: 25px;">
                <br/>
                정말 이 댓글을 <span style="color: red; font-weight: 600;">삭제</span>하시겠습니까?
                <br/>
                (삭제 후에는 복구할 수 없습니다)<br/><br/>
            </p>
            `, 
            {
                name: '삭제',
                click: ()=>{removeComment(commentId)}
            });
}
const removeComment= (commentId)=>{
    onLoading();
    api.removeComment(saved.id, commentId, (success, data)=>{
        offLoading();
        if(success)
            loadComments();
    });
}

const buildComments= (comments)=>{
    const merged= comments.map((value, idx)=>{
        const recomment= value.comments.map((v)=>{
            return `
                <div class="subcomment">
                    <span class="submark">ㄴ</span>
                    <p class="content">${v.value}</p>
                    <p class="uName"><b>${v.name}</b>&nbsp;&nbsp${convertTime(v.created_at)}</p>
                    <div class="controller">
                        ${v.user_id== uid? 
                            `<span class="imgBtn" onclick="openRemovePopup(${v.id})">
                                <img class="icon" src="./res/trash.png" alt="삭제"/>
                            </span>`
                            : 
                            ''}
                        </div>
                </div>  
            `;
        }).join('');
        return `<div class="comment" id="comment_${value.id}" onclick="readySubcomment(${value.id})">
                    <p class="content">${value.value}</p>
                    <p class="uName"><b>${value.name}</b>&nbsp;&nbsp;${convertTime(value.created_at)}</p>
                    <div class="controller">
                        ${value.user_id== uid? 
                            `<span class="imgBtn" onclick="openRemovePopup(${value.id})">
                                <img class="icon" src="./res/trash.png" alt="삭제"/>
                            </span>`
                        : ''}
                    </div>
                </div>
                    ${recomment}
                <hr style="height: 2px; border: none; background-color: #e9e9e9!important; color: none!important;">`;
    });
    $(".comments").html(merged);
    $("#commentSummary").html(`${comments.length==0? `아직 댓글이 없습니다. 첫 댓글을 작성해보세요!`: `${comments.length}개의 댓글이 있습니다`}`)
}
const loadComments= ()=>{
    api.loadComments(pid, (success, data)=>{
        offLoading();
        if(success)
            buildComments(data);
    });

}
const makeComments= ()=>{
    const commentInputs= $("#commentInputs");
    
    onLoading();
    api.makeComment(commentInputs.val(), (success, data)=>{
        offLoading();
        //reload
        if(success){
            commentInputs.val('');
            loadComments();
        }
    });
}


const buildPost= (post)=>{
    if(!post){
        offLoading();
        const tags=`
            <div class="error">
                <img alt='포스트 로딩 에러' src='./res/error.png'/>
                <br/>
                삭제되었거나 존재하지 않는 게시글입니다.
                <br/>
                <br/>
                <a href='./community.php' class='btn'>커뮤니티 홈으로</a>
            </div>
        `;
        $("#recentPosts").html(tags);
        return;
    }
    //set information of this post
    const info= getBoardInfo(post);
    boardInfo= info;
    saved= post;

    //build
    const tags=`
                <div class="description leftBorder">
                    <a href="./community.php${info.gId? `?gId=${info.gId}`: ''}" id="waybackhome">
                        ${info.name}
                    </a>
                </div>
                <div class="postBody">
                    <hr/>
                    <div class="titles">
                        ${post.title}
                    </div>
                    <p class='info'>
                        ${
                            !isNotice?
                            `
                                조회수: ${post.views}
                                &nbsp;                          
                            `
                            :''

                        }
                        작성시간: ${convertTime(post.created_at)}
                    </p>
                    <p class="nickname" ${isNotice? 'style="color: red!important;"':''}>
                        작성자: ${isNotice? '관리자': post.name}
                    </p>
                    <p class="msg">
                        <br/>
                        ${post.value}
                    </p> 
                    <br/><br/>
                    ${
                        isNotice?
                        '<br/><hr><br/>':
                        `
                        <div class="options" id="optionSet">
                            <div class="option ${post.recommended? 'invert': ''}" onclick="estimatePost(true, ${getUrlParams().pid})">
                                <img src='./res/good${post.recommended? '_white': ''}.png'/>
                                <br/>
                                <span class="explain">
                                    <b>추천${post.recommended?'됨':''}</b>
                                    (${post.recommends})
                                </span>
                            </div>
                            <div class="option ${post.disrecommended? 'invert': ''}" onclick="estimatePost(false, ${getUrlParams().pid})">
                                <img src='./res/bad${post.disrecommended? '_white': ''}.png'/>
                                <br/>
                                <span class="explain">
                                    <b>비추천${post.disrecommended?'됨':''}</b>
                                    (${post.disrecommends})
                                </span>
                            </div>
                        </div>
                        <br/>
                        <div class="controlCenter">
                            <span class='btn' onclick="window.location='./community.php${boardInfo.gId? '?'+ boardInfo.gId: ''}'">글목록</span>
                            <span class='btn' onclick="openReportPopup()">신고</span>
                            ${
                                post.user_id== uid?
                                `<span class='btn' onclick="window.location= './correct.php?pid=${pid}'">수정</span>
                                <span class='btn buzz' onclick="confirmDelete()">삭제</span>`
                                :''
                            }
                        </div>
                        <hr>
                        <p id='commentSummary' class='leftBorder'></p>
                        <div class="commentFactory">
                            <textarea id="commentInputs" autofocus 
                            ${token? 'placeholder="여기에 댓글을 입력하세요 (100자 이하)"': 'placeholder="로그인 한 사용자만 댓글 작성이 가능합니다" disabled'}/>
                            <button id="submitComment" onclick="makeComments()">작성</button>
                        </div>
                        <div class="comments">

                        </div>
                        `
                    }
                </div>
    `;
    $("#recentPosts").html(tags);
    loadComments();
};

const loadPost= (pid)=>{
    
    onLoading();
    api.loadPost(isNotice, pid, (success, data)=>{
        offLoading();
        if(success){
            buildPost(data);            
        }else{
            //실패 화면
            buildPost();
        }
    });
};

const estimatePost= (isRecommend, pid)=>{
    if(!token){
        makeToast('로그인이 필요한 기능입니다');
        return;
    }


    let target= `http://api.gamepicker.co.kr/posts/${pid}/`;
    let method= '';
    if(isRecommend){
        target+= 'recommend';
        method= saved.recommended? 'DELETE': 'POST';
    }
    else{
        target+= 'disrecommend';
        method= saved.disrecommended? 'DELETE': 'POST';
    }

    onLoading();
    axios.request({
        method: method,
        url: target,
        headers: {
            authorization: 'w6mgLXNHbPgewJtRESxh',
            'x-access-token': token
        }
    }).then(response=>{
        offLoading();
        if(response.status== "204"){
            makeToast(`${isRecommend? '추천': '비추천'} ${method==='DELETE'? '취소': ''} 되었습니다.`);

            const optionSet= $("#optionSet");
            if(isRecommend) {
                saved.recommended= !saved.recommended;
                if(saved.recommended) ++saved.recommends;
                else --saved.recommends;
            }
            else {
                saved.disrecommended= !saved.disrecommended;
                if(saved.disrecommended) ++saved.disrecommends;
                else --saved.disrecommends;
            }
            const post= saved;
            //rebuild optionSet
            optionSet.html(`
                <div class="option ${post.recommended? 'invert': ''}" onclick="estimatePost(true, ${getUrlParams().pid})">
                    <img src='./res/good${post.recommended? '_white': ''}.png'/>
                    <br/>
                    <span class="explain">
                        <b>추천${post.recommended?'됨':''}</b>
                        (${post.recommends})
                    </span>
                </div>
                <div class="option ${post.disrecommended? 'invert': ''}" onclick="estimatePost(false, ${getUrlParams().pid})">
                    <img src='./res/bad${post.disrecommended? '_white': ''}.png'/>
                    <br/>
                    <span class="explain">
                        <b>비추천${post.disrecommended?'됨':''}</b>
                        (${post.disrecommends})
                    </span>
                </div>            
            `);
        }else{
            print('not throwed');
        }
    }).catch(e=>{
        offLoading();
        makeToast(`추천/비추천${method==='DELETE'? '취소를': '을'} 사용할 수 없습니다. 다시 시도하세요.`);
        print(e);
    });
}

$(document).ready(()=>{
    if(!pid){
        alert(`잘못된 접근입니다. 전체 커뮤니티로 이동합니다`);
        window.location= './community.php';
    }else{
        loadPost(pid);
    }
});