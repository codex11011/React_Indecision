import React, { Component } from "react";
import AddOption from "./AddOption.js";
import Header from "./Header.js";
import Options from "./Options";
import Action from "./Action.js";
import OptionModal from "./OptionModal.js";

class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {}
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }
  componentWillUnmount() {
    console.log("component will unmount");
  }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = option => {
    this.setState(prevState => ({
      options: prevState.options.filter(opt => {
        return option !== opt;
      })
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  };

  handleAddOption = option => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exist";
    }

    this.setState(prevOption => ({
      options: prevOption.options.concat(option)
    }));
  };

  handleClearSelectedOption = option => {
    this.setState(() => ({
      selectedOption: undefined
    }));
  };

  render() {
    const subtitle = "Play with your luck";

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              handleDeleteOptions={this.handleDeleteOptions}
              options={this.state.options}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
            <OptionModal
              selectedOption={this.state.selectedOption}
              handleClearSelectedOption={this.handleClearSelectedOption}
            />
          </div>
        </div>
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
};

export default IndecisionApp;
