import { useState } from "react";

function App() {
    // 회원 가입
    const [registerInputs, setRegisterInputs] = useState({
        registerId: "",
        registerPw: "",
    });

    const onChangeRegisterInputs = (e) => {
        setRegisterInputs({
            ...registerInputs,
            [e.target.name]: e.target.value,
        })
    }

    const onClickRegisterButton = async () => {
        try {
            const response = await fetch("/user/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: registerInputs.registerId,
                    password: registerInputs.registerPw,
                })
            });

            const result = await response.json();

            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    // 데이터 입력
    const [dataInputs, setDataInputs] = useState({
        dataName: "",
        dataContent: "",
    });

    const onChangeDataInputs = (e) => {
        setDataInputs({
            ...dataInputs,
            [e.target.name]: e.target.value,
        })
    }

    const onClickDataButton = async () => {
        try {
            const response = await fetch("/data/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: dataInputs.dataName,
                    desc: dataInputs.dataContent,
                })
            });

            const result = await response.json();

            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    // 데이터 출력
    const [list, setList] = useState({});

    const onClickDatacall = async () => {
        try {
            const response = await fetch("/data/list", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const result = await response.json();

            console.log(result);

            if (result) {
                setList({
                    ...result,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div style={{ width: '800px', display: 'flex', justifyContent: 'space-between' }}>
            <form action="/" onClick={(e) => { e.preventDefault(); }} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="registerId">id</label>
                <input type="text" id="registerId" name="registerId" value={registerInputs.registerId} onChange={onChangeRegisterInputs} />
                <label htmlFor="registerPw">pw</label>
                <input type="text" id="registerPw" name="registerPw" value={registerInputs.registerPw} onChange={onChangeRegisterInputs} />
                <button onClick={onClickRegisterButton}>submit</button>
            </form>
            <form action="/" onClick={(e) => { e.preventDefault(); }} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="dataName">name</label>
                <input type="text" id="dataName" name="dataName" value={dataInputs.dataName} onChange={onChangeDataInputs} />
                <label htmlFor="dataContent">content</label>
                <input type="text" id="dataContent" name="dataContent" value={dataInputs.dataContent} onChange={onChangeDataInputs} />
                <button onClick={onClickDataButton}>submit</button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button onClick={onClickDatacall}>call</button>
                <ul style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        Object.keys(list).map(key => {
                            return (
                                <li key={key}>
                                    <p>{key}</p>
                                    <p>{list[key]}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default App;