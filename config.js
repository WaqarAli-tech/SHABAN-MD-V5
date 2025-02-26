const { WAConnection, MessageType } = require("@whiskeysockets/baileys");
const config = require("./config");

const conn = new WAConnection();

conn.on("group-participants.update", async (update) => {
    const { id, participants, action } = update;
    
    if (config.groupSettings.autoWelcome && action === "add") {
        let welcomeMessage = config.messages.welcome.replace("@user", `@${participants[0].split("@")[0]}`);
        await conn.sendMessage(id, welcomeMessage, MessageType.text, { mentions: participants });
    }

    if (config.groupSettings.autoRemove && action === "remove") {
        let farewellMessage = config.messages.farewell.replace("@user", `@${participants[0].split("@")[0]}`);
        await conn.sendMessage(id, farewellMessage, MessageType.text, { mentions: participants });
    }
});

conn.on("chat-update", async (chat) => {
    if (!chat.hasNewMessage) return;
    let message = chat.messages.all()[0];
    let sender = message.key.participant || message.key.remoteJid;
    let isAdmin = true; // Add logic to check if the sender is an admin
    
    if (message.message.conversation.startsWith("!tagall") && config.groupSettings.tagAll) {
        let group = await conn.groupMetadata(message.key.remoteJid);
        let mentions = group.participants.map((p) => p.jid);
        await conn.sendMessage(message.key.remoteJid, config.messages.tagAll, MessageType.text, { mentions });
    }

    if (message.message.conversation.startsWith("!remove") && isAdmin) {
        let userToRemove = message.message.conversation.split(" ")[1] + "@s.whatsapp.net";
        await conn.groupRemove(message.key.remoteJid, [userToRemove]);
        await conn.sendMessage(message.key.remoteJid, config.messages.removed.replace("@user", `@${userToRemove.split("@")[0]}`), MessageType.text, { mentions: [userToRemove] });
    }
});

async function startBot() {
    await conn.connect();
    console.log("Bot is running...");
}

startBot();
