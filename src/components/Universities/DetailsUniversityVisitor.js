import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Iconify from '../iconify';
import { Card, CardContent, Container, CardActions, Button, Typography, Input, List, Grid, Stack, Breadcrumbs, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { MoreVert as MoreVertIcon, Edit as EditIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Logo2 from '../logo/Logo2';


function DetailsUniversityVisitor() {
  const [universities, setUniversities] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false); 
  const [dialogOpenDelete, setDialogOpenDelete] = useState(false);
  const [universityToDelete, setUniversityToDelete] = useState(null); 
  const [editUniversity, setEditUniversity] = useState(null); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const response = await fetch('http://localhost:44364/api/Universities'); 
      const data = await response.json();
      setUniversities(data);
    } catch (error) {
      console.error('Gabim gjatë kërkesës:', error);
    }
  };

  const mixedColor = "#f8f8f8"; 
  const handleDeleteClick = (university) => {
    setUniversityToDelete(university);
    setDialogOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`https://localhost:44364/api/University/DeleteUniversity/${universityToDelete.universityId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUniversities((prevUniversities) =>
          prevUniversities.filter((university) => university.universityId !== universityToDelete.universityId)
        );
      }
    } catch (error) {
      console.error('Gabim gjatë fshirjes:', error);
    } finally {
      setDialogOpenDelete(false); 
    }
  };

  const handleCancelDelete = () => {
    setDialogOpenDelete(false);
    setUniversityToDelete(null);
  };

  const handleEditClick = (university) => {
    setEditUniversity({ ...university }); 
    setDialogOpen(true);
  };

  const handleConfirmEdit = async () => {
    try {
      const response = await fetch(`https://localhost:44364/api/University/UpdateUniversity/${editUniversity.universityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editUniversity),
      });
      if (response.ok) {
        setUniversities((prevUniversities) =>
          prevUniversities.map((university) =>
            university.universityId === editUniversity.universityId ? editUniversity : university
          )
        );
      }
    } catch (error) {
      console.error('Gabim gjatë ndryshimit:', error);
    } finally {
      setDialogOpen(false); 
    }
  };

  const handleMenuOpen = (event, university) => {
    setAnchorEl(event.currentTarget);
    setSelectedUniversity(university);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleEdit = () => {
    handleMenuClose();
    handleEditClick(selectedUniversity);
  };
  
  const handleDelete = () => {
    handleMenuClose();
    handleDeleteClick(selectedUniversity);
  };


  return (
    <div>



            <section class="top-nav">
                    <div>
                    <Logo2 
                        sx={{position: 'relative'}}
                    />
                    {/* <a href='http://localhost:3000/home'>
                            <img
                            height={'50px'}
                            src={`https://www.ratemyprofessors.com/static/media/small_rmp_logo_white.4d5ff7fa.svg`}
                            />
                    </a> */}
                    </div>
                    <input id="menu-toggle" type="checkbox" />
                    <label class='menu-button-container' for="menu-toggle">
                    <div class='menu-button'></div>
                </label>
                    <ul class="menu">

                    <li>
                    <div className="sear">
                    <Button /*onClick={handleSearch}*/><SearchIcon className="searIcon"  /></Button>
                    <Input
                        disableUnderline 
                        className="searInput"
                        type="text"
                        placeholder="Search Professor..."

                    />
                    </div>
                    </li>
                    <li>
                    <List>
                        <Link
                                to="http://localhost:3000/universityList"
                                className="button-47 "
                                role="button"
                                id="m"
                            >
                                Go to Universities
                            </Link>
                    </List>
                    </li>

                    </ul>
        </section>





        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
            Universities
          </Typography>

        </Stack>

      <Grid container spacing={3}>
        {universities.map((university) => (
          <Grid key={university.id} item xs={12} sm={6} md={4} >
            <Card elevation={3}>
            <Link to={`http://localhost:3000/detailsUniVisitor/${university.id}`}
            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {university.name}
                </Typography>
                <br />
                <Typography variant="body1" color="text.secondary" >
                    <strong>Viti i themelimit:</strong> {university.establishedYear}
                </Typography>
                <Typography variant="body1" color="text.secondary" >
                <strong>Staff Number:</strong> {university.staffNumber}
                </Typography>
              </CardContent>
              </Link>

                      <CardActions style={{ borderTop: '1px solid #f0f0f0', background: mixedColor }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Link to={`http://localhost:3000/departmentByUniversityVisitor/${university.id}`}>
                            <Button className='btn-mui-black' variant="outlined" color="primary"  >
                              View Departments
                            </Button>
                          </Link>
                          <div style={{ flexGrow: 1 }} /> 
                          {/* <IconButton
                            onClick={(event) => handleMenuOpen(event, university)}
                            aria-label="more"
                            aria-controls="action-menu"
                            aria-haspopup="true"
                          >
                            <MoreVertIcon />
                          </IconButton> */}
                          </div>
                      </CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={dialogOpenDelete} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {universityToDelete?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Edit University</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} marginTop={2}>
              <TextField
                label="University Name"
                fullWidth
                value={editUniversity?.name || ''}
                onChange={(e) => setEditUniversity({ ...editUniversity, name: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Viti themeelimit"
                fullWidth
                value={editUniversity?.establishedYear || ''}
                onChange={(e) => setEditUniversity({ ...editUniversity, establishedYear: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Staff Number"
                fullWidth
                value={editUniversity?.staffNumber || ''}
                onChange={(e) => setEditUniversity({ ...editUniversity, staffNumber: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEdit} color="warning" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
        >
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" sx={{ marginRight: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" sx={{ marginRight: 1 }} />
          Delete
        </MenuItem>
      </Menu>
        </Container>

    </div>
  );
}

export default DetailsUniversityVisitor;