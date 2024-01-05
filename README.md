# Futstarter
This is a Next.js project developed using Node and React.

## Getting Started
Clone this repository and navigate to the project directory. Install the required dependencies:


    npm install

Initialize the database:

    npx sequelize-cli db:migrate --to 20240102205402-add_logos_to_player_item.js


To fetch and save player data, images, nation, club, and league logos, make a POST request to the endpoint:

    POST /players/update-players

This will execute a **Puppeteer** scraper. Note that the images are currently saved locally in the project folder. To utilize **AWS S3** for image storage, modify the image saving method in scrape.js.

Continue database migration:

    npx sequelize-cli db:migrate


Start the server:

    npm run dev


This will launch the application. Create a user account using your email and password to begin building squads and analyzing in-game statistics.

Contact Information
* Developer: Javier Ramos
* Email: [jiramos87@gmail.com](jiramos87@gmail.com)
* Since: December 2023

## Learn More

For additional information on Next.js:

[Next.js Documentation](https://nextjs.org/docs)
[Learn Next.js](https://nextjs.org/learn)

To deploy your Next.js app:
[Next.js Deployment Documentation](https://nextjs.org/docs/pages/building-your-application/deploying)

Feedback and contributions are welcome! Feel free to explore the Futstarter GitHub repository.

