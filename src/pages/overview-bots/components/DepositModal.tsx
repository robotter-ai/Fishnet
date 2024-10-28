import React, { useState } from 'react';
import { useTransactions } from '@shared/hooks/useTransaction';
import CustomBtn from '@components/ui/CustomBtn';
import { toast } from 'sonner';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const [usdcAmount, setUsdcAmount] = useState<string>('');
  const [solAmount, setSolAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { deposit } = useTransactions();

  if (!isOpen) return null;

  const handleDeposit = async () => {
    try {
      setIsLoading(true);
      await deposit(usdcAmount, solAmount);
      onClose();
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Deposit Funds</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              USDC Amount
            </label>
            <input
              type="number"
              value={usdcAmount}
              onChange={(e) => setUsdcAmount(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter USDC amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SOL Amount (for transation fees)
            </label>
            <input
              type="number"
              value={solAmount}
              onChange={(e) => setSolAmount(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter SOL amount"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <CustomBtn
            text="Cancel"
            btnStyle="outline-primary"
            onClick={onClose}
            disabled={isLoading}
          />
          <CustomBtn
            text={isLoading ? "Depositing..." : "Deposit"}
            onClick={handleDeposit}
            disabled={isLoading || !usdcAmount || !solAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default DepositModal;