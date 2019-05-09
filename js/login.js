
var isRemember= false;
var back= getUrlParams().back;

const login= (id, pw, success, fail)=>{
    axios.request({
        method: 'POST',
        url: "http://api.gamepicker.co.kr/auth/login",
        headers: {
            authorization: 'w6mgLXNHbPgewJtRESxh'
        },
        data:{
            email: id,
            password: pw
        }
    }).then(response=>{
        if(response.status== "200"){
            const {token, user_id}= response.data;
            if(success) success(token, user_id);
        }else if(response.status== "401"){
            alert("회원가입 시 입력한 이메일로 발송된 인증메일을 확인해 주세요");
        }else{
            alert("아이디 또는 비밀번호가 일치하지 않습니다");
        }
    }).catch(e=>{
        if(fail) fail(e);
    });
}

const tryLogin= ()=>{
    onLoading();
    const id= $("input#id").val();
    const pw= $("input#pw").val();

    login(id, pw, (token, uid)=>{
        offLoading();
        $("#token").attr("value", token);
        $("#uid").attr("value", uid);
        const form= $("#moveWithTokenForm");
        form.submit();
    }, (e)=>{
        offLoading();
        print(e);
        alert("아이디 또는 비밀번호가 일치하지 않거나 이메일 인증이 완료되지 않았습니다");
    });
}
$(document).ready(()=>{
    if(back){
        const form= $("#moveWithTokenForm");
        form.attr('action', back);
    }
    if(token.length!= 0){
        window.location= "./";
    }
    $("#startLoginBtn").click(()=>{
        tryLogin();
    });
    $("input#pw").keydown((e)=>{
        if(event.key== 'Enter'){
            tryLogin();
        }
    })
    const remToken= $(".rememberToken").click(()=>{
        isRemember= !isRemember;
        if(isRemember){
            remToken.find("img").attr("src", "./res/checkbox.png");
        }else{
            remToken.find("img").attr("src", "./res/checkbox_nofill.png");
        }
    });
});