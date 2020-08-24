import React from "react";
import { Input } from "antd";
import { Field, FieldProps } from "formik";

interface IProps {
    name: string;
    label?: string;
    type?: string;
}

export const TextField = (props: IProps) => {
    const { name, label, type = "text" } = props;

    return (
        <Field name={name}>
            {({ field }: FieldProps) => (
                <>
                    {type === "text" && <Input placeholder={label} {...field} />}
                    {type === "password" && <Input.Password placeholder={label} {...field} />}
                    {type === "textarea" && <Input.TextArea placeholder={label} {...field} />}
                </>
            )}
        </Field>
    );
};
