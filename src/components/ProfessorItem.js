import React from 'react';

const ProfessorItem = ({ professor }) => {
  return (
    <div>
      <h3>{professor.firstName}</h3>
      {professor.profilePhotoPath && (
        <img src={professor.profilePhotoPath} alt={professor.firstName} style={{ width: '200px', height: '200px' }} />
      )}
    </div>
  );
};

export default ProfessorItem;
