import React from 'react';
import './TextIcon.less';

const TextIcon = ({ icon, text, style }: any) => {

  return (
    <div  className={"test-icon__all-text"} style={style}>
      {React.createElement(icon, { style: { marginRight: 5 } })}
      <span className={'test-icon__text'}>{text}</span>
    </div>
  )
    ;
};

export default TextIcon;
