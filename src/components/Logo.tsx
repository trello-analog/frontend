import React from "react";
import { css } from "emotion";

const styles = {
    title: css`
        font-size: 40px;
        font-family: "Dancing Script", cursive;
        font-weight: 700;
    `,
};

export const Logo = () => <span className={styles.title}>Kinda Trello</span>;
