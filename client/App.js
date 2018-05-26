import React, {Component} from 'react';
import io from 'socket.io-client';
import styles from './App.css';
import MessageList from './MessageList';
import UserList from './UserList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component{
  constructor(props){
    super(props);
    this.state = {users: [], messages: [], text: '', name: ''};
  }

  componentDidMount(){
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({users}) => this.chatUpdate(users));
  }

  messageReceive(message){
    const messages = [message, ...this.state.messages];
    this.setState({messages});
  }

  chatUpdate(users){
    this.setState({users});
  }

  handleUserSubmit(name){
    this.setState({name});
    socket.emit('join', name);
  }

  render(){
    return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
  }

  renderLayout(){
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
        <UsersList users={this.state.users}/>
      </div>
      <div className={styles.MessageWrapper}>
        <MessageList message={this.state.messages}/>
      </div>
      <MessageForm
        onMessageSubmit={message = > this.handleMessageSubmit(message)}
        name={this.state.name}
      />
    </div>
  }

  renderUserForm(){
    return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)}/>)
  }
}

export default App;
