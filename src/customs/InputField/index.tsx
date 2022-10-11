import {
    FormControl,
    FormGroup,
    IconButton,
    InputAdornment,
    FormHelperText,
    OutlinedInput,
    TextField,
} from "@mui/material";
import "./customfield.scss";
import { FieldProps } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

interface CustomInputProps {
    type?: string;
    label?: string;
    placeholder?: string;
}

const CustomField: React.FC<CustomInputProps & FieldProps> = ({
    field,
    form,
    type = "text",
    ...props
}) => {
    const { name } = field;
    const { touched, errors } = form;

    const showError = (errors[name] && touched[name]) as boolean | undefined;
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            {type !== "password" ? (
                <FormGroup>
                    <label className='login-form-label'>
                        {props.label} <span className='required'>*</span>
                    </label>
                    <TextField
                        id={name}
                        {...field}
                        className='custom-field'
                        type={type}
                        placeholder={props.placeholder}
                        color='info'
                        error={showError}
                        helperText={showError && (errors[name] as React.ReactNode)}
                    />
                </FormGroup>
            ) : (
                <FormGroup>
                    <label className='login-form-label'>
                        {props.label} <span className='required'>*</span>
                    </label>
                    <FormControl fullWidth variant='outlined' className='custom-field'>
                        <OutlinedInput
                            id='outlined-adornment-password'
                            type={showPassword ? "text" : "password"}
                            {...field}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            placeholder={props.placeholder}
                            error={showError}
                        />
                        {showError && (
                            <FormHelperText error id='accountId-error'>
                                {errors[name] as React.ReactNode}
                            </FormHelperText>
                        )}
                    </FormControl>
                </FormGroup>
            )}
        </>
    );
};

export default CustomField;
