interface PropType {
  name: string;
  age: number;
  handleClick: (e: any) => void;
}

export default function Example({ name, age, handleClick }: PropType) {
  return (
    <div>
      <button onClick={(e: any) => handleClick('Bold')}>Click me</button>
      {name} {age + 10}
    </div>
  );
}
