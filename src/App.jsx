import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [containsNumber, setContainsNumber] = useState(false);
  const [containsLetter, setContainsLetter] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (containsLetter) {
      str += "!@#$%^&*()+-[]{}/";
    }

    if (containsNumber) {
      str += 1234567890;
    }

    for (let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }
    setPassword(pass);
  }, [length, containsNumber, containsLetter, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, containsLetter, containsNumber, passwordGenerator]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Password Generator</h1>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-blue-500 bg-blue-300 py-3">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            ref={passwordRef}
            readOnly
          ></input>
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shirnk-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 text-gray-800">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={containsNumber}
              id="numberInput"
              onChange={() => {
                setContainsNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={containsLetter}
              id="characterInput"
              onChange={() => {
                setContainsLetter((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
