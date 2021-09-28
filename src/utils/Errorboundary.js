import React, { Component } from 'react';

export default class Errorboundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  //För att logga ut error meddelande
  componentDidCatch(error, info) {
    console.log('error: ', error);
    console.log('info: ', info);
  }

  render() {
    return this.state.hasError ? (
      <div>
        <p>Something went wrong!</p>
      </div>
    ) : (
      this.props.children
    );
  }
}
