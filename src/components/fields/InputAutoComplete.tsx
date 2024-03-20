import { RefOptionsModel } from 'models/CommonModels'
import React, { ChangeEvent } from 'react'
import { Form } from 'react-router-dom'

type Props = {
  label:string
  placeholder:string
  index:number
  fieldName:string
  list: RefOptionsModel[]
  value: string
  handleAddressChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => void
}

export const InputAutoComplete = ({ label,placeholder, list,handleAddressChange, index,fieldName, value }: Props) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="form-control"
        list="list"
        id="input-datalist"
        name={fieldName}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleAddressChange(e, index)}
      />
      <datalist id="list">
        {list.map((item, index) => (
          <option key={index}>{item.label}</option>
        ))}
      </datalist>
    </div>
  )
}
