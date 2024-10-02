import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const PeopleCard = ({PeopleCard}) => {
  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate("/PeoplePage/"+ id);

  }
    return <>
    <Card style={{ width: '18rem' }} onClick={() => {navigateTo(PeopleCard.id)}}>
      <Card.Img variant="top" src= {"https://image.tmdb.org/t/p/original"+PeopleCard.profile_path} />
      <Card.Body>
        <Card.Title>{PeopleCard.name}</Card.Title>
        <Button variant="primary">Voir detail</Button>
      </Card.Body>
    </Card>
    </>;
}
 
export default PeopleCard;