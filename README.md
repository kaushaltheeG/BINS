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
Creating a direct message was the most fun feature to implement because it is a search bar that must handle different uses cases. The first use case is that user can create a new direct message or group chat that does not exists. The second use case is creating a new direct messsage or group chat that does not exist, and the user also attaches a message to it. The third case is when a user creates an existing direct message or group chat. The final case is the user creates an existing direct message or gorup chat with a message. The following pictures and text describes how the following use cases are handled.

![Screen Shot 2023-01-14 at 1 24 22 PM](https://user-images.githubusercontent.com/26070301/212497732-c3aaa304-5eb7-4902-940a-fd93d1fc221d.png)

The controller retrives all the user ids that client has selected through the strong params, and retrives the work area id through the params. The list of ids are integers, only contains unique ids, and the client's (current user) id is also added. A DirectMessage(model) class function is invoked with user_ids and work area id. The function preforms an action record query of all the direct messages within a specific work area with the following user ids. The retrived querries are then looped through to check the user ids of that direct message match the user ids passed in as an argument. The function will either return the found direct message or nil. 
![Screen Shot 2023-01-14 at 1 25 21 PM](https://user-images.githubusercontent.com/26070301/212497753-3024f1a2-dbda-40a7-b55e-da9dda78976e.png)

Case 1: Existing Direct Message ~ with and without a message 
![Screen Shot 2023-01-14 at 1 24 47 PM](https://user-images.githubusercontent.com/26070301/212497808-198cafe4-0f40-4a51-a46a-e36cb16b4aac.png)
If the direct message exists, that condition has a nested condition to check if the client also passed in a message body within the strong params. If so, a new message is saved to the direct message, so now the response back to the client will include the newly created message. Reguardless of message or not, the found direct message is passed into the work area action cable. 

Case 2: Non-existing Direct Message 
![Screen Shot 2023-01-14 at 1 25 09 PM](https://user-images.githubusercontent.com/26070301/212498085-8412e4ce-2f11-46b5-8ae4-dd521f562249.png)







** add sc 

## Other Features and Visuals 

### Current Messaging Location 

### Direct Message Search Bar 

### Adding Users to a Pod or Group Chat 

