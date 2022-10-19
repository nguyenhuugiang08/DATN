import { FormGroup, MenuItem, Select, FormHelperText } from "@mui/material";
import "./customfield.scss";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

interface CustomInputProps {
    type?: string;
    label?: string;
    currentValue?: string;
    listValues?: { name: string; _id: string }[];
}

const CustomSelectField: React.FC<CustomInputProps & FieldProps> = ({
    field,
    form,
    type = "text",
    currentValue,
    listValues,
    ...props
}) => {
    const { name } = field;
    const { touched, errors } = form;
    const showError = (errors[name] && touched[name]) as boolean | undefined;

    const [valueSelect, setValueSelect] = useState("");

    useEffect(() => {
        if (valueSelect === currentValue) {
            form.setFieldValue(name, currentValue);
        }
    }, [currentValue, form, name, valueSelect]);

    const handleChangeTextField = (e: SelectChangeEvent<string>) => {
        setValueSelect(e.target.value);
        form.setFieldValue(name, e.target.value);
    };

    return (
        <FormGroup>
            <label className='login-form-label'>
                {props.label} <span className='required'>*</span>
            </label>
            <Select
                id={name}
                {...field}
                value={valueSelect}
                onChange={handleChangeTextField}
                error={showError}
            >
                <MenuItem value=''>
                    <em>None</em>
                </MenuItem>
                {listValues?.map((value) => (
                    <MenuItem value={value.name} key={value._id}>
                        {value.name}
                    </MenuItem>
                ))}
            </Select>
            {showError && <FormHelperText error>{errors[name] as React.ReactNode}</FormHelperText>}
        </FormGroup>
    );
};

export default CustomSelectField;
