import React, { FC } from "react";
import { css } from "emotion";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";

interface IProps {
    className?: string;
}

const styles = {
    container: css`
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    `,
    form: css`
        width: 400px;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 20px;
    `,
    logo: css`
        display: flex;
        justify-content: center;
        text-decoration: none;
        color: #000;
    `,
};

export const PublicRouteLayout: FC<IProps> = (props) => (
    <div className={styles.container}>
        <div className={styles.form}>
            <Link to={"/"} className={styles.logo}>
                <Logo />
            </Link>
            {props.children}
        </div>
    </div>
);
