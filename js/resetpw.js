
const token= getUrlParams().token;
if(!token){
    alert("유효하지 않은 접근입니다");
    window.location= './';
}

const resetPW= (newPw, newPwCheck)=>{

    axios.request({
        method: 'PUT',
        url: "http://api.gamepicker.co.kr/me/password",
        headers: {
            authorization: 'w6mgLXNHbPgewJtRESxh',
            'x-access-token': token 
        },
        data:{
            'password': newPw
        }
    }).then(response=>{
        if(response.status== "204"){
            alert("비밀번호가 재설정 되었습니다");
            window.location= './';
        }else{
            alert("에러코드: "+ response.status);
        }
    }).catch(e=>{
        alert("에러: "+ e);
    });
};

$(document).ready(()=>{
    $("#resetBtn").click(()=>{
        const newPw= $("#pwInput").val();
        const newPwCheck= $("#pwInputCheck").val();
        if(newPw!== newPwCheck){
            alert("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다");
        }else{
            resetPW(newPw, newPwCheck);
        }
    });
});