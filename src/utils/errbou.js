import React from "react";
import { Tag } from "../components/comps";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.state.err = error.message;
    console.error(error, errorInfo);
    // console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.err_comp) return this.props.err_comp;
      else return <span className="red-text">{this.state.err}</span>;
    }
    return this.props.children;
  }
}
export const ErrTag = () => <Tag className={"bg-red-500"}>err</Tag>;
