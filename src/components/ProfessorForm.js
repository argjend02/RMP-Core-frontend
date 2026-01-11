import React from 'react';
import '../components/ProfessorForm.css'
import { Navigate } from 'react-router-dom';



export const Card = () => {
  const cardData = [
    {
      name: 'Jane Smith',
      image: 'https://cdn.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.webp',
    },
    {
      name: 'John Doe',
      image: 'https://cdn.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.webp',
    },
    {
      name: 'Sarah Johnson',
      image: 'https://cdn.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.webp',
    },
    {
      name: 'Michael Anderson',
      image: 'https://cdn.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.webp',
    },
    {
      name: 'Emily Wilson',
      image: 'https://cdn.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.webp',
    },
    {
      name: 'David Thompson',
      image: 'https://cdn.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.webp',
    },
  ];

  return (

    <div>
      {cardData.map((card, index) => (
        <div className="container" key={index}>
          <div className="box">
            <img src={card.image} alt="Image" className="image" />
            <div className="content">
              <h3>{card.name}</h3>
              <p className="text">
                Professor {card.name} is an exceptional educator who possesses a wealth of knowledge and a true passion for teaching. With years of experience in their field, they bring a depth of understanding and expertise that greatly benefits their students. They are known for their engaging teaching style, utilizing various interactive methods to ensure students grasp complex concepts with ease. Their commitment to student success goes beyond the classroom, as they are always available to provide guidance and support.
              </p>
              <div className="rate">
                <p className="nn">
                  Rate Me Anonymously:
                  <input type="radio" id={`star5-${index}`} name={`rate-${index}`} value="5" />
                  <label htmlFor={`star5-${index}`} title="text"></label>
                  <input type="radio" id={`star4-${index}`} name={`rate-${index}`} value="4" />
                  <label htmlFor={`star4-${index}`} title="text"></label>
                  <input type="radio" id={`star3-${index}`} name={`rate-${index}`} value="3" />
                  <label htmlFor={`star3-${index}`} title="text"></label>
                  <input type="radio" id={`star2-${index}`} name={`rate-${index}`} value="2" />
                  <label htmlFor={`star2-${index}`} title="text"></label>
                  <input type="radio" id={`star1-${index}`} name={`rate-${index}`} value="1" />
                  <label htmlFor={`star1-${index}`} title="text"></label>
                </p>
              </div>
              <div className="input-container">
                <input type="text" className="feedback-input" placeholder="Enter your feedback" />
                <button type="button" className="submit-button">Submit</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
      
  );
};

export default Card;

 