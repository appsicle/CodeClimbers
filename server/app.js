var express = require('express');
var app = express();
var unirest = require('unirest');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// example questions = { q1: {"tests": q1, "end_code": q1_end_code} }
var questions = require("./questions.js")

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// for just running code
app.post('/run', function(req, res){
    user_code = req.body["code"];

    const promise = new Promise(resolve => {
        unirest.post("https://judge0.p.rapidapi.com/submissions?base64_encoded=false&wait=true")
            .header("X-RapidAPI-Key", "")
            .header("Content-Type", "application/json")
            .send({
                "source_code": user_code,
                "language_id": "37",
            })
            .end(function (result) {
                var result = result.body;
                var output = "";
                if (result["status"]["description"] === "Accepted"){
                    output = result["stdout"];
                }
                else{
                    output = result["stderr"];
                }

                resolve(output);
            });
    });

    promise.then(output => {
        console.log(output);
        res.send(output);
    });
});

// for submitting and running testcases
app.post('/submit', function(req, res){
    // example qnum = "q1"
    qnum = req.body["qnum"];
    var question = questions[qnum];

    // example testcases = [ ["1", "4", "2"], ["2", "8", "4"], ["3", "100", "50"] ];
    var testcases = question["tests"];

    // example execute_test = "\ninput=input()\nanswer=half_num(input)\nprint(answer)"
    var execute_test = question["end_code"];
    user_code = req.body["code"];

    // create test_code to be sent to API
    var test_code = user_code + execute_test;

    const promises = testcases.map(word => new Promise(resolve => {
        unirest.post("https://judge0.p.rapidapi.com/submissions?base64_encoded=false&wait=true")
            .header("X-RapidAPI-Key", "")
            .header("Content-Type", "application/json")
            .send({
                "source_code": test_code,
                "language_id": "37",
                "stdin": word[1],
                "expected_output": word[2]
            })
            .end(function (result) {
                var result = result.body;

                // submission_info = {"P/F": "Passed" or "Failed", "input": input, "output": output, "expected_output" = expected_output}
                var submission_info = {};
                submission_info["Testcase Number"] = word[0];

                if (result["status"]["description"] === "Accepted") {
                    submission_info["P/F"] = "Passed";
                    submission_info["ErrorMessage"] = "None";
                }
                else {
                    submission_info["P/F"] = "Failed";
                    submission_info["ErrorMessage"] = result["stderr"];
                }

                submission_info["input"] = word[1];
                submission_info["output"] = result["stdout"];
                submission_info["expected_output"] = word[2];

                resolve(submission_info);
            });
    }));

    // interpret results from testcases
    Promise.all(promises).then(results => {
        console.log(results);
        var pass = 0;
        for(var i = 0; i < results.length; i++){
            if (results[i]["P/F"] === "Passed"){
                pass += 1;
            }
        }
        console.log((pass/results.length) * 100 + "% Passed");
        res.send(results);
    });
});

app.listen(3000, function () {
    console.log("Express server listening on port 3000");
});
