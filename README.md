## Set up icy.tools API key

Create a `.env` file based on the sample provided:

```bash
cp .env.sample .env
```

Go to [https://developers.icy.tools](https://developers.icy.tools) and sign up for a free account. Once signed up, click the settings icon in the top right corner to see your API key.

<img alt="Settings page with API keys on the icy.tools dashboard" src="https://user-images.githubusercontent.com/12433465/172953739-55c1bca6-4a3a-48d2-aa3e-37d0957a84d2.png">

### Start Development Server

```bash
yarn
yarn dev
```

Open [localhost:3000](http://localhost:3000/) to see the project.

### Deploy to Vercel

```bash
yarn vercel --env API_KEY=YOUR_API_KEY_HERE
```
