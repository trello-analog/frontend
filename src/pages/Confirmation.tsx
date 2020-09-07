import React, { useEffect } from "react";
import { useConfirmUser, useQuery } from "../hooks";
import { Result } from "antd";
import { useHistory } from "react-router";
import { Button } from "../components";

const Confirmation = () => {
    const code = useQuery("code");
    const email = useQuery("email");
    const { status, error, resendConfirm, confirmUser, resendEnable } = useConfirmUser(code, email);
    const history = useHistory();

    useEffect(() => {
        confirmUser();
    }, []);

    return status ? (
        <>
            {status === "success" && (
                <Result
                    status={status}
                    title={"Аккаунт верифицирован!"}
                    extra={[<Button onClick={() => history.push("/")}>На главную</Button>]}
                />
            )}
            {status === "error" && (
                <Result
                    status={status}
                    title={"Что-то пошло не так..."}
                    subTitle={error}
                    extra={[
                        <>
                            {resendEnable && (
                                <Button onClick={resendConfirm}>
                                    Отправить код подтверждения заново
                                </Button>
                            )}
                        </>,
                    ]}
                />
            )}
        </>
    ) : (
        <></>
    );
};

export default Confirmation;
