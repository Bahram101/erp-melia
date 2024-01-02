export interface CustomFieldProps {
    type?:string;
    fieldName: string;
    label?: string;
    handleChange: any;
    value?: string | any;
    error?: string
}
