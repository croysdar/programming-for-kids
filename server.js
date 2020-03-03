const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { exec } = require("child_process");
function runCmd(cmd,callback) {
   exec(cmd, (error, stdout, stderr) => {
      if (error != null) {
         console.log(`error: ${error.message}`);
         if (callback) {
            return callback("","Something went wrong.");
         }
      }
      if (stderr) {
         if(callback) {
            return callback("\`\`\`"+stderr+"\n"+stdout+"\`\`\`");
         }
      }
      //console.log(stdout);
      if (callback) {
          //console.log("Callback stdout");
      return callback(stdout);
      }
   });
}

//DANGER DANGER UNSANITIZED USER INPUT

app.post('/api/register', (req, res) => {
    console.log("body "+req.body.username+" "+req.body.password);
    console.log(req.body);

    //Returns "Failure" When username is taken
    //Returns "Success" When not

    runCmd("./backend/create_user.sh "+req.body.username, function(text,error) {
        console.log(text);
        res.send(text);
    });

});
app.post('/api/login', (req, res) => {
   console.log("body "+req.body.username+" "+req.body.password);
   console.log(req.body);
   runCmd("echo logging in", function(text,error) {
       //console.log(text);
   });
   res.send(`Login complete`,
   );
});
//---------------------------------------------------------------  Grading api calls below here ----------------------------------------------------

app.get('/api/connect', (req, res) => {
  res.send({ express: 'Connected to the grading server' });
});

app.post('/api/grade', (req, res) => {
    console.log("body "+req.body.code+" "+req.body.lesson);
    console.log(req.body);
    var response;
    //var rand = Math.floor((Math.random() * 10000) + 1);
//right now it is hard coded for saving to user id 6969. this can be changed
   runCmd("printf \""+req.body.code+"\" > ./users/6969/pcode/"+req.body.lesson+
   " && ./backend/run_python_script.sh ./grading_scripts/"+req.body.lesson+" ./users/"+"6969"+"/pcode/"+req.body.lesson+" "+"6969" +
   " && rm ./users/"+"6969"+"/pcode/"+req.body.lesson,
      function(text,error) {
         console.log(text);
  
         res.send(
            `Result of grading your submission: ` + text
         );
      });
  
});

app.listen(port, () => console.log(`Listening on port ${port}`));
