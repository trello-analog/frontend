import React, { FC } from "react";
import Helemt from "react-helmet";

interface IProps {
    title?: string;
}

export const Page: FC<IProps> = (props) => (
    <div>
        {props.title && (
            <Helemt>
                <title>{props.title}</title>
            </Helemt>
        )}
        {props.children}
    </div>
);
