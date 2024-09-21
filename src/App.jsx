import React, { useState, useEffect } from "react";
import { shallow } from "zustand/shallow";
import useStore from "../src/components/zustand/useCountStore";
import useItemsStore from "../src/components/zustand/useItemsStore";

export default function App() {
  // count store
  const { increaseCount, resetCount, decreaseCount, asyncIncrementCount } =
    useStore();

  const count = useStore((state) => state.count);

  const [asyncTime, setAsyncTime] = useState(0);
  const [asyncAmount, setAsyncAmount] = useState(0);

  // item store
  const {
    items,
    addItem,
    removeItem,
    asyncAddItem,
    deepItemsArray,
    addItemAtLevel3,
  } = useItemsStore();

  const [item, setItem] = useState("");
  const [asyncItem, setAsyncItem] = useState("");

  // deep items array from item store
  const [deepItem, setDeepItem] = useState("");

  useEffect(() => {
    console.log("App component re-rendered for count");
  }, [count]);

  useEffect(() => {
    console.log("App component re-rendered for items");
  }, [items]);

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>count store</p>
      <div>
        <h1>Count: {count}</h1>
        <button onClick={increaseCount}>Increase</button>
        <button onClick={decreaseCount}>Decrease</button>

        <label htmlFor="asyncInputTime">Time</label>
        <input
          type="number"
          id="asyncInputTime"
          placeholder="time"
          value={asyncTime}
          onChange={(e) => setAsyncTime(e.target.value)}
        />

        <label htmlFor="asyncInputAmount">Amount</label>
        <input
          type="number"
          id="asyncInputAmount"
          placeholder="amount"
          value={asyncAmount}
          onChange={(e) => setAsyncAmount(e.target.value)}
        />

        <button onClick={() => asyncIncrementCount(asyncTime, asyncAmount)}>
          Async Increment
        </button>
        <button onClick={resetCount}>Reset</button>
      </div>

      <hr />

      <p>items store</p>
      <div>
        <div>
          <p>items in store:</p>
          {items.map((item, index) => {
            return (
              <div key={index}>
                <p>{item}</p>
                <button onClick={() => removeItem(index)}>Remove</button>
              </div>
            );
          })}
        </div>

        <label htmlFor="addItem">Item to add</label>
        <input
          type="text"
          id="addItem"
          placeholder="item to add"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button onClick={() => addItem(item)}>Add Item</button>

        <label htmlFor="asyncAddItem">Item to add in async mode!</label>
        <input
          type="text"
          id="asyncAddItem"
          placeholder="item to add in async mode"
          value={asyncItem}
          onChange={(e) => setAsyncItem(e.target.value)}
        />
        <button onClick={() => asyncAddItem(asyncItem)}>
          Add Item in async mode
        </button>

        <div>
          Deep Items Array:{" "}
          {deepItemsArray.map((deepItem) => {
            return <div key={Date.now() * Math.random()}>{deepItem}</div>;
          })}
        </div>
        <label htmlFor="deppItem">Item to add at level 3</label>
        <input
          type="text"
          id="deppItem"
          placeholder="item to add at level 3"
          value={deepItem}
          onChange={(e) => setDeepItem(e.target.value)}
        />
        <button
          onClick={() => {
            addItemAtLevel3(deepItem);
            console.log(deepItemsArray[0][0]);
          }}
        >
          Add Item
        </button>
      </div>
    </section>
  );
}
