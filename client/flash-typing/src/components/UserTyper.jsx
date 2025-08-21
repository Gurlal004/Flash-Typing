import React, {useEffect, useRef} from 'react';

function UserTyper({ input, onInputChange, onKeyDown, disabled}) {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleChange = (e) => {
        const value  = e.target.value;

        if(value.length === 1 && value === " ") return;

        onInputChange(e.target.value);
    };

    return (
        <div className="user-input-field">
            <input
                ref={inputRef}
                className="text-input"
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                autoComplete="off"
                placeholder="Start typing..."
                disabled={disabled}
            />
        </div>
    );
}

export default UserTyper;