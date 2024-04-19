import React, { ChangeEvent, useState } from 'react'
import { RefOptionsModel } from 'models/CommonModels'
import './style.scss'

type Props = {
  label: string
  placeholder: string
  fieldName: string
  options: RefOptionsModel[]
  value: string
  handleChange: (e: any) => void
}

export const InputAutoComplete = ({
                                    label,
                                    placeholder,
                                    options,
                                    handleChange,
                                    fieldName,
                                    value,
                                  }: Props) => {

  const [hideList, setHideList] = useState(false)


  return (
    <div className="form-group" style={{ position: 'relative' }}>
      <label style={{ marginBottom: 3 }}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="form-control"
        list="list"
        id="input-datalist"
        name={fieldName}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          handleChange(e)
          setHideList(false)
        }
        }
      />
      <div className={`${options.length > 0 && 'list'} ${hideList && 'd-none'}`}>
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
              handleChange(obj)
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
