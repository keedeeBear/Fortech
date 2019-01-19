//main classes for the app//

function Comments(id, name){
	this.id = RandomId();
	this.name = name;
}
var currSprintName = "";
function Issue(type, name, sprint, createdBy, assignee, description, status, comments, createdAt){
	this.id = RandomId();
	this.type = type;
	this.name = name;
	this.sprint = sprint;
	this.createdBy = createdBy;
	this.assignee = assignee;
	this.description = description;
	this.status = status;
	this.tasks = [];
	this.comments = [];
	this.comments.push(comments);
	this.createdAt = createdAt;
	this.updatedAt = createdAt;
}
function Project(sprints){
	this.id = RandomId();
	this.sprints = [];
}
function sprint(name){
	this.id = RandomId();
	this.name = name;
}
function User(name){
	this.id = RandomId();
	this.name = name;
}




//using repo_users to have on hand the user data list
var repo_users = {};
try{
	
	repo_users[localStorage.getItem("creator")] = localStorage.getItem("user")	;


}
catch{

}

var project = new  Project();

function RandomId(){
	localStorage.setItem("id", parseInt(localStorage.getItem("id"))+ 1);
	return localStorage.getItem("id");
}
function Login(){
	localStorage.clear();
	window.location = "templates/mngmt.html"
	usern = document.getElementById("username").value;
	projn = document.getElementById("login_p").value;
	localStorage.setItem("user", usern);
	localStorage.setItem("id", 0);
	try{
		var u = new User(usern);
	localStorage.setItem("creator", u.id);

	}
catch{}
	localStorage.setItem("projectName", projn);
}
//note: I tried to debug at some point using try-catches, and it works now, so I guess it's daijobu
try{
(function()
{
	document.getElementById("ProjNamm").innerHTML = "Project name: "+localStorage.getItem("projectName")+"<br>The User logged in is "+localStorage.getItem("user");
}());
}
catch{}

