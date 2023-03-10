# electron-basic

Basic electron app w/ self updates.

![Kitten](/icon.png)

# Getting started

- `git clone https://github.com/benlantaff/electron-basic.git` - Clone this repo to your local machine.
- `npm install` - Install all the node modules required for the application.
- `let env = 'Dev';` - Make sure to set your environment variable to `Dev` in `main.js`. This will avoid search for updates.
- `npm start` - Docker command to run the image in a container.

## Updater & Publishing your App

- Update the `package.json` file to reflect all of your info (ie. repo url, build info, token, etc.).
- Make sure you change `"version": "1.0.2"` to 1.0.0 in for your firsts publication.
- For mac, you will also need to buy a developer license and download the appropriate certificates.
- Register and download your certificates: [developer.apple.com](https://developer.apple.com/)
- - Certs requied: `Developer ID Application`, `Developer ID Installer` , `Distribution`
