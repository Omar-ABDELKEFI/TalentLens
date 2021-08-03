import {notification} from "antd";

export const openNotificationWithIcon = (type:string,message:any,description:any) => {
    // @ts-ignore
    notification[type]({
        message: {message},
        description:{description},
    });
};