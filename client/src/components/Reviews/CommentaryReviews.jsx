import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import "../../scss/components/Reviews/_CommentaryReviews.scss";
import { deleteCommentary } from '../../redux/reviewsReducer/actionsReviews';
import { useDispatch } from 'react-redux';
import swal from "sweetalert";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
//PRUEBA <DELETE>
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';

const verdePrincipal="#378A19";
const verdeClaro="#85DA6C";
const grisPrincipal= "#EFEFEF";
const grisClaro= "#F7F7F7";

const useStyles = makeStyles((theme) =>({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    delete: {
      position: "absolute",
      top: "8%",
      right: "10%",
      cursor: "pointer",
      color: "gray"
    },
    settings: {
      position: "absolute",
      top: "8%",
      right: "15%",
      cursor: "pointer",
      color: "gray"
    },
    green: {
      color: grisPrincipal,
      backgroundColor: verdePrincipal,
      position: "absolute",
      top: "5%",
      right: "2%"
    }
}));

function CommentaryReviews({ id, content, score, userId, 
  firstName, lastName, fullName, photoURL, productId }) {

    const dispatch = useDispatch();
    const classes = useStyles();

    function deleteRev(e, id){
      e.preventDefault(e);
      swal({
        title: "Está seguro de borrar el comentario seleccionado?",
        text: "Una vez borrado, desaparecerá de su base de datos!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {  
        if (willDelete) {  
          dispatch(deleteCommentary(id))
          
          swal("Su comentario fue borrado con éxito!", 
          {icon: "success"})
          .then(e => window.location.reload())
          
        } else {    
          swal("El comentario NO fue borrado");  
        }});
    }

    let firstLast = (firstName[0] && lastName[0])? 
    (firstName[0] + lastName[0]) : ""

  return (
    <div className="CommentaryReviews">
    <i>{fullName}</i>
    {photoURL && 
    <div className={classes.root}>
      <Avatar alt={fullName} src={photoURL}>
        {firstLast? firstLast : "A"}
      </Avatar>
    </div>}
    {!photoURL && 
    <Avatar className={classes.green}>
      {firstLast || "A"}
    </Avatar>}
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={score} readOnly />
      </Box>
      {content}
      <DeleteIcon className={classes.delete} 
      onClick ={(e) => deleteRev(e, id)}/>
      <SettingsIcon className={classes.settings}/>
    </div>
  );
}

export default CommentaryReviews;
