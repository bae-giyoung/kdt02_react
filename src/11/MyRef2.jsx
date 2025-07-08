import { useState, useEffect, useRef } from "react";
import TailButton from "../05/TailButton";

export default function MyRef2() {
    const n1Ref = useRef();
    const n2Ref = useRef();
    const n3Ref = useRef();
    const opRef = useRef();

    const handleCal = (e) => {
        e.preventDefault();console.log(e);
        let n1 = parseInt(n1Ref.current.value);
        let n2 = parseInt(n2Ref.current.value);

        let n3;
        switch(opRef.current.value) {
            case '+': n3 = n1 + n2;
            break;
            case '-' : n3 = n1 - n2;
            break;
            case 'x': n3 = n1 * n2;
            break;
            case '/' : n3 = n1 / n2;
            break;
        }
        n3Ref.current.value = n3;
        n1Ref.current.focus();
    }

    useEffect(() => {
        n1Ref.current.focus();
    }, [])

    return (
        <div className="w-9/10 bg-lime-50 p-5">
            <form className="flex justify-center">
                <input type="number" name="n1" ref={n1Ref} className="block p-2 ps-2 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-30 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
                <select name="op" defaultValue={"-"} ref={opRef}
                    className="block p-2 ps-2 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-12 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="+"> + </option>
                    <option vlaue="-"> - </option>
                    <option value="x"> x </option>
                    <option value="/"> / </option>
                </select>
                <input type="number" name="n2" ref={n2Ref} className="block p-2 ps-2 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-30 bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
                <TailButton caption="=" color="blue" onHandle={handleCal} />
                <input type="number" name="n3" ref={n3Ref} readOnly className="block p-2 ps-2 mx-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-30 bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""/>
            </form>
        </div>
    )
}