import { FC, FunctionComponent } from 'react';

interface IconComponentProps {
  className: string;
}

interface SideBarOptionProps {
  IconComponent: FC<IconComponentProps>;
  label: string;
  onClick: () => void;
}

const SideBarOption: FunctionComponent<SideBarOptionProps> = ({
  IconComponent,
  label,
  onClick,
}) => {
  return (
    <div className='sidebarOption' onClick={onClick}>
      <IconComponent className='w-6 h-6' />
      <p>{label}</p>
    </div>
  );
};

export default SideBarOption;
