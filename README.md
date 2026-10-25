# wheather-app

## Project description
**Target audience:** Fashion Forecast is designed for young adults and adults aged 18–45 who struggle to choose outfits suitable for the weather and occasion. Users can read and write Dutch and are familiar with chat interfaces like WhatsApp.
**Purpose:** The chatbot helps users save time and find inspiration by suggesting outfits based on their wardrobe, current weather conditions, and personal preferences.
**Functionality:** Users add clothing items through text rather than photos. The chatbot retrieves relevant items from their wardrobe and uses a weather API to provide suitable outfit recommendations.&#x20;
**Personality:** Fashion Forecast is friendly, enthusiastic, and creative. It asks clarifying questions when necessary and offers personalized styling suggestions.
**User interface:** The chatbot is called Fashion Forecast and features a fashionista robot avatar.
**Unique features:** Unlike similar applications, users don't need to photograph and upload every clothing item, making setup easier and faster. Users can also add wardrobes belonging to others, such as children or people they care for. The chatbot can combine clothing from multiple wardrobes when needed.


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
