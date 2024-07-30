import React, { useState } from 'react';

const ModalSignupForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (event) => {
    if (event.target === event.currentTarget || event.target.className === 'close') {
      setIsModalOpen(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Клуб нэмэх</h2>
      <button onClick={handleOpenModal} style={{ width: 'auto' }}>Sign Up</button>

      {isModalOpen && (
        <div id="id01" className="modal" onClick={handleCloseModal}>
          <span className="close" title="Close Modal">×</span>
          <form className="modal-content animate" action="/action_page.php">
            <div className="container">
              <label><b>Клубын нэр</b></label>
              <input type="text" placeholder="Клубын нэрээ оруулна уу" name="name" required />

              <label><b>Клубын тайлбар</b></label>
              <input type="text" placeholder="тайлбараа оруулна уу" name="Descr" required />

              <label><b>Холбогдох утасны дугаар</b></label>
              <input type="text" placeholder="Утасны дугаараа оруулна уу" name="contact" required />

              <label><b>Клубын зургаа байршуулна уу</b></label>
              <input id="imageUpload" type="file" accept="image/*" onChange={handleImageChange} />
              {image && (
                <div>
                  <img src={image} alt="Uploaded preview" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
              )}

              <div className="clearfix">
                <button type="button" onClick={handleCloseModal} className="cancelbtn">Cancel</button>
                <button type="submit" className="signupbtn">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModalSignupForm;
