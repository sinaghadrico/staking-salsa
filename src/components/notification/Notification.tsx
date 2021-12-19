import { useNotification } from "hooks";
import { Alert } from "components/Alert";
import "./Notification.scss";
const Notification = () => {
    const { state, clearById } = useNotification();
    if (state.messages.length <= 0) return null;
    else
        return (
            <div className="ui-notification">
                {state?.messages?.map((message: any) => {
                    const { content, type, id } = message;
                    return (
                        <Alert
                            key={id}
                            message={content}
                            type={type}
                            onClose={() => {
                                clearById(id);
                            }}
                            closable={true}
                        />
                    );
                })}
            </div>
        );
};

export default Notification;
