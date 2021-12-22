# servefolder.dev
Serve a local folder of files in your browser for easy testing without having to run a server.

Try now at [servefolder.dev](https://servefolder.dev)!

## What is this?
The page at *servefolder.dev* lets you host a local folder with web development files, such as HTML, JavaScript and CSS, directly in your browser. It works using Service Workers: everything is served from your local system only, nothing is uploaded to a server, and your files are not shared with anybody else.

## Why is it useful?
Web development files must be served via the HTTP protocol for most modern web platform features to work. Features like fetch and JavaScript Modules don't work when loaded from disk (on the *file:* protocol). In some enviroments running a HTTP server may be difficult or inconvenient, for example if you're on a system with limited permissions. Alternatively it's another quick way to quickly test some web development files.

## How does it work?
Click the big button at the top of the page and choose a folder. Once chosen and any permission prompt approved, a link will appear. Click the link and it will open a new tab and load index.html if a file with that name exists, otherwise it will show the contents of the folder for browsing. This is particularly useful with HTML files, which are also able to load all sub-resources like they can on a normal web server, but this does not actually involve a HTTP server (it works using Service Workers). Note the provided link will only work so long as the page remains open &mdash; as soon as you close the page the link will stop working.

You can also open the page in multiple tabs and host different folders simultaneously. Additional tabs will host at a different URL for accessing different folders. The page also works offline and is installable in supported browsers.

## Limitations
A couple of known limitations are:

- The files are served from a subfolder. Serving from the origin root is not supported as it complicates loading this page and supporting multiple hosts.
- The hosted files cannot register their own service worker. This is because the browser enforces that the SW script is loaded from the network, where it will return 404.

However since the vast majority of web APIs will work, this should support most client-side web content, such as HTML5 games, static websites, and so on.

## Is my data kept private?
Yes. Your chosen files will not leave your computer. The files will not be accessible by anyone else, the provided link only works for you, and nothing is transmitted over a network while loading it.

## Who made this?
Hi, I'm [@AshleyGullen](https://twitter.com/ashleygullen), founder of Scirra and lead developer on [Construct](https://www.construct.net/).

