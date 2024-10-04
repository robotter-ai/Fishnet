export interface Bot {
    id: number;
    owner: string;
    balance: number;
    status: 'active' | 'inactive';
  }
  
  export interface DepositParams {
    owner: string;
    amount: number;
    delegate: string;
  }
  
  export interface WithdrawParams {
    owner: string;
    botId: number;
  }