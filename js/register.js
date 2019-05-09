
var isCheckedEmail= false;
var isCheckedNickname= false;

const buildOption= (value)=>{
  return `<option value="${value}">${value}</option>`;
}
const readyInputs= ()=>{
    const checkSelect= function (){
        print('asdfas');
        if(isNaN($(this).val())){
            makeToast('올바른 값을 선택해 주세요');
            $(this).attr('class', 'invalidInput');
        }else{
            $(this).attr('class', 'validInput');
        }
    }

    //years
    let years= "";
    for(let i=2019; i>=1900; i--){
        years+= buildOption(i);
    }
    $("#yearInput").append(years).change(checkSelect);
    //month
    let months= "";
    for(let i=1; i<=12; i++){
        months+= buildOption(i);
    }
    $("#monthInput").append(months).change(checkSelect);;
    //day
    let days= "";
    for(let i= 1; i<=31; i++){
        days+= buildOption(i);
    }
    $("#dayInput").append(days).change(checkSelect);;
}

const isPwValid= ()=>{
    const pwInput= $("#pwInput").val();
    const pwCheck= $("#pwInputCheck").val();

    if(pwInput.length<4){
        alert("비밀번호는 4자 이상이여야 합니다");
        return false;
    }
    if(pwInput !== pwCheck){
        alert("비밀번호와 비밀번호 확인이 같지 않습니다");
        return false;
    }
    return true;
}

//If essential data is empty or invalid, 
//This function return undefined and show error message to user
const getRegData= ()=>{
    const email= $("#emailInput").val();
    if(email== ""){
        alert("이메일을 입력해주세요");
        return undefined;
    }
    if(!isValidEmail(email)){
        alert("올바른 이메일 형식이 아닙니다.");
        return undefined;
    }
    if(!isCheckedEmail){
        alert("이메일 중복확인을 해 주세요");
        return undefined;
    }
    const pw= $("#pwInput").val();
    if(!isPwValid()){
        return undefined;
    }
    const year= $("#yearInput").find(":selected").text();
    if(year=="년도"){
        alert("태어난 년도를 선택해주세요");
        return undefined;
    }
    const month= $("#monthInput").find(":selected").text();
    if(month=="월"){
        alert("태어는 달을 선택해주세요");
        return undefined;
    }
    const day= $("#dayInput").find(":selected").text();
    if(day=="일"){
        alert("태어난 일을 선택해주세요");
        return undefined;
    }
    const gender= $("#gender_man").is(":checked")? "M" : "F";
    
    if(!$("#agree1").is(":checked") || !$("#agree1").is(":checked")){
        alert("약관에 모두 동의해야 합니다");
        return undefined;
    }

    const nickname= $("#nicknameInput").val();
    if(nickname==""){
        alert("사용할 닉네임을 입력해주세요");
        return undefined;
    }
    if(!isCheckedNickname){
        alert("닉네임 중복확인을 해 주세요");
        return undefined;
    }

    return {
        email: email,
        password: pw,
        birthday: `${year}-${month}-${day}`,
        gender: gender,
        name: nickname
    }
}
const register= (data, success, fail)=>{
    onLoading();
    axios.request({
        method: 'POST',
        url: "http://api.gamepicker.co.kr/auth/register",
        headers: {
            authorization: 'w6mgLXNHbPgewJtRESxh'
        },
        data
    }).then(response=>{
        offLoading();
        if(response.status== "204"){
            if(success) success(response.data.token);
        }else{
            if(fail) fail(response);
        }
    }).catch(e=>{
        offLoading();
        if(fail) fail(e);
    });
}

const initInputObserver= ()=>{
    $("#registerBtn").click(()=>{
        const data= getRegData();
        if(data!== undefined){
            print(data);
            register(data, ()=>{
                alert("회원가입에 성공했습니다.\n입력하신 이메일로 인증 메일이 발송되었습니다\n인증 후 게임피커 서비스를 이용하실 수 있습니다");
                window.location= "./login.php";
            }, (e)=>{
                alert("오류가 발생했습니다.\n계속해서 이 문제가 발생하면 다음 에러 메시지와 함께 게임피커에 문의해주세요\n\n"+ e);
            });
        }
    });


    const emailCheckBtn= $("#emailCheckBtn").click(()=>{
        api.checkEmail(emailInput.val(), (success)=>{
            if(success){
                isCheckedEmail= true;
                emailInput.attr('class', 'validInput');
                emailCheckBtn.css('display', 'none');
            }else{
                emailInput.attr('class', 'invalidInput');
            }
        });
    })
    const emailInput= $("#emailInput").keydown(()=>{
        emailInput.attr('class', '');
        isCheckedEmail= false;
        emailCheckBtn.css('display', 'inline-block');
    });


    const nicknameCheckBtn= $("#nicknameCheckBtn").click(()=>{
        api.checkNickname(nicknameInput.val(), (success)=>{
            if(success){
                isCheckedNickname= true;
                nicknameInput.attr('class', 'validInput');
                nicknameCheckBtn.css('display', 'none')
            }else{
                nicknameInput.attr('class', 'invalidInput');
            }
        });
    });
    const nicknameInput= $("#nicknameInput").keydown((e)=>{
        isCheckedNickname= false;
        nicknameInput.attr('class', '');
        nicknameCheckBtn.css('display', 'inline-block')
    });

    const pwInput= $("#pwInput").focusout(()=>{
        if(pwInput.val().length!== 0 && pwCheckInput.val().length!== 0){
            if(pwInput.val()== pwCheckInput.val()){
                pwInput.attr('class', 'validInput');
                pwCheckInput.attr('class', 'validInput');
            }else{
                makeToast('비밀번호와 비밀번호 확인이 일치하지 않습니다')
                pwInput.attr('class', 'invalidInput');
                pwCheckInput.attr('class', 'invalidInput');
            }
        }
    }).keydown(()=>{
        pwInput.attr('class', '');
        pwCheckInput.attr('class', '');
    });
    const pwCheckInput= $("#pwInputCheck").focusout(()=>{
        if(pwInput.val().length!== 0 && pwCheckInput.val().length!== 0){
            if(pwInput.val()== pwCheckInput.val()){
                pwInput.attr('class', 'validInput');
                pwCheckInput.attr('class', 'validInput');
            }else{
                makeToast('비밀번호와 비밀번호 확인이 일치하지 않습니다')
                pwInput.attr('class', 'invalidInput');
                pwCheckInput.attr('class', 'invalidInput');
            }
        }        
    }).keydown(()=>{
        pwInput.attr('class', '');
        pwCheckInput.attr('class', '');
    });
}

$(document).ready(()=>{
    readyInputs();
    initInputObserver();
});