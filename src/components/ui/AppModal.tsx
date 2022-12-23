import { Box, Modal } from "@mui/material";
import { MdClose } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  withInfo?: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 478,
  bgcolor: "#fff",
  borderRadius: "10px",
  boxShadow: "0px 12px 24px rgba(0, 85, 255, 0.08)",
};

const AppModal: React.FC<ModalProps> = ({
  title,
  children,
  open,
  handleClose,
  withInfo,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h1>{title}</h1>
            <div className="flex justify-between gap-2 items-center">
              {withInfo ? (
                <div
                  className="bg-white rounded-[10px] p-1 cursor-pointer"
                  style={{ boxShadow: "0px 12px 24px rgba(0, 85, 255, 0.08)" }}
                >
                  <AiOutlineQuestionCircle size={24} color="#172025" />
                </div>
              ) : null}
              <div
                className="bg-white rounded-[10px] p-1 cursor-pointer"
                style={{ boxShadow: "0px 12px 24px rgba(0, 85, 255, 0.08)" }}
                onClick={handleClose}
              >
                <MdClose size={24} color="#172025" />
              </div>
            </div>
          </div>
          <div className="mt-[30px]">{children}</div>
        </div>
      </Box>
    </Modal>
  );
};

export default AppModal;
