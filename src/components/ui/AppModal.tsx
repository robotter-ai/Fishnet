import { Box, Modal } from '@mui/material';
import classNames from 'classnames';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  withInfo?: boolean;
  withHeader?: boolean;
  fullWidth?: boolean;
}

const style = (fullWidth: boolean) => {
  return {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: fullWidth ? 1000 : 460,
    bgcolor: '#fff',
    borderRadius: '32px',
    boxShadow: '0px 12px 24px rgba(0, 85, 255, 0.08)',
    border: 'none',
    outline: 'none',
  };
};

const AppModal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen,
  handleClose,
  withInfo,
  withHeader = true,
  fullWidth = false,
}) => {
  return (
    <Modal open={isOpen}>
      <Box sx={style(fullWidth)}>
        <div className="p-8">
          {withHeader ? (
            <div className="flex justify-between items-center">
              <h1>{title}</h1>
              <div className="flex justify-between gap-2 items-center">
                {withInfo ? (
                  <div
                    className="bg-light-blue rounded-full p-1 cursor-pointer"
                    style={{
                      boxShadow: '0px 12px 24px rgba(0, 85, 255, 0.08)',
                    }}
                  >
                    <AiOutlineQuestionCircle size={24} color="#172025" />
                  </div>
                ) : null}
                <div
                  className="bg-light-blue rounded-full p-1 cursor-pointer"
                  style={{
                    boxShadow: '0px 12px 24px rgba(0, 85, 255, 0.08)',
                  }}
                  onClick={handleClose}
                >
                  <MdClose size={24} color="#172025" />
                </div>
              </div>
            </div>
          ) : null}
          <div className={classNames('relative', { 'mt-[30px]': withHeader })}>
            {children}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AppModal;
