import React, {Component} from 'react';
import io from 'socket.io-client';
import styles from './styles/App.css';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import UserList from './UserList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component{
  constructor(props){
    console.log(props);
    super(props);
    this.state = {users: [], messages: [], text: '', name: ''};
  }

  componentDidMount(){
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({users}) => this.chatUpdate(users));
  }

  messageReceive(message){
    console.log(message);
    const messages = [message, ...this.state.messages];
    this.setState({messages});
  }

  chatUpdate(users){
    console.log(users);
    this.setState({users});
  }

  handleUserSubmit(name){
    this.setState({name});
    socket.emit('join', name);
  }

  handleMessageSubmit(message){
    const messages = [message, ...this.state.messages];
    this.setState({messages});
    socket.emit('message', message);
  }

  render(){
    return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
  }

  renderLayout(){
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <div className={styles.AppTitle}>
            Chat-app
          </div>
          <div className={styles.AppRoom}>
            App room
          </div>
        </div>
        <div className={styles.AppBody}>
          <UserList users={this.state.users}/>
          <div className={styles.MessageWrapper}>
            <MessageList message={this.state.messages}/>
            <MessageForm
              onMessageSubmit={message => this.handleMessageSubmit(message)}
              name={this.state.name}
            />
          </div>
        </div>
      </div>
    );
  }

  renderUserForm(){
    return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)}/>)
  }
}

export default App;
