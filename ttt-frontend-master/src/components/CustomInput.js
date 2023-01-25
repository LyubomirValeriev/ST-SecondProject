import React from "react";
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";
function CustomInput() {
    const {} = useMessageInputContext(handleSubmit);

    return (

        <div className="str-chat_input-flat str-chat__input-flat--send-button-active">
            <div className="str-chat_input-flat_wrapper">
                <div className="str-chat_input-flat--textarea-wrapper">
                    <ChatAutoComplete />
                </div>
                <button onClick={handleSubmit}>Send a message</button>
            </div>
        </div>

    );
}

export default CustomInput;