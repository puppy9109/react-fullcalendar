import React from 'react';
import ReactDOM from 'react-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var data = [];
let order = 'desc';
const cellEditProp = {
  mode: 'click',
  blurToSave: true
};
const selectRow = {
    mode: 'radio' //radio or checkbox
};

class App extends React.Component {
	constructor(props){	
		super(props);

		this.handleBtnClick = this.handleBtnClick.bind(this);
		//this.handleGet = this.handleGet.bind(this);
	}
	handleBtnClick() {
	    if (order === 'desc') {
	      this.refs.table.handleSort('asc', 'id');
	      order = 'asc';
	    } else {
	      this.refs.table.handleSort('desc', 'id');
	      order = 'desc';
	    }
  	}
  render() {
    return (
      <div>
      <center><h1>Clerk Schedule System</h1></center>
      <button onClick={ this.handleBtnClick }>Sort</button>
      <BootstrapTable ref="table" data={ data } cellEdit={ cellEditProp } insertRow={true} selectRow={selectRow} deleteRow={true}>
          <TableHeaderColumn ref="table_id" dataField='id' isKey={true} dataSort={true}>Employee ID</TableHeaderColumn>
          <TableHeaderColumn ref="table_name" dataField='name' dataSort={true}>Employee Name</TableHeaderColumn>
          <TableHeaderColumn ref="table_date" dataField='date' dataSort={true}>Schedule Date</TableHeaderColumn>
          <TableHeaderColumn ref="table_schedule" dataField='schedule' dataSort={true}>Employee Schedule</TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));