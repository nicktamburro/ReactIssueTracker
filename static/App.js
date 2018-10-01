"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var BorderWrap = function (_React$Component) {
	_inherits(BorderWrap, _React$Component);

	function BorderWrap() {
		_classCallCheck(this, BorderWrap);

		return _possibleConstructorReturn(this, (BorderWrap.__proto__ || Object.getPrototypeOf(BorderWrap)).apply(this, arguments));
	}

	_createClass(BorderWrap, [{
		key: "render",
		value: function render() {
			var borderedStyle = { border: "1px solid silver", padding: 6 };
			return React.createElement(
				"div",
				{ style: borderedStyle },
				this.props.children
			);
		}
	}]);

	return BorderWrap;
}(React.Component);

//so now, if we want to pass down this boderWrap stye, we could wrap any component
//like this:
//<BorderWrap>
//  <ExampleComponent/>
//</BorderWrap>
//.....................THIS WORKS because of this.props.children

var IssueRow = function (_React$Component2) {
	_inherits(IssueRow, _React$Component2);

	function IssueRow() {
		_classCallCheck(this, IssueRow);

		return _possibleConstructorReturn(this, (IssueRow.__proto__ || Object.getPrototypeOf(IssueRow)).apply(this, arguments));
	}

	_createClass(IssueRow, [{
		key: "render",
		value: function render() {
			console.log("rendered!");
			var borderedStyle = { border: "1px solid silver", padding: 4 };
			var issue = this.props.issue;
			return (
				//this IssueRow passes these things on to its children
				//the style and the props below
				//so the issue_id CAN'T be changed to children yet, it just showed the
				//issue title twice, instead of id and title
				React.createElement(
					"tr",
					null,
					React.createElement(
						"td",
						null,
						issue.id
					),
					React.createElement(
						"td",
						null,
						issue.status
					),
					React.createElement(
						"td",
						null,
						issue.owner
					),
					React.createElement(
						"td",
						null,
						issue.created.toDateString()
					),
					React.createElement(
						"td",
						null,
						issue.effort
					),
					React.createElement(
						"td",
						null,
						issue.completionDate ? issue.completionDate.toDateString() : ''
					),
					React.createElement(
						"td",
						null,
						issue.title
					)
				)
			);
		}
	}]);

	return IssueRow;
}(React.Component);

//this was coming up as undefined because I had it above the IssueRow class!

//we only do this in development mode, when properties are more likely to change


IssueRow.propTypes = {
	issue_id: React.PropTypes.number,
	//took away .number.isRequired ... was causing an error
	issue_title: React.PropTypes.string
};

var IssueFilter = function (_React$Component3) {
	_inherits(IssueFilter, _React$Component3);

	function IssueFilter() {
		_classCallCheck(this, IssueFilter);

		return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
	}

	_createClass(IssueFilter, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				"IssueFilter will go here."
			);
		}
	}]);

	return IssueFilter;
}(React.Component);

var IssueTable = function (_React$Component4) {
	_inherits(IssueTable, _React$Component4);

	function IssueTable() {
		_classCallCheck(this, IssueTable);

		return _possibleConstructorReturn(this, (IssueTable.__proto__ || Object.getPrototypeOf(IssueTable)).apply(this, arguments));
	}

	_createClass(IssueTable, [{
		key: "render",
		value: function render() {

			var issueRows = this.props.issues.map(function (issue) {
				return React.createElement(IssueRow, { key: issue.id, issue: issue });
			});
			//this table has it's own style,but then it also takes in
			//IssueRow, or children of issue row, which inherit the styles and
			//props
			var borderedStyle = { border: "1px solid silver", padding: 6 };
			return (
				//why is there a double curly brace here?

				//the FIRST brace is our "escape into Javascript"
				//the second brace is just an object, the attribute's value
				React.createElement(
					"table",
					{ style: { borderCollapse: "collapse" } },
					React.createElement(
						"thead",
						null,
						React.createElement(
							"tr",
							null,
							React.createElement(
								"th",
								null,
								"Id"
							),
							React.createElement(
								"th",
								null,
								"Status"
							),
							React.createElement(
								"th",
								null,
								"Ownder"
							),
							React.createElement(
								"th",
								null,
								"Created"
							),
							React.createElement(
								"th",
								null,
								"Effort"
							),
							React.createElement(
								"th",
								null,
								"Completion Date"
							),
							React.createElement(
								"th",
								null,
								"Title"
							)
						)
					),
					React.createElement(
						"tbody",
						null,
						issueRows
					)
				)
			);
		}
	}]);

	return IssueTable;
}(React.Component);

var IssueAdd = function (_React$Component5) {
	_inherits(IssueAdd, _React$Component5);

	function IssueAdd() {
		_classCallCheck(this, IssueAdd);

		return _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).apply(this, arguments));
	}

	_createClass(IssueAdd, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				"Issue Add goes here"
			);
		}
	}]);

	return IssueAdd;
}(React.Component);

{/* FOR NOW: we're going to just have all our data here in an array, later we'll move
 //it to server and then db*/}
var issues = [{
	id: 1, status: 'Open', owner: 'James Hetfield', created: new Date('2018-09-27'),
	effort: 0, completionDate: undefined, title: 'yeahhhhhhhah!'
}, {
	id: 2, status: 'Assigned', owner: 'Dave Mustaine', created: new Date('1987-03-05'),
	effort: 1000, completionDate: new Date('1988-03-05'), title: "I'm not in the band anymore"
}];

var IssueList = function (_React$Component6) {
	_inherits(IssueList, _React$Component6);

	function IssueList() {
		_classCallCheck(this, IssueList);

		//we initialize state here
		var _this6 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

		_this6.state = { issues: [] };
		//we make a timer to create a new issue
		//if we didn't use .bind, the "this" would be set to the timer event
		//rather than the Issue
		setTimeout(_this6.createTestIssue.bind(_this6), 2000);
		return _this6;
	}

	_createClass(IssueList, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.loadData();
		}
	}, {
		key: "loadData",
		value: function loadData() {
			var _this7 = this;

			setTimeout(function () {
				_this7.setState({ issues: issues });
			}, 500);
		}
	}, {
		key: "createIssue",
		value: function createIssue(newIssue) {
			//TODO: why did we use slice, instead of just pushing the new issue in?
			//RIGHTTTTTT we're not supposed to modify the state directly!
			//so we make a new array, that includes the entire old one
			var newIssues = this.state.issues.slice();
			//and then we make a new id, one more than whatever it was already
			newIssue.id = this.state.issues.length + 1;
			//and THEN we push in the new issue
			newIssues.push(newIssue);
			//when we setState, it triggers a rerendering
			this.setState({ issues: newIssues });
		}
	}, {
		key: "createTestIssue",
		value: function createTestIssue() {
			this.createIssue({
				status: 'New', owner: 'Cliff Burton', created: new Date(),
				title: 'My old band is no longer good.'
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h1",
					null,
					"Issue Tracker"
				),
				React.createElement(IssueFilter, null),
				React.createElement("hr", null),
				React.createElement(IssueTable, { issues: this.state.issues }),
				React.createElement("hr", null),
				React.createElement(IssueAdd, null)
			);
		}
	}]);

	return IssueList;
}(React.Component);

//these arguments say (<what thing?>, <where do we put it?>);


ReactDOM.render(React.createElement(IssueList, null), contentNode);

/*const continents = ['Savage Land', 'Wakanda', 'Latvertia', 'Danger Room'];
const message = continents.map(c => `Hello ${c}!`).join(" ");
*/
//const component = <p>{message}</p>;