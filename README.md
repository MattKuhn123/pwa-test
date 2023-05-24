# PWA Test

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.1.

The purpose is to tinker with how Angular implements PWAs and see how service workers behave, learn about the who/what/when/where/why of caching.

## Context

This application is for biologists to record the population data of wild life in the **Ohio** river valley.  

Until today, these biologists have been using an application built on an ancient technology that is no longer supported.  
They are used to working a certain way, and are resistant to new-fangled technology *(such as drop-downs).*  
This application is a MVP *(minimum viable product)* to reproduce their current application with all of it's shortcomings in order to gain their trust.  

## Requirements

### The biologists' process

1. They select their station.  
1. They select their session type.  
1. If they are *gilling,* they'll have 15 runs.  
1. If they are *electrecuting,* they'll have 12 runs.  
1. In each run, they need to record details about the environment, and details about the populations of fish.  

### The biologists' needs

Since they are working out in the field, this application must be functional even without an internet connection.  
They are used to older technology. They do not like:  

1. Drop-downs
1. Animations
1. Etc
