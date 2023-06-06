# PWA Test

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.1.

The purpose is to tinker with how Angular implements PWAs and see how service workers behave, learn about the who/what/when/where/why of caching.

It's hosted [on AWS](http://mlk-pwa-test.s3-website-us-east-1.amazonaws.com/).  

## Context

This application is for biologists to record the population data of wild life in the **Ohio** river valley.  

Until today, these biologists have been using an application built on an ancient technology that is no longer supported.  
They are used to working a certain way, and are resistant to new-fangled technology *(such as drop-downs).*  
This application is a MVP *(minimum viable product)* to reproduce their current application with all of it's shortcomings in order to gain their trust.  

## Requirements

### The biologists' process

1. They select their station.  
1. They select their session type.  
1. If they are *gill-netting,* they'll have 15 runs.  
1. If they are *electro-fishing,* they'll have 12 runs.  
1. In each run, they need to record details about the environment, and details about the populations of fish.  

## How to test the pwa

1. Run the client locally:
    1. `ng build`
    1. `http-server -p 8080 -c-1 dist/pwa-test`
1. The server is already running in AWS.
    1. To see the data, you can hit the `/habitats`, `/stations`, and `/species` endpoints at: [http://mlk-pwa-test-svc-env.eba-tifr3hk3.us-east-1.elasticbeanstalk.com](http://mlk-pwa-test-svc-env.eba-tifr3hk3.us-east-1.elasticbeanstalk.com).  
    1. The add to the data, you can submit a POST request to those same endpoints. See `app.js` for details on how that works, but it's intuitive.

We want to test what the PWA does when the website is running without an internet connection.  

1. Will it still run?
1. Will it still have the drop-down data?
1. When will it update the drop-down data?

The answers are:

1. Yes, it will still run.
1. Yes, it will still have the drop-down data.
1. It will update the drop-down data automatically next time an internet connection is available.

But, you can test this for yourself!

1. Run the client locally.
1. Visit the client in a web browser.
1. Post some new data to the service.
1. Disconnect your client from the internet.
1. Refresh the page.
    1. Notice that the page still comes up!
    1. Notice that the drop-down data is still there!
    1. Notice that the NEW drop-down data that you posted is NOT there.
1. Reconnect your client to the internet.
1. Refresh the page.
    1. Notice that the NEW drop-down data is now there!