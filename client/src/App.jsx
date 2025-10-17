import { Button } from "./components/ui/button";
import "./index.css";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold flex flex-col underline justify-center items-center h-screen">
        Hello world!
      </h1>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Vans Shoe Store</h1>

        {/* Different variants */}
        <div className="flex gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </>
  );
}

export default App;
