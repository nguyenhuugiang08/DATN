import { useEffect, useState } from "react";
import "./customfield.scss";
import { FieldProps } from "formik";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { pink } from "@mui/material/colors";

interface CustomInputProps {
    type?: string;
    label?: string;
    currentValue?: string[];
    listValues?: string[];
}

const CheckboxField: React.FC<CustomInputProps & FieldProps> = ({
    field,
    form,
    type = "text",
    currentValue,
    listValues,
    ...props
}) => {
    const { name } = field;
    const [valuesCheckboxes, setValuesCheckboxes] = useState([] as string[] | undefined);

    useEffect(() => {
        setValuesCheckboxes(currentValue);
    }, [currentValue]);

    const handleChangeCheckboxField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = form.values.colors?.indexOf(e.target.value);

        if (index === -1) {
            setValuesCheckboxes([...form.values[`${name}`], e.target.value]);
        } else {
            setValuesCheckboxes(
                form.values[`${name}`].filter((color: string) => color !== e.target.value)
            );
        }
    };

    useEffect(() => {
        form.setFieldValue(name, valuesCheckboxes);
    }, [name, form, valuesCheckboxes]);

    return (
        <>
            <label className='login-form-label'>Colors</label>
            <FormGroup row>
                {listValues?.map((value, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                size='small'
                                {...field}
                                value={listValues[index]}
                                onChange={handleChangeCheckboxField}
                                id={name}
                                checked={form.values[`${name}`]?.includes(value)}
                            />
                        }
                        label={value}
                    />
                ))}
            </FormGroup>
        </>
    );
};

export default CheckboxField;
