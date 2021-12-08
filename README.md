# servefolder.dev
Serve a local folder of files in your browser for easy testing without having to run a server.

Try now at [servefolder.dev](https://servefolder.dev)!

## What is this?
This page lets you host a local folder with web development files, such as HTML, JavaScript and CSS, directly in your browser. It works using Service Workers: everything is served from your local system only, nothing is uploaded to a server, and your files are not shared with anybody else.

## Why is it useful?
In some enviroments running a HTTP server may be difficult or inconvenient, for example if you're on a system with limited permissions. Alternatively it's another quick way to quickly test some web development files.

## How does it work?
Click the big button at the top and choose a folder. Once chosen and any permission prompt approved, a link will appear. Click the link and it will open a new tab and load index.html if a file with that name exists, otherwise it will show the contents of the folder for browsing. This is particularly useful with HTML files, which are also able to load all sub-resources like they can on a normal web server, but this does not actually involve a HTTP server (it works using Service Workers). Note the provided link will only work so long as this page remains open &mdash; as soon as you close the page the link will stop working.

You can also open this tab multiple times and host different folders simultaneously. Additional tabs will host at a different URL for accessing different folders.

## Is my data kept private?
Yes. Your chosen files will not leave your computer. The files will not be accessible by anyone else, the provided link only works for you, and nothing is transmitted over a network while loading it.

## Who made this?
Hi, I'm [@AshleyGullen](https://twitter.com/ashleygullen), founder of Scirra and lead developer on [Construct](https://www.construct.net/).

