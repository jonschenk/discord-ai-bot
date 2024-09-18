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

4. **Prepare the quotes file:**

    Create a `quotes.data` file in the root directory and add your quotes, each on a new line.

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

- **Get a random quote:**

    In any Discord channel where the bot is present, type:

    ```
    YOUR_COMMAND_PREFIXquote
    ```

    The bot will reply with a random quote from the [`quotes.data`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fjon%2Fdiscord-ai%2Fquotes.data%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22dbf39793-adfc-4c59-8c86-cace17718d7c%22%5D "c:\Users\jon\discord-ai\quotes.data") file.

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