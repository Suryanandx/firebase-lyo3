import { Button, Container, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../components/context/AuthContext'
import LineDemo from '../../components/LineDemo'
import Alert from '@material-ui/lab/Alert'
import { AlertTitle } from '@material-ui/lab'
const MiddlePage = () => {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }


    return (
      <>  
      
         
        <Container >
          <div>
             <Grid style={{marginTop: '30px'}} sm={4}>
                <Alert severity="info" variant="standard">
                  <AlertTitle>
                     Welcome Back ! <strong>{currentUser.email}</strong>
                  </AlertTitle>
                   
              </Alert>
             </Grid>
              <Grid > <br/>  </Grid>
          
             <Button style={{backgroundColor: "blue",width:"100px", marginRight: "30px"}} color="primary" variant="contained" href="/machine-data"> Machines</Button>
            <Button style={{backgroundColor: "blue",width:"100px",marginRight: "30px"}} color="primary" variant="contained" href="/account"> Account</Button>
            <Button style={{backgroundColor: "blue",width:"100px",marginRight: "30px"}} color="primary" variant="contained" href="/users"> Users</Button>
            {error && <Alert severity="error">{error}</Alert>}
            <Button onClick={handleLogout} variant="contained" style={{width:"100px", color: "white" , backgroundColor: "#fa1e0e"}}>Logout</Button>
            <br/>
            </div>
            <LineDemo/>
        </Container>
        </>
    )
}

export default MiddlePage
