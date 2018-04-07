import SQLite from 'react-native-sqlite-storage';
import {pushSuccessToApi} from "./conectapi";
import {executeSMS} from '../services/sendsms';

//khai bao co so du lieu
let db = SQLite.openDatabase({name:'datamessage.db',createFromLocation:'~datamessage.db'},openCB(),errorCB.bind(this));

//thay doi du lieu neu thanh cong
export function changeSMStoLocal(phone,id,msg) {
    if(msg=='SMS sent'){
        db.executeSql('UPDATE datasms SET \'status\' = ? WHERE id =?',[1,id]);
    }
    db.executeSql('UPDATE datasms SET \'error\' = ? WHERE id =?',[msg,id]);
    pushSuccessToApi(phone,id,msg);
}

//lu du lieu vao database local
export  function saveSMSToLocal(data) {
    if (data['id']!='null') {
        for(let i=0; i<data.length; i++) {
            db.executeSql('SELECT id FROM datasms WHERE id=?',[data[i]['id']],(results)=>{
                if(results.rows.length==0) {
                    db.executeSql('INSERT INTO datasms (id,receiver,message,date) VALUES (?,?,?,?)',[data[i]['id'],data[i]['receiver'],data[i]['message'],data[i]['datesent']],(msg)=>successCB(msg,data[i]['sender']))
                }
            });
        }
    }
}

export function show() {
    db.executeSql('SELECT * FROM datasms WHERE error != ?',['null'],(rs)=> {
        if(rs.rows.length!=0) {
                        for (let i = 0; i < rs.rows.length; i++)
                            console.log (rs.rows.item(0))
                    }
                })
}

//doc tin tu co so du lieu
export function readSMSToLocal(phone){
    db.transaction((tx)=>{
        tx.executeSql('SELECT id,receiver,message FROM datasms WHERE status = ?',[0],(tx,results)=>{
            for(let i=0; i<results.rows.length; i++)
                executeSMS(phone,results.rows.item(i)['id'],results.rows.item(i)['receiver'],results.rows.item(i)['message']);
        })
    });
}

//push du lieu tren api
export function successCB(msg,sender){
    //day du lieu len tren qua ham pushSuccessToApi
    pushSuccessToApi(sender,msg.insertId,"sending...");
}

//kiem tra mo du lieu
export function openCB() {
}
//xu ly loi
export function errorCB(err) {

}

//xoa co so du lieu
export function deleteSMSToLocal(sender){
    db.transaction((tx)=>{
        // tx.executeSql('SELECT id,error FROM datasms WHERE error != ?',['null'],(tx,results)=>{
        //     if(results.rows.length!=0) {
        //         for (let i = 0; i < results.rows.length; i++)
        //             pushSuccessToApi(sender, results.rows.item(i)['id'], results.rows.item(i)['error']);
        //     }
        // });
        tx.executeSql('DELETE FROM datasms WHERE status =?',[1]);
    },(err)=>errorCB(err))
}