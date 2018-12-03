import React, { Component } from 'react';
import SockJsClient from 'react-stomp';
import { TalkBox } from "react-talk";
import './App.css';


const id = {
    "name" : "jeff"
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clientConnected: false,
            value: '',
            messages: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }


    onMessageReceive = (msg, topic) => {
        console.log("this is the message", msg)

        // this.setState({ messages: msg });
    }

    sendMessage = (msg) => {
        try {
            this.clientRef.sendMessage("/app/hello", JSON.stringify(msg));
            return true;
        } catch(e) {
            return false;
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.value);
        // event.preventDefault();
        this.sendMessage(this.state.value)
    }

  render() {
    const wsSourceUrl = window.location.protocol + "//" + "localhost:8080" + "/gs-guide-websocket";

    return (
      <div>
          {/*<TalkBox topic="react-websocket-template" currentUserId={ this.randomUserId }*/}
                   {/*currentUser={ this.randomUserName } messages={ this.state.messages }*/}
                   {/*onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>*/}

          <form onSubmit={this.handleSubmit}>
              <label>
                  Name:
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
          </form>

          <div>{this.state.messages}</div>

          <SockJsClient url={ wsSourceUrl } topics={["/topic/greetings"]}
                        onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                        onConnect={ () => { this.setState({ clientConnected: true }) } }
                        onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                        debug={ false }/>
      </div>
    );
  }
}

export default App;
