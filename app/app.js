import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, Button, Label, Bager, Grid, Fade, Row, Col, Table, Navbar, Nav, NavItem, NavDropdown, MenuItem,
Jumbotron, FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, Panel, Image, Pager, ButtonGroup, 
DropdownButton, DropdownToggle} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import Moment from 'moment';

var arr = [];
var event_arr = [{
					title: '早班 8:00 a.m. ~ 4:00 p.m.',
					start: '2017-12-28',
					end:   '2018-01-01'
				},
				{
					title: '午班 12:00 a.m ~ 8:00 a.m.',
					start: '2017-12-28'
				},
				{
					title: '晚班 4:00 p.m. ~ 12:00 a.m.',
					start: '2017-12-31'
				}];
class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<LoginInstance />
  			</div>
		);
	}
}

class LoginInstance extends React.Component{
	constructor(props){
		super(props);
		this.state = { user: '', passwd: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	handleChange(e) {
    	this.setState({ user: e.target.user });
    	this.setState({ passwd: e.target.passwd });
  	}
  	handleClick(){
  		/*
  		 * Could you want to get FormControl value, you would use 'ReactDOM.findDOMNode' to using ref tag with now version.
  		 */
  		var lg_user = ReactDOM.findDOMNode(this.refs.login_user).value;
  		var lg_passwd = ReactDOM.findDOMNode(this.refs.login_passwd).value;

  		arr = [lg_user,lg_passwd];
  		if(lg_user == 'test' && lg_passwd == 'test'){
  			ReactDOM.render(<Index />,document.getElementById('app'));
  		}else{
  			alert('userID or password error!');
  		}
  		
		/*
  		$.ajax({
	        contentType: 'application/json',
	        dataType: 'json',
	        type:'POST',
	        url:jsonURL,
	        data: JSON.stringify(Object),
	        async: true,
	        success: function(data) {
	        
	        }
	    });*/
  	}
  	componentWillUnmount() {
  		console.log("componentWillUnmount()");
  	}
  	render(){
	    return(
	      <Panel header={<center><h1>超商員工排班系統</h1></center>} bsStyle="success">
	      <form>
	        <Col xs={6} xsOffset={4} md={4}>
	        <FormGroup>
	          <br />
	          <ControlLabel>登入帳號:</ControlLabel>
	          <FormControl 
	          	  ref="login_user"
	              type="text"
	              value={this.state.user}
	              onChange={this.handleChange}/>
	          <br />
	          <ControlLabel>登入密碼:</ControlLabel>
	          <FormControl 
	          	  ref="login_passwd"
	              type="password"
	              value={this.state.passwd}
	              onChange={this.handleChange}/>
	        </FormGroup>
	        <br /><br /><br />
	        <Button bsStyle="info" onClick={this.handleClick} block>登入</Button>
	        <br /><br />
	        </Col>
	      </form>
	      </Panel>
	    );
  	}
}

class Index extends React.Component{
	constructor(props){
		super(props);

		this.handleHome = this.handleHome.bind(this);
		this.handleQuery = this.handleQuery.bind(this);
		this.handleNew = this.handleNew.bind(this);
		this.handleMod = this.handleMod.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	handleHome(){
		alert("Home Page");
	}
	handleQuery(){
		ReactDOM.render(<QuerySchedule />,document.getElementById('index'));
	}
	handleNew(){
		ReactDOM.render(<NewSchedule />,document.getElementById('index'));
	}
	handleMod(){
		ReactDOM.render(<ModSchedule />,document.getElementById('index'));
	}
	handleLogout(){
		ReactDOM.render(<LoginInstance />,document.getElementById('app'));
	}
	componentWillUnmount() {

  	}
  	render(){
	    return(
	    		<div>
		        <Navbar inverse collapseOnSelect>
				    <Navbar.Header>
				      <Navbar.Brand>
				      	<a onClick={this.handleHome}>首頁</a>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav>
				        <NavItem onClick={this.handleQuery}>查詢排班</NavItem>
				        <NavItem onClick={this.handleNew}>新增排班</NavItem>
				        <NavItem onClick={this.handleMod}>修改排班</NavItem>
				      </Nav>
				      <Nav pullRight>
				        <NavItem eventKey={1} href="#">會員資訊</NavItem>
				        <NavItem eventKey={2} onClick={this.handleLogout}>登出</NavItem>
				      </Nav>
				    </Navbar.Collapse>
				</Navbar>
				<CalendarInstance />
				</div>
	    );
  	}
}

class QuerySchedule extends React.Component{
	render(){
	    return(
	    	<div>
	    		<h1>Query Schedule</h1>
	    		<Col xs={6} xsOffset={2} md={6}>
					<Calendar />
				</Col>
	    	</div>
	    );
	}
}

class NewSchedule extends React.Component{
	render(){
	    return(
	    	<div>
		    	<h1>New Schedule</h1>
		    	<Col xsOffset={2}>
		    		<External />
		    	</Col>
		    	<Col xs={4} xsOffset={2} md={4}>
					<Calendar />
				</Col>
		    	
		    </div>
	    );
	}
}

class ModSchedule extends React.Component{
	render(){
	    return(
	    	<div>
		    	<h1>Modify Schedule</h1>
		    	<Col xs={6} xsOffset={4} md={4}>
		    		<DatePickerInstance />
		    	</Col>
	    	</div>
	    );
	}
}

class DatePickerInstance extends React.Component {
	constructor(props){
		super(props);
		var value = new Date().toISOString();
		this.state = {
			value: value,
			title: "請選擇班次"
		};

		this.handleChange = this.handleChange.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	onSelect(e){
		this.setState({ title: event.target.text });
	}
	handleChange(value, formattedValue){
		this.setState({
	    	value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
	    	formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
	    });
	}
	handleClick(){
		alert("schedule: "+this.state.title+" time: "+this.state.value);
	}
	componentDidUpdate(){
		var hiddenInputElement = document.getElementById("example-datepicker");
    	//console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
    	console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016""
	}
	render() {
		return (
			<FormGroup>
      			<ControlLabel>修改班別日期</ControlLabel>
      				<DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />
      			<br />
	      		<DropdownButton bsStyle="primary" title={this.state.title} onSelect={this.onSelect}>
	    			<MenuItem eventKey="1">早班 8:00 a.m. ~ 4:00 p.m.</MenuItem>
	    			<MenuItem eventKey="2">午班 12:00 a.m ~ 8:00 a.m.</MenuItem>
	    			<MenuItem eventKey="3">晚班 4:00 p.m. ~ 12:00 a.m.</MenuItem>
	    		</DropdownButton>
	    		<br /><br />
    			<Button onClick={this.handleClick}>送出</Button>
    		</FormGroup>
		);
	}
}

class Calendar extends React.Component {
  render() {
    return (
    	<div id="calendar"></div>
    );
  }
  componentDidMount() {
    $('#calendar').fullCalendar({
    	dayClick: function(){
    		alert("a day");
    	},
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		editable: true,
	    eventClick: function(calEvent,jsEvent,view) {
	    	alert('Event: '+calEvent.title);
	    	alert('View: ' + view.name);

	    	$(this).css('border-color', 'red');
	    },
		droppable: true, // this allows things to be dropped onto the calendar
		drop: function() {
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}	
		}
    })
  }
}

class External extends React.Component {
  render() {
    return <div id='external-events'>
			<h4>移動班別</h4>
			<div className='fc-event'>早班 8:00 a.m. ~ 4:00 p.m.</div>
			<div className='fc-event'>午班 12:00 a.m ~ 8:00 a.m.</div>
			<div className='fc-event'>晚班 4:00 p.m. ~ 12:00 a.m.</div>
			<p>
				<input type='checkbox' id='drop-remove' />
				<label for='drop-remove'>remove after drop</label>
			</p>
		</div>;
  }
  componentDidMount() {
		$('#external-events .fc-event').each(function() {

			// store data so the calendar knows to render an event upon drop
			$(this).data('event', {
				title: $.trim($(this).text()), // use the element's text as the event title
				stick: true // maintain when user navigates (see docs on the renderEvent method)
			});

			// make the event draggable using jQuery UI
			$(this).draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});
		});
  }
}

class CalendarInstance extends React.Component {
  render() {
    return (
    	<div id="instance"></div>
    );
  }
  componentDidMount() {
    $('#instance').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		editable: true,
		events: event_arr,
	    eventOverlap: function(stillEvent, movingEvent) {
	        return stillEvent.allDay && movingEvent.allDay;
	    },
	    eventClick: function(calEvent,jsEvent,view) {
	    	alert('Event: '+calEvent.title);
	    	alert('View: ' + view.name);

	    	$(this).css('border-color', 'red');
	    }
    })
  }
}

ReactDOM.render(<App />, document.getElementById('app'));