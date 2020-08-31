import React, { FC } from "react";
import { Modal } from "antd";

interface IProps {
    title?: string;
    visible: boolean;

    onClose?(): void;

    onSubmit?(): void;
}

export const Popup: FC<IProps> = (props) => {
    const { visible, onSubmit, onClose, children, title } = props;
    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            onOk={onSubmit}
            title={title}
            centered
            cancelText={"Отмена"}
        >
            {children}
        </Modal>
    );
};
