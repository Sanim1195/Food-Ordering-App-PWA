import classes from './Card.module.css';

const Card = props => {
  const divId = props.id;
  
  return <div  id={divId} className={`${classes.card}`}>{props.children}</div>
};

export default Card;