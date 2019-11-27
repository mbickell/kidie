import React, { Component } from "react";
import styles from "./Header.module.scss";

class Header extends Component {
  state = {};
  render() {
    return (
      <>
        <h1 className={styles.title}>
          Keen Interpretive Dance Institute Enthusiast Calendar
        </h1>
        <input
          className={styles.searchText}
          type="text"
          onChange={this.props.setSearchText}
          placeholder="Search events..."
          value={this.props.searchText}
        />
      </>
    );
  }
}

export default Header;
