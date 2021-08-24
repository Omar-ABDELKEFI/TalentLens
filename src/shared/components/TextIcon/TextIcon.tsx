import React from 'react';
import './TextIcon.less';

const TextIcon = ({ icon, text, style }: any) => {

  return (
    <div style={style}>
      {React.createElement(icon, { style: { marginRight: 5 } })}
      <span className={'text-icon__text'}>{text}</span>
    </div>
  )
    ;
};

export default TextIcon;
