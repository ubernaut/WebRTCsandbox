import React from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config.js';



function App() {
  const register = "http://"+config.host+":"+config.port+config.path;
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter User data and hit "submit"
        </p>
        <form action={register} method="post" name="register-form">
          <table>
            <tr>
              <th>username: </th>
              <td><input name="username" type="text"/></td>
            </tr>
          </table>
          <input type="submit"/>
        </form>
      </header>
    </div>
  );
}

export default App;
