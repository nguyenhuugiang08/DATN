import { useEffect, useState } from "react";
import "./customfield.scss";
import { FieldProps } from "formik";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { makeStyles } from "@mui/styles";

interface CustomInputProps {
    type?: string;
    label?: string;
    currentValue?: string;
}

const useStyles = makeStyles({
    textareaField: {
        minWidth: "100%",
        minHeight: "200px",
        border: "1px solid rgba(33, 33, 33, 0.12)",
        fontSize: "16px !important",
        padding: "6px 12px",

        "&:focus-visible": {
            borderColor: "rgba(33, 33, 33, 0.3)",
            boxShadow: "none",
            outline: "0 none",
        },
    },
});

const TextareaField: React.FC<CustomInputProps & FieldProps> = ({
    field,
    form,
    type = "text",
    currentValue,
    ...props
}) => {
    const { name } = field;
    const [valueTextarea, setValueTextarea] = useState(currentValue);

    const classes = useStyles();

    useEffect(() => {
        if (valueTextarea === currentValue) {
            form.setFieldValue(name, currentValue);
        }
    }, [currentValue, form, name, valueTextarea]);

    const handleChangeTextField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueTextarea(e.target.value);
        form.setFieldValue(name, e.target.value);
    };

    return (
        <TextareaAutosize
            aria-label='empty textarea'
            {...field}
            value={valueTextarea}
            onChange={handleChangeTextField}
            className={classes.textareaField}
        />
    );
};

export default TextareaField;
