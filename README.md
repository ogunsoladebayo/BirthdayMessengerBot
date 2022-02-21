<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/FxL5qM0.jpg" alt="Bot logo"></a>
</p>

<h3 align="center">Birthday Countdown Messenger Bot</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Platform](https://img.shields.io/badge/platform-messenger-blue.svg)](https://m.me/105582892057827)
[![GitHub Issues](https://img.shields.io/github/issues/ogunsoladebayo/birthdaymessengerbot.svg)](https://github.com/ogunsoladebayo/birthdaymessengerbot/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/ogunsoladebayo/birthdaymessengerbot.svg)](https://github.com/ogunsoladebayo/birthdaymessengerbot/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 🤖 This is a simple messenger bot that tells you the number of days to your next birthday.
    <br> 
</p>

## 📝 Table of Contents

-   [About](#about)
-   [Demo / Working](#demo)
-   [How it works](#working)
-   [Usage](#usage)
-   [Getting Started](#getting_started)
-   [Deploying your own bot](#deployment)
-   [Built Using](#built_using)
-   [TODO](../TODO.md)
-   [Contributing](../CONTRIBUTING.md)
-   [Authors](#authors)
-   [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

The goal is to create a Facebook Messenger bot in Node.js.
For more information on the Facebook Messenger bot, click [here](https://developers.facebook.com/docs/messenger-platform/).

## 🎥 Demo / Working <a name = "demo"></a>

![Working](https://res.cloudinary.com/ogunsola-activator/image/upload/v1645482849/webp-net-resizeimage_anonpn.gif)

## 💭 How it works <a name = "working"></a>

The bot runs Facebook Messenger webhook.

When a user starts a conversation, it says `Hi` and ask a few questions:

    1. User's first name
    2. User’s birthdate. there's only one valid date format;`YYYY-MM-DD`
    3. if the user wants to know how many days till his/her next birthday. The bot should accept both user text answers (`"yes", "yeah", "yup", "no”, "nah"`, etc.) or quick reply buttons.

      - If the user replies **yes** to the last question the bot then calculates the number of days till the user's next birthday and sends a message to the user.
        `There are <N> days left until your next birthday`

      - If the user says **no**, the bot just says:
        `Goodbye 👋`

Authorized users can also access the following REST endpoints:

> `/messages` that list all messages received from users

> `/messages/:id` to view single message by its ID

> `/summary` to view this data exact data

```json
[
  { user: <user_id>, name: <user_name>, messages: [<list_of_users_messages>] }
  { user: <user_id>, name: <user_name>, messages: [<list_of_users_messages>] }
...
]
```

The entire bot is written in TypeScript

## 🎈 Usage <a name = "usage"></a>

To use the bot, click [here](https://m.me/105582892057827)

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

[Node.js](https://nodejs.org/) - server side environment on which the application is built.

[Nodemon](https://nodemon.io/) - a tool that automatically restarts the server when changes are made to the source code. install with `npm install -g nodemon`.

[TypeScript](https://www.typescriptlang.org/download) - a compiler for TypeScript. Install it with `npm install -g typescript`

[PostgreSQL](https://www.postgresql.org/) - Database choice for application. Create a database and a user with the appropriate permissions.

[Ngrok](https://ngrok.com/) - a tool that allows you to expose your server to the internet. Install with `npm install -g ngrok`.

### Installing

-   In the directory of this repo, request a tunnel to your local server with your preferred port

    > `ngrok http 3000`

-   Copy contents of file ".env copy" to a new ".env" file and edit the .env file to add all the values for your app and Page. Note that for VERIFY_TOKEN you should set a random string, the app will use it to validate API calls.

-   Start a seperate terminal session
-   Install app dependencies:
    > `npm install`
-   Run app in dev mode:
    > `npm run dev`
-   ...or run in prod mode:

    > `npm start`

-   You should now be able to access the application in your browser at http://localhost:3000

-   The app is able to configure webhooks subscription settings on the Facebook app and configure the Page Messenger Profile all via the API.

-   Trigger the code that sets the configuration. Note that you need to use the value for VERIFY_TOKEN added in .env file. Call the /profile endpoint like so:

    > http://localhost:3000/profile?mode=all&verify_token=<VERIFY_TOKEN>

-   Test app setup;
    Send a message to your Page from Facebook or in Messenger, if your webhook receives an event, you have fully set up your app! Voilà!

### Testing

-   To run test cases, please install Jest and run...
    > `npm test`

## 🚀 Deploying your own bot <a name = "deployment"></a>

To see an example project on how to deploy your bot, please see my own configuration:

<!-- - **Heroku**: https://github.com/kylelobo/Reddit-Bot#deploying_the_bot -->

## ⛏️ Built Using <a name = "built_using"></a>

-   [Node.js](https://nodejs.org/) - server side environment on which the application is built.
-   [TypeScript](https://www.typescriptlang.org/) - language used for the server side.
-   [Express.js](https://expressjs.com/) - web framework used for the server side.
-   [MikroORM](https://mikro-orm.io/) - ORM used for the server side.
-   [PostgreSQL](https://www.postgresql.org/) - Database choice for the server side.

## ✍️ Authors <a name = "authors"></a>

-   [@ogunsoladebayo](https://github.com/ogunsoladebayo) - Initial work

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

-   Hat tip to anyone whose code was used
-   [Adakerja](https://adakerja.com)
-   [messenger-platform docs](https://developers.facebook.com/docs/messenger-platform/)
