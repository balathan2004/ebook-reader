import SendData from "@/components/sendFunction";
export default function page() {
  async function submit() {
    const response = await SendData({ foo: "bar" }, "test");
    const res = response;
  }

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={submit}>Click</button>
    </div>
  );
}
