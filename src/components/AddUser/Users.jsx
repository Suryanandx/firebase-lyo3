import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import UserList from './UserList';
import {Link, useHistory} from 'react-router-dom';
import { db } from '../../firebase';
import {firebaseLooper} from '../../utils/tools'
const useStyles = makeStyles((theme) =>( {
    add: {
     
    background:'#141256',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),

    },
    backButton: {
        backgroundColor: "#A997DF",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
    }
}))
const Users = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([{}]);
    const [error, setError] = useState(null)
    const history = useHistory()
    useEffect(() => {
        db.collection('users').get().then(snapshot => {
            const userData = firebaseLooper(snapshot)
            setUsers(userData)
        }).then(() => {
            setIsLoading(false)
        })
    }, [])

    const handleReturn = () => {
      history.push('/')
  }
    return (
        <Container xs={12}>
             <Button className={classes.backButton}
            onClick={handleReturn}
            >Go back</Button>
        {error && <Typography variant="h6">{error}</Typography>}
        {isLoading && <Typography variant="h3">Loading...</Typography>}
           <Button 
            variant="contained"
            color="primary" className={classes.add}>
               <Link style={{color: "white" ,textDecoration: "none"}} to="/users/add-user">
                    Add user
               </Link>
               </Button>
               <UserList users={users}/>
          
        </Container>
    )
}

export default Users
