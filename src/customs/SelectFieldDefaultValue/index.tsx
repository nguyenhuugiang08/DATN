import { FormGroup, NativeSelect, OutlinedInput } from "@mui/material";
import "./customfield.scss";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";

interface CustomInputProps {
    type?: string;
    label?: string;
    currentValue?: string;
    listValues?: { name: string; _id: string }[];
}

const CustomSelectFieldDefaultValue: React.FC<CustomInputProps & FieldProps> = ({
    field,
    form,
    type = "text",
    currentValue,
    listValues,
    ...props
}) => {
    const { name } = field;
    const [valueSelect, setValueSelect] = useState(currentValue);

    useEffect(() => {
        if (valueSelect === currentValue) {
            form.setFieldValue(name, currentValue);
        }
    }, [currentValue, form, name, valueSelect]);

    const handleChangeTextField = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValueSelect(e.target.value);
        form.setFieldValue(name, e.target.value);
    };

    return (
        <FormGroup>
            <label className='login-form-label'>
                {props.label}
            </label>
            <NativeSelect
                inputProps={{
                    id: name,
                }}
                value={valueSelect}
                onChange={handleChangeTextField}
                input={<OutlinedInput label={props.label} />}
                variant='outlined'
            >
                {listValues?.map((value) => (
                    <option value={value.name} key={value._id}>
                        {value.name}
                    </option>
                ))}
            </NativeSelect>
        </FormGroup>
    );
};

export default CustomSelectFieldDefaultValue;
