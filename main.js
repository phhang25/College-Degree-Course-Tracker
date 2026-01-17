//parse user input from "cli-input" text box upon the user
//entering text and pressing enter.
//e.g. csc"101"s
//e.g. csc"101 202 203"s
//e.g. csc"248"ip
//invalid: csc"101 202"s engl 134 s
//invalid: csc 101 s csc 248 ip

//satisfied courses create green boxes with course label (e.g. CSC
//101) inside text. 

//in-progress courses create orange boxes.

//not satisfied courses create red boxes.

//as more in-progress/not satsfied (future) courses become
//satisfied courses, the green box with text grows larger.

//the max amount of courses per box should be 12 courses.

//command line interface: clear text after user hits enter key

import {get_dictionary_of_CLI} from "./CLIParse.js"
import {area_dropdown_change} from "./AreaDropdown.js"


get_dictionary_of_CLI();
area_dropdown_change();
