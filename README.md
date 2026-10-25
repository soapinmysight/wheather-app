# wheather-app

## Project description
Target audience: This chatbot is designed for young adults and adults (aged 18–45) who think about their clothing choices on a daily basis. Users often find it challenging to put together outfits that are appropriate for the weather and the occasion. The target audience is proficient in reading and writing Dutch and is familiar with standard chat interfaces, such as those used in WhatsApp.

Objective: The agent helps users quickly select a suitable outfit based on the items in their own wardrobe, current weather conditions, and personal preferences. It is aimed at individuals who want to save time and are looking for inspiration for their daily attire.

Functionality: The agent can process a text-based document containing an inventory of the user’s wardrobe—provided by the user in advance—to identify relevant clothing items. Additionally, the agent integrates with a weather API to retrieve current meteorological conditions. Future iterations could include an image generator to provide a visual representation of the suggested outfit.

Behavior and tone: The agent adopts a friendly, enthusiastic, and creative persona. It engages actively, asks clarifying questions when necessary, and proactively offers suggestions to tailor outfits to the user’s specific situation. The experience feels like interacting with a personal "fashionista robot" through a natural, conversational flow.

User interface: The agent is called "Fashion Forecast" (referred to as "StyleBot" in the previous submission) and features a fashionista robot as its avatar.

What distinguishes this chatbot from similar tools is that it does not require an image for every individual item of clothing; instead, garments are added to the system via text descriptions. This simplifies the setup process for the user: there’s no need to worry about lighting, no need to take garments out of the closet—only to photograph, refold, and put them back—and the hassle of uploading images is also avoided.

Furthermore, you can add the wardrobes of other people. This is particularly useful for caregivers or parents of young children. If one wardrobe contains only a limited selection of items, you can ask the chatbot to check one of the other wardrobes to help complete an outfit.

## Installation

### 1. Install Node.js
Download and install Node.js from [https://nodejs.org/en](https://nodejs.org).

### 2. Download the project
Download or clone this repository and open a terminal in the project folder.

### 3. Install dependencies
Run the following command to install the required packages:

```
npm install
```

### 4. Get an OpenAI API key
1. Go to [https://platform.openai.com](https://platform.openai.com).
2. Create an account or log in.
3. Go to the API keys section and create a new secret API key.
4. Copy your API key.

The application uses OpenAI to generate outfit suggestions. Using an key from OpenAI costs money.

### 5. Get an OpenWeatherMap API key
1. Go to [https://openweathermap.org/api](https://openweathermap.org/api).
2. Create a free account or log in.
3. Get an API key
4. Make sure your key has access to the Current Weather Data API.

The application uses OpenWeatherMap to get the current temperature for a given city. New API keys may take some time to become active.

### 6. Create an environment file
Create a file called `.env` in the root of the project. Add the following variables:

```
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-nano
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
MY_WEATHER_KEY=your_openweathermap_api_key
PORT=3000
```

Replace the placeholder values with your own API keys. For model I used `gpt-5-nano` because it is inexpensive, but other compatible OpenAI models can be used. The application uses `text-embedding-3-small` to create embeddings for storing and retrieving wardrobe information.

### 7. Prepare household data
The project includes dummy household data for testing. You can keep this data to try out the application or delete it and try out the application with your own data. Household member information is stored as text files in `public/originals/household-members` and as embeddings in the FAISS vector store in the `documents` folder. Do not delete the entire `documents` folder. It must contain a valid FAISS index for the application to start. You can add your own household members and their wardrobes through the application when it's running in the browser.

**Note:** Deleting the dummy text files does not remove their information from the FAISS vector store.

### 8. Start the server and open the application
Run the following command:

```
npm start
```

This starts the Express server using `server.js`. Open the following address in your browser:

[http://localhost:3000](http://localhost:3000)

The application should now be running. You can add household members and their wardrobe information when running application in a browser.

## Security

Never share your `.env` file or API keys.

Make sure `.env` is included in your `.gitignore` file so your keys are not uploaded to GitHub.
