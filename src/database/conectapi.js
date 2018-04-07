import {errorsconect,errordatabase} from '../services/errors.js';
import {saveSMSToLocal} from "./conectdatabase";

var URL1='http://nguyenvanan.tk/getsms';
var URL2='http://nguyenvanan.tk/success';
var URL3='http://nguyenvanan.tk/pushsms'

export function getSMSToApi(phoneNumber){
    if (phoneNumber!='telephone') {
        fetch(URL1, {
            method: 'POST',
            headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({numbersend: phoneNumber}),
        })
            .then((response) => response.json())
            .then((responseData) => {
               saveSMSToLocal(responseData)
            })
            .catch((error) => {
                errorsconect("Can't connect server");
            })
            .done();
    }
}

export function pushSuccessToApi(phoneNumber,id,msg){
    fetch(URL2, {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            numbersend:phoneNumber,
            id:id,
            error:msg
        }),
        })
        .catch((error) => {
            errorsconect("Can't connect server");
        })
        .done();
}

export function pushSMSToApi(data,phone){
    console.log(data);
    fetch(URL3, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:data._id,
            telephone:phone,
            address:data.address,
            body:data.body,
            date:data.date
        }),
         })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
        })
        .catch((error) => {
            errorsconect("Can't connect server");
        })
        .done();
}