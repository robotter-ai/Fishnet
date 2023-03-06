import CustomButton from '@components/ui/Button';
import ClickToCopy from '@components/ui/ClickToCopy';
import CustomTable, { ITableColumns } from '@components/ui/CustomTable';

const columns = ({
  isSelectUser,
}: {
  isSelectUser: boolean;
}): ITableColumns[] => [
  {
    header: 'Name',
    cell: ({ name }) => <p className="whitespace-nowrap">{name}</p>,
    isSortable: true,
  },
  {
    header: 'Hash',
    cell: ({ hash }) => (
      <div className="flex gap-3">
        <p className="w-[200px] truncate">{hash}</p>
        <ClickToCopy text={hash} />
      </div>
    ),
    isSortable: true,
  },
  {
    header: 'Link',
    cell: ({ link }) => (
      <a
        href={link}
        className="text-blue hover:underline"
        rel="noreferrer"
        target="_blank"
      >
        {link}
      </a>
    ),
    isSortable: true,
  },
  {
    header: 'Descrition',
    cell: ({ desc }) =>
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    isSortable: true,
  },
  {
    header: '',
    cell: ({ desc }) =>
      isSelectUser ? (
        <CustomButton text="Select" btnStyle="outline-blue" />
      ) : null,
  },
];

const BrowseUsers = ({ isSelectUser }: { isSelectUser: boolean }) => {
  const data = [
    {
      name: 'Profile <Name>',
      hash: '8743b52063cd8409g885774...',
      link: 'https://www.twitter.com/reddotsover',
    },
    {
      name: 'Profile <Name>',
      hash: '8743b52063cd8409g885774...',
      link: 'https://www.twitter.com/reddotsover',
    },
    {
      name: 'Profile <Name>',
      hash: '8743b52063cd8409g885774...',
      link: 'https://www.twitter.com/reddotsover',
    },
    {
      name: 'Profile <Name>',
      hash: '8743b52063cd8409g885774...',
      link: 'https://www.twitter.com/reddotsover',
    },
    {
      name: 'Profile <Name>',
      hash: '8743b52063cd8409g885774...',
      link: 'https://www.twitter.com/reddotsover',
    },
    {
      name: 'Profile <Name>',
      hash: '8743b52063cd8409g885774...',
      link: 'https://www.twitter.com/reddotsover',
    },
    {
      name: 'Profile <Name>',
      hash: '8743b52063cd8409g885774...',
      link: 'https://www.twitter.com/reddotsover',
    },
  ];
  return <CustomTable data={data} columns={columns({ isSelectUser })} />;
};

export default BrowseUsers;
