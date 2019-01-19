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
	comments.push(comments);
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




//
var repo_users = {};
var project = new  Project();
function RandomId(){
	return Math.floor((Math.random()*10000) + 1);
}
function Login(){
	window.location = "templates/mngmt.html"
	usern = document.getElementById("username").value;
	var u = new User(usern);
	repo_users[u.id] = usern;
	projn = document.getElementById("projname").value;
	localStorage.setItem("user", usern);
	localStorage.setItem("creator", u.id);
	localStorage.setItem("projectName", projn);
}
(function()
{
	document.getElementById("ProjNamm").innerHTML = "Project name: "+localStorage.getItem("projectName")+"<br>The User logged in is "+localStorage.getItem("user");
}());


function SaveButton(){
	var modal = document.getElementById('altModal');//pop-up new
	var btn = document.getElementById("savebtn");// Get the button that opens the modal
	var span = document.getElementsByClassName("close")[0];// Get the <span> element that closes the modal
	btn.onclick = function() {// When the user clicks on the button, open the modal
	  modal.style.display = "block";
	}
	console.log(btn);
	span.onclick = function() {// When the user clicks on <span> (x), close the modal
	  modal.style.display = "none";
	}
	window.onclick = function(event) {// When the user clicks anywhere outside of the modal, close it
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
}

var usernames = [];

var user1 = new User("MrSandman");
var user2 = new User("Freya");
var user3 = new User("Loki");
repo_users[user1.id] = user1.name;
repo_users[user2.id] = user2.name;
repo_users[user3.id] = user3.name;

usernames.push(user1.name);
usernames.push(user2.name);
usernames.push(user3.name);

var repo_issues = {};

var repo_sprints = {};

var repo_comments = {};

var currSprint = 0;//id of the sprint

function showCreateSprint(){
//pop-up for new sprint
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("show-create");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
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
}
function showFeat(){
//pop-up to show features, can add?
}
function showBugs(){
//pop-up to show bugs, each bug can have a resolved status or 'Rework' to link to changes, can add?
}
function showTasks(){
//pop-up to show tasks and subtasks, can add?
}
function Feedback(){
//pop-up to allow person to write a comment
}
function sendToPreviousSprints(){
}
function reconstruct(){
	document.getElementById("myModal").style.display = "none";
	document.getElementById("LatestSprint").style.display = "block";
	document.getElementById("curr-s").innerHTML="Current Sprint: "+currSprintName;
	if(project.sprints.length >= 2)
		document.getElementById("PreviousSprints").style.display = "block";
	console.log(project.sprints.length);
}
var newSprint = document.getElementById("addpls").addEventListener("click", function(){
	var name = document.getElementById("addsprint").value;
	var sprintt = new sprint(name);
	project.sprints.push(sprintt.id);
	currSprintName = name;
	currSprint = sprintt.id;
	repo_sprints[sprintt.id] = currSprintName; 
	reconstruct();
});

var statuses = ["New", "In progress", "Feedback", "Rework", "Resolved", "Ready for testing"];
function reconstructIssues(){
	document.getElementById("altModal").style.display = "none";
	var str= "";
	for (var i in repo_issues){
		if(repo_issues[i].sprint == currSprint){
			str+="<p>Type:"+repo_issues[i].type+"; Name:"+repo_issues[i].name+"; Created By:"+repo_users[repo_issues[i].createdBy];
			str+="; Assignee:"+repo_users[repo_issues[i].assignee]+"; Description:"+repo_issues[i].description;
			str+="; Status:"+statuses[repo_issues[i].status]+"; Comments:"+repo_comments[repo_issues[i].comments[0]];
			str+="; Created At:"+repo_issues[i].createdAt+"; Updated At:"+repo_issues[i].updatedAt+"</p><br>";
		}
	}
	document.getElementById("tableiss").innerHTML(str);

}

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

