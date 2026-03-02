# College Degree Course Tracker
## https://phhang25.github.io/College-Degree-Course-Tracker/
## ![image alt](https://github.com/phhang25/College-Degree-Course-Tracker/blob/9d6c9be3fb2c2827b241a6a3a9a89f1b5a9e5408/Screenshot%202026-03-01%20234815.png)
## Description
### Add course requirements, course areas, and courses with statuses.
### Move cursor away from rectangles to cancel an action.
### Enter a course with a status. For example: "CSC 248 > in progress"
### Update or delete requirements, course areas, and courses with statuses by clicking on them.
## What I learned
### The project helped me look at big daunting problems and break them down into smaller and more manageable parts.
### One of the hardest parts of developing the website was developing a way to save user inputs so their data isn't just stored for one session and is then lost forever.
### I was able to solve this by using localStorage to store course requirements, course areas, and courses with statuses as JavaScript Objects and parsing them as strings so that the elements could later be appended back onto the page using a for-loop.
### Another challenging part was addressing edge cases. For example, I went through all of the ways that the user could have entered duplicate course fields, preventing them from accidentally deleting all of their data on the website (e.g. putting "General Education" as a course requirement twice).
