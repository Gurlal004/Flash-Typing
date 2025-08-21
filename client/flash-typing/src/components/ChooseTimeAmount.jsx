function ChooseTimeAmount({onTimeAmountSelect, isRunning}){
    const timeOptions = [10,15,30,60];

    return (
        <>
            <div className="timeButtons">
                {timeOptions.map((sec) => (
                    <button key={sec} disabled={isRunning} onClick={() => onTimeAmountSelect(sec)}>{sec}s</button>
                    ))}
            </div>
        </>
    )
}

export default ChooseTimeAmount;