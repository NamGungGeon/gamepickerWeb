
const sendMail= (mail)=>{
    onLoading();
    axios.request({
        method: 'POST',
        url: "http://api.gamepicker.co.kr/auth/forgot",
        headers: {
            authorization: 'w6mgLXNHbPgewJtRESxh'
        },
        data:{
            'email': mail
        }
    }).then(response=>{
        offLoading();
        if(response.status== "204"){
            alert("입력하신 이메일 주소로 비밀번호 재발송 페이지를 발송해 드렸습니다");
            window.location= './';
        }else{
            alert("에러: "+ response.status);
        }
    }).catch(e=>{
        offLoading();
        print(e);
        alert("회원목록에 존재하지 않는 이메일입니다");
    });
};

$(document).ready(()=>{
    $("#sendBtn").click(()=>{
        const mailInput= $("#mailInput").val();
        if(!isValidEmail(mailInput)){
            alert("이메일 형식이 아닙니다. 다시 확인해주세요");
            return;
        }
        sendMail(mailInput);
    });
});