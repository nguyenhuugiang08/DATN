import { FormGroup, MenuItem, Select, FormHelperText } from "@mui/material";
import "./customfield.scss";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch } from "redux/store";
import { getDistrict } from "redux/regionSlice";

interface CustomInputProps {
    type?: string;
    label?: string;
    currentValue?: string;
    listValues?: any[];
    displayValue: string;
    isDistrict: boolean;
}

const CustomSelectField: React.FC<CustomInputProps & FieldProps> = ({
    field,
    form,
    type = "text",
    currentValue,
    listValues,
    displayValue = "_id",
    isDistrict = false,
    ...props
}) => {
    const { name } = field;
    const { touched, errors } = form;
    const showError = (errors[name] && touched[name]) as boolean | undefined;
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        if (isDistrict) dispatch(getDistrict(valueSelect));
    }, [dispatch, isDistrict, valueSelect]);

    return (
        <FormGroup>
            {props.label && (
                <label className='login-form-label'>
                    {props.label} <span className='required'>*</span>
                </label>
            )}
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
                    <MenuItem value={value[`${displayValue}`]} key={value[`${displayValue}`]}>
                        {value.name}
                    </MenuItem>
                ))}
            </Select>
            {showError && <FormHelperText error>{errors[name] as React.ReactNode}</FormHelperText>}
        </FormGroup>
    );
};

export default CustomSelectField;
