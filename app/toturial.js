import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Label, Bager, Grid, Fade, Row, Col, Table, Navbar, Nav, NavItem, NavDropdown, MenuItem,
Jumbotron, FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, Panel, Image, Pager, ButtonGroup, 
DropdownButton, DropdownToggle, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

var testList = [{a:['b','c']}];

var playerTeam = ['開南大學','文化大學','嘉義大學'];
var playerList = ['1號球員','2號球員','3號球員','4號球員','5號球員'];
var person = [{name: '王小明', unit:'開南大學', sex: '男', sid: 'C123456789', phone: '0911223345', address: '桃園市蘆竹鄉開南路1號', 
			   mail: 'knu_Guardian@mail.knu.edu.tw', title: '1號球員', description: '', BMI: '20', history:[]},
			  {name: '李小龍', unit:'開南大學', sex: '女', sid: 'A123456789', phone: '0915226824', address: '桃園市蘆竹鄉開南路1號', 
			   mail: 'lee_Player@mail.knu.edu.tw', title: '2號球員', description: '', BMI: '23', history:[]},
			  {name: '鄭大明', unit:'開南大學', sex: '男', sid: 'C121123746', phone: '0978526761', address: '桃園市蘆竹鄉開南路1號', 
			   mail: 'wang_Coach@mail.knu.edu.tw', title: '3號球員', description: '', BMI: '25', history:[]},
			  {name: '陳春香', unit:'開南大學', sex: '女', sid: 'A126534128', phone: '0925845368', address: '桃園市蘆竹鄉開南路1號', 
			   mail: 'chen_Player@mail.knu.edu.tw', title: '4號球員', description: '', BMI: '21', history:[]},
			  {name: '吳極', unit:'開南大學', sex: '男', sid: 'C129561238', phone: '0910823335', address: '桃園市蘆竹鄉開南路1號', 
			   mail: 'wu_Player@mail.knu.edu.tw', title: '5號球員', description: '', BMI: '19', history:[]}];
var rehabilitation = [{name: person[0].name, description: '', start_date: '', end_date: ''},
					  {name: person[1].name, description: '', start_date: '', end_date: ''},
					  {name: person[2].name, description: '', start_date: '', end_date: ''},
					  {name: person[3].name, description: '', start_date: '', end_date: ''},
					  {name: person[4].name, description: '', start_date: '', end_date: ''}];
