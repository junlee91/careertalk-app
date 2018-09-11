import React from "react";
import styles from "./styles.scss";

import { connect } from "react-redux";
import { push } from "react-router-redux";

import Select from "react-select";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goToDetail: employee_id => {
      dispatch(push(`/company/${employee_id}`));
    }
  };
};


class EmployeeList extends React.Component {
  state = {
    employee_list_state: undefined
  };

  _handleInputChange = event => {
    const { target: { value } } = event;
    const { company_dashboard: { employee_list } } = this.props;

    // filter!!
    const filtered = employee_list.filter(item =>
      item.full_name.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({
      employee_list_state: filtered
    });
  };

  _handleStatusChange = selectedStatus => {
    const { company_dashboard: { employee_list } } = this.props;
    const value = selectedStatus.value;
    let filtered = [];

    // filter!!
    if(value === "Active") {
      filtered = employee_list.filter(item => item.active === "Active");
    } else if(value === "Inactive") {
      filtered = employee_list.filter(item => item.active === "Inactive");
    } else {
      filtered = employee_list;
    }
    
    this.setState({
      employee_list_state: filtered
    });
  };

  componentDidMount() {
    const { company_dashboard: { employee_list } } = this.props;
    this.setState({
      employee_list_state: employee_list
    });
  }

  render() {
    return (
      <div className={styles.employeeList}>
        <div className={styles.searchBar}>
          <input
            type="search"
            name="filter"
            onChange={this._handleInputChange}
            className={styles.textInput}
          />
          <div className={styles.dropdown}>
            <Select
              // value={props.gender}
              onChange={this._handleStatusChange}
              placeholder={"Status"}
              menuContainerStyle={{ zIndex: -999 }}
              options={[
                { value: "All", label: "All" },
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
                { value: "Not Enrolled", label: "Not Enrolled" }
              ]}
            />
          </div>
        </div>
        <div className={styles.listContent}>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>NAME</h3>
                </th>
                <th>
                  <h3>STATUS</h3>
                </th>
                <th>
                  <h3>START DATE</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.employee_list_state &&
                this.state.employee_list_state.map((item, index) => (
                  <Employees {...item} key={index} goToDetail={this.props.goToDetail}/>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const Employees = props => {
  return (
    <tr>
      <td
        className={styles.name}
        onClick={() => props.goToDetail(props.employee_id)}
      >
        {props.full_name}
      </td>
      <td className={styles.status}>{props.active}</td>
      <td className={styles.date}>{props.participation_date}</td>
    </tr>
  );
};

export default connect(null, mapDispatchToProps)(EmployeeList);