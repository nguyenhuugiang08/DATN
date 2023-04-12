import { useEffect, useState } from "react";
import "./customfield.scss";
import { FieldProps } from "formik";
import { makeStyles } from "@mui/styles";
import { Thumbnail } from "interfaces/interface";
import { Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloseIcon from "@mui/icons-material/Close";

interface CustomInputProps {
    type?: string;
    label?: string;
    currentValue?: Thumbnail[];
}

const useStyles = makeStyles({
    thumbnailsPreview: {
        backgroundRepeat: "no-repeat",
        paddingTop: "100%",
        backgroundSize: "contain",
        backgroundPosition: "center",
    },
    inputFile: {
        display: "none",
    },
    uploadBtn: {
        color: "#ffff",
        padding: "10px 25px",
        border: "solid 1px #f1a1c7",
        backgroundColor: "#f1a1c7",
        borderRadius: "2px",
    },
    uploadIcon: {
        position: "relative",
        top: "4px",
    },
    deleteImageIcon: {
        position: "absolute",
        cursor: "pointer",
        right: 0,
        top: 0,
        borderRadius: "999px",
        padding: "4px 6px",
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.1)",
        },
    },
});

const UploadFileField: React.FC<CustomInputProps & FieldProps> = ({
    field,
    form,
    type = "text",
    currentValue,
    ...props
}) => {
    const { name } = field;
    const [valueInputUpload, setValueInputUpload] = useState<Thumbnail[]>(
        currentValue as Thumbnail[]
    );

    const classes = useStyles();

    useEffect(() => {
        if (valueInputUpload === currentValue) {
            form.setFieldValue(name, currentValue);
        }
    }, [currentValue, form, name, valueInputUpload]);

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const arrayFiles = Array.from(files as FileList);
        const imageSelectedUrls = arrayFiles.map((file) => URL.createObjectURL(file));
        const arrayObjectUrls: Thumbnail[] = imageSelectedUrls.map((url: string) => {
            return {
                url: url,
            };
        }) as Thumbnail[];

        setValueInputUpload([...valueInputUpload, ...arrayObjectUrls]);
    };

    useEffect(() => {
        form.setFieldValue(name, valueInputUpload);
    }, [form, name, valueInputUpload]);

    return (
        <>
            <Grid container sx={{ mb: 4 }}>
                {valueInputUpload?.map((thumbnail: Thumbnail, index: number) => (
                    <Grid item xs={12} md={4} xl={2} key={index} sx={{ position: "relative" }}>
                        <div
                            style={{ backgroundImage: `url(${thumbnail.url})` }}
                            className={classes.thumbnailsPreview}
                        ></div>
                        <div
                            className={classes.deleteImageIcon}
                            onClick={() =>
                                setValueInputUpload(
                                    valueInputUpload.filter(
                                        (value) => value.url !== valueInputUpload[index].url
                                    )
                                )
                            }
                        >
                            <CloseIcon fontSize='small' color='error' />
                        </div>
                    </Grid>
                ))}
            </Grid>
            <label className={classes.uploadBtn}>
                <FileUploadIcon fontSize='small' className={classes.uploadIcon} />
                Tải ảnh mới
                <input
                    type='file'
                    multiple={true}
                    accept='image/png, image/jpg, image/jpeg, image/webp'
                    onChange={handleChangeFile}
                    className={classes.inputFile}
                />
            </label>
        </>
    );
};

export default UploadFileField;
