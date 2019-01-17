<script type = "text/javascript" src="utils/utils.js"> //</script>
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