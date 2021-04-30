import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import _PromotionsModify from "../../scss/components/PromotionsForm/_PromotionsModify.scss";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const grisPrincipal= "#EFEFEF";
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
    
      width: "90%",
      color: "red",
      marginTop: "15px",
      marginBottom: "15px"
      
    },
    cancelIcon: {
      color: "rgb(245, 59, 26)",
      backgroundColor: grisPrincipal,
      cursor: "pointer",
      borderRadius: "50%" 
    }
  }));

function PromotionsModify(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [input, setInput] = useState({
    description: '',
    categoryCheck: [],
    products: [],
    discountDate: '',
    combo: '',
    days: []
    
  });
    console.log(props.history.location.promotion, "MI PROMOCION")
  const {
    active,
    combo,
    days,
    description,
    discountDate,
    id,
    products,
    categoryCheck
  } = props.history.location.promotion;
   return (
    <div className="containerPromotionsModify">
      <h1>Renderizado !</h1>
      <p>Ver consola</p>
      <h1>Active:</h1>
      <p>{active.toString()}</p>
      <h1>Combo:</h1>
      <p>{combo}</p>
      <h1>Días:</h1>
      <p>{days}</p>
      <h1>Descripción:</h1>
      <p>{description}</p>
      <h1>Descuento:</h1>
      <p>{`${discountDate}%`}</p>
      <h1>Id:</h1>
      <p>{id}</p>
      <h1>Products Id's:</h1>
      <p>{products?.map(e => `${e.id}, `)}</p>
      <h1>Categories Id's:</h1>
      <p>{categoryCheck?.map(e => `${e}, `)}</p>
      <Button variant="contained" color="primary">
        <NavLink to="/user/info" style={{ textDecoration: 'none', color:"#eee" }}>Volver</NavLink>
      </Button>
    </div>
  ); 
  
}

export default PromotionsModify;
