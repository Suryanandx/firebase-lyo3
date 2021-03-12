import React, { useEffect, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { db, storageRef } from '../../firebase';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomColor: "black",
    backgroundColor: theme.palette.background.dark,
   
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  dataBox:{
      borderRadius: "20px",
      boxShadow: "10px 20px 30px whitesmoke",
      marginBottom: "50px",
      alignItems: "center"
  },
  divButton: {
      justifyContent: "flex-end",

  }
}));

export default function StepItem({ data}) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [title, setTitle] = useState(data.title)
    const [desc, setDesc] = useState(data.desc)
    const [link, setLink] = useState({})
    const [createdAt, setCreatedAt] = useState(data.createdAt)
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const mediaRef = storageRef.child(`/media/steps/${data.title}/${data.link}`)
  
    const handleView = () => {
      setOpenView(true)
      mediaRef.getDownloadURL().then(url => {
        setLink(url)
      })
    }

    const handleViewClose = () => {
      setOpenView(false)
    }

    const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
      setOpenEdit(true)
    }
  const handleEditClose = () => {
      setOpenEdit(false)
    }

  const handleDelete = (id) => {
    db.collection('steps').doc(id).delete().then((data) => {
      window.location.reload()
    })
}

const updateStep=(id) => {
    setLoading(true)
    const data = {title,desc}
      db.collection('steps').doc(id).update(data).then(()=>{
        setLoading(false)
        window.location.reload()
      })
  }
    return (
        
        <div>
            <div className={classes.dataBox}>
            <Grid xs={12}>
                 <Typography align="center" variant="h4">{data.title}</Typography>
                 <Typography align="center" variant="body2">{data.desc}</Typography> 
                 <Grid
                className={classes.statsItem}
                item
                 >
                <AccessTimeIcon
                className={classes.statsIcon}
                color="action"
                />
                <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
                >
               
                </Typography>
          </Grid>   
            </Grid>
            <div className={classes.divButton}>
            <Button onClick={handleEdit}  color="primary">Edit</Button>
            <Button onClick={() =>
             {handleView();
              
            }} color="default">View</Button>
            <Button onClick={handleClickOpen} variant="contained" color="secondary">Delete</Button>
            </div>
              <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  <Alert severity="error" variant="filled">
                    <AlertTitle><strong>Delete</strong></AlertTitle>
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(data.id);
                         handleClose()}} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Edit ${title}`}</DialogTitle>
                    <DialogContent>
                   <Alert severity="info" variant="standard">
                      <AlertTitle>
                        You are currently editing a Step
                      </AlertTitle>
      
                   </Alert>
                    <form className={classes.form}  >
                        <TextField
                        disabled
                        defaultValue={title}                       
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                        defaultValue={desc}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          onChange={(e) => setDesc(e.target.value)}
                          id="desc"
                          multiline
                        />
                        <TextField
                        defaultValue={data.link}
                        label="Media Name"
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth                         
                          disabled
                        />
                        <TextField
                        defaultValue={createdAt}
                        fullWidth
                        variant="outlined"
                          id="date"
                          label="Created At"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setCreatedAt(e.target.value)}
                        />
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          className={classes.submit}
                          onClick={(e)=> updateStep(data.id)}
                        >
                          Update
                          </Button>}
                      {
                        loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          disabled
                          className={classes.submit}
                        >Updating values...</Button>
                      }   
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openView}
                    onClose={handleViewClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"View Data"}</DialogTitle>
                    <DialogContent>
                    
                    <form className={classes.form}  >
                        <TextField
                        defaultValue={title}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          disabled
                        />
                        <TextField
                        defaultValue={desc}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          disabled
                          id="desc"
                          multiline
                        />
                        <TextField
                        defaultValue={createdAt}
                        disabled
                        fullWidth
                          id="date"
                          label="Created At"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                         gutterBottom
                        />
                        
                        <img height="300" width="400" src={link} alt="no data"/>
                      
                    <DialogActions>
                      <Button color="secondary" onClick={handleViewClose}>Cancel</Button>
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
            </div>
            
        </div>
    )
}

