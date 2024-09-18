const { Ollama } = require('ollama')

// Create a new instance of Ollama
const ollama = new Ollama({
    host: 'localhost:11434'
})

// Get the ollama response
async function getResponse(message, user_info) {
    const response = await ollama.chat({
        model: 'llama3.1', // The model to use
        messages: [{ role: 'user', content: `Keep the answer to this prompt under 150 characters. Here's some information about the user in case asked: Their username is ${user_info.username}, Their nickname is ${user_info.nickname}, Their profile picture is located at this URL: ${user_info.pfp}. Here's their prompt, respond to it and do not reply to the previous information: ${message}`}],
    })
    return await response.message.content
}

// Load environment variables
require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

// Setting bot intents
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

// On bot ready
client.on('ready', (c) => {
    console.log(`✅ ${c.user.username} is ready`);
});

// On each message create
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    let current_user = {
        username: message.author.username,
        nickname: message.member.displayName,
        pfp: message.author.displayAvatarURL()
    }

    // Prompt handling
    if (message.content.startsWith(PREFIX)) {
        const question = message.content.slice(PREFIX.length).trim();
        console.log(`Received question: ${question}`);
        let reply_msg = message.reply("Generating response...");
        message.channel.sendTyping();
        const response = await getResponse(question, current_user);
        console.log(`Response: ${response}`);
        (await reply_msg).edit(response);
    }
});

client.login(TOKEN);
