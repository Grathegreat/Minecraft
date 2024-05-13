const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');
 
module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Joshua Apostol",
    description: "EDUCATIONAL",
    hasPrefix: false,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 10
};
 
module.exports.run = async function ({ api, event, args }) {
    const question = args.join(' ');
 
    if (!question) return api.sendMessage("Please provide a question first.", event.threadID, event.messageID);
 
    try {
        api.sendMessage("Please bear with me while I ponder your request...", event.threadID, event.messageID);
 
        const userInput = encodeURIComponent(question);
        const uid = event.senderID;
        const apiUrl = `https://hashier-api-globalgpt.vercel.app/api/globalgpt?q=${userInput}&uid=${uid}`;
 
        const response = await axios.get(apiUrl);
        console.log(response.data); // Log the response data structure
 
        const answer = response.data.answer; // Assuming the answer is in the 'answer' field
        
        const timeString = moment.tz('Asia/Manila').format('LLLL');
 
        api.sendMessage({
            body: `𝙍𝙀𝙎𝙋𝙊𝙉𝘿 𝘼𝙄 🤖\n━━━━━━━━━━━━━━━━━━━\n𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻: ${question}\n━━━━━━━━━━━━━━━━━━━\n𝗔𝗻𝘀𝘄𝗲𝗿: ${answer}\n\nThis bot was created by Joshua Apostol\n
𝗣⃪𝗼⃪𝗴⃪𝗶⃪:
${timeString}\n\nFOLLOW THE DEVELOPER: https://www.facebook.com/profile.php?id=100088690249020\n\nMAKE YOUR OWN BOT HERE: https://autobott-f566.onrender.com/ `
        }, event.threadID, (error, info) => {
            if (error) {
                console.error(error);
                api.sendMessage("An error occurred while sending the message.", event.threadID);
            }
        });
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
