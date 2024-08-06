import { useState } from "react";
import { withSize } from "react-sizeme";
import { CustomHeader } from "../../components";
import { add_card } from "../../assets";
import { alert } from "../../lib/actions/alert.actions";
import "../../css/discounts.css";
import { useDiscounts } from "../../context/DiscountsProvider";
import DiscountsAdd from "../../components/DiscountsAdd";
import DiscountsModal from "../../components/DiscountsModal";

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

const DiscountsCard = ({ discount, onClick, onRightClick }) => (
  <div className="image-container club-image-container" onClick={onClick} onContextMenu={onRightClick}>
    <img src={`data:image/jpg;base64,${discount.Image}`}  />
    <div className="card-title">
      {discount.Name.split(' ')[0]}<br />{discount.Name.split(' ')[1]}
    </div>
  </div>
);

const AddDiscountCard = ({ onClick }) => (
  <div className="image-container club-image-container add-card-image" onClick={onClick}>
    <img src={add_card} alt="Add Discount" />
  </div>
);

const Discounts = () => {
  const [selectedDiscounts, setSelectedDiscounts] = useState(null);
  const [isDiscountsAddOpen, setIsDiscountsAddOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, discount: null });
  const { discounts, editDiscounts, deleteDiscounts, setDiscountsFormEdit } = useDiscounts();

  const handleCardOpen = (discount) => {
    console.log("Opening modal with discount:", discount);
    setSelectedDiscounts(discount);
  };

  const handleEditDiscount = async (discount) => {
    await editDiscounts(discount);
    alert.success("Хөнгөлөлт, урамшуулал амжилттай засагдлаа");
  };

  const handleCloseModal = () => setSelectedDiscounts(null);

  const handleDiscountsAddClick = () => setIsDiscountsAddOpen(true);

  const handleCloseDiscountsAddModal = () => setIsDiscountsAddOpen(false);

  const handleRightClick = (event, discount) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY, discount });
  };

  const handleContextMenuOptionClick = async (option) => {
    if (option === 'Edit') {
      setDiscountsFormEdit(handleEditDiscount);
      setSelectedDiscounts(contextMenu.discount);
    } else if (option === 'Delete') {
      await deleteDiscounts(contextMenu.discount.ID);
    }
    setContextMenu({ visible: false, x: 0, y: 0, discount: null });
  };

  const handleModalClick = () => setContextMenu({ visible: false, x: 0, y: 0, discount: null });

  return (
    <>
      <CustomHeader title="Хөнгөлөлт, урамшуулал" />
      <main className="discounts-container-container" onClick={handleModalClick}>
        <div className="discounts-container">
          {discounts?.map((discount) => (
            <DiscountsCard
              discount={discount}
              onClick={() => handleCardOpen(discount)}
              onRightClick={(event) => handleRightClick(event, discount)}
            />
          ))}
          <AddDiscountCard onClick={handleDiscountsAddClick} />
        </div>
      </main>
      <DiscountsModal isOpen={!!selectedDiscounts} onRequestClose={handleCloseModal} discount={selectedDiscounts} />
      <DiscountsAdd isOpen={isDiscountsAddOpen} onClose={handleCloseDiscountsAddModal} />
      {contextMenu.visible && (
        <ul
          className="context1-menu"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
        >
          <li onClick={() => handleContextMenuOptionClick('Edit')}>Засах</li>
          <li onClick={() => handleContextMenuOptionClick('Delete')} style={{ color: 'red' }}>
            Устгах
          </li>
        </ul>
      )}
    </>
  );
};

export default withSize()(Discounts);
