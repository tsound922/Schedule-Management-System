# Code Rules v0.2
All developers in the team must follow the rules when writing their codes.

Code rules version 0.2

- Variable names must be in camel-case, meaningful and easy to understand. No under scores.
- No under scores for function declaration.
- No dashes for variable declaration.
- Every function must have a detailed explanation in comments.
- The format style of a function must follow:<br>
Function(){<br>
&emsp;&emsp;//function code<br>
}

- No abbreviation for file names.
- The files should be sorted in folders according to their purposes. For example:<br>
registerController.js and authenticateController.js must put into the folder named controller.

- Testing cases (including hard code examples) must be embbed into “/* */”.
- Each line must be under 120 characters except very lone regular expression.
- Line-wrapping must happen at the higher syntactic level. Eg:<br>
if (user.isAuthenticated()<br>
&emsp;&emsp;&& user.isInRole('admin')<br>
&emsp;&emsp;&& user.hasAuthority('add-admin')<br>
&emsp;&emsp;|| user.hasAuthority('delete-admin')<br>
) {<br>
&emsp;&emsp;// Code<br>
}

- Line wrapping must be executed when declaring variables, using functions and creating objects, for loop meet “ , ” and “ ; ”
Example:<br>
var obj = {<br>
&emsp;&emsp;a: 1,<br>
&emsp;&emsp;b: 2,<br>
&emsp;&emsp;c: 3<br>
};<br>
foo(<br>
&emsp;&emsp;aVeryVeryLongArgument,<br>
&emsp;&emsp;anotherVeryLongArgument,<br>
&emsp;&emsp;callback<br>
);

- No white space allowed before “ , ” and “ ; ”
- White space should be execute before a code block ( in other words: meet “ { ”)
Example:<br>
if (condition) {
}

- No code block omit in “ if / else / for / do / while ”
For example: <br>
“if (condition) callFunc();” <br>
is not allowed and must be write like:<br>
if (condition) {<br>
&emsp;&emsp;callFunc();<br>
}

---------------------------------------------------------------------------------------------------------------------------------------
Easy Schedule app
=======
Briefly description
-------------------
This application is going to provide a easy way to deal with the schedule arrangement for small shops. This application is built by using MEAN stack

Before you start this application on your PC
--------------
You need to install the NPM, Nodejs, Express js and MongoDB.

How to start
-----------
After you download or clone this application to your pc, you can run

node server.js
,,,

