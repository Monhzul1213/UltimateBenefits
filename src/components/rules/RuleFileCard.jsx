import { Avatar, Dropdown, Tooltip } from "antd";
import {
  downloadFileIcon,
  excelBack,
  excelIcon,
  pdfBack,
  pdfIcon,
  wordBack,
  wordIcon,
} from "../../assets";
import { useTraining } from "../../context/TrainProvider";
import { checkRole } from "../../lib/utils/checkRole";
import { useAuth } from "../../context/AuthProvider";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useRule } from "../../context/RuleProvider";

export const RuleFileCard = ({ learning, handleModal }) => {
  const { user } = useAuth();
  const { downloadFile } = useTraining();
  const { deleteRuleDetail, setRuleDetailForm, setEditDetail } = useRule();
  const handleClick = () => {
    setRuleDetailForm(learning);
    setEditDetail(true);
    handleModal(true);
  };
  const handleDeleteClick = () => {
    deleteRuleDetail(learning.ID);
  };
  const items = [
    {
      label: "Засах",
      key: "1",
      onClick: handleClick,
    },
    {
      label: "Устгах",
      key: "2",
      danger: true,
      onClick: handleDeleteClick,
    },
  ];

  return (
    <Dropdown
      menu={
        checkRole(user?.Role)
          ? { items }
          : {
              items: [
                {
                  label: "Файл татах",
                  key: "1",
                  onClick: () => {
                    downloadFile(learning);
                  },
                },
              ],
            }
      }
      trigger={["contextMenu"]}
    >
      <div className="video-card">
        <div className="training-file-card">
          {(learning.FileType === "pdf" || learning.FileType === "pptx") && (
            <>
              <img
                className="training-file-image"
                src={pdfBack}
                alt="training-file-image"
              />
              <img className="training-file-icon" src={pdfIcon} alt="" />
            </>
          )}

          {learning.FileType === "doc" && (
            <>
              <img
                className="training-file-image"
                src={wordBack}
                alt="training-file-image"
              />
              <img className="training-file-icon" src={wordIcon} alt="" />
            </>
          )}

          {learning.FileType === "xlsx" && (
            <>
              <img
                className="training-file-image"
                src={excelBack}
                alt="training-file-image"
              />
              <img className="training-file-icon" src={excelIcon} alt="" />
            </>
          )}
          <p className="training-file-title">{learning.Name}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="video-desc">
            <div className="video-desc-avatar">
              <Avatar
                src={"data:image/jpeg;base64," + learning?.Image}
                className="video-author-avatar"
                size={50}
              />
            </div>
            <div>
              <p>{learning?.UserName}</p>
              <Tooltip title={learning?.Name}>
                <h4>{learning?.Name}</h4>
              </Tooltip>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            {learning.Perc === 100 ? (
              <FaRegCircleCheck size={30} color="green" />
            ) : (
              ""
            )}
            <img
              onClick={() => {
                downloadFile(learning);
              }}
              className="downloadfile-icon"
              src={downloadFileIcon}
              alt=""
            />
          </div>
        </div>
      </div>
    </Dropdown>
  );
};
