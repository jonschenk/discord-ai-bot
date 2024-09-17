const { Ollama } = require('ollama')
const ollama = new Ollama({
    host: 'localhost:11434'
})

async function getResponse(message) {
    const response = await ollama.chat({
        model: 'llama3.1',
        messages: [{ role: 'user', content: message }],
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

    if (message.content.startsWith(PREFIX)) {
        let sent = false;
        const question = message.content.slice(PREFIX.length).trim();
        console.log(`Received question: ${question}`);
        message.channel.sendTyping();
        const response = await getResponse(question);
        console.log(`Response: ${response}`);
        message.reply(response);
    }
});

client.login(TOKEN);
