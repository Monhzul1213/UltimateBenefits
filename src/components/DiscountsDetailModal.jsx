import { Button, Input, Modal, Image , Upload } from "antd";
import { useDiscounts } from "../context/DiscountsProvider";
import MyEditor from "./MyEditor";

const DiscountsDetailModal = ({ isOpen, handleDetailModal}) => {
    let fileName = "";
    const{
        handleDetailForm,
        discountsDetailForm,
        createDiscountsDetail,
        clearDetailForm,
        EditDiscounts,
        editDiscountsDetail,
    } =  useDiscounts();

    const handleInput=(e)=>{
        handleDetailForm(e.target.name, e.target.value);
    };

    return (
    <Modal
        isOpen={isOpen}
        onClose={() => {
            handleDetailModal(false);
            clearDetailForm();
        }}
        footer={null}
        closable={false}
    >
        <div className="tarining-modal-container">
            <div className="emp-modal-header">
              <h2>
                 Дэлгэрэнгүй мэдээлэл нэмэх
              </h2>
            </div>
              <div className="training-modal-input">
                <p style ={{ fontSize:15, fontWeight: 500, marginBottom: 5}}>
                  Гарчиг
                </p>
                  <Input 
                    value={DiscountsForm.Name}
                    size="large"
                    variant="filled"
                    name="Name"
                    placeholder=""
                    onChange={handleChange}
                  />
              </div>
               <div className="trainig_maodal-input">
                <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 5}}>
                    Агуулга
                </p>
                 <MyEditor
                    handleDetailForm={handleDetailForm}
                    value={DiscountsForm.descr}
                  />
                </div>
                <div className="emp-modal-buttons">
                    <Button
                      size="large"
                      style={{ fontWeight: 700 }}
                      onClick={() => {
                        clearDetailForm();
                        handleDetailForm(false);
                      }}
                      >
                        Хаах
                    </Button>
                    <Button
                       size="large"
                       onClick={()=>{
                        createDiscountsDetail();
                        clearDetailForm();
                        handleDetailForm(false);
                       }}
                       style={{fontWeight: 700, marginLeft: 10}}
                       type="primary"
                       >
                        Нэмэх
                       </Button>
             </div>
        </div>
    </Modal>
    );
};