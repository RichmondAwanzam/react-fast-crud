/**
 * @class ExampleComponent
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MyForm } from './form'
import {Switch,Route} from 'react-router-dom'
import './styles.css'

import { Table } from './table';


let DISPLAY_TAB = "tab"
let DISPLAY_HIDE_AND_SLIDE = "push-down"
let USE_ROUTER = "router"

const styles = {
  list: {
    display: 'inline-flex',

  },
  listItem: {
    listStyleType: 'none',
    padding: '10px 20px',
    cursor: "pointer"
  }
}

export class CrudComponent extends React.Component {

  static propTypes = {
    table: PropTypes.element,
    form: PropTypes.element,
    onSubmit:PropTypes.func,
    tableData:PropTypes.array,
    tableColumns:PropTypes.array
  }
  static defaultProps = {
    createTitle: "Create",
    readTitle: "View All",
    displayType: "tab",
    createPath:"/create",
    viewPath:"/view",
    tableColumns:[],
    tableData:[]
  }
  constructor(props, context) {
    super(props, context)

    this.state = {

      isShowingFormSlide: false,
      showView: 'create'
    }
  }

  switchTabView = (viewType) => {
    const { dispatch } = this.props;
    dispatch(this.props.loadData())
    if (viewType === "create") {
    }
    this.setState({ showView: viewType })
  }

  addSlideForm = () => {
    this.setState({ isShowingFormSlide: !this.state.isShowingFormSlide })
  }

  render() {

    const formProps ={
      dataFields:this.props.dataFields,
      onSubmit:this.props.onSubmit
    }

    //types tab |route | push down 

    return (<div className="row">
      <div className="col-md-12" >

        {this.props.displayType === DISPLAY_TAB &&
          <div className="col-xs-12 col-md-5 pageTabs kill-bt-15-padding" >
            <ul className="flex" style={styles.list}>
              <li style={styles.listItem} className={`page-header-style word-wrap ${this.state.showView === 'create' ? 'onPage' : ''} `}><a title={this.props.createTitle} onClick={this.switchTabView.bind(this, "create")}>{this.props.createTitle || "Create"}</a></li>
              <li style={styles.listItem} className={`page-header-style word-wrap ${this.state.showView === 'read' ? 'onPage' : ''} `}><a title={this.props.readTitle} onClick={this.switchTabView.bind(this, "read")}>{this.props.readTitle || "View all"}</a></li>
            </ul>
            <div className="clearfix"></div>
          </div>
        }
        <div className="col-md-12" style={{ padding: '20px 0' }}>
          {this.props.displayType === DISPLAY_TAB &&
            <div>
              <div style={{ padding: '0 20px 20px', fontSize: 16 }}>Add New {this.props.label}</div>
              {this.props.form ? form : <MyForm {...formProps} />}
            </div>
          }
          {this.props.displayType === DISPLAY_HIDE_AND_SLIDE &&
            <div>
              <a onClick={this.addSlideForm}>+ Add New {this.props.label}</a>
              <div style={{ transition: 'height 0 linear 2s' ,overflow:'hidden', ... (this.state.isShowingFormSlide ? { height: 'auto' } : { height: 0 }) }}>{this.props.form ? form : <MyForm dataFields={this.props.dataFields} />}</div>
            </div>
          }
          {this.props.displayType=== USE_ROUTER &&
          <Switch>
            <Route path={this.props.createPath} render={()=>{
                return (<div>
                  <div style={{ padding: '0 20px 20px', fontSize: 16 }}>Add New {this.props.label}</div>
                  {this.props.form ? form : <MyForm {...formProps} />}
                </div>)
            }}/>
            <Route path={this.props.viewPath} render={()=>{
               return (<div><Table data={this.props.tableData} columns={this.props.tableColumns}/></div>)
            }}/>
            </Switch>
          }
          <div style={{ padding: '10px 20px' }}>

          </div>

        </div>
      </div>

    </div>

    )
  }

}
