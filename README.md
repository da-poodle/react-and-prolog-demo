Hello, You are looking at an example of how to build React applications and deploy them into an SWI-Prolog web server. 

This is meant as a simple example of an application, not a production ready deployment and there are a bunch of instructions on how to build and deploy rather than automated builds. This is intentional so that anyone that uses this can automate the build process in the way they see fit. 

## Setting up the development environment

There are two parts to the development environment, SWI-Prolog and NodeJS. To run this demo I have installed node version 6.11.3 and SWI-Prolog version 7.6.0-rc2. So install them first. 

The demo uses the regex library for SWI-Prolog so install that by opening SWI-Prolog and typing:

 `pack_install('regex')`.

After that the server can be run by consulting the bands.prolog/server.pl file. The web server will load automatically running on port 8008. you can test this by browsing to: [http://localhost:8008/api/bands](http://localhost:8008/api/bands) and a json result with a list of bands will display if all is good. 

Next the node environment needs to be setup. To do this in a shell navigate to the bands.react folder and run the following commands (After nodejs has been installed). 

`npm install`

This will download all the required packages for the web site. 

`npm start`

This will load a development server for node development on port 3000. The website will now function and it should be noted that the prolog api's can be used because of a proxy setting in the bands.react/package.json file which directs them to localhost:8008. 

## Creating a deployable package

You can now browse the website as if it in live, but it is not, in order to create a package that can be moved around (and no longer relies on nodejs) then the following needs to be done. 

First build the production version of the website by typing: 

`npm run build`

This creates a build folder with the minified website. 
- Create a `deploy` folder and copy the build folder into this.
- Rename the build folder to `htdocs`.
- Copy the contents of bands.prolog to the `deploy` folder. 
- Stop the development prolog server so a test can be run. 
- Restart the prolog server from the deploy folder. 

Now browsing to [http://localhost:8008](http://localhost:8008) will load the website. 

Now SWI-prolog is running a react app with both the react router and the prolog router working together like good little children. 

Enjoy! 
