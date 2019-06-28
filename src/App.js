import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import './App.scss';

const BASE_URL = "https://lamppoststudios.api-us1.com/api/3/contacts";
const API_KEY = `${process.env.REACT_APP_CONTACTS_API_KEY}`;
const CORS = `${'https://cors-anywhere.herokuapp.com/'}`;


class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: null,
      isLoaded: false
    }
  }
  componentDidMount() {
    this.setState({ isLoading: true })
    axios.get(CORS + BASE_URL, {
      headers: { 'Api-Token': API_KEY }
    })
      .then(response => {
        if (response.status === 200 && response != null) {
          this.setState({
            data: response.data.contacts
          });
        } else {
          console.log('problem');
        }
      })
      .catch(error => {
        console.log(error);
      });

  }
  render() {
    const { data } = this.state;
    return (
      <div className="wrapper">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" className="name">Full Name</TableCell>
              <TableCell align="left" className="email">Email</TableCell>
              <TableCell align="center" className="phone">Phone</TableCell>
              <TableCell align="center" className="org">Organization</TableCell>
              <TableCell align="center" className="dateCreated">Date Ceated</TableCell>
              <TableCell align="center" className="sendEmail"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell align="left" className="name">{item.firstName} {item.lastName}</TableCell>
                <TableCell align="left" className="email">{item.email}</TableCell>
                <TableCell align="center" className="phone">{item.phone}</TableCell>
                <TableCell align="center" className="org">{item.orgname}</TableCell>
                <TableCell align="center" className="dateCreated">{item.cdate}</TableCell>
                <TableCell align="center" className="sendEmail">
                  <Button variant="outlined" className="button"> Email</Button>
                </TableCell>
              </TableRow >
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}
export default ContactList;