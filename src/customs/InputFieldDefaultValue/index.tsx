import { FormGroup, TextField } from "@mui/material";
import "./customfield.scss";
import { FieldProps } from "formik";
import { useState, useEffect } from "react";

interface CustomInputProps {
    type?: string;
    label?: string;
    currentValue?: string;
}

const CustomField: React.FC<CustomInputProps & FieldProps> = ({
    field,
    form,
    type = "text",
    currentValue,
    ...props
}) => {
    const { name } = field;
    const { touched, errors } = form;

    const showError = (errors[name] && touched[name]) as boolean | undefined;

    const [inputValue, setInputValue] = useState(currentValue);

    useEffect(() => {
        if (inputValue === currentValue) {
            form.setFieldValue(name, currentValue);
        }
    }, [currentValue, form, name, inputValue]);

    const handleChangeTextField = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setInputValue(e.target.value);
        form.setFieldValue(name, e.target.value);
    };

    return (
        <FormGroup>
            <label className='login-form-label'>{props.label}</label>
            <TextField
                id={name}
                {...field}
                value={inputValue}
                onChange={(e) => handleChangeTextField(e)}
                className='custom-field'
                type={type}
                // {...props}
                color='info'
                error={showError}
                helperText={showError && (errors[name] as React.ReactNode)}
                variant="outlined"
            />
        </FormGroup>
    );
};

export default CustomField;
