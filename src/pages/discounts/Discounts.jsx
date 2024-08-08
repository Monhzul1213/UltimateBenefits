import { useState } from "react";
import { withSize } from "react-sizeme";
import { CustomHeader } from "../../components";
import { add_card } from "../../assets";
import { alert } from "../../lib/actions/alert.actions";
import "../../css/discounts.css";
import { useDiscounts } from "../../context/DiscountsProvider";
import DiscountsAdd from "../../components/DiscountsAdd";
import DiscountsModal from "../../components/DiscountsModal";
import { Dropdown } from "antd";

const AlertMessage = () => {
  const [visible, setVisible] = useState(true);
  const handleDismiss = () => setVisible(false);

  return (
    visible && (
      <div className="alert-message">
        <button onClick={handleDismiss}>Dismiss</button>
      </div>
    )
  );
};

const DiscountsCard = ({ discount, onClick, onRightClick, ustgah, setIsDiscountsAddOpen, setDiscountsForm, setEditDiscounts }) => {
  const items = [
    {
      label: 'Засах',
      key: '1',
      onClick:()=>{
        setEditDiscounts(true)
        setDiscountsForm(discount)
        setIsDiscountsAddOpen(true)}
    },
    {
      label: 'Устгах',
      key: '2',
      danger: true,
      onClick:()=>{ustgah(discount.ID)}
    },
  ];
 return <Dropdown menu={{ items }} trigger={['contextMenu']}>
  <div className="image-container club-image-container" onClick={onClick}>
    <img src={`data:image/jpg;base64,${discount.Image}`}  />
    <div className="card-title">
      {discount.Name.split(' ')[0]}<br />{discount.Name.split(' ')[1]}
    </div>
  </div>
  </Dropdown>
};

const AddDiscountCard = ({ onClick }) => (
  <div className="image-container club-image-container add-card-image" onClick={onClick}>
    <img src={add_card} alt="Add Discount" />
  </div>
);

const Discounts = () => {
  const [selectedDiscounts, setSelectedDiscounts] = useState(null);
  const [isDiscountsAddOpen, setIsDiscountsAddOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, discount: null });
  const { discounts, editDiscounts, deleteDiscounts, setDiscountsForm } = useDiscounts();
  const [EditDiscounts, setEditDiscounts] = useState(false)

  const handleCardOpen = (discount) => {
    console.log("Opening modal with discount:", discount);
    setSelectedDiscounts(discount);
  };

  const handleEditDiscount = async (discount) => {
    await editDiscounts(discount);
    alert.success("Хөнгөлөлт, урамшуулал амжилттай засагдлаа");
  };

  const handleCloseModal = () => setInfoModal(false);

  const handleDiscountsAddClick = () => {
    setEditDiscounts(false)
    setIsDiscountsAddOpen(true)};

  const handleCloseDiscountsAddModal = () => {
    setDiscountsForm({
      Name: "",
      Descr: "",
      Type: "",
      AvailableCount: "",
      Image: null,
    });
    setIsDiscountsAddOpen(false)};

  const handleRightClick = (event, discount) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, discount });
  };

  const handleContextMenuOptionClick = async (option) => {
    if (option === 'Edit') {
      setSelectedDiscounts(contextMenu.discount);
    } else if (option === 'Delete') {
      await deleteDiscounts(contextMenu.discount.ID);
    }
    setContextMenu({ visible: false, x: 0, y: 0, discount: null });
  };

  const handleModalClick = () => setContextMenu({ visible: false, x: 0, y: 0, discount: null });
  const [infoModal, setInfoModal] = useState(false)
  return (
    <>
      <CustomHeader title="Хөнгөлөлт, урамшуулал" />
      <main className="discounts-container-container" onClick={handleModalClick}>
        <div className="discounts-container">
          {discounts?.map((discount) => (
            <DiscountsCard
            setEditDiscounts= {setEditDiscounts}
            setDiscountsForm= {setDiscountsForm}
            setIsDiscountsAddOpen={setIsDiscountsAddOpen}
              ustgah={deleteDiscounts}
              discount={discount}
              onClick={() =>{ 
                setInfoModal(true)
                handleCardOpen(discount)}}
            />
          ))}
          <AddDiscountCard onClick={handleDiscountsAddClick} />
        </div>
      </main>
      <DiscountsModal isOpen={infoModal} onRequestClose={handleCloseModal} discount={selectedDiscounts} />
      <DiscountsAdd EditDiscounts={EditDiscounts} isOpen={isDiscountsAddOpen} onClose={handleCloseDiscountsAddModal} />
    </>
  );
};

export default withSize()(Discounts);
