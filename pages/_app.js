import '../styles/index.css';
import {AppWrapper} from "../contexts/state";
import App from "next/app";

export default class Application extends App {
  render() {
    let {Component, pageProps} = this.props;

    return (
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    )
  }
}