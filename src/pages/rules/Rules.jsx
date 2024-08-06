import { useState } from "react";
import { add_card, RulesBod, RulesDj, RulesGa, RulesHut } from "../../assets";
import { CustomHeader } from "../../components";
import RuleCategoryCard from "../../components/RuleCategoryCard";
import "../../css/rule.css";
import { Modal } from "antd";
import { Input } from "antd";
import { Button,  Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Rules = () => {
  const data = [
    { title: "Дүрэм журам", image: RulesDj },
    { title: "Бодлого", image: RulesBod },
    { title: "Хөтөлбөр", image: RulesHut },
    { title: "Гарын авлага", image: RulesGa },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = ()=> {setIsModalOpen(true)}
  const exitModal = ()=> {setIsModalOpen(false)}
  return (
    <>
      <CustomHeader title="Дүрэм журам" />
      <main className="rules-card-container">
        {data.map((rule) => {
          return <RuleCategoryCard rule={rule} />;
        })}
        <div className="ruleCARD">  
          <img  src={add_card} onClick={openModal}
           />
        </div>
        <Modal
        title="Дүрэм журам нэмэх"
        open={isModalOpen}
        onOk={exitModal}
        onCancel={exitModal}
 >
        <p className="RuleGarchig"> 
          Гарчиг
        </p>
        <Input placeholder="Дүрэм журам" className="RulePlaceHolder"/>
        <p className="RuleZurag"> 
           Зураг
        </p>
        <Upload >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
      </Modal>
      </main>
    </>
  );
};

export default Rules;
