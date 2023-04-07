import { useEffect, useState } from "react";

const row = 8;
const col = 32;

const generateMatrix = (row: number, col: number) => {
    const matrix: any = [];
    for (let i = 0; i < row; i++) {
        matrix[i] = [];
        for (let j = 0; j < col; j++) {
            matrix[i][j] = 0;
        }
    }

    return matrix;
};
const matrix = [[...generateMatrix(row, col)]];
function App() {
    const [data, setData] = useState(matrix);
    const [frame, setFrame] = useState(0);
    const [saved, setSaved] = useState(true);

    useEffect(() => {
        let animation = localStorage.getItem("animation");
        if (animation) setData(JSON.parse(animation));
    }, []);

    const handleNext = () => {
        const nextFrame = frame + 1;
        if (nextFrame > data.length - 1) {
            const newList = [...data];
            newList.push(generateMatrix(row, col));
            setData(newList);
        }
        setFrame(nextFrame);
        setSaved(false);
    };

    const handlePrev = () => {
        if (frame === 0) return;
        const nextFrame = frame - 1;
        setFrame(nextFrame);
        setSaved(false);
    };

    const deleteFrame = () => {
        if (frame === 0) return;
        let newList = data.filter((_, i) => i !== frame);
        setData(newList);
        setFrame(frame - 1);
        setSaved(false);
    };

    const clearFrame = () => {
        const newList = [...data];
        newList[frame] = generateMatrix(row, col);
        setData(newList);
        setSaved(false);
    };

    const save = () => {
        localStorage.setItem("animation", JSON.stringify(data));
        setSaved(true);
    };

    return (
        <div className="container max-w-4xl p-4 mx-auto">
            <div className="flex justify-between">
                <p className="mb-2 font-semibold">LED Matrix</p>
                <p>
                    Frame {frame + 1}/{data.length} {!saved && "Unsaved data"}
                </p>
            </div>
            <div className="flex flex-col gap-1">
                {data[frame].map((item: any, i: number) => (
                    <div
                        className="flex flex-wrap items-center justify-center gap-1"
                        key={i}
                    >
                        {item.map((active: any, j: number) => (
                            <div
                                key={j}
                                className={`flex-1 aspect-square rounded-sm cursor-pointer ${
                                    active
                                        ? "bg-red-400"
                                        : data[frame - 1] &&
                                          data[frame - 1][i][j]
                                        ? "bg-red-100"
                                        : "bg-gray-300"
                                }`}
                                onClick={() => {
                                    const newTiles = [...data];
                                    newTiles[frame][i][j] =
                                        newTiles[frame][i][j] === 0 ? 1 : 0;
                                    setData(newTiles);
                                }}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between my-4">
                <div className="flex items-center gap-2">
                    <button className="btn" onClick={handlePrev}>
                        Prev
                    </button>
                    <button className="btn" onClick={handleNext}>
                        Next
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="bg-green-600 btn hover:bg-green-500"
                        onClick={save}
                    >
                        Save
                    </button>
                    <button
                        className="bg-orange-600 btn hover:bg-orange-500"
                        onClick={clearFrame}
                    >
                        Clear Frame
                    </button>
                    <button
                        className="bg-red-600 btn hover:bg-red-500"
                        onClick={deleteFrame}
                    >
                        Delete Frame
                    </button>
                </div>
            </div>
            <p className="block text-xs">
                {"{"}
                {data[frame].map((item: any, i: number, arr1) => (
                    <span key={i}>
                        {"{"}
                        {item.map((active: any, j: number) => (
                            <span key={j}>
                                {active}
                                {j !== item.length - 1 ? "," : ""}
                            </span>
                        ))}
                        {"}"}
                        {i !== arr1.length - 1 ? "," : ""}
                        {i !== arr1.length - 1 && <br />}
                    </span>
                ))}
                {"}"}
            </p>
        </div>
    );
}

export default App;
