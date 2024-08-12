import React, { useState, useEffect } from 'react';
import { Modal, Button } from "antd";
import { useClub } from '../context/ClubsProvider';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import { discord, fb, gerlee, insta, sagsanbum, sport, twitter, volley } from '../assets';

export const ClubsModal = ({ isOpen, onRequestClose, club, isEditing, setIsEditing }) => {
  const { editClub, clubFormEdit, setClubFormEdit } = useClub();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editClub(clubFormEdit);
    setIsEditing(false);
    onRequestClose();
  };

  if (!club) return null;

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={onRequestClose}
      contentLabel="Club Information"
      footer={null}
      className='club-modal-content'
      width={1000}
    >
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
            <div className="modal-img">
             <img src={`data:image/png;base64,${club.Image}`} alt="Club Image" />
          </div>
       <section>
            <div className="modal-header">
              <h2>{club.Name}-ДЭЛГЭРЭНГҮЙ МЭДЭЭЛЭЛ</h2>
            </div>
            <div className="modal-section">
              <strong style={{ fontWeight: 'bolder',fontSize:'15px' }}>МЭДЭЭЛЭЛ</strong>
              <p style={{ maxWidth: '450px' }}>{club.Descr}</p>
            </div>
            {/* <div className="modal-section">
              <strong style={{ fontWeight: 'bolder' ,paddingBottom:'20px' }}>ХУВААРЬ</strong>
                <div style={{ display: 'flex', maxWidth: '200px' }}>
                  <img
                    style={{ maxWidth: '100%', marginRight: '10px' }}
                    src={sagsanbum}
                    alt="sagsanbumbug"
                  />
                  <img
                    style={{ maxWidth: '100%' }}
                    src={volley}
                    alt="volley"
                  />
                </div>
            </div> */}
            {/* <div className="modal-section">
              <strong style={{ fontWeight: 'bolder' , paddingBottom:'20px' }}>ГИШҮҮД</strong>
                <img style={{
                    width:'80px',
                    height: '80px',
                    display:'flex',

                }} 
                    src={gerlee} alt="" />
                <p style={{fontWeight:'bold'}}>{club.Contact}</p>
            </div> */}
            <div className="clubs-modal-icons">
              <strong style={{fontWeight:'bolder'}}>ГРУППТ ЭЛСЭХ</strong>
              <div
                style={{
                  position: 'absolute',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: '0',
                  }}
                  onClick={() => window.open('https://www.facebook.com/UltimateERP', '_blank')}
                >
                  <img 
                    src={fb} 
                    alt="Facebook icon" 
                    style={{ 
                      width: '50px', 
                      height: '50px' 
                    }} 
                  />
                </Button>

                <Button
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: '40px 10px',
                  }}
                  onClick={() => window.open('https://twitter.com/YourTwitterHandle', '_blank')}
                >
                  <img 
                    src={twitter} 
                    alt="Twitter icon" 
                    style={{ 
                      width: '50px', 
                      height: '50px' 
                    }} 
                  />
                </Button>
                <Button
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: '40px 10px',
                  }}
                  onClick={() => window.open('https://instagram.com/YourTwitterHandle', '_blank')}
                >
                  <img 
                    src={insta} 
                    alt="Instagram icon" 
                    style={{ 
                      width: '50px', 
                      height: '50px' 
                    }} 
                  />
                </Button>

                <Button
                  style={{
                    border: 'none',
                    background: 'none',
                    padding: '0',
                  }}
                  onClick={() => window.open('https://discord.com/YourDiscordInvite', '_blank')}
                >
                  <img 
                    src={discord} 
                    alt="Discord icon" 
                    style={{ 
                      width: '50px', 
                      height: '50px' 
                    }} 
                  />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </form>
    </Modal>
  );
};

export default ClubsModal;