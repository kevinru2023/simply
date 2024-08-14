<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h3 align="center">Simply</h3>

  <p align="center">
    A zoom clone I making to learn full stack development! 
    <!-- <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    <br /> -->
  </p>
  
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
 This is a project I am currently doing to learn more about full stack development, initially I was just going to do a chat website but then decided to create a zoom clone because I wanted to learn about video! I settled on creating this project using the MERN stack. I used a lot of different tools so make sure to checkout the acknowledgments for the tools! In terms of development I first started off with some free figma design templates and then started working on boilerplate frontend. I am currently working on implementing the backend as well as finishing the frontend.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Express.js][Express.js]][Express-url]
* [![React][React.js]][React-url]
* [![Node.js][Node.js]][Node-url]




<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The project is divided into two sections: the frontend and the backend. To view the full project, you'll need to configure a `.env` file for the backend. This requires setting up a MongoDB Atlas cluster. Currently the project runs using `npm run dev` for both front and backend I plan to make this easier in the future. 







### Prerequisites

First install npm if not installed 
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Create a MongoDB Account and set up an Atlas cluster by following the instructions [here](https://www.mongodb.com/docs/atlas/getting-started/).

2. Clone the repo
   ```sh
   git clone https://github.com/kevinru2023/simply-
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create and config your `.env` in the `backend` directory
   ```js
   PORT="port for frontend"
   PEER_PORT="port for peerserver"
   MONGO_DB="your MongoDB connection string"
   FRONTEND_ORIGIN="your frontend URL"
   ```
5. Navigate to `backend` and start it
   ```sh
   npm run dev
   ```
6. Navigate ro `frontend` and start it
    ```sh
    npm run dev
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

With both the backend and frontend now working, go to the URL where your frontend is being hosted *(typically localhost:5731 when using Vite)* and click `Host Room` to create a room. Currently, not much can be done from there as I am still very early in the development stage.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Room Creation
- [x] Chat feature (still need to fix frontend)
- [ ] Video call implementation
- [ ] User list

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Kevin Rubio - ([Linkedin](https://www.linkedin.com/in/kevin-rubio-851269236/)) - kevinru2005@gmail.com

Project Link: [https://github.com/kevinru2023/simply](https://github.com/kevinru2023/simply)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [PeerJS](https://peerjs.com/)
* [Shadcn/ui](https://ui.shadcn.com/)
* [SocketIO](https://socket.io/)
* [Mongoose](https://mongoosejs.com/docs/index.html)
* [README template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/

[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/

[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/