var key = '';
var l_auth = '';

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
class Test extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		console.log(testList[0].a[0]);
		testList[0].a.forEach(
			function(e){
				console.log(e);
			}
		);
	}
	render(){
		return(
			<Button onClick={this.handleClick}>Check</Button>
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
  		var count = 0;
  		var lg_user = ReactDOM.findDOMNode(this.refs.login_user).value;
  		var lg_passwd = ReactDOM.findDOMNode(this.refs.login_passwd).value;

  		if(lg_user == 'test' && lg_passwd == '12345'){
  			l_auth = '防護員';
  			ReactDOM.render(<GuardianList auth={l_auth} />,document.getElementById('app'));
  		}else if(lg_user == 'coach' && lg_passwd == '12345'){
			l_auth = '教練';
			ReactDOM.render(<CoachList auth={l_auth} />,document.getElementById('app'));
  		}else if(lg_user == '' || lg_passwd == ''){
  			alert('account or password is enter wrong!');
  		}else{
  			person.forEach(function(e){
  				if(lg_user == e.sid && lg_passwd == e.phone){
  					key = count;
  					console.log('sid key is '+key+', account is '+e.name);
  					ReactDOM.render(<PlayerList tid={playerList[key]} />,document.getElementById('app'));
  				}
  				count++;
  			});
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
  	render(){
	    return(
	      <Panel header={<center><h1>運動傷害管理系統</h1></center>} bsStyle="success">
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

class GuardianList extends React.Component{
	constructor(props){
		super(props);
		this.state = { title: '請選擇球員', key: '', team: '請選擇學校' };

		this.onSelect = this.onSelect.bind(this);
		this.onTeamSelect = this.onTeamSelect.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
	}
	onSelect(e){
		this.setState({ title: event.target.text });
		this.setState({ key: e });
	}
	onTeamSelect(e){
		this.setState({ team: event.target.text });
	}
	handleNextClick(){
		if(key !== ''){
			ReactDOM.render(<GuardianHurtList tid={playerList[key]} />,document.getElementById('app'));
		}else{
			alert('請選擇球員');
		}
	}
	handleClick(){
		key = '';
		l_auth = '';
		ReactDOM.render(<LoginInstance />,document.getElementById('app'));
	}
	render(){
		var row = [], row_t = [];
		var count = 0, cc = 0;
		playerTeam.forEach(
			function(e){
				row_t.push(<MenuItem eventKey={cc}>{e}</MenuItem>);
				cc++;
			}
		);
		playerList.forEach(
			function(e){
				row.push(<MenuItem eventKey={count}>{e}</MenuItem>);
				count++;
			}
		);

		key = this.state.key;

		//console.log(row);
		console.log('key: '+key);

		return(
			<Panel header={<center><h1>球員名單</h1></center>} bsStyle="warning">
		        <Col xs={6} xsOffset={4} md={4}>
		          <br />
		        	<p><h4>登入身分:{this.props.auth}</h4></p>
		          <br />
		          <ButtonToolbar>
			          <DropdownButton bsStyle="success" title={this.state.team} bsSize="large" onSelect={this.onTeamSelect}>
					      {row_t}
					   </DropdownButton>
				   </ButtonToolbar>
				   <br />
		          <ButtonToolbar>
			          <DropdownButton bsStyle="danger" title={this.state.title} bsSize="large" onSelect={this.onSelect}>
					      {row}
					   </DropdownButton>
				   </ButtonToolbar>
				   <br />
				   <Button bsStyle="primary" onClick={this.handleNextClick}><h5>下一步</h5></Button><br />
				   <br />
		          <Button bsStyle="warning" onClick={this.handleClick}><h5>登出</h5></Button><br />
		        </Col>
		    </Panel>
		);
	}
}

class GuardianHurtList extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
    this.handleMainClick = this.handleMainClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleAllClick = this.handleAllClick.bind(this);
    this.handleHurtRecordClick = this.handleHurtRecordClick.bind(this);
    this.handleRehabilitationClick = this.handleRehabilitationClick.bind(this);
  }
  handleMainClick(){
    ReactDOM.render(<GuardianMainRecord title="基本資料" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleLastClick(){
    ReactDOM.render(<GuardianRecord title="最近一次受傷紀錄" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleAllClick(){
    ReactDOM.render(<GuardianHistoryRecord title="受傷歷史紀錄" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleHurtRecordClick(){
  	ReactDOM.render(<GuardianHurtRecord title="受傷紀錄登入" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleRehabilitationClick(){
  	ReactDOM.render(<GuardianRehabilitation title="復健規劃" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleBlackClick(){
    ReactDOM.render(<GuardianList auth={l_auth} />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}受傷紀錄</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={4} md={4}>
          <br />
          <Button bsStyle="info" onClick={this.handleMainClick} block><h4>基本資料</h4></Button><br />
          <Button bsStyle="info" onClick={this.handleHurtRecordClick} block><h4>受傷紀錄登入</h4></Button><br />
          <Button bsStyle="info" onClick={this.handleLastClick} block><h4>最近一次受傷紀錄</h4></Button><br />
          <Button bsStyle="info" onClick={this.handleAllClick} block><h4>受傷歷史紀錄</h4></Button><br />
          <Button bsStyle="info" onClick={this.handleRehabilitationClick} block><h4>復健規劃</h4></Button><br /><br /><br />
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button><br />
        </Col>
      </Panel>
    );
  }
}

class GuardianMainRecord extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ''};

    this.handleBlackClick = this.handleBlackClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<GuardianHurtList tid={playerList[key]} />,document.getElementById('app'));
  }
  handleHomeClick(){
    ReactDOM.render(<GuardianList auth={l_auth} />,document.getElementById('app'));
  }
  handleChange(e){
  	this.setState({ value: e.target.value });
  }
  handleClick(){
  	var BMI = ReactDOM.findDOMNode(this.refs.bmi).value;
  	person[key].BMI = BMI;
  	alert('BMI修改為'+BMI+'請回上一頁再進入此頁面!');
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}個人資料</h1></center>} bsStyle="warning">
        <Col sm={6} xsOffset={2}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="性別:">{person[key].sex}</ListGroupItem>
            <ListGroupItem header="單位:">{person[key].unit}</ListGroupItem>
            <ListGroupItem header="電話:">{person[key].phone}</ListGroupItem>
            <ListGroupItem header="地址:">{person[key].address}</ListGroupItem>
            <ListGroupItem header="信箱:">{person[key].mail}</ListGroupItem>
            <ListGroupItem header="稱號:">{person[key].title}</ListGroupItem>
            <ListGroupItem header="BMI:">
            	{person[key].BMI}</ListGroupItem><br />
            	<Form inline>
	            	<ControlLabel>更改BMI值:</ControlLabel>
	            	{'	'}
	            	<FormControl 
	                        ref="bmi"
	                        type="text"
	                        value={this.state.value}
	                        onChange={this.handleChange}
	                     />{'	'}
	                <Button bsStyle="danger" onClick={this.handleClick}>確認</Button>
                </Form>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={4}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>&nbsp;
          <Button bsStyle="warning" onClick={this.handleHomeClick} block><h4>回球員名單</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class GuardianRecord extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<GuardianHurtList tid={playerList[key]} />,document.getElementById('app'));
  }
  handleHomeClick(){
    ReactDOM.render(<GuardianList auth={l_auth} />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}最近一次受傷紀錄</h1></center>} bsStyle="warning">
        <Col sm={6} xsOffset={2}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="最近一次受傷紀錄:">{person[key].description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={4}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>&nbsp;
          <Button bsStyle="warning" onClick={this.handleHomeClick} block><h4>回球員名單</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class GuardianHistoryRecord extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<GuardianHurtList tid={playerList[key]} />,document.getElementById('app'));
  }
  handleHomeClick(){
    ReactDOM.render(<GuardianList auth={l_auth} />,document.getElementById('app'));
  }
  render(){
  	var len = person[key].history.length;
  	console.log('person history length: '+len);
    return(
      <Panel header={<center><h1>{this.props.tid}受傷歷史紀錄</h1></center>} bsStyle="warning">
        <Col sm={6} xsOffset={2}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="受傷歷史紀錄:">{person[key].history.slice(0,len).join(' ')}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={4}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>&nbsp;
          <Button bsStyle="warning" onClick={this.handleHomeClick} block><h4>回球員名單</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class GuardianHurtRecord extends React.Component{
    constructor(props){
        super(props);
        this.state = { text: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlackClick = this.handleBlackClick.bind(this);
        this.handleHomeClick = this.handleHomeClick.bind(this);

        this.handleRehabilitationClick = this.handleRehabilitationClick.bind(this);
    }
    
    handleChange(e){
        this.setState({ text: e.target.text });
    }

    handleBlackClick(){
        ReactDOM.render(<GuardianHurtList />,document.getElementById('app'));
    }
    
    handleHomeClick(){
    	ReactDOM.render(<GuardianList auth={l_auth} />,document.getElementById('app'));
    }

    handleRehabilitationClick(){
    	ReactDOM.render(<GuardianRehabilitationRecord title="復健規劃登入" tid={playerList[key]} />,document.getElementById('app'));
  	}
    handleClick(){
        var pp = ReactDOM.findDOMNode(this.refs.space).value;
        person[key].description = pp;       
        person[key].history.push(pp);

        alert('Hurt description is: '+person[key].description+' save!');
        //console.log(person[key].history.slice(0,person[key].history.length));
    }
    
    render(){
        return(
            <Panel header={<center><h1>{this.props.tid}受傷紀錄登入</h1></center>} bsStyle="warning">
                <FormGroup horizontal>
                    <ControlLabel>請輸入受傷資訊 例如：受傷狀況、受傷地點...等</ControlLabel>
                    <FormControl 
                        ref="space"
                        componentClass="textarea"
                        value={this.state.text}
                        onChange={this.handleChange}
                     />
                     <br /><br />
                     <Col xs={6} xsOffset={4} md={4}>
                         <ButtonToolbar>
                             <Button bsStyle="primary" onClick={this.handleClick} block><h4>儲存</h4></Button>
                             <Button bsStyle="success" onClick={this.handleRehabilitationClick} block><h4>復健規劃登入</h4></Button>
                             <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>
                             <Button bsStyle="warning" onClick={this.handleHomeClick} block><h4>回選單</h4></Button>
                         </ButtonToolbar>
                     </Col>
                </FormGroup>
            </Panel>
        );
    }
}

class GuardianRehabilitation extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<GuardianHurtList tid={playerList[key]} />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}復健規劃</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={2} md={6}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="復健規劃:">{rehabilitation[key].description}</ListGroupItem>
            <ListGroupItem header="就診時間:">{rehabilitation[key].start_date}</ListGroupItem>
            <ListGroupItem header="回診時間:">{rehabilitation[key].end_date}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={4}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class GuardianRehabilitationRecord extends React.Component{
    constructor(props){
        super(props);
        var value = new Date().toISOString();
        this.state = { text: '', startDate: value, endDate: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlackClick = this.handleBlackClick.bind(this);
        this.handleHomeClick = this.handleHomeClick.bind(this);

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }    
    handleChange(e){
        this.setState({ text: e.target.text });
    }
    handleBlackClick(){
        ReactDOM.render(<GuardianHurtList />,document.getElementById('app'));
    }
    handleHomeClick(){
    	ReactDOM.render(<GuardianList auth={l_auth} />,document.getElementById('app'));
    }
    handleClick(){
        var pp = ReactDOM.findDOMNode(this.refs.reh).value;
        var str_date = this.state.startDate;
        var end_date = this.state.endDate;
        rehabilitation[key].description = pp;
        rehabilitation[key].start_date = str_date.substring(0,10);
        rehabilitation[key].end_date = end_date.substring(0,10);
        alert('Rehabilitation description is: '+rehabilitation[key].description+' save!');
        console.log('start:'+rehabilitation[key].start_date+' end:'+rehabilitation[key].end_date);
    }
    handleStartDateChange(startDate, formattedValue){
		this.setState({
      		startDate: startDate,
      		formattedValue: formattedValue
    	});
	}
	handleEndDateChange(endDate, formattedValue){
		this.setState({
      		endDate: endDate,
      		formattedValue: formattedValue
    	});
	}
    render(){
        return(
            <Panel header={<center><h1>{this.props.tid}復健規劃登入</h1></center>} bsStyle="warning">
                <FormGroup horizontal>
                    <ControlLabel>請輸入復健規劃</ControlLabel>
                    <FormControl 
                        ref="reh"
                        componentClass="textarea"
                        value={this.state.text}
                        onChange={this.handleChange}
                     />
                     <br /><br />
                     
                     <ControlLabel>請選擇就診時間</ControlLabel>
				      <DatePicker 
				      	dateFormat="YYYY/MM/DD"
				      	value={this.state.startDate}
				      	onChange={this.handleStartDateChange} />
				     <br />
                     <ControlLabel>請選擇回診時間</ControlLabel>
				      <DatePicker 
				      	dateFormat="YYYY/MM/DD"
				      	value={this.state.endDate}
				      	onChange={this.handleEndDateChange} />
				     
				      <br /><br />
                     <Col xs={6} xsOffset={4} md={4}>
                         <ButtonToolbar>
                             <Button bsStyle="primary" onClick={this.handleClick} block><h4>儲存</h4></Button>
                             <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>
                             <Button bsStyle="warning" onClick={this.handleHomeClick} block><h4>回選單</h4></Button>
                         </ButtonToolbar>
                     </Col>
                </FormGroup>
            </Panel>
        );
    }
}

class PlayerList extends React.Component{
  constructor(props){
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleMainClick = this.handleMainClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleAllClick = this.handleAllClick.bind(this);
    this.handleRehabilitationClick = this.handleRehabilitationClick.bind(this);
  }
  handleMainClick(){
    ReactDOM.render(<PlayerMainRecord title="基本資料" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleLastClick(){
    ReactDOM.render(<PlayerRecord title="最近一次受傷紀錄" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleAllClick(){
    ReactDOM.render(<PlayerHistoryRecord title="受傷歷史紀錄" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleRehabilitationClick(){
    ReactDOM.render(<PlayerRehabilitationRecord title="復健規劃" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleLogoutClick(){
  	key = '';
    ReactDOM.render(<LoginInstance />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}受傷紀錄</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={4} md={4}>
          <br />
          <Button bsStyle="info" onClick={this.handleMainClick} block><h4>基本資料</h4></Button><br />
          <Button bsStyle="info" onClick={this.handleLastClick} block><h4>最近一次受傷紀錄</h4></Button><br />
          <Button bsStyle="info" onClick={this.handleAllClick} block><h4>受傷歷史紀錄</h4></Button><br />
          <Button bsStyle="info" onClick={this.handleRehabilitationClick} block><h4>復健規劃</h4></Button><br /><br /><br />
          <Button bsStyle="warning" onClick={this.handleLogoutClick} block><h4>登出</h4></Button><br />
        </Col>
      </Panel>
    );
  }
}

class PlayerRecord extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<PlayerList tid={playerList[key]} />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}最近一次受傷紀錄</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={2}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="最近一次受傷紀錄:">{person[key].description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={4}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class PlayerHistoryRecord extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<PlayerList tid={playerList[key]} />,document.getElementById('app'));
  }
  render(){
  	var len = person[key].history.length;
    return(
      <Panel header={<center><h1>{this.props.tid}受傷歷史記錄</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={2}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="受傷歷史記錄:">{person[key].history.slice(0,len).join(' ')}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={4}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class PlayerRehabilitationRecord extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<PlayerList tid={playerList[key]} />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}復健規劃</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={2} md={6}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="復健規劃:">{rehabilitation[key].description}</ListGroupItem>
            <ListGroupItem header="就診時間:">{rehabilitation[key].start_date}</ListGroupItem>
            <ListGroupItem header="回診時間:">{rehabilitation[key].end_date}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={4}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class PlayerMainRecord extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<PlayerList tid={playerList[key]} />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}個人資料</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={2}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="性別:">{person[key].sex}</ListGroupItem>
            <ListGroupItem header="單位:">{person[key].unit}</ListGroupItem>
            <ListGroupItem header="電話:">{person[key].phone}</ListGroupItem>
            <ListGroupItem header="地址:">{person[key].address}</ListGroupItem>
            <ListGroupItem header="信箱:">{person[key].mail}</ListGroupItem>
            <ListGroupItem header="稱號:">{person[key].title}</ListGroupItem>
            <ListGroupItem header="BMI:">{person[key].BMI}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={6}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class CoachList extends React.Component{
	constructor(props){
		super(props);
		this.state = { title: '請選擇球員', key: '' };

		this.onSelect = this.onSelect.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
	}
	onSelect(e){
		this.setState({ title: event.target.text });
		this.setState({ key: e });
	}
	handleNextClick(){
		if(key !== ''){
			ReactDOM.render(<CoachHurtList tid={playerList[key]} />,document.getElementById('app'));
		}else{
			alert('請選擇球員');
		}
	}
	handleClick(){
		key = '';
		l_auth = '';
		ReactDOM.render(<LoginInstance />,document.getElementById('app'));
	}
	render(){
		var row = [];
		var count = 0;
		playerList.forEach(
			function(e){
				row.push(<MenuItem eventKey={count}>{e}</MenuItem>);
				count++;
			}
		);

		key = this.state.key;

		console.log(row);
		console.log(key);

		return(
			<Panel header={<center><h1>球員名單</h1></center>} bsStyle="warning">
		        <Col xs={6} xsOffset={4} md={4}>
		          <br />
		        	<p><h4>登入身分:{this.props.auth}</h4></p>
		          <br />
		          <ButtonToolbar>
			          <DropdownButton bsStyle="danger" title={this.state.title} bsSize="large" onSelect={this.onSelect}>
					      {row}
					   </DropdownButton>
				   </ButtonToolbar>
				   <br />
				   <Button bsStyle="primary" onClick={this.handleNextClick}><h5>下一步</h5></Button><br />
				   <br />
		          <Button bsStyle="warning" onClick={this.handleClick}><h5>登出</h5></Button><br />
		        </Col>
		    </Panel>
		);
	}
}

class CoachHurtList extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
    this.handleMainClick = this.handleMainClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.handleAllClick = this.handleAllClick.bind(this);
    this.handleRehabilitationClick = this.handleRehabilitationClick.bind(this);
  }
  handleMainClick(){
    ReactDOM.render(<CoachMainRecord title="基本資料" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleLastClick(){
    ReactDOM.render(<CoachRecord title="最近一次受傷紀錄" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleAllClick(){
    ReactDOM.render(<CoachHistoryRecord title="受傷歷史紀錄" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleRehabilitationClick(){
    ReactDOM.render(<CoachRehabilitationRecord title="復健規劃" tid={playerList[key]} />,document.getElementById('app'));
  }
  handleBlackClick(){
    ReactDOM.render(<CoachList auth={l_auth} />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}受傷紀錄</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={4} md={4}>
          <br />
          <Button bsStyle="info" onClick={this.handleMainClick} block><h4>基本資料</h4></Button><br />
          <Button bsStyle="info" onClick={this.handleLastClick} block><h4>最近一次受傷紀錄</h4></Button><br />
          <Button bsStyle="info" onClick={this.handleAllClick} block><h4>受傷歷史紀錄</h4></Button><br />
          <Button bsStyle="info" onClick={this.handleRehabilitationClick} block><h4>復健規劃</h4></Button><br /><br /><br />
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button><br />
        </Col>
      </Panel>
    );
  }
}

class CoachMainRecord extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<CoachHurtList tid={playerList[key]} />,document.getElementById('app'));
  }
  handleHomeClick(){
    ReactDOM.render(<CoachList auth={l_auth} />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}個人資料</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={2} md={6}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="性別:">{person[key].sex}</ListGroupItem>
            <ListGroupItem header="單位:">{person[key].unit}</ListGroupItem>
            <ListGroupItem header="電話:">{person[key].phone}</ListGroupItem>
            <ListGroupItem header="地址:">{person[key].address}</ListGroupItem>
            <ListGroupItem header="信箱:">{person[key].mail}</ListGroupItem>
            <ListGroupItem header="稱號:">{person[key].title}</ListGroupItem>
            <ListGroupItem header="BMI:">{person[key].BMI}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={6}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>&nbsp;
          <Button bsStyle="warning" onClick={this.handleHomeClick} block><h4>回球員名單</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class CoachRecord extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<CoachHurtList tid={playerList[key]} />,document.getElementById('app'));
  }
  handleHomeClick(){
    ReactDOM.render(<CoachList auth={l_auth} />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}最近一次受傷紀錄</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={2} md={6}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="最近一次受傷紀錄:">{person[key].description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={6}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>&nbsp;
          <Button bsStyle="warning" onClick={this.handleHomeClick} block><h4>回球員名單</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class CoachHistoryRecord extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<CoachHurtList tid={playerList[key]} />,document.getElementById('app'));
  }
  handleHomeClick(){
    ReactDOM.render(<CoachList auth={l_auth} />,document.getElementById('app'));
  }
  render(){
  	var len = person[key].history.length;
    return(
      <Panel header={<center><h1>{this.props.tid}受傷歷史記錄</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={2} md={6}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="受傷歷史記錄:">{person[key].history.slice(0,len).join(' ')}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={6}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>&nbsp;
          <Button bsStyle="warning" onClick={this.handleHomeClick} block><h4>回球員名單</h4></Button>
        </Col>
      </Panel>
    );
  }
}

class CoachRehabilitationRecord extends React.Component{
  constructor(props){
    super(props);
    this.handleBlackClick = this.handleBlackClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }
  handleBlackClick(){
    ReactDOM.render(<CoachHurtList tid={playerList[key]} />,document.getElementById('app'));
  }
  handleHomeClick(){
    ReactDOM.render(<CoachList auth={l_auth} />,document.getElementById('app'));
  }
  render(){
    return(
      <Panel header={<center><h1>{this.props.tid}個人資料</h1></center>} bsStyle="warning">
        <Col xs={6} xsOffset={2} md={6}>
          <ListGroup>
            <ListGroupItem header="姓名:">{person[key].name}</ListGroupItem>
            <ListGroupItem header="復健規劃:">{rehabilitation[key].description}</ListGroupItem>
            <ListGroupItem header="就診時間:">{rehabilitation[key].start_date}</ListGroupItem>
            <ListGroupItem header="回診時間:">{rehabilitation[key].end_date}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={6} xsOffset={4} md={6}>
          <Button bsStyle="warning" onClick={this.handleBlackClick} block><h4>回上一頁</h4></Button>&nbsp;
          <Button bsStyle="warning" onClick={this.handleHomeClick} block><h4>回球員名單</h4></Button>
        </Col>
      </Panel>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));