import React, { FC } from "react";
import cn from "classnames";
import { css } from "emotion";
import { Button as AntdButton } from "antd";
import { ButtonProps } from "antd/lib/button";

interface IProps extends ButtonProps {
    fullWidth?: boolean;
}

const styles = {
    fullWidth: css`
        width: 100%;
    `,
};

export const Button: FC<IProps> = ({ fullWidth, children, ...rest }) => (
    <AntdButton {...rest} className={cn(fullWidth && styles.fullWidth)}>
        {children}
    </AntdButton>
);
