// import React, { useState } from 'react';
// import './CreateBoardModal.css';

// const CreateBoardModal = ({
//   show,
//   onClose,
//   onSave,
//   newBoardName,
//   setNewBoardName,
//   setNewBoardBackground,
//   selection,
//   setSelection,
//   handleImageSelect
// }) => {
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   if (!show) return null;

//   const exampleImages = [
//     'https://images.unsplash.com/photo-1485846234645-a62644f84728',
//     'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
//     'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
//     'https://images.unsplash.com/photo-1722233987129-61dc344db8b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     'https://images.unsplash.com/photo-1517511620798-cec17d428bc0',
//     'https://images.unsplash.com/photo-1722237959226-8e1a21eb254f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   ];

//   const exampleColors = [
//     '#5C9BD4',
//     '#8770C7',
//     '#E882C5',
//     '#5C7ED4',
//     '#8CC770',
//     '#E0E32A'
//   ];

//   const handleColorSelect = (color) => {
//     setSelectedColor(color);
//     setNewBoardBackground(color);
//   };

//   const handleLocalImageSelect = (image) => {
//     setSelectedImage(image);
//     setNewBoardBackground(image);
//     if (handleImageSelect) {
//       handleImageSelect(image);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <h2>Create Board</h2>
//         <input
//           type="text"
//           value={newBoardName}
//           onChange={(e) => setNewBoardName(e.target.value)}
//           placeholder="Board Name"
//         />
//         <div className="selection">
//           <label className={selection === 'color' ? 'selected' : ''}>
//             <input
//               type="radio"
//               value="color"
//               checked={selection === 'color'}
//               onChange={() => setSelection('color')}
//               style={{ display: 'none' }}
//             />
//             Background Color
//           </label>
//           <label className={selection === 'image' ? 'selected' : ''}>
//             <input
//               type="radio"
//               value="image"
//               checked={selection === 'image'}
//               onChange={() => setSelection('image')}
//               style={{ display: 'none' }}
//             />
//             Background Image
//           </label>
//         </div>
//         {selection === 'color' && (
//           <div className="color-selection">
//             {exampleColors.map((color, index) => (
//               <div
//                 key={index}
//                 className={`color-option ${selectedColor === color ? 'selected' : ''}`}
//                 style={{ backgroundColor: color }}
//                 onClick={() => handleColorSelect(color)}
//               />
//             ))}
//           </div>
//         )}
//         {selection === 'image' && (
//           <div className="image-selection">
//             <p>Photo by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a></p>
//             {exampleImages.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt="Example"
//                 className={`example-image ${selectedImage === image ? 'selected' : ''}`}
//                 onClick={() => handleLocalImageSelect(image)}
//               />
//             ))}
//           </div>
//         )}
//         <div className="modal-actions">
//           <button className="cancel-button" onClick={onClose}>Cancel</button>
//           <button onClick={onSave} disabled={!newBoardName.trim()}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateBoardModal;

import React, { useState } from 'react';
import './CreateBoardModal.css';

const CreateBoardModal = ({
  show,
  onClose,
  onSave,
  newBoardName,
  setNewBoardName,
  setNewBoardBackground,
  selection,
  setSelection,
  handleImageSelect
}) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!show) return null;

  const exampleImages = [
    'https://images.unsplash.com/photo-1485846234645-a62644f84728',
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    'https://images.unsplash.com/photo-1722233987129-61dc344db8b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1517511620798-cec17d428bc0',
    'https://images.unsplash.com/photo-1722237959226-8e1a21eb254f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const exampleColors = [
    '#5C9BD4',
    '#8770C7',
    '#E882C5',
    '#5C7ED4',
    '#8CC770',
    '#E0E32A'
  ];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setNewBoardBackground(color);
  };

  const handleLocalImageSelect = (image) => {
    setSelectedImage(image);
    handleImageSelect(image);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Board</h2>
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Board Name"
        />
        <div className="selection">
          <label className={selection === 'color' ? 'selected' : ''}>
            <input
              type="radio"
              value="color"
              checked={selection === 'color'}
              onChange={() => setSelection('color')}
              style={{ display: 'none' }}
            />
            Background Color
          </label>
          <label className={selection === 'image' ? 'selected' : ''}>
            <input
              type="radio"
              value="image"
              checked={selection === 'image'}
              onChange={() => setSelection('image')}
              style={{ display: 'none' }}
            />
            Background Image
          </label>
        </div>
        {selection === 'color' && (
          <div className="color-selection">
            {exampleColors.map((color, index) => (
              <div
                key={index}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        )}
        {selection === 'image' && (
          <div className="image-selection">
            <p>Photo by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a></p>
            {exampleImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Example"
                className={`example-image ${selectedImage === image ? 'selected' : ''}`}
                onClick={() => handleLocalImageSelect(image)}
              />
            ))}
          </div>
        )}
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button onClick={onSave} disabled={!newBoardName.trim()}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBoardModal;

