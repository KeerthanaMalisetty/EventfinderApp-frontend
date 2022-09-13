import { useNavigate } from 'react-router-dom';
import './MusiceventCard.css'
export function MusiceventCard({ name, img, place, city, type, id }) {

  const navigate = useNavigate();

  const click = () => {

    const token = localStorage.getItem('token');

    if (token) {
      console.log('true')
      navigate(`/eventdetails/${id}`)
    } else {
      navigate("/login")
    }
  }


  return (
    <div className='Musiceventcard'>
      <img src={img} className="event-poster" />
      {/* <div className='poster'> </div> */}
      <h1 className='event-name'>{name}</h1>
      <h2 className='date'>{type}</h2>
      <h2 className='Place'>{place} {city}</h2>
      <div className='Overlay'>
        <button className='overlay-btn' onClick={click}>Book Now</button>
      </div>
    </div>

  );

}
