import { FormGroup, TextField } from "@mui/material";
import "./customfield.scss";
import { FieldProps } from "formik";

interface CustomInputProps {
    type?: string;
    label?: string;
}

const CustomField: React.FC<CustomInputProps & FieldProps> = ({
    field,
    form,
    type = "text",
    ...props
}) => {
    const { name } = field;
    const { touched, errors } = form;

    const showError  = (errors[name] && touched[name]) as boolean | undefined;

    return (
        <FormGroup>
            <label className='login-form-label'>
                {props.label} <span className='required'>*</span>
            </label>
            <TextField
                id={name}
                {...field}
                className='custom-field'
                type={type}
                {...props}
                color='info'
                error={showError}
                helperText={showError && errors[name] as React.ReactNode}
            />
        </FormGroup>
    );
};

export default CustomField;
