import { useArray } from "./UseArray";

export default function UseArrayExample() {
  const { array, push, remove, filter, update, set, clear } = useArray([
    1, 2, 3, 4, 5, 6,
  ]);
  return (
    <div>
      <div>{array.join(", ")}</div>
      <button onClick={() => push(5)}> Add 5</button>
      <button onClick={() => update(1, 8)}> Remove 2 elements</button>
      <button onClick={() => remove(1)}> Remove Second Element</button>
      <button onClick={() => filter((n) => n < 3)}>
        Keep number less than 3
      </button>
      <button onClick={() => set([1, 2, 3])}>Keep number less than 3</button>

      <button onClick={() => clear}>Keep number less than 3</button>
    </div>
  );
}
