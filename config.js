const fs = require("fs");
require("dotenv").config();

function convertToBool(text, fault = "true") {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "SHABAN-MD~QpxhUDTB#oE-D_EtQyJNK0VF3gGZLJvO57E3aK4ECR1nIfHe2fLU", // Bot session ID

    BOT_NAME: process.env.BOT_NAME || "SHABAN-SOBX-MD",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "1234567890@s.whatsapp.net", // Replace with your WhatsApp number

    GROUP_SETTINGS: {
        TAG_ALL: convertToBool(process.env.TAG_ALL, "true"), // Enable/Disable .tagall
        WELCOME_NEW: convertToBool(process.env.WELCOME_NEW, "true"), // Enable/Disable welcome messages
        REMOVE_MEMBER: convertToBool(process.env.REMOVE_MEMBER, "true"), // Enable/Disable .remove
    },

    MESSAGES: {
        WELCOME: "🎉 Welcome @user to the group! Enjoy your stay.",
        FAREWELL: "👋 Goodbye @user! We'll miss you.",
        NO_ADMIN: "🚫 You need to be an admin to use this command!",
        TAG_ALL: "🔔 Attention everyone! ⬇️",
        REMOVED: "❌ @user has been removed from the group!",
    }
};
