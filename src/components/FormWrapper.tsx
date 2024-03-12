import React from 'react'

type Props = {
  children: React.ReactNode
}

const FormWrapper = ({ children }: Props) => {
  const childrenArr = React.Children.toArray(children)

  return childrenArr.map((child: any, index: number) => (
    <div key={index} style={{ marginBottom: '15px' }}>
      {child}
    </div>
  ))  
}

export default FormWrapper
