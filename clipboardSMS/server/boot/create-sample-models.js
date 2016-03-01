var async = require('async');
module.exports = function(app) {
  //data sources
  var db = app.dataSources.pg;
  //create all models

  //Create the ranks
    var rank = app.models.rank;
    var client = app.models.client;
    var staff = app.models.staff;
    var cadet = app.models.cadet;


    //Truncate the ranks table.
    return new Promise(function(resolve,reject){
      db.automigrate('rank', function(err){
      if(err) reject(err);
      resolve();
      })
    })
    //Populate the ranks table.
    .then(function(val){
      console.log("Ranks Truncated");
      return rank.create([
        //Cadets
        {number:1, name: "Air Cadet", abbreviation: "AC", type: "Cadet"},
        {number:2, name: "Leading Air Cadet", abbreviation: "LAC", type: "Cadet"},
        {number:3, name: "Corporal", abbreviation: "Cpl", type: "Cadet"},
        {number:4, name: "Flight Corporal", abbreviation: "FCpl", type: "Cadet"},
        {number:5, name: "Sergeant", abbreviation: "Sgt", type: "Cadet"},
        {number:6, name: "Flight Sergeant", abbreviation: "FSgt", type: "Cadet"},
        {number:7, name: "Warrant Officer Second Class", abbreviation: "WO2", type: "Cadet"},
        {number:8, name: "Warrant Officer First Class", abbreviation: "WO1", type: "Cadet"},
        //Adult Staff
        {number: 9, name: "Civillian Volunteer", abbreviation: "CV", type: "Officer"},
        {number: 10, name: "Civillian Instructor", abbreviation: "CI", type: "Officer"},
        {number: 11, name: "Officer Cadet", abbreviation: "OCdt", type: "Officer"},
        {number: 12, name: "Second Liutenant", abbreviation: "2Lt", type: "Officer"},
        {number: 13, name: "Liutenant", abbreviation: "Lt", type: "Officer"},
        {number: 14, name: "Captain", abbreviation: "Capt", type: "Officer"},
        {number: 15, name: "Major", abbreviation: "Maj", type: "Officer"},
      ])
    })
    //Truncate the clients table.
    .then(function(val){
      console.log("Ranks Saved");
      return new Promise(function(resolve,reject){
        db.automigrate('client',function(err){
        if (err) reject(err);
        resolve();
        })
      })
    })
    //Populate clients table
    .then(function(){
      console.log("clients Truncated");
      //console.log(val);
      return client.create({email: "thilina.ratnayake1@gmail.com", password: "test"})
    })
    //Truncate staff table.
    .then(function(val){
      console.log(val);
      console.log("client Created");
      return new Promise(function(resolve,reject){
        db.automigrate('staff',function(err){
        if (err) reject(err);
        resolve();
        })
      })
    })
    .then(function(){
      console.log("Staff Table Truncated");
      return staff.create([
        {
          rank_id: 1,firstName: "Testy", lastName: "McTesterson", emailAddress: "test@test.com"
        }
      ])
    })
    .then(function(val){
      console.log("Staff Populated");
    })
    .then(function(){
      return new Promise(function(resolve,reject){
        db.automigrate('cadet',function(err){
        if (err) reject(err);
        resolve();
        })
      })
    })
    .then(function(val){
      console.log("Cadets Table Truncated");
      return cadet.create([
        {
          rank_id: 1,CIN: 123456,firstName: "Testy", lastName: "McTesterson", emailAddress: "test@test.com"
        }
      ])
    })
    .catch(function(reason){
      console.log(reason);
      console.log(reason.details);
    })

 
  


  //Create ranks
  // function createRanks(){
  //   return new Promise(function(resolve,reject){
  //     db.automigrate('rank',function(err){
  //     if (err) reject(err);
  //     var rank = app.models.rank;
  //     rank.create([
  //       {number:1, name:'Air Cadet', abbreviation: "AC"},
  //       {number:2, name:'Leading Air Cadet', abbreviation: "LAC"},
  //       ],console.log("TEST"));
  //     })
  //   })
  // }
}



  //Add the test db
  // db.autoupdate('test2')
  // .then(console.log)

  //   function createCoffeeShops(cb) {
  //   mysqlDs.automigrate('CoffeeShop', function(err) {
  //     if (err) return cb(err);
  //     var CoffeeShop = app.models.CoffeeShop;
  //     CoffeeShop.create([
  //       {name: 'Bel Cafe', city: 'Vancouver'},
  //       {name: 'Three Bees Coffee House', city: 'San Mateo'},
  //       {name: 'Caffe Artigiano', city: 'Vancouver'},
  //     ], cb);
  //   });
  // }
  
 