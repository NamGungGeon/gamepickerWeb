
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
                return true;
            }
        }
        return User.id && User.token;
      },
    remember: (id, token)=>{
        const options= {
            expires: 7,
        }
        $.cookie('gamepicker_id', id, options);
        $.cookie('gamepicker_token', token, options);
    },
    logout: ()=>{
        $.removeCookie('gamepicker_id');
        $.removeCookie('gamepicker_token');
    },
};

