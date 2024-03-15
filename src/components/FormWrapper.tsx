import React from 'react';

type Props = {
  children: React.ReactNode;
};

const FormWrapper = ({ children }: Props) => {
  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <div key={index} style={{ marginBottom: '15px' }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default FormWrapper;