# The Dream Team Application

## Technologies Used
* MySQL 
* Node.js
* MVC
* Handlebars
* Express.js
* Sequelize ORM

#### Create your dream sports team! Add team members via the textarea and "add" button, which then sorts these players into a "benched" area where they are not yet assigned a position.


#### Ideal:
Drag and drop team members onto specific areas of the "field" (field image) to assign them to the associated position. This will work by having certain areas of the file contain onDrop() functionality that when dropped onto a div created for a position, the function called pulls the position name from the parent div and assigns it to the player in a data-id. Then the data-id is sent as a parameter to the update() function of the application so that the database updates for this player as well. Dragging them back the "benched" area removes their position.

Our use of a new library will be utilized with this functionality, either HammerJS or InteractJs. (or, after a practice round, possibly another JS library that would assist with drag and drop functionality)
