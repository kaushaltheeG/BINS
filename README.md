# [BINS](https://bins.onrender.com/)

## Overview 

[BINS](https://bins.onrender.com/) is a messaging clone of the popular professional and organizational communication platform, Slack. Simialar to Slack, users are able to connect and communicate with others through instant messaging. Users are able to create and join work areas. Within a work area, users are able to organize their teams through the help of pods. Users also have the ablility to direct message another user, or create a group chat with others.  

![](https://github.com/kaushaltheeG/BINS/blob/main/splashpage.gif)

## Technologies 

The birth of BINS was made possible mainly throught the PRR stack. Postgres is being used as the database, and Reddis to support the websockets. Ruby on rails is the mvc framework beign used for the backend, which reliably transferred data to the frontend library, React. The React library is being utilized with the Redux cycle to store required data in "global" state. For stylying, [MUI](https://mui.com/) is being used for the icons, [AnimateOnScroll](https://michalsnik.github.io/aos/) is being used for the fade up animations, and [react-hooks-use-modal](https://www.npmjs.com/package/react-hooks-use-modal) is being used for the modals. Finaly, the Action Cable library is being used for websockets.

## Features 

### Live Messages 
![](https://github.com/kaushaltheeG/BINS/blob/main/live-messaging.gif)

### Message CRUD
![](https://github.com/kaushaltheeG/BINS/blob/main/message-ud.gif)

### Pod CRUD 
![](https://github.com/kaushaltheeG/BINS/blob/main/new-pod.gif)
![](https://github.com/kaushaltheeG/BINS/blob/main/pod-ud.gif)

### Direct Message CRUD
![](https://github.com/kaushaltheeG/BINS/blob/main/dm-gm.gif)

### Work Area CRU 
![](https://github.com/kaushaltheeG/BINS/blob/main/workarea.gif)

## Significant Code 

### Creating a Direct Message 
Creating a direct message was the most fun feature to implement because it is a search bar that must handle different uses cases. The first use case is that user can create a new direct message or group chat that does not exists. The second use case is creating a new direct messsage or group chat that does not exist, and the user also attaches a message to it. The third case is when a user creates an existing direct message or group chat. The final case is the user creates an existing direct message or gorup chat with a message. The following pictures and text describes how the following use cases are handled.

![Screen Shot 2023-01-14 at 1 24 22 PM](https://user-images.githubusercontent.com/26070301/212497732-c3aaa304-5eb7-4902-940a-fd93d1fc221d.png)

The controller retrives all the user ids that client has selected through the strong params, and retrives the work area id through the params. It then ensures the user id list are integers, only contains unique ids, and the client's (current user) id is also added. A DirectMessage(model) class function is invoked with user_ids and work area id. The function preforms an action record query of all the direct messages within a specific work area with the following user ids. The retrived querries are then looped through to check the user ids of that direct message match the user ids passed in as an argument. The function will either return the found direct message or nil. 
![Screen Shot 2023-01-14 at 1 25 21 PM](https://user-images.githubusercontent.com/26070301/212497753-3024f1a2-dbda-40a7-b55e-da9dda78976e.png)

#### Case 1: Existing Direct Message ~ with and without a message 
![Screen Shot 2023-01-14 at 1 24 47 PM](https://user-images.githubusercontent.com/26070301/212497808-198cafe4-0f40-4a51-a46a-e36cb16b4aac.png)
If the direct message exists, that condition has a nested condition to check if the client also passed in a message body within the strong params. If so, a new message is saved to the direct message, so now when the direct message is being broadcasted to all the user included in the direct message, it will include the newly created message. Reguardless of message or not, the found direct message is passed into the work area channel(action cable). 

#### Case 2: Non-existing Direct Message 
![Screen Shot 2023-01-14 at 1 25 09 PM](https://user-images.githubusercontent.com/26070301/212498085-8412e4ce-2f11-46b5-8ae4-dd521f562249.png)
If the direct message does not exist, a new direct message is created with user ids and work area id. The creator id is set using the current user in session. Similar to the previous condition, this else case handles if the client also sends a message with the request, in which a new message is created and saved in reference to newly created direct message. If the direct message successfully saves, that direct message gets passed into the work area channel(action cable), and for all the user part of the direct message will receive the newly created direct message without refreshing the browser. 


## Other Features and Visuals 

### Current Messaging Location 
![](https://github.com/kaushaltheeG/BINS/blob/main/current-loco.gif)

### Direct Message Search Bar
![](https://github.com/kaushaltheeG/BINS/blob/main/dm-searchbar.gif)

### Adding Users to a Pod or Group Chat 
![](https://github.com/kaushaltheeG/BINS/blob/main/add-user.gif)

