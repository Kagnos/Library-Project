# Library-Project
This project has taught me and helped me:

* How event delegation works
* New JavaScript object constructors and methods
* How to work with dialogs
* How to grab form data with JavaScript
* How to create functional toggle buttons
* Get better at structuring code
* Get better at committing gits more often
* Get better at creating simple yet effective UIs
* Get better at working with JavaScript loops, arrays, DOM injection, DOM manipulation, event listeners, and functions
* Get better at working with forms, data collection, and data manipulation

I'm proud of this project, I struggled the most I ever have, but I eventually figured out the logic I needed for it to work. Particularly grabbing the specific book to remove it was the most difficult task for me. I learned about event delegation and used the book's ID as data to grab and remove it from the library.

I think my code could be written more efficiently and to better practices, but I did the best I know how and wrote it for legibility. This is something I will work to get better at as I start larger projects.

My library project does everything I wanted it to do, I have a functioning view switcher, edit and remove buttons, even a button to change the username. The page sizes well for different screens and I like the colors I chose.

The only problem I see is that I did not loop through my library array and use a constructor function the way the project asked. I store data in my library array and reference it for functions, but I do not loop through it to display my library. I am still kind of confused on constructor functions and the benefits they have so instead of using one for creating books, I just used a regular function tied to an event listener. I will come back to this project a while from now when I know more and reflect on anything I missed.

---

I now see why using a constructor function and looping through my library array is strong design. The idea is that I use my library array as the point of authority. In my current project, the book creation and DOM manipulation are linked together. This works for a small project, but on a larger app it becomes hazardous to rely on the DOM as authority. If the DOM messes up at all and it isn't the same as my library array, my project breaks. If I used a constructor function and injected the DOM strictly from my library array, I would have a more secure and a easily manipulable point of reference for my functions to act upon. I have built my project to work to the function I created, but it's not scalable. If I built it correctly I would be able to scale the project as far as I would need without worry because everything branches and references the library array instead of being hard coded to work only as it is now. The difference is the display references the data instead of the display instead of mutating itself to match the data.

I will not update this project. It will serve as a lesson I can reference. Going forward I will ensure my projects think modularly and explicitly reference a single point of authority. This way anything I create will be built to scale infinitely instead of being built to just work.