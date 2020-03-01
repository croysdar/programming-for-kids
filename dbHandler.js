const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

class DatabaseHandler {
    #db;
    dbname;
    lessonRows;     //Results of last Lesson query stored here
    studentRows;    //Results of last Student query stored here

    constructor(dbName){
        this.dbname = dbName;
        this.lessonRows = [];
        this.studentRows = [];
    }
    //Open the database for queries
    _openDB(){
        this.db = new sqlite3.Database('./database.db', (err) =>{
            if (err){throw err;}});
    }
    //Close the database
    _closeDB(){
        this.db.close((err) =>{
            if(err){throw err;}});
    }

    /***********************************
    * Name: addLessonXML
    * Arguments:
        lessonNumber - integer representing the lesson number
        filename - string of the name of the file containing xml for the lesson
    * Description:
        Put the xml from some file into the relevant Lesson entity in the database
    * Return: none
    ***********************************/
    addLessonXML(lessonNumber, fileName){
        var lessonxml = fs.readFileSync(fileName, 'utf-8');
        _openDB();
        var sql = 'UPDATE Lesson SET lesson_xml = ? WHERE lesson_id = lessonNumber';
        this.db.run(sql, [lessonxml], (err) =>{
            if(err) throw err;
        });
        _closeDB();
    }

    /************************************************
    * Name: getLesson
    * Arguments:
          lessonNumber-Integer: A number representing the desired lesson number
      Description:
          Take the passed lesson number and run a SELECT statement to
          the database to retrieve the lesson.
      Return:
          On success, returns a list representing a lesson entity
          as [lessonid, next_lesson_id, prev_lesson_id, name, hint]
          On fail, it returns an ampty list.
    */
    async _getLesson(lessonNumber){
        this._openDB();
        let sql = 'SELECT * FROM Lesson WHERE lesson_id = ?';
        await this.db.get(sql, [lessonNumber], await function(err, rows){
            //console.log("==Row: " + rows.lesson_id);
            //Error handling
            if(err){
                throw err;
                this.lessonRows = [];
            }
            //Success: save data
            this.lessonRows = rows;
        });
        //close db and return lessonRows
        this._closeDB();
        return this.lessonRows;
    }
    getLesson(lessonNumber){
        this._getLesson(lessonNumber).then(result => {
            return this.lessonRows;});
    }
}
module.exports = {DatabaseHandler};
