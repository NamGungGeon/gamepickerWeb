
const User= {
    id: '',
    token: '',
    init: ()=>{
        //not initiated or not logined
        if(!User.id || !User.token){
            //login state
            if(uid && token){
                User.id= uid;
                User.token= token;
                return true;
            }
            //auto login
            //use cookie
            if($.cookie('gamepicker_id') && $.cookie('gamepicker_token')){
                User.id= $.cookie('gamepicker_id');
                User.token= $.cookie('gamepicker_token');

                uid= User.id;
                token= User.token;

                //validation check
                api.loadMyInfo((success)=>{
                    if(!success){
                        alert('만료된 로그인 정보입니다. 재 로그인이 필요합니다.');
                        User.logout();
                        window.location= './login.php?back='+ window.location.href;
                    }
                });

                
                return true;
            }
        }
        return User.id && User.token;
      },
    remember: (id, token, callback)=>{
        const options= {
            expires: 7,
            path: '/'
        };
        $.cookie('gamepicker_id', id, options);
        $.cookie('gamepicker_token', token, options);
        if(callback) callback();
    },
    logout: ()=>{
        $.removeCookie('gamepicker_id');
        $.removeCookie('gamepicker_token');
    },
    latestCommunity: (addCommunity)=>{
        // const addCommunity= {
        //     title: '',
        //     link: ''
        // }
        if(addCommunity){
            //add
            try{
                const temp= User.latestCommunity();
                let exist= false;
                temp.map((value)=>{
                    if(value.title== addCommunity.title || value.link== addCommunity.link){
                        exist= true;
                    }
                });
                if(!exist && addCommunity.title && addCommunity.link ){
                    temp.push(addCommunity);
                    $.cookie('gamepicker_latestCommunity', JSON.stringify(temp),{
                        expires: 7,
                        path: '/'
                    });               
                }
                return temp;            
            }catch(e){
                console.warn('cookie error', e);
                //cookie is corrupted
                $.cookie('gamepicker_latestCommunity', null, {
                    expires: -1,
                    path: '/'
                });
                return [];
            }
        }else{
            //read
            const temp= $.cookie('gamepicker_latestCommunity');
            try{
                const parsed= JSON.parse(temp);
                return parsed;
            }catch(e){
                console.warn('cookie error', e);
                return [];
            }
        }
    }
};

