# [BINS](https://bins.onrender.com/)

## Overview 

BINS is a messaging clone of the popular professional and organizational communication platform, Slack. Simialar to Slack, users are able to connect and communicate with other through instant messaging. Users able to create and join work areas. Within a work area, users area able to organize their teams through the help of pods. Users also have the ablility to direct message another user, or create a group chat with others.  

*Add splash page gif 

## Technologies 

The birth of BINS was made possible mainly throught the PRR stack. Postgres is used as the database, and Reddis to support the websockets. Ruby on rails was mvc framework used for the backend, which reliably transferred data to the frontend library, React. The React library was being utilized the Redux cycle to to store required data. For stylying, [MUI](https://mui.com/) was used for icons, [AnimateOnScroll](https://michalsnik.github.io/aos/) was used for the fade up animations, and [react-hooks-use-modal](https://www.npmjs.com/package/react-hooks-use-modal) was used for the modals. Finaly, the Action Cable library was used for websockets.

## Features 

### Live Messages 
*add live mssage gif 

### Message CRUD
*side by side of updating and creating 

### Pod CRUD 
*side by side of creating and retriving a pod 
*side by side of updating and leaving a pod 
*side by side of deleting a pod 

### Direct Message CRUD
*side by side of creating a dm 
*side by side of adding user to a group chat and leaving 

### Work Area CRU 
*creating a workarea and showing within toggle list 
*creating and toggling to the new work area 

## Significant Code 

### Creating a Direct Message 
Creating a direct message was the most fun feature to implement because it is a search bar that must handle different uses cases. The first use case is that user can create a new direct message or group chat that does not exists. The second use case is creating a new direct messsage or group chat that does not exist, and the user also attaches a message to it. The third case is when a user creates an existing direct message or group chat,. The finally case is the user creates an existing direct message or gorup chat with a message. The following pictures and text describes how the following use cases are handled.
1. <img width="901" alt="Screen Shot 2023-01-13 at 9 33 52 AM" src="https://user-images.githubusercontent.com/26070301/212384339-49f13291-3f4d-4fb9-b4b8-ff71997950d5.png">

** add sc 

## Other Features and Visuals 

### Current Messaging Location 

### Direct Message Search Bar 

### Adding Users to a Pod or Group Chat 

