<?php
    class Request{
        public static function post($param='', $isEssential=false){
            $value= $_POST[$param];
            if($isEssential== true){
                if($value== null || $value=== ''){
                    $json['resultCode']= Result::$PARAMETER_ABSENT;
                    echo_json($json);
                    exit();
                }
            }else{
                if($value== null || $value=== ''){
                    return null;
                }   
            }
            return $value;
        }
        public static function get($param='', $isEssential=false){
            $value= $_GET[$param];
            if($isEssential== true){
                if($value== null || $value=== ''){
                    $json['resultCode']= Result::$PARAMETER_ABSENT;
                    echo_json($json);
                    exit();
                }
            }else{
                if($value== null || $value=== ''){
                    return null;
                }   
            }
            return $value;
        }
    }

    session_start();
    
    $isDev= false;
    if($isDev){
        error_reporting(E_ALL);
        ini_set('display_errors', '1');
    }

    //get token, uid from passed data.
    $temp= Request::post('token');
    if($temp!= null) $_SESSION['token']= $temp;
    $temp= null;
    $temp= Request::post('uid');
    if($temp!= null) $_SESSION['uid']= $temp;

    $token= $_SESSION['token'];
    $uid= $_SESSION['uid'];
?>