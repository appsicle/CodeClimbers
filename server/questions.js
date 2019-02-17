/*
    Question 1: half_num(n)
    Problem: Write a function that returns half of the number.
    Example:
        half_num(4) => 2
 */
var q1 = [["1","4","2"],["2","8","4"],["3","100","50"]];
var q1_end_code = "\ninput=input()\nanswer=half_num(input)\nprint(answer)";

/*
    Question 2: smallest(arr)
    Problem: Return smallest element in array
    Example: smallest([1,2,3,4,5,0,-2,-3]) => -3
 */
var q2= [["1","[1, 2, 3, 4, 5, 0, -2, -3]","-3"],["2","[2, 3, 4, 5, 6, 0, 2, 3]","0"],["3","[4, 5, 6, 7,]","4"]];
var q2_end_code = "\ninput=input()\nanswer=smallest(input)\nprint(answer)";

/*
    Question 3: reverse(s)
    Problem: Return a reversed version of the string inputted.
    Example: reverse("Hello") => "olleH"
 */
var q3 = [["1","\"Hello\"","olleH"],["2","\"racecar\"","racecar"],["3","\"corgi\"","igroc"]];
var q3_end_code = "\ninput=input()\nanswer=reverse(input)\nprint(answer)";

/*
    Question 4: first_unique(s)
    Problem: Return first unique character in a string.
    Example: reverse("bibliography") => "l"
 */
var q4 = [["1","\"bibliography\"","l"],["2","\"racecar\"","e"],["3","\"abcdezyabcde\"","z"]];
var q4_end_code = "\ninput=input()\nanswer=first_unique(input)\nprint(answer)";

module.exports = { q1: {"tests": q1, "end_code": q1_end_code},
    q2: {"tests": q2, "end_code": q2_end_code},
    q3: {"tests": q3, "end_code": q3_end_code},
    q4: {"tests": q4, "end_code": q4_end_code}};