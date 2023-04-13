import { FC, FunctionComponent } from 'react';

interface SideBarOptionProps {
  IconComponent: FC;
  label: string;
  onClick: () => void;
}

const SideBarOption: FunctionComponent<SideBarOptionProps> = ({ IconComponent, label, onClick }) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer px-1 py-2 hover:bg-gray-600 rounded-lg min-w-full" onClick={onClick}>
      <IconComponent className='w-6 h-6'/>
      <p>{label}</p>
    </div>
  );
};

export default SideBarOption