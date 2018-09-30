import PropTypes from 'prop-types'
import 'rc-table/assets/index.css';


import React, { Component } from 'react';

export  class Table extends Component {

  static propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
}
static defaultProps = {
  data: [],
  columns: [],
}


    renderData() {
   
        return (this.props.data||[]).map((dataa ,i)=> {
            return (<tr key={i}>
                     {this.props.columns.map( (column,i)=> <td key={i}  style={column.style}>{column.formatter ? column.formatter(dataa[column.key],dataa,column.key):dataa[column.key]}</td>)}
                </tr> )
        })
    }
    render() {
        return (
            <div className="margin-t-20 table-responsive">
                <table className={`crud-table  table-responsive ${this.props.tableClassName}`}>
                    <thead>
                        <tr>{
                            this.props.columns.map( (column ,i)=>column.name==="N/A" ? null : <th key={column.name+i} style={column.style} > {column.name} </th>)
                            }                          
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

