import React, {Component} from 'react';
import styles from './styles/UserForm.css';

class UserForm extends Component{
  constructor(props){
    console.log(props);
    super(props);
    this.state = {name: ''};
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onUserSubmit(this.state.name);
  }

  handleChange(e){
    this.setState({name: e.target.value});
  }

  render(){
    return(
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>ChatApper</h1> <i className="fas fa-comments"></i>
        </div>
        <form className={styles.UserForm} onSubmit={e => this.handleSubmit(e)}>
          <input
            className={styles.UserInput}
            placeholder="Write your nickname and press enter"
            onChange={e => this.handleChange(e)}
            value={this.state.name}
          />
        </form>
      </div>
    );
  }
}

export default UserForm;
