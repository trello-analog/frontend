import React, { PropsWithChildren } from "react";
import { FormProps } from "antd/es/form";
import { Form } from "antd";

interface IProps<T> {
    formProps: FormProps;

    onSubmit?(data: T): void;
}

export const CustomForm = <T extends object>(props: PropsWithChildren<IProps<T>>) => {
    const { formProps, onSubmit, children } = props;

    const handleSubmit = (data: T) => {
        if (onSubmit) {
            onSubmit(data);
        }
    };

    return (
        <Form {...formProps} onFinish={(value) => handleSubmit(value as T)}>
            {children}
        </Form>
    );
};
