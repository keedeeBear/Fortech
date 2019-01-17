function Comments(id, name){
	this.id = RandomId();
	this.name = name;
}
var currSprintName = "";
function Issue(type, name, sprint, createdBy, assignee, description, status, tasks, comments, updatedAt, createdAt){
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
var project = new  Project();
function RandomId(){
	return Math.floor((Math.random()*10000) + 1);
}
function Login(){
	window.location = "templates/mngmt.html"
	usern = document.getElementById("username").value;
	projn = document.getElementById("projname").value;
	localStorage.setItem("user", usern);
	localStorage.setItem("projectName", projn);
}
(function()
{
	document.getElementById("ProjNamm").innerHTML = "Project name: "+localStorage.getItem("projectName")+"<br>The User logged in is "+localStorage.getItem("user");
}());
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
console.log(btn);

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
	document.getElementById("LatestSprint").style.display = "block";
	document.getElementById("curr-s").innerHTML="Current Sprint: "+currSprintName;
	if(project.sprints.length >= 2)
		document.getElementById("PreviousSprints").style.display = "block";
	console.log(project.sprints.length);
}
var newSprint = document.getElementById("addpls").addEventListener("click", function(){
	var name = document.getElementById("addsprint").value;
	console.log(name);
	var sprintt = new sprint(name);
	project.sprints.push(sprintt.id);
	currSprintName = name;
	reconstruct();
});