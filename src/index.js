const { Ollama } = require('ollama'); // Import Ollama class

// Load environment variables
require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

// Initialize the Ollama client correctly
const ollamaClient = new Ollama({
    model: "sniddyAI",
    host: 'http://localhost:11434'
});

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
        const question = message.content.slice(PREFIX.length).trim();
        console.log(`Received question: ${question}`);

        // Show typing indicator
        message.channel.sendTyping();

        try {
            // Call the generate method on the Ollama client instance
            const response = await ollamaClient.generate({
                model: 'sniddyAI', // Ensure this is the correct model name
                prompt: question,
            });

            // Send the response to the Discord channel
            const replyMessage = response.text || 'No response from the model.';
            await message.reply(replyMessage);
            console.log(`Replied with: ${replyMessage}`);
        } catch (error) {
            console.error('Error generating response:', error);
            await message.reply('There was an error processing your request.');
        }
    }
});

client.login(TOKEN);
