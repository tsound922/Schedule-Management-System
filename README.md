# Code Rules v0.2
All the developers must follow the rules when writing their codes.

Code rules version 0.2

- Variable name must be meaningful and easy to understand.
- No under scores for function declaration.
- No dashes for variable declaration.
- Every functions must have a detailed explanation in comments.
- The format style of a function must follow like this:
Function a (){
//function code
}
- No abbreviation for file name
- The files must put into the reasonable folders separately. For example:
registerController.js and authenticateController.js must put into the folder named controller

- Testing cases (including the hard code example) must be embed into “/* */”
- Each line must be under 120 characters except the very lone regular expression.
- Line-wrapping must be happened at the higher syntactic level. Eg:
if (user.isAuthenticated()
    && user.isInRole('admin')
    && user.hasAuthority('add-admin')
    || user.hasAuthority('delete-admin')
) {
    // Code
}

- Line wrapper must be execute if variable declaration, function use, create object, for loop meet “ , ” and “ ; ”
Example:
var obj = {
    a: 1,
    b: 2,
    c: 3
};

foo(
    aVeryVeryLongArgument,
    anotherVeryLongArgument,
    callback
);

- No white space allowed before “ , ” and “ ; ”
- White space should be execute before a code block ( in other words: meet “ { ”)
Example:
if (condition) {
}

- No code block omit in “ if / else / for / do / while ”
For example: 
“if (condition) callFunc();” 
is not allowed and must be write like
if (condition) {
    callFunc();
}
