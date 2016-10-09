import Datastore from 'nedb';

const db = new Datastore({ autoload: true }); // in-memory database 


  db.loadDatabase(function (err) {
    db.find({ box: 'impUrg'}, function (err, docs) {
        console.log(docs[0]);
        console.log(docs.length);
    });
  });  
  db.insert([{
    box: "impUrg", 
    task : "pick up prescriptions", 
    completed: false
  },
  {
    box: "impNoUrg", 
    task : "plan vacation", 
    completed: false
  },
  {
    box: "noImpUrg", 
    task : "sample", 
    completed: false
  },
  {
    box: "noImpNoUrg", 
    task : "organize record collection", 
    completed: false
  }]);