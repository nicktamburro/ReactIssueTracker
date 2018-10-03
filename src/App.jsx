const contentNode = document.getElementById('contents');

class BorderWrap extends React.Component{
	render(){
		const borderedStyle = {border: "1px solid silver", padding: 6};
		return(
			<div style={borderedStyle}>
				{this.props.children}
			</div>
		);
	}
}

//so now, if we want to pass down this boderWrap stye, we could wrap any component
//like this:
//<BorderWrap>
//  <ExampleComponent/>
//</BorderWrap>
//.....................THIS WORKS because of this.props.children


//now we're making these into stateless components
const IssueRow = (props) =>{
//class IssueRow extends React.Component{
			<tr>
				<td>{props.issue.id}</td>
				<td>{props.issue.status}</td>
				<td>{props.issue.owner}</td>
				<td>{props.issue.created.toDateString()}</td>
				<td>{props.issue.effort}</td>
				<td>{props.issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
				<td>{props.issue.title}</td>
			</tr>	
}

//this was coming up as undefined because I had it above the IssueRow class

//we only do this in development mode, when properties are more likely to change
IssueRow.propTypes = {
	issue_id: React.PropTypes.number,
	//took away .number.isRequired ... was causing an error
	issue_title: React.PropTypes.string
};

class IssueFilter extends React.Component{
	render(){
		return(
			<div>IssueFilter will go here.</div>
		)
	}
}
const IssueTable = (props) => {
//class IssueTable extends React.Component{
//	render(){

		const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />)
		//this table has it's own style,but then it also takes in
		//IssueRow, or children of issue row, which inherit the styles and
		//props
		const borderedStyle = {border: "1px solid silver", padding: 6};
		return(
			//but why is there a double curly brace here?

			//the FIRST brace is our "escape into Javascript"
			//the second brace is just an object, the attribute's value
			<table className="bordered-table">
				<thead>
					<tr>
						<th>Id</th>
						<th>Status</th>
						<th>Owner</th>
						<th>Created</th>
						<th>Effort</th>
						<th>Completion Date</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{issueRows}
				</tbody>
			</table>
		);
	}


class IssueAdd extends React.Component{
	constructor(){
		super();
		//bound this up here, so the code below can be smoother
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		var form = document.forms.issueAdd;
		this.props.createIssue({
			owner: form.owner.value,
			title: form.title.value,
			status: 'New',
			created: new Date()
		});
		//clear the form for next input
		form.owner.value = ""; form.title.value = "";
	}

	render(){
		return(
			<div>
				<form name="issueAdd" onSubmit={this.handleSubmit}>
					<input type="text" name="owner" placeholder="Owner" />
					<input type="text" name="title" placeholder="Title" />
					<button>Add</button>
				</form>
			</div>
		)
	}
}
{/* FOR NOW: we're going to just have all our data here in an array, later we'll move
//it to server and then db*/}
const issues = [
	{
		id: 1, status: 'Open', owner: 'James Hetfield', created: new Date('2018-09-27'),
		effort: 0, completionDate: undefined, title: 'yeahhhhhhhah!'
	},
	{
		id: 2, status: 'Assigned', owner: 'Dave Mustaine', created: new Date('1987-03-05'),
		effort: 1000, completionDate: new Date('1988-03-05'), title: "I'm not in the band anymore"
	}
];


class IssueList extends React.Component{
	constructor(){
		super();
		//initialize state
		this.state = { issues: [] };
		
		//HERE, we we got rid of multiple binds
		//by this.createTestIssue with a permanently bound version
		//it used to be bound INSIDE the setTimeout, but we moved it up here
		//this.createTestIssue = this.createTestIssue.bind(this);
		//we make a timer to create a new issue
		//if we didn't use .bind, the "this" would be set to the timer event
		//rather than the Issue
		//setTimeout(this.createTestIssue, 2000);
		this.createIssue = this.createIssue.bind(this);
	}

	componentDidMount(){
		this.loadData();
	}

	loadData(){
		setTimeout(() => {
			this.setState({ issues: issues });
		}, 500);
	}

	createIssue(newIssue){
		//we do this because we're not supposed to modify the state directly
		//so we make a new array, that includes the entire old one
		const newIssues = this.state.issues.slice();
		//and then we make a new id, one more than whatever it was already
		newIssue.id = this.state.issues.length + 1;
		//and THEN we push in the new issue
		newIssues.push(newIssue);
		//when we setState, it triggers a rerendering
		this.setState({ issues: newIssues });
	}

	render(){
		return(
			<div>
			<h1>Issue Tracker</h1>
			<IssueFilter/>
			<hr/>
			{/* we pass the data contained in state to IssueTable via
			properties, now it's using the "issues" array as its source data*/}
			<IssueTable issues={this.state.issues}/>
			<hr/>
			<IssueAdd createIssue={this.createIssue}/>	
			</div>
		);
	}
}

//these arguments say (<what thing?>, <where do we put it?>);
ReactDOM.render(<IssueList />, contentNode);


