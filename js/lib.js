
const isDev= true;


const print= (s)=>{
    if(isDev) console.log(s);
}

const isValidEmail=(email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const buildHeader= ()=>{
    let headers;
    if(token){
        headers= {
            authorization: 'w6mgLXNHbPgewJtRESxh',
            'x-access-token': token
        }
    }else{
        headers= {
            authorization: 'w6mgLXNHbPgewJtRESxh',
        }
    }
    return headers;
}

const getUrlParams= () =>{
    let qs= document.location.search;
    qs = qs.split('+').join(' ');

    let params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}


const onLoading= ()=>{
    if($("#loading").length>1){
        print('Already loading is progressed');
        return;
    }
    const loading= `<div id="loading"><div class="lds-roller" id="loadingAnimaion"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`;
    $("body").append(loading);
}

const offLoading= ()=>{
    $("#loading").remove();
}
function randStr() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 30; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

const makeToast= (text)=>{
    const rand= randStr();
    let toastWrapper= $(".toastWrapper");
    if(toastWrapper.length== 0){
        $("body").append(`<div class="toastWrapper"></div>`);
        toastWrapper= $(".toastWrapper");
    }
    toastWrapper.append(`
        <div class="toast" id="${rand}">${text}</div><br/>
    `);
    setTimeout(()=>{
        const msg= $(`#${rand}`).fadeOut("slow", ()=>{
            msg.remove();
        });
    }, 1000);
}
const closePopup= (uniqueId)=>{
    const popup= $(`.popupBackground${uniqueId?`#popup_${uniqueId}`:''}`);
    if(popup.length>=1){
        popup.fadeOut('fast', ()=>{
            popup.remove();
        });
    }
}

const convertYoutubeUrl= (input)=>{
    if(input.includes('https://youtu.be/')){
        const replaced= 'https://www.youtube.com/embed/'+ input.replace('https://youtu.be/', '');
        print(replaced);
        return replaced;
    }
    return input;
}

const loginCheck= (force)=>{
    if(force && !(token&&uid)){
        alert('로그인이 필요한 기능입니다');
        window.location= './login.php?back='+ window.location.href;
        return false;
    }
    return token&&uid;
}

const convertTime= (time)=>{
    const converted= moment(time.slice(0, time.length-3), "YYYY-MM-DD HH:mm").add(9, 'h');
    const relative= converted.fromNow();

    return `${relative}<span class="desktop">(${converted.format('YYYY-MM-DD hh:mm')})</span>`;
}
const convertTime_new =(time)=>{
    const converted= moment(time.slice(0, time.length-3), "YYYY-MM-DD HH:mm").add(9, 'h');
    const relative= converted.fromNow();
    return{
        converted: converted.format('YYYY-MM-DD hh:mm'),
        relative
    };
    
}
const needLoginMsg= ()=>{
    makeToast(`로그인이 필요한 기능입니다`);
}

const getFixedScore= (score)=>{
    if(score && score!= 0){
        return score.toFixed(1);
    }else{
        const zero= 0;
        return zero.toFixed(1);
    }
}

//@param of buildPopup
//title: popup's title. this string will be shown in the top of popup(window)
//bodyContent: html string. maybe this value looks like `<div>Hello~</div>`
//bottomBtn: bottom btn's attribute is decided.
//          {name: str, click: function}
const buildPopup= (title, bodyContent, bottomBtn)=>{
    const uniqueId= randStr();
    const tags= `
    <div class="popupBackground" id="popup_${uniqueId}">
        <div class="popupWrapper" id="eventShielder">
            <p class="popupTitle">
                <span id="closePopup" onclick="closePopup('${uniqueId}')"></span>
                ${title}
            </p>
            <div class="popupContents ${!!bottomBtn? '': 'roundBottom'}">
                <div class="scrollable">
                    ${bodyContent}
                </div>
            </div>
            ${
                !!bottomBtn?
                `<div class="buttons">
                    <span class="button" id="${uniqueId}">
                        ${bottomBtn.name? bottomBtn.name: '제출'}
                    </span>
                </div>
                `:''
            }
        </div>
    </div>
    `;
    $("body").append(tags);
    if(bottomBtn && bottomBtn.click){
        $(`#${uniqueId}`).click(bottomBtn.click);
    }
    $(`.popupBackground#popup_${uniqueId}`).mousedown((e)=>{
        closePopup(uniqueId);
    });
    $("#eventShielder").click((e)=>{
        e.stopImmediatePropagation();
    }).mousedown((e)=>{
        e.stopImmediatePropagation();
    });
}

const buildUrlWithParams= (origin, params)=>{
    if(!params)
        return origin;

    let result= origin+ "?";
    const keys=Object.keys(params);
    keys.map((value, idx)=>{
        if(!params[value]){
            return 0;
        }
        result+= `${value}=${params[value]}`;
        if(idx< keys.length-1)
            result+= '&';
    }); 
    return result;
}

const getBoardInfo= (post)=>{
    const result= {};
    switch(post.category){
        case 'free':
            result.gId= -2;
            result.name= "자유게시판"
            break;
        case 'anonymous':
            result.gId= -1;
            result.name= "익명게시판"
            break;
        case 'news':
            result.gId= -3;
            result.name= "새 소식"
            break;
        case 'event':
            result.gId= -4;
            result.name= "이벤트"
            break;
        case 'wiki':
            result.gId= -5;
            result.name= "이벤트"    
            break;
        default:
            if(isNotice){
                result.gId= 0;
                result.name= '공지사항';
            }else{
                result.gId= post.game_id;
                result.name=`${post.game_title} 게시판`;
            }
    }
    return result;
}

const deleteElementFromArray= (element, array)=>{
    const newArr= [];
    const isObj= typeof element == "object";
    array.map((value)=>{
        if(isObj){
            const keys= Object.keys(element);
            let isSame= false;
            keys.map((k)=>{
                if(element[k] == value[k]){
                    isSame= true;   
                }
            });
            if(!isSame){
                newArr.push(value);
            }
        }else{
            if(element== value){
                return;
            }
            newArr.push(value);
        }
    });

    return newArr;
}

//외부 이미지 링크 확인
const checkCanLoad= (url, listener)=>{
    listener(true);
    // axios.get(url).then((response)=>{
    //     const status= response.status;
    //     if(checkStatus(response)){
    //         listener(true);
    //     }else{
    //         throw(status);
    //     }
    // })
    // .catch((e)=>{
    //     print(e);
    //     listener(false, e);
    // });
}

const deving= ()=>{
    makeToast('개발중입니다');
}


const Url= {
    current: window.location.href,
    replace: (newUrl)=>{
        history.pushState({}, null, newUrl);
    },
}