function SaveButton(){
	var modal = document.getElementById('altModal');//pop-up new
	var btn = document.getElementById("savebtn");// Get the button that opens the modal
	var span = document.getElementsByClassName("close")[1];// Get the <span> element that closes the modal
	btn.onclick = function() {// When the user clicks on the button, open the modal
	  modal.style.display = "block";
	}
	span.onclick = function() {// When the user clicks on <span> (x), close the modal
	  modal.style.display = "none";
	}
	window.onclick = function(event) {// When the user clicks anywhere outside of the modal, close it
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
}
//an array with some usernames, feel free to change them
var usernames = [];

var user1 = new User("MrSandman");
var user2 = new User("Freya");
var user3 = new User("Loki");
//adding the users onto their proper repo
repo_users[user1.id] = user1.name;
repo_users[user2.id] = user2.name;
repo_users[user3.id] = user3.name;

usernames.push(user1.name);
usernames.push(user2.name);
usernames.push(user3.name);
//repos for the rest of the "classes"
var repo_issues = {};

var repo_sprints = {};

var repo_comments = {};

var currSprint = 0;//id of the sprint shown on page

var statuses = ["New", "In progress", "Feedback", "Rework", "Resolved", "Ready for testing"]; //list of possible statuses
function showCreateSprint(){//same modal as before, used this for the rest of the page since it's trustowrthy
var modal = document.getElementById('myModal');
var btn = document.getElementById("show-create");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}
//a bit of the 'sorting' - you can scroll through the sprints in the order you put em on the app
function sendToPreviousSprints(){
	var k = 0;
	for (var i in repo_sprints)
	{
		if(i == currSprint)
			break;
		k++;
	}
	console.log(" THIS IS K="+k);
	var w = 0;
	for (var i in repo_sprints)
	{
		if(w == k-1)
		{
			currSprint = i;
			currSprintName = repo_sprints[i];
			reconstruct();
			reconstructIssues();
			break;
		}
		w++;
	}

}
//see comment above ^
function sendToNextSprints(){
	var k = 0;
	for (var i in repo_sprints)
	{
		if(i == currSprint)
			break;
		k++;
	}
	console.log(" THIS IS K="+k);
	var w = 0;
	for (var i in repo_sprints)
	{
		if(w == k+1)
		{
			currSprint = i;
			currSprintName = repo_sprints[i];
			reconstruct();
			reconstructIssues();
			break;
		}
		w++;
	}
}
//a function to make sure the proper sprint is shown
function reconstruct(){
	document.getElementById("myModal").style.display = "none";
	document.getElementById("LatestSprint").style.display = "block";
	document.getElementById("curr-s").innerHTML="Current Sprint: "+currSprintName;
	if(project.sprints.length >= 2)
		document.getElementById("PreviousSprints").style.display = "block";
	console.log(project.sprints.length);
}
try{
var newSprint = document.getElementById("addpls").addEventListener("click", function(){
	var name = document.getElementById("addsprint").value;
	var sprintt = new sprint(name);
	project.sprints.push(sprintt.id);
	currSprintName = name;
	currSprint = sprintt.id;
	repo_sprints[sprintt.id] = currSprintName; 
	reconstruct();
	reconstructIssues();
});
}
catch{}

//same as above, but for the issues
function reconstructIssues(){
	document.getElementById("altModal").style.display = "none";
		document.getElementById("modalUP").style.display = "none";

	var str= "";
	for (var i in repo_issues){
		if(repo_issues[i].sprint == currSprint){
			str+="<p>Type:"+repo_issues[i].type+"; Name:"+repo_issues[i].name+"; Created By:"+repo_users[repo_issues[i].createdBy];
			str+="; Assignee:"+repo_users[repo_issues[i].assignee]+"; Description:"+repo_issues[i].description;
			str+="; Status:"+statuses[repo_issues[i].status];
			str+="; Created At:"+repo_issues[i].createdAt+"; Updated At:"+repo_issues[i].updatedAt+"</p><button id='openUp"+i+"' onclick='OpenModUpdate("+i+")'>Update</button><br>";
		}
	}
	document.getElementById("tableiss").innerHTML = str;

}
//cool function I found while researching, thought it'd be neat to have
try{
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

autocomplete(document.getElementById("assignee"), usernames);
}
catch{}
//since I had to work with id's and show names, I needed this to have the two on hand
function Findk (obj, value){
	var key = null;
	for (var prop in obj)
	{
		if (obj.hasOwnProperty(prop))
		{
			if (obj[prop] === value)
			{
				key = prop;
			}
		}
	}
	return key;
}
try{
var newIssue = document.getElementById("issueadd").addEventListener("click", function(){
var n = document.getElementById("issuename").value;//name
var t = document.getElementById("issuetype").value;//type
var as = Findk(repo_users, document.getElementById("assignee").value);//assignee
var desc = document.getElementById("issuedesc").value;//description
var c = new Comments(document.getElementById("issuecom").value);//comments
repo_comments[c.id] = c.name;
var com = c.id;
var sp = currSprint;//sprint
var crb = localStorage.getItem("creator");//createdBy
var s = 0;//position of "New" status
var crat = new Date().toLocaleString();//createdAt
var actis = new Issue(t,n,sp,crb,as,desc,s,com,crat);
repo_issues[actis.id] = actis;
reconstructIssues();
});
}
catch{}

function OpenModUpdate(i){
//pop-up for new sprint
var modal = document.getElementById('modalUP');
// Get the button that opens the modal
var btn = document.getElementById("openUp"+i);
var str='<span class="close">&times;</span> <form> <br><p>Name:</p><br><input type="hidden" value="'+i+'" id="i_id"> <input value="'+repo_issues[i].name+'"type="text" id="u_issuename"> <br><p>Type:</p><br> <select id="u_issuetype"> <option><p>Feature</p></option> <option><p>Bug</p></option> <option><p>Task</p></option> </select> <br><p>Assignee:</p><br> <div class="autocomplete"> <input value="'+repo_users[repo_issues[i].assignee]+'" type="text" id="u_assignee" placeholder="Enter an existent user name"></div> <br><p>Description:</p><br> <input value="'+repo_issues[i].description+'"type="text" id="u_issuedesc"> <br><p>Comments:</p><br> <input type="text" name="commentz" id="u_issuecom">Is it done? <input type="checkbox" value ="1" id="isDone"><button type="button" class="butt" id="u_updateissue">Update</button> </form>';
var span = document.getElementsByClassName("close")[2];
document.getElementById('curr_i').innerHTML = str;
// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
var updateIssue = document.getElementById("u_updateissue").addEventListener("click", function(){
var n = document.getElementById("u_issuename").value;//name
var t = document.getElementById("u_issuetype").value;//type
var as = Findk(repo_users, document.getElementById("u_assignee").value);//assignee
var desc = document.getElementById("u_issuedesc").value;//description
var c = new Comments(document.getElementById("u_issuecom").value);//comments
repo_comments[c.id] = c.name;
var com = c.id;
console.log(as);

var i = document.getElementById("i_id").value;
repo_issues[i].name = n;
repo_issues[i].type = t;
repo_issues[i].assignee = as;
repo_issues[i].description = desc;
repo_issues[i].comments = com;
repo_issues[i].updatedAt = new Date().toLocaleString();
var done = document.getElementById("isDone").value;
if (document.getElementById("isDone").checked)
	repo_issues[i].status = 5;
reconstructIssues();
});
}var updateIssue = document.getElementById("u_updateissue").addEventListener("click", function(){
var n = document.getElementById("u_issuename").value;//name
var t = document.getElementById("u_issuetype").value;//type
var as = Findk(repo_users, document.getElementById("u_assignee").value);//assignee
var desc = document.getElementById("u_issuedesc").value;//description
var c = new Comments(document.getElementById("u_issuecom").value);//comments
repo_comments[c.id] = c.name;
var com = c.id;

var i = document.getElementById("i_id").value;
repo_issues[i].name = n;
repo_issues[i].type = t;
repo_issues[i].assignee = as;
repo_issues[i].description = desc;
repo_issues[i].comments = com;
repo_issues[i].updatedAt = new Date().toLocaleString();
var done = document.getElementById("isDone").value;
if (done == 1)
	repo_issues[i].status = statuses[5];
console.log(repo_issues[i]);
reconstructIssues();
});
function showO(){ //show the overview side, since I had no time to make separate pages
	document.getElementById("overview").style.display = "block";
	document.getElementById("filter").style.display = "none";
}
function showF(){ //same as comment above, for filter section
	document.getElementById("overview").style.display = "none";
	document.getElementById("filter").style.display = "block";
	autocomplete(document.getElementById("filtername"), statuses);
}

function findelemnts(){//show former sprints that fit the bill
	var valinput = document.getElementById("filtername").value;
	var s = "";
	for(var i in repo_issues)
	{
		if(valinput == statuses[repo_issues[i].status]){
			s+="<p>Sprint: "+repo_sprints[repo_issues[i].sprint]+"; Type:"+repo_issues[i].type+"; Name:"+repo_issues[i].name+"; Created By:"+repo_users[repo_issues[i].createdBy];
			s+="; Assignee:"+repo_users[repo_issues[i].assignee]+"; Description:"+repo_issues[i].description;
			s+="; Status:"+statuses[repo_issues[i].status];
			s+="; Created At:"+repo_issues[i].createdAt+"; Updated At:"+repo_issues[i].updatedAt+"</p><br>";
		}
	}
	document.getElementById("showfilters").innerHTML = s;
}