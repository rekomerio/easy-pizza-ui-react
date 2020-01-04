import React, { useEffect, useState } from "react";
import axios from "axios";
import makeStyles from "@material-ui/core/styles/makeStyles";
import API_URL_BASE from "../helpers/api-url";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const UserManagement = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const token = window.localStorage.getItem("token");
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(API_URL_BASE + "users")
      .then(res => {
        console.log(res);
        setUsers(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const deleteUser = id => () => {
    if (window.confirm("Delete user " + id + "?"))
      axios.delete(API_URL_BASE + "users/" + id).then(res => {
        const newUsers = users.filter(user => user.id !== id);
        setUsers(newUsers);
      });
  };

  if (loading) return <div>Loading</div>;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">First name</TableCell>
            <TableCell align="left">Last name</TableCell>
            <TableCell align="left">Registered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id} onClick={deleteUser(user.id)}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{user.firstName}</TableCell>
              <TableCell align="left">{user.lastName}</TableCell>
              <TableCell align="left">{user.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default UserManagement;
