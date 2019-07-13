


const checkStatus= (response)=>{
    if(parseInt(response.status/100)== 2){
        return true;
    }else{
        return false;
    }
}


//listener must be function (not allow null)
//After calling api, the result is passed as the parameter if listener with boolean
//if calling api is fail, will be used as listener(false, "ErrorMsg");
//if success, will be used as listener(true, response.data);
const api= {
    estimateGame: (gId, score, listener)=>{
        if(!loginCheck()){
            makeToast('로그인이 필요한 기능입니다');
            return;
        }
        const promise= axios.request({
            method: 'PUT',
            url: `http://api.gamepicker.co.kr/games/${gId}/score`,
            headers: buildHeader(),
            data: {
                score: score
            }
        }).then((response)=>{
            if(checkStatus(response)){
                makeToast(`평가 완료!`);
                listener(true, response.data);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            makeToast(`평가에 실패했습니다. 다시 시도하세요.<br/>이 문제가 지속된다면 새로고침을 권장합니다`);
            listener(false, e);
            print(e);    
                        
        });
        return promise;
    },
    loadGames: (limit, startIdx, listener)=>{
        const promise= axios.request({
            method: 'GET',
            url: `http://api.gamepicker.co.kr/games`,
            headers: buildHeader(),
            params: {
                limit: limit? limit: '6',
                offset: startIdx? startIdx: 0,
                sort: 'random'
            },
        }).then((response)=>{
            if(checkStatus(response)){
                listener(true, response.data);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            listener(false, e);
        });
        return promise;
    },
    loadMyScores: (uid, listener)=>{
        const promise= axios.request({
            method: 'GET',
            url: `http://api.gamepicker.co.kr/users/${uid}/games/score`,
            headers: buildHeader()
        }).then(response=>{
            if(checkStatus(response)){
                print(response.data);
                listener(true, response.data)
            }else{
                throw(response.status);
            }
        }).catch((e)=>{
            print(e);
            makeToast('평가점수 로딩에 실패했습니다.<br/>새로고침을 권장합니다');
            listener(false, e);
        });
        return promise;
    },
    loadGame: (gId, listener)=>{
        const promise= axios.get(`http://api.gamepicker.co.kr/games/${gId}`, {
            headers: buildHeader()
        }).then((response)=>{
            if(checkStatus(response)){
                print(response.data);
                listener(true, response.data)
            }else{
                throw(response.status);
            }
        }).catch((e)=>{
            print(e);
            listener(false, e);
        });
        return promise;
    },
    loadReviews: (gId, listener)=>{
        const promise= axios.request({
            method: 'GET',
            url: `http://api.gamepicker.co.kr/games/${gId}/comments`,
            headers: buildHeader(),
        }).then(response=>{
            if(checkStatus(response)){
                listener(true, response.data);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            listener(false, e);
            print(e);
            makeToast(`게임 리뷰 불러오기에 실패했습니다. 새로고침을 권장합니다.`);
        });
        return promise;
    },
    makeReview: (gId, content, listener)=>{
        if(!loginCheck()){
            makeToast('로그인이 필요한 기능입니다');
            return;
        }
        if(content.length== 0){
            makeToast(`리뷰 내용을 입력해 주세요`);
            return;            
        }

        const promise= axios.request({
            method: 'POST',
            url: `http://api.gamepicker.co.kr/games/${gId}/comments`,
            headers: buildHeader(),
            data: {
                value: content
            }
        }).then(response=>{
            if(checkStatus(response)){
                listener(true, response.data);
                makeToast(`리뷰가 성공적으로 등록되었습니다!`);     
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            listener(false, e);
            makeToast(`게임 리뷰 등록에 실패했습니다. 다시 시도하세요.<br/>
                        이 문제가 지속되면 새로고침을 권장합니다.`);
            print(e);
        });
        return promise;
    },
    followGame: (gId, isAdd, listener)=>{
        if(!loginCheck()){
            makeToast('로그인이 필요한 기능입니다');
            return;
        }
        const promise= axios.request({
            method: `${isAdd? 'POST': 'DELETE'}`,
            url: `http://api.gamepicker.co.kr/games/${gId}/follow`,
            headers: buildHeader(),
        }).then(response=>{
            if(checkStatus(response)){
                listener(true, response.data);
                if(isAdd) makeToast('찜 목록에 추가되었습니다');
                else makeToast('찜 목록에서 제거되었습니다');
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            listener(false, e);
            makeToast('찜 기능 사용 중 문제가 발생했습니다. 다시 시도하세요.<br/>이 문제가 반복되면 새로고침이 권장됩니다');
            print(e);
        });
        return promise;
    },
    searchGame: (word, listener)=>{
        if(word.length< 2){
            listener(false);
            makeToast('최소 2글자 이상 입력해 주세요');
            return;
        }
        
        const promise= axios.get('http://api.gamepicker.co.kr/games', {
            params: {
                search: word
            },
            headers: buildHeader()
        }).then((response)=>{
            listener(true, response.data);
        }).catch((e)=>{
            listener(false, e);
            makeToast('오류가 발생했습니다. 다시 시도하세요.');
            print(e);
        });
        return promise;
    },
    checkNickname: (nickname, listener)=>{
        if(!nickname){
            makeToast('닉네임을 입력하세요');
            listener(false);
            return;
        }

        onLoading();

        const promise= axios.request({
            method: 'GET',
            url: "http://api.gamepicker.co.kr/users?name="+nickname,
            headers: buildHeader()
        }).then((response)=>{
            offLoading();
            if(checkStatus(response)){
                const {data}= response;
                print(data);
                if(data.users.length!= 0){
                    makeToast('이미 존재하는 닉네임입니다');
                    listener(false);
                }else{
                    makeToast('사용할 수 있는 닉네임입니다');
                    listener(true);
                }
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            offLoading();
            makeToast('사용할 수 없는 닉네임입니다');
            print(e)
            listener(false, e);
        });
        return promise;
    },
    checkEmail: (email, listener)=>{
        if(!isValidEmail(email)){
            makeToast('올바른 이메일 형식이 아닙니다');
            listener(false);
            return;
        }

        onLoading();

        const promise= axios.request({
            method: 'GET',
            url: "http://api.gamepicker.co.kr/users?email="+email,
            headers: buildHeader()
        }).then((response)=>{
            if(checkStatus(response)){
                offLoading();
                const users= response.data.users;
                print(users);
                if(users.length!== 0){
                    listener(false);
                    makeToast("이미 존재하는 이메일입니다");
                }else{
                    listener(true);
                    makeToast("사용할 수 있는 이메일입니다");
                }
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            offLoading();
            makeToast('사용할 수 없는 이메일입니다');
            print(e)
            listener(false, e);
        });
        return promise;
    },
    loadMyPosts: (listener)=>{
        const promise= axios.request({
            method: 'GET',
            url: `http://api.gamepicker.co.kr/users/${uid}/posts`,
            headers: buildHeader(),
        }).then((response)=>{
            offLoading();
            if(checkStatus(response)){
                print(response.data);
                listener(true, response.data.posts);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            listener(false, e);
            makeToast(`내가 쓴 포스트를 로드할 수 없습니다`);
        });
        return promise;
    },
    loadMyInfo: (listener)=>{
        const promise= axios.request({
            method: 'GET',
            url: "http://api.gamepicker.co.kr/me",
            headers: buildHeader(),
        }).then((response)=>{
            if(checkStatus(response)){
                print(response.data);
                listener(true, response.data.user);                
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            listener(false, e);
            makeToast(`내 정보를 로드할 수 없습니다`);
        });
        return promise;
    },
    loadFollows: (listener)=>{
        const temp= axios.request({
            method: 'GET',
            url: `http://api.gamepicker.co.kr/users/${uid}/games/follow`,
            headers: buildHeader(),
        }).then(response=>{
            if(checkStatus(response)){
                print(response.data);
                listener(true, response.data.games);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            listener(false, e);
            makeToast('내 찜 목록을 불러올 수 없습니다');
        });
        return temp;
    },
    updateIntroduce: (text, listener)=>{
        const promise= axios.request({
            method: 'PUT',
            url: `http://api.gamepicker.co.kr/me`,
            headers: buildHeader(),
            data:{
                introduce: text
            }
        }).then(response=>{
            if(checkStatus(response)){
                listener(true);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            listener(false, e);
            makeToast(`자기소개 수정 중 오류가 발생했습니다. 다시 시도하세요`);
        });
        return promise;
    },
    loadPosts: (query, listener)=>{
        return axios.request({
            method: 'GET',
            url: "http://api.gamepicker.co.kr/posts",
            headers: buildHeader(),
            params: query
        }).then(response=>{
            if(checkStatus(response)){
                listener(true, response.data);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            print(e);
            listener(false, e);
            makeToast(`게시글 로딩 도중 오류가 발생했습니다.<br/>새로고침을 권장합니다.`);
        });  
    },
    loadNews: (listener)=>{
        return axios.request({
            method: 'GET',
            url: "http://api.gamepicker.co.kr/posts",
            headers: buildHeader(),
            params: {
                limit: 3,
                category: 'news'
            }
        }).then(response=>{
            if(checkStatus(response)){
                const news= response.data.posts;
                print(news);
                listener(true, news);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            print(e);
            listener(false, e);
        });  
    },
    loadPost: (isNotice, pid, listener)=>{
        const promise= axios.request({
            method: 'GET',
            url: isNotice? `http://api.gamepicker.co.kr/admin/notices/${pid}`: `http://api.gamepicker.co.kr/posts/${pid}`,
            headers: buildHeader()
        }).then(response=>{
            print(response);

            if(checkStatus(response)){
                if(isNotice){
                    const notice= response.data.notice;
                    listener(true, notice);
                }else{
                    const post =response.data.post;
                    listener(true, post);
                }
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            listener(false, e);
        });
        return promise;
    },
    updatePost: (pid, dataset, listener)=>{
        const promise= axios.request({
            method: 'PUT',
            url: `http://api.gamepicker.co.kr/posts/${pid}`,
            headers: buildHeader(),
            data: dataset
        }).then(response=>{
            print(response);

            if(checkStatus(response)){
                listener(true);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            makeToast('게시글 업데이트에 실패했습니다. 다시 시도하세요');
            listener(false, e);
            print(e);
        });
        return promise;
    },
    loadComments: (postId, listener)=>{
        const promise= axios.request({
            method: 'GET',
            url: "http://api.gamepicker.co.kr/posts/"+postId+"/comments",
            headers: buildHeader()
        }).then(response=>{
            if(checkStatus(response)){
                const data= response.data.comments;
                print(data);
                listener(true, data);

            }else{
                throw(response.status);
            }
        }).catch(e=>{
            makeToast(`댓글을 불러오지 못했습니다. 새로고침을 권장합니다.`);
            listener(false, e);
        });

        return promise;
    },
    removeComment: (postId, commentId, listener)=>{
        const promise= axios.request({
            method: 'DELETE',
            url: `http://api.gamepicker.co.kr/posts/${postId}/comments/${commentId}`,
            headers: buildHeader(),
        }).then((response)=>{
            if(checkStatus(response)){
                makeToast(`댓글이 삭제되었습니다`);
                listener(true);
            }else{
                throw(response.status);
            }
        }).catch((e)=>{
            listener(false, e);
            makeToast(`댓글 삭제에 실패했습니다.<br/>새로고침 후 다시 시도해 보세요.`);
        });

        return promise;
    },
    makeComment: (comment, listener)=>{
        if(!loginCheck()){
            makeToast(`로그인이 필요한 기능입니다`);
            listener(false)
            return;
        }
        if(comment.length== 0){
            makeToast(`댓글을 입력해주세요`);
            listener(false)
            return;
        }
        if(comment.length> 100){
            listener(false)
            makeToast(`댓글은 100자 이하로 입력해주세요`);
            return;
        }


        return axios.request({
            method: 'POST',
            url: `http://api.gamepicker.co.kr/posts/${pid}/comments`,
            headers: buildHeader(),
            data:{
                value: comment
            }
        }).then(response=>{
            if(checkStatus(response)){
                listener(true);
                makeToast(`댓글 작성 완료!`);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            makeToast(`댓글 작성에 실패했습니다. 다시 시도하세요.`);
            print('댓글 작성 실패', e);
            listener(false, e);
        });
    },
    loadFavorites: (uid, listener)=>{

        return axios.get(`http://api.gamepicker.co.kr/users/${uid}/games/favorites`, {
            params: {
                'user-id': uid
            },
            headers: buildHeader(),
        }).then((response)=>{
            if(checkStatus(response)){
                const games= response.data.games;
                print(games);
                listener(true, games);
            }else{
                throw(response.status);
            }
        }).catch((e)=>{
            makeToast('오류가 발생했습니다. 다시 시도하세요.');
            listener(false, e);
            print(e);
        });
    },
    updateFavorites: (targetId, currentState, listener)=>{
        if(targetId<=0){
            makeToast("게임 게시판이 아니면 즐겨찾기 할 수 없습니다");
            return;
        }
        if(!loginCheck()){
            makeToast('로그인이 필요한 기능입니다');
            return;
        }

        //wanted is true, add this board to favorite list
        //wanted is false, remove this board from favorite list
        const wanted= !currentState;
        
        return axios.request({
            headers: buildHeader(),
            params:{
                'game-id': targetId
            },
            method: `${wanted? 'POST':'DELETE'}`,
            url: `http://api.gamepicker.co.kr/games/${targetId}/favorites`,
        }).then((response)=>{
            if(checkStatus(response)){
                makeToast(`${wanted? '즐겨찾기에 성공적으로 추가되었습니다!' : '즐겨찾기에서 성공적으로 제거되었습니다'}`);
                
                listener(true);
            }else{
                throw(response.status);
            }
        }).catch((e)=>{
            makeToast('오류 발생으로 요청하신 작업을 완료하지 못했습니다.<br/>죄송합니다, 다시 시도해 주세요');
            print(e);
            listener(false, e);
        });
        
    },
    loadNotices: (lim, listener)=>{
        
        axios.request({
            method: 'GET',
            url: "http://api.gamepicker.co.kr/admin/notices",
            headers: buildHeader(),
            params: {
                limit: lim
            }
        }).then(response=>{
            if(checkStatus(response)){
                const notices= response.data.notices;
                print(notices);
                listener(true, notices);
            }else{
                throw(response.status);
            }
        }).catch((e)=>{
            makeToast(`공지사항 로딩 도중 오류가 발생했습니다.`);
            listener(false, e);
            print(e);
        });
    },
    deletePost: (pid, listener)=>{
        return axios.request({
            method: 'DELETE',
            url: `http://api.gamepicker.co.kr/posts/${pid}`,
            headers: buildHeader()
        }).then(response=>{
            if(checkStatus(response)){
                listener(true);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            makeToast(`게시글을 삭제할 수 없습니다. 이미 삭제된 게시물일 수 있습니다.`);
            listener(false, e);
            print(e);
        });
    },
    reportPost: (pid, listener)=>{
        if(!loginCheck()){
            makeToast('로그인이 필요한 기능입니다');
            return;
        }

        return axios.request({
            method: 'POST',
            url: `http://api.gamepicker.co.kr/posts/${pid}/report`,
            headers: buildHeader()
        }).then(response=>{
            if(checkStatus(response)){
                makeToast('게시글 신고가 완료되었습니다. 관리자의 검토 후 적절한 조치가 취해집니다.');
                listener(true);
            }else{
                throw(response.status);
            }
        }).catch(e=>{
            makeToast(`이미 신고한 게시글입니다`);
            listener(false, e);
            print(e);
        });

    }
}