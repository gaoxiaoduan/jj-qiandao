const axios = require("axios");
const config = require('./config')
async function PushPlus(msg) {
    try {
        return await sendMessage({
            token: config.PUSHPLUS_TOKEN,
            title: "掘金签到日志",
            content: msg,
            topic: "",
            template: "html",
            channel: "wechat",
            webhook: "",
            callbackUrl: "",
            timestamp: ""
        })
            .then(res => res.data)
            .then(json => {
                console.log(`PushPlus推送结果: ` + json.msg);
                return json;
            });
    } catch (error) {
        console.log(`发送失败 => ${error}`);
    }

    async function sendMessage(message) {
        return await axios
            .post("http://www.pushplus.plus/send", message, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .catch(err => console.log(err));
    }
}

module.exports = PushPlus;
