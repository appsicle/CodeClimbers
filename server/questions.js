/*
    Question 1:
    Problem: Write a function that returns half of the number.
    Example:
        half_num(4) => 2
 */
var q1 = [["1","4","2"],["2","8","4"],["3","100","50"]];
var q1_end_code = "\ninput=input()\nanswer=half_num(input)\nprint(answer)"
var q1_fdef = "half_num(num)"

/*
    Question 2:
    Problem: Return smallest element in array
    Example: smallest([1,2,3,4,5,0,-2,-3]) => -3
 */
var q2= [["1","[1, 2, 3, 4, 5, 0, -2, -3]","-3"],["2","[2, 3, 4, 5, 6, 0, 2, 3]","0"],["3","[4, 5, 6, 7,]","4"]];
var q2_end_code = "\ninput=input()\nanswer=smallest(input)\nprint(answer)";
var q2_fdef = "smallest(arr)";

/*
    Question 3:
    Problem:
    Example:
 */
var q3 = [["1","1","1"],["2","2","2"],["3","3","3"]];
var q3_end_code = "";
var q3_fdef = "";


module.exports = { q1: {"tests": q1, "end_code": q1_end_code, "fdef": q1_fdef},
    q2: {"tests": q2, "end_code": q2_end_code, "fdef": q2_fdef},
    q3: {"tests": q3, "end_code": q3_end_code, "fdef": q3_fdef}};