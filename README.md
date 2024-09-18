# Discord AI Bot

This is a Discord bot that utilizes a self-hosted version of Ollama AI to respond to user messages. The bot can also provide random quotes from a file.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Discord bot token
- A self-hosted instance of Ollama AI

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/jonschenk/discord-ai.git
    cd discord-ai
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your Discord bot token and command prefix:

    ```env
    TOKEN="YOUR_DISCORD_BOT_TOKEN"
    PREFIX="YOUR_COMMAND_PREFIX"
    PROMPT="YOUR_SETUP_PROMPT_GOES_HERE"
    ```

### Running the Bot

1. **Start your self-hosted Ollama AI instance:**

    Ensure that your Ollama AI instance is running and accessible at `http://localhost:11434`.

2. **Run the bot:**

    ```sh
    npm start
    ```

    You should see a message indicating that the bot is ready:

    ```sh
    ✅ YourBotName is ready
    ```

### Usage

- **Ask a question:**

    In any Discord channel where the bot is present, type:

    ```
    YOUR_COMMAND_PREFIXyour question here
    ```

    The bot will generate a response using Ollama AI and reply to your message.

### Contributing

Feel free to submit issues or pull requests if you find any bugs or have suggestions for improvements.

### License

This project is licensed under the ISC License.