import {BackHandler,Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import BackgroundJob from 'react-native-background-job';

export async function errorsconect(err) {
    PushNotification.localNotification({
        message:"Error conect",
        subText:err,
    });
    BackgroundJob.cancelAll();
}
export async function errorsmessage(err) {
    Alert.alert('Error',err);
}
export async function errordatabase() {
    PushNotification.localNotification({message:"Có lỗi",subText: "Không thể gửi dữ liệu đến server"});
    BackgroundJob.cancelAll();
}