import React, { forwardRef, useState } from 'react';
import CustomButton from '@components/ui/Button';
import { BackIcon } from '@assets/icons';

const Notification = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleActiveIdx = (index: number) => {
    setActiveIdx(index);
  };

  const notificationData = [
    {
      text: 'You have new notifications regarding your active bots and system updates. Check the latest news and statuses',
      time: '1 Hour',
    },
    {
      text: 'Your bot has successfully completed a trade! Sold 0.5 BTC at the price of 20,000 USD. Details are available in the trade history.',
      time: '3 Hours',
    },
    {
      text: 'You received a staking reward! Added 5 OTN to your balance. Keep staking for more income.',
      time: '1 day',
    },
    {
      text: 'New feature: Meet the enhanced AI trading strategies! Learn how they can boost your trading on our news page.',
      time: '5 days',
    },
    {
      text: 'You received a staking reward! Added 5 OTN to your balance. Keep staking for more income.',
      time: '1 day',
    },
    {
      text: 'New feature: Meet the enhanced AI trading strategies! Learn how they can boost your trading on our news page.',
      time: '5 days',
    },
  ];

  return (
    <div
      ref={ref}
      id="notification"
      className="flex flex-col justify-center absolute top-12 left-[-20px] p-6 z-50 rounded-[22px] w-[20.3125rem] h-[33.75rem] shadow-sm bg-white"
    >
      <h1 className="font-bold text-xl text-blue-400 text-center">
        Notifications
      </h1>

      <div className="flex gap-x-2 items-center justify-between mt-2 mb-4 w-[13.8125rem] mx-auto">
        {['All', 'Trading', 'Stacking', 'News'].map((item, index) => (
          <span
            key={index}
            className={`bg-light-200 text-blue-200 text-xs rounded-[15px] py-1 px-2 border border-transparent transition-all hover:border-blue-300/40 ${
              activeIdx === index ? 'border-blue-300' : ''
            }`}
            onClick={() => handleActiveIdx(index)}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notificationData.map((data, index) => (
          <div
            key={index}
            className={`border-b border-light-400 py-2 ${
              index === 0 ? 'border-t' : ''
            }`}
          >
            <div className="flex gap-x-2 justify-between">
              <p className="text-dark-300 text-sm leading-[16.94px]">
                {data.text}
              </p>
              <span className="mt-2 h-fit -rotate-180 text-navy">
                <BackIcon />
              </span>
            </div>
            <div className="flex items-center gap-x-2 mt-1">
              <span
                id="tiny_dot"
                className="w-1 h-1 rounded-full bg-blue-300"
              />
              <h6 className="text-[0.625rem] text-dark-100 leading-[12.1px]">
                {data.time} ago
              </h6>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-3">
        <CustomButton
          text="Mark all as read"
          style={{ background: 'transparent' }}
          xtraStyles="flex justify-center items-center py-2 px-6 text-xs text-navy border border-navy w-[8.6875rem] h-[1.9375rem] transition-colors duration-300 hover:!bg-navy hover:!text-white"
        />
      </div>
    </div>
  );
});

export default Notification;
