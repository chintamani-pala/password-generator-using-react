import { useCallback, useState, useEffect } from "react";

function App() {
  const [password, setPassword] = useState('')
  const [length,setLength] = useState(6);
  const [number,setNumber] = useState(false);
  const [symbol,setSymbol] = useState(false);

  const generateAndSet = useCallback(()=>{
      let pass=""
      let stringSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      let numSet = "1234567890"
      let symbolSet = "!@#$%^&*()~`"
      if(number) stringSet+=numSet
      if(symbol) stringSet+=symbolSet
      for (let i = 0; i < length; i++) {
        pass+=stringSet.charAt(Math.floor(Math.random() * stringSet.length));
      }
      setPassword(pass)
  },[length,number,symbol,setPassword])
  
  useEffect(() => {
    generateAndSet();
  }, [length, number, symbol, generateAndSet]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };
  
  return (
    <>
      <div
        className={`bg-gray-800 w-screen h-screen  flex items-center justify-center`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen ">
          <h1 className="text-4xl font-bold mb-8 text-white">
            Password Generator
          </h1>
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                className="w-full  px-3 py-2 text-gray-700 border rounded-lg focus:outline-none bg-white"
                type="text"
                name="password"
                id="password"
                value={password}
                placeholder="Generated Password"
                readOnly
              />
              <button 
                className="absolute inset-y-0 right-0 px-4 py-2 text-white bg-indigo-500 rounded-r-lg focus:bg-indigo-600 focus:outline-none"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  onChange={(e) => setNumber(e.target.checked)}
                />
                <span className="ml-2 text-white">Include Numbers</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  onChange={(e) => setSymbol(e.target.checked)}
                />
                <span className="ml-2 text-white">Include Symbols</span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <input 
              type="range" 
              min="6"
              value={length}
              max="100"
              onChange={(e)=>setLength(e.target.value)}
              className="slider" />
              <span className="ml-5 text-white mr-2">Password Length:{length}</span>
            </div>
            <button 
            className="w-full px-3 py-2 mt-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            onClick={generateAndSet}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
