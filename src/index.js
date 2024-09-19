const { Ollama } = require('ollama')
const fs = require('fs');
const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();

// Load environment variables
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;
const PROMPT = process.env.PROMPT;
let bot_name = "";

// Path to the quotes file
const quotePath = "quotes.data"

// Create a new instance of Ollama
const ollama = new Ollama({
    host: 'localhost:11434'
})

// Setting bot intents
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMembers,
    ]
});

// Get a random quote from the quotes file
function getRandomQuote() {
    let quotes = fs.readFileSync(quotePath, 'utf8').split('\n');
    let randomIndex = Math.floor(Math.random() * quotes.length);
    console.log(quotes[randomIndex]);
    return quotes[randomIndex];
}

// On bot ready
client.on('ready', (c) => {
    bot_name = c.user.username;
    console.log(`✅ ${bot_name} is ready`);
});

// On each message create
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    let current_user = {
        username: message.author.username,
        nickname: message.member.displayName,
        pfp: message.author.displayAvatarURL()
    }

    let server_members = []
    // get all members in the guild
    let current_server = message.guild;
    for (let member of current_server.members.cache) {
        server_members.push(member[1].user.username);
    }

    console.log(`Server members: ${server_members}`);

    // Prompt handling
    if (message.content.startsWith(PREFIX + "quote")) {
        quote = getRandomQuote();
        message.reply(quote);
    }
    else if (message.content.startsWith(PREFIX)) {
        const question = message.content.slice(PREFIX.length).trim();
        console.log(`Received question: ${question}`);
        let reply_msg = message.reply("Generating response...");
        message.channel.sendTyping();
        const response = await getResponse(question, current_user, server_members);
        console.log(`Response: ${response}`);
        (await reply_msg).edit(response);
    }
});

// Get the ollama response
async function getResponse(message, user_info, server_members) {
    const response = await ollama.chat({
        model: 'llama3.1', // The model to use
        messages: [{ role: 'user', content: `Your name is ${bot_name}, ${PROMPT} Their username is ${user_info.username}, Their nickname is ${user_info.nickname}, Their profile picture is located at this URL: ${user_info.pfp}. Also here's a list of the people in this server in case someone asks you a "who" question: ${server_members}. Here's their prompt, respond to it and do not reply or acknowledge to the previous information: ${message}`}],
    })
    return await response.message.content
}

client.login(TOKEN);
