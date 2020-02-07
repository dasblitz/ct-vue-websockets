## Vue, NodeJS and Websockets

![Node.js CI](https://github.com/dasblitz/ct-vue-websockets/workflows/Node.js%20CI/badge.svg)

### What the 'app' does

It's a simple app that keeps track of a product's stock using websockets. If you open the app in multiple tabs in your browser
you should see the stock being updated everywhere when clicking: `Add to basket`

### disclaimer:

This is the first time I've attempted Vue coming from React. I've used Vuex as a statemanager, although coming from React there were some differences that I ran into. For instance dispatch being scoped to a store module.

The CSS was done a bit hastily as I felt I'd spend enough time on it. It's not representative of the quality I'd normally go for.

For the NodeJS server I've used Express although on a real size project I'd go for [NestJS](https://docs.nestjs.com/) with Typescript.

All in all it was a fun learning experience :)
