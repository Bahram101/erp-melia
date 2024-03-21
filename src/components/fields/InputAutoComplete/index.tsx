import React, { ChangeEvent, useState } from 'react'
import { RefOptionsModel } from 'models/CommonModels'
import './style.scss'

type Props = {
  label: string
  placeholder: string
  index: number
  fieldName: string
  options: RefOptionsModel[]
  value: string
  handleAddressChange: (
    e: any,
    index: number,
  ) => void
}

export const InputAutoComplete = ({
  label,
  placeholder,
  options,
  handleAddressChange,
  index,
  fieldName,
  value,
}: Props) => {

  const [hideList, setHideList] = useState(false)

  return (
    <div className="form-group" style={{ position: 'relative' }}>
      <label  style={{marginBottom:3}}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="form-control"
        list="list"
        id="input-datalist"
        name={fieldName}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleAddressChange(e, index)
            setHideList(false)
          }
        }
      />
      <div className={`${options.length > 0 && 'list'} ${hideList && 'd-none'}`} >
        {options.map((item: any, i) => (
          <div
            className="item"
            key={i}
            onClick={() => {
              const obj = {
                target: {
                  name: fieldName,
                  value: item.label,
                },
              }
              handleAddressChange(obj, index)
              setHideList(true)
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
