# Next.js Meme Gallery

This project is a meme gallery built using Next.js that fetches and displays memes from Reddit's [/r/memes](https://www.reddit.com/r/memes/) subreddit. The gallery supports images, videos, and GIFs.

## Features

- Fetches memes from Reddit's API
- Infinite scrolling for lazy loading older entries
- Utilizes the Photoswipe library for a responsive image gallery
- Displays memes in a card format with title, image, and details

## Demo

Check out the live demo: [Meme Gallery Demo](https://meme-gallery-orpin.vercel.app/)

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nextjs-meme-gallery.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nextjs-meme-gallery
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

To deploy this project to Vercel, follow these steps:

1. **Create a Vercel Account:**
   If you don't have a Vercel account, sign up at [Vercel](https://vercel.com/).

2. **Install Vercel CLI:**
   Install the Vercel CLI globally on your machine using npm:

   ```bash
   npm install -g vercel
   ```

3. **Login to Vercel CLI:**
   Run the following command and follow the prompts to log in to your Vercel account:

   ```bash
   vercel login
   ```

4. **Navigate to Your Project Directory:**
   Open a terminal and navigate to your Next.js project's root directory.

5. **Initialize Vercel:**
   Run the following command to initialize your project with Vercel:

   ```bash
   vercel
   ```

   This command will guide you through the setup process, including creating a new project on Vercel.

6. **Configure Settings:**
   During the setup process, you'll be asked to configure your settings. Choose the appropriate options based on your project.

7. **Deploy Your Application:**
   Once the setup is complete, Vercel will deploy your application. After the deployment process finishes, you will receive a deployment URL.

8. **Access Your Deployed Application:**
   Visit the deployment URL provided by Vercel to access your deployed Next.js application.

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Photoswipe](https://photoswipe.com/) - JavaScript image gallery library
- [Vercel](https://vercel.com/) - Hosting platform

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.