import React, { useEffect, useState } from "react";
import { useConfirmUser, useQuery } from "../hooks";
import { Alert, Result } from "antd";
import { useHistory } from "react-router";
import { Button, Page } from "../components";
import { css } from "emotion";

const styles = {
    alertWrapper: css`
        display: flex;
        justify-content: center;
    `,
    alert: css`
        width: fit-content;
        margin-top: 20px;
    `,
};

const Confirmation = () => {
    const code = useQuery("code");
    const email = useQuery("email");
    const { response, resendConfirm, confirmUser } = useConfirmUser(code, email);
    const history = useHistory();
    const [resendSuccess, setResendSuccess] = useState(false);

    useEffect(() => {
        confirmUser();
    }, []);

    const resend = () => {
        resendConfirm().then(() => {
            setResendSuccess(true);
        });
    };

    return response ? (
        <Page title={"Подтверждение юзера"}>
            {response.status === "error" ? (
                <Result
                    status={response.status}
                    title={response.message}
                    extra={[
                        <>
                            <Button type={"primary"} onClick={resend}>
                                Отправить код подтверждения заново
                            </Button>
                            {resendSuccess && (
                                <div className={styles.alertWrapper}>
                                    <Alert
                                        className={styles.alert}
                                        type={"success"}
                                        message={`Новый код отправлен на ${email}`}
                                    />
                                </div>
                            )}
                        </>,
                    ]}
                />
            ) : (
                <Result
                    status={response.status}
                    title={response.message}
                    extra={[<Button onClick={() => history.push("/")}>На главную</Button>]}
                />
            )}
        </Page>
    ) : (
        <></>
    );
};

export default Confirmation;
