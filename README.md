This project was made by a 4-person development team. It's a movie and TV Series website that uses the TMDB API to offer the user the possibility to look through their favorite content, mark it as favorite on their account, see what streaming services have on offer (It shows services in Argentina as a default, with the US as a second option if no Argentina-based streaming services show the content).
You can also leave comments for other peoiple to see. And in your profile, you can see your favorites, reviews, and a special section of recommendations based on the genres of your favorite content.
There is also Pochi, a chatbot that can help you when looking for movies, using Gemini's API.

It implementes a layered backend architecture (Routers → Controllers → Services → Repositories) using Node.js and Express.js, ensuring a clean separation of concerns and maintainability.

It also implements a secure JWT-based authentication system with bcrypt password hashing and a robust password recovery flow utilizing the Resend API.

Regarding the database, we implement MongoDB and Mongoose ODM, optimizing for flexible document schemas and efficient querying of user-generated content (reviews/favorites).

Integrates third-party RESTful services (TMDB API) to synchronize real-time movie and television data across the platform.

The AWS deployment architecture uses Amplify for frontend hosting and Elastic Beanstalk for backend services. It takes advantage of environment variables, build pipelines, CORS policies, and API Gateway routing to ensure secure and reliable client–server communication.
