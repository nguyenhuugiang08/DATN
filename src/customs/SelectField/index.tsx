import { FormGroup, MenuItem, Select, FormHelperText } from "@mui/material";
import "./customfield.scss";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "redux/store";
import { useSelector } from "react-redux";
import { getAllAlias } from "redux/aliasSlice";
import { SelectChangeEvent } from "@mui/material/Select";

interface CustomInputProps {
    type?: string;
    label?: string;
    currentValue?: string;
}

const CustomSelectField: React.FC<CustomInputProps & FieldProps> = ({
    field,
    form,
    type = "text",
    currentValue,
    ...props
}) => {
    const { name } = field;
    const { touched, errors } = form;
    const showError = (errors[name] && touched[name]) as boolean | undefined;

    const dispatch = useAppDispatch();
    const { aliases } = useSelector((state: RootState) => state.alias);
    const [valueSelect, setValueSelect] = useState("");

    useEffect(() => {
        dispatch(getAllAlias());
    }, [dispatch]);

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
                {aliases?.map((alias) => (
                    <MenuItem value={alias.name} key={alias._id}>
                        {alias.name}
                    </MenuItem>
                ))}
            </Select>
            {showError && (
                <FormHelperText error>
                    {errors[name] as React.ReactNode}
                </FormHelperText>
            )}
        </FormGroup>
    );
};

export default CustomSelectField;
