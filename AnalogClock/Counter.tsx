import { useEffect, useState } from 'react';
import React = require('react');
import './Counter.css';


export interface ICounterProps {
    // values?: string[];
    raw_digit: number;
    // inverted?: boolean;
}

const Counter: React.FC<ICounterProps> = ({ raw_digit}) => {
    const digit = raw_digit % 10
    const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] 
    const [pos, setPos] = useState(digit);
    const [transitioning, setTransitioning] = useState(false);

    // const moveBy = (x: number) => {
    //     if (x !== 0) {
    //         setPos((prevPos) => n(prevPos + x, values.length));
    //     }
    // };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (pos === raw_digit) {
            setTransitioning(false);
            return;
        }
        const startMoving = () => {
            interval = setInterval(() => {
                // if (pos === raw_digit) {
                //     stopMoving();
                // } else {
                    moveBy(1);
                // }
            }, 50); // Adjust the delay here (in milliseconds)
        };

        const stopMoving = () => {
            clearInterval(interval);
        };

        startMoving();

        return () => {
            stopMoving();
        };
    }, [raw_digit, pos]);

    // Rest of the code...


    const n = (x: number, max: number) => {
        if (x >= max) x = x % max;
        if (x < 0) x = max - (Math.abs(x) % max);
        return x;
    };

    const offsetAboveAndBelow = (x: number, max: number) => {
        const offsetAbove = n(x - 1, max);
        const offsetBelow = n(x + 1, max);
        return { offsetAbove, offsetBelow };
    };

    const moveBy = (x: number) => {
        if (x !== 0) {
            setPos((prevPos) => n(prevPos + x, values.length));
        }
    };

    // const moveTo = (x: number) => {
    //     if (pos !== x) {
    //         const max = values.length - 1;
    //         let direction = x - pos;
    //         if (pos === max && x === 0) direction = 1;
    //         if (pos === 0 && x === max) direction = -1;
    //         moveBy(direction);
    //         setPos(x);
    //     }
    // };

    // const next = () => {
    //     moveBy(1);
    // };

    // const previous = () => {
    //     moveBy(-1);
    // };

    // const mouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    //     e.preventDefault();

    //     const now = Date.now();
    //     const dif = now - lastScroll;
    //     lastScroll = now;

    //     let delta = e.deltaY;
    //     // if (inverted) delta *= -1;
    //     // if (e.webkitDirectionInvertedFromDevice) delta *= -1;

    //     if ((dif > 20 && Math.abs(delta) >= 12) || Math.abs(eventCount) > 50) {
    //         if (delta > 0) {
    //             next();
    //         } else {
    //             previous();
    //         }
    //         eventCount = 0;
    //     } else {
    //         eventCount += e.deltaY;
    //     }
    // };

    // let lastScroll = 0;
    // let eventCount = 0;

    const { offsetAbove, offsetBelow } = offsetAboveAndBelow(pos, values.length);

    return (
        <div className={`counter ${transitioning ? 'transitioning' : ''}`}>
         {/* onWheel={mouseWheel}> */}
            <div className="wheel" >
                <div className="digit above">{values[offsetAbove]}</div>
                <div className="digit center">{values[pos]}</div>
                <div className="digit below">{values[offsetBelow]}</div>
            </div>
        </div>
    );
};

export default Counter;
