import React, { Component } from 'react'

import { CrudComponent } from 'react-fast-crud'
import { BrowserRouter, Link } from "react-router-dom"
export default class App extends Component {


  getActiveTypeFormConfig = () => {
    return [
      { name: 'name', label: 'Name', isRequired: true },
      { name: 'email', label: 'Email', isRequired: true },
      { name: 'age', label: 'Age', isRequired: true },
    ]
  }

  saveFormData = (formData) => {

  }
  render() {

    const columns = [{
      title: 'Name', dataIndex: 'name', key: 'name', width: 100,
    }, {
      title: 'Age', dataIndex: 'age', key: 'age', width: 100,
    }, {
      title: 'Address', dataIndex: 'address', key: 'address', width: 200,
    }, {
      title: 'Operations', dataIndex: '', key: 'operations', render: () => <a href="#">Delete</a>,
    }];

    const data = [
      { name: 'Jack', age: 28, address: 'some where', key: '1' },
      { name: 'Rose', age: 36, address: 'some where', key: '2' },
    ];
    return (
      <div>

        <BrowserRouter>
          <div>
            <Link to="/create">Create</Link>
            <Link to="/view">View</Link>
            <CrudComponent
              dataFields={this.getActiveTypeFormConfig()}
              displayType={'router'}
              onSubmit={this.saveFormData}
              tableColumns={columns}
              tableData={data}
              dispatch={() => { }}
              loadData={() => { }}
              text='Modern React component module' />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
