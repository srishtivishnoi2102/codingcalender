const axios = require('axios').default;
const URL= "https://clist.by/get/events/";

var runningEvents=[];
var pastEvents=[];
var upcomingEvents=[];
// making get request

axios.get(URL)
.then(response=>{
    // console.log(response);
    categoriseEvents(response.data);
    displayEvents();

})
.catch(err=>{
    console.log(err);
})


function displayEvents(){
    // console.log(choice);
    if(process.argv.length <3){
        return;
    }

    var choice= process.argv[2].toLowerCase();   //choice can be past, running, upcoming

    var events=[];
    switch(choice){
        case "past":
            events=pastEvents;
            break;
        case "running":
            events=runningEvents;
            break;
        case "upcoming":
            events=upcomingEvents;
            break;
        default:
            console.log("Invalid Choice\n Available choices are: Past, Running, Upcoming");
            return;
        
    }
    console.log("The",choice, "events are ::\n",events);



}



function categoriseEvents(events){
    // console.log(events);
    var today=new Date();
    // console.log(today);
    events.forEach(event => {
        var startDate=new Date(event.start);
        var endDate=new Date(event.end);
        if( startDate > today){
            upcomingEvents.push(event);
        }else if(endDate< today){
            pastEvents.push(event);
        }else{
            runningEvents.push(event);
        }
    });
    console.log("Count of pastEvents    :: " ,pastEvents.length);
    console.log("Count of runningEvents :: " ,runningEvents.length);
    console.log("Count of upcomingEvents:: " ,upcomingEvents.length);
    // console.log(process.argv);    gives the list of the arguements on cmd
